'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
  id: number;
}

export default function MagneticCursor() {
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const trailIdRef = useRef(0);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastMoveTimeRef = useRef<number>(Date.now());
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const addTrailPoint = useCallback((x: number, y: number) => {
    const now = Date.now();
    
    // Only add point if mouse moved significantly (smoother trail)
    if (lastPointRef.current) {
      const dx = x - lastPointRef.current.x;
      const dy = y - lastPointRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Skip if mouse didn't move much
      if (distance < 2) return;
    }
    
    lastPointRef.current = { x, y };

    const newPoint: TrailPoint = {
      x,
      y,
      timestamp: now,
      id: trailIdRef.current++
    };

    setTrailPoints(prev => {
      const filtered = prev.filter(point => now - point.timestamp < 1200); // Keep points for 1.2s
      return [newPoint, ...filtered].slice(0, 20); // Max 20 points
    });
  }, [setTrailPoints]);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setIsVisible(true);
      lastMoveTimeRef.current = Date.now();
      
      // Clear any existing fade timeout
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
      
      // Use requestAnimationFrame for smoother updates
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(() => {
        addTrailPoint(e.clientX, e.clientY);
      });
    };

    const hideCursor = () => {
      setIsVisible(false);
      setTrailPoints([]);
      lastPointRef.current = null;
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };

    // Natural cleanup of old trail points
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTrailPoints(prev => 
        prev.filter(point => now - point.timestamp < 1200)
      );
    }, 50); // Check every 50ms for smooth removal

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseleave', hideCursor);
      clearInterval(cleanupInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [addTrailPoint]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Smooth trail effects */}
      {trailPoints.map((point, index) => {
        const now = Date.now();
        const age = now - point.timestamp;
        const maxAge = 1200;
        const normalizedAge = Math.min(age / maxAge, 1);
        
        // Smooth opacity and size curves
        const opacity = Math.pow(1 - normalizedAge, 2) * 0.9;
        const baseSize = 16;
        const size = baseSize * (1 - normalizedAge * 0.7);
        
        // Calculate smooth position interpolation between points
        let smoothX = point.x;
        let smoothY = point.y;
        
        if (index < trailPoints.length - 1) {
          const nextPoint = trailPoints[index + 1];
          const timeDiff = point.timestamp - nextPoint.timestamp;
          const progress = Math.min(timeDiff / 50, 1); // Smooth over 50ms
          
          smoothX = nextPoint.x + (point.x - nextPoint.x) * progress;
          smoothY = nextPoint.y + (point.y - nextPoint.y) * progress;
        }

        return (
          <div key={point.id} className="absolute">
            {/* Core bright trail */}
            <div
              className="absolute rounded-full"
              style={{
                left: smoothX,
                top: smoothY,
                width: `${size * 0.4}px`,
                height: `${size * 0.4}px`,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, 
                  rgba(168, 85, 247, ${opacity * 0.8}) 0%, 
                  rgba(139, 92, 246, ${opacity * 0.6}) 40%,
                  rgba(99, 102, 241, ${opacity * 0.3}) 70%,
                  transparent 100%)`,
                filter: 'blur(0.5px)',
                mixBlendMode: 'screen',
              }}
            />
            
            {/* Main smoke layer */}
            <div
              className="absolute rounded-full"
              style={{
                left: smoothX,
                top: smoothY,
                width: `${size}px`,
                height: `${size}px`,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, 
                  rgba(139, 92, 246, ${opacity * 0.5}) 0%, 
                  rgba(99, 102, 241, ${opacity * 0.4}) 25%,
                  rgba(59, 130, 246, ${opacity * 0.3}) 50%,
                  rgba(79, 70, 229, ${opacity * 0.2}) 75%,
                  transparent 100%)`,
                filter: 'blur(1.5px)',
              }}
            />
            
            {/* Outer diffuse glow */}
            <div
              className="absolute rounded-full"
              style={{
                left: smoothX + Math.sin(index * 0.1) * 2,
                top: smoothY + Math.cos(index * 0.1) * 2,
                width: `${size * 1.8}px`,
                height: `${size * 1.8}px`,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, 
                  transparent 30%,
                  rgba(99, 102, 241, ${opacity * 0.15}) 50%,
                  rgba(59, 130, 246, ${opacity * 0.1}) 70%,
                  rgba(37, 99, 235, ${opacity * 0.05}) 85%,
                  transparent 100%)`,
                filter: 'blur(3px)',
              }}
            />

            {/* Subtle particles for texture */}
            {index < 5 && (
              <>
                <div
                  className="absolute rounded-full"
                  style={{
                    left: smoothX + Math.sin(point.timestamp * 0.001 + index) * (size * 0.3),
                    top: smoothY + Math.cos(point.timestamp * 0.001 + index) * (size * 0.3),
                    width: '2px',
                    height: '2px',
                    transform: 'translate(-50%, -50%)',
                    background: `rgba(168, 85, 247, ${opacity * 0.6})`,
                    filter: 'blur(0.5px)',
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    left: smoothX + Math.sin(point.timestamp * 0.0015 + index + 1) * (size * 0.4),
                    top: smoothY + Math.cos(point.timestamp * 0.0015 + index + 1) * (size * 0.4),
                    width: '1.5px',
                    height: '1.5px',
                    transform: 'translate(-50%, -50%)',
                    background: `rgba(59, 130, 246, ${opacity * 0.5})`,
                    filter: 'blur(0.3px)',
                  }}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
} 
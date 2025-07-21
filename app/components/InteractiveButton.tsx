'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface InteractiveButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'primary' | 'secondary';
}

export default function InteractiveButton({ 
  children, 
  className = '', 
  onClick,
  type = 'primary' 
}: InteractiveButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<THREE.Points[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !buttonRef.current) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Get button dimensions
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const width = buttonRect.width;
      const height = buttonRect.height;

      // Camera
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 5;

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

      // Create hover glow particles
      const createHoverParticles = () => {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        
        for (let i = 0; i < 20; i++) {
          vertices.push(
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 1
          );
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        const material = new THREE.PointsMaterial({
          color: type === 'primary' ? 0x00ff88 : 0x6b7280,
          size: 0.05,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
        });

        return new THREE.Points(geometry, material);
      };

      // Create click explosion particles
      const createExplosionParticles = (count: number = 30) => {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const velocities = [];
        
        for (let i = 0; i < count; i++) {
          vertices.push(0, 0, 0); // Start from center
          
          // Random explosion direction
          const angle = (i / count) * Math.PI * 2;
          const speed = Math.random() * 0.1 + 0.05;
          velocities.push(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            (Math.random() - 0.5) * 0.05
          );
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.userData = { velocities };

        const material = new THREE.PointsMaterial({
          color: type === 'primary' ? 0x00ff88 : 0x3b82f6,
          size: 0.08,
          transparent: true,
          opacity: 1,
          blending: THREE.AdditiveBlending,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);
        particlesRef.current.push(particles);
        
        return particles;
      };

      const hoverParticles = createHoverParticles();
      scene.add(hoverParticles);

      // Animation loop
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);

        // Hover effect
        if (isHovered) {
          (hoverParticles.material as THREE.PointsMaterial).opacity = Math.min(
            (hoverParticles.material as THREE.PointsMaterial).opacity + 0.02,
            0.6
          );
          hoverParticles.rotation.z += 0.01;
        } else {
          (hoverParticles.material as THREE.PointsMaterial).opacity = Math.max(
            (hoverParticles.material as THREE.PointsMaterial).opacity - 0.02,
            0
          );
        }

        // Update explosion particles
        particlesRef.current = particlesRef.current.filter(particles => {
          const positions = particles.geometry.attributes.position.array as Float32Array;
          const velocities = particles.geometry.userData.velocities;
          let allParticlesGone = true;

          for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i];     // x
            positions[i + 1] += velocities[i + 1]; // y
            positions[i + 2] += velocities[i + 2]; // z
            
            // Fade out
            velocities[i] *= 0.98;
            velocities[i + 1] *= 0.98;
            velocities[i + 2] *= 0.98;
            
            if (Math.abs(velocities[i]) > 0.001) {
              allParticlesGone = false;
            }
          }

          particles.geometry.attributes.position.needsUpdate = true;
          
          const material = particles.material as THREE.PointsMaterial;
          material.opacity *= 0.95;

          if (allParticlesGone || material.opacity < 0.01) {
            scene.remove(particles);
            particles.geometry.dispose();
            material.dispose();
            return false;
          }
          
          return true;
        });

        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        if (!buttonRef.current) return;
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const newWidth = buttonRect.width;
        const newHeight = buttonRect.height;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        
        window.removeEventListener('resize', handleResize);
        
        // Clean up all particles
        particlesRef.current.forEach(particles => {
          scene.remove(particles);
          particles.geometry.dispose();
          (particles.material as THREE.Material).dispose();
        });
        
        scene.remove(hoverParticles);
        hoverParticles.geometry.dispose();
        (hoverParticles.material as THREE.Material).dispose();
        
        renderer.dispose();
      };

    } catch (error) {
      console.warn('Interactive button Three.js failed:', error);
    }
  }, [isHovered, isClicked, type]);

  const handleClick = () => {
    setIsClicked(true);
    
    // Create explosion effect
    if (sceneRef.current) {
      const createExplosionParticles = (count: number = 30) => {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const velocities = [];
        
        for (let i = 0; i < count; i++) {
          vertices.push(0, 0, 0);
          
          const angle = (i / count) * Math.PI * 2;
          const speed = Math.random() * 0.1 + 0.05;
          velocities.push(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            (Math.random() - 0.5) * 0.05
          );
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.userData = { velocities };

        const material = new THREE.PointsMaterial({
          color: type === 'primary' ? 0x00ff88 : 0x3b82f6,
          size: 0.08,
          transparent: true,
          opacity: 1,
          blending: THREE.AdditiveBlending,
        });

        const particles = new THREE.Points(geometry, material);
        sceneRef.current!.add(particles);
        particlesRef.current.push(particles);
      };

      createExplosionParticles(25);
    }
    
    setTimeout(() => setIsClicked(false), 200);
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden ${className} transition-transform duration-150 ${
        isClicked ? 'scale-95' : isHovered ? 'scale-105' : 'scale-100'
      }`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ 
          width: '100%', 
          height: '100%',
        }}
      />
      <span className="relative z-20">{children}</span>
    </button>
  );
} 
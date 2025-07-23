'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleFieldProps {
  intensity?: 'light' | 'medium' | 'heavy';
  color?: string;
}

export default function ParticleField({ intensity = 'light', color = '#00ff88' }: ParticleFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    const currentMountRef = mountRef.current;
    const currentIsInitialized = isInitialized.current;
    const currentRendererRef = rendererRef.current;
    if (!currentMountRef || currentIsInitialized) return;
    isInitialized.current = true;

    // Scene setup with error handling
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance",
        stencil: false
      });
      rendererRef.current = renderer;
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      currentMountRef.appendChild(renderer.domElement);
    } catch (error) {
      console.error('WebGL initialization failed:', error);
      return;
    }

    // Particle counts based on intensity
    const particleCounts = {
      light: 30,
      medium: 60,
      heavy: 100
    };

    // Create floating particles with safe initialization
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = particleCounts[intensity];
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Safe position generation
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 50;
      
      positions[i] = isFinite(x) ? x : 0;       // x
      positions[i + 1] = isFinite(y) ? y : 0;   // y
      positions[i + 2] = isFinite(z) ? z : 0;   // z
      
      // Safe velocity generation
      const vx = (Math.random() - 0.5) * 0.02;
      const vy = (Math.random() - 0.5) * 0.01;
      const vz = (Math.random() - 0.5) * 0.02;
      
      velocities[i] = isFinite(vx) ? vx : 0;       // x velocity
      velocities[i + 1] = isFinite(vy) ? vy : 0;   // y velocity
      velocities[i + 2] = isFinite(vz) ? vz : 0;   // z velocity
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: intensity === 'heavy' ? 0.15 : intensity === 'medium' ? 0.1 : 0.05,
      transparent: true,
      opacity: intensity === 'heavy' ? 0.8 : intensity === 'medium' ? 0.6 : 0.4,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Create subtle musical note shapes
    const noteShapes: THREE.Mesh[] = [];
    const noteCount = Math.floor(particleCount / 5);
    
    for (let i = 0; i < noteCount; i++) {
      const noteGeometry = new THREE.SphereGeometry(0.03, 6, 6);
      const noteMaterial = new THREE.MeshBasicMaterial({ 
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.3
      });
      
      const note = new THREE.Mesh(noteGeometry, noteMaterial);
      note.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 40
      );
      
      noteShapes.push(note);
      scene.add(note);
    }

    camera.position.z = 15;

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate particles with NaN protection
      const particlePositions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlePositions.length; i += 3) {
        // Gentle floating motion with safety checks
        if (isFinite(velocities[i]) && isFinite(particlePositions[i])) {
          particlePositions[i] += velocities[i];
        }
        
        const timeOffset = time + i;
        if (isFinite(timeOffset) && isFinite(velocities[i + 1]) && isFinite(particlePositions[i + 1])) {
          const sinValue = Math.sin(timeOffset) * 0.005;
          if (isFinite(sinValue)) {
            particlePositions[i + 1] += velocities[i + 1] + sinValue;
          } else {
            particlePositions[i + 1] += velocities[i + 1];
          }
        }
        
        if (isFinite(velocities[i + 2]) && isFinite(particlePositions[i + 2])) {
          particlePositions[i + 2] += velocities[i + 2];
        }
        
        // Boundary wrapping with safety checks
        if (isFinite(particlePositions[i]) && Math.abs(particlePositions[i]) > 25) {
          velocities[i] *= -1;
        }
        if (isFinite(particlePositions[i + 1]) && Math.abs(particlePositions[i + 1]) > 15) {
          velocities[i + 1] *= -1;
        }
        if (isFinite(particlePositions[i + 2]) && Math.abs(particlePositions[i + 2]) > 25) {
          velocities[i + 2] *= -1;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Animate note shapes with NaN protection
      noteShapes.forEach((note, index) => {
        const timeOffset1 = time * 0.5 + index;
        const timeOffset2 = time + index;
        
        if (isFinite(timeOffset1)) {
          const yMovement = Math.sin(timeOffset1) * 0.005;
          if (isFinite(yMovement)) {
            note.position.y += yMovement;
          }
        }
        
        note.rotation.z += 0.01;
        
        if (isFinite(timeOffset2)) {
          const opacityValue = 0.2 + Math.sin(timeOffset2) * 0.1;
          if (isFinite(opacityValue) && opacityValue >= 0 && opacityValue <= 1) {
            (note.material as THREE.MeshBasicMaterial).opacity = opacityValue;
          }
        }
      });

      // Subtle rotation
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      isInitialized.current = false;
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      
      window.removeEventListener('resize', handleResize);
      
      try {
        // Clean up renderer DOM element
        if (currentMountRef && currentRendererRef && currentMountRef.contains(currentRendererRef.domElement)) {
          currentMountRef.removeChild(currentRendererRef.domElement);
        }
        
        // Clean up note shapes
        noteShapes.forEach(note => {
          if (sceneRef.current) {
            sceneRef.current.remove(note);
          }
          if (note.geometry) {
            note.geometry.dispose();
          }
          if (note.material instanceof THREE.Material) {
            note.material.dispose();
          }
        });
        
        // Dispose shared geometries and materials
        if (particleGeometry) particleGeometry.dispose();
        if (particleMaterial) particleMaterial.dispose();
        
        // Clean up renderer
        if (rendererRef.current) {
          rendererRef.current.dispose();
          rendererRef.current.forceContextLoss();
          rendererRef.current = null;
        }
        
        // Clear scene
        if (sceneRef.current) {
          sceneRef.current.clear();
          sceneRef.current = null;
        }
      } catch (error) {
        console.warn('Three.js cleanup error:', error);
      }
    };
  }, [intensity, color]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
} 
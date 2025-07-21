'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SimpleParticleFieldProps {
  color?: string;
}

export default function SimpleParticleField({ color = '#3366ff' }: SimpleParticleFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      
      // Camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 10;

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      mountRef.current.appendChild(renderer.domElement);

      // Create particles
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      
      // Create 50 simple particles
      for (let i = 0; i < 50; i++) {
        vertices.push(
          (Math.random() - 0.5) * 30, // x
          (Math.random() - 0.5) * 20, // y
          (Math.random() - 0.5) * 30  // z
        );
      }
      
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      const material = new THREE.PointsMaterial({
        color: new THREE.Color(color),
        size: 0.05,
        transparent: true,
        opacity: 0.6,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Simple animation
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);

        // Very gentle rotation
        particles.rotation.y += 0.0005;

        renderer.render(scene, camera);
      };

      animate();

      // Resize handler
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        
        window.removeEventListener('resize', handleResize);
        
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };

    } catch (error) {
      console.warn('Simple particle field failed:', error);
    }
  }, [color]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
} 
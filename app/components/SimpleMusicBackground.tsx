'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SimpleMusicBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const currentMountRef = mountRef.current;
    if (!currentMountRef) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

      currentMountRef.appendChild(renderer.domElement);

      // Create simple floating particles
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      
      for (let i = 0; i < 100; i++) {
        vertices.push(
          (Math.random() - 0.5) * 20, // x
          (Math.random() - 0.5) * 20, // y
          (Math.random() - 0.5) * 20  // z
        );
      }
      
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      const material = new THREE.PointsMaterial({
        color: 0x00ff88,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Animation function
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);

        // Gentle rotation
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;

        renderer.render(scene, camera);
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        
        window.removeEventListener('resize', handleResize);
        
        if (currentMountRef && renderer.domElement) {
          currentMountRef.removeChild(renderer.domElement);
        }
        
        // Dispose of resources
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };

    } catch (error) {
      console.warn('Three.js initialization failed:', error);
    }
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
} 
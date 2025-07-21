'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MusicBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!mountRef.current || isInitialized.current) return;
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
        stencil: false,
        depth: false
      });
      rendererRef.current = renderer;
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);
    } catch (error) {
      console.error('WebGL initialization failed:', error);
      return;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x00ff88, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create floating musical notes with shared geometry
    const noteGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const noteMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x00ff88,
      transparent: true,
      opacity: 0.8
    });

    const notes: THREE.Mesh[] = [];
    for (let i = 0; i < 50; i++) {
      const note = new THREE.Mesh(noteGeometry, noteMaterial.clone());
      note.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      notes.push(note);
      scene.add(note);
    }

    // Create vinyl record
    const vinylGeometry = new THREE.CylinderGeometry(2, 2, 0.05, 32);
    const vinylMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x1a1a1a,
      transparent: true,
      opacity: 0.9
    });
    const vinyl = new THREE.Mesh(vinylGeometry, vinylMaterial);
    vinyl.position.set(5, 0, -5);
    scene.add(vinyl);

    // Create center label for vinyl
    const labelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.06, 32);
    const labelMaterial = new THREE.MeshLambertMaterial({ color: 0x3366ff });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(5, 0.03, -5);
    scene.add(label);

    // Create waveform particles with safe initialization
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Safe random position generation
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 30;
      
      positions[i] = isFinite(x) ? x : 0;       // x
      positions[i + 1] = isFinite(y) ? y : 0;   // y
      positions[i + 2] = isFinite(z) ? z : 0;   // z
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00aaff,
      size: 0.1,
      transparent: true,
      opacity: 0.6
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 8;

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate floating notes with NaN protection
      notes.forEach((note, index) => {
        const timeOffset = time + index;
        
        if (isFinite(timeOffset)) {
          const yMovement = Math.sin(timeOffset) * 0.01;
          const opacityValue = 0.5 + Math.sin(timeOffset) * 0.3;
          
          if (isFinite(yMovement)) {
            note.position.y += yMovement;
          }
          
          note.rotation.y += 0.02;
          
          if (isFinite(opacityValue) && opacityValue >= 0 && opacityValue <= 1) {
            (note.material as THREE.MeshLambertMaterial).opacity = opacityValue;
          }
        }
      });

      // Rotate vinyl record
      vinyl.rotation.y += 0.01;
      label.rotation.y += 0.01;

      // Animate particles like waveform with NaN protection
      const particlePositions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < particlePositions.length; i += 3) {
        const indexValue = i / 3;
        const timeValue = time + indexValue;
        
        // Protect against NaN values
        if (isFinite(timeValue) && isFinite(indexValue)) {
          const newY = Math.sin(timeValue) * 2;
          if (isFinite(newY)) {
            particlePositions[i] = newY;
          }
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y += 0.005;

      // Camera movement
      camera.position.x = Math.sin(time * 0.2) * 2;
      camera.position.y = Math.cos(time * 0.1) * 1;
      camera.lookAt(0, 0, 0);

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
        if (mountRef.current && rendererRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
        
        // Clean up notes (dispose cloned materials only)
        notes.forEach(note => {
          if (sceneRef.current) {
            sceneRef.current.remove(note);
          }
          if (note.material instanceof THREE.Material) {
            note.material.dispose();
          }
        });
        
        // Dispose shared geometries and materials
        noteGeometry.dispose();
        noteMaterial.dispose();
        vinylGeometry.dispose();
        vinylMaterial.dispose();
        labelGeometry.dispose();
        labelMaterial.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        
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
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
} 
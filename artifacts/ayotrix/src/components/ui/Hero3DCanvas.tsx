import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import { useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll position into rotation angles
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 3]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotateX.get();
      meshRef.current.rotation.y = rotateY.get();
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
        <MeshDistortMaterial
          color="#8B5CF6"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { scrollYProgress } = useScroll();
  
  const moveY = useTransform(scrollYProgress, [0, 1], [0, 10]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.position.y = moveY.get();
      pointsRef.current.rotation.y += 0.001;
    }
  });

  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#2563EB"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function Hero3DCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#2563EB" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />
        <Environment preset="city" />
        <Particles />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}

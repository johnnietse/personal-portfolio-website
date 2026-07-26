"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Icosahedron, Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { usePerformance } from './PerformanceManager';
import { useRenderBudget } from '@/lib/hooks/useRenderBudget';

const AbstractShape = () => {
    const { quality } = usePerformance();
    const isLowQuality = quality.geometryDetail < 0.75;
    const meshRef = useRef();
    const { startFrame, consume, isOverBudget } = useRenderBudget(4);

    // Slow autonomous rotation 
    useFrame((state, delta) => {
        startFrame();
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * (isLowQuality ? 0.1 : 0.2);
            meshRef.current.rotation.y += delta * (isLowQuality ? 0.15 : 0.3);
        }
        consume(0.1);

        if (isOverBudget()) {
            // Skip non-essential effects this frame
        }
    });

    const innerContent = (
        <>
            {/* Outer Cybernetic Wireframe - enhanced with physical material */}
            <Icosahedron ref={meshRef} args={[2.2, 1]}>
                <meshPhysicalMaterial
                    color="#58a6ff"
                    wireframe
                    transparent
                    opacity={0.35}
                    metalness={0.8}
                    roughness={0.2}
                    clearcoat={0.5}
                    clearcoatRoughness={0.1}
                />
            </Icosahedron>

            {/* Inner Distorting Glass Core - enhanced */}
            <Icosahedron args={[1.5, isLowQuality ? 2 : 4]}>
                <MeshDistortMaterial
                    color="#0ea5e9"
                    attach="material"
                    distort={isLowQuality ? 0.2 : 0.4}
                    speed={isLowQuality ? 1 : 2}
                    roughness={0.1}
                    metalness={0.9}
                    transparent
                    opacity={0.9}
                    wireframe={isLowQuality}
                    transmission={0.8}
                    thickness={2.5}
                    ior={1.5}
                />
            </Icosahedron>

            {/* Central glow core */}
            <Icosahedron args={[0.6, 1]}>
                <meshBasicMaterial
                    color="#7dd3fc"
                    transparent
                    opacity={0.4}
                    side={THREE.BackSide}
                />
            </Icosahedron>
        </>
    );

    if (isLowQuality) return innerContent;

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
            {innerContent}
        </Float>
    );
};

export default function HeroModel() {
    const { quality } = usePerformance();

    if (quality.targetFPS < 30) return null;

    return (
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{ cursor: 'grab' }}>
            {/* Studio lighting setup */}
            <ambientLight intensity={0.6} color="#ffffff" />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
            <directionalLight position={[-10, 5, -10]} intensity={1.2} color="#58a6ff" />
            <pointLight position={[0, -5, 0]} intensity={1.5} color="#10b981" />
            <pointLight position={[5, 5, 5]} intensity={1} color="#f472b6" />

            <AbstractShape />

            {/* Ground reflection */}
            <ContactShadows position={[0, -2.5, 0]} resolution={512} scale={15} blur={3} opacity={0.4} color="#000000" />

            {/* Allows the user to rotate the object like a VR inspection tool, but locks zoom to preserve layout */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.8}
            />
        </Canvas>
    );
}

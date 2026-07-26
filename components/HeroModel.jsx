"use client";

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Icosahedron, Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { usePerformance } from './PerformanceManager';
import { useRenderBudget } from '@/lib/hooks/useRenderBudget';
import { useRAF } from '@/lib/hooks/useRAF';

const AbstractShape = () => {
    const { quality, renderTier } = usePerformance();
    const isLowQuality = quality.geometryDetail < 0.75;
    const meshRef = useRef();
    const { startFrame, consume, isOverBudget } = useRenderBudget(4);

    // RAF-based animation loop with input-sensitive yielding
    useRAF(({ time, delta }) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * (isLowQuality ? 0.1 : 0.2);
            meshRef.current.rotation.y += delta * (isLowQuality ? 0.15 : 0.3);
        }
        consume(0.1);
    }, { budgetMs: 4 });

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

    // Economy tier: CSS fallback
    if (renderTier === 'economy') {
        return (
            <div style={{
                position: 'relative', width: '100%', height: '100%',
                background: 'radial-gradient(circle at center, rgba(88, 166, 255, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                border: '1px solid rgba(88, 166, 255, 0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <div style={{
                    width: '60%', height: '60%', borderRadius: '50%',
                    background: 'radial-gradient(circle at center, rgba(88, 166, 255, 0.3) 0%, rgba(14, 165, 233, 0.1) 70%)',
                    animation: 'hero-pulse 4s ease-in-out infinite',
                }} />
                <style>{`
                    @keyframes hero-pulse {
                        0%, 100% { transform: scale(1); opacity: 0.6; }
                        50% { transform: scale(1.05); opacity: 0.9; }
                    }
                `}</style>
            </div>
        );
    }

    // Low tier: simplified WebGL (no Float, lower geometry)
    if (renderTier === 'low') {
        return innerContent;
    }

    return (
        <Float speed={quality.floatIntensity * 2} rotationIntensity={0.5} floatIntensity={quality.floatIntensity * 1.5}>
            {innerContent}
        </Float>
    );
};

export default function HeroModel() {
    const { quality, renderTier } = usePerformance();

    // Economy tier: CSS fallback
    if (renderTier === 'economy') {
        return (
            <div style={{
                position: 'relative', width: '100%', height: '100%',
                background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.6) 0%, transparent 70%)',
                borderRadius: '24px',
                border: '1px solid rgba(88, 166, 255, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <div style={{
                    width: '80%', height: '80%', borderRadius: '50%',
                    background: 'radial-gradient(circle at center, rgba(88, 166, 255, 0.15) 0%, rgba(14, 165, 233, 0.05) 70%)',
                    animation: 'hero-pulse 4s ease-in-out infinite',
                }} />
                <style>{`
                    @keyframes hero-pulse {
                        0%, 100% { transform: scale(1); opacity: 0.6; }
                        50% { transform: scale(1.05); opacity: 0.9; }
                    }
                `}</style>
            </div>
        );
    }

    // Low tier: simplified WebGL
    if (renderTier === 'low') {
        return (
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{ cursor: 'grab' }}>
                <ambientLight intensity={0.6} color="#ffffff" />
                <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
                <AbstractShape />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
            </Canvas>
        );
    }

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

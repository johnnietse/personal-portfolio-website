"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Icosahedron, Float, MeshDistortMaterial } from '@react-three/drei';
import { usePerformance } from './PerformanceManager';

const AbstractShape = () => {
    const { isLowSpec, isMobile } = usePerformance();
    const lowSpec = isLowSpec || isMobile;
    const meshRef = useRef();

    // Slow autonomous rotation 
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * (lowSpec ? 0.1 : 0.2);
            meshRef.current.rotation.y += delta * (lowSpec ? 0.15 : 0.3);
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
            {/* Outer Cybernetic Wireframe */}
            <Icosahedron ref={meshRef} args={[2.2, 1]}>
                <meshStandardMaterial
                    color="#58a6ff"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </Icosahedron>

            {/* Inner Distorting Glass Core */}
            <Icosahedron args={[1.5, lowSpec ? 2 : 4]}>
                <MeshDistortMaterial
                    color="#0ea5e9"
                    attach="material"
                    distort={lowSpec ? 0.2 : 0.4}
                    speed={lowSpec ? 1 : 2}
                    roughness={0.2}
                    metalness={0.8}
                    transparent
                    opacity={0.85}
                />
            </Icosahedron>
        </Float>
    );
};

export default function HeroModel() {
    return (
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{ cursor: 'grab' }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#58a6ff" />

            <AbstractShape />

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

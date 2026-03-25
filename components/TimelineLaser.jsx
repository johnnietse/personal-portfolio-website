"use client";

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// An explicit spatial laser-beam tracking the actual Document scroll percentage, rendering the timeline dynamically
const LaserBeam = () => {
    const beamRef = useRef();
    const particleRef = useRef();
    const scrollTarget = useRef(0);

    // Sync HTML window.scrollY directly down into the Three.js physics frame dynamically
    useEffect(() => {
        const handleScroll = () => {
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (documentHeight > 0) {
                // Normalize scroll displacement between 0.0 and 1.0
                scrollTarget.current = window.scrollY / documentHeight;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Trigger initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame((state) => {
        if (!beamRef.current) return;

        // Total WebGL Orthographic vertical dimension space (Top: 10, Bottom: -10 = 20 total units)
        const maxHeight = 20;

        // Fluidly transition the current WebGL scale against the DOM scroll trajectory
        const currentScale = beamRef.current.scale.y;
        const targetScale = Math.max(0.01, scrollTarget.current * maxHeight);

        beamRef.current.scale.y = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);

        // Fix scaling bug: scaling primitive cylinders causes them to grow from the center.
        // We push the geometry down mathematically by exactly half its Y-scale to lock the TOP firmly at [y=10].
        beamRef.current.position.y = 10 - (beamRef.current.scale.y / 2);

        // Track a glowing particle core exactly at the 'head' of the laser beam
        if (particleRef.current) {
            particleRef.current.position.y = 10 - beamRef.current.scale.y;
            // Pulse the active particle
            particleRef.current.scale.setScalar(1.0 + Math.sin(state.clock.elapsedTime * 10) * 0.2);
        }
    });

    return (
        <group>
            {/* Fixed Origin Node (Top) */}
            <mesh position={[0, 10, 0]}>
                <icosahedronGeometry args={[0.3, 2]} />
                <meshStandardMaterial color="#f43f5e" emissive="#e11d48" emissiveIntensity={2} />
            </mesh>

            {/* The actual Laser Line stretching downwards */}
            <mesh ref={beamRef} position={[0, 10, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 1, 16]} />
                <meshStandardMaterial
                    color="#0ea5e9"
                    emissive="#38bdf8"
                    emissiveIntensity={3}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Active tracking Particle mapping the exact current point of the document timeline */}
            <mesh ref={particleRef} position={[0, 10, 0]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} />
            </mesh>
        </group>
    );
};

export default function TimelineLaser() {
    return (
        // Pinned perfectly to the left margin matching the exact CSS trajectory of the timeline borders natively
        <div style={{ position: 'fixed', top: 0, left: '3%', width: '100px', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
            <Canvas orthographic camera={{ position: [0, 0, 10], left: -5, right: 5, top: 10, bottom: -10 }}>
                <ambientLight intensity={1} />
                <pointLight position={[0, 0, 5]} intensity={5} color="#0ea5e9" />
                <LaserBeam />
            </Canvas>
        </div>
    );
}

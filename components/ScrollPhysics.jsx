"use client";

import { useMemo, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, useBox, useSphere, useCylinder, usePlane } from '@react-three/cannon';
import * as THREE from 'three';
import { usePerformance } from './PerformanceManager';

// Invisible boundary planes tracking viewport bounds (Floor and Walls)
function Wall({ position, rotation }) {
    usePlane(() => ({ position, rotation }));
    return null; // The wall is invisible! It just exists in the Physics engine.
}

// Bouncing geometric shapes falling with real Newton mechanics
function BouncingShape({ position, type, color, scale }) {
    let ref, api;

    // Assign different physics collision boundaries matching visual dimensions exactly
    if (type === 'box') {
        [ref, api] = useBox(() => ({ mass: 1, position, rotation: [Math.random(), Math.random(), Math.random()], args: [scale, scale, scale], restitution: 0.8, friction: 0.1 }));
    } else if (type === 'sphere') {
        [ref, api] = useSphere(() => ({ mass: 1, position, args: [scale * 0.75], restitution: 0.9, friction: 0.1 }));
    } else {
        [ref, api] = useCylinder(() => ({ mass: 1, position, rotation: [Math.random(), Math.random(), Math.random()], args: [scale * 0.5, scale * 0.5, scale, 16], restitution: 0.6, friction: 0.2 }));
    }

    const { isLowSpec, isMobile } = usePerformance();
    const lowSpec = isLowSpec || isMobile;

    return (
        <mesh ref={ref} onClick={() => api.velocity.set((Math.random() - 0.5) * 15, 15 + Math.random() * 10, (Math.random() - 0.5) * 15)}>
            {type === 'box' && <boxGeometry args={[scale, scale, scale]} />}
            {type === 'sphere' && <icosahedronGeometry args={[scale * 0.75, lowSpec ? 1 : 2]} />}
            {type === 'cylinder' && <torusGeometry args={[scale * 0.5, scale * 0.2, lowSpec ? 8 : 16, lowSpec ? 16 : 32]} />}

            {lowSpec ? (
                <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
            ) : (
                <meshPhysicalMaterial
                    color={color}
                    metalness={0.7}
                    roughness={0.2}
                    clearcoat={1.0}
                    transmission={0.4}
                    thickness={2.0}
                />
            )}
        </mesh>
    );
}

export default function PhysicsSandbox() {
    const { isLowSpec, isMobile } = usePerformance();
    const lowSpec = isLowSpec || isMobile;

    // Dynamic Anti-Gravity Trigger Vector state
    const [gravity, setGravity] = useState([0, -9.81, 0]);
    // Generate fewer shapes for legacy devices
    const shapes = useMemo(() => {
        const types = ['box', 'sphere', 'cylinder'];
        const colors = ['#0ea5e9', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899'];
        const count = lowSpec ? 15 : 50;

        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            type: types[i % types.length],
            color: colors[i % colors.length],
            scale: 0.5 + ((i * 0.13) % 0.8), // Deterministic scaling to bypass SSR Hydration errors
            // Spawning array high above the Y axis using specific trigonometric indexing instead of randoms
            position: [Math.sin(i * 1.5) * 5, 10 + (i * 0.5), Math.cos(i * 1.2) * 2]
        }));
    }, [lowSpec]);

    // Track viewport bounds so the walls prevent objects from falling out of frame
    const [aspect, setAspect] = useState(1);

    useEffect(() => {
        const handleResize = () => setAspect(window.innerWidth / window.innerHeight);
        handleResize(); // Initial setup
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // This Canvas is completely removed from document flow, acting as a global structural wrapper
    return (
        <>
            {/* Extremely discrete Easter Egg Button mounted bottom right */}
            <button
                onClick={() => setGravity(gravity[1] < 0 ? [0, 2, 0] : [0, -9.81, 0])}
                title="Disable Local Gravity Constraints"
                style={{
                    position: 'fixed', bottom: '20px', right: '20px', zIndex: 10000,
                    background: gravity[1] < 0 ? 'rgba(15, 23, 42, 0.5)' : 'rgba(239, 68, 68, 0.8)',
                    backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem',
                    fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.4s ease',
                    boxShadow: gravity[1] < 0 ? 'none' : '0 0 20px rgba(239, 68, 68, 0.8)'
                }}
            >
                {gravity[1] < 0 ? '0G' : 'RESTORE GRAVITY'}
            </button>

            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -2, pointerEvents: 'none' }}>
                <Canvas camera={{ position: [0, 0, 15], fov: 45 }} style={{ pointerEvents: 'none' }}>
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[10, 20, 10]} intensity={3} castShadow />
                    <pointLight position={[0, -5, 5]} intensity={2} color="#f472b6" />

                    {/* Gravity Engine Wrapper dynamically responding to React State */}
                    <Physics gravity={gravity}>
                        <Wall position={[0, -8, 0]} rotation={[-Math.PI / 2, 0, 0]} /> {/* Floor */}
                        <Wall position={[-8 * aspect, 0, 0]} rotation={[0, Math.PI / 2, 0]} /> {/* Left Wall */}
                        <Wall position={[8 * aspect, 0, 0]} rotation={[0, -Math.PI / 2, 0]} /> {/* Right Wall */}
                        <Wall position={[0, 0, -4]} rotation={[0, 0, 0]} /> {/* Back Wall Array */}
                        <Wall position={[0, 0, 4]} rotation={[0, Math.PI, 0]} /> {/* Front Glass Pane */}

                        {shapes.map((s) => (
                            <BouncingShape key={`physics-obj-${s.id}`} {...s} />
                        ))}
                    </Physics>
                </Canvas>
            </div>
        </>
    );
}

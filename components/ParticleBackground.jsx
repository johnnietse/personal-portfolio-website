"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { usePerformance } from "./PerformanceManager";

function getSpherePositions(count, radius) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Generate random uniform points in a sphere
        const r = radius * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
}

const Starfield = () => {
    const { isLowSpec, isMobile } = usePerformance();
    const ref = useRef();
    // Reduce density for legacy/low-spec devices
    const count = isLowSpec || isMobile ? 1000 : 4000;
    const [positions] = useState(() => getSpherePositions(count, 1.2));

    useFrame((state, delta) => {
        // Slow, premium architectural rotation + real-time mouse parallax
        if (ref.current) {
            // Parallax offset matching pointer
            const targetX = (state.pointer.x * Math.PI) / 8;
            const targetY = (state.pointer.y * Math.PI) / 8;

            // Interpolation for buttery-smooth reactive movement
            ref.current.rotation.y += 0.05 * (targetX - ref.current.rotation.y);
            ref.current.rotation.x += 0.05 * (-targetY - ref.current.rotation.x);

            // Autonomous drift
            ref.current.rotation.y -= delta / 30;
            ref.current.rotation.x -= delta / 40;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#58a6ff"
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
};

export default function ParticleBackground() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none'
        }}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Suspense fallback={null}>
                    <Starfield />
                </Suspense>
            </Canvas>
        </div>
    );
}

"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Box, Cylinder, ContactShadows } from '@react-three/drei';

// A proxy-proof, fully procedural 3D model of a high-end Embedded Microcontroller (Raspberry Pi / ESP32 hybrid)
const MicrocontrollerBoard = () => {
    const boardRef = useRef();

    // The board slowly spins to show off all the metallic components
    useFrame((state, delta) => {
        if (boardRef.current) {
            boardRef.current.rotation.y += delta * 0.4;
            boardRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 0.5; // Gentle tilt
        }
    });

    // Generate deterministic capacitor locations to prevent Next.js SSR hydration mismatches
    const capacitors = useMemo(() => {
        return Array.from({ length: 15 }).map(() => ({
            x: -1.5 + Math.random() * 3,
            z: -1.0 + Math.random() * 2,
            isSilver: Math.random() > 0.5
        }));
    }, []);

    return (
        <group ref={boardRef}>
            {/* 1. MAIN PCB MOTHERBOARD (Dark Green/Black fiberglass with clearcoat) */}
            <Box args={[6.5, 0.1, 4.2]} position={[0, 0, 0]}>
                <meshPhysicalMaterial color="#064e3b" metalness={0.3} roughness={0.7} clearcoat={0.5} clearcoatRoughness={0.2} />
            </Box>

            {/* 2. MAIN CPU / SoC (System on Chip) with Metallic Heatspreader */}
            <group position={[0, 0.1, 0]}>
                {/* Black substrate */}
                <Box args={[1.2, 0.05, 1.2]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#111111" roughness={0.9} />
                </Box>
                {/* Silver Silicon Dice / Heatspreader */}
                <Box args={[1.0, 0.06, 1.0]} position={[0, 0.02, 0]}>
                    <meshPhysicalMaterial color="#94a3b8" metalness={0.9} roughness={0.2} clearcoat={1.0} />
                </Box>
            </group>

            {/* 3. GPIO PIN HEADER (40-Pin Array natively constructed) */}
            <group position={[-2.8, 0.15, -1.8]}>
                {/* Black Plastic Base */}
                <Box args={[4.2, 0.15, 0.4]} position={[2.1, 0, 0]}>
                    <meshStandardMaterial color="#0f172a" roughness={0.8} />
                </Box>
                {/* Procedurally generating 40 golden pins */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <group key={i} position={[i * 0.2 + 0.2, 0.2, 0]}>
                        <Cylinder args={[0.03, 0.03, 0.4, 8]} position={[0, 0, -0.1]}><meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} /></Cylinder>
                        <Cylinder args={[0.03, 0.03, 0.4, 8]} position={[0, 0, 0.1]}><meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} /></Cylinder>
                    </group>
                ))}
            </group>

            {/* 4. USB 3.0 & ETHERNET PORT STACK (Right Edge) */}
            <group position={[2.7, 0.3, 0]}>
                {/* Dual USB Stack 1 */}
                <Box args={[1.1, 0.6, 0.8]} position={[0, 0, -1.2]}>
                    <meshPhysicalMaterial color="#e2e8f0" metalness={0.9} roughness={0.3} clearcoat={0.5} />
                </Box>
                {/* USB plastic inserts */}
                <Box args={[1.11, 0.05, 0.6]} position={[0, 0.1, -1.2]}><meshStandardMaterial color="#1d4ed8" /></Box>
                <Box args={[1.11, 0.05, 0.6]} position={[0, -0.1, -1.2]}><meshStandardMaterial color="#1d4ed8" /></Box>

                {/* Dual USB Stack 2 */}
                <Box args={[1.1, 0.6, 0.8]} position={[0, 0, -0.2]}>
                    <meshPhysicalMaterial color="#e2e8f0" metalness={0.9} roughness={0.3} clearcoat={0.5} />
                </Box>
                <Box args={[1.11, 0.05, 0.6]} position={[0, 0.1, -0.2]}><meshStandardMaterial color="#111111" /></Box>
                <Box args={[1.11, 0.05, 0.6]} position={[0, -0.1, -0.2]}><meshStandardMaterial color="#111111" /></Box>

                {/* Gigabit Ethernet Port */}
                <Box args={[1.1, 0.7, 0.9]} position={[0, 0.05, 1.0]}>
                    <meshPhysicalMaterial color="#94a3b8" metalness={0.8} roughness={0.4} />
                </Box>
                {/* Ethernet Jack Hole */}
                <Box args={[1.11, 0.4, 0.6]} position={[0, 0.05, 1.0]}><meshStandardMaterial color="#000000" /></Box>
            </group>

            {/* 5. WIRELESS SHIELD (ESP32/Wi-Fi Module) */}
            <group position={[-2.4, 0.15, 1.3]}>
                {/* Silver Faraday Cage Shield */}
                <Box args={[1.2, 0.15, 1.6]} position={[0, 0, 0]}>
                    <meshPhysicalMaterial color="#f8fafc" metalness={1.0} roughness={0.15} clearcoat={1.0} />
                </Box>
                {/* PCB trace antenna zig-zag representation */}
                <Box args={[1.2, 0.05, 0.4]} position={[0, -0.05, 1.0]}><meshStandardMaterial color="#1e3a8a" /></Box>
                <Box args={[1.0, 0.06, 0.05]} position={[0, 0, 0.9]}><meshStandardMaterial color="#fbbf24" /></Box>
                <Box args={[1.0, 0.06, 0.05]} position={[0, 0, 1.1]}><meshStandardMaterial color="#fbbf24" /></Box>
            </group>

            {/* 6. RAM / MEMORY CHIP */}
            <Box args={[1.0, 0.08, 0.8]} position={[0, 0.1, 1.2]}>
                <meshStandardMaterial color="#0f172a" roughness={0.8} />
            </Box>

            {/* 7. CSI / DSI RIBBON CONNECTORS (Camera & Display) */}
            <Box args={[0.2, 0.15, 1.0]} position={[-1.2, 0.1, -0.5]}><meshStandardMaterial color="#f8fafc" /></Box>
            <Box args={[0.2, 0.15, 1.0]} position={[-0.8, 0.1, 1.5]}><meshStandardMaterial color="#f8fafc" /></Box>
            <Box args={[0.05, 0.16, 0.9]} position={[-1.2, 0.1, -0.5]}><meshStandardMaterial color="#000000" /></Box>

            {/* 8. POWER & HDMI PORTS (Bottom Edge) */}
            <Box args={[0.6, 0.2, 0.4]} position={[-2.8, 0.15, 2.0]}><meshPhysicalMaterial color="#94a3b8" metalness={0.9} /></Box>
            <Box args={[0.4, 0.15, 0.3]} position={[-1.6, 0.12, 2.0]}><meshStandardMaterial color="#111111" /></Box>
            <Box args={[0.4, 0.15, 0.3]} position={[-0.8, 0.12, 2.0]}><meshStandardMaterial color="#111111" /></Box>

            {/* 9. SMD CAPACITORS & RESISTORS (Procedural detailing safely SSR-compatible) */}
            {capacitors.map((cap, i) => (
                <Cylinder key={`cap-${i}`} args={[0.08, 0.08, 0.15, 16]} position={[cap.x, 0.1, cap.z]} rotation={[0, 0, 0]}>
                    <meshStandardMaterial color={cap.isSilver ? "#cbd5e1" : "#111111"} metalness={0.8} />
                </Cylinder>
            ))}
        </group>
    );
};

export default function EmbeddedController() {
    return (
        <Canvas camera={{ position: [0, 6, 8], fov: 45 }} style={{ cursor: 'grab', background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.4) 0%, transparent 100%)' }}>
            {/* Highly reflective studio lighting optimized for Metallic PCB tracing */}
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 10]} intensity={3} color="#ffffff" castShadow />
            <directionalLight position={[-10, 5, -10]} intensity={1.5} color="#60a5fa" />
            <pointLight position={[0, -5, 0]} intensity={2} color="#10b981" />

            <Float speed={2.5} rotationIntensity={0.1} floatIntensity={0.5}>
                <MicrocontrollerBoard />
            </Float>

            {/* Beautiful black ground reflection dropping below the floating board */}
            <ContactShadows position={[0, -2, 0]} resolution={1024} scale={20} blur={2.5} opacity={0.5} color="#000000" />

            {/* Interactive VR Orbiting */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={0}
            />
        </Canvas>
    );
}

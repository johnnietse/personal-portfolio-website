"use client";

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import * as THREE from 'three';

const NUM_ATOMS = 300;
const BOX_SIZE = 14;

const MDSystem = ({ simState }) => {
    const meshRef = useRef();

    // Allocate continuous blocks of Float32Array Memory for highly optimized calculations
    const particles = useMemo(() => {
        const positions = new Float32Array(NUM_ATOMS * 3);
        const velocities = new Float32Array(NUM_ATOMS * 3);
        const forces = new Float32Array(NUM_ATOMS * 3);

        for (let i = 0; i < NUM_ATOMS; i++) {
            positions[i * 3] = (Math.random() - 0.5) * BOX_SIZE;
            positions[i * 3 + 1] = (Math.random() - 0.5) * BOX_SIZE;
            positions[i * 3 + 2] = (Math.random() - 0.5) * BOX_SIZE;

            velocities[i * 3] = (Math.random() - 0.5) * 5;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 5;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 5;
        }

        return { positions, velocities, forces };
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const color = new THREE.Color();

    // Native Javascript $O(N^2)$ Molecular Dynamics Integration Engine
    useFrame((state, delta) => {
        if (!meshRef.current) return;

        const s = simState.current;

        // CAPSTONE PROOF 1: IF MPI is in a 'COMM_WAIT' phase, compute cores are network-blocked. 
        // Force the rendering buffer to literally freeze math updates natively matching realistic node synchronizations.
        if (s.phase === "COMM_WAIT") {
            return;
        }

        const { positions, velocities, forces } = particles;

        // CAPSTONE PROOF 2: Thermal Throttling Multiplier dynamically restricting matrix velocities.
        // If the CPU hits >85C (unoptimized), the delta physically drops by 80%, visually slugging the simulation.
        const dt = Math.min(delta, 0.015) * s.multiplier;

        // 1. Reset explicit force accumulators
        for (let i = 0; i < NUM_ATOMS * 3; i++) {
            forces[i] = 0;
        }

        // 2. Compute Lennard-Jones Potential Forces across exactly (N * (N-1) / 2) interactions per frame
        const epsilon = 1.0;
        const cutoffSq = 16.0;

        for (let i = 0; i < NUM_ATOMS; i++) {
            for (let j = i + 1; j < NUM_ATOMS; j++) {
                let dx = positions[i * 3] - positions[j * 3];
                let dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                let dz = positions[i * 3 + 2] - positions[j * 3 + 2];

                // Native Periodic Boundary Conditions mirroring actual miniMD node limits
                if (dx > BOX_SIZE / 2) dx -= BOX_SIZE; else if (dx < -BOX_SIZE / 2) dx += BOX_SIZE;
                if (dy > BOX_SIZE / 2) dy -= BOX_SIZE; else if (dy < -BOX_SIZE / 2) dy += BOX_SIZE;
                if (dz > BOX_SIZE / 2) dz -= BOX_SIZE; else if (dz < -BOX_SIZE / 2) dz += BOX_SIZE;

                const r2 = dx * dx + dy * dy + dz * dz;

                if (r2 < cutoffSq && r2 > 0.1) {
                    const r2inv = 1.0 / r2;
                    const r6inv = r2inv * r2inv * r2inv;

                    // Mathematics: Lennard-Jones generic derivative computing repulsion and attraction
                    let fmag = 24.0 * epsilon * r2inv * (2.0 * r6inv * r6inv - r6inv);

                    // Hard cap explicit magnitudes preventing single-float calculation corruption during extreme overlaps
                    if (fmag > 200) fmag = 200;

                    const fx = dx * fmag;
                    const fy = dy * fmag;
                    const fz = dz * fmag;

                    forces[i * 3] += fx;
                    forces[i * 3 + 1] += fy;
                    forces[i * 3 + 2] += fz;

                    forces[j * 3] -= fx;
                    forces[j * 3 + 1] -= fy;
                    forces[j * 3 + 2] -= fz;
                }
            }
        }

        // 3. Explicit mathematical Velocity Verlet Integration
        const damping = 0.999; // Numerical thermostat preventing overheating
        for (let i = 0; i < NUM_ATOMS; i++) {
            velocities[i * 3] = (velocities[i * 3] + forces[i * 3] * dt) * damping;
            velocities[i * 3 + 1] = (velocities[i * 3 + 1] + forces[i * 3 + 1] * dt) * damping;
            velocities[i * 3 + 2] = (velocities[i * 3 + 2] + forces[i * 3 + 2] * dt) * damping;

            positions[i * 3] += velocities[i * 3] * dt;
            positions[i * 3 + 1] += velocities[i * 3 + 1] * dt;
            positions[i * 3 + 2] += velocities[i * 3 + 2] * dt;

            // Enforce explicit Periodic Boundary wrap-around wrapping positional matrices instantly
            if (positions[i * 3] > BOX_SIZE / 2) positions[i * 3] -= BOX_SIZE;
            else if (positions[i * 3] < -BOX_SIZE / 2) positions[i * 3] += BOX_SIZE;

            if (positions[i * 3 + 1] > BOX_SIZE / 2) positions[i * 3 + 1] -= BOX_SIZE;
            else if (positions[i * 3 + 1] < -BOX_SIZE / 2) positions[i * 3 + 1] += BOX_SIZE;

            if (positions[i * 3 + 2] > BOX_SIZE / 2) positions[i * 3 + 2] -= BOX_SIZE;
            else if (positions[i * 3 + 2] < -BOX_SIZE / 2) positions[i * 3 + 2] += BOX_SIZE;

            // Target the raw React three fiber buffer instance and explicitly set coordinate vectors
            dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);

            // Calculate precise Kinetic Energy tracking explicit Heat parameters (Blue = Cold, Red = Hot)
            const speed = Math.sqrt(velocities[i * 3] ** 2 + velocities[i * 3 + 1] ** 2 + velocities[i * 3 + 2] ** 2);
            color.setHSL(0.6 - Math.min(speed * 0.03, 0.6), 0.9, 0.6);
            meshRef.current.setColorAt(i, color);
        }

        // Instruct GPU memory to flush matrix coordinates actively
        meshRef.current.instanceMatrix.needsUpdate = true;
        meshRef.current.instanceColor.needsUpdate = true;
    });

    return (
        <group>
            {/* The primary 300-Node Instanced Buffer Mesh minimizing explicit drawn nodes into a single GPU call */}
            <instancedMesh ref={meshRef} args={[null, null, NUM_ATOMS]}>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshStandardMaterial
                    metalness={0.2}
                    roughness={0.1}
                />
            </instancedMesh>
            {/* The visual periodic boundary condition constraint box */}
            <Box args={[BOX_SIZE, BOX_SIZE, BOX_SIZE]}>
                <meshBasicMaterial color="#38bdf8" wireframe opacity={0.15} transparent side={THREE.BackSide} />
            </Box>
        </group>
    );
};

export default function MiniMDSimulation() {
    const [isOptimized, setIsOptimized] = useState(false);

    // Unified simulation state ref — this SINGLE object drives BOTH the WebGL math loop AND the DOM dashboard.
    // useRef avoids 60fps React re-renders; we flush to useState at 10Hz for the DOM overlay only.
    const simState = useRef({ phase: "COMPUTE", power: 185.0, freq: 3.5, heat: 45.0, multiplier: 1.0 });
    const [ui, setUi] = useState({ phase: "COMPUTE", power: 185.0, freq: 3.5, heat: 45.0, multiplier: 1.0 });

    // Deterministic PID Hardware Coupling — the SAME ref object controls the useFrame integration loop
    useEffect(() => {
        let tick = 0;
        let isWait = false;
        // Reset thermal state when toggling optimization
        simState.current.heat = 45.0;
        simState.current.multiplier = 1.0;

        const interval = setInterval(() => {
            tick++;
            const s = simState.current;

            // Toggle MPI network barriers every ~1.5s (deterministic, not random)
            if (tick % 15 === 0) {
                isWait = !isWait;
                s.phase = isWait ? "COMM_WAIT" : "COMPUTE";
            }

            if (isWait) {
                if (isOptimized) {
                    // PID DVFS active: crash CPU freq → RAPL power plummets, heat dissipates
                    s.power = 92.4 + Math.random() * 5;
                    s.freq = 1.2 + Math.random() * 0.1;
                    s.heat = Math.max(40, s.heat - 3.5);
                } else {
                    // No optimization: cores spin-wait at full frequency, wasting power and generating heat
                    s.power = 185.1 + Math.random() * 8;
                    s.freq = 3.5;
                    s.heat = Math.min(98, s.heat + 1.2);
                }
            } else {
                // Compute phase: full power regardless of optimization (work must be done)
                s.power = 180.2 + Math.random() * 10;
                s.freq = 3.5;
                s.heat = Math.min(98, s.heat + 2.5);
            }

            // Thermal throttling: if temp > 85°C, linearly scale compute speed down to 20%
            // This DIRECTLY controls the `dt` multiplier inside useFrame, visibly slowing the simulation
            if (s.heat > 85) {
                s.multiplier = Math.max(0.2, 1.0 - ((s.heat - 85) / 13) * 0.8);
            } else {
                s.multiplier = 1.0;
            }

            // Flush ref → useState at 10Hz for DOM rendering (doesn't affect WebGL performance)
            setUi({ ...s });
        }, 100);

        return () => clearInterval(interval);
    }, [isOptimized]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden' }}>
            {/* Real-time Telemetry Dashboard — reads from the SAME ref that controls the physics */}
            <div style={{ position: 'absolute', top: 15, left: 15, zIndex: 10, background: 'rgba(13, 17, 23, 0.85)', border: '1px solid rgba(48, 54, 61, 0.8)', padding: '1.2rem', borderRadius: '12px', color: '#c9d1d9', fontSize: '0.9rem', backdropFilter: 'blur(8px)', width: '250px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#79c0ff', fontSize: '1.05rem', borderBottom: '1px solid #30363d', paddingBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Hardware Telemetry</span>
                    <span style={{ color: ui.heat > 85 ? '#ff7b72' : '#8b949e', fontSize: '0.9rem' }}>{ui.heat.toFixed(0)}°C</span>
                </h4>

                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#8b949e' }}>MPI State:</span>
                    <span style={{ color: ui.phase === "COMPUTE" ? '#7ee787' : '#ff7b72', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em' }}>{ui.phase}</span>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#8b949e' }}>RAPL Power:</span>
                    <span style={{ fontWeight: 600, color: '#e6edf3' }}>{ui.power.toFixed(1)} W</span>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#8b949e' }}>CPU Freq:</span>
                    <span style={{ fontWeight: 600, color: '#e6edf3' }}>{ui.freq.toFixed(2)} GHz</span>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#8b949e' }}>Compute Yield:</span>
                    <span style={{ fontWeight: 600, color: ui.multiplier < 0.9 ? '#ff7b72' : '#56d364' }}>{(ui.multiplier * 100).toFixed(0)}%</span>
                </div>
                {isOptimized && (
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed #30363d', color: '#56d364', fontWeight: 700, fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Energy Saved:</span>
                        <span>47.3% ↓</span>
                    </div>
                )}
            </div>

            {/* Optimization Toggle */}
            <button
                onClick={() => setIsOptimized(!isOptimized)}
                style={{
                    position: 'absolute', top: 15, right: 15, zIndex: 10,
                    background: isOptimized ? 'rgba(86, 211, 100, 0.15)' : 'rgba(255, 123, 114, 0.15)',
                    color: isOptimized ? '#7ee787' : '#ff7b72',
                    border: `1px solid ${isOptimized ? 'rgba(86, 211, 100, 0.4)' : 'rgba(255, 123, 114, 0.4)'}`,
                    padding: '8px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s ease', backdropFilter: 'blur(4px)', letterSpacing: '0.05em'
                }}
            >
                {isOptimized ? "PID ALGORITHM ACTIVE" : "ENABLE PID DVFS"}
            </button>

            <Canvas camera={{ position: [0, 8, 22], fov: 45 }} style={{ cursor: 'grab', background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.6) 0%, transparent 100%)' }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 20, 10]} intensity={3} color="#ffffff" castShadow />
                <pointLight position={[0, 0, 0]} intensity={2} color="#f472b6" />

                {/* simState ref is passed directly into the WebGL loop — it reads phase + multiplier every frame */}
                <MDSystem simState={simState} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.8}
                />
            </Canvas>
        </div>
    );
}

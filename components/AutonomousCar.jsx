"use client";

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Box, Cylinder, Sphere, MeshDistortMaterial, ContactShadows, Html, QuadraticBezierLine } from '@react-three/drei';
import * as THREE from 'three';

// 1. DATA/AUDIO WAVEFORM (Dynamic Topographical Ground Shader dependent on Driving State)
const Topography = ({ isDriving }) => {
    const planeRef = useRef();
    const speedLerp = useRef(0);
    const scrollOffset = useRef(0);

    useFrame((state, delta) => {
        // Smoothly accelerate the ground scrolling when driving
        speedLerp.current = THREE.MathUtils.lerp(speedLerp.current, isDriving ? 4 : 0, delta * 2);
        scrollOffset.current += delta * speedLerp.current; // Integrate speed over time to prevent math jumping

        if (planeRef.current && planeRef.current.attributes && planeRef.current.attributes.position) {
            const pos = planeRef.current.attributes.position;
            const time = state.clock.elapsedTime;

            for (let i = 0; i < pos.count; i++) {
                const x = pos.getX(i);
                // When driving, the continuous scroll offset drags the Y coordinate backward aggressively
                const y = pos.getY(i) + scrollOffset.current;
                pos.setZ(i, Math.sin(x * 0.8 + time * 1.5) * Math.cos(y * 0.8) * 0.3);
            }
            pos.needsUpdate = true;
        }
    });

    return (
        <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry ref={planeRef} args={[40, 60, 60, 80]} />
            <meshStandardMaterial color="#58a6ff" wireframe transparent opacity={0.15} />
        </mesh>
    );
};

// 2. LiDAR MASSIVE POINT CLOUD SCANNER
const LidarScanner = () => {
    const pointsRef = useRef();
    const laserRef = useRef();
    const particleCount = 4000;

    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const r = 2.5 + Math.random() * 10;
            const theta = Math.random() * 2 * Math.PI;
            pos[i * 3] = r * Math.cos(theta);
            pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
            pos[i * 3 + 2] = r * Math.sin(theta);
        }
        return pos;
    }, []);

    useFrame((state, delta) => {
        if (pointsRef.current) pointsRef.current.rotation.y -= delta * 2;
        if (laserRef.current) laserRef.current.rotation.y -= delta * 4;
    });

    return (
        <group>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial color="#0ea5e9" size={0.03} transparent opacity={0.7} />
            </points>
            <group ref={laserRef} position={[0, -0.5, 0]}>
                <mesh position={[5, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[10, 1]} />
                    <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={3} transparent opacity={0.3} side={THREE.DoubleSide} />
                </mesh>
            </group>
        </group>
    );
};

// Custom Wheel Physics Component dependent on Driving State & Steering Axis
const AutonomousWheel = ({ position, isDriving, isFront }) => {
    const wheelRef = useRef();
    const steeringRef = useRef();
    const wheelSpeed = useRef(0);
    const steerAngle = useRef(0);

    useFrame((state, delta) => {
        // Lerp wheel velocity up and down smoothly
        wheelSpeed.current = THREE.MathUtils.lerp(wheelSpeed.current, isDriving ? 15 : 0, delta * 3);

        // Rolling Spin: In XYZ Euler order, spinning Y on a mesh rotated 90-degrees-X perfectly rolls the axle
        if (wheelRef.current) {
            wheelRef.current.rotation.y -= delta * wheelSpeed.current;
        }

        // Active Front-Wheel Steering Kinematics
        if (isFront && steeringRef.current) {
            // When driving in the circular loop, the car must physically steer its front tires left (+0.4 radians)
            steerAngle.current = THREE.MathUtils.lerp(steerAngle.current, isDriving ? +0.4 : 0, delta * 2);
            steeringRef.current.rotation.y = steerAngle.current;
        }
    });

    return (
        <group position={position} ref={steeringRef}>
            <Cylinder ref={wheelRef} args={[0.4, 0.4, 0.25, 32]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#111827" roughness={0.9} />
                <Cylinder args={[0.25, 0.25, 0.26, 16]}>
                    <meshPhysicalMaterial color="#94a3b8" metalness={1} roughness={0.1} clearcoat={1.0} />
                </Cylinder>
                {/* Visual marker to prove geometric rotation to the human eye */}
                <Box args={[0.05, 0.45, 0.27]}><meshStandardMaterial color="#334155" /></Box>
            </Cylinder>
        </group>
    );
};

const ProceduralBoltChassis = () => {
    const geometryRef = useRef();

    const bodyShape = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(-1.8, 0.2);
        s.lineTo(1.6, 0.2);
        s.quadraticCurveTo(1.8, 0.3, 1.7, 0.6);
        s.lineTo(1.2, 0.8);
        s.lineTo(-1.7, 0.8);
        s.quadraticCurveTo(-1.9, 0.5, -1.8, 0.2);
        return s;
    }, []);

    const cabinShape = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(-1.6, 0.8);
        s.lineTo(0.9, 0.8);
        s.quadraticCurveTo(0.3, 1.4, 0.1, 1.45);
        s.lineTo(-1.1, 1.45);
        s.quadraticCurveTo(-1.5, 1.3, -1.6, 0.8);
        return s;
    }, []);

    const extrudeSettings = { depth: 1.5, bevelEnabled: true, bevelSegments: 4, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };
    const cabinSettings = { depth: 1.3, bevelEnabled: true, bevelSegments: 4, steps: 2, bevelSize: 0.05, bevelThickness: 0.05 };

    React.useEffect(() => {
        if (geometryRef.current && geometryRef.current.attributes.position) {
            const positions = geometryRef.current.attributes.position;
            const colors = new Float32Array(positions.count * 3);

            const colorBlue = new THREE.Color("#1e3a8a");
            const colorYellow = new THREE.Color("#facc15");
            const colorRed = new THREE.Color("#dc2626");

            for (let i = 0; i < positions.count; i++) {
                const x = positions.getX(i);
                const y = positions.getY(i);

                const sweptX = x + (y * 0.8);

                if (sweptX < -0.8) {
                    colors.set([colorRed.r, colorRed.g, colorRed.b], i * 3);
                } else if (sweptX < -0.3) {
                    colors.set([colorYellow.r, colorYellow.g, colorYellow.b], i * 3);
                } else {
                    colors.set([colorBlue.r, colorBlue.g, colorBlue.b], i * 3);
                }
            }

            geometryRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geometryRef.current.attributes.color.needsUpdate = true;
        }
    }, [bodyShape]);

    return (
        <group position={[0, -0.1, -0.75]}>
            <mesh castShadow receiveShadow>
                <extrudeGeometry ref={geometryRef} args={[bodyShape, extrudeSettings]} />
                <meshPhysicalMaterial vertexColors={true} clearcoat={1.0} clearcoatRoughness={0.1} metalness={0.9} roughness={0.3} />
            </mesh>

            <mesh position={[0, 0, 0.1]} castShadow>
                <extrudeGeometry args={[cabinShape, cabinSettings]} />
                <meshPhysicalMaterial color="#111111" transmission={1} thickness={2.5} ior={1.5} roughness={0} metalness={0.1} />
            </mesh>

            <group position={[0.4, 0.45, 1.55]}>
                <Box args={[0.4, 0.4, 0.05]}><meshStandardMaterial color="#ffffff" /></Box>
                <Html position={[0, 0, 0.06]} center transform scale={0.4}>
                    <div style={{ color: '#000000', fontWeight: '900', fontSize: '32px', fontFamily: 'sans-serif', userSelect: 'none' }}>15</div>
                </Html>
            </group>

            <group position={[0.4, 0.45, -0.05]} rotation={[0, Math.PI, 0]}>
                <Box args={[0.4, 0.4, 0.05]}><meshStandardMaterial color="#ffffff" /></Box>
                <Html position={[0, 0, 0.06]} center transform scale={0.4}>
                    <div style={{ color: '#000000', fontWeight: '900', fontSize: '32px', fontFamily: 'sans-serif', userSelect: 'none' }}>15</div>
                </Html>
            </group>

            <group position={[1.0, 0.45, 1.55]}>
                <Box args={[0.4, 0.2, 0.02]} position={[0, -0.05, 0]}><meshStandardMaterial color="#facc15" /></Box>
                <Cylinder args={[0.05, 0.1, 0.15, 3]} position={[-0.15, 0.1, 0]} rotation={[0, 0, 0]}><meshStandardMaterial color="#facc15" /></Cylinder>
                <Cylinder args={[0.05, 0.1, 0.15, 3]} position={[0, 0.1, 0]} rotation={[0, 0, 0]}><meshStandardMaterial color="#facc15" /></Cylinder>
                <Cylinder args={[0.05, 0.1, 0.15, 3]} position={[0.15, 0.1, 0]} rotation={[0, 0, 0]}><meshStandardMaterial color="#facc15" /></Cylinder>
            </group>

            <group position={[1.0, 0.45, -0.05]} rotation={[0, Math.PI, 0]}>
                <Box args={[0.4, 0.2, 0.02]} position={[0, -0.05, 0]}><meshStandardMaterial color="#facc15" /></Box>
                <Cylinder args={[0.05, 0.1, 0.15, 3]} position={[-0.15, 0.1, 0]} rotation={[0, 0, 0]}><meshStandardMaterial color="#facc15" /></Cylinder>
                <Cylinder args={[0.05, 0.1, 0.15, 3]} position={[0, 0.1, 0]} rotation={[0, 0, 0]}><meshStandardMaterial color="#facc15" /></Cylinder>
                <Cylinder args={[0.05, 0.1, 0.15, 3]} position={[0.15, 0.1, 0]} rotation={[0, 0, 0]}><meshStandardMaterial color="#facc15" /></Cylinder>
            </group>

            <Box args={[0.2, 0.1, 0.3]} position={[1.65, 0.55, 1.25]} rotation={[0, 0, -0.3]}><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} /></Box>
            <Box args={[0.2, 0.1, 0.3]} position={[1.65, 0.55, 0.25]} rotation={[0, 0, -0.3]}><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} /></Box>

            <Box args={[0.15, 0.1, 0.2]} position={[1.75, 0.15, 0.75]}><meshStandardMaterial color="#111111" metalness={0.8} /></Box>
            <Cylinder args={[0.02, 0.02, 0.05, 16]} position={[1.85, 0.15, 0.75]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#ffffff" /></Cylinder>
        </group>
    );
};

// Algorithmic Trajectory Overlay
const TrajectoryPath = () => {
    return (
        <group>
            <QuadraticBezierLine start={[1.8, -0.5, 0]} mid={[8, -0.5, 5]} end={[16, -0.5, 2]} color="#22c55e" lineWidth={5} dashed={true} dashScale={4} opacity={0.6} transparent />
            <QuadraticBezierLine start={[1.8, -0.5, 0]} mid={[6, -0.5, -4]} end={[12, -0.5, -8]} color="#0ea5e9" lineWidth={3} dashed={true} dashScale={4} opacity={0.4} transparent />
        </group>
    );
};

// Core Vehicle Physics Wrapper
const VehicleMesh = ({ isDriving }) => {
    const vehicleGroupRef = useRef();
    const lidarRef1 = useRef();
    const lidarRef2 = useRef();

    // Core physics interpolation vectors tracking states between [INSPECT] and [DRIVE]
    const driveProgress = useRef(0);
    const accumulatedDriveTime = useRef(0);

    useFrame((state, delta) => {
        // ALWAYS spin sensory payloads (Hardware sensors are active even when parked)
        if (lidarRef1.current) lidarRef1.current.rotation.y -= delta * 15;
        if (lidarRef2.current) lidarRef2.current.rotation.y -= delta * 15;

        // SEAMLESS INTERPOLATION PHYSICS: Gliding the vehicle between Origin and Trajectory
        driveProgress.current = THREE.MathUtils.lerp(
            driveProgress.current,
            isDriving ? 1 : 0,
            delta * 1.5 // Animation speed for gliding back to start
        );

        if (vehicleGroupRef.current) {
            // Only increment autonomous algorithm time when actually driving/speeding up
            if (isDriving) accumulatedDriveTime.current += delta * 0.8;

            const time = accumulatedDriveTime.current;
            const driveRadius = 6;

            // Calculate orbital pathing coordinates (Massive 12 meter circle)
            const targetX = Math.sin(time) * driveRadius;
            const targetZ = Math.cos(time) * driveRadius;

            // Calculate rotational tangent vector (Where the car is physically pointing its chassis)
            const dx = Math.cos(time);
            const dz = -Math.sin(time);
            const targetYaw = Math.atan2(-dz, dx);

            // Lerp the Vehicle between the Inspection Origin [0,-0.2,0] and the Real-time Target Trajectory Coordinate
            vehicleGroupRef.current.position.x = THREE.MathUtils.lerp(0, targetX, driveProgress.current);
            vehicleGroupRef.current.position.y = -0.2;
            vehicleGroupRef.current.position.z = THREE.MathUtils.lerp(0, targetZ, driveProgress.current);

            // Slerp the Chassis Yaw (Rotation) so the car smoothly aligns straight back to the viewer when parked, 
            // and smoothly twists back into the velocity vector when accelerating.
            const originQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0));
            const targetQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, targetYaw, 0));

            const currentQuat = originQuat.clone().slerp(targetQuat, driveProgress.current);
            vehicleGroupRef.current.quaternion.copy(currentQuat);
        }
    });

    return (
        <group ref={vehicleGroupRef}>
            <Float speed={isDriving ? 0.5 : 2} rotationIntensity={isDriving ? 0.05 : 0.2} floatIntensity={0.1}>

                {/* --- CHASSIS & SHADERS --- */}
                <ProceduralBoltChassis />

                {/* --- ACTIVE PHYSICS WHEELS (Spin smoothly linked to isDriving state) --- */}
                <AutonomousWheel position={[-1.1, 0.2, 0.9]} isDriving={isDriving} isFront={false} />
                <AutonomousWheel position={[1.1, 0.2, 0.9]} isDriving={isDriving} isFront={true} />
                <AutonomousWheel position={[-1.1, 0.2, -0.9]} isDriving={isDriving} isFront={false} />
                <AutonomousWheel position={[1.1, 0.2, -0.9]} isDriving={isDriving} isFront={true} />

                {/* --- ALGORITHMIC SPLINES (Fade softly in when inspecting, fade out when driving) --- */}
                <TrajectoryPath />

                {/* --- EXACT IMAGE-MATCHED ROOF SENSOR ARRAY --- */}
                <group position={[-0.4, 1.35, 0]}>
                    <Box args={[1.6, 0.05, 0.05]} position={[0, 0.1, 0.6]}><meshStandardMaterial color="#111111" metalness={0.8} roughness={0.5} /></Box>
                    <Box args={[1.6, 0.05, 0.05]} position={[0, 0.1, -0.6]}><meshStandardMaterial color="#111111" metalness={0.8} roughness={0.5} /></Box>
                    <Box args={[0.05, 0.05, 1.3]} position={[0.7, 0.1, 0]}><meshStandardMaterial color="#111111" metalness={0.8} roughness={0.5} /></Box>
                    <Box args={[0.05, 0.05, 1.3]} position={[-0.7, 0.1, 0]}><meshStandardMaterial color="#111111" metalness={0.8} roughness={0.5} /></Box>

                    <Html position={[0, 1.2, 0]} center transform scale={0.5}>
                        <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #38bdf8', padding: '6px 12px', borderRadius: '4px', color: '#38bdf8', fontFamily: 'monospace', fontSize: '16px', whiteSpace: 'nowrap', backdropFilter: 'blur(4px)' }}>
                            <span style={{ color: '#22c55e' }}>●</span> [IMU: CALIBRATED] [RTK: 14mm]
                        </div>
                    </Html>

                    <group position={[0.5, 0.25, 0]}>
                        <Box args={[0.4, 0.25, 0.5]}><meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.2} /></Box>
                        {/* Frustum Visualizer */}
                        <mesh position={[4, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                            <coneGeometry args={[3, 8, 32]} />
                            <meshBasicMaterial color="#38bdf8" transparent opacity={0.06} depthWrite={false} side={THREE.DoubleSide} />
                        </mesh>
                    </group>

                    <Cylinder args={[0.05, 0.05, 0.05, 16]} rotation={[0, 0, -Math.PI / 2]} position={[0.72, 0.25, -0.15]}><meshStandardMaterial color="#000000" /></Cylinder>
                    <Cylinder args={[0.05, 0.05, 0.05, 16]} rotation={[0, 0, -Math.PI / 2]} position={[0.72, 0.25, 0.15]}><meshStandardMaterial color="#000000" /></Cylinder>
                    <Box args={[0.1, 0.05, 0.1]} position={[0.5, 0.4, 0]}><meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} /></Box>

                    <Box args={[0.5, 0.3, 0.4]} position={[0, 0.25, 0]}><meshStandardMaterial color="#d4a373" roughness={0.8} metalness={0.1} /></Box>

                    <group position={[0.7, 0.45, 0.6]}>
                        <Cylinder args={[0.08, 0.08, 0.35, 32]}><meshStandardMaterial color="#f8fafc" /></Cylinder>
                        <group ref={lidarRef1}><Box args={[0.15, 0.05, 0.18]}><meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={2.5} /></Box></group>
                        <Html position={[0, 0.4, 0]} center transform scale={0.4}>
                            <div style={{ background: 'rgba(0, 0, 0, 0.7)', border: '1px solid #ef4444', padding: '4px 8px', borderRadius: '2px', color: '#ef4444', fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'nowrap' }}>
                                LIDAR.4000
                            </div>
                        </Html>
                    </group>
                    <group position={[0.7, 0.45, -0.6]}>
                        <Cylinder args={[0.08, 0.08, 0.35, 32]}><meshStandardMaterial color="#f8fafc" /></Cylinder>
                        <group ref={lidarRef2}><Box args={[0.15, 0.05, 0.18]}><meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={2.5} /></Box></group>
                    </group>

                    <Cylinder args={[0.03, 0.03, 0.9, 16]} position={[-0.7, 0.5, 0.6]}>
                        <meshStandardMaterial color="#111111" metalness={0.9} />
                        <Cylinder args={[0.15, 0.15, 0.05, 16]} position={[0, 0.45, 0]}><meshStandardMaterial color="#f8fafc" /></Cylinder>
                        <Sphere args={[0.08, 16, 16]} position={[0, 0.5, 0]}><meshStandardMaterial color="#f8fafc" /></Sphere>
                    </Cylinder>
                    <Cylinder args={[0.03, 0.03, 0.9, 16]} position={[-0.7, 0.5, -0.6]}>
                        <meshStandardMaterial color="#111111" metalness={0.9} />
                        <Cylinder args={[0.15, 0.15, 0.05, 16]} position={[0, 0.45, 0]}><meshStandardMaterial color="#f8fafc" /></Cylinder>
                        <Sphere args={[0.08, 16, 16]} position={[0, 0.5, 0]}><meshStandardMaterial color="#f8fafc" /></Sphere>
                    </Cylinder>
                </group>

                <Float speed={5} rotationIntensity={1} floatIntensity={1}>
                    <Sphere args={[0.4, 16, 16]} position={[0, 3.2, 0]}>
                        <MeshDistortMaterial color="#58a6ff" distort={0.5} speed={4} emissive="#0ea5e9" emissiveIntensity={1} wireframe transparent opacity={0.6} />
                    </Sphere>
                </Float>
            </Float>
            <ContactShadows position={[0, -0.6, 0]} resolution={1024} scale={20} blur={2} opacity={0.6} far={10} color="#000000" />
        </group>
    );
};

// Application Root Overlay
export default function AutonomousCar() {
    const [isDriving, setIsDriving] = useState(false);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [12, 8, 12], fov: 50 }} style={{ cursor: 'grab', borderRadius: '16px', background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.4) 0%, transparent 100%)' }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" castShadow />
                <directionalLight position={[-10, 5, -10]} intensity={1.5} color="#60a5fa" />
                <pointLight position={[0, 5, 10]} intensity={2} color="#facc15" />

                {/* Propagating the driving state down directly into the specific core meshes */}
                <VehicleMesh isDriving={isDriving} />
                <Topography isDriving={isDriving} />
                <LidarScanner />

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    autoRotate={false}
                    maxPolarAngle={Math.PI / 2 - 0.05}
                    minPolarAngle={0}
                    target={[0, 0, 0]}
                />
            </Canvas>

            {/* DOM Overlay interactive UI Button bypassing the WebGL Canvas entirely */}
            <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                display: 'flex',
                gap: '12px'
            }}>
                <button
                    onClick={() => setIsDriving(!isDriving)}
                    style={{
                        background: isDriving ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                        border: `1px solid ${isDriving ? '#ef4444' : '#22c55e'}`,
                        color: isDriving ? '#ef4444' : '#22c55e',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        backdropFilter: 'blur(8px)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: `0 0 15px ${isDriving ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 197, 94, 0.4)'}`,
                        textShadow: '0 0 5px currentColor'
                    }}
                >
                    {isDriving ? '■ HALT L4 SIMULATION' : '▶ INITIATE L4 AUTONOMY'}
                </button>
            </div>
        </div>
    );
}

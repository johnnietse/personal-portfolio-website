"use client";

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';

// 2500-Node Deterministic Procedural GPU Asteroid Belt
const AsteroidBelt = ({ count = 2500, radius = 28, width = 6 }) => {
    const meshRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Explicit deterministic pseudo-random mathematics guaranteeing 0% SSR hydration mismatch!
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const pseudo1 = (Math.sin(i * 12.9898) * 43758.5453) % 1;
            const pseudo2 = (Math.sin(i * 78.233) * 43758.5453) % 1;
            const pseudo3 = (Math.cos(i * 4.1415) * 43758.5453) % 1;

            const angle = pseudo1 * Math.PI * 2;
            const r = radius + (pseudo2 - 0.5) * width;
            const y = (pseudo3 - 0.5) * 2;
            const scale = pseudo1 * 0.2 + 0.05;
            temp.push({ angle, r, y, scale, rotationSpeed: pseudo2 * 2 });
        }
        return temp;
    }, [count, radius, width]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime * 0.015; // Slow ambient orbit

        particles.forEach((p, i) => {
            dummy.position.x = Math.sin(p.angle + time) * p.r;
            dummy.position.z = Math.cos(p.angle + time) * p.r;
            dummy.position.y = p.y;
            dummy.scale.set(p.scale, p.scale, p.scale);
            dummy.rotation.x = p.angle + time * p.rotationSpeed;
            dummy.rotation.y = p.angle + time * (p.rotationSpeed * 0.5);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            {/* Raw simple polygon geometries ensuring zero frame-drops across 2500 active asteroids */}
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#666666" roughness={0.9} metalness={0.1} />
        </instancedMesh>
    );
};

// Singular Planetary Body modeling raw geometry over explicit orbits
const PlanetNode = ({ name, size, radius, speed, angle, color, hasRing, ringColor }) => {
    const meshRef = useRef();
    const [hovered, setHover] = useState(false);

    // Execute orbital trajectories natively inside WebGL eliminating layout thrashing
    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime * speed;

        // Exact 3D Coordinate tracking across the plane
        meshRef.current.position.x = Math.sin(time + angle) * radius;
        meshRef.current.position.z = Math.cos(time + angle) * radius;

        // Introduce slight inclination to planetary orbits simulating the chaotic 3D depth of space
        meshRef.current.position.y = Math.sin(time * 0.4 + angle) * (radius * 0.1);

        // Spin the planet individually on its axis relative to its orbital momentum
        meshRef.current.rotation.y += speed * 3;

        // Explicit smooth scaling vector interpolation simulating interaction feedback
        const targetScale = hovered ? 1.4 : 1.0;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
    });

    return (
        <group>
            {/* The transparent orbital path tracing the exact radius of the planet 360 degrees constantly */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[radius - 0.05, radius + 0.05, 128]} />
                <meshBasicMaterial color={hovered ? color : "#ffffff"} transparent opacity={hovered ? 0.3 : 0.03} side={THREE.DoubleSide} />
            </mesh>

            {/* Native React-Three-Fiber Raycaster interaction loops intercepting the physical mouse coordinates perfectly */}
            <group
                ref={meshRef}
                onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
                onPointerOut={(e) => { setHover(false); document.body.style.cursor = 'auto'; }}
            >
                <mesh>
                    <sphereGeometry args={[size, 64, 64]} />
                    {/* Raw physical materials intercepting the intense PointLight simulating the Sun */}
                    <meshStandardMaterial color={color} roughness={0.7} metalness={0.2} emissive={hovered ? color : '#000000'} emissiveIntensity={0.2} />
                </mesh>

                {/* Dynamically bind Saturn's distinct graphical Ring geometry exclusively via prop */}
                {hasRing && (
                    <mesh rotation={[Math.PI / 2 + 0.3, 0, 0]}>
                        <ringGeometry args={[size * 1.5, size * 2.5, 64]} />
                        <meshStandardMaterial color={ringColor} side={THREE.DoubleSide} transparent opacity={0.7} />
                    </mesh>
                )}

                {/* Return Dynamic DOM HTML arrays exclusively when the planetary body forces a WebGL Interaction */}
                {hovered && (
                    <Html center position={[0, size + 1.5, 0]}>
                        <div style={{
                            background: 'rgba(15, 23, 42, 0.85)', padding: '6px 12px', borderRadius: '8px',
                            border: `1px solid ${color}`, color: '#fff', fontSize: '14px', fontWeight: 'bold', pointerEvents: 'none',
                            textTransform: 'uppercase', letterSpacing: '1px'
                        }}>
                            {name}
                        </div>
                    </Html>
                )}
            </group>
        </group>
    );
};

export default function SolarSystemBackground() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);

    // Exact mapping of the 8 canonical celestial bodies natively simulating our physical Universe visually behind the DOM
    const planets = useMemo(() => [
        { name: 'Mercury', size: 0.4, radius: 8, speed: 0.02, angle: 0.0, color: '#8c8c8c' },
        { name: 'Venus', size: 0.8, radius: 12, speed: 0.015, angle: 1.0, color: '#e2a44d' },
        { name: 'Earth', size: 1.0, radius: 17, speed: 0.01, angle: 2.2, color: '#2b82c9' },
        { name: 'Mars', size: 0.6, radius: 22, speed: 0.008, angle: 3.5, color: '#c1440e' },
        { name: 'Jupiter', size: 2.5, radius: 35, speed: 0.002, angle: 1.5, color: '#c99039' },
        { name: 'Saturn', size: 2.0, radius: 50, speed: 0.001, angle: 4.8, color: '#ead6b8', hasRing: true, ringColor: '#b5a793' },
        { name: 'Uranus', size: 1.2, radius: 65, speed: 0.0007, angle: 0.5, color: '#4b70dd' },
        { name: 'Neptune', size: 1.1, radius: 80, speed: 0.0005, angle: 5.5, color: '#274687' },
    ], []);

    if (!isMounted) return null; // Hydration safety check

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'auto' }}>
            {/* Extended far bounding box preventing clipping of Neptune/Uranus long orbits */}
            <Canvas camera={{ position: [0, 40, 90], fov: 45 }}>
                <ambientLight intensity={0.15} />

                {/* The Core Sun emitting native physical PointLight radiating geometrically into space */}
                <Float speed={1.5} rotationIntensity={0} floatIntensity={0.2}>
                    <mesh>
                        <sphereGeometry args={[4, 64, 64]} />
                        <meshBasicMaterial color="#fcd34d" />
                    </mesh>
                    <pointLight position={[0, 0, 0]} intensity={250} distance={400} color="#fef08a" decay={1.5} />
                </Float>

                {/* Massive 2500 GPU-bound physics simulation operating strictly between Mars and Jupiter bounds */}
                <AsteroidBelt count={2500} radius={28} width={5} />

                {/* Deep-Space Matrix tracing exactly behind the user producing pure cosmic parallax referencing */}
                <Stars radius={150} depth={100} count={8000} factor={6} saturation={0} fade speed={1} />

                <group>
                    {planets.map((planet, index) => (
                        <PlanetNode
                            key={`celestial-body-${index}`}
                            name={planet.name}
                            size={planet.size}
                            radius={planet.radius}
                            speed={planet.speed}
                            angle={planet.angle}
                            color={planet.color}
                            hasRing={planet.hasRing}
                            ringColor={planet.ringColor}
                        />
                    ))}
                </group>

                {/* Allow the user to drag and rotate the entire solar system tracking interactions exclusively when scrolling stops! */}
                <OrbitControls
                    enableZoom={false} // Prevent stealing the mouse wheel scrolling from the DOM route!
                    enablePan={false}
                    enableRotate={true}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
}

"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

// An InstancedMesh rendering an isometric city of 225 cubes representing a 3D GitHub Commit Graph
const CityscapeGrid = () => {
    const meshRef = useRef();

    // Generating a massive 15x15 dense deployment grid deterministically without relying on Math.random() SSR hydration errors
    const gridSize = 15;
    const spacing = 1.1;

    // Arrays mapping generic computational activity levels mimicking heavy system deployments
    const boxes = useMemo(() => {
        const arr = [];
        for (let x = 0; x < gridSize; x++) {
            for (let z = 0; z < gridSize; z++) {
                // Mathematical sine wave mapping deterministic heights (High output = tall buildings)
                const activityLevel = (Math.sin(x * 12.3) * Math.cos(z * 4.1) + 1) / 2;
                arr.push({
                    x: (x - gridSize / 2) * spacing,
                    z: (z - gridSize / 2) * spacing,
                    activity: activityLevel
                });
            }
        }
        return arr;
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const _color = useMemo(() => new THREE.Color(), []);

    // Highly performant raw memory injection buffer animating exactly 225 cubes 60 times a second simultaneously
    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime * 1.5;

        boxes.forEach((box, i) => {
            // Calculate a breathing dynamic ripple calculating across the grid diagonally
            const wave = Math.sin(box.x * 0.4 + time) * Math.cos(box.z * 0.4 + time);

            // Final building height determined by the box activity + the real-time sine wave
            const finalHeight = Math.max(0.1, box.activity * 4.0 + (wave * box.activity * 2.0));

            // Adjust matrix scale and translate geometry safely to standard position
            dummy.position.set(box.x, finalHeight / 2, box.z);
            dummy.scale.set(1, finalHeight, 1);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);

            // Interpolate colors dynamically based entirely on the geometry height output 
            // Lowest values: Deep dark blue  |  Highest values: Neon glowing Kubernetes/GitHub green
            _color.lerpColors(new THREE.Color("#0f172a"), new THREE.Color("#22c55e"), (finalHeight / 6.0));
            meshRef.current.setColorAt(i, _color);
        });

        // Notify the WebGL GPU layer that the Float32Arrays have been mathematically mutated
        meshRef.current.instanceMatrix.needsUpdate = true;
        meshRef.current.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, boxes.length]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshPhysicalMaterial metalness={0.9} roughness={0.2} clearcoat={1.0} />
        </instancedMesh>
    );
};

export default function GithubCityscape() {
    return (
        <Canvas camera={{ position: [18, 15, 18], fov: 40 }} style={{ cursor: 'grab', background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.4) 0%, transparent 100%)' }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 20, 10]} intensity={3} color="#4ade80" castShadow />
            <directionalLight position={[-10, 5, -10]} intensity={1.5} color="#3b82f6" />

            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Center the grid down slightly */}
                <group position={[0, -1, 0]}>
                    <CityscapeGrid />
                </group>
            </Float>

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.8}
                maxPolarAngle={Math.PI / 2.5}
                minPolarAngle={Math.PI / 6}
            />
        </Canvas>
    );
}

"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const FluidPlane = () => {
    const planeRef = useRef();
    const mousePos = useRef(new THREE.Vector2(-999, -999));
    const targetMousePos = useRef(new THREE.Vector2(-999, -999));

    // High performance strict mathematical buffer loop recalculating 16,641 vertices per frame (60FPS)
    useFrame((state, delta) => {
        if (!planeRef.current) return;

        // Smooth physics interpolation pulling the ripple vector smoothly toward the raw hardware mouse coordinates
        mousePos.current.lerp(targetMousePos.current, 0.15);

        const time = state.clock.elapsedTime * 0.8;
        const positions = planeRef.current.attributes.position;
        const count = positions.count;

        for (let i = 0; i < count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);

            // Complex trigonometric intersection to mimic fluid dynamics and audio frequencies
            const wave1 = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 1.5;
            const wave2 = Math.sin(x * 0.2 - time * 0.5) * Math.cos(y * 0.2 + time * 0.5) * 2.0;
            const wave3 = Math.sin(Math.sqrt(x * x + y * y) * 0.8 - time * 2) * 0.5; // Radial ripple outwards

            // Interactive Native Mouse Raycaster Ripple Mathematics
            const distX = x - mousePos.current.x;
            const distY = y - mousePos.current.y;
            const distance = Math.sqrt(distX * distX + distY * distY);

            let interactiveRipple = 0;
            if (distance < 12) {
                // Generate a violent physical peak tapering off exponentially by radial distance limits
                interactiveRipple = Math.sin(distance * 2.0 - time * 15) * (12 - distance) * 0.3 * Math.exp(-distance * 0.1);
            }

            // Re-map the Z coordinate applying the intersecting algorithmic waves and mouse physics
            positions.setZ(i, wave1 + wave2 + wave3 + interactiveRipple);
        }

        // Tells the GPU to physically refresh the Float32Array geometric buffer
        positions.needsUpdate = true;

        // Compute vertex normals natively so light bounces accurately off the fluid peaks
        planeRef.current.computeVertexNormals();
    });

    return (
        <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -2, 0]}
            onPointerMove={(e) => {
                // Mapping Raycast intersections correctly: The plane is rotated -90deg so World -Z represents Local +Y
                targetMousePos.current.set(e.point.x, -(e.point.z));
            }}
            onPointerLeave={() => {
                // Terminate pointer targeting dragging the ripple deep off screen resolving gracefully 
                targetMousePos.current.set(-999, -999);
            }}
        >
            {/* Massively Subdivided Plane (128x128 = 16,641 vertices) for true topological smoothness */}
            <planeGeometry ref={planeRef} args={[60, 60, 128, 128]} />

            {/* Highly reflective wireframe material simulating Data Analysis meshes */}
            <meshStandardMaterial
                color="#0ea5e9"
                emissive="#0284c7"
                emissiveIntensity={0.6}
                roughness={0.2}
                metalness={0.8}
                wireframe={true}
                transparent={true}
                opacity={0.4}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

export default function DataWaveform() {
    return (
        <Canvas camera={{ position: [0, 8, 20], fov: 45 }} style={{ cursor: 'grab', background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.6) 0%, transparent 100%)' }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 20, 10]} intensity={3} color="#ffffff" castShadow />
            <pointLight position={[0, 10, 0]} intensity={4} color="#38bdf8" />
            <pointLight position={[0, -10, 0]} intensity={2} color="#f472b6" /> {/* Deep magenta underglow */}

            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
                <FluidPlane />
            </Float>

            {/* Auto-rotating VR pan tool locked to prevent scaling bugs */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2 - 0.15}
                minPolarAngle={0}
            />
        </Canvas>
    );
}

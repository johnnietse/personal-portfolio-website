'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePerformance } from './PerformanceManager';
import { LOCATIONS } from '@/lib/config/locations';

/** Procedural wireframe globe with location pins. */
function Globe() {
  const meshRef = useRef();
  const [hoveredPin, setHoveredPin] = useState(null);

  // Low-poly sphere with vertex coloring (blue gradient)
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 32, 24);
    const colors = new Float32Array(geo.attributes.position.count * 3);
    for (let i = 0; i < geo.attributes.position.count; i++) {
      const y = geo.attributes.position.getY(i);
      const t = (y / 2 + 1) / 2; // 0-1 from bottom to top
      colors[i * 3] = 0.1 + t * 0.2;
      colors[i * 3 + 1] = 0.2 + t * 0.3;
      colors[i * 3 + 2] = 0.4 + t * 0.4;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Globe sphere */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhongMaterial vertexColors roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Wireframe overlay */}
      <mesh geometry={geometry}>
        <meshBasicMaterial wireframe color="#58a6ff" transparent opacity={0.15} />
      </mesh>
      {/* Atmosphere glow */}
      <mesh scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[2, 32, 24]} />
        <meshBasicMaterial color="#58a6ff" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
      {/* Location pins */}
      {LOCATIONS.map((loc) => {
        const phi = (90 - loc.lat) * Math.PI / 180;
        const theta = (loc.lon + 180) * Math.PI / 180;
        const x = -2 * Math.sin(phi) * Math.cos(theta);
        const y = 2 * Math.cos(phi);
        const z = 2 * Math.sin(phi) * Math.sin(theta);

        return (
          <group key={loc.label}
            onPointerOver={() => setHoveredPin(loc.label)}
            onPointerOut={() => setHoveredPin(null)}
          >
            {/* Pin dot */}
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshBasicMaterial color="#7ee787" />
            </mesh>
            {/* Pin glow */}
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[0.12, 8, 8]} />
              <meshBasicMaterial color="#7ee787" transparent opacity={0.3} />
            </mesh>
            {/* Label on hover */}
            <Html center position={[x, y + 0.3, z]}>
              <div style={{
                background: 'rgba(15,23,42,0.9)',
                border: '1px solid #7ee787',
                padding: '4px 10px',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                opacity: hoveredPin === loc.label ? 1 : 0,
                transition: 'opacity 0.2s',
              }}>{loc.label}</div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function GlobeFootprint() {
  const { renderTier } = usePerformance();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  // No globe on low-end devices
  if (!isMounted || renderTier === 'economy' || renderTier === 'low') {
    return null;
  }

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto',
      aspectRatio: '1/1', cursor: 'grab',
    }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Globe />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
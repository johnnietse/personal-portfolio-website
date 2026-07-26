'use client';

import React, { useRef, useMemo, useState, useEffect, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { usePerformance } from './PerformanceManager';
import { LOCATIONS } from '@/lib/config/locations';

const EARTH_TEXTURE_URL = '/textures/earth-blue-marble.jpg';
const GLOBE_RADIUS = 2;

// ─── Helpers ────────────────────────────────────────────────────────────────

function latLonToPosition(lat, lon, radius = GLOBE_RADIUS) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

// ─── Textured Earth ─────────────────────────────────────────────────────────

function TexturedEarth({ detail, showWireframe }) {
  const texture = useTexture(EARTH_TEXTURE_URL);

  return (
    <group>
      {/* Main textured sphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, detail, detail]} />
        <meshPhongMaterial map={texture} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Subtle wireframe overlay (only on higher tiers) */}
      {showWireframe && (
        <mesh>
          <sphereGeometry args={[GLOBE_RADIUS + 0.005, detail, detail]} />
          <meshBasicMaterial wireframe color="#58a6ff" transparent opacity={0.06} />
        </mesh>
      )}

      {/* Atmosphere glow */}
      <mesh scale={[1.025, 1.025, 1.025]}>
        <sphereGeometry args={[GLOBE_RADIUS, 32, 24]} />
        <meshBasicMaterial color="#58a6ff" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

// ─── Location Pins + Experience Tooltips ─────────────────────────────────────

function LocationPins({ radius, hoveredPin, setHoveredPin }) {
  return (
    <group>
      {LOCATIONS.map((loc) => {
        const pos = latLonToPosition(loc.lat, loc.lon, radius);
        return (
          <group key={loc.label}>
            {/* Hover hit area (larger invisible sphere) */}
            <mesh
              position={pos}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredPin(loc.label);
              }}
              onPointerOut={() => setHoveredPin(null)}
            >
              <sphereGeometry args={[0.25, 8, 8]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {/* Pin dot */}
            <mesh position={pos}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshBasicMaterial color="#7ee787" />
            </mesh>

            {/* Pin glow */}
            <mesh position={pos}>
              <sphereGeometry args={[0.14, 8, 8]} />
              <meshBasicMaterial color="#7ee787" transparent opacity={0.3} />
            </mesh>

            {/* Experience tooltip on hover */}
            <Html
              center
              position={[pos.x, pos.y + 0.35, pos.z]}
              style={{ transition: 'opacity 0.2s', pointerEvents: 'none', opacity: hoveredPin === loc.label ? 1 : 0 }}
            >
              <div
                style={{
                  background: 'rgba(13, 17, 23, 0.95)',
                  border: '1px solid #7ee787',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '12px',
                  lineHeight: 1.5,
                  maxWidth: '280px',
                  whiteSpace: 'normal',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div style={{ color: '#7ee787', fontWeight: 700, fontSize: '13px', marginBottom: '6px', letterSpacing: '0.02em' }}>
                  {loc.city}
                </div>
                {loc.experiences.map((exp, i) => (
                  <div key={i} style={{ padding: '2px 0', borderBottom: i < loc.experiences.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <span style={{ color: '#58a6ff', marginRight: '6px' }}>▸</span>
                    <span style={{ color: '#c9d1d9' }}>{exp}</span>
                  </div>
                ))}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

// ─── Connection Arcs + Traveling Dots ────────────────────────────────────────

function TravelingDot({ curve, speed = 0.25 }) {
  const dotRef = useRef();
  const progress = useRef(Math.random()); // Stagger initial positions

  useFrame((_, delta) => {
    progress.current += delta * speed;
    if (progress.current > 1) progress.current -= 1;
    const pos = curve.getPoint(progress.current);
    if (dotRef.current) dotRef.current.position.copy(pos);
  });

  return (
    <mesh ref={dotRef}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshBasicMaterial color="#7ee787" />
    </mesh>
  );
}

function ConnectionArcs({ radius }) {
  const arcData = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < LOCATIONS.length; i++) {
      for (let j = i + 1; j < LOCATIONS.length; j++) {
        const start = latLonToPosition(LOCATIONS[i].lat, LOCATIONS[i].lon, radius);
        const end = latLonToPosition(LOCATIONS[j].lat, LOCATIONS[j].lon, radius);

        // Raised midpoint for arc curve
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const chordLen = start.distanceTo(end);
        const arcHeight = radius + Math.max(1.2, chordLen * 0.35);
        mid.normalize().multiplyScalar(arcHeight);

        const curve = new THREE.CatmullRomCurve3([start, mid, end]);
        const points = curve.getPoints(64);

        pairs.push({ key: `${LOCATIONS[i].label}-${LOCATIONS[j].label}`, curve, points });
      }
    }
    return pairs;
  }, []);

  return (
    <group>
      {arcData.map((arc) => (
        <group key={arc.key}>
          {/* Arc line */}
          <Line points={arc.points} color="#58a6ff" transparent opacity={0.3} lineWidth={1} />

          {/* Traveling dot */}
          <TravelingDot curve={arc.curve} speed={0.2 + Math.random() * 0.1} />
        </group>
      ))}
    </group>
  );
}

// ─── Economy Fallback ────────────────────────────────────────────────────────

function EconomyFallback() {
  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto',
      aspectRatio: '1/1',
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: '50%',
        background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
        border: '1px solid #58a6ff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ color: '#58a6ff', fontSize: '14px', fontWeight: 600, textAlign: 'center', padding: '20px' }}>
          Global Engineering Footprint
          <br />
          <span style={{ fontSize: '12px', color: '#8b949e' }}>Queen's University → Hong Kong</span>
        </div>
      </div>
    </div>
  );
}

// ─── Error Boundary ──────────────────────────────────────────────────────────

class GlobeErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <EconomyFallback />;
    }
    return this.props.children;
  }
}

// ─── Default Export ──────────────────────────────────────────────────────────

export default function GlobeFootprint() {
  const { quality } = usePerformance();
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredPin, setHoveredPin] = useState(null);

  useEffect(() => { setIsMounted(true); }, []);

  // Hydration guard
  if (!isMounted) return null;

  // Economy tier: pure CSS fallback, no WebGL
  if (quality.targetFPS < 30) {
    return <EconomyFallback />;
  }

  const detail = Math.max(24, Math.round(64 * quality.geometryDetail));
  const showArcs = quality.geometryDetail >= 0.5 && LOCATIONS.length >= 2;
  const showWireframe = quality.geometryDetail >= 0.75;

  return (
    <GlobeErrorBoundary>
      <div style={{
        position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto',
        aspectRatio: '1/1', cursor: 'grab',
      }}>
        <Canvas camera={{ position: [0, 0.5, 5.5], fov: 38 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} />
          <directionalLight position={[-3, -2, 4]} intensity={0.4} color="#58a6ff" />

          <TexturedEarth detail={detail} showWireframe={showWireframe} />
          <LocationPins radius={GLOBE_RADIUS} hoveredPin={hoveredPin} setHoveredPin={setHoveredPin} />
          {showArcs && <ConnectionArcs radius={GLOBE_RADIUS} />}

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </div>
    </GlobeErrorBoundary>
  );
}

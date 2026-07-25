## Task 14: WebGL Globe Component

**Files:**
- Create: `components/GlobeFootprint.jsx`
- Modify: `app/page.js`

**Interfaces:**
- Consumes: `LOCATIONS` from `@/lib/config/locations`, `renderTier` from `usePerformance()`

### Global Constraints
- No visual changes to EXISTING sections
- No new npm dependencies
- Follow existing patterns in the codebase (R3F, drei)

### Step 1: Create `components/GlobeFootprint.jsx`

A procedural WebGL globe component built with Three.js/R3F. No texture maps — uses vertex coloring and wireframe for a low-poly tech aesthetic matching the existing portfolio style.

```javascript
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
```

### Step 2: Integrate into `app/page.js`

Add the globe as a new "Global Footprint" section after the existing showroom sections. Add it in a natural place — e.g., after the miniMD section and before the contact section.

```javascript
import GlobeFootprint from '@/components/GlobeFootprint';

// Add a new section (around line 155, after miniMD section, before contact section):
{/* GLOBAL ENGINEERING FOOTPRINT */}
<section id="footprint" className="section container" data-aos="fade-up" data-aos-duration="1000" style={{ minHeight: 'auto', padding: '4rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
  <div className="text-center mb-8">
    <h2 className="title" style={{ marginBottom: '1rem' }}>Global Engineering Footprint</h2>
    <p className="subtitle" style={{ margin: '0 auto' }}>
      Interactive 3D globe mapping my academic and professional journey across North America.
    </p>
  </div>
  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
    <GlobeFootprint />
  </div>
</section>
```

### Step 3: Verify build

Run: `npx next build`
Expected: Build succeeds

### Step 4: Commit

```bash
git add components/GlobeFootprint.jsx app/page.js
git commit -m "feat: add WebGL globe component showing global engineering footprint"
```

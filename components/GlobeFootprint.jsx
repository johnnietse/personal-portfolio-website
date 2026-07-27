'use client';

import { useEffect, useRef, useState } from 'react';
import { feature } from 'topojson-client';
import { usePerformance } from './PerformanceManager';
import { LOCATIONS } from '@/lib/config/locations';

// ─── Static data ─────────────────────────────────────────────────────────────

const ARC_DATA = [{
  startLat: LOCATIONS[0].lat,
  startLng: LOCATIONS[0].lon,
  endLat: LOCATIONS[1].lat,
  endLng: LOCATIONS[1].lon,
}];

const RINGS_DATA = LOCATIONS.map((loc) => ({
  lat: loc.lat,
  lng: loc.lon,
}));

const LABELS_DATA = LOCATIONS.map((loc) => ({
  ...loc,
  text: loc.city.replace(', ON', '').replace(' SAR', ''),
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ─── Component states ────────────────────────────────────────────────────────

function EconomyFallback() {
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: '50%', zIndex: 1,
      background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
      border: '1px solid #58a6ff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ color: '#58a6ff', fontSize: '14px', fontWeight: 600, textAlign: 'center', padding: '20px' }}>
        Global Engineering Footprint
        <br />
        <span style={{ fontSize: '12px', color: '#8b949e' }}>Queen&apos;s University → Hong Kong</span>
      </div>
    </div>
  );
}

function GlobePlaceholder() {
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: '50%', zIndex: 1,
      background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
      border: '1px solid rgba(88,166,255,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        border: '2px solid rgba(88,166,255,0.2)',
        borderTopColor: '#58a6ff',
        animation: 'globe-spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes globe-spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function GlobeError({ message }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: '50%', zIndex: 1,
      background: 'radial-gradient(circle at center, #1a0a0a 0%, #020617 100%)',
      border: '1px solid #ff6b6b',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ color: '#ff6b6b', fontSize: '12px', textAlign: 'center', padding: '16px' }}>
        <div style={{ fontSize: '20px', marginBottom: '4px' }}>⚠</div>
        {message}
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function GlobeFootprint() {
  const containerRef = useRef(null);
  const globeRef = useRef(null);
  const cleanupRef = useRef(null);
  const controlsRef = useRef(null);
  const selectedRef = useRef(null);
  const glowRef = useRef(null);
  const glowMatRef = useRef(null);
  // Stubs populated by init (where THREE is dynamically loaded)
  const glowFnsRef = useRef({ spawnGlow: () => {}, destroyGlow: () => {} });
  const flashRef = useRef([]);
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });
  const hasMouseRef = useRef(false);
  const tourRef = useRef({ active: false, cancelled: true, done: false });
  const flowParticlesRef = useRef(null);
  const flowGeomRef = useRef(null);

  const { quality, renderTier } = usePerformance();
  const [isMounted, setIsMounted] = useState(false);
  const [globeState, setGlobeState] = useState({ type: 'loading' });
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => { setIsMounted(true); }, []);

  const isLowPower = quality.targetFPS < 30;

  // Economy tier: CSS fallback
  if (renderTier === 'economy') {
    return (
      <div style={{
        position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto',
        aspectRatio: '1 / 1', borderRadius: '50%', overflow: 'hidden',
        background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
        border: '1px solid rgba(88, 166, 255, 0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ color: '#58a6ff', fontSize: '14px', fontWeight: 600, textAlign: 'center', padding: '20px' }}>
          Global Engineering Footprint
          <br />
          <span style={{ fontSize: '12px', color: '#8b949e' }}>Queen&apos;s University + Hong Kong</span>
        </div>
      </div>
    );
  }

  // Low tier: simplified globe (no arcs, no pins, static)
  if (renderTier === 'low') {
    return (
      <div style={{
        position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto',
        aspectRatio: '1 / 1', borderRadius: '50%', overflow: 'hidden',
        background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
        border: '1px solid rgba(88, 166, 255, 0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ color: '#58a6ff', fontSize: '14px', fontWeight: 600, textAlign: 'center' }}>
          Global Engineering Footprint
          <br />
          <span style={{ fontSize: '12px', color: '#8b949e' }}>Simplified view</span>
        </div>
      </div>
    );
  }

  // ── Initialise globe.gl ─────────────────────────────────────────────────

  useEffect(() => {
    if (!isMounted || isLowPower || !containerRef.current) return;

    let destroyed = false;
    setGlobeState({ type: 'loading' });

    const init = async () => {
      // Load everything dynamically — no static THREE imports
      const [globeModule, THREE, bloomModule, countries] = await Promise.all([
        import('globe.gl'),
        import('three'),
        import('three/examples/jsm/postprocessing/UnrealBloomPass.js'),
        fetch('/data/countries-110m.json')
          .then((r) => r.json())
          .then((topology) => feature(topology, topology.objects.countries)),
      ]);

      if (destroyed) return;

      const { default: Globe } = globeModule;
      const { UnrealBloomPass } = bloomModule;

      // ── PBR roughness map (procedural land/water mask) ────────────

      const R_MAP_W = 1024;
      const R_MAP_H = 512;
      const rCanvas = document.createElement('canvas');
      rCanvas.width = R_MAP_W;
      rCanvas.height = R_MAP_H;
      const rCtx = rCanvas.getContext('2d');
      // Water → dark (smooth / low roughness); Land → white (rough / high roughness)
      rCtx.fillStyle = '#050505';
      rCtx.fillRect(0, 0, R_MAP_W, R_MAP_H);
      rCtx.fillStyle = '#ffffff';

      function drawLandPolygon(coords) {
        rCtx.beginPath();
        for (let ring = 0; ring < coords.length; ring++) {
          coords[ring].forEach(([lng, lat], i) => {
            const x = ((lng + 180) / 360) * R_MAP_W;
            const y = ((90 - lat) / 180) * R_MAP_H;
            if (i === 0) rCtx.moveTo(x, y);
            else rCtx.lineTo(x, y);
          });
          rCtx.closePath();
        }
        rCtx.fill('evenodd');
      }

      countries.features.forEach((f) => {
        if (!f.geometry) return;
        const g = f.geometry;
        if (g.type === 'Polygon') drawLandPolygon(g.coordinates);
        else if (g.type === 'MultiPolygon') g.coordinates.forEach((p) => drawLandPolygon(p));
      });

      const roughnessTexture = new THREE.CanvasTexture(rCanvas);
      roughnessTexture.wrapS = THREE.RepeatWrapping;
      roughnessTexture.wrapT = THREE.RepeatWrapping;

      // ── Helper functions (closed over `THREE`) ─────────────────────

      function latLngToVec3(lat, lng, radius) {
        const phi = (90 - lat) * Math.PI / 180;
        const theta = (lng + 180) * Math.PI / 180;
        return new THREE.Vector3(
          -radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta),
        );
      }

      // ── Arc flow particle helpers ──────────────────────────────────

      const FLOW_COUNT = 50;
      const flowStart = latLngToVec3(ARC_DATA[0].startLat, ARC_DATA[0].startLng, 1.01);
      const flowEnd = latLngToVec3(ARC_DATA[0].endLat, ARC_DATA[0].endLng, 1.01);
      const flowMid = latLngToVec3(
        (ARC_DATA[0].startLat + ARC_DATA[0].endLat) / 2,
        (ARC_DATA[0].startLng + ARC_DATA[0].endLng) / 2,
        1.35,
      );
      const flowProgress = new Float32Array(FLOW_COUNT);
      for (let i = 0; i < FLOW_COUNT; i++) flowProgress[i] = i / FLOW_COUNT;
      const flowPositions = new Float32Array(FLOW_COUNT * 3);

      function flowBezier(t, start, mid, end) {
        const a = new THREE.Vector3().lerpVectors(start, mid, t);
        const b = new THREE.Vector3().lerpVectors(mid, end, t);
        return new THREE.Vector3().lerpVectors(a, b, t).normalize().multiplyScalar(1.01);
      }

      function lerp(a, b, t) { return a + (b - a) * t; }

      // ───────────────────────────────────────────────────────────────

      function makeGlowTexture() {
        const size = 128;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        gradient.addColorStop(0, 'rgba(126,231,135,1)');
        gradient.addColorStop(0.15, 'rgba(126,231,135,0.7)');
        gradient.addColorStop(0.4, 'rgba(126,231,135,0.25)');
        gradient.addColorStop(1, 'rgba(126,231,135,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        return new THREE.CanvasTexture(canvas);
      }

      function destroyGlow() {
        if (glowRef.current) {
          const parent = glowRef.current.parent;
          if (parent) parent.remove(glowRef.current);
          if (glowMatRef.current) glowMatRef.current.dispose();
          glowRef.current = null;
          glowMatRef.current = null;
        }
      }

      function spawnGlow(lat, lng, scene) {
        destroyGlow();
        const texture = makeGlowTexture();
        const mat = new THREE.SpriteMaterial({
          map: texture,
          blending: THREE.AdditiveBlending,
          transparent: true,
          opacity: 0.9,
          depthWrite: false,
        });
        glowMatRef.current = mat;
        const sprite = new THREE.Sprite(mat);
        sprite.position.copy(latLngToVec3(lat, lng, 1.02));
        sprite.scale.set(0.15, 0.15, 1);
        scene.add(sprite);
        glowRef.current = sprite;
      }

      glowFnsRef.current = { spawnGlow, destroyGlow, addFlash };

      // ── Inject CSS for HTML city badges ──────────────────────────────

      const styleId = 'globe-city-marker-style';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          .globe-city-marker {
            position:relative;
            display:flex;align-items:center;gap:6px;
            background:rgba(13,17,23,0.8);
            border:1px solid rgba(126,231,135,0.25);
            border-radius:20px;
            padding:4px 12px 4px 8px;
            color:#e6edf3;
            font-size:12px;
            font-family:system-ui,sans-serif;
            font-weight:500;
            letter-spacing:0.01em;
            cursor:pointer;
            pointer-events:auto;
            white-space:nowrap;
            backdrop-filter:blur(6px);
            transition:all 0.2s ease;
            box-shadow:0 2px 8px rgba(0,0,0,0.3);
            user-select:none;
            animation:globe-badge-enter 0.5s ease-out both;
          }
          .globe-city-marker:last-child {
            animation-delay:0.2s;
          }
          .globe-city-marker:hover {
            border-color:rgba(126,231,135,0.7);
            box-shadow:0 0 16px rgba(126,231,135,0.25), 0 0 32px rgba(126,231,135,0.1);
            transform:scale(1.06);
          }
          .globe-city-dot {
            position:relative;z-index:1;
            width:7px;height:7px;
            border-radius:50%;
            background:#7ee787;
            flex-shrink:0;
            box-shadow:0 0 4px rgba(126,231,135,0.5);
            animation:globe-dot-breathe 3s ease-in-out infinite;
          }
          @keyframes globe-dot-breathe {
            0%,100% { opacity:1; transform:scale(1); }
            50%     { opacity:0.6; transform:scale(0.85); }
          }
          .globe-city-pulse {
            position:absolute;z-index:0;
            width:20px;height:20px;border-radius:50%;
            left:1px;top:50%;transform:translateY(-50%);
            border:1.5px solid rgba(126,231,135,0.4);
            background:rgba(126,231,135,0.08);
            animation:globe-pulse 2.5s ease-out infinite;
            pointer-events:none;
          }
          @keyframes globe-pulse {
            0%   { transform:translateY(-50%) scale(1);   opacity:0.6; }
            70%  { transform:translateY(-50%) scale(2.5); opacity:0;   }
            100% { transform:translateY(-50%) scale(2.5); opacity:0;   }
          }
          @keyframes globe-flash {
            0%   { transform:scale(0.5); opacity:0.8; }
            70%  { transform:scale(2.2);  opacity:0;   }
            100% { transform:scale(2.2);  opacity:0;   }
          }
          @keyframes globe-badge-enter {
            from { opacity:0; transform:translateY(-8px) scale(0.9); }
            to   { opacity:1; transform:translateY(0) scale(1);     }
          }
        `;
        document.head.appendChild(style);
      }

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const w = rect.width || 500;
      const h = rect.height || 500;

      // ── Create globe instance ────────────────────────────────────────

      const globe = new Globe(container, {
        animateIn: true,
        rendererConfig: { antialias: true, alpha: true },
      });
      globeRef.current = globe;
globe
        .globeImageUrl('/textures/earth-night.jpg')
        // Background handled via custom scene setup (gradient + procedural stars)
        .showGraticules(true)
        .width(w)
        .height(h)

        // ── Country outlines (subtle wireframe) ────────────────────────
        .polygonsData(countries.features)
        .polygonGeoJsonGeometry((d) => d.geometry)
        .polygonCapColor(() => 'transparent')
        .polygonStrokeColor(() => 'rgba(139,148,158,0.2)')
        .polygonAltitude(0.002)
        .onPolygonHover((polygon) => {
          const canvas = container.querySelector('canvas');
          if (canvas) canvas.style.cursor = polygon ? 'pointer' : 'grab';
        })

        // ── Labels (city names + dots, visual only) ──────────────────────
        .labelsData(LABELS_DATA)
        .labelLat((d) => d.lat)
        .labelLng((d) => d.lon)
        .labelText((d) => d.text)
        .labelColor(() => '#e6edf3')
        .labelSize(0.55)
        .labelIncludeDot(true)
        .labelDotRadius(0.12)
        .labelDotOrientation(() => 'bottom')
        .labelResolution(8)

        // ── HTML city badges (easier to click) + flash markers ────────────

        function addFlash(lat, lng) {
          const id = `f${Date.now()}`;
          const flash = { _kind: 'flash', id, lat, lng };
          flashRef.current.push(flash);
          globe.htmlElementsData([...LABELS_DATA, ...flashRef.current]);
          setTimeout(() => {
            flashRef.current = flashRef.current.filter((m) => m.id !== id);
            globe.htmlElementsData([...LABELS_DATA, ...flashRef.current]);
          }, 700);
        }

        function onCityClick(d) {
          tourRef.current.cancelled = true;
          tourRef.current.done = true;
          if (selectedRef.current) return;
          selectedRef.current = d;
          setSelectedCity(d);
          controlsRef.current.autoRotate = false;
          spawnGlow(d.lat, d.lon, scene);
          addFlash(d.lat, d.lon);
          globe.pointOfView({ lat: d.lat, lng: d.lon, altitude: 0.7 }, 1200);
        }

        globe
          .htmlElementsData(LABELS_DATA)
          .htmlLat((d) => d.lat)
          .htmlLng((d) => d.lon)
          .htmlAltitude((d) => (d._kind === 'flash' ? 0 : 0.006))
          .htmlElement((d) => {
            const el = document.createElement('div');
            // Flash ripple
            if (d._kind === 'flash') {
              el.style.cssText = 'pointer-events:none;width:0;height:0;';
              el.innerHTML = `
                <div style="
                  position:relative;width:0;height:0;
                  left:-22px;top:-22px;
                ">
                  <div style="
                    width:44px;height:44px;border-radius:50%;
                    border:2px solid rgba(255,255,255,0.9);
                    background:rgba(255,255,255,0.2);
                    animation:globe-flash 0.7s ease-out forwards;
                  "></div>
                </div>`;
              return el.firstElementChild;
            }
            // City badge (with pulsing ring)
            el.innerHTML = `
              <div class="globe-city-marker">
                <span class="globe-city-pulse"></span>
                <span class="globe-city-dot"></span>
                <span class="globe-city-name">${escapeHtml(d.text)}</span>
              </div>`;
            const inner = el.firstElementChild;
            inner.addEventListener('click', (e) => {
              e.stopPropagation();
              onCityClick(d);
            });
            return inner;
          })

        // ── Arc (Kingston ↔ Hong Kong) ─────────────────────────────────
        .arcsData(ARC_DATA)
        .arcStartLat((d) => d.startLat)
        .arcStartLng((d) => d.startLng)
        .arcEndLat((d) => d.endLat)
        .arcEndLng((d) => d.endLng)
        .arcColor(() => [
          'rgba(126,231,135,0.5)',
          'rgba(88,166,255,0.7)',
          'rgba(126,231,135,0.5)',
        ])
        .arcAltitude(0.35)
        .arcDashLength(0.6)
        .arcDashGap(0.12)
        .arcDashAnimateTime(4000)
        .arcStroke(0.6)
        .arcCurveResolution(64)

        // ── Rings (pulse at cities) ────────────────────────────────────
        .ringsData(RINGS_DATA)
        .ringLat((d) => d.lat)
        .ringLng((d) => d.lng)
        .ringColor(() => ['rgba(126,231,135,0)', 'rgba(126,231,135,0.7)'])
        .ringMaxRadius(2.5)
        .ringPropagationSpeed(1.8)
        .ringRepeatPeriod(500)
        .onGlobeClick(() => {
          tourRef.current.cancelled = true;
          tourRef.current.done = true;
          if (!selectedRef.current) return;
          destroyGlow();
          selectedRef.current = null;
          setSelectedCity(null);
          controlsRef.current.autoRotate = true;
          globe.pointOfView({ lat: 32, lng: -30, altitude: 2.6 }, 1000);
        });

      // ── Renderer pixel ratio (retina) ───────────────────────────────

      const dpr = window.devicePixelRatio || 1;
const deviceMem = navigator.deviceMemory || 8; // not available everywhere, defaults high
const targetPR = isLowPower || deviceMem < 4 ? 1 : Math.min(dpr, 2);
globe.renderer().setPixelRatio(targetPR);

      // ── PBR material (MeshStandardMaterial + specular water + city lights) ──

      const texLoader = new THREE.TextureLoader();
      const pbrDayTex = texLoader.load('/textures/earth-day.jpg');
      const pbrNightTex = texLoader.load('/textures/earth-night.jpg');

      const oldMat = globe.globeMaterial();
      const pbrMaterial = new THREE.MeshStandardMaterial({
        map: pbrDayTex,
        roughnessMap: roughnessTexture,
        roughness: 0.35,
        metalness: 0.02,
        bumpMap: pbrDayTex,
        bumpScale: 4,
        emissive: new THREE.Color('#ffaa44'),
        emissiveIntensity: 0.4,
        emissiveMap: pbrNightTex,
      });
      globe.globeMaterial(pbrMaterial);
      if (oldMat) oldMat.dispose();

      // ── Ambient light so PBR material isn't pure-black ─────────────
      const scene = globe.scene();
      const ambientLight = new THREE.AmbientLight(0x223355, 0.5);
      scene.add(ambientLight);

      // ── Gradient background (dark blue center → black) + procedural starfield ──
      // Radial gradient via large inverted sphere
      const bgGeo = new THREE.SphereGeometry(100, 32, 32);
      const bgMat = new THREE.ShaderMaterial({
        uniforms: {
          uCenter: { value: new THREE.Color('#0a1628') },  // deep blue center
          uEdge:   { value: new THREE.Color('#000000') },  // pure black edge
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uCenter;
          uniform vec3 uEdge;
          varying vec3 vNormal;
          void main() {
            float fade = pow(1.0 - abs(vNormal.z), 2.5);
            gl_FragColor = vec4(mix(uEdge, uCenter, fade), 1.0);
          }
        `,
        side: THREE.BackSide,
        depthWrite: false,
      });
      const bgMesh = new THREE.Mesh(bgGeo, bgMat);
      scene.add(bgMesh);

      // Procedural starfield (Points, varying size/color/twinkle)
      const STAR_COUNT = 3000;
      const starPos = new Float32Array(STAR_COUNT * 3);
      const starSizes = new Float32Array(STAR_COUNT);
      const starColors = new Float32Array(STAR_COUNT * 3);
      const starPhases = new Float32Array(STAR_COUNT);
      for (let i = 0; i < STAR_COUNT; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 90 + Math.random() * 5;  // shell at ~90-95
        starPos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
        starPos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
        starPos[i * 3 + 2] = Math.cos(phi) * r;
        starSizes[i] = 0.15 + Math.random() * 0.35;
        // Slight color variation: warm white → cool white → faint blue
        const c = Math.random();
        if (c < 0.5) { starColors[i*3]=1.0; starColors[i*3+1]=0.95; starColors[i*3+2]=0.85; }
        else if (c < 0.8) { starColors[i*3]=0.9; starColors[i*3+1]=0.95; starColors[i*3+2]=1.0; }
        else { starColors[i*3]=0.7; starColors[i*3+1]=0.8; starColors[i*3+2]=1.0; }
        starPhases[i] = Math.random() * Math.PI * 2;
      }
      const starGeom = new THREE.BufferGeometry();
      starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
      starGeom.setAttribute('aSize', new THREE.BufferAttribute(starSizes, 1));
      starGeom.setAttribute('aColor', new THREE.BufferAttribute(starColors, 3));
      starGeom.setAttribute('aPhase', new THREE.BufferAttribute(starPhases, 1));
      const starMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        vertexShader: `
          attribute float aSize;
          attribute vec3 aColor;
          attribute float aPhase;
          uniform float uTime;
          varying vec3 vColor;
          void main() {
            vColor = aColor;
            float twinkle = 0.7 + 0.3 * sin(uTime * 0.0015 + aPhase);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * twinkle * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.1, 0.5, dist);
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
        uniforms: { uTime: { value: 0 } },
      });
      const starField = new THREE.Points(starGeom, starMat);
      scene.add(starField);

      // Store for animation + cleanup
      const starFieldRef = { current: starField };
      const starPhasesRef = starPhases;

      // ── Cloud layer (custom mesh, independently rotated) ──────────────

      const cloudTexture = new THREE.TextureLoader()
        .load('/textures/clouds-alpha.png');
      const cloudMat = new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });
      const cloudGeom = new THREE.SphereGeometry(1.008, 64, 64);
      const cloudMesh = new THREE.Mesh(cloudGeom, cloudMat);
      scene.add(cloudMesh);

      // ── Enhanced atmosphere glow (World Monitor style: fresnel rim) ────────────

      // Outer atmosphere shell with fresnel rim
      const atmGeo = new THREE.SphereGeometry(2.2, 48, 48);
      const atmMat = new THREE.ShaderMaterial({
        uniforms: {
          uGlowColor: { value: new THREE.Color(0x00d4ff) },
          uIntensity: { value: 0.35 },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            vViewDir = normalize(-mvPos.xyz);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: `
          uniform vec3 uGlowColor;
          uniform float uIntensity;
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 3.0);
            float fade = smoothstep(0.0, 0.3, fresnel);
            gl_FragColor = vec4(uGlowColor, uIntensity * fade);
          }
        `,
        side: THREE.BackSide,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const atmosphereGlow = new THREE.Mesh(atmGeo, atmMat);
      scene.add(atmosphereGlow);

      // Inner subtle haze
      const innerGlowGeo = new THREE.SphereGeometry(2.05, 24, 24);
      const innerGlowMat = new THREE.MeshBasicMaterial({
        color: 0x00a8cc, side: THREE.BackSide, transparent: true, opacity: 0.08,
      });
      const innerGlow = new THREE.Mesh(innerGlowGeo, innerGlowMat);
      scene.add(innerGlow);

      // ── Cyan hemisphere light ─────────────────────────────────────────

      const cyanLight = new THREE.PointLight(0x00d4ff, 0.3);
      cyanLight.position.set(-10, -10, -10);
      scene.add(cyanLight);

      // ── Orbital particle field ────────────────────────────────────────

      const PARTICLE_COUNT = 1200;
      const particlePos = new Float32Array(PARTICLE_COUNT * 3);
      const particleSizes = new Float32Array(PARTICLE_COUNT);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 1.35 + Math.random() * 0.55;
        particlePos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
        particlePos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
        particlePos[i * 3 + 2] = Math.cos(phi) * r;
        particleSizes[i] = 0.4 + Math.random() * 0.6;
      }

      const particleGeom = new THREE.BufferGeometry();
      particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
      particleGeom.setAttribute('aSize', new THREE.BufferAttribute(particleSizes, 1));

      const particleMat = new THREE.PointsMaterial({
        color: new THREE.Color('#58a6ff'),
        size: 0.012,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      const particleField = new THREE.Points(particleGeom, particleMat);
      scene.add(particleField);

      // ── Arc flow particles ─────────────────────────────────────────

      const flowGeom = new THREE.BufferGeometry();
      flowGeom.setAttribute('position', new THREE.BufferAttribute(flowPositions, 3));
      const flowMat = new THREE.PointsMaterial({
        color: new THREE.Color('#7ee787'),
        size: 0.045,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });
      const flowMesh = new THREE.Points(flowGeom, flowMat);
      scene.add(flowMesh);
      flowParticlesRef.current = flowMesh;
      flowGeomRef.current = flowGeom;

      let particleAnimId;
      function tickParticles(time) {
        const rotateY = time * 0.00008;
        const rotateX = Math.sin(time * 0.00003) * 0.03;

        // Mouse tilt (lerp toward target)
        const mTarget = mouseTargetRef.current;
        const mCurr = mouseCurrentRef.current;
        mCurr.x = lerp(mCurr.x, hasMouseRef.current ? mTarget.x : 0, 0.06);
        mCurr.y = lerp(mCurr.y, hasMouseRef.current ? mTarget.y : 0, 0.06);
        const tiltX = mCurr.x;
        const tiltY = mCurr.y;

        particleField.rotation.y = rotateY + tiltX;
        particleField.rotation.x = rotateX + tiltY;
        wireframeCage.rotation.y = rotateY + tiltX;
        wireframeCage.rotation.x = rotateX + tiltY;
        equatorRing.rotation.y = rotateY + tiltX;
        equatorRing.rotation.x = rotateX + tiltY;
        if (cloudMesh.parent) {
          cloudMesh.rotation.y = rotateY * 1.15 + tiltX * 1.15;
          cloudMesh.rotation.x = rotateX * 0.85 + tiltY * 0.85;
        }
        atmosphereGlow.rotation.x = tiltY * 0.3;
        atmosphereGlow.rotation.y += 0.00025 + tiltX * 0.0001;
        innerGlow.rotation.x = tiltY * 0.2;
        innerGlow.rotation.y += 0.00015 + tiltX * 0.0001;

        // Starfield twinkle (CPU-side size modulation)
        const starSizesAttr = starFieldRef.current.geometry.getAttribute('aSize');
        const baseSizes = starSizesAttr.array;
        const phases = starPhasesRef;
        for (let i = 0; i < STAR_COUNT; i++) {
          starSizesAttr.array[i] = baseSizes[i] * (0.7 + 0.3 * Math.sin(time * 0.0015 + phases[i]));
        }
        starSizesAttr.needsUpdate = true;

        globeMaterial.emissiveIntensity = 0.38 + Math.sin(time * 0.0006) * 0.06;
        if (glowRef.current && glowMatRef.current) {
          const pulse = 1 + Math.sin(time * 0.003) * 0.2;
          glowRef.current.scale.set(0.15 * pulse, 0.15 * pulse, 1);
          glowMatRef.current.opacity = 0.5 + Math.sin(time * 0.003 + 1) * 0.3;
        }

        // ── Arc flow particles ──────────────────────────────────────────
        const flowSpeed = 0.4 / 60;
        for (let i = 0; i < FLOW_COUNT; i++) {
          flowProgress[i] += flowSpeed;
          if (flowProgress[i] > 1) flowProgress[i] -= 1;
          const t = flowProgress[i];
          const pos = flowBezier(t, flowStart, flowMid, flowEnd);
          flowPositions[i * 3] = pos.x;
          flowPositions[i * 3 + 1] = pos.y;
          flowPositions[i * 3 + 2] = pos.z;
        }
        flowGeom.attributes.position.needsUpdate = true;

        particleAnimId = requestAnimationFrame(tickParticles);
      }
      particleAnimId = requestAnimationFrame(tickParticles);

      // ── Geodesic wireframe cage (floating above surface) ────────────

      const cageGeom = new THREE.IcosahedronGeometry(1.04, 2);
      const cageEdges = new THREE.EdgesGeometry(cageGeom);
      const cageMat = new THREE.LineBasicMaterial({
        color: '#58a6ff',
        transparent: true,
        opacity: 0.12,
      });
      const wireframeCage = new THREE.LineSegments(cageEdges, cageMat);
      scene.add(wireframeCage);

      // ── Equatorial ring ──────────────────────────────────────────────

      const ringPoints = [];
      const ringSegments = 80;
      const ringRadius = 1.06;
      for (let i = 0; i <= ringSegments; i++) {
        const theta = (i / ringSegments) * Math.PI * 2;
        ringPoints.push(
          new THREE.Vector3(
            Math.cos(theta) * ringRadius,
            0,
            Math.sin(theta) * ringRadius,
          ),
        );
      }
      const ringGeom = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ringMat = new THREE.LineBasicMaterial({
        color: '#58a6ff',
        transparent: true,
        opacity: 0.08,
      });
      const equatorRing = new THREE.Line(ringGeom, ringMat);
      scene.add(equatorRing);

      // ── Bloom post-processing (cinematic glow) ───────────────────────

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(w, h),
        0.45,  // strength — stronger cinematic bloom
        0.6,   // radius — wider glow spread
        0.08,  // threshold — bloom more elements (city lights, atmosphere)
      );
      bloomPass.renderToScreen = true;
      globe.postProcessingComposer().addPass(bloomPass);

      // ── Orbit controls ───────────────────────────────────────────────

      const controls = globe.controls();
      controlsRef.current = controls;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.minPolarAngle = Math.PI / 4;
      controls.maxPolarAngle = Math.PI / 1.2;

      globe.pointOfView({ lat: 32, lng: -30, altitude: 2.6 });

      // ── Auto-rotate idle timeout (World Monitor style) ───────────────
      // Resume rotation after 60s of inactivity
      let autoRotateTimer = null;
      const pauseAutoRotate = () => {
        tourRef.current.cancelled = true;
        tourRef.current.done = true;
        controls.autoRotate = false;
        if (autoRotateTimer) { clearTimeout(autoRotateTimer); autoRotateTimer = null; }
      };
      const scheduleResumeAutoRotate = () => {
        if (selectedRef.current) return;
        if (autoRotateTimer) clearTimeout(autoRotateTimer);
        autoRotateTimer = setTimeout(() => { controls.autoRotate = true; }, 60_000);
      };
      container.addEventListener('mousedown', pauseAutoRotate);
      container.addEventListener('touchstart', pauseAutoRotate, { passive: true });
      container.addEventListener('mouseup', scheduleResumeAutoRotate);
      container.addEventListener('touchend', scheduleResumeAutoRotate);

      // ── Mouse-tilt parallax ──────────────────────────────────────────
      const onMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        mouseTargetRef.current = {
          x: ((e.clientX - cx) / (rect.width / 2)) * 0.05,
          y: ((e.clientY - cy) / (rect.height / 2)) * 0.05,
        };
        hasMouseRef.current = true;
      };
      const onMouseLeaveGlobe = () => {
        mouseTargetRef.current = { x: 0, y: 0 };
        hasMouseRef.current = false;
      };
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseLeaveGlobe);

      // ── Pause auto-rotate on pointer hover ──────────────────────────
      const onPointerEnter = () => { if (!selectedRef.current) controls.autoRotate = false; };
      const onPointerLeave = () => { if (!selectedRef.current) controls.autoRotate = true; };
      container.addEventListener('pointerenter', onPointerEnter);
      container.addEventListener('pointerleave', onPointerLeave);

      // ── Background pause (World Monitor style) ───────────────────────
      // Stop WebGL render when tab hidden to save GPU
      const onVisibilityChange = () => {
        if (document.hidden) {
          try { globe.pauseAnimation?.(); } catch { /* best-effort */ }
          if (typeof particleAnimId !== 'undefined') cancelAnimationFrame(particleAnimId);
        } else {
          try { globe.resumeAnimation?.(); } catch { /* best-effort */ }
          particleAnimId = requestAnimationFrame(tickParticles);
        }
      };
      document.addEventListener('visibilitychange', onVisibilityChange);

      // ── Ensure WebGL canvas is visible ───────────────────────────────

      const canvas = container.querySelector('canvas');
      if (canvas) canvas.style.display = 'block';

      // ── ResizeObserver for responsiveness ────────────────────────────

      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width: cw, height: ch } = entry.contentRect;
          if (cw > 0 && ch > 0) {
            globe.width(cw).height(ch);
            bloomPass.resolution.set(cw, ch);
          }
        }
      });
      ro.observe(container);

      // ── Store teardown ───────────────────────────────────────────────

      cleanupRef.current = () => {
        cancelAnimationFrame(particleAnimId);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        if (autoRotateTimer) clearTimeout(autoRotateTimer);
        scene.remove(particleField);
        particleGeom.dispose();
        particleMat.dispose();
        scene.remove(wireframeCage);
        cageGeom.dispose();
        cageEdges.dispose();
        cageMat.dispose();
        scene.remove(equatorRing);
        ringGeom.dispose();
        ringMat.dispose();
        scene.remove(cloudMesh);
        cloudGeom.dispose();
        cloudMat.dispose();
        scene.remove(atmosphereGlow);
        atmosphereGlow.geometry.dispose();
        atmosphereGlow.material.dispose();
        scene.remove(innerGlow);
        innerGlow.geometry.dispose();
        innerGlow.material.dispose();
        scene.remove(cyanLight);
        scene.remove(ambientLight);
        destroyGlow();
        // PBR material cleanup
        if (globeMaterial) {
          globeMaterial.dispose();
          if (globeMaterial.map) globeMaterial.map.dispose();
          if (globeMaterial.roughnessMap) globeMaterial.roughnessMap.dispose();
          if (globeMaterial.emissiveMap) globeMaterial.emissiveMap.dispose();
          if (globeMaterial.bumpMap) globeMaterial.bumpMap.dispose();
        }
        // Starfield + gradient background cleanup
        if (starFieldRef.current) {
          scene.remove(starFieldRef.current);
          starFieldRef.current.geometry.dispose();
          starFieldRef.current.material.dispose();
        }
        if (bgMesh) {
          scene.remove(bgMesh);
          bgMesh.geometry.dispose();
          bgMesh.material.dispose();
        }
        ro.disconnect();
        container.removeEventListener('pointerenter', onPointerEnter);
        container.removeEventListener('pointerleave', onPointerLeave);
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseLeaveGlobe);
        scene.remove(flowMesh);
        flowGeom.dispose();
        flowMat.dispose();
        globe.postProcessingComposer().removePass(bloomPass);
        bloomPass.dispose();
        flashRef.current = [];
        globe._destructor();
      };

      setGlobeState({ type: 'ready' });

      // ── Auto-highlight tour (once per session) ──────────────────────
      if (!tourRef.current.done) {
        tourRef.current.active = true;
        tourRef.current.cancelled = false;
        let settleTimer;
        let tourTimeouts = [];

        const cancelTourCheck = () => {
          if (tourRef.current.cancelled) {
            tourRef.current.active = false;
            tourTimeouts.forEach(clearTimeout);
            tourTimeouts = [];
            return true;
          }
          return false;
        };

        const runTour = () => {
          if (cancelTourCheck()) return;
          const g = globeRef.current;
          const ctrls = controlsRef.current;
          if (!g || !ctrls) { tourRef.current.active = false; return; }
          const locs = LABELS_DATA;
          if (locs.length < 2) { tourRef.current.done = true; tourRef.current.active = false; return; }

          const flyTo = (loc, cb) => {
            ctrls.autoRotate = true;
            g.pointOfView({ lat: loc.lat, lng: loc.lng, altitude: 0.7 }, 2500);
            const t = setTimeout(() => {
              if (cancelTourCheck()) return;
              ctrls.autoRotate = false;
              selectedRef.current = loc;
              setSelectedCity(loc);
              glowFnsRef.current.spawnGlow(loc.lat, loc.lng, g.scene());
              glowFnsRef.current.addFlash(loc.lat, loc.lng);
              if (cb) cb();
            }, 2600);
            tourTimeouts.push(t);
          };

          // Step 1: wait 2s → fly to Kingston
          const t1 = setTimeout(() => {
            if (cancelTourCheck()) return;
            flyTo(locs[0], () => {
              // Step 2: hold 3.5s → fly to Hong Kong
              const t2 = setTimeout(() => {
                if (cancelTourCheck()) return;
                glowFnsRef.current.destroyGlow();
                selectedRef.current = null;
                setSelectedCity(null);
                flyTo(locs[1], () => {
                  // Step 3: hold 3.5s → return to overview
                  const t3 = setTimeout(() => {
                    if (cancelTourCheck()) return;
                    glowFnsRef.current.destroyGlow();
                    selectedRef.current = null;
                    setSelectedCity(null);
                    ctrls.autoRotate = true;
                    g.pointOfView({ lat: 32, lng: -30, altitude: 2.6 }, 2500);
                    tourRef.current.active = false;
                    tourRef.current.done = true;
                  }, 3500);
                  tourTimeouts.push(t3);
                });
              }, 3500);
              tourTimeouts.push(t2);
            });
          }, 2000);
          tourTimeouts.push(t1);
        };

        // Slight settle delay then start tour
        settleTimer = setTimeout(runTour, 800);
        tourTimeouts.push(settleTimer);

        // Wrap cleanup to cancel tour
        const origCleanup = cleanupRef.current;
        cleanupRef.current = () => {
          if (origCleanup) origCleanup();
          tourRef.current.cancelled = true;
          tourRef.current.active = false;
          tourTimeouts.forEach(clearTimeout);
        };
      }
    };

    init().catch((err) => {
      if (destroyed) return;
      console.error('[GlobeFootprint] init failed:', err);
      setGlobeState({
        type: 'error',
        message: `${err.name}: ${err.message}`,
        detail: err.stack?.split('\n').slice(0, 6).join(' | ') || '',
      });
    });

    return () => {
      destroyed = true;
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [isLowPower, isMounted]);

  // ── Keyboard shortcuts ─────────────────────────────────────────────────────

  useEffect(() => {
    if (globeState.type !== 'ready') return;

    function handleKeyDown(e) {
      // Only respond when the globe is focused (no input field active)
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

      const g = globeRef.current;
      const ctrls = controlsRef.current;
      if (!g || !ctrls) return;

      // Any keyboard interaction cancels the auto-highlight tour
      tourRef.current.cancelled = true;
      tourRef.current.done = true;

      const { spawnGlow: sg, destroyGlow: dg, addFlash: af } = glowFnsRef.current;
      if (e.key === 'Escape' && selectedRef.current) {
        dg();
        selectedRef.current = null;
        setSelectedCity(null);
        ctrls.autoRotate = true;
        g.pointOfView({ lat: 32, lng: -30, altitude: 2.6 }, 800);
        e.preventDefault();
      } else if (e.key === '1' && !selectedRef.current) {
        const loc = LABELS_DATA[0];
        selectedRef.current = loc;
        setSelectedCity(loc);
        ctrls.autoRotate = false;
        sg(loc.lat, loc.lon, g.scene());
        af(loc.lat, loc.lon);
        g.pointOfView({ lat: loc.lat, lng: loc.lon, altitude: 0.7 }, 1000);
        e.preventDefault();
      } else if (e.key === '2' && !selectedRef.current) {
        const loc = LABELS_DATA[1];
        selectedRef.current = loc;
        setSelectedCity(loc);
        ctrls.autoRotate = false;
        sg(loc.lat, loc.lon, g.scene());
        af(loc.lat, loc.lon);
        g.pointOfView({ lat: loc.lat, lng: loc.lon, altitude: 0.7 }, 1000);
        e.preventDefault();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [globeState.type]);

  // ── Render ────────────────────────────────────────────────────────────────

  const showOverlay = isMounted && (globeState.type !== 'ready' || isLowPower);

  return (
    <div style={{
      position: 'relative', width: 'auto', maxWidth: '500px', margin: '0 auto',
      aspectRatio: '1 / 1',
    }}>
      {showOverlay && isLowPower && <EconomyFallback />}
      {showOverlay && !isLowPower && globeState.type === 'loading' && <GlobePlaceholder />}
      {showOverlay && !isLowPower && globeState.type === 'error' && (
        <GlobeError message={globeState.message || 'Globe failed to load'} />
      )}

      <div
        ref={containerRef}
        style={{
          position: 'absolute', inset: 0, cursor: 'grab',
          visibility: globeState.type === 'ready' && !isLowPower ? 'visible' : 'hidden',
        }}
      />

      {selectedCity && globeState.type === 'ready' && !isLowPower && (
        <div style={{
          position: 'absolute', left: '12px', right: '12px', bottom: '12px',
          background: 'rgba(13,17,23,0.94)',
          border: '1px solid rgba(88,166,255,0.25)',
          borderRadius: '14px',
          padding: '14px 16px',
          backdropFilter: 'blur(14px)',
          zIndex: 10,
          animation: 'globe-card-in 0.35s cubic-bezier(0.22,1,0.36,1)',
          maxHeight: '58%', overflowY: 'auto',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
          <style>{`
            @keyframes globe-card-in {
              from { opacity: 0; transform: translateY(16px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>

          {/* Header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', marginBottom: '14px',
          }}>
            <div>
              <div style={{
                color: '#7ee787', fontWeight: 600, fontSize: '14px',
                letterSpacing: '0.01em',
              }}>
                {selectedCity.city}
              </div>
              <div style={{
                color: '#8b949e', fontSize: '10.5px', marginTop: '3px',
                letterSpacing: '0.01em',
              }}>
                {selectedCity.label}
              </div>
            </div>
            <button
              onClick={() => {
                if (!selectedRef.current) return;
                glowFnsRef.current.destroyGlow();
                selectedRef.current = null;
                setSelectedCity(null);
                if (controlsRef.current) controlsRef.current.autoRotate = true;
                if (globeRef.current) {
                  globeRef.current.pointOfView(
                    { lat: 32, lng: -30, altitude: 2.6 }, 800,
                  );
                }
              }}
              style={{
                background: 'transparent', border: 'none',
                color: '#484f58', cursor: 'pointer', fontSize: '16px',
                lineHeight: 1, padding: '0 2px', flexShrink: 0,
                marginTop: '-2px', transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#8b949e'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#484f58'; }}
            >
              &#x2715;
            </button>
          </div>

          {/* Type badge */}
          <div style={{
            display: 'inline-block',
            backgroundColor: selectedCity.type === 'education'
              ? 'rgba(88,166,255,0.15)'
              : 'rgba(126,231,135,0.15)',
            color: selectedCity.type === 'education' ? '#58a6ff' : '#7ee787',
            fontSize: '9.5px', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.08em', padding: '2px 8px', borderRadius: '4px',
            marginBottom: '12px',
          }}>
            {selectedCity.type}
          </div>

          {/* Experiences */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {selectedCity.experiences.map((exp, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                fontSize: '11.5px', lineHeight: '1.55', color: '#c9d1d9',
                padding: '5px 0',
                borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.04)',
              }}>
                <div style={{
                  width: '3px', height: '3px', borderRadius: '50%',
                  backgroundColor: '#58a6ff', flexShrink: 0,
                  marginTop: '8px', opacity: 0.6,
                }} />
                <span>{exp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
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

function buildLabelTooltipHtml(loc) {
  return [
    `<div style="color:#7ee787;font-weight:700;font-size:13px;margin-bottom:6px;letter-spacing:0.02em;">${escapeHtml(loc.city)}</div>`,
    ...loc.experiences.map(
      (e) =>
        `<div style="padding:2px 0;"><span style="color:#58a6ff;margin-right:6px;">▸</span>${escapeHtml(e)}</div>`,
    ),
  ].join('');
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
  const cleanupRef = useRef(null);
  const { quality } = usePerformance();
  const [isMounted, setIsMounted] = useState(false);
  const [globeState, setGlobeState] = useState({ type: 'loading' });

  useEffect(() => { setIsMounted(true); }, []);

  const isLowPower = quality.targetFPS < 30;

  // ── Initialise globe.gl ─────────────────────────────────────────────────

  useEffect(() => {
    if (!isMounted || isLowPower || !containerRef.current) return;

    let destroyed = false;
    setGlobeState({ type: 'loading' });

    // Fetch globe module + countries data in parallel
    const globeModule = import('globe.gl');
    const countriesData = fetch('/data/countries-110m.json')
      .then((r) => r.json())
      .then((topology) => feature(topology, topology.objects.countries));

    Promise.all([globeModule, countriesData])
      .then(async ([{ default: Globe }, countries]) => {
        if (destroyed) return;

        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const w = rect.width || 500;
        const h = rect.height || 500;

        // ── Create globe instance ────────────────────────────────────────

        const globe = new Globe(container, {
          animateIn: true,
          rendererConfig: { antialias: true, alpha: true },
        })
          .globeImageUrl('/textures/earth-night.jpg')
          .backgroundColor('#000000')
          .backgroundImageUrl('/textures/night-sky.png')
          .atmosphereColor('#58a6ff')
          .atmosphereAltitude(0.22)
          .showGraticules(true)
          .width(w)
          .height(h)

          // ── Country outlines (subtle wireframe) ────────────────────────
          .polygonsData(countries.features)
          .polygonGeoJsonGeometry((d) => d.geometry)
          .polygonCapColor(() => 'transparent')
          .polygonStrokeColor(() => 'rgba(139,148,158,0.2)')
          .polygonAltitude(0.002)

          // ── Labels (city names + dots) ─────────────────────────────────
          .labelsData(LABELS_DATA)
          .labelLat((d) => d.lat)
          .labelLng((d) => d.lon)
          .labelText((d) => d.text)
          .labelLabel((d) => buildLabelTooltipHtml(d))
          .labelColor(() => '#e6edf3')
          .labelSize(0.55)
          .labelIncludeDot(true)
          .labelDotRadius(0.12)
          .labelDotOrientation(() => 'bottom')
          .labelResolution(8)

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
          .ringRepeatPeriod(500);

        // ── Renderer pixel ratio (retina) ───────────────────────────────

        globe.renderer().setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        // ── Custom globe material (bump + slight emissive for city lights) ──

        const globeMaterial = globe.globeMaterial();
        globeMaterial.bumpScale = 4;
        globeMaterial.emissive = new THREE.Color('#111122');
        globeMaterial.emissiveIntensity = 0.15;

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
        const scene = globe.scene();
        scene.add(particleField);

        let particleAnimId;
        function tickParticles(time) {
          particleField.rotation.y = time * 0.00008;
          particleField.rotation.x = Math.sin(time * 0.00003) * 0.03;
          particleAnimId = requestAnimationFrame(tickParticles);
        }
        particleAnimId = requestAnimationFrame(tickParticles);

        // ── Bloom post-processing (cinematic glow) ───────────────────────

        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(w, h),
          0.2,   // strength — subtle bloom on bright elements
          0.4,   // radius
          0.15,  // threshold — only bloom the bright parts
        );
        globe.postProcessingComposer().addPass(bloomPass);

        // ── Orbit controls ───────────────────────────────────────────────

        const controls = globe.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.4;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.minPolarAngle = Math.PI / 4;
        controls.maxPolarAngle = Math.PI / 1.2;

        globe.pointOfView({ lat: 32, lng: -30, altitude: 2.6 });

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
          scene.remove(particleField);
          particleGeom.dispose();
          particleMat.dispose();
          ro.disconnect();
          globe.postProcessingComposer().removePass(bloomPass);
          bloomPass.dispose();
          globe._destructor();
        };

        setGlobeState({ type: 'ready' });
      })
      .catch((err) => {
        if (destroyed) return;
        console.error('[GlobeFootprint] init failed:', err);
        setGlobeState({ type: 'error', message: err.message || 'Init failed' });
      });

    return () => {
      destroyed = true;
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [isLowPower, isMounted]);

  // ── Render ────────────────────────────────────────────────────────────────

  const showOverlay = isMounted && (globeState.type !== 'ready' || isLowPower);

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto',
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
    </div>
  );
}

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
  const globeRef = useRef(null);
  const cleanupRef = useRef(null);
  const controlsRef = useRef(null);
  const selectedRef = useRef(null);
  const { quality } = usePerformance();
  const [isMounted, setIsMounted] = useState(false);
  const [globeState, setGlobeState] = useState({ type: 'loading' });
  const [selectedCity, setSelectedCity] = useState(null);

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
        });
        globeRef.current = globe;
        globe
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
          .onLabelClick((label) => {
            if (selectedRef.current) return; // already focused
            selectedRef.current = label;
            setSelectedCity(label);
            controlsRef.current.autoRotate = false;
            globe.pointOfView(
              { lat: label.lat, lng: label.lon, altitude: 0.7 },
              1200,
            );
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
            if (!selectedRef.current) return;
            selectedRef.current = null;
            setSelectedCity(null);
            controlsRef.current.autoRotate = true;
            globe.pointOfView({ lat: 32, lng: -30, altitude: 2.6 }, 1000);
          });

        // ── Renderer pixel ratio (retina) ───────────────────────────────

        globe.renderer().setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        // ── Custom globe material (bump + slight emissive for city lights) ──

        const globeMaterial = globe.globeMaterial();
        globeMaterial.bumpScale = 4;
        globeMaterial.emissive = new THREE.Color('#111122');
        globeMaterial.emissiveIntensity = 0.15;

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
          const rotateY = time * 0.00008;
          const rotateX = Math.sin(time * 0.00003) * 0.03;
          particleField.rotation.y = rotateY;
          particleField.rotation.x = rotateX;
          wireframeCage.rotation.y = rotateY;
          wireframeCage.rotation.x = rotateX;
          equatorRing.rotation.y = rotateY;
          equatorRing.rotation.x = rotateX;
          cloudMesh.rotation.y = rotateY * 1.15;  // clouds drift faster than globe
          cloudMesh.rotation.x = rotateX * 0.85;
          globeMaterial.emissiveIntensity = 0.12 + Math.sin(time * 0.0006) * 0.04;
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
          0.2,   // strength — subtle bloom on bright elements
          0.4,   // radius
          0.15,  // threshold — only bloom the bright parts
        );
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

        // ── Pause auto-rotate on pointer hover ──────────────────────────

        const onPointerEnter = () => {
          if (!selectedRef.current) controls.autoRotate = false;
        };
        const onPointerLeave = () => {
          if (!selectedRef.current) controls.autoRotate = true;
        };
        container.addEventListener('pointerenter', onPointerEnter);
        container.addEventListener('pointerleave', onPointerLeave);

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
          ro.disconnect();
          container.removeEventListener('pointerenter', onPointerEnter);
          container.removeEventListener('pointerleave', onPointerLeave);
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

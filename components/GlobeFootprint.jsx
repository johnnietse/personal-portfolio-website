'use client';

import { useEffect, useRef, useState } from 'react';
import { usePerformance } from './PerformanceManager';
import { LOCATIONS } from '@/lib/config/locations';

// ─── Arc data: Kingston ↔ Hong Kong ──────────────────────────────────────────

const ARC_DATA = [{
  startLat: LOCATIONS[0].lat,
  startLng: LOCATIONS[0].lon,
  endLat: LOCATIONS[1].lat,
  endLng: LOCATIONS[1].lon,
}];

// ─── Pin HTML builder ────────────────────────────────────────────────────────

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function createPinElement(loc) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText =
    'position:relative;display:flex;align-items:center;justify-content:center;cursor:pointer;width:24px;height:24px;';

  // Glow ring
  const glow = document.createElement('div');
  glow.style.cssText =
    'position:absolute;width:18px;height:18px;border-radius:50%;' +
    'background:rgba(126,231,135,0.15);animation:globe-pulse 2.5s ease-in-out infinite;';

  // Pin dot
  const dot = document.createElement('div');
  dot.style.cssText =
    'width:8px;height:8px;border-radius:50%;background:#7ee787;' +
    'box-shadow:0 0 12px rgba(126,231,135,0.9);z-index:1;';

  wrapper.appendChild(glow);
  wrapper.appendChild(dot);

  // Tooltip
  const tooltip = document.createElement('div');
  tooltip.style.cssText = [
    'position:absolute;bottom:26px;left:50%;transform:translateX(-50%);',
    'background:rgba(13,17,23,0.95);border:1px solid #7ee787;border-radius:10px;',
    'padding:10px 14px;font-family:system-ui,sans-serif;font-size:12px;line-height:1.5;',
    'color:#c9d1d9;box-shadow:0 8px 32px rgba(0,0,0,0.6);backdrop-filter:blur(8px);',
    'opacity:0;pointer-events:none;transition:opacity 0.2s ease;',
    'max-width:300px;white-space:normal;z-index:100;',
  ].join('');
  tooltip.innerHTML = [
    `<div style="color:#7ee787;font-weight:700;font-size:13px;margin-bottom:6px;letter-spacing:0.02em;">${escapeHtml(loc.city)}</div>`,
    ...loc.experiences.map(
      (e) =>
        `<div style="padding:2px 0;"><span style="color:#58a6ff;margin-right:6px;">▸</span>${escapeHtml(e)}</div>`,
    ),
  ].join('');
  wrapper.appendChild(tooltip);

  wrapper.addEventListener('mouseenter', () => { tooltip.style.opacity = '1'; });
  wrapper.addEventListener('mouseleave', () => { tooltip.style.opacity = '0'; });

  return wrapper;
}

// ─── Economy fallback ────────────────────────────────────────────────────────

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
          <span style={{ fontSize: '12px', color: '#8b949e' }}>Queen&apos;s University → Hong Kong</span>
        </div>
      </div>
    </div>
  );
}

// ─── Injection keyframes ────────────────────────────────────────────────────

function injectStyles() {
  const id = 'globe-footprint-styles';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = `
    @keyframes globe-pulse {
      0%, 100% { transform: scale(1); opacity: 0.25; }
      50% { transform: scale(1.6); opacity: 0.08; }
    }
  `;
  document.head.appendChild(style);
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function GlobeFootprint() {
  const containerRef = useRef(null);
  const globeRef = useRef(null);
  const { quality } = usePerformance();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  const isLowPower = quality.targetFPS < 30;

  // Initialise globe.gl when container mounts
  useEffect(() => {
    if (isLowPower || !containerRef.current) return;

    let destroyGlobe = () => {};

    // Dynamic import — globe.gl references window at module eval time
    import('globe.gl').then(({ default: Globe }) => {
      injectStyles();
      const container = containerRef.current;
      if (!container) return;

      const globe = new Globe(container)
        .globeImageUrl('/textures/earth-blue-marble.jpg')
        .backgroundColor('#020617')
        .atmosphereColor('#58a6ff')
        .atmosphereAltitude(0.12)

        // Fill container
        .width(container.clientWidth)
        .height(container.clientHeight)

        // HTML pins
        .htmlElementsData(LOCATIONS)
        .htmlLat((d) => d.lat)
        .htmlLng((d) => d.lon)
        .htmlElement((d) => createPinElement(d))

        // Arcs
        .arcsData(ARC_DATA)
        .arcStartLat((d) => d.startLat)
        .arcStartLng((d) => d.startLng)
        .arcEndLat((d) => d.endLat)
        .arcEndLng((d) => d.endLng)
        .arcColor(() => ['rgba(126,231,135,0.12)', 'rgba(88,166,255,0.12)'])
        .arcDashLength(0.6)
        .arcDashGap(0.15)
        .arcDashAnimateTime(5000)
        .arcStroke(0.4);

      // Orbit controls — manual drag only, no auto-rotate
      const controls = globe.controls();
      controls.autoRotate = false;
      controls.autoRotateSpeed = 0;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.minPolarAngle = Math.PI / 3.5;
      controls.maxPolarAngle = Math.PI / 1.3;

      // Initial camera: framed so both North America and Asia are visible
      globe.pointOfView({ lat: 30, lng: -20, altitude: 2.8 });

      globeRef.current = globe;

      // ResizeObserver — keeps globe filling its container
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            globe.width(width).height(height);
          }
        }
      });
      resizeObserver.observe(container);

      destroyGlobe = () => {
        resizeObserver.disconnect();
        if (globeRef.current) {
          globeRef.current._destructor();
          globeRef.current = null;
        }
      };
    });

    return () => {
      destroyGlobe();
    };
  }, [isLowPower]);

  // Hydration guard
  if (!isMounted) return null;

  // Economy tier: pure CSS, no WebGL
  if (isLowPower) {
    return <EconomyFallback />;
  }

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto',
      aspectRatio: '1/1',
    }}>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', cursor: 'grab' }}
      />
    </div>
  );
}

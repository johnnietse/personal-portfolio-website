# Globe Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add arc flow particles, mouse-tilt parallax, city entrance animation, and auto-highlight tour to the existing GlobeFootprint component.

**Architecture:** All changes are self-contained within `components/GlobeFootprint.jsx` (1103 lines). Arc flow particles and mouse-tilt run inside the existing `tickParticles` RAF loop. City entrance is CSS injected via the existing `<style>` block. Auto-highlight tour is a new `useEffect` + `useRef` cascade that triggers once on first `ready` state.

**Tech Stack:** Three.js (dynamically loaded), globe.gl, CSS animations, React refs.

## Global Constraints

- No new npm dependencies — everything uses `three` ^0.183.2 already in package.json
- No new files — all changes inside `components/GlobeFootprint.jsx`
- Must not break existing features: country outlines, atmosphere glow, orbit controls, bloom, badges, performance tiers
- Must preserve all existing cleanup/release logic
- Build must pass after each logical step

---

### Task 1: Arc Flow Particles

**Files:**
- Modify: `components/GlobeFootprint.jsx` — add flow particle Points + tickParticles update

**Interfaces:**
- Consumes: `ARC_DATA[0]` (startLat/startLng, endLat/endLng), `THREE` (from dynamic import), existing `tickParticles` loop
- Produces: `flowParticles` mesh added to `scene`, animated in `tickParticles`

**Implementation:**

Arc flow particles use spherical interpolation (slerp) along the great-circle path between Kingston and Hong Kong. Each particle advances by `delta * 0.4` per frame, wrapping back to 0 when it hits 1.

Constants to add after `const PARTICLE_COUNT = 1200` (around line 675):
```js
const FLOW_COUNT = 50;
// Convert lat/lng to unit sphere coords for start/end of arc
const arcStartLat = ARC_DATA[0].startLat;
const arcStartLng = ARC_DATA[0].startLng;
const arcEndLat = ARC_DATA[0].endLat;
const arcEndLng = ARC_DATA[0].endLng;

function geoToVec3(lat, lng, r) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lng + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}
// Note: reuse and refactor existing latLngToVec3 to use this as a general helper

const flowStart = geoToVec3(arcStartLat, arcStartLng, 1.01);
const flowEnd = geoToVec3(arcEndLat, arcEndLng, 1.01);
// Also compute control point for arc curve (lifted midpoint)
const flowMid = geoToVec3(
  (arcStartLat + arcEndLat) / 2,
  (arcStartLng + arcEndLng) / 2,
  1.35,  // elevated above surface
);
```

Flow particles data array:
```js
const flowProgress = new Float32Array(FLOW_COUNT);
for (let i = 0; i < FLOW_COUNT; i++) {
  flowProgress[i] = i / FLOW_COUNT;  // spread evenly around the loop
}
const flowPositions = new Float32Array(FLOW_COUNT * 3);
```

Quadratic Bezier interpolation on the sphere for each particle:
```js
function flowBezier(t, start, mid, end) {
  const v = new THREE.Vector3();
  const a = new THREE.Vector3().lerpVectors(start, mid, t);
  const b = new THREE.Vector3().lerpVectors(mid, end, t);
  v.lerpVectors(a, b, t);
  return v.normalize().multiplyScalar(1.01);
}
```

Create Points geometry + material after `particleField` creation (around line 702):
```js
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

const flowParticles = new THREE.Points(flowGeom, flowMat);
scene.add(flowParticles);
```

In `tickParticles`, inside the `particleAnimId = requestAnimationFrame(tickParticles)` loop, compute before the star twinkle section:
```js
// Flow particles along arc
const flowSpeed = 0.4 / 60; // per-frame step for ~2.5s loop
for (let i = 0; i < FLOW_COUNT; i++) {
  flowProgress[i] += flowSpeed;
  if (flowProgress[i] > 1) flowProgress[i] -= 1;
  const t = flowProgress[i];
  // Size envelope: fade in at start, full in middle, fade at end
  const alpha = t < 0.1 ? t / 0.1 : t > 0.9 ? (1 - t) / 0.1 : 1;
  const pos = flowBezier(t, flowStart, flowMid, flowEnd);
  flowPositions[i * 3] = pos.x;
  flowPositions[i * 3 + 1] = pos.y;
  flowPositions[i * 3 + 2] = pos.z;
}
flowGeom.attributes.position.needsUpdate = true;
```

Add to cleanup (in `cleanupRef.current`):
```js
scene.remove(flowParticles);
flowGeom.dispose();
flowMat.dispose();
```

---

### Task 2: Mouse-Tilt Parallax

**Files:**
- Modify: `components/GlobeFootprint.jsx` — add mouse tracking + tilt in tickParticles

**Implementation:**

Add refs near other refs (around line 92-101):
```js
const mouseTargetRef = useRef({ x: 0, y: 0 });
const mouseCurrentRef = useRef({ x: 0, y: 0 });
const hasMouseRef = useRef(false);
```

Inside the `useEffect` init, after the container event listeners (around line 822), add mousemove/mouseleave:
```js
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
```

The element `tiltGroup` needs to be introduced. Since multiple objects (particleField, wireframeCage, equatorRing, cloudMesh, atmosphereGlow, innerGlow) all rotate independently, we can't easily group them. Instead, apply the tilt additive rotation to each in the `tickParticles` loop.

Before `tickParticles` (around line 705), add smoothing:
```js
const lerp = (a, b, t) => a + (b - a) * t;
```

In `tickParticles`, after the particle rotation calculations (around line 714), add tilt:
```js
const target = mouseTargetRef.current;
const current = mouseCurrentRef.current;
current.x = lerp(current.x, (hasMouseRef.current ? target.x : 0), 0.06);
current.y = lerp(current.y, (hasMouseRef.current ? target.y : 0), 0.06);

// Apply tilt to orbital elements
const tiltAx = current.x;
const tiltAy = current.y;
// These get ADDED to the existing rotation.y/x values
particleField.rotation.x = rotateX + tiltAy;
particleField.rotation.y = rotateY + tiltAx;
wireframeCage.rotation.x = rotateX + tiltAy;
wireframeCage.rotation.y = rotateY + tiltAx;
equatorRing.rotation.x = rotateX + tiltAy;
equatorRing.rotation.y = rotateY + tiltAx;
if (cloudMesh.parent) {
  cloudMesh.rotation.x = rotateX * 0.85 + tiltAy * 0.85;
  cloudMesh.rotation.y = rotateY * 1.15 + tiltAx * 1.15;
}
atmosphereGlow.rotation.x = tiltAy * 0.3;  // separate slow rotation + tilt
atmosphereGlow.rotation.y += 0.00025 + tiltAx * 0.0001;
innerGlow.rotation.x = tiltAy * 0.2;
innerGlow.rotation.y += 0.00015 + tiltAx * 0.0001;
```

Add listeners to cleanup (in `cleanupRef.current`):
```js
container.removeEventListener('mousemove', onMouseMove);
container.removeEventListener('mouseleave', onMouseLeaveGlobe);
```

---

### Task 3: City Entrance Animation

**Files:**
- Modify: `components/GlobeFootprint.jsx` — CSS injection block

**Implementation:**

In the injected `<style>` block (around line 276-334), add:
```css
.globe-city-marker {
  animation: globe-badge-enter 0.5s ease-out both;
}
.globe-city-marker:last-child {
  animation-delay: 0.2s;
}
@keyframes globe-badge-enter {
  from { opacity: 0; transform: translateY(-8px) scale(0.9); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
```

Also update the `.globe-city-marker` existing rules — remove any pre-existing `animation` or add `animation: globe-badge-enter ...` instead.

The `globe-dot-breathe` animation should remain (it controls the breathing dot). Multiple animations can coexist with `animation: globe-badge-enter 0.5s ease-out both, globe-dot-breathe 3s ease-in-out infinite;` but that would apply to the marker itself, not the dot inside.

Actually, the `globe-dot-breathe` is on `.globe-city-dot` (inner element), not on `.globe-city-marker`, so there's no conflict. The marker gets `globe-badge-enter` and the dot gets `globe-dot-breathe`.

---

### Task 4: Auto-Highlight Tour

**Files:**
- Modify: `components/GlobeFootprint.jsx` — new useEffect + tour refs

**Implementation:**

New ref near other refs (around line 92-101):
```js
const tourRef = useRef({ active: false, cancelled: true, done: false });
```

After the existing `setGlobeState({ type: 'ready' })` call (line 911), add:
```js
// Start auto-highlight tour
if (!tourRef.current.done) {
  tourRef.current.active = true;
  tourRef.current.cancelled = false;
  const startTour = () => {
    const controller = controlsRef.current;
    const globe = globeRef.current;
    if (!controller || !globe || tourRef.current.cancelled) {
      tourRef.current.active = false;
      return;
    }
    
    const locs = LABELS_DATA;
    if (locs.length < 2) {
      tourRef.current.done = true;
      tourRef.current.active = false;
      return;
    }
    
    let tourTimeout;
    
    const cancelCheck = () => {
      if (tourRef.current.cancelled) {
        tourRef.current.active = false;
        if (tourTimeout) clearTimeout(tourTimeout);
        return true;
      }
      return false;
    };
    
    // Step 1: Wait 2s, then fly to Kingston
    tourTimeout = setTimeout(() => {
      if (cancelCheck()) return;
      controller.autoRotate = true; // ensure rotating toward the city
      globe.pointOfView({ lat: locs[0].lat, lng: locs[0].lng, altitude: 0.7 }, 2500);
      
      // Step 2: On arrival (2500ms later), show Kingston info
      tourTimeout = setTimeout(() => {
        if (cancelCheck()) return;
        selectedRef.current = locs[0];
        setSelectedCity(locs[0]);
        controller.autoRotate = false;
        glowFnsRef.current.spawnGlow(locs[0].lat, locs[0].lng, globe.scene());
        glowFnsRef.current.addFlash(locs[0].lat, locs[0].lng);
        
        // Step 3: Hold 3.5s, then fly to Hong Kong
        tourTimeout = setTimeout(() => {
          if (cancelCheck()) return;
          glowFnsRef.current.destroyGlow();
          selectedRef.current = null;
          setSelectedCity(null);
          controller.autoRotate = true;
          globe.pointOfView({ lat: locs[1].lat, lng: locs[1].lng, altitude: 0.7 }, 2500);
          
          // Step 4: On arrival, show Hong Kong info
          tourTimeout = setTimeout(() => {
            if (cancelCheck()) return;
            selectedRef.current = locs[1];
            setSelectedCity(locs[1]);
            controller.autoRotate = false;
            glowFnsRef.current.spawnGlow(locs[1].lat, locs[1].lng, globe.scene());
            glowFnsRef.current.addFlash(locs[1].lat, locs[1].lng);
            
            // Step 5: Hold 3.5s, then fly back to overview
            tourTimeout = setTimeout(() => {
              if (cancelCheck()) return;
              glowFnsRef.current.destroyGlow();
              selectedRef.current = null;
              setSelectedCity(null);
              controller.autoRotate = true;
              globe.pointOfView({ lat: 32, lng: -30, altitude: 2.6 }, 2500);
              
              // Tour complete
              tourRef.current.active = false;
              tourRef.current.done = true;
              tourTimeout = null;
            }, 3500);
          }, 2600); // ~2500ms flight + 100ms buffer
        }, 3500);
      }, 2600);
    }, 2000);
  };
  
  // Delay start slightly to let globe settle
  const settleTimeout = setTimeout(startTour, 500);
  // Store cleanup
  const origCleanup = cleanupRef.current;
  cleanupRef.current = () => {
    if (origCleanup) origCleanup();
    clearTimeout(settleTimeout);
    tourRef.current.cancelled = true;
    tourRef.current.active = false;
  };
}
```

**Cancellation hooks**: The existing `onCityClick`, keyboard shortcuts (Escape, 1, 2), `onGlobeClick`, and `mousedown`/`touchstart` on the container should all set `tourRef.current.cancelled = true` and `tourRef.current.done = true`.

Add to `onCityClick` (around line 395-403):
```js
tourRef.current.cancelled = true;
tourRef.current.done = true;
```

Add to the `Escape` handler (around line 948):
```js
tourRef.current.cancelled = true;
tourRef.current.done = true;
```

Add to keyboard shortcuts '1' and '2' (around line 954-972):
```js
tourRef.current.cancelled = true;
tourRef.current.done = true;
```

Add to `onGlobeClick` (around line 470-477):
```js
tourRef.current.cancelled = true;
tourRef.current.done = true;
```

Add to `pauseAutoRotate` (around line 804-806) — mousedown/touchstart already trigger this:
```js
tourRef.current.cancelled = true;
tourRef.current.done = true;
```

---

### Verification

- Run: `npm run build` — must pass with no errors
- Visual: open `localhost:3001`, scroll to globe section
  1. Flow particles: green dots streaming along the Kingston→HK arc
  2. Mouse-tilt: hover over globe, orbital elements tilt toward cursor
  3. City entrance: badges slide+fade in on first render with stagger
  4. Auto-highlight tour: globe auto-focuses each city on first load

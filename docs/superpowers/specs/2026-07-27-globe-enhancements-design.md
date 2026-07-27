# Globe Enhancement: Arc Flow Particles, Mouse-Tilt, City Entrance, Auto-Highlight Tour

## Overview

Four self-contained visual enhancements to `GlobeFootprint.jsx` that elevate the "Global Engineering Footprint" section of the portfolio homepage. No new dependencies, no new files — all changes live inside the 1103-line `GlobeFootprint.jsx` component.

## Features

### 1. Arc Flow Particles

**What**: 50 small glowing dots that travel continuously along the Kingston → Hong Kong great-circle arc.

**How**:
- Generate `FLOW_PARTICLE_COUNT = 50` flow particles in `useEffect` init
- Each particle stores a `progress` value [0, 1) along the arc + random offset
- On every animation frame (`tickParticles`), advance `progress` by `delta * speed = 0.4`
- Map `progress` → lat/lng along the arc using spherical interpolation (slerp) between Kingston and Hong Kong coordinates
- Create a `THREE.Points` with a single `BufferGeometry`, positions updated per-frame
- Material: `PointsMaterial`, color `#7ee787` (city glow green), `AdditiveBlending`, `sizeAttenuation: true`
- Size envelope: small at start, larger in middle, fades at end
- Wrap progress back to 0 when it reaches 1 (continuous stream)

**Dependencies**: Arc start/end coordinates already defined in `ARC_DATA[0]`.

### 2. Mouse-Tilt Parallax

**What**: When hovering over the globe, the orbital elements (particle field, wireframe cage, equator ring, clouds, atmosphere) subtly tilt toward the cursor.

**How**:
- Add `mousemove` event listener on the container element
- Track `mouseX` and `mouseY` normalized to [-1, 1] relative to container center
- In `tickParticles`, use `lerp(current, target, 0.05)` for smooth following
- Apply tilt as an additional rotation `Quaternion` or additive Euler on the group axis
- Tilt magnitude: max ±0.05 radians (~3°) on both X/Z axes
- The globe body itself stays fixed — only the orbiting elements tilt
- Only active when `mouse` pointer type (not touch)
- Decay back to neutral (0, 0) on `mouseleave`

### 3. City Entrance Animation

**What**: City badges don't just pop in — they animate in sequentially.

**How**:
- CSS `@keyframes globe-badge-enter` defined in the injected `<style>` block:
  ```
  from { opacity: 0; transform: translateY(-8px) scale(0.9); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
  ```
- `.globe-city-marker` gets `animation: globe-badge-enter 0.5s ease-out both`
- Second badge (last child) gets `animation-delay: 0.2s` via data attribute or nth-child
- The injection happens once on init, so the animation plays when `htmlElementsData` first sets the badges
- Subtle enough to not be distracting, visible enough to feel polished

### 4. Auto-Highlight Tour

**What**: On first load, the globe automatically flies to each city, shows its info, then returns to overview.

**How**:
- `tourRef = useRef({ active: false, cancelled: false })`
- After `setGlobeState({ type: 'ready' })`, if not cancelled:

  **Sequence** (using setTimeout/setInterval chain):
  1. Wait 2s → adjust rotation so Kingston faces viewer gradually
  2. Fly to Kingston (`pointOfView` → `{ lat: 44.23, lng: -76.49, altitude: 0.7 }`, 2500ms)
  3. On arrival: `spawnGlow`, `addFlash`, `setSelectedCity(Kingston)`, pause auto-rotate
  4. Hold 3.5s → fly to Hong Kong (2500ms)
  5. On arrival: `spawnGlow`, `addFlash`, `setSelectedCity(HongKong)`, pause auto-rotate
  6. Hold 3.5s → fly back to overview (2500ms)
  7. On arrival: `destroyGlow`, `setSelectedCity(null)`, resume auto-rotate
  8. Tour complete — `tourRef.current.active = false`
  9. Never tours again this session (`tourRef.current.done = true`)

- **Cancellation**: If user clicks any city badge, taps the globe, presses 1/2/Escape, the tour:
  - Sets `tourRef.current.cancelled = true` which all pending timeouts check
  - Any in-progress flight completes but no new actions fire
  - The tour does not re-trigger

#### Success Criteria

| Feature | Signal |
|---------|--------|
| Flow particles | Green dots visibly streaming along the Kingston→HK arc |
| Mouse-tilt | Orbital elements lean ±3° toward cursor, snap back on leave |
| City entrance | Badges slide+fade in on first render, second badge delayed |
| Auto-highlight tour | On first load, globe auto-focuses each city then returns to overview |
| Cancellation | Clicking anywhere mid-tour stops the sequence cleanly |

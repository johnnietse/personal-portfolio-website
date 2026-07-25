# Portfolio Engineering Upgrade: WorldMonitor-Inspired Patterns

**Date:** 2026-07-25
**Status:** Draft
**Project:** johnnietse/personal-portfolio-website
**Stack:** Next.js 16, React 19, Three.js/R3F, Tailwind CSS

## Overview

Upgrade the portfolio's engineering internals by adopting architectural patterns from the WorldMonitor OSINT project. All changes are internally focused — the visual design, content, sections, and user-facing behavior of the portfolio remain unchanged. The result is a portfolio that is more resilient to API failures, performs better on low-end devices, manages memory more responsibly, and demonstrates the same "skill hell" engineering rigor that defines WorldMonitor.

---

## 1. Architecture & Directory Structure

**No structural changes to pages, layout, or routing.** All changes are additive (new utility/config files) or surgical (wrapping existing component logic).

```
lib/                          ← New directory for utilities and configs (matches root-level convention)
  utils/
    circuit-breaker.ts        ← Generic circuit breaker with stale-while-revalidate
    backoff.ts                ← Exponential backoff with configurable jitter
    welford.ts                ← Welford online algorithm (mean/variance/stddev)
    webgl-detect.ts           ← WebGL2 feature detection + software renderer detection
  config/
    skills.ts                 ← Typed skill definitions extracted from components
    projects.ts               ← Typed project metadata (for GitHub fallback)
    locations.ts              ← Geo coordinates for personal map data
    constants.ts              ← GC intervals, cache TTLs, history caps
  hooks/
    useRAF.js                 ← RAF scheduler with input-yielding awareness
    useBoundedHistory.js      ← Bounded array with auto-GC sweep
    useRenderBudget.js        ← Per-frame time budget enforcement
```

**Principle:** Every utility is a pure TypeScript function with zero React or framework dependency. Hooks wrap utilities for React integration. Files live at root level (not `src/`) to match the existing project convention (`components/`, `app/`, etc.) and the `@/*` path alias in `jsconfig.json`.

---

## 2. Circuit Breaker + Exponential Backoff

### Purpose
GitHub API calls in 10+ components fail silently or hang when rate-limited or offline. A circuit breaker provides graceful degradation: serve stale cached data when the API is down, recover automatically when it comes back.

### Implementation: `lib/utils/circuit-breaker.ts`

A generic `CircuitBreaker<T>` class with three states:

| State | Behavior |
|-------|----------|
| `normal` | Execute fetch normally. Track consecutive failures. |
| `open` (cooldown) | Skip fetch. Serve cached data or fallback. After cooldown, transition to half-open. |
| `half-open` | Allow one probe request. Success → normal. Failure → open again. |

**Configuration per breaker:**
- `name` (string) — identifier for logging
- `maxFailures` (default: 3) — consecutive failures before opening
- `cooldownMs` (default: 5 min) — time before retry
- `cacheTtlMs` (default: 30 min) — how long cached data is fresh
- `fallbackValue` (T | null) — static default if no cache exists

**Execution API:**
```typescript
const breaker = new CircuitBreaker<GithubProfile>({
  name: 'GitHub Profile',
  maxFailures: 3,
  cooldownMs: 300_000,
  cacheTtlMs: 1_800_000,
  fallbackValue: null,
});

// Usage
const result = await breaker.execute(
  () => fetch('https://api.github.com/users/johnnietse'),
  (cached) => setProfile(cached)   // on-cache callback
);
```

### Implementation: `lib/utils/backoff.ts`

```typescript
export function computeDelay(
  attempt: number,
  baseMs: number = 1000,
  maxMs: number = 16000,
  jitterFraction: number = 0.1
): number {
  const exponential = Math.min(baseMs * Math.pow(2, attempt), maxMs);
  const jitter = exponential * jitterFraction * (Math.random() * 2 - 1);
  return Math.max(0, Math.round(exponential + jitter));
}
// Attempt 0: ~1000ms ±10%, Attempt 1: ~2000ms ±10%, ... Attempt 4: ~16000ms ±10%
```

### Components Modified
- `GitHubStats.jsx` — profile data wrapped with profile breaker
- `LiveGithubProjects.jsx` — repo list wrapped with repos breaker
- `GithubProfileHeader.jsx` — header data with profile breaker
- `GithubContributionGrid.jsx` — contributions with separate breaker
- `GithubTopRepos.jsx` — top repos with repos breaker
- `GithubInterestStreams.jsx` — starred repos with stars breaker

Each component gets its own breaker instance (per-endpoint isolation). If one endpoint fails, others continue working.

---

## 3. Static Config Extraction

### Purpose
Hardcoded data scattered across components becomes typed, centralized, lazily-imported config files. This eliminates magic strings, makes data reusable across components, and provides typed fallbacks for the circuit breaker.

### Implementation

#### `lib/config/skills.ts`
```typescript
export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'systems' | 'ai' | 'hardware' | 'tools';
}

export const SKILLS: Skill[] = [
  { name: 'ROS2', category: 'systems' },
  { name: 'Sensor Fusion', category: 'systems' },
  { name: 'LiDAR Arrays', category: 'hardware' },
  { name: 'Computer Vision', category: 'ai' },
  { name: 'Next.js', category: 'frontend' },
  // ... all skills from current page.js, project.html, about.html
];

export const SKILLS_BY_CATEGORY = groupBy(SKILLS, 'category');
```

#### `lib/config/projects.ts`
```typescript
export interface Project {
  title: string;
  description: string;
  skills: string[];
  githubUrl?: string;
  liveUrl?: string;
  thumbnail?: string;
}

export const PROJECTS: Project[] = [
  // All projects from project.html and project/page.js
];

export const FALLBACK_PROJECTS: Project[] = PROJECTS.slice(0, 4);
// Used when circuit breaker returns fallback
```

#### `lib/config/locations.ts`
```typescript
export interface Location {
  city: string;
  lat: number;
  lon: number;
  label: string;
  type: 'education' | 'work' | 'project';
}

export const LOCATIONS: Location[] = [
  { city: 'Kingston, ON', lat: 44.2312, lon: -76.4860, label: "Queen's University", type: 'education' },
  // Additional locations as needed
];
```

#### `lib/config/constants.ts`
```typescript
export const GC = {
  HISTORY_MAX_POINTS: 30,
  GC_INTERVAL_MS: 600_000,        // 10 min
  STALE_THRESHOLD_MS: 3_600_000,  // 1 hour
} as const;

export const CACHE = {
  GITHUB_PROFILE_TTL_MS: 1_800_000,     // 30 min
  GITHUB_REPOS_TTL_MS: 600_000,          // 10 min
  GITHUB_CONTRIBUTIONS_TTL_MS: 1_800_000,
} as const;
```

### Components Modified
- `page.js` — skill tags reference `SKILLS` instead of inline text
- `app/project/page.js` — project cards load from `PROJECTS`
- All GitHub components — fallback data from config when API unavailable

---

## 4. Memory GC Discipline

### Purpose
Prevent unbounded array growth in components that accumulate state over time. Apply WorldMonitor's hard caps: 30-point history, 10-minute GC sweep, 1-hour staleness cutoff.

### Implementation: `lib/hooks/useBoundedHistory.js`

```typescript
function useBoundedHistory(maxPoints = 30, gcIntervalMs = 600000) {
  const history = useRef([]);

  // Auto-GC sweep every gcIntervalMs
  useEffect(() => {
    const interval = setInterval(() => {
      const cutoff = Date.now() - STALE_THRESHOLD_MS;
      history.current = history.current.filter(
        entry => entry.timestamp > cutoff
      ).slice(-maxPoints);
    }, gcIntervalMs);
    return () => clearInterval(interval);
  }, [maxPoints, gcIntervalMs]);

  const push = useCallback((entry) => {
    history.current = [
      ...history.current.slice(-(maxPoints - 1)),
      { ...entry, timestamp: Date.now() },
    ];
  }, [maxPoints]);

  return { history, push };
}
```

### Components Modified
- **`PerformanceHUD.jsx`** — FPS history array uses bounded history instead of unbounded push
- **`MiniMDSimulation.jsx`** — particle energy/position history uses bounded history
- All **GitHub components** — cached response maps get periodic stale-entry cleanup

---

## 5. Dual Renderer Fallback + WebGL Detection

### Purpose
Components that use heavy WebGL (R3F) degrade gracefully on mobile or when the GPU is a software renderer (SwiftShader, llvmpipe). WorldMonitor's approach: detect the renderer capability, then choose a lighter rendering path.

### Implementation: `lib/utils/webgl-detect.ts`

```typescript
export type WebGLTier = 'hardware' | 'software' | 'none';

export function detectWebGLTier(): WebGLTier {
  if (typeof window === 'undefined') return 'none';
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) return 'none';

  const ext = gl.getExtension('WEBGL_debug_renderer_info');
  if (!ext) return 'hardware'; // Can't detect, assume hardware

  const renderer = (gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '').toLowerCase();
  const softwareRenderers = ['swiftshader', 'llvmpipe', 'softpipe', 'software rasterizer'];
  return softwareRenderers.some(s => renderer.includes(s)) ? 'software' : 'hardware';
}
```

### `PerformanceManager.jsx` Extension

Add a `renderTier` to the existing performance context:

```typescript
type RenderTier = 'ultra' | 'high' | 'low' | 'economy';
// ultra:  desktop + hardware WebGL       → full detail, all effects
// high:   desktop + WebGL (unknown)      → standard detail
// low:    mobile or software WebGL       → fallback DOM/CSS renderers
// economy: low-end mobile or battery     → minimal everything
```

### Component Fallback Table

| Component | `ultra/high` | `low` | `economy` |
|---|---|---|---|
| `SolarSystemBackground` | Full R3F, 8000 stars, 2500 asteroids | R3F, 2000 stars, 400 asteroids | CSS gradient sky + static dots |
| `ParticleBackground` | R3F Points, 2000 particles | R3F Points, 400 particles | CSS animated dots (no WebGL) |
| `BlackHoleCursor` | Custom shader material | Reduced shader complexity | CSS radial gradient follower |
| `HeroModel` | Full R3F with Float animation | R3F, no Float, lower poly | Static image / removed |
| `AutonomousCar` | Full R3F with shadows | R3F, no shadows, lower poly | Static SVG representation |
| `EmbeddedController` | Full R3F | R3F, lower poly | Static image |
| `MiniMDSimulation` | Full 300-particle sim | 100-particle sim | DOM-based particle display |

**Note:** The `low` tier replacements are already partially implemented (e.g., `isLowSpec` reduces particle counts). We formalize the tier system and add `economy` tier with DOM-only fallbacks.

### Files Modified
- `components/PerformanceManager.jsx` — add `renderTier` to context
- `components/SolarSystemBackground.jsx` — tier-based rendering paths
- `components/ParticleBackground.jsx` — tier-based particle counts + DOM fallback
- `components/BlackHoleCursor.jsx` — tier-based shader complexity
- `components/HeroModel.jsx` — tier-based quality
- `components/AutonomousCar.jsx` — tier-based quality
- `components/EmbeddedController.jsx` — tier-based quality
- `components/MiniMDSimulation.jsx` — tier-based particle count

---

## 6. RAF-Scheduled + Input-Sensitive Rendering

### Purpose
R3F `useFrame` callbacks run every animation frame (60fps) even when the user is scrolling, clicking, or typing. This competes with the browser's main thread and causes jank. Input-sensitive rendering checks if input is pending and yields.

### Implementation: `lib/hooks/useRAF.js`

```typescript
function useRAF(callback, { priority = 'normal', budgetMs = 8 } = {}) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let rafId;
    let lastTime = performance.now();

    function loop(time) {
      rafId = requestAnimationFrame(loop);
      const delta = time - lastTime;
      lastTime = time;

      // Check if user is interacting — yield if so
      if (navigator.scheduling?.isInputPending?.({ includeContinuous: true })) {
        return; // Skip this frame, input gets priority
      }

      const start = performance.now();
      callbackRef.current({ time, delta });
      const elapsed = performance.now() - start;

      // If we exceeded budget, skip next frame's heavy work
      if (elapsed > budgetMs) {
        // mark overshoot
      }
    }

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [budgetMs]);
}
```

### Implementation: `lib/hooks/useRenderBudget.js`

```typescript
function useRenderBudget(maxMsPerFrame = 8) {
  const budget = useRef({ frameStart: 0, used: 0, overBudget: false });

  const startFrame = useCallback(() => {
    budget.current.frameStart = performance.now();
    budget.current.used = 0;
    budget.current.overBudget = false;
  }, []);

  const consume = useCallback((amount) => {
    budget.current.used += amount;
    if (budget.current.used > maxMsPerFrame) {
      budget.current.overBudget = true;
    }
    return budget.current.overBudget;
  }, [maxMsPerFrame]);

  return { startFrame, consume, isOverBudget: () => budget.current.overBudget };
}
```

### Components Modified
- `MiniMDSimulation.jsx` — per-frame particle compute wrapped in budget check
- `AutonomousCar.jsx` — animation loop yields when over budget
- `HeroModel.jsx` — rotation animation yields
- `ParticleBackground.jsx` — particle motion yields
- `SkillConstellation.jsx` — orbital animation yields

---

## 7. Welford Online Algorithm

### Purpose
Compute running mean, variance, and standard deviation without storing the entire dataset. Three numbers tracked: `count`, `mean`, `M2` (sum of squared differences). Enables Z-score anomaly detection for FPS trends and simulation statistics.

### Implementation: `lib/utils/welford.ts`

```typescript
export class WelfordRunningStats {
  count = 0;
  mean = 0;
  private m2 = 0;  // sum of squared differences

  update(value: number): void {
    this.count++;
    const delta = value - this.mean;
    this.mean += delta / this.count;
    const delta2 = value - this.mean;
    this.m2 += delta * delta2;
  }

  get variance(): number {
    return this.count > 1 ? this.m2 / (this.count - 1) : 0;
  }

  get stddev(): number {
    return Math.sqrt(this.variance);
  }

  zScore(value: number): number {
    const sd = this.stddev;
    return sd === 0 ? 0 : (value - this.mean) / sd;
  }
}
```

### Components Modified

**PerformanceHUD.jsx:**
```typescript
const fpsStats = useRef(new WelfordRunningStats());

// Each frame:
fpsStats.current.update(currentFps);
const z = fpsStats.current.zScore(currentFps);
if (z < -2) {
  // FPS anomaly — flash warning indicator
}
// Display: mean FPS, current Z-score
```

**MiniMDSimulation.jsx:**
- Track mean kinetic energy of particles over time
- Track mean computational throughput (steps per frame)
- Display Z-score deviation from running baseline

The Welford stats are displayed in the existing HUD elements — no new visual surface.

---

## 8. WebGL Globe Component

### Purpose
A new interactive 3D globe component showing the user's global footprint. This is the only visible addition — it fits the portfolio's existing spatial engineering / WebGL theme without replacing any current content.

### Technical Approach

**Stack:** Pure Three.js + R3F (no Deck.gl dependency needed)

**Rendering:**
- `SphereGeometry` with a procedural wireframe or low-poly faceted look (matches the existing tech aesthetic)
- No external texture maps needed — use vertex coloring or shader material for the globe surface
- Pin markers at coordinate locations from `src/config/locations.ts`
- Arc lines (QuadraticBezierCurve3) connecting locations

**Interaction:**
- Auto-rotate slowly when idle
- Drag to rotate (same as `SolarSystemBackground`)
- Hover over pin → show label popup (`Html` from drei)
- Click on pin → navigate to relevant section or external link

**Integration Options (TBD during implementation):**
1. **Hero background** — behind the existing hero content, subtle depth layer
2. **Dedicated "Global Footprint" section** — new homepage section below the existing 3D showroom
3. **Floating panel** — smaller globe in a glass card alongside other content

**Performance:**
- Uses `useRenderBudget` and respects `renderTier` from PerformanceManager
- `ultra`: full globe with arcs, pins, rotation, atmosphere glow
- `high`: globe with pins, no arcs, simplified geometry
- `low/economy`: hidden (no WebGL globe on mobile)

---

## 9. Implementation Order

The work is partitioned into independent batches to allow parallel execution:

### Batch 1: Foundation (no component changes)
1. Create `src/utils/circuit-breaker.ts`
2. Create `src/utils/backoff.ts`
3. Create `src/utils/welford.ts`
4. Create `src/utils/webgl-detect.ts`
5. Create `src/config/skills.ts`
6. Create `src/config/projects.ts`
7. Create `src/config/locations.ts`
8. Create `src/config/constants.ts`
9. Create `src/hooks/useBoundedHistory.js`
10. Create `src/hooks/useRAF.js`
11. Create `src/hooks/useRenderBudget.js`

### Batch 2: Component Upgrades (parallel)
12. Circuit breaker integration into all GitHub components
13. Static config integration (skills, projects)
14. Memory GC (`useBoundedHistory`) in PerformanceHUD, MiniMDSimulation, GitHub caches
15. Extend `PerformanceManager.jsx` with `renderTier`
16. Dual renderer fallbacks in SolarSystemBackground, ParticleBackground, BlackHoleCursor
17. RAF/input-sensitive scheduling in MiniMDSimulation, AutonomousCar, HeroModel, ParticleBackground
18. Welford stats in PerformanceHUD + MiniMDSimulation
19. WebGL globe component

### Batch 3: Polish
20. Test on mobile + low-end devices
21. Validate circuit breaker with offline simulation
22. Test memory GC with long sessions

---

## Constraints

1. **No visual/content changes** to existing sections unless user explicitly approves
2. **No new dependencies** beyond what's already in `package.json` (Three.js, R3F, etc.)
3. **All new utilities are framework-agnostic** — can be used outside React if needed
4. **Backward compatible** — existing behavior unchanged when circuit breaker/fallback data isn't available
5. **AGENTS.md rule**: Read Next.js 16 docs before modifying framework files

## Exit Criteria

- [ ] All GitHub components serve fallback data when API is unreachable (verified by mocking offline)
- [ ] Portfolio loads and runs smoothly on a mid-range Android phone with no WebGL crashes
- [ ] FPS history in PerformanceHUD shows bounded growth (max 30 entries) over a 30-minute session
- [ ] MiniMDSimulation runs at 60fps during scroll (verified with PerformanceHUD)
- [ ] All configs are typed and successfully compile with `next build`
- [ ] WebGL globe renders on desktop, hidden on mobile
- [ ] Circuit breaker recovers automatically after API comes back online

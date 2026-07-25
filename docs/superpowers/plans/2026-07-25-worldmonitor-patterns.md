# WorldMonitor-Inspired Patterns Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the portfolio's engineering internals with circuit breaker resilience, memory GC discipline, dual renderer fallbacks, RAF scheduling, Welford statistics, and a WebGL globe — without changing any visual content.

**Architecture:** Pure utility files (framework-agnostic TypeScript) feed into React hooks that wrap existing components. Config files centralize hardcoded data. PerformanceManager gets a new `renderTier` axis that components consume to select WebGL or fallback rendering paths.

**Tech Stack:** Next.js 16, React 19, Three.js 0.183, R3F 9.5, @react-three/drei 10.7

## Global Constraints

- No visual/content changes to existing sections
- No new npm dependencies beyond what's already in `package.json`
- All new utilities must be framework-agnostic (zero React dependency)
- `@/*` path alias maps to root level (see `jsconfig.json`)
- Read Next.js 16 docs in `node_modules/next/dist/docs/` before modifying framework files
- AGENTS.md rule: This is not the Next.js you know — APIs may differ from training data

---

## Task 1: Utility — Circuit Breaker

**Files:**
- Create: `lib/utils/circuit-breaker.ts`
- Create: `lib/utils/backoff.ts`

**Interfaces:**
- Consumes: nothing (foundation utility)
- Produces: `CircuitBreaker<T>` class, `computeDelay()` function

- [ ] **Step 1: Create `lib/utils/backoff.ts`**

```typescript
/**
 * Exponential backoff with configurable jitter.
 * Attempt 0: ~baseMs ±jitter%, Attempt 1: ~baseMs*2 ±jitter%, etc.
 * Capped at maxMs to prevent infinite growth.
 */
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
```

- [ ] **Step 2: Create `lib/utils/circuit-breaker.ts`**

```typescript
type BreakerState = 'normal' | 'open' | 'half-open';

interface BreakerOptions<T> {
  name: string;
  maxFailures?: number;
  cooldownMs?: number;
  cacheTtlMs?: number;
  fallbackValue?: T | null;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export class CircuitBreaker<T> {
  private state: BreakerState = 'normal';
  private failureCount = 0;
  private lastFailureTime = 0;
  private cache: CacheEntry<T> | null = null;
  private readonly name: string;
  private readonly maxFailures: number;
  private readonly cooldownMs: number;
  private readonly cacheTtlMs: number;
  private readonly fallbackValue: T | null;

  constructor(options: BreakerOptions<T>) {
    this.name = options.name;
    this.maxFailures = options.maxFailures ?? 3;
    this.cooldownMs = options.cooldownMs ?? 300_000;
    this.cacheTtlMs = options.cacheTtlMs ?? 1_800_000;
    this.fallbackValue = options.fallbackValue ?? null;
  }

  private isCacheFresh(): boolean {
    if (!this.cache) return false;
    return (Date.now() - this.cache.timestamp) < this.cacheTtlMs;
  }

  private isCooldownExpired(): boolean {
    return (Date.now() - this.lastFailureTime) >= this.cooldownMs;
  }

  /** Execute a fetch through the breaker. Returns data or fallback. */
  async execute(
    fetchFn: () => Promise<T>,
    onCache?: (data: T) => void
  ): Promise<T | null> {
    // If open and cooldown hasn't expired, serve cache
    if (this.state === 'open' && !this.isCooldownExpired()) {
      if (this.cache && this.isCacheFresh()) {
        onCache?.(this.cache.data);
        return this.cache.data;
      }
      if (this.fallbackValue !== null && this.cache) {
        onCache?.(this.cache.data);
        return this.cache.data;
      }
      return this.fallbackValue;
    }

    // Half-open or cooldown expired — try a probe
    if (this.state === 'open') {
      this.state = 'half-open';
    }

    try {
      const data = await fetchFn();
      this.cache = { data, timestamp: Date.now() };
      this.state = 'normal';
      this.failureCount = 0;
      return data;
    } catch (err) {
      this.failureCount++;
      this.lastFailureTime = Date.now();
      if (this.failureCount >= this.maxFailures) {
        this.state = 'open';
      }
      // Serve stale cache if available
      if (this.cache) {
        onCache?.(this.cache.data);
        return this.cache.data;
      }
      return this.fallbackValue;
    }
  }

  getState(): BreakerState { return this.state; }
  getName(): string { return this.name; }
  clearCache(): void { this.cache = null; }
  reset(): void {
    this.state = 'normal';
    this.failureCount = 0;
  }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx next build` (or `npx tsc --noEmit`)
Expected: No errors from the new files

- [ ] **Step 4: Commit**

```bash
git add lib/utils/circuit-breaker.ts lib/utils/backoff.ts
git commit -m "feat: add circuit breaker and exponential backoff utilities"
```

---

## Task 2: Utility — Welford Online Algorithm

**Files:**
- Create: `lib/utils/welford.ts`

**Interfaces:**
- Consumes: nothing (foundation utility)
- Produces: `WelfordRunningStats` class with `update()`, `variance`, `stddev`, `zScore()`

- [ ] **Step 1: Create `lib/utils/welford.ts`**

```typescript
/**
 * Welford's online algorithm for streaming mean and variance.
 * Tracks only 3 numbers (count, mean, M2) — no array storage needed.
 * Numerically stable, single-pass, O(1) memory.
 */
export class WelfordRunningStats {
  count = 0;
  mean = 0;
  private m2 = 0;

  /** Feed a new observation into the running statistics. */
  update(value: number): void {
    this.count++;
    const delta = value - this.mean;
    this.mean += delta / this.count;
    const delta2 = value - this.mean;
    this.m2 += delta * delta2;
  }

  /** Sample variance (uses Bessel's correction: divide by n-1). */
  get variance(): number {
    return this.count > 1 ? this.m2 / (this.count - 1) : 0;
  }

  /** Sample standard deviation. */
  get stddev(): number {
    return Math.sqrt(this.variance);
  }

  /** Z-score: how many standard deviations from the running mean. */
  zScore(value: number): number {
    const sd = this.stddev;
    return sd === 0 ? 0 : (value - this.mean) / sd;
  }

  /** Reset all statistics back to initial state. */
  reset(): void {
    this.count = 0;
    this.mean = 0;
    this.m2 = 0;
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx next build`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add lib/utils/welford.ts
git commit -m "feat: add Welford online streaming statistics algorithm"
```

---

## Task 3: Utility — WebGL Detection

**Files:**
- Create: `lib/utils/webgl-detect.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `WebGLTier` type, `detectWebGLTier()` function, `getWebGLRenderer()` function

- [ ] **Step 1: Create `lib/utils/webgl-detect.ts`**

```typescript
export type WebGLTier = 'hardware' | 'software' | 'none';

interface WebGLInfo {
  tier: WebGLTier;
  renderer: string;
  vendor: string;
  maxTextureSize: number;
}

/** Detect the WebGL renderer and classify it as hardware, software, or none. */
export function detectWebGLTier(): WebGLTier {
  if (typeof window === 'undefined') return 'none';

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) return 'none';

  const ext = gl.getExtension('WEBGL_debug_renderer_info');
  if (!ext) return 'hardware'; // Can't detect — assume hardware

  const renderer = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? '').toLowerCase();
  const softwareRenderers = ['swiftshader', 'llvmpipe', 'softpipe', 'software rasterizer', 'mesa'];
  return softwareRenderers.some(s => renderer.includes(s)) ? 'software' : 'hardware';
}

/** Get full WebGL info for debugging. */
export function getWebGLInfo(): WebGLInfo {
  if (typeof window === 'undefined') {
    return { tier: 'none', renderer: '', vendor: '', maxTextureSize: 0 };
  }

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) {
    return { tier: 'none', renderer: '', vendor: '', maxTextureSize: 0 };
  }

  const ext = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = ext
    ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? '')
    : 'unknown';
  const vendor = ext
    ? String(gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) ?? '')
    : 'unknown';
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

  return {
    tier: detectWebGLTier(),
    renderer,
    vendor,
    maxTextureSize,
  };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx next build`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add lib/utils/webgl-detect.ts
git commit -m "feat: add WebGL renderer detection utility"
```

---

## Task 4: Config Files

**Files:**
- Create: `lib/config/skills.ts`
- Create: `lib/config/projects.ts`
- Create: `lib/config/locations.ts`
- Create: `lib/config/constants.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `SKILLS`, `PROJECTS`, `LOCATIONS`, `GC`, `CACHE` typed constants

- [ ] **Step 1: Create `lib/config/constants.ts`**

```typescript
export const GC = {
  /** Maximum number of history points to retain. */
  HISTORY_MAX_POINTS: 30,
  /** Interval in ms for garbage collection sweep. */
  GC_INTERVAL_MS: 600_000,        // 10 minutes
  /** Age in ms after which an entry is considered stale. */
  STALE_THRESHOLD_MS: 3_600_000,  // 1 hour
} as const;

export const CACHE = {
  GITHUB_PROFILE_TTL_MS: 1_800_000,      // 30 min
  GITHUB_REPOS_TTL_MS: 600_000,           // 10 min
  GITHUB_CONTRIBUTIONS_TTL_MS: 1_800_000, // 30 min
  GITHUB_STARS_TTL_MS: 1_800_000,         // 30 min
} as const;
```

- [ ] **Step 2: Create `lib/config/skills.ts`**

Extract all skill tags from `app/page.js` (the `skill-tag` divs in each showroom section) and `app/project/page.js` into a typed array.

```typescript
export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'systems' | 'ai' | 'hardware' | 'tools';
}

export const SKILLS: Skill[] = [
  // Systems & Autonomy
  { name: 'ROS2', category: 'systems' },
  { name: 'Sensor Fusion', category: 'systems' },
  { name: 'LiDAR Arrays', category: 'hardware' },
  { name: 'Computer Vision', category: 'ai' },
  // Embedded
  { name: 'IoT Devices', category: 'hardware' },
  { name: 'ESP32', category: 'hardware' },
  { name: 'Microcontrollers', category: 'hardware' },
  { name: 'C++ Firmware', category: 'systems' },
  // HPC
  { name: 'HPC / MPI', category: 'systems' },
  { name: 'Computational Math', category: 'ai' },
  { name: 'PID Hardware Control', category: 'systems' },
  { name: 'Lennard-Jones', category: 'ai' },
  // Frontend
  { name: 'Next.js 16', category: 'frontend' },
  { name: 'React 19', category: 'frontend' },
  { name: 'Three.js', category: 'frontend' },
  { name: 'WebGL', category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  // Backend
  { name: 'GraphQL API', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'Redis', category: 'backend' },
  // Tools
  { name: 'Docker', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'Linux', category: 'tools' },
  { name: 'CI/CD', category: 'tools' },
];

export const SKILLS_BY_CATEGORY: Record<string, Skill[]> = {};
for (const skill of SKILLS) {
  (SKILLS_BY_CATEGORY[skill.category] ??= []).push(skill);
}
```

- [ ] **Step 3: Create `lib/config/locations.ts`**

```typescript
export interface Location {
  city: string;
  lat: number;
  lon: number;
  label: string;
  type: 'education' | 'work' | 'project';
}

/** Personal geographic locations for the WebGL globe. */
export const LOCATIONS: Location[] = [
  { city: 'Kingston, ON', lat: 44.2312, lon: -76.4860, label: "Queen's University", type: 'education' },
  // Add any additional locations (work, internships, etc.) here
];
```

- [ ] **Step 4: Create `lib/config/projects.ts`**

Read `app/project/page.js` lines 9-381 to get the 48 project entries. Extract each entry's `title`, `date`, `desc`, `skills`, and `link` fields into the typed config:

```typescript
export interface Project {
  title: string;
  date: string;
  description: string;
  skills: string[];
  githubUrl?: string;
}

/**
 * All projects keyed by title for direct lookup.
 * Data extracted from app/project/page.js (48 entries).
 * Example entry shown — repeat for all projects with actual values.
 */
export const PROJECTS: Record<string, Project> = {
  "G.O.S. Phytotron Sensor Node & AI Engine": {
    title: "G.O.S. Phytotron Sensor Node & AI Engine",
    date: "Jan 2026 - Present",
    description: "End-to-end development of an ultra-low-power IoT monitoring system...",
    skills: ["Embedded C/C++", "Python", "Zephyr RTOS", "KiCad", "nRF52840 SoC", "Thread Mesh", "PCB Design", "IoT"],
    githubUrl: "https://github.com/johnnietse/strawberry-farm"
  },
  "HPC Energy Optimization & DVFS Control System": {
    title: "HPC Energy Optimization & DVFS Control System",
    date: "Sep 2025 - Mar 20, 2026",
    description: "Dynamic frequency scaling system for miniMD reducing energy consumption...",
    skills: ["C++", "Python", "MPI", "HPC", "Intel RAPL", "DVFS Control", "Beta-Adaptation", "Race-to-Idle"],
    githubUrl: "https://github.com/johnnietse/elec-498-group-30-2025-2026-proxy-app"
  },
  // ... include ALL project entries from app/project/page.js lines 9-381
  "High-Fidelity Engineering Portfolio (v2)": {
    title: "High-Fidelity Engineering Portfolio (v2)",
    date: "Mar 26, 2026 - Present",
    description: "The very site you are viewing...",
    skills: ["Next.js 16", "React 19", "Three.js", "WebGL", "GraphQL API", "Framer Motion", "Tailwind CSS"],
    githubUrl: "https://github.com/johnnietse/personal-portfolio-website"
  },
};

/** Flat array of all projects for iteration. */
export const PROJECT_LIST: Project[] = Object.values(PROJECTS);

/** First 4 projects with GitHub URLs — used as API fallback. */
export const FALLBACK_PROJECTS: Project[] = PROJECT_LIST.filter(p => p.githubUrl).slice(0, 4);
```

The implementation agent must:
1. Read `app/project/page.js`
2. Copy all 48 project entries into `PROJECTS` using the exact field values from the source
3. The `link` field in the source maps to `githubUrl` in the config

- [ ] **Step 5: Verify TypeScript compiles**

Run: `npx next build`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add lib/config/
git commit -m "feat: add typed config files for skills, projects, locations, constants"
```

---

## Task 5: React Hooks

**Files:**
- Create: `lib/hooks/useBoundedHistory.js`
- Create: `lib/hooks/useRAF.js`
- Create: `lib/hooks/useRenderBudget.js`

**Interfaces:**
- Consumes: `GC` constants from `lib/config/constants.ts`
- Produces: `useBoundedHistory(maxPoints, gcIntervalMs)`, `useRAF(callback, options)`, `useRenderBudget(maxMsPerFrame)`

- [ ] **Step 1: Create `lib/hooks/useBoundedHistory.js`**

```javascript
'use client';

import { useRef, useEffect, useCallback } from 'react';
import { GC } from '@/lib/config/constants';

/**
 * Bounded array with automatic GC sweep.
 * Oldest entries beyond maxPoints are dropped.
 * Entries older than STALE_THRESHOLD are swept periodically.
 */
export function useBoundedHistory(maxPoints = GC.HISTORY_MAX_POINTS, gcIntervalMs = GC.GC_INTERVAL_MS) {
  const historyRef = useRef([]);

  // Periodic GC sweep
  useEffect(() => {
    const interval = setInterval(() => {
      const cutoff = Date.now() - GC.STALE_THRESHOLD_MS;
      historyRef.current = historyRef.current
        .filter(entry => entry.timestamp > cutoff)
        .slice(-maxPoints);
    }, gcIntervalMs);
    return () => clearInterval(interval);
  }, [maxPoints, gcIntervalMs]);

  const push = useCallback((entry) => {
    historyRef.current = [
      ...historyRef.current.slice(-(maxPoints - 1)),
      { ...entry, timestamp: Date.now() },
    ];
  }, [maxPoints]);

  const clear = useCallback(() => {
    historyRef.current = [];
  }, []);

  return { history: historyRef, push, clear };
}
```

- [ ] **Step 2: Create `lib/hooks/useRAF.js`**

```javascript
'use client';

import { useRef, useEffect } from 'react';

/**
 * RAF loop that respects user input.
 * If the browser reports pending input, the callback is skipped for that frame.
 * @param {function} callback - receives { time, delta }
 * @param {object} options
 * @param {number} options.budgetMs - max ms per frame before yielding (default 8)
 */
export function useRAF(callback, { budgetMs = 8 } = {}) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let rafId;
    let lastTime = performance.now();

    function loop(time) {
      rafId = requestAnimationFrame(loop);
      const delta = time - lastTime;
      lastTime = time;

      // Yield if user is interacting (scroll, click, type)
      if (typeof navigator.scheduling?.isInputPending === 'function') {
        if (navigator.scheduling.isInputPending({ includeContinuous: true })) {
          return;
        }
      }

      const start = performance.now();
      callbackRef.current({ time, delta });
      const elapsed = performance.now() - start;

      if (elapsed > budgetMs) {
        // Over budget — next frame will be lighter automatically
        // since we're not accumulating work
      }
    }

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [budgetMs]);
}
```

- [ ] **Step 3: Create `lib/hooks/useRenderBudget.js`**

```javascript
'use client';

import { useRef, useCallback } from 'react';

/**
 * Per-frame time budget tracker.
 * Call startFrame() at the beginning, consume(amount) during work.
 * If budget is exceeded, isOverBudget() returns true.
 */
export function useRenderBudget(maxMsPerFrame = 8) {
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

  const isOverBudget = useCallback(() => {
    return budget.current.overBudget;
  }, []);

  return { startFrame, consume, isOverBudget };
}
```

- [ ] **Step 4: Verify no build errors**

Run: `npx next build`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add lib/hooks/
git commit -m "feat: add useBoundedHistory, useRAF, useRenderBudget hooks"
```

---

## Task 6: GitHub API Circuit Breaker Integration

**Files:**
- Modify: `components/GitHubStats.jsx`
- Modify: `components/LiveGithubProjects.jsx`
- Modify: `components/GithubProfileHeader.jsx`
- Modify: `components/GithubContributionGrid.jsx`
- Modify: `components/GithubTopRepos.jsx`
- Modify: `components/GithubInterestStreams.jsx`

**Interfaces:**
- Consumes: `CircuitBreaker` from `lib/utils/circuit-breaker.ts`, `CACHE` from `lib/config/constants.ts`

- [ ] **Step 1: Read each GitHub component to understand its fetch pattern**

Read each file listed above to find the `fetch()` or API call pattern.

- [ ] **Step 2: Add breaker to `GitHubStats.jsx`**

Wrap the GitHub API fetch with a circuit breaker. Example pattern:

```javascript
import { CircuitBreaker } from '@/lib/utils/circuit-breaker';
import { CACHE } from '@/lib/config/constants';

const statsBreaker = new CircuitBreaker({
  name: 'GitHub Stats',
  maxFailures: 3,
  cooldownMs: 300_000,
  cacheTtlMs: CACHE.GITHUB_PROFILE_TTL_MS,
  fallbackValue: null,
});

// Inside the component, replace direct fetch:
// const res = await fetch(url) → 
const data = await statsBreaker.execute(
  () => fetch(url).then(r => r.json()),
  (cached) => setStats(cached)
);
```

Apply the same pattern to each GitHub component, using a per-endpoint breaker instance. The breaker instances are module-scoped (outside the component) so they persist across renders.

- [ ] **Step 3: Verify the app still loads and GitHub sections render**

Run: `npm run dev`
Expected: All GitHub sections load normally

- [ ] **Step 4: Commit**

```bash
git add components/GitHubStats.jsx components/LiveGithubProjects.jsx components/GithubProfileHeader.jsx components/GithubContributionGrid.jsx components/GithubTopRepos.jsx components/GithubInterestStreams.jsx
git commit -m "feat: add circuit breaker resilience to all GitHub API components"
```

---

## Task 7: Static Config Integration

**Files:**
- Modify: `app/page.js`
- Modify: `app/project/page.js`

**Interfaces:**
- Consumes: `SKILLS` from `lib/config/skills.ts`, `PROJECTS` from `lib/config/projects.ts`

- [ ] **Step 1: Update `app/page.js` to use config skills**

Replace inline skill tags in the showroom sections with references from `SKILLS_BY_CATEGORY`.

For each showroom section (autonomous car, embedded controller, miniMD), the `skills-grid` divs currently have hardcoded skill-tag divs. Replace with a loop over the relevant subset of `SKILLS`.

```javascript
import { SKILLS_BY_CATEGORY } from '@/lib/config/skills';

// In the Autonomous Car section:
<div className="skills-grid">
  {SKILLS_BY_CATEGORY.systems?.slice(0, 4).map(skill => (
    <div className="skill-tag" key={skill.name}>{skill.name}</div>
  ))}
</div>
```

*Note: Map the specific skills per section to match the current inline content exactly.*

- [ ] **Step 2: Update `app/project/page.js` to use config projects**

Replace inline project card data with mapping over `PROJECTS`.

```javascript
import { PROJECTS } from '@/lib/config/projects';

// Replace inline project entries with:
{PROJECTS.map((project, i) => (
  <div className="glass-card" key={i}>
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <div className="skills-grid">
      {project.skills.map(skill => (
        <div className="skill-tag" key={skill}>{skill}</div>
      ))}
    </div>
  </div>
))}
```

- [ ] **Step 3: Verify the rendered output matches the current site exactly**

Run: `npm run dev` and visually compare each section
Expected: Same text, same order, same visual output

- [ ] **Step 4: Commit**

```bash
git add app/page.js app/project/page.js
git commit -m "refactor: extract hardcoded skills and projects into typed config files"
```

---

## Task 8: PerformanceManager RenderTier Extension

**Files:**
- Modify: `components/PerformanceManager.jsx`

**Interfaces:**
- Consumes: `detectWebGLTier()` from `lib/utils/webgl-detect.ts`
- Produces: `renderTier` in the performance context (`'ultra' | 'high' | 'low' | 'economy'`)

- [ ] **Step 1: Read current `PerformanceManager.jsx` to understand the existing context shape**

- [ ] **Step 2: Integrate WebGL detection into the performance context**

Add a `renderTier` field to the performance context. The mapping logic:

```javascript
import { detectWebGLTier } from '@/lib/utils/webgl-detect';

function computeRenderTier(isLowSpec, isMobile) {
  if (isMobile && isLowSpec) return 'economy';
  if (isMobile) return 'low';

  const webglTier = detectWebGLTier();
  if (webglTier === 'none') return 'low';
  if (webglTier === 'software') return 'low';
  if (isLowSpec) return 'high';

  return 'ultra';
}
```

Add `renderTier` to the context value and the `usePerformance` return type.

- [ ] **Step 3: Verify build**

Run: `npx next build`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add components/PerformanceManager.jsx
git commit -m "feat: add renderTier to PerformanceManager with WebGL detection"
```

---

## Task 9: Dual Renderer Fallbacks (Background Components)

**Files:**
- Modify: `components/SolarSystemBackground.jsx`
- Modify: `components/ParticleBackground.jsx`
- Modify: `components/BlackHoleCursor.jsx`

**Interfaces:**
- Consumes: `renderTier` from `PerformanceManager` via `usePerformance()`

- [ ] **Step 1: Read each component's current code**

- [ ] **Step 2: Update `SolarSystemBackground.jsx`**

Add a CSS-only fallback for `low` and `economy` tiers. For `economy`, render a static gradient sky instead of the full R3F canvas.

```javascript
const { renderTier } = usePerformance();

if (renderTier === 'economy') {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
      background: 'radial-gradient(ellipse at center, #0f172a 0%, #020617 100%)',
      pointerEvents: 'none',
    }} />
  );
}
```

For `low` tier: reduce `Stars` count to 2000 (from 8000), reduce `AsteroidBelt` count to 400 (from 2500), disable Float animation. These reductions already partially exist with the `lowSpec` variable — tie it to `renderTier === 'low' || renderTier === 'economy'` consistently.

- [ ] **Step 3: Update `ParticleBackground.jsx`**

Add a CSS animation fallback for `economy` tier:

```javascript
if (renderTier === 'economy') {
  // Render a lightweight CSS particle animation instead of R3F
  return (
    <div className="particle-fallback" style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
      pointerEvents: 'none', overflow: 'hidden',
    }}>
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '2px', height: '2px',
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '50%',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${3 + Math.random() * 4}s infinite`,
        }} />
      ))}
    </div>
  );
}
```

For `low` tier: reduce particle count to 400 (from 2000).
For `ultra/high`: keep current behavior.

- [ ] **Step 4: Update `BlackHoleCursor.jsx`**

For `economy` and `low` tiers: replace custom shader with a simple CSS radial gradient that follows the cursor.

```javascript
if (renderTier === 'economy' || renderTier === 'low') {
  return (
    <div
      className="cursor-fallback"
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: 9999, pointerEvents: 'none',
        background: 'radial-gradient(600px circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(88,166,255,0.06) 0%, transparent 70%)',
      }}
      onMouseMove={(e) => {
        e.currentTarget.style.setProperty('--cursor-x', `${e.clientX}px`);
        e.currentTarget.style.setProperty('--cursor-y', `${e.clientY}px`);
      }}
    />
  );
}
```

- [ ] **Step 5: Verify on desktop and mobile (responsive mode)**

Run: `npm run dev`
Test: Open DevTools → Toggle device toolbar → Select a mobile device. The background components should either be simplified or show fallback renderers.

- [ ] **Step 6: Commit**

```bash
git add components/SolarSystemBackground.jsx components/ParticleBackground.jsx components/BlackHoleCursor.jsx
git commit -m "feat: add dual renderer fallbacks for background WebGL components"
```

---

## Task 10: Dual Renderer Fallbacks (Showroom Components)

**Files:**
- Modify: `components/HeroModel.jsx`
- Modify: `components/AutonomousCar.jsx`
- Modify: `components/EmbeddedController.jsx`
- Modify: `components/MiniMDSimulation.jsx`

- [ ] **Step 1: Read each component's current code**

- [ ] **Step 2: Update `HeroModel.jsx`**

For `economy` tier: render nothing (component returns null). The section already has a placeholder aspect-ratio container, so it'll show an empty space — acceptable for economy mode.

For `low` tier: Reduce geometry detail, disable `Float` animation.

```javascript
const { renderTier } = usePerformance();

// In the R3F Canvas, for low tier:
<meshStandardMaterial wireframe={renderTier === 'low'} />
```

- [ ] **Step 3: Update `AutonomousCar.jsx`**

For `economy` tier: replace with a static SVG representation of the car.

For `low` tier: disable shadows, reduce geometry segments.

- [ ] **Step 4: Update `EmbeddedController.jsx`**

For `economy` tier: return null (section is empty).
For `low` tier: lower polygon count, disable animations.

- [ ] **Step 5: Verify build and visual output**

Run: `npx next build`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add components/HeroModel.jsx components/AutonomousCar.jsx components/EmbeddedController.jsx components/MiniMDSimulation.jsx
git commit -m "feat: add render tier fallback for showroom WebGL components"
```

---

## Task 11: RAF-Scheduled Rendering

**Files:**
- Modify: `components/MiniMDSimulation.jsx`
- Modify: `components/AutonomousCar.jsx`
- Modify: `components/HeroModel.jsx`
- Modify: `components/ParticleBackground.jsx`
- Modify: `components/SkillConstellation.jsx`

**Interfaces:**
- Consumes: `useRAF` from `lib/hooks/useRAF.js`, `useRenderBudget` from `lib/hooks/useRenderBudget.js`

- [ ] **Step 1: Read each component's `useFrame` loop**

- [ ] **Step 2: Migrate `useFrame` in `MiniMDSimulation.jsx` to use render budget**

```javascript
import { useRenderBudget } from '@/lib/hooks/useRenderBudget';

function MiniMDSimulation() {
  const { startFrame, consume, isOverBudget } = useRenderBudget(6); // 6ms budget

  useFrame((state, delta) => {
    startFrame();

    // Particle compute loop (the expensive part)
    for (let i = 0; i < particles.length; i++) {
      if (isOverBudget()) break; // Stop early if over budget
      // ... compute particle forces ...
      consume(0.1); // Track cost
    }
  });
}
```

- [ ] **Step 3: Apply `useRAF` to non-R3F animations in `SkillConstellation.jsx`**

If `SkillConstellation` uses raw `requestAnimationFrame` or `setInterval` for animations, replace with the `useRAF` hook for input-sensitive yielding.

- [ ] **Step 4: Verify framerate during scroll**

Run: `npm run dev`
Test: Scroll the page while monitoring PerformanceHUD. FPS should remain stable during scroll even when 3D components are active.

- [ ] **Step 5: Commit**

```bash
git add components/MiniMDSimulation.jsx components/AutonomousCar.jsx components/HeroModel.jsx components/ParticleBackground.jsx components/SkillConstellation.jsx
git commit -m "feat: add input-sensitive RAF scheduling and render budget to animation loops"
```

---

## Task 12: Memory GC Integration

**Files:**
- Modify: `components/PerformanceHUD.jsx`
- Modify: `components/MiniMDSimulation.jsx`

**Interfaces:**
- Consumes: `useBoundedHistory` from `lib/hooks/useBoundedHistory.js`

- [ ] **Step 1: Read `PerformanceHUD.jsx` — find the FPS history array**

- [ ] **Step 2: Replace unbounded FPS array with bounded history**

```javascript
import { useBoundedHistory } from '@/lib/hooks/useBoundedHistory';

function PerformanceHUD() {
  const { history: fpsHistory, push: pushFps } = useBoundedHistory(30);

  // Each frame, instead of: fpsHistory.current.push(fps)
  // Use: pushFps({ fps, timestamp: Date.now() })
}
```

- [ ] **Step 3: Apply bounded history to `MiniMDSimulation.jsx` for particle energy tracking**

```javascript
const { history: energyHistory, push: pushEnergy } = useBoundedHistory(100);

// After each simulation step:
pushEnergy({ meanEnergy, particleCount });
```

- [ ] **Step 4: Verify memory stability over time**

Run: `npm run dev`
Test: Keep the page open for 5+ minutes. Open DevTools → Performance → Memory. Check that JS heap size doesn't grow unboundedly.

- [ ] **Step 5: Commit**

```bash
git add components/PerformanceHUD.jsx components/MiniMDSimulation.jsx
git commit -m "feat: add bounded history with GC sweep to PerformanceHUD and MiniMDSimulation"
```

---

## Task 13: Welford Statistics Integration

**Files:**
- Modify: `components/PerformanceHUD.jsx`
- Modify: `components/MiniMDSimulation.jsx`

**Interfaces:**
- Consumes: `WelfordRunningStats` from `lib/utils/welford.ts`

- [ ] **Step 1: Add Welford FPS tracking to `PerformanceHUD.jsx`**

```javascript
import { WelfordRunningStats } from '@/lib/utils/welford';

const fpsStats = new WelfordRunningStats();

// Inside the frame update:
fpsStats.update(currentFps);
const z = fpsStats.zScore(currentFps);
const mean = fpsStats.mean;
const stddev = fpsStats.stddev;

// Display in the HUD if desired (e.g., show Z-score next to FPS)
// Optionally flash a warning if Z-score drops below -2:
if (z < -2) {
  // Render a yellow/red indicator
}
```

- [ ] **Step 2: Add Welford stats to `MiniMDSimulation.jsx`**

Track mean particle kinetic energy as a running statistic.

```javascript
const energyStats = new WelfordRunningStats();

// After each simulation tick, compute mean kinetic energy:
const totalKE = particles.reduce((sum, p) => sum + p.vx ** 2 + p.vy ** 2 + p.vz ** 2, 0);
const meanKE = totalKE / particles.length;
energyStats.update(meanKE);

// Z-score tells us if current energy is anomalous:
const energyZ = energyStats.zScore(meanKE);
```

- [ ] **Step 3: Commit**

```bash
git add components/PerformanceHUD.jsx components/MiniMDSimulation.jsx
git commit -m "feat: add Welford online statistics to PerformanceHUD and MiniMDSimulation"
```

---

## Task 14: WebGL Globe Component

**Files:**
- Create: `components/GlobeFootprint.jsx`
- Modify: `app/page.js`

**Interfaces:**
- Consumes: `LOCATIONS` from `lib/config/locations.ts`, `renderTier` from `PerformanceManager`
- Produces: `<GlobeFootprint />` React component

- [ ] **Step 1: Create `components/GlobeFootprint.jsx`**

A procedural WebGL globe built with Three.js/R3F. No texture maps — uses vertex coloring and wireframe for a low-poly tech aesthetic.

```javascript
'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePerformance } from './PerformanceManager';
import { LOCATIONS } from '@/lib/config/locations';

/** Procedural wireframe globe with location pins and arc lines. */
function Globe() {
  const meshRef = useRef();
  const [hoveredPin, setHoveredPin] = useState(null);

  // Low-poly sphere with vertex coloring
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 32, 24);
    // Color vertices based on latitude (blue gradient)
    const colors = new Float32Array(geo.attributes.position.count * 3);
    for (let i = 0; i < geo.attributes.position.count; i++) {
      const y = geo.attributes.position.getY(i);
      const t = (y / 2 + 1) / 2; // 0-1 from bottom to top
      colors[i * 3] = 0.1 + t * 0.2;     // R
      colors[i * 3 + 1] = 0.2 + t * 0.3; // G
      colors[i * 3 + 2] = 0.4 + t * 0.4; // B
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1; // Slow auto-rotate
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
          <group key={loc.label}>
            {/* Pin stem */}
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

  if (!isMounted || renderTier === 'economy' || renderTier === 'low') {
    return null; // No globe on mobile or low-end devices
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

- [ ] **Step 2: Integrate into `app/page.js`**

Add the globe as a new section or enhance an existing section. A natural fit: add it after the hero section as a "Global Footprint" section, or include it in the Spatial Engineering Showroom area.

```javascript
import GlobeFootprint from '@/components/GlobeFootprint';

// Inside the showroom or as a new section:
<section className="section container">
  <h2 className="title">Global Engineering Footprint</h2>
  <GlobeFootprint />
</section>
```

- [ ] **Step 3: Verify the globe renders on desktop**

Run: `npm run dev`
Expected: Interactive 3D globe with location pins. Auto-rotates. Hover pins show labels.

- [ ] **Step 4: Verify the globe is hidden on mobile**

Test: DevTools → device toolbar → mobile device
Expected: Globe container does not render (component returns null for `low`/`economy` tiers).

- [ ] **Step 5: Commit**

```bash
git add components/GlobeFootprint.jsx app/page.js
git commit -m "feat: add WebGL globe component showing global engineering footprint"
```

---

## Task 15: Integration Verification

**Files:** (none — verification only)

- [ ] **Step 1: Run full build**

```bash
npx next build
```
Expected: No TypeScript or build errors.

- [ ] **Step 2: Test circuit breaker by going offline**

Run: `npm run dev` → Open the page → DevTools → Network → Offline
Expected: All GitHub sections show cached data or fallback content (not loading spinners or errors).

- [ ] **Step 3: Test mobile fallback**

DevTools → Device toolbar → Select a mid-range phone (e.g., Moto G4)
Expected: Background components use CSS/DOM fallbacks. Showroom components use lower detail or static fallbacks. No WebGL errors in console.

- [ ] **Step 4: Test long-session memory stability**

Keep the page open for 10 minutes. Monitor Performance tab → Memory for JS heap growth.
Expected: Heap size stabilizes (bounded history prevents unbounded growth).

- [ ] **Step 5: Verify FPS stability**

Monitor PerformanceHUD while scrolling the page.
Expected: FPS stays above 30 even during scroll with 3D components active.

- [ ] **Step 6: Commit any final fixes**

```bash
git add -A
git commit -m "chore: finalize WorldMonitor pattern integration"
```

---

## File Summary

### Created (14 files)
| File | Purpose |
|---|---|
| `lib/utils/circuit-breaker.ts` | Generic circuit breaker with stale-while-revalidate |
| `lib/utils/backoff.ts` | Exponential backoff with jitter |
| `lib/utils/welford.ts` | Welford online streaming statistics |
| `lib/utils/webgl-detect.ts` | WebGL renderer detection |
| `lib/config/constants.ts` | GC intervals, cache TTLs |
| `lib/config/skills.ts` | Typed skill definitions |
| `lib/config/projects.ts` | Typed project metadata |
| `lib/config/locations.ts` | Geo coordinates for globe |
| `lib/hooks/useBoundedHistory.js` | Bounded array with auto-GC |
| `lib/hooks/useRAF.js` | Input-sensitive RAF scheduler |
| `lib/hooks/useRenderBudget.js` | Per-frame time budget enforcement |
| `components/GlobeFootprint.jsx` | WebGL globe component |

### Modified (17 files)
| File | Change |
|---|---|
| `components/PerformanceManager.jsx` | Added `renderTier` to context |
| `components/GitHubStats.jsx` | Circuit breaker wrapping |
| `components/LiveGithubProjects.jsx` | Circuit breaker wrapping |
| `components/GithubProfileHeader.jsx` | Circuit breaker wrapping |
| `components/GithubContributionGrid.jsx` | Circuit breaker wrapping |
| `components/GithubTopRepos.jsx` | Circuit breaker wrapping |
| `components/GithubInterestStreams.jsx` | Circuit breaker wrapping |
| `components/SolarSystemBackground.jsx` | Tier-based fallback |
| `components/ParticleBackground.jsx` | Tier-based fallback |
| `components/BlackHoleCursor.jsx` | Tier-based fallback |
| `components/HeroModel.jsx` | Tier-based quality |
| `components/AutonomousCar.jsx` | Tier-based quality |
| `components/EmbeddedController.jsx` | Tier-based quality |
| `components/MiniMDSimulation.jsx` | Tier-based + Welford + RAF |
| `components/PerformanceHUD.jsx` | Welford stats + bounded history |
| `components/SkillConstellation.jsx` | RAF scheduling |
| `app/page.js` | Config references + Globe import |
| `app/project/page.js` | Config references |

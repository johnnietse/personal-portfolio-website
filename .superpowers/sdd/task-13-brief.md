## Task 13: Welford Statistics Integration

**Files:**
- Modify: `components/PerformanceHUD.jsx`
- Modify: `components/MiniMDSimulation.jsx`

**Interfaces:**
- Consumes: `WelfordRunningStats` from `@/lib/utils/welford`

### Global Constraints
- No visual changes to rendered output
- `@/*` path alias maps to root level

### What To Do

Add Welford online statistics to both components:

#### PerformanceHUD.jsx

Add a `WelfordRunningStats` instance to track FPS. Use it to compute running mean and z-score anomaly detection.

```javascript
import { WelfordRunningStats } from '@/lib/utils/welford';

// Module-scoped (persists across renders)
const fpsStats = new WelfordRunningStats();

// Inside the frame update loop:
fpsStats.update(currentFps);
const z = fpsStats.zScore(currentFps);

// Optional: display the running mean FPS alongside current FPS
// Optional: flash a warning indicator if z < -2 (FPS anomaly)
```

The component already displays FPS. Add the running mean and optionally a z-score indicator. Keep it subtle — small text additions only.

#### MiniMDSimulation.jsx

Add a `WelfordRunningStats` instance to track particle energy:

```javascript
import { WelfordRunningStats } from '@/lib/utils/welford';

const energyStats = new WelfordRunningStats();

// After simulation tick, compute mean kinetic energy:
const totalKE = particles.reduce((sum, p) => sum + p.vx ** 2 + p.vy ** 2 + p.vz ** 2, 0);
const meanKE = totalKE / particles.length;
energyStats.update(meanKE);
```

### Verification

Run: `npx next build`
Expected: Build succeeds

Commit:
```bash
git add components/PerformanceHUD.jsx components/MiniMDSimulation.jsx
git commit -m "feat: add Welford online statistics to PerformanceHUD and MiniMDSimulation"
```

Report file: `.superpowers/sdd/task-13-report.md`

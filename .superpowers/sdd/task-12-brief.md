## Task 12: Memory GC Integration

**Files:**
- Modify: `components/PerformanceHUD.jsx`
- Modify: `components/MiniMDSimulation.jsx`

**Interfaces:**
- Consumes: `useBoundedHistory` from `@/lib/hooks/useBoundedHistory`

### Global Constraints
- No visual changes to rendered output
- `@/*` path alias maps to root level

### What To Do

#### PerformanceHUD.jsx

Read the component first to find any FPS history tracking. Replace unbounded arrays with `useBoundedHistory`:

```javascript
import { useBoundedHistory } from '@/lib/hooks/useBoundedHistory';

function PerformanceHUD() {
  const { history: fpsHistory, push: pushFps } = useBoundedHistory(30);

  // Each frame, instead of pushing to an unbounded array:
  // fpsHistory.current.push(fps) →
  pushFps({ fps: currentFps });
}
```

If the component doesn't have a history array already, add one for FPS tracking (it's useful for the Welford stats in Task 13).

#### MiniMDSimulation.jsx

Add bounded history for particle energy or position tracking:

```javascript
import { useBoundedHistory } from '@/lib/hooks/useBoundedHistory';

function MiniMDSimulation() {
  const { history: energyHistory, push: pushEnergy } = useBoundedHistory(100);

  // After each simulation step:
  pushEnergy({ meanEnergy: totalKE / particles.length, particleCount: particles.length });
}
```

### Verification

Run: `npx next build`
Expected: Build succeeds

Commit:
```bash
git add components/PerformanceHUD.jsx components/MiniMDSimulation.jsx
git commit -m "feat: add bounded history with GC sweep to PerformanceHUD and MiniMDSimulation"
```

Report file: `.superpowers/sdd/task-12-report.md`

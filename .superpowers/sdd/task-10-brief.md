## Task 10: Dual Renderer Fallbacks (Showroom Components)

**Files:**
- Modify: `components/HeroModel.jsx`
- Modify: `components/AutonomousCar.jsx`
- Modify: `components/EmbeddedController.jsx`
- Modify: `components/MiniMDSimulation.jsx`

**Interfaces:**
- Consumes: `renderTier` from `usePerformance()` hook

### Global Constraints
- No visual changes on desktop (ultra/high tiers)
- Follow existing patterns in the codebase

### What To Do

For each component, read the file first, then add `renderTier`-based quality scaling:

#### HeroModel.jsx
- `economy`: Return null (component hidden)
- `low`: Add `wireframe` to mesh material, disable Float animation
- `ultra`/`high`: Keep current behavior

#### AutonomousCar.jsx
- `economy`: Return null (component hidden)
- `low`: Disable shadows, reduce geometry quality, reduce particle effects
- `ultra`/`high`: Keep current behavior

#### EmbeddedController.jsx
- `economy`: Return null
- `low`: Lower polygon count, reduce animation complexity
- `ultra`/`high`: Keep current behavior

#### MiniMDSimulation.jsx
- `economy`: Return null (simulation hidden)
- `low`: Reduce particle count from 300 to 100, reduce visual effects
- `ultra`/`high`: Keep current behavior

### Pattern

```javascript
import { usePerformance } from './PerformanceManager';

function MyComponent() {
  const { renderTier } = usePerformance();

  if (renderTier === 'economy') return null;

  // For low tier, reduce quality...
  const isLowQuality = renderTier === 'low';

  // Rest of component...
}
```

### Verification

Run: `npx next build`
Expected: Build succeeds

Commit:
```bash
git add components/HeroModel.jsx components/AutonomousCar.jsx components/EmbeddedController.jsx components/MiniMDSimulation.jsx
git commit -m "feat: add render tier fallback for showroom WebGL components"
```

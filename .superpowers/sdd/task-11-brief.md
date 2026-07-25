## Task 11: RAF-Scheduled Rendering

**Files:**
- Modify: `components/MiniMDSimulation.jsx`
- Modify: `components/AutonomousCar.jsx`
- Modify: `components/HeroModel.jsx`
- Modify: `components/ParticleBackground.jsx`
- Modify: `components/SkillConstellation.jsx`

**Interfaces:**
- Consumes: `useRenderBudget` from `@/lib/hooks/useRenderBudget`

### Global Constraints
- No visual changes to the rendered output
- `@/*` path alias maps to root level

### What To Do

Read each component and find its `useFrame` loop (from @react-three/fiber). Add render budget tracking to prevent heavy computation from blocking the main thread.

#### Pattern for `useFrame` loops:

```javascript
import { useRenderBudget } from '@/lib/hooks/useRenderBudget';

function Component() {
  const { startFrame, consume, isOverBudget } = useRenderBudget(6); // 6ms budget

  useFrame((state, delta) => {
    startFrame();

    // Particle/compute loop (the expensive part)
    for (let i = 0; i < data.length; i++) {
      if (isOverBudget()) break; // Stop early if over budget
      
      // ... compute ...
      consume(0.1); // Track cost
    }
  });
}
```

#### Which Components Need What:

- **MiniMDSimulation.jsx** — Has the heaviest compute loop (300 particles, Lennard-Jones forces). This is the primary target. Add budget tracking to the particle update loop.
- **AutonomousCar.jsx** — Animated vehicle with wheel rotation, steering, LED effects. Wrap the per-frame animation logic with budget.
- **HeroModel.jsx** — Simple rotation animation. Lightweight, but add budget as a pattern.
- **ParticleBackground.jsx** — Has particle animation in useFrame. Add budget.
- **SkillConstellation.jsx** — Orbital mechanics animation. Add budget.

### Pattern for Simple Animations (HeroModel, AutonomousCar):

For components where the animation is mostly Three.js built-in operations (rotation, position lerp), the budget approach is simpler:

```javascript
const { startFrame, consume, isOverBudget } = useRenderBudget(4);

useFrame((state, delta) => {
  startFrame();
  
  meshRef.current.rotation.y += delta * 0.5;
  // lightweight...
  
  if (isOverBudget()) {
    // Skip non-essential effects this frame
  }
});
```

### Verification

Run: `npx next build`
Expected: Build succeeds

Commit:
```bash
git add components/MiniMDSimulation.jsx components/AutonomousCar.jsx components/HeroModel.jsx components/ParticleBackground.jsx components/SkillConstellation.jsx
git commit -m "feat: add input-sensitive render budget to animation loops"
```

Report file: `.superpowers/sdd/task-11-report.md`

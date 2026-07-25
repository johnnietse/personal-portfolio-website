## Task 9: Dual Renderer Fallbacks (Background Components)

**Files:**
- Modify: `components/SolarSystemBackground.jsx`
- Modify: `components/ParticleBackground.jsx`
- Modify: `components/BlackHoleCursor.jsx`

**Interfaces:**
- Consumes: `renderTier` from `usePerformance()` hook

### Global Constraints
- No visual changes on desktop desktop (ultra/high tiers)
- `@/*` path alias maps to root level
- Only add fallback renderers — don't modify existing WebGL rendering

### What To Do

For each component, read the existing code first, then add tier-based rendering:

#### SolarSystemBackground.jsx

The component already has a `isLowSpec` variable that reduces counts. Replace the `isLowSpec` check with `renderTier`:

- `economy` tier: Return null early (the fixed container behind it handles the background)
- `low` tier: Use existing low-spec reductions (Stars: 2000, AsteroidBelt: 400, disable Float)
- `ultra`/`high` tiers: Keep current behavior

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

#### ParticleBackground.jsx

- `economy` tier: Replace with CSS animated dots (no WebGL canvas)
- `low` tier: Reduce particle count to 400
- `ultra`/`high`: Keep current behavior

```javascript
if (renderTier === 'economy') {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
      pointerEvents: 'none', overflow: 'hidden',
    }}>
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute', width: '2px', height: '2px',
          background: 'rgba(255,255,255,0.3)', borderRadius: '50%',
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          animation: `float ${3 + Math.random() * 4}s infinite`,
        }} />
      ))}
    </div>
  );
}
```

Note: You may need to add the `@keyframes float` to the CSS or use inline animation. Use the existing animation from the component's CSS module or add inline.

#### BlackHoleCursor.jsx

- `economy` and `low` tiers: Replace with CSS radial gradient follower (no shader)
- `ultra`/`high`: Keep existing custom shader

```javascript
if (renderTier === 'economy' || renderTier === 'low') {
  return (
    <div
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

### Verification

Run: `npx next build`
Expected: Build succeeds

Commit:
```bash
git add components/SolarSystemBackground.jsx components/ParticleBackground.jsx components/BlackHoleCursor.jsx
git commit -m "feat: add dual renderer fallbacks for background WebGL components"
```

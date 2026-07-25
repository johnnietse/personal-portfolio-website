## Task 8: PerformanceManager RenderTier Extension

**Files:**
- Modify: `components/PerformanceManager.jsx`

**Interfaces:**
- Consumes: `detectWebGLTier()` from `@/lib/utils/webgl-detect`
- Produces: `renderTier` in the performance context (`'ultra' | 'high' | 'low' | 'economy'`)

### Global Constraints
- No visual changes to the UI
- No new npm dependencies
- Follow existing patterns in the component

### What To Do

1. **Read `components/PerformanceManager.jsx`** to understand its current structure. It provides context with `isLowSpec`, `isMobile`, `features`, etc.

2. **Import `detectWebGLTier`** from `@/lib/utils/webgl-detect`

3. **Add a `renderTier` computation** that combines `isMobile`, `isLowSpec`, and WebGL detection:

```javascript
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

4. **Add `renderTier` to the context value** returned by the provider.

5. **Add `renderTier` to the return type** of `usePerformance()`.

### Verification

Run: `npx next build`
Expected: Build succeeds with no errors

Commit:
```bash
git add components/PerformanceManager.jsx
git commit -m "feat: add renderTier to PerformanceManager with WebGL detection"
```

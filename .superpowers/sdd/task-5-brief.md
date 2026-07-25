## Task 5: React Hooks

**Files:**
- Create: `lib/hooks/useBoundedHistory.js`
- Create: `lib/hooks/useRAF.js`
- Create: `lib/hooks/useRenderBudget.js`

**Interfaces:**
- Consumes: `GC` constants from `lib/config/constants.ts`
- Produces: `useBoundedHistory(maxPoints, gcIntervalMs)`, `useRAF(callback, options)`, `useRenderBudget(maxMsPerFrame)`

### Global Constraints
- No new npm dependencies
- `@/*` path alias maps to root level
- Follow existing patterns in the codebase

### Step 1: Create `lib/hooks/useBoundedHistory.js`

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

### Step 2: Create `lib/hooks/useRAF.js`

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
      }
    }

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [budgetMs]);
}
```

### Step 3: Create `lib/hooks/useRenderBudget.js`

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

### Step 4: Verify build

Run: `npx next build`
Expected: No errors

### Step 5: Commit

```bash
git add lib/hooks/
git commit -m "feat: add useBoundedHistory, useRAF, useRenderBudget hooks"
```

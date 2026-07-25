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

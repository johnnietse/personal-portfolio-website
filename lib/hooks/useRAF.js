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

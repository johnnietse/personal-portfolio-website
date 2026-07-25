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

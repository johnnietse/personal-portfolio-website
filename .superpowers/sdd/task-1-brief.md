## Task 1: Utility — Circuit Breaker

**Files:**
- Create: `lib/utils/circuit-breaker.ts`
- Create: `lib/utils/backoff.ts`

**Interfaces:**
- Consumes: nothing (foundation utility)
- Produces: `CircuitBreaker<T>` class, `computeDelay()` function

### Global Constraints (from plan)
- No new npm dependencies
- All new utilities must be framework-agnostic (zero React dependency)
- `@/*` path alias maps to root level (see `jsconfig.json`)
- AGENTS.md: This is not the Next.js you know — APIs may differ from training data. Read `node_modules/next/dist/docs/` before modifying framework files.

### Step 1: Create `lib/utils/backoff.ts`

```typescript
/**
 * Exponential backoff with configurable jitter.
 * Attempt 0: ~baseMs ±jitter%, Attempt 1: ~baseMs*2 ±jitter%, etc.
 * Capped at maxMs to prevent infinite growth.
 */
export function computeDelay(
  attempt: number,
  baseMs: number = 1000,
  maxMs: number = 16000,
  jitterFraction: number = 0.1
): number {
  const exponential = Math.min(baseMs * Math.pow(2, attempt), maxMs);
  const jitter = exponential * jitterFraction * (Math.random() * 2 - 1);
  return Math.max(0, Math.round(exponential + jitter));
}
```

### Step 2: Create `lib/utils/circuit-breaker.ts`

```typescript
type BreakerState = 'normal' | 'open' | 'half-open';

interface BreakerOptions<T> {
  name: string;
  maxFailures?: number;
  cooldownMs?: number;
  cacheTtlMs?: number;
  fallbackValue?: T | null;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export class CircuitBreaker<T> {
  private state: BreakerState = 'normal';
  private failureCount = 0;
  private lastFailureTime = 0;
  private cache: CacheEntry<T> | null = null;
  private readonly name: string;
  private readonly maxFailures: number;
  private readonly cooldownMs: number;
  private readonly cacheTtlMs: number;
  private readonly fallbackValue: T | null;

  constructor(options: BreakerOptions<T>) {
    this.name = options.name;
    this.maxFailures = options.maxFailures ?? 3;
    this.cooldownMs = options.cooldownMs ?? 300_000;
    this.cacheTtlMs = options.cacheTtlMs ?? 1_800_000;
    this.fallbackValue = options.fallbackValue ?? null;
  }

  private isCacheFresh(): boolean {
    if (!this.cache) return false;
    return (Date.now() - this.cache.timestamp) < this.cacheTtlMs;
  }

  private isCooldownExpired(): boolean {
    return (Date.now() - this.lastFailureTime) >= this.cooldownMs;
  }

  /** Execute a fetch through the breaker. Returns data or fallback. */
  async execute(
    fetchFn: () => Promise<T>,
    onCache?: (data: T) => void
  ): Promise<T | null> {
    // If open and cooldown hasn't expired, serve cache
    if (this.state === 'open' && !this.isCooldownExpired()) {
      if (this.cache && this.isCacheFresh()) {
        onCache?.(this.cache.data);
        return this.cache.data;
      }
      if (this.fallbackValue !== null && this.cache) {
        onCache?.(this.cache.data);
        return this.cache.data;
      }
      return this.fallbackValue;
    }

    // Half-open or cooldown expired — try a probe
    if (this.state === 'open') {
      this.state = 'half-open';
    }

    try {
      const data = await fetchFn();
      this.cache = { data, timestamp: Date.now() };
      this.state = 'normal';
      this.failureCount = 0;
      return data;
    } catch (err) {
      this.failureCount++;
      this.lastFailureTime = Date.now();
      if (this.failureCount >= this.maxFailures) {
        this.state = 'open';
      }
      // Serve stale cache if available
      if (this.cache) {
        onCache?.(this.cache.data);
        return this.cache.data;
      }
      return this.fallbackValue;
    }
  }

  getState(): BreakerState { return this.state; }
  getName(): string { return this.name; }
  clearCache(): void { this.cache = null; }
  reset(): void {
    this.state = 'normal';
    this.failureCount = 0;
  }
}
```

### Step 3: Verify TypeScript compiles

Run: `npx next build` (or `npx tsc --noEmit`)
Expected: No errors from the new files

### Step 4: Commit

```bash
git add lib/utils/circuit-breaker.ts lib/utils/backoff.ts
git commit -m "feat: add circuit breaker and exponential backoff utilities"
```

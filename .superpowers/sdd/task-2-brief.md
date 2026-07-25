## Task 2: Utility — Welford Online Algorithm

**Files:**
- Create: `lib/utils/welford.ts`

**Interfaces:**
- Consumes: nothing (foundation utility)
- Produces: `WelfordRunningStats` class with `update()`, `variance`, `stddev`, `zScore()`

### Global Constraints (from plan)
- No new npm dependencies
- All new utilities must be framework-agnostic (zero React dependency)
- `@/*` path alias maps to root level

### Step 1: Create `lib/utils/welford.ts`

```typescript
/**
 * Welford's online algorithm for streaming mean and variance.
 * Tracks only 3 numbers (count, mean, M2) — no array storage needed.
 * Numerically stable, single-pass, O(1) memory.
 */
export class WelfordRunningStats {
  count = 0;
  mean = 0;
  private m2 = 0;

  /** Feed a new observation into the running statistics. */
  update(value: number): void {
    this.count++;
    const delta = value - this.mean;
    this.mean += delta / this.count;
    const delta2 = value - this.mean;
    this.m2 += delta * delta2;
  }

  /** Sample variance (uses Bessel's correction: divide by n-1). */
  get variance(): number {
    return this.count > 1 ? this.m2 / (this.count - 1) : 0;
  }

  /** Sample standard deviation. */
  get stddev(): number {
    return Math.sqrt(this.variance);
  }

  /** Z-score: how many standard deviations from the running mean. */
  zScore(value: number): number {
    const sd = this.stddev;
    return sd === 0 ? 0 : (value - this.mean) / sd;
  }

  /** Reset all statistics back to initial state. */
  reset(): void {
    this.count = 0;
    this.mean = 0;
    this.m2 = 0;
  }
}
```

### Step 2: Verify TypeScript compiles

Run: `npx next build`
Expected: No errors

### Step 3: Commit

```bash
git add lib/utils/welford.ts
git commit -m "feat: add Welford online streaming statistics algorithm"
```

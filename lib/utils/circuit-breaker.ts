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
      // Serve stale cache if available — always prefer it over null fallback
      if (this.cache) {
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
    } catch {
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
    this.lastFailureTime = 0;
    this.cache = null;
  }
}

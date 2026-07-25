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

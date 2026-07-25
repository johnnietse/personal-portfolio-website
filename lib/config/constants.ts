export const GC = {
  /** Maximum number of history points to retain. */
  HISTORY_MAX_POINTS: 30,
  /** Interval in ms for garbage collection sweep. */
  GC_INTERVAL_MS: 600_000,        // 10 minutes
  /** Age in ms after which an entry is considered stale. */
  STALE_THRESHOLD_MS: 3_600_000,  // 1 hour
} as const;

export const CACHE = {
  GITHUB_PROFILE_TTL_MS: 1_800_000,      // 30 min
  GITHUB_REPOS_TTL_MS: 600_000,           // 10 min
  GITHUB_CONTRIBUTIONS_TTL_MS: 1_800_000, // 30 min
  GITHUB_STARS_TTL_MS: 1_800_000,         // 30 min
} as const;

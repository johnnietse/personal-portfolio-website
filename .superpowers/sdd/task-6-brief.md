## Task 6: GitHub API Circuit Breaker Integration

**Files:**
- Modify: `components/GitHubStats.jsx`
- Modify: `components/LiveGithubProjects.jsx`
- Modify: `components/GithubProfileHeader.jsx`
- Modify: `components/GithubContributionGrid.jsx`
- Modify: `components/GithubTopRepos.jsx`
- Modify: `components/GithubInterestStreams.jsx`

**Interfaces:**
- Consumes: `CircuitBreaker` from `@/lib/utils/circuit-breaker`, `CACHE` from `@/lib/config/constants`

### Global Constraints
- No visual/content changes to existing sections
- No new npm dependencies
- Follow existing patterns in the codebase

### What To Do

For each of the 6 GitHub components:

1. **Read the component file** to understand its fetch pattern (how it calls the GitHub API)
2. **Import the CircuitBreaker**
3. **Create a module-scoped breaker instance** (outside the component function, so it persists across renders)
4. **Wrap the fetch call** with `breaker.execute(fetchFn, onCache)`
5. **Handle the fallback** — when `onCache` is called, set state from cached data (so users see the last known good data during outages)

### Pattern to Apply

Each component follows this general pattern. Adapt to the specific component's fetch logic:

```javascript
import { CircuitBreaker } from '@/lib/utils/circuit-breaker';
import { CACHE } from '@/lib/config/constants';

// Module-scoped breaker (persists across renders)
const statsBreaker = new CircuitBreaker({
  name: 'GitHub Stats',
  maxFailures: 3,
  cooldownMs: 300_000,
  cacheTtlMs: CACHE.GITHUB_PROFILE_TTL_MS,
  fallbackValue: null,
});

// Inside the component, replace the direct fetch:
// Before:
// const data = await fetch(url).then(r => r.json())
// 
// After:
const data = await statsBreaker.execute(
  () => fetch(url).then(r => r.json()),
  (cached) => {
    // This callback fires when serving stale cached data
    setState(cached); // or however the component updates its state
  }
);
if (data !== null) {
  // Use the data normally
}
```

### Per-Component Notes

- **GitHubStats.jsx** — Uses `@/api/github/stats` endpoint. Wraps the fetch in the stats breaker.
- **GithubProfileHeader.jsx** — Likely fetches user profile from GitHub API. Uses profile breaker.
- **GithubTopRepos.jsx** — Fetches repos. Uses repos breaker.
- **GithubContributionGrid.jsx** — Fetches contribution data. Uses contributions breaker.
- **GithubInterestStreams.jsx** — Fetches starred repos. Uses stars breaker.
- **LiveGithubProjects.jsx** — Fetches live project data. Uses repos breaker.

Read each file to understand the exact fetch URL and state management pattern. Apply the breaker consistently across all 6 components.

### Step 1: Verify each component still loads

Run: `npm run dev`
Expected: All GitHub sections load normally with data

### Step 2: Commit

```bash
git add components/GitHubStats.jsx components/LiveGithubProjects.jsx components/GithubProfileHeader.jsx components/GithubContributionGrid.jsx components/GithubTopRepos.jsx components/GithubInterestStreams.jsx
git commit -m "feat: add circuit breaker resilience to all GitHub API components"
```

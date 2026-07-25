## Task 4: Config Files

**Files:**
- Create: `lib/config/skills.ts`
- Create: `lib/config/projects.ts`
- Create: `lib/config/locations.ts`
- Create: `lib/config/constants.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `SKILLS`, `PROJECTS`, `LOCATIONS`, `GC`, `CACHE` typed constants

### Global Constraints
- No new npm dependencies
- All utilities must be framework-agnostic
- `@/*` path alias maps to root level

### Step 1: Create `lib/config/constants.ts`

```typescript
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
```

### Step 2: Create `lib/config/skills.ts`

```typescript
export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'systems' | 'ai' | 'hardware' | 'tools';
}

export const SKILLS: Skill[] = [
  // Systems & Autonomy
  { name: 'ROS2', category: 'systems' },
  { name: 'Sensor Fusion', category: 'systems' },
  { name: 'LiDAR Arrays', category: 'hardware' },
  { name: 'Computer Vision', category: 'ai' },
  // Embedded
  { name: 'IoT Devices', category: 'hardware' },
  { name: 'ESP32', category: 'hardware' },
  { name: 'Microcontrollers', category: 'hardware' },
  { name: 'C++ Firmware', category: 'systems' },
  // HPC
  { name: 'HPC / MPI', category: 'systems' },
  { name: 'Computational Math', category: 'ai' },
  { name: 'PID Hardware Control', category: 'systems' },
  { name: 'Lennard-Jones', category: 'ai' },
  // Frontend
  { name: 'Next.js 16', category: 'frontend' },
  { name: 'React 19', category: 'frontend' },
  { name: 'Three.js', category: 'frontend' },
  { name: 'WebGL', category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  // Backend
  { name: 'GraphQL API', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'Redis', category: 'backend' },
  // Tools
  { name: 'Docker', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'Linux', category: 'tools' },
  { name: 'CI/CD', category: 'tools' },
];

export const SKILLS_BY_CATEGORY: Record<string, Skill[]> = {};
for (const skill of SKILLS) {
  (SKILLS_BY_CATEGORY[skill.category] ??= []).push(skill);
}
```

### Step 3: Create `lib/config/locations.ts`

```typescript
export interface Location {
  city: string;
  lat: number;
  lon: number;
  label: string;
  type: 'education' | 'work' | 'project';
}

/** Personal geographic locations for the WebGL globe. */
export const LOCATIONS: Location[] = [
  { city: 'Kingston, ON', lat: 44.2312, lon: -76.4860, label: "Queen's University", type: 'education' },
];
```

### Step 4: Create `lib/config/projects.ts`

Read the file `app/project/page.js`. Lines 9-381 contain a `const projects = [...]` array with 48 project entries. Each entry has `{ title, date, desc, skills, link }`.

Extract ALL project entries into a typed config file:

```typescript
export interface Project {
  title: string;
  date: string;
  description: string;
  skills: string[];
  githubUrl?: string;
}

/**
 * All projects keyed by title.
 * Data extracted from app/project/page.js lines 9-381.
 */
export const PROJECTS: Record<string, Project> = {
  // For EACH entry in the projects array, add:
  // "Title": {
  //   title: "exact title",
  //   date: "exact date",
  //   description: "exact desc",
  //   skills: ["exact", "skills", "array"],
  //   githubUrl: "exact link value"
  // },
};

/** Flat array of all projects for iteration. */
export const PROJECT_LIST: Project[] = Object.values(PROJECTS);

/** First 4 projects with GitHub URLs — used as API fallback. */
export const FALLBACK_PROJECTS: Project[] = PROJECT_LIST.filter(p => p.githubUrl).slice(0, 4);
```

Map the `link` field from the source to `githubUrl` in the config. Include ALL 48 entries.

### Step 5: Verify build

Run: `npx next build`
Expected: No errors

### Step 6: Commit

```bash
git add lib/config/
git commit -m "feat: add typed config files for skills, projects, locations, constants"
```

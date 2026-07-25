## Task 7: Static Config Integration

**Files:**
- Modify: `app/page.js`
- Modify: `app/project/page.js`

**Interfaces:**
- Consumes: `SKILLS_BY_CATEGORY` from `@/lib/config/skills`, `PROJECT_LIST` from `@/lib/config/projects`

### Global Constraints
- No visual/content changes — the rendered output must look identical
- `@/*` path alias maps to root level

### What To Do

#### In `app/page.js`:

Replace inline skill-tag divs in each showroom section with references from `SKILLS_BY_CATEGORY`. The skills should map to the same skills currently shown.

There are 3 showroom sections with skill tags:
1. **Level 4 Autonomous Systems** (around line 109-115) — skills: ROS2, Sensor Fusion, LiDAR Arrays, Computer Vision
2. **Embedded Microcontroller** (around line 144-150) — skills: IoT Devices, ESP32, Microcontrollers, C++ Firmware
3. **miniMD Simulation** (around line 167-173) — skills: HPC / MPI, Computational Math, PID Hardware Control, Lennard-Jones

Replace the hardcoded `skill-tag` divs with a mapping over the relevant subset of skills from the config. Example:

```javascript
import { SKILLS } from '@/lib/config/skills';

// Inside a showroom section, replace individual skill-tag divs:
{/* Before: */}
<div className="skills-grid">
  <div className="skill-tag">ROS2</div>
  <div className="skill-tag">Sensor Fusion</div>
  <div className="skill-tag">LiDAR Arrays</div>
  <div className="skill-tag">Computer Vision</div>
</div>

{/* After: */}
<div className="skills-grid">
  {SKILLS.filter(s => ['ROS2', 'Sensor Fusion', 'LiDAR Arrays', 'Computer Vision'].includes(s.name)).map(skill => (
    <div className="skill-tag" key={skill.name}>{skill.name}</div>
  ))}
</div>
```

#### In `app/project/page.js`:

Replace the inline `projects` array (lines 9-381) with an import from the config:

```javascript
import { PROJECT_LIST } from '@/lib/config/projects';

// Replace:
// const projects = [ ... 48 entries ... ];
// With nothing — just use PROJECT_LIST directly in the JSX

// In the JSX, replace:
// {projects.map((proj, index))} →
// {PROJECT_LIST.map((proj, index))}
```

Note: The source data uses `desc` and `link` fields; the config uses `description` and `githubUrl`. Update the JSX references accordingly.

### Step 1: Verify visual output is identical

Run: `npm run dev`
Expected: The page looks exactly the same as before — same text, same order, same styles.

### Step 2: Commit

```bash
git add app/page.js app/project/page.js
git commit -m "refactor: extract hardcoded skills and projects into typed config files"
```

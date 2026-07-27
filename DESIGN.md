# Design Spec: Johnnie Tse Portfolio v2

## Design Read
**Developer portfolio for engineering hiring managers** — dark-tech / HPC narrative, industrial-modern aesthetic (Linear + Vercel school). Warm dark, single blue accent, monospace chips, hairline detail, WebGL showroom as hero product.

## Five Dials
| Dial | Value | Rationale |
|------|-------|-----------|
| Visual Variance | 7/10 | Alternate layouts intentionally; break rhythm at sections 2 & 4 |
| Motion Intensity | 7/10 | WebGL hero + scroll-reveal; `prefers-reduced-motion` = instant |
| Information Density | 5/10 | Curated, scannable, metric-led; skills expandable |
| Asset Dependence | 8/10 | WebGL scenes *are* the product |
| Brand Fidelity | 8/10 | Custom mark, consistent iconography, metric-led copy |

## Color Palette (Dark Mode Default)
```css
:root {
  --bg: #0a0d12;
  --bg-elevated: #11151c;
  --surface: rgba(17,21,28,0.8);
  --surface-hover: rgba(17,21,28,0.95);
  --border: rgba(255,255,255,0.06);
  --border-strong: rgba(255,255,255,0.12);
  --text: #e8ebef;
  --text-dim: #8b949e;
  --text-muted: #6e7681;
  --accent: #4da3ff;        /* Primary blue */
  --accent-green: #7ee787;  /* Metrics, live indicators */
  --accent-glow: rgba(77,163,255,0.25);
  --shadow: rgba(0,0,0,0.6);
}
[data-theme="light"] { /* warm off-white, not sterile */ }
```

## Typography
| Role | Font | Scale |
|------|------|-------|
| Display | Geist 700 | `clamp(2.5rem, 6vw+1rem, 6rem)`, tracking-tight |
| Body | Geist 400 | 1rem, 1.65 leading |
| Mono | Geist Mono 400/500 | 0.85rem, metrics/code |

## Spacing & Radius
- Base unit: 8px (0.5rem)
- Section padding: 8rem / 5rem mobile
- Card radius: 16px; Tag: 9999px; Button: 10px

## Motion
- Easing: `[0.16, 1, 0.3, 1]` (spring-like)
- Duration: 0.6–0.8s entrance; 0.2s micro
- Reduced-motion: `initial=false` → instant

## Layout Variants (Breaking Hero-Grid Pattern)
| Section | Layout | Rationale |
|---------|--------|-----------|
| Hero | Split (text L / WebGL R) | Classic intro |
| Autonomous Car | Full-width WebGL, text overlay | Immersive |
| Embedded Controller | Flipped (WebGL L / Text R) | Rhythm break |
| MiniMD | Split (Text L / WebGL R) | Return to familiar |
| Globe | Full-width WebGL, floating badges | Grand finale |

## Icon System
- **Lucide React** for all common tech (React, Node, Python, Go, Docker, K8s, AWS, Git, etc.)
- **Custom SVG** only for unique items: ROS2, CAN, ISO 26262, RISC-V, Zephyr, Coral TPU
- Normalized: `size={20} strokeWidth={1.5}` for inline; `size={22}` for nav

## Skill Categories (Collapsible)
1. Languages & Frameworks
2. Infrastructure & DevOps
3. Data & ML
4. Embedded & Hardware
5. Developer Tools

## Experience Bullets → Metric-Led
**Before:** "Architected a multi-threaded ROS2 C++ node integrating CAN messaging..."
**After:** "Sub-2ms e2e latency • 200+ concurrent CAN signals • 4 isolated networks (HS/Chassis/LS/Scoring)"

## Globe City Badges
| City | Badge | Photo |
|------|-------|-------|
| Kingston | Queen's / AutoDrive | Campus |
| Hong Kong | Solana / Arista / Foresoon | Skyline |
| Remote | vLLM / K8s / Deel | Globe |

## Scroll Progress Bar
- 2px top bar, `--accent` fill, `position: fixed`, `z-index: 9999`

## 404 Page
- Search (client-side filter over all page content)
- Recent sections links
- "Back to Home" CTA

## Assets to Create
- `public/logo.svg` — custom mark (monogram + wordmark)
- `public/og-image.png` — 1200×630, branded
- Globe city photos (32×32px) — Kingston, HK, Remote

## Files to Comment Out (Not Delete)
- `about.html`, `project.html`, `index.html` (root) — static duplicates
- Any unused icon imports in skill sections

---

**Checkpoint 1:** Design system confirmed. Proceed to implementation.
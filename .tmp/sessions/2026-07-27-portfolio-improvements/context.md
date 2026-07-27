# Task Context: Portfolio-Wide Improvements

Session ID: 2026-07-27-portfolio-improvements
Created: 2026-07-27
Status: in_progress

## Current Request
Comprehensive portfolio improvement covering typography, icons, animations, content polish, and code quality across 5 batches.

## Context Files (Standards to Follow)
None discovered — this is a self-contained project.

## Reference Files (Source Material to Look At)
- app/globals.css — Design tokens, CSS variables, component styles
- app/layout.js — Root layout with font loading, PerformanceProvider
- app/page.js — Home page with all showroom sections
- app/about/page.js — About page (652 lines, inline data)
- app/project/page.js — Projects page
- components/Navigation.jsx — Nav with emoji icons, theme toggle
- components/AOSSetup.jsx — AOS setup component (to remove)
- components/RenderOnScroll.jsx — Lazy rendering component
- components/VisibilityWrapper.jsx — Lazy rendering wrapper
- lib/config/projects.js — Project data config
- lib/config/skills.js — Skills data config
- lib/design/tokens.js — Design token system
- components/GlobeFootprint.jsx (51KB)
- components/AutonomousCar.jsx (28KB)
- components/MiniMDSimulation.jsx (25KB)
- package.json

## External Docs Fetched
None

## Components
### Batch 1: Typography & Font Loading
- Migrate Google Font CSS @import and <link> → next/font
- Swap Fraunces serif title → Cabinet Grotesk display weight
- Remove Orbitron (unused font)
- Remove AOS CSS import

### Batch 2: Icon System + Footer
- Install @phosphor-icons/react
- Replace inline SVGs with Phosphor icons
- Replace emoji with Phosphor icons
- Create Footer component
- Add Footer to layout

### Batch 3: Animation Migration (AOS → Motion)
- npm uninstall aos
- Remove AOSSetup component
- Replace all data-aos attributes with motion.div whileInView
- Honor prefers-reduced-motion

### Batch 4: Content & Structure
- Tighten hero copy
- Break up section layout repetition
- Add loading.js
- Add not-found.js 404 page

### Batch 5: Code Quality
- Consolidate RenderOnScroll + VisibilityWrapper
- Move inline styles → CSS classes
- Extract about page data into config

## Constraints
- Next.js 16.2.1 with App Router
- Must maintain dark/light theme toggle
- Must maintain WebGL 3D rendering across all pages
- Must maintain performance tier system
- Must maintain existing accessibility

## Exit Criteria
- [ ] Build passes with zero warnings
- [ ] No Google Fonts @import or <link> loading
- [ ] No emoji icons in UI
- [ ] AOS dependency removed
- [ ] Footer present on all pages
- [ ] 404 page exists
- [ ] loading.tsx exists
- [ ] Fraunces replaced with Cabinet Grotesk for headlines

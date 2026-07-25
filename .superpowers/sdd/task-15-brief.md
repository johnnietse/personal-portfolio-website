## Task 15: Integration Verification

**Files:** (none — verification only)

### Verification Steps

Run each check and confirm it passes:

1. **Full build**
   ```bash
   npx next build
   ```
   Expected: No TypeScript or build errors.

2. **Circuit breaker offline test**
   - Run: `npm run dev`
   - Open the page
   - DevTools → Network → Offline
   - Expected: All GitHub sections show cached data or fallback content (not loading spinners or errors)

3. **Mobile fallback test**
   - DevTools → Device toolbar → Select a mid-range phone (e.g., Moto G4)
   - Expected: Background components use CSS/DOM fallbacks. Showroom components use lower detail or static fallbacks. No WebGL errors in console.

4. **Long-session memory stability**
   - Keep the page open for 10 minutes
   - Monitor Performance tab → Memory for JS heap growth
   - Expected: Heap size stabilizes (bounded history prevents unbounded growth)

5. **FPS stability during scroll**
   - Monitor PerformanceHUD while scrolling the page
   - Expected: FPS stays above 30 even during scroll with 3D components active

6. **Globe renders on desktop, hidden on mobile**
   - Desktop: Globe visible and interactive
   - Mobile (device toolbar): Globe container does not render

### Final Commit

```bash
git add -A
git commit -m "chore: finalize WorldMonitor pattern integration"
```

Report file: `.superpowers/sdd/task-15-report.md`
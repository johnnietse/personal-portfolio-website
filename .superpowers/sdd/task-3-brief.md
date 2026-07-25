## Task 3: Utility — WebGL Detection

**Files:**
- Create: `lib/utils/webgl-detect.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `WebGLTier` type, `detectWebGLTier()` function, `getWebGLInfo()` function

### Global Constraints
- No new npm dependencies
- All new utilities must be framework-agnostic (zero React dependency)
- `@/*` path alias maps to root level

### Step 1: Create `lib/utils/webgl-detect.ts`

```typescript
export type WebGLTier = 'hardware' | 'software' | 'none';

interface WebGLInfo {
  tier: WebGLTier;
  renderer: string;
  vendor: string;
  maxTextureSize: number;
}

/** Detect the WebGL renderer and classify it as hardware, software, or none. */
export function detectWebGLTier(): WebGLTier {
  if (typeof window === 'undefined') return 'none';

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) return 'none';

  const ext = gl.getExtension('WEBGL_debug_renderer_info');
  if (!ext) return 'hardware'; // Can't detect — assume hardware

  const renderer = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? '').toLowerCase();
  const softwareRenderers = ['swiftshader', 'llvmpipe', 'softpipe', 'software rasterizer', 'mesa'];
  return softwareRenderers.some(s => renderer.includes(s)) ? 'software' : 'hardware';
}

/** Get full WebGL info for debugging. */
export function getWebGLInfo(): WebGLInfo {
  if (typeof window === 'undefined') {
    return { tier: 'none', renderer: '', vendor: '', maxTextureSize: 0 };
  }

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) {
    return { tier: 'none', renderer: '', vendor: '', maxTextureSize: 0 };
  }

  const ext = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = ext
    ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? '')
    : 'unknown';
  const vendor = ext
    ? String(gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) ?? '')
    : 'unknown';
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

  return {
    tier: detectWebGLTier(),
    renderer,
    vendor,
    maxTextureSize,
  };
}
```

### Step 2: Verify TypeScript compiles

Run: `npx next build`
Expected: No errors

### Step 3: Commit

```bash
git add lib/utils/webgl-detect.ts
git commit -m "feat: add WebGL renderer detection utility"
```

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

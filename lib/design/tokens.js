/**
 * Design Tokens - Single source of truth for all visual design values
 * Ensures consistency across all components (CSS, 3D, UI)
 */

export const colors = {
  // Core brand colors
  brand: {
    primary: '#58a6ff',      // Primary blue
    primaryHover: '#3178c6', // Darker blue for hover
    secondary: '#7ee787',    // Success green
    accent: '#f472b6',       // Pink accent
    warning: '#facc15',      // Yellow warning
    danger: '#ef4444',       // Red danger
  },

  // Semantic colors (dark mode default)
  dark: {
    bg: '#0d1117',
    bgElevated: '#161b22',
    surface: 'rgba(22, 27, 34, 0.7)',
    surfaceHover: 'rgba(22, 27, 34, 0.9)',
    border: 'rgba(255, 255, 255, 0.1)',
    borderStrong: 'rgba(255, 255, 255, 0.2)',
    textPrimary: '#e6edf3',
    textSecondary: '#8b949e',
    textMuted: '#6e7681',
    accentGlow: 'rgba(88, 166, 255, 0.3)',
    accentGlowStrong: 'rgba(88, 166, 255, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.5)',
    formBg: 'rgba(255, 255, 255, 0.03)',
    formBgFocus: 'rgba(255, 255, 255, 0.06)',
    navBg: 'rgba(13, 17, 23, 0.6)',
  },

  // Semantic colors (light mode)
  light: {
    bg: '#f8fafc',
    bgElevated: '#ffffff',
    surface: 'rgba(255, 255, 255, 0.7)',
    surfaceHover: 'rgba(255, 255, 255, 0.9)',
    border: 'rgba(0, 0, 0, 0.1)',
    borderStrong: 'rgba(0, 0, 0, 0.2)',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
    accentGlow: 'rgba(14, 165, 233, 0.3)',
    accentGlowStrong: 'rgba(14, 165, 233, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.08)',
    formBg: 'rgba(0, 0, 0, 0.03)',
    formBgFocus: 'rgba(0, 0, 0, 0.06)',
    navBg: 'rgba(255, 255, 255, 0.6)',
  },

  // 3D Scene specific colors
  scene: {
    // Globe colors
    globe: {
      atmosphere: '#4466cc',
      atmosphereInner: '#00a8cc',
      atmosphereOuter: '#00d4ff',
      cyanLight: '#00d4ff',
      cityGlow: '#7ee787',
      cityPulse: '#7ee787',
      flashRing: '#ffffff',
      graticule: 'rgba(139, 148, 158, 0.2)',
      countryStroke: 'rgba(139, 148, 158, 0.2)',
      particle: '#58a6ff',
      wireframe: '#58a6ff',
      equatorRing: '#58a6ff',
      bloomStrength: 0.45,
      bloomRadius: 0.6,
      bloomThreshold: 0.08,
    },

    // Hero model colors
    hero: {
      wireframe: '#58a6ff',
      core: '#0ea5e9',
      coreGlow: '#7dd3fc',
      innerGlow: '#10b981',
      pinkAccent: '#f472b6',
    },

    // Autonomous car colors
    car: {
      chassisBlue: '#1e3a8a',
      chassisYellow: '#facc15',
      chassisRed: '#dc2626',
      glass: '#111111',
      wheelTire: '#111827',
      wheelRim: '#94a3b8',
      sensorBlue: '#0ea5e9',
      sensorRed: '#ef4444',
      lidar: '#0ea5e9',
      imu: '#22c55e',
      rtk: '#ef4444',
      trajectoryGreen: '#22c55e',
      trajectoryBlue: '#0ea5e9',
      groundWireframe: '#58a6ff',
    },

    // Embedded controller colors
    embedded: {
      pcb: '#064e3b',
      cpuSubstrate: '#111111',
      cpuHeatspreader: '#94a3b8',
      gpioBase: '#0f172a',
      gpioPin: '#fbbf24',
      usbMetal: '#e2e8f0',
      usbBlue: '#1d4ed8',
      usbBlack: '#111111',
      ethernetMetal: '#94a3b8',
      ethernetHole: '#000000',
      wifiShield: '#f8fafc',
      wifiAntenna: '#1e3a8a',
      wifiTrace: '#fbbf24',
      ram: '#0f172a',
      connector: '#f8fafc',
      connectorTrace: '#000000',
      powerPort: '#94a3b8',
      hdmiPort: '#111111',
      capacitorSilver: '#cbd5e1',
      capacitorBlack: '#111111',
      contactShadow: '#000000',
      ambientLight: '#ffffff',
      keyLight: '#ffffff',
      fillLight: '#60a5fa',
      bottomLight: '#10b981',
      topLight: '#facc15',
      bottomGlow: '#10b981',
    },

    // MiniMD colors
    minmd: {
      particleCold: '#1e3a8a',  // Blue (low energy)
      particleHot: '#dc2626',   // Red (high energy)
      boundaryWire: '#38bdf8',
      boundaryFill: '#38bdf8',
      ambientLight: '#ffffff',
      keyLight: '#ffffff',
      fillLight: '#60a5fa',
      centerGlow: '#f472b6',
      bottomGlow: '#10b981',
      contactShadow: '#000000',
    },
  },

  // Gradients
  gradients: {
    title: 'linear-gradient(180deg, #ffffff 0%, #8b949e 100%)',
    titleLight: 'linear-gradient(180deg, #020617 0%, #64748b 100%)',
    button: 'linear-gradient(135deg, #58a6ff 0%, #3178c6 100%)',
    buttonLight: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    heroBg: 'radial-gradient(circle at 15% 50%, rgba(88, 166, 255, 0.15), transparent 25%), radial-gradient(circle at 85% 30%, rgba(163, 113, 247, 0.08), transparent 25%)',
    cardHover: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.4) 0%, transparent 100%)',
    globeSection: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.6) 0%, transparent 70%)',
    canvasBg: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.4) 0%, transparent 100%)',
    canvasBgDark: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.6) 0%, transparent 100%)',
  },
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
  section: '8rem',
  sectionMobile: '5rem',
  sectionSmall: '3rem',
};

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  xxl: '24px',
  full: '9999px',
  card: '16px',
  cardSmall: '12px',
};

export const shadows = {
  sm: '0 2px 8px rgba(0, 0, 0, 0.15)',
  md: '0 4px 14px rgba(0, 0, 0, 0.3)',
  lg: '0 8px 30px -10px rgba(0, 0, 0, 0.4)',
  xl: '0 10px 40px rgba(0, 0, 0, 0.5)',
  glow: '0 0 15px rgba(88, 166, 255, 0.3)',
  glowStrong: '0 0 30px rgba(88, 166, 255, 0.5)',
  glowGreen: '0 0 15px rgba(126, 231, 135, 0.3)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
};

export const transitions = {
  fast: '0.15s ease',
  normal: '0.3s ease',
  slow: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  spring: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

export const typography = {
  fontFamily: {
    primary: "'Outfit', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
    display: "'Orbitron', sans-serif",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': 'clamp(2rem, 5vw + 1rem, 5rem)',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    tight: 1.1,
    normal: 1.6,
    relaxed: 1.7,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.01em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1024px',
  '2xl': '1200px',
};

export const zIndex = {
  base: 1,
  dropdown: 100,
  sticky: 200,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
  nav: 1000,
  mobileNav: 2000,
  hud: 9999,
};

export const canvas = {
  // Default canvas background for all 3D scenes
  background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.4) 0%, transparent 100%)',
  backgroundDark: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.6) 0%, transparent 100%)',
  borderRadius: '16px',
  borderRadiusSmall: '12px',
};

// Helper to get CSS custom properties for globals.css
export const cssVariables = {
  dark: {
    '--bg-color': colors.dark.bg,
    '--surface-color': colors.dark.surface,
    '--border-color': colors.dark.border,
    '--text-primary': colors.dark.textPrimary,
    '--text-secondary': colors.dark.textSecondary,
    '--accent-color': colors.brand.primary,
    '--accent-glow': colors.dark.accentGlow,
    '--title-gradient': colors.gradients.title,
    '--btn-gradient': colors.gradients.button,
    '--nav-bg': colors.dark.navBg,
    '--shadow-color': colors.dark.shadow,
    '--form-bg': colors.dark.formBg,
    '--form-bg-focus': colors.dark.formBgFocus,
  },
  light: {
    '--bg-color': colors.light.bg,
    '--surface-color': colors.light.surface,
    '--border-color': colors.light.border,
    '--text-primary': colors.light.textPrimary,
    '--text-secondary': colors.light.textSecondary,
    '--accent-color': colors.brand.primary,
    '--accent-glow': colors.light.accentGlow,
    '--title-gradient': colors.gradients.titleLight,
    '--btn-gradient': colors.gradients.buttonLight,
    '--nav-bg': colors.light.navBg,
    '--shadow-color': colors.light.shadow,
    '--form-bg': colors.light.formBg,
    '--form-bg-focus': colors.light.formBgFocus,
  },
};

export default {
  colors,
  spacing,
  borderRadius,
  shadows,
  transitions,
  typography,
  breakpoints,
  zIndex,
  canvas,
  cssVariables,
};
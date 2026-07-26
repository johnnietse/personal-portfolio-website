/**
 * Design Tokens - Single source of truth for all visual design values
 * Ensures consistency across all components (CSS, 3D, UI)
 */

export const colors = {
  // Core brand colors
  brand: {
    primary: '#4da3ff',      // Primary blue - desaturated
    primaryHover: '#2d7dd2', // Darker blue for hover
    secondary: '#7ee787',    // Success green
    accent: '#f472b6',       // Pink accent
    warning: '#facc15',      // Yellow warning
    danger: '#ef4444',       // Red danger
  },

  // Semantic colors (dark mode default) - Premium tinted dark
  dark: {
    bg: '#0a0d12',
    bgElevated: '#11151c',
    surface: 'rgba(17, 21, 28, 0.8)',
    surfaceHover: 'rgba(17, 21, 28, 0.95)',
    border: 'rgba(255, 255, 255, 0.06)',
    borderStrong: 'rgba(255, 255, 255, 0.12)',
    textPrimary: '#e8ebef',
    textSecondary: '#8b949e',
    textMuted: '#6e7681',
    accentGlow: 'rgba(77, 163, 255, 0.25)',
    accentGlowStrong: 'rgba(77, 163, 255, 0.4)',
    shadow: 'rgba(0, 0, 0, 0.6)',
    formBg: 'rgba(255, 255, 255, 0.02)',
    formBgFocus: 'rgba(255, 255, 255, 0.05)',
    navBg: 'rgba(10, 13, 18, 0.7)',
    shadowTinted: 'rgba(77, 163, 255, 0.08)',
  },

  // Semantic colors (light mode) - Warm off-white
  light: {
    bg: '#faf9f7',
    bgElevated: '#ffffff',
    surface: 'rgba(255, 255, 255, 0.8)',
    surfaceHover: 'rgba(255, 255, 255, 0.95)',
    border: 'rgba(15, 23, 42, 0.06)',
    borderStrong: 'rgba(15, 23, 42, 0.12)',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
    accentGlow: 'rgba(2, 132, 199, 0.2)',
    accentGlowStrong: 'rgba(2, 132, 199, 0.35)',
    shadow: 'rgba(15, 23, 42, 0.08)',
    formBg: 'rgba(15, 23, 42, 0.02)',
    formBgFocus: 'rgba(15, 23, 42, 0.04)',
    navBg: 'rgba(250, 249, 247, 0.7)',
    shadowTinted: 'rgba(2, 132, 199, 0.06)',
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
      particle: '#4da3ff',
      wireframe: '#4da3ff',
      equatorRing: '#4da3ff',
      bloomStrength: 0.45,
      bloomRadius: 0.6,
      bloomThreshold: 0.08,
    },

    // Hero model colors
    hero: {
      wireframe: '#4da3ff',
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
      groundWireframe: '#4da3ff',
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
    title: 'linear-gradient(180deg, #ffffff 0%, #a8b3c0 100%)',
    titleLight: 'linear-gradient(180deg, #020617 0%, #64748b 100%)',
    button: 'linear-gradient(135deg, #4da3ff 0%, #2d7dd2 100%)',
    buttonLight: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
    heroBg: 'radial-gradient(ellipse at 15% 50%, rgba(77, 163, 255, 0.06), transparent 35%), radial-gradient(ellipse at 85% 30%, rgba(163, 113, 247, 0.04), transparent 30%)',
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
    primary: "'Cabinet Grotesk', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
    display: "'Fraunces', serif",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': 'clamp(2.5rem, 6vw + 1rem, 6rem)',
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
    tight: 1.05,
    normal: 1.65,
    relaxed: 1.7,
  },
  letterSpacing: {
    tight: '-0.03em',
    normal: '0',
    wide: '0.01em',
    wider: '0.02em',
    widest: '0.05em',
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
    '--bg-elevated': colors.dark.bgElevated,
    '--surface-color': colors.dark.surface,
    '--surface-hover': colors.dark.surfaceHover,
    '--border-color': colors.dark.border,
    '--border-strong': colors.dark.borderStrong,
    '--text-primary': colors.dark.textPrimary,
    '--text-secondary': colors.dark.textSecondary,
    '--text-muted': colors.dark.textMuted,
    '--accent-color': colors.brand.primary,
    '--accent-glow': colors.dark.accentGlow,
    '--accent-glow-strong': colors.dark.accentGlowStrong,
    '--title-gradient': colors.gradients.title,
    '--btn-gradient': colors.gradients.button,
    '--nav-bg': colors.dark.navBg,
    '--shadow-color': colors.dark.shadow,
    '--shadow-tinted': colors.dark.shadowTinted,
    '--form-bg': colors.dark.formBg,
    '--form-bg-focus': colors.dark.formBgFocus,
  },
  light: {
    '--bg-color': colors.light.bg,
    '--bg-elevated': colors.light.bgElevated,
    '--surface-color': colors.light.surface,
    '--surface-hover': colors.light.surfaceHover,
    '--border-color': colors.light.border,
    '--border-strong': colors.light.borderStrong,
    '--text-primary': colors.light.textPrimary,
    '--text-secondary': colors.light.textSecondary,
    '--text-muted': colors.light.textMuted,
    '--accent-color': colors.brand.primary,
    '--accent-glow': colors.light.accentGlow,
    '--accent-glow-strong': colors.light.accentGlowStrong,
    '--title-gradient': colors.gradients.titleLight,
    '--btn-gradient': colors.gradients.buttonLight,
    '--nav-bg': colors.light.navBg,
    '--shadow-color': colors.light.shadow,
    '--shadow-tinted': colors.light.shadowTinted,
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
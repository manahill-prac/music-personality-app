/**
 * Archetype Visual Theme System
 *
 * Each archetype maps to a complete cinematic visual identity.
 * The theme drives: background atmosphere, glow colors, accent colors,
 * text gradients, border tints, and motion feeling.
 *
 * All values are raw CSS / Tailwind-compatible strings so they can be
 * applied inline or via className without a build step.
 */

export interface ArchetypeTheme {
  /** CSS background color for the page */
  pageBg: string
  /** Primary atmospheric glow — large, centered, very soft */
  glowPrimary: string
  /** Secondary glow — offset, creates depth */
  glowSecondary: string
  /** Tertiary glow — opposite corner, balances the field */
  glowTertiary: string
  /** Horizontal spectral haze behind the title */
  glowHaze: string
  /** Text shadow for the archetype title */
  titleShadow: string
  /** CSS gradient for the first word of the title */
  titleGradientLine1: string
  /** CSS gradient for the second word of the title */
  titleGradientLine2: string
  /** Accent color for labels, separators, small UI */
  accentColor: string
  /** Border tint for cards */
  cardBorder: string
  /** Card background */
  cardBg: string
  /** Trait pill border */
  traitBorder: string
  /** Trait pill text */
  traitText: string
  /** Trait pill background */
  traitBg: string
  /** Genre pill border */
  genreBorder: string
  /** Genre pill text */
  genreText: string
  /** Genre pill background */
  genreBg: string
  /** Progress bar gradient (Tailwind from-to classes) */
  barGradient: string
  /** CTA button gradient (Tailwind from-via-to classes) */
  ctaGradient: string
  /** CTA button shadow */
  ctaShadow: string
  /** Selection highlight color */
  selectionBg: string
}

const THEMES: Record<string, ArchetypeTheme> = {
  "midnight-dreamer": {
    pageBg: "#04061a",
    glowPrimary: "rgba(109,40,217,0.09)",   // violet-700
    glowSecondary: "rgba(217,70,239,0.07)",  // fuchsia-500
    glowTertiary: "rgba(34,211,238,0.05)",   // cyan-400
    glowHaze: "rgba(139,92,246,0.10)",       // violet-500
    titleShadow: "0 0 60px rgba(139,92,246,0.32), 0 0 130px rgba(217,70,239,0.12), 0 0 220px rgba(139,92,246,0.06)",
    titleGradientLine1: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(240,220,255,0.88) 100%)",
    titleGradientLine2: "linear-gradient(180deg, rgba(196,181,253,0.90) 0%, rgba(165,243,252,0.65) 100%)",
    accentColor: "text-violet-300/50",
    cardBorder: "border-violet-500/[0.12]",
    cardBg: "#080614",
    traitBorder: "border-violet-400/20",
    traitText: "text-violet-200/65",
    traitBg: "bg-violet-500/[0.08]",
    genreBorder: "border-violet-400/18",
    genreText: "text-violet-200/60",
    genreBg: "bg-violet-500/[0.07]",
    barGradient: "from-violet-500 to-cyan-500",
    ctaGradient: "from-violet-500 via-fuchsia-500 to-cyan-500",
    ctaShadow: "0_0_28px_rgba(139,92,246,0.40)",
    selectionBg: "selection:bg-violet-500/30",
  },

  "indie-philosopher": {
    pageBg: "#050f0a",
    glowPrimary: "rgba(52,211,153,0.07)",    // emerald-400
    glowSecondary: "rgba(20,184,166,0.06)",  // teal-500
    glowTertiary: "rgba(110,231,183,0.04)",  // emerald-300
    glowHaze: "rgba(52,211,153,0.08)",
    titleShadow: "0 0 60px rgba(52,211,153,0.25), 0 0 130px rgba(20,184,166,0.10)",
    titleGradientLine1: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(209,250,229,0.88) 100%)",
    titleGradientLine2: "linear-gradient(180deg, rgba(167,243,208,0.88) 0%, rgba(153,246,228,0.65) 100%)",
    accentColor: "text-emerald-300/50",
    cardBorder: "border-emerald-500/[0.12]",
    cardBg: "#060e09",
    traitBorder: "border-emerald-400/20",
    traitText: "text-emerald-200/65",
    traitBg: "bg-emerald-500/[0.08]",
    genreBorder: "border-teal-400/18",
    genreText: "text-teal-200/60",
    genreBg: "bg-teal-500/[0.07]",
    barGradient: "from-emerald-500 to-teal-500",
    ctaGradient: "from-emerald-500 via-teal-500 to-cyan-500",
    ctaShadow: "0_0_28px_rgba(52,211,153,0.35)",
    selectionBg: "selection:bg-emerald-500/30",
  },

  "hype-beast": {
    pageBg: "#0f0508",
    glowPrimary: "rgba(236,72,153,0.10)",    // pink-500
    glowSecondary: "rgba(249,115,22,0.08)",  // orange-500
    glowTertiary: "rgba(251,191,36,0.05)",   // amber-400
    glowHaze: "rgba(236,72,153,0.12)",
    titleShadow: "0 0 60px rgba(236,72,153,0.35), 0 0 130px rgba(249,115,22,0.15)",
    titleGradientLine1: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,228,230,0.90) 100%)",
    titleGradientLine2: "linear-gradient(180deg, rgba(253,186,116,0.90) 0%, rgba(251,113,133,0.70) 100%)",
    accentColor: "text-pink-300/50",
    cardBorder: "border-pink-500/[0.14]",
    cardBg: "#0d0508",
    traitBorder: "border-pink-400/22",
    traitText: "text-pink-200/65",
    traitBg: "bg-pink-500/[0.09]",
    genreBorder: "border-orange-400/20",
    genreText: "text-orange-200/60",
    genreBg: "bg-orange-500/[0.08]",
    barGradient: "from-pink-500 to-orange-400",
    ctaGradient: "from-pink-500 via-rose-500 to-orange-400",
    ctaShadow: "0_0_28px_rgba(236,72,153,0.45)",
    selectionBg: "selection:bg-pink-500/30",
  },

  "neon-romantic": {
    pageBg: "#0d0509",
    glowPrimary: "rgba(244,63,94,0.09)",     // rose-500
    glowSecondary: "rgba(217,70,239,0.07)",  // fuchsia-500
    glowTertiary: "rgba(251,113,133,0.05)",  // rose-400
    glowHaze: "rgba(244,63,94,0.10)",
    titleShadow: "0 0 60px rgba(244,63,94,0.30), 0 0 130px rgba(217,70,239,0.12)",
    titleGradientLine1: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,228,230,0.88) 100%)",
    titleGradientLine2: "linear-gradient(180deg, rgba(249,168,212,0.88) 0%, rgba(240,171,252,0.65) 100%)",
    accentColor: "text-rose-300/50",
    cardBorder: "border-rose-500/[0.12]",
    cardBg: "#0c0508",
    traitBorder: "border-rose-400/20",
    traitText: "text-rose-200/65",
    traitBg: "bg-rose-500/[0.08]",
    genreBorder: "border-fuchsia-400/18",
    genreText: "text-fuchsia-200/60",
    genreBg: "bg-fuchsia-500/[0.07]",
    barGradient: "from-rose-500 to-fuchsia-500",
    ctaGradient: "from-rose-500 via-fuchsia-500 to-pink-400",
    ctaShadow: "0_0_28px_rgba(244,63,94,0.40)",
    selectionBg: "selection:bg-rose-500/30",
  },

  "bedroom-poet": {
    pageBg: "#060510",
    glowPrimary: "rgba(99,102,241,0.09)",    // indigo-500
    glowSecondary: "rgba(139,92,246,0.07)",  // violet-500
    glowTertiary: "rgba(167,139,250,0.05)",  // violet-400
    glowHaze: "rgba(99,102,241,0.09)",
    titleShadow: "0 0 60px rgba(99,102,241,0.28), 0 0 130px rgba(139,92,246,0.10)",
    titleGradientLine1: "linear-gradient(180deg, rgba(255,255,255,0.93) 0%, rgba(224,231,255,0.86) 100%)",
    titleGradientLine2: "linear-gradient(180deg, rgba(196,181,253,0.86) 0%, rgba(167,139,250,0.62) 100%)",
    accentColor: "text-indigo-300/50",
    cardBorder: "border-indigo-500/[0.12]",
    cardBg: "#060510",
    traitBorder: "border-indigo-400/20",
    traitText: "text-indigo-200/65",
    traitBg: "bg-indigo-500/[0.08]",
    genreBorder: "border-violet-400/18",
    genreText: "text-violet-200/60",
    genreBg: "bg-violet-500/[0.07]",
    barGradient: "from-indigo-500 to-violet-500",
    ctaGradient: "from-indigo-500 via-violet-500 to-purple-500",
    ctaShadow: "0_0_28px_rgba(99,102,241,0.35)",
    selectionBg: "selection:bg-indigo-500/30",
  },

  "chaos-listener": {
    pageBg: "#040d0a",
    glowPrimary: "rgba(163,230,53,0.08)",    // lime-400
    glowSecondary: "rgba(34,211,238,0.07)",  // cyan-400
    glowTertiary: "rgba(74,222,128,0.05)",   // green-400
    glowHaze: "rgba(163,230,53,0.09)",
    titleShadow: "0 0 60px rgba(163,230,53,0.28), 0 0 130px rgba(34,211,238,0.12)",
    titleGradientLine1: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(236,252,203,0.88) 100%)",
    titleGradientLine2: "linear-gradient(180deg, rgba(167,243,208,0.88) 0%, rgba(103,232,249,0.65) 100%)",
    accentColor: "text-lime-300/50",
    cardBorder: "border-lime-500/[0.12]",
    cardBg: "#050d08",
    traitBorder: "border-lime-400/20",
    traitText: "text-lime-200/65",
    traitBg: "bg-lime-500/[0.08]",
    genreBorder: "border-cyan-400/18",
    genreText: "text-cyan-200/60",
    genreBg: "bg-cyan-500/[0.07]",
    barGradient: "from-lime-500 to-cyan-500",
    ctaGradient: "from-lime-500 via-cyan-500 to-teal-500",
    ctaShadow: "0_0_28px_rgba(163,230,53,0.35)",
    selectionBg: "selection:bg-lime-500/30",
  },

  "velvet-static": {
    pageBg: "#060608",
    glowPrimary: "rgba(100,116,139,0.08)",   // slate-500
    glowSecondary: "rgba(139,92,246,0.06)",  // violet-500
    glowTertiary: "rgba(148,163,184,0.04)",  // slate-400
    glowHaze: "rgba(100,116,139,0.08)",
    titleShadow: "0 0 60px rgba(100,116,139,0.25), 0 0 130px rgba(139,92,246,0.08)",
    titleGradientLine1: "linear-gradient(180deg, rgba(255,255,255,0.90) 0%, rgba(226,232,240,0.82) 100%)",
    titleGradientLine2: "linear-gradient(180deg, rgba(196,181,253,0.80) 0%, rgba(148,163,184,0.58) 100%)",
    accentColor: "text-slate-300/50",
    cardBorder: "border-slate-500/[0.12]",
    cardBg: "#060608",
    traitBorder: "border-slate-400/20",
    traitText: "text-slate-200/65",
    traitBg: "bg-slate-500/[0.08]",
    genreBorder: "border-violet-400/15",
    genreText: "text-violet-200/55",
    genreBg: "bg-violet-500/[0.06]",
    barGradient: "from-slate-500 to-violet-600",
    ctaGradient: "from-slate-500 via-violet-600 to-purple-600",
    ctaShadow: "0_0_28px_rgba(100,116,139,0.30)",
    selectionBg: "selection:bg-slate-500/30",
  },

  "lunar-introvert": {
    pageBg: "#040610",
    glowPrimary: "rgba(59,130,246,0.09)",    // blue-500
    glowSecondary: "rgba(139,92,246,0.07)",  // violet-500
    glowTertiary: "rgba(96,165,250,0.05)",   // blue-400
    glowHaze: "rgba(59,130,246,0.09)",
    titleShadow: "0 0 60px rgba(59,130,246,0.28), 0 0 130px rgba(139,92,246,0.10)",
    titleGradientLine1: "linear-gradient(180deg, rgba(255,255,255,0.93) 0%, rgba(219,234,254,0.86) 100%)",
    titleGradientLine2: "linear-gradient(180deg, rgba(196,181,253,0.86) 0%, rgba(147,197,253,0.62) 100%)",
    accentColor: "text-blue-300/50",
    cardBorder: "border-blue-500/[0.12]",
    cardBg: "#040610",
    traitBorder: "border-blue-400/20",
    traitText: "text-blue-200/65",
    traitBg: "bg-blue-500/[0.08]",
    genreBorder: "border-violet-400/18",
    genreText: "text-violet-200/60",
    genreBg: "bg-violet-500/[0.07]",
    barGradient: "from-blue-500 to-violet-500",
    ctaGradient: "from-blue-500 via-violet-500 to-indigo-500",
    ctaShadow: "0_0_28px_rgba(59,130,246,0.35)",
    selectionBg: "selection:bg-blue-500/30",
  },

  "sunset-runner": {
    pageBg: "#0d0800",
    glowPrimary: "rgba(249,115,22,0.10)",    // orange-500
    glowSecondary: "rgba(234,179,8,0.08)",   // yellow-500
    glowTertiary: "rgba(251,146,60,0.06)",   // orange-400
    glowHaze: "rgba(249,115,22,0.11)",
    titleShadow: "0 0 60px rgba(249,115,22,0.32), 0 0 130px rgba(234,179,8,0.14)",
    titleGradientLine1: "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(255,237,213,0.90) 100%)",
    titleGradientLine2: "linear-gradient(180deg, rgba(253,186,116,0.90) 0%, rgba(253,224,71,0.68) 100%)",
    accentColor: "text-orange-300/50",
    cardBorder: "border-orange-500/[0.14]",
    cardBg: "#0c0700",
    traitBorder: "border-orange-400/22",
    traitText: "text-orange-200/65",
    traitBg: "bg-orange-500/[0.09]",
    genreBorder: "border-yellow-400/20",
    genreText: "text-yellow-200/60",
    genreBg: "bg-yellow-500/[0.07]",
    barGradient: "from-orange-500 to-yellow-400",
    ctaGradient: "from-orange-500 via-amber-500 to-yellow-400",
    ctaShadow: "0_0_28px_rgba(249,115,22,0.45)",
    selectionBg: "selection:bg-orange-500/30",
  },

  "digital-melancholic": {
    pageBg: "#040510",
    glowPrimary: "rgba(109,40,217,0.10)",    // violet-700
    glowSecondary: "rgba(37,99,235,0.08)",   // blue-600
    glowTertiary: "rgba(139,92,246,0.05)",   // violet-500
    glowHaze: "rgba(109,40,217,0.10)",
    titleShadow: "0 0 60px rgba(109,40,217,0.30), 0 0 130px rgba(37,99,235,0.12)",
    titleGradientLine1: "linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(219,234,254,0.80) 100%)",
    titleGradientLine2: "linear-gradient(180deg, rgba(196,181,253,0.80) 0%, rgba(147,197,253,0.55) 100%)",
    accentColor: "text-violet-400/45",
    cardBorder: "border-violet-700/[0.14]",
    cardBg: "#040510",
    traitBorder: "border-violet-500/20",
    traitText: "text-violet-300/60",
    traitBg: "bg-violet-700/[0.09]",
    genreBorder: "border-blue-500/18",
    genreText: "text-blue-300/55",
    genreBg: "bg-blue-600/[0.07]",
    barGradient: "from-violet-600 to-blue-600",
    ctaGradient: "from-violet-600 via-blue-600 to-indigo-600",
    ctaShadow: "0_0_28px_rgba(109,40,217,0.38)",
    selectionBg: "selection:bg-violet-700/30",
  },

  "echo-heart": {
    pageBg: "#050a09",
    glowPrimary: "rgba(20,184,166,0.08)",    // teal-500
    glowSecondary: "rgba(244,63,94,0.07)",   // rose-500
    glowTertiary: "rgba(45,212,191,0.05)",   // teal-400
    glowHaze: "rgba(20,184,166,0.09)",
    titleShadow: "0 0 60px rgba(20,184,166,0.25), 0 0 130px rgba(244,63,94,0.10)",
    titleGradientLine1: "linear-gradient(180deg, rgba(255,255,255,0.93) 0%, rgba(204,251,241,0.86) 100%)",
    titleGradientLine2: "linear-gradient(180deg, rgba(253,164,175,0.86) 0%, rgba(153,246,228,0.62) 100%)",
    accentColor: "text-teal-300/50",
    cardBorder: "border-teal-500/[0.12]",
    cardBg: "#050a09",
    traitBorder: "border-teal-400/20",
    traitText: "text-teal-200/65",
    traitBg: "bg-teal-500/[0.08]",
    genreBorder: "border-rose-400/18",
    genreText: "text-rose-200/60",
    genreBg: "bg-rose-500/[0.07]",
    barGradient: "from-teal-500 to-rose-400",
    ctaGradient: "from-teal-500 via-cyan-500 to-rose-400",
    ctaShadow: "0_0_28px_rgba(20,184,166,0.35)",
    selectionBg: "selection:bg-teal-500/30",
  },

  "underground-oracle": {
    pageBg: "#060508",
    glowPrimary: "rgba(82,82,91,0.10)",      // zinc-600
    glowSecondary: "rgba(109,40,217,0.08)",  // violet-700
    glowTertiary: "rgba(113,113,122,0.05)",  // zinc-500
    glowHaze: "rgba(82,82,91,0.09)",
    titleShadow: "0 0 60px rgba(82,82,91,0.28), 0 0 130px rgba(109,40,217,0.10)",
    titleGradientLine1: "linear-gradient(180deg, rgba(255,255,255,0.90) 0%, rgba(244,244,245,0.82) 100%)",
    titleGradientLine2: "linear-gradient(180deg, rgba(196,181,253,0.80) 0%, rgba(161,161,170,0.58) 100%)",
    accentColor: "text-zinc-400/50",
    cardBorder: "border-zinc-600/[0.14]",
    cardBg: "#060508",
    traitBorder: "border-zinc-500/20",
    traitText: "text-zinc-300/65",
    traitBg: "bg-zinc-600/[0.09]",
    genreBorder: "border-violet-500/18",
    genreText: "text-violet-300/55",
    genreBg: "bg-violet-700/[0.07]",
    barGradient: "from-zinc-500 to-violet-700",
    ctaGradient: "from-zinc-600 via-violet-700 to-purple-700",
    ctaShadow: "0_0_28px_rgba(82,82,91,0.35)",
    selectionBg: "selection:bg-zinc-600/30",
  },
}

/** Fallback theme for unknown archetype IDs */
const DEFAULT_THEME = THEMES["midnight-dreamer"]

export function getArchetypeTheme(archetypeId: string): ArchetypeTheme {
  return THEMES[archetypeId] ?? DEFAULT_THEME
}

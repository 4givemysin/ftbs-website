/**
 * Design token reference for FTBS + BGW.
 * Source of truth for colors is app/globals.css (@theme inline).
 * Use these keys for documentation, CMS mapping, and future theming.
 */
export const designTokens = {
  colors: {
    background: "#ffffff",
    foreground: "#1a2332",
    brandNavy: "#1b2a4a",
    brandBlue: "#2e5a8b",
    brandGold: "#b8860b",
    bgwEarth: "#4a4035",
    bgwGreen: "#2d5a3d",
    surfaceAlt: "#f4f6f8",
    border: "#dde3ea",
  },
  spacing: {
    sectionY: "py-16 lg:py-24",
    containerX: "px-4 sm:px-6 lg:px-8",
    maxWidth: "max-w-7xl",
  },
  typography: {
    h1: "text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
    h2: "text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl",
    h3: "text-xl font-semibold sm:text-2xl",
    body: "text-base leading-relaxed",
    eyebrow: "text-sm font-semibold uppercase tracking-wider",
  },
  radius: {
    card: "rounded-lg",
    button: "rounded-md",
  },
} as const;

export type DivisionTheme = "ftbs" | "bgw";

export const divisionThemes: Record<
  DivisionTheme,
  { accent: string; badge: string }
> = {
  ftbs: {
    accent: "text-brand-blue",
    badge: "bg-brand-navy/10 text-brand-navy",
  },
  bgw: {
    accent: "text-bgw-green",
    badge: "bg-bgw-earth/10 text-bgw-earth",
  },
};

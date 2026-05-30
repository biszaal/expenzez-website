// Design tokens for the dark marketing site — shared with the app's look.
// Midnight Cobalt on deep navy (from the Claude Design handoff).
// Cobalt #4E7CFF is accent-only (<10% of screen); navy surfaces, never pure black.
export const W = {
  bg: "#0A1226",
  bg2: "#0D1630",
  card: "#10193A",
  cardHi: "#16224D",
  border: "rgba(180,200,255,0.09)",
  borderHi: "rgba(180,200,255,0.16)",
  text: "#EEF1FA",
  dim: "rgba(238,241,250,0.62)",
  faint: "rgba(238,241,250,0.38)",
  primary: "#4E7CFF",
  primaryDim: "#3559CC",
  primaryGlow: "rgba(78,124,255,0.35)",
  lime: "#5FE3A1",
  rose: "#FF6B7A",
  cyan: "#7DA0FF",
  mono: '"Geist Mono", ui-monospace, SFMono-Regular, monospace',
} as const;

export const MAXW = 1240;

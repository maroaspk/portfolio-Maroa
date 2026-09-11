import type { CSSProperties } from "react";

/**
 * Tiny colour helpers for per-project theming.
 * A project declares one `accent` hex; everything else is derived from it so the
 * page keeps the template's restraint: a barely-there background tint, accent
 * labels and rules, dark text everywhere else.
 */

const PAGE_LIGHT = "#fffefb";

export function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  const full = c.length === 3 ? c.split("").map((ch) => ch + ch).join("") : c;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** Mix `hex` into `base` by `t` (0–1). */
export function mix(hex: string, base: string, t: number): string {
  const a = hexToRgb(hex);
  const b = hexToRgb(base);
  const out = a.map((v, i) => Math.round(v * t + b[i] * (1 - t)));
  return `rgb(${out[0]},${out[1]},${out[2]})`;
}

export interface ProjectTheme {
  accent: string;
  /** Page background: the accent mixed very lightly into the template off-white. */
  background: string;
  /** Rule / divider colour. */
  rule: string;
  /** Soft surface for placeholders inside the themed page. */
  surface: string;
}

export function getProjectTheme(accent?: string): ProjectTheme | null {
  if (!accent) return null;
  return {
    accent,
    background: mix(accent, PAGE_LIGHT, 0.08),
    rule: rgba(accent, 0.35),
    surface: rgba(accent, 0.08),
  };
}

/**
 * CSS custom properties consumed by the project pages. Without an accent the
 * variables are absent and every `var(--project-…, fallback)` resolves to the
 * template defaults.
 */
export function projectThemeStyle(accent?: string): CSSProperties {
  const theme = getProjectTheme(accent);
  if (!theme) return {};
  return {
    "--project-accent": theme.accent,
    "--project-bg": theme.background,
    "--project-rule": theme.rule,
    "--project-surface": theme.surface,
  } as CSSProperties;
}

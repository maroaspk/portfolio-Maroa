import type { CSSProperties } from "react";
import manifest from "@/lib/image-manifest.json";
import { asset } from "@/lib/assets";

/**
 * Responsive image: serves WebP variants (640 / 1024 / 1600 px) generated at build
 * time from the originals, with the JPG as fallback. The browser picks the smallest
 * file that still fills the slot at the device's pixel density, so nothing looks soft.
 *
 * `sizes` describes how wide the image is laid out (CSS), e.g. "(min-width: 768px) 33vw, 100vw".
 */
const WIDTHS: Record<string, number[]> = manifest as Record<string, number[]>;

export function SmartImage({
  src,
  alt,
  sizes = "100vw",
  className = "",
  style,
  loading = "lazy",
  fetchPriority,
  draggable,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  draggable?: boolean;
}) {
  const widths = WIDTHS[src];
  const fallback = asset(src);
  // React 18 only forwards this attribute when written in lowercase.
  const priorityAttr = (fetchPriority ? { fetchpriority: fetchPriority } : {}) as Record<string, string>;

  if (!widths || widths.length === 0) {
    return (
      <img
        src={fallback}
        alt={alt}
        loading={loading}
        decoding="async"
        {...priorityAttr}
        draggable={draggable}
        className={className}
        style={style}
      />
    );
  }

  const base = src.replace(/\.[a-z0-9]+$/i, "");
  const srcSet = widths.map((w) => `${asset(`${base}-${w}.webp`)} ${w}w`).join(", ");

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        loading={loading}
        decoding="async"
        {...priorityAttr}
        draggable={draggable}
        className={className}
        style={style}
      />
    </picture>
  );
}

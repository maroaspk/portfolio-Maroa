import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { asset } from "@/lib/assets";

/**
 * Small editorial primitives shared by About, Projects, Certificates and Contact.
 * They only reuse the type scale, colours and easing already present in the template.
 */

export const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/** Fade-up on scroll — same motion as the home grid. */
export function FadeUp({
  children,
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Tiny uppercase label (matches the "404" / "Previous" labels of the template).
 * `tone="accent"` uses the current project accent (falls back to the muted default).
 */
export function Eyebrow({
  children,
  className = "",
  tone = "muted",
}: {
  children: ReactNode;
  className?: string;
  tone?: "muted" | "accent";
}) {
  return (
    <p
      className={`text-xs uppercase tracking-[3px] ${className}`}
      style={
        tone === "accent"
          ? { color: "var(--project-accent, var(--hero-paragraphs))", opacity: 0.9 }
          : { color: "var(--hero-paragraphs)", opacity: 0.6 }
      }
    >
      {children}
    </p>
  );
}

/** Page / section title, same scale as the About and 404 headings. */
export function SectionHeading({
  eyebrow,
  title,
  as: Tag = "h1",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow className="mb-6">{eyebrow}</Eyebrow>}
      <Tag
        className="text-4xl md:text-5xl"
        style={{ fontFamily: "'Host Grotesk', sans-serif", color: "var(--hero-dark)", lineHeight: 1.15 }}
      >
        {title}
      </Tag>
    </div>
  );
}

/** 1px rule using the template border colour. */
export function Rule({ className = "" }: { className?: string }) {
  return <div className={className} style={{ height: 1, backgroundColor: "var(--hero-border)" }} />;
}

/**
 * Discreet image placeholder for projects / certificates / portrait without imagery yet.
 * Warm off-white block with a faint label — no icons, no gradients.
 */
export function Placeholder({
  label = "Coming soon",
  aspectRatio = "4/5",
  className = "",
  style,
  logo,
  logoAlt = "",
}: {
  label?: string;
  aspectRatio?: string;
  className?: string;
  style?: CSSProperties;
  /** Optional mark shown instead of the label (e.g. a brand logo for a project without imagery). */
  logo?: string;
  logoAlt?: string;
}) {
  return (
    <div
      className={`w-full flex items-center justify-center ${className}`}
      style={{
        aspectRatio,
        backgroundColor: "rgba(18,18,17,0.04)",
        boxShadow: "inset 0 0 0 1px var(--hero-border)",
        ...style,
      }}
    >
      {logo ? (
        <img src={asset(logo)} alt={logoAlt} className="w-[28%] max-w-[160px] h-auto object-contain" loading="lazy" />
      ) : (
        <span
          className="text-[11px] uppercase tracking-[3px]"
          style={{ color: "var(--hero-dark)", opacity: 0.35 }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

/** Image if available, placeholder otherwise. Keeps the same aspect ratio either way. */
export function MediaOrPlaceholder({
  src,
  alt,
  aspectRatio,
  label,
  className = "",
  style,
  loading = "lazy",
  logo,
}: {
  src?: string;
  alt: string;
  aspectRatio: string;
  label?: string;
  className?: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
  /** Shown centred on the placeholder when there is no `src`. */
  logo?: string;
}) {
  if (!src) {
    return <Placeholder aspectRatio={aspectRatio} label={label} className={className} style={style} logo={logo} logoAlt={alt} />;
  }
  return (
    <img
      src={asset(src)}
      alt={alt}
      loading={loading}
      className={`w-full object-cover ${className}`}
      style={{ aspectRatio, ...style }}
    />
  );
}

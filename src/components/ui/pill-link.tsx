import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * The template's pill button ("Let's connect") as a reusable link.
 * Outline by default, fills with the dark colour on hover. `tone="accent"` uses the
 * current project accent instead of the dark colour.
 */
export function PillLink({
  to,
  href,
  children,
  external = false,
  tone = "dark",
  size = "md",
  className = "",
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  external?: boolean;
  tone?: "dark" | "accent";
  size?: "sm" | "md";
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const color = tone === "accent" ? "var(--project-accent, var(--hero-dark))" : "var(--hero-dark)";
  const style: React.CSSProperties = {
    color: hovered ? "var(--hero-light)" : color,
    boxShadow: hovered ? `inset 0 0 0 40px ${color}` : `inset 0 0 0 2px ${color}`,
    fontFamily: "'Host Grotesk', sans-serif",
    backgroundColor: "transparent",
    textDecoration: "none",
    display: "inline-block",
    transition: "all 0.3s ease",
  };
  const cls =
    (size === "sm"
      ? "rounded-full uppercase tracking-[1.85px] text-[13px] px-[26px] py-[13px] leading-[120%] font-medium cursor-pointer "
      : "rounded-full uppercase tracking-[1.85px] text-[15px] lg:text-[16px] px-[36px] py-[18px] lg:px-[40px] lg:py-[20px] leading-[120%] font-medium cursor-pointer ") +
    className;
  const hoverProps = { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) };

  if (to) {
    return (
      <Link to={to} className={cls} style={style} {...hoverProps}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cls}
      style={style}
      {...hoverProps}
    >
      {children}
    </a>
  );
}

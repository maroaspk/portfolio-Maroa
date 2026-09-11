import { useEffect, useRef } from "react";

/**
 * Custom cursor: a small dot that tracks the pointer exactly and a thin ring that
 * follows with a little inertia. Over links and buttons the ring opens up.
 * The colour is inherited from the element under the pointer, so project pages
 * automatically get their accent (via --project-accent).
 *
 * Only active with a fine pointer (mouse/trackpad); touch devices keep the native
 * behaviour. With prefers-reduced-motion the cursor still shows, but the ring tracks
 * the pointer exactly and transitions are disabled.
 */

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";
const DOT = 6;
const RING = 34;
const LERP = 0.18;

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const lerp = reduced ? 1 : LERP;
    document.documentElement.classList.add("has-custom-cursor");
    if (reduced) document.documentElement.classList.add("custom-cursor-reduced");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let visible = false;
    let hovering = false;
    let raf = 0;

    const setColor = (el: Element | null) => {
      const accent = el ? getComputedStyle(el).getPropertyValue("--project-accent").trim() : "";
      const color = accent || "var(--hero-dark)";
      dot.style.backgroundColor = color;
      ring.style.borderColor = color;
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        rx = x;
        ry = y;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      const target = e.target instanceof Element ? e.target : null;
      const interactive = !!target?.closest(INTERACTIVE);
      if (interactive !== hovering) {
        hovering = interactive;
        ring.style.width = ring.style.height = `${hovering ? RING * 1.6 : RING}px`;
        ring.style.opacity = hovering ? "0.9" : "0.55";
        dot.style.transform = `translate(-50%, -50%) scale(${hovering ? 0.5 : 1})`;
      }
      setColor(target);
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onDown = () => {
      ring.style.transform = "translate(-50%, -50%) scale(0.85)";
    };
    const onUp = () => {
      ring.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const tick = () => {
      rx += (x - rx) * lerp;
      ry += (y - ry) * lerp;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("has-custom-cursor", "custom-cursor-reduced");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="custom-cursor-dot"
        style={{ width: DOT, height: DOT, opacity: 0, transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="custom-cursor-ring"
        style={{ width: RING, height: RING, opacity: 0, transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}

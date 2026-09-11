import { useEffect, useRef, useCallback, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { ContactOverlay } from "./contact-overlay";
import { profile } from "@/lib/profile";
import { asset } from "@/lib/assets";
import { useI18n } from "@/lib/i18n";

// ---------------------------------------------------------------------------
// Image data — aspect ratios from original CDN, CSS offsets from source
// ---------------------------------------------------------------------------

interface HeroImage {
  id: number;
  w: number;
  h: number;
  top: string;
  left: string;
  /** Individual parallax magnitude in vw. null = no individual parallax */
  parallax: number | null;
  /** true = moves WITH grid direction at keyframe 0, false = moves OPPOSITE */
  parallaxPositive: boolean;
}

/** Hero collage — 12 images from Maroa's projects (files in /public/projects). */
const HERO_PHOTOS: string[] = [
  "/projects/health-day-1.jpg",
  "/projects/banco-sabadell-1.jpg",
  "/projects/lindt.jpg",
  "/projects/health-day-2.jpg",
  "/projects/neutrogena.jpg",
  "/projects/banco-sabadell-2.jpg",
  "/projects/orbit.jpg",
  "/projects/health-day-3.jpg",
  "/projects/sabesdepubli.jpg",
  "/projects/banco-sabadell-3.jpg",
  "/projects/misako/misako-poster.jpg",
  "/projects/misako/misako-popup.jpg",
];

const IMAGES: HeroImage[] = [
  { id: 1, w: 633, h: 944, top: "-5.4vw", left: "-7.6vw", parallax: 1, parallaxPositive: false },
  { id: 2, w: 705, h: 489, top: "7.1vw", left: "-6.8vw", parallax: null, parallaxPositive: true },
  { id: 3, w: 523, h: 781, top: "-7vw", left: "2vw", parallax: 2, parallaxPositive: false },
  { id: 4, w: 523, h: 784, top: "4.2vw", left: "-2.1vw", parallax: null, parallaxPositive: true },
  { id: 5, w: 523, h: 784, top: "-8.7vw", left: "-2.1vw", parallax: 4, parallaxPositive: true },
  { id: 6, w: 507, h: 761, top: "9.2vw", left: "-4.3vw", parallax: 2, parallaxPositive: true },
  { id: 7, w: 451, h: 676, top: "-11.1vw", left: "10.4vw", parallax: 2, parallaxPositive: true },
  { id: 8, w: 375, h: 563, top: "-3.7vw", left: "13.2vw", parallax: 5, parallaxPositive: true },
  { id: 9, w: 523, h: 784, top: "-9vw", left: "-10.6vw", parallax: null, parallaxPositive: true },
  { id: 10, w: 422, h: 632, top: "7.1vw", left: "1.8vw", parallax: 2, parallaxPositive: false },
  { id: 11, w: 523, h: 370, top: "-8.2vw", left: "0.7vw", parallax: 3, parallaxPositive: true },
  { id: 12, w: 423, h: 620, top: "5.4vw", left: "3.3vw", parallax: null, parallaxPositive: true },
];

// ---------------------------------------------------------------------------
// Lerp utility — replicates Webflow smoothing: 97 (factor = 0.03)
// ---------------------------------------------------------------------------

const LERP_FACTOR = 0.03;

function lerp(current: number, target: number): number {
  return current + (target - current) * LERP_FACTOR;
}

// ---------------------------------------------------------------------------
// Color interpolation for color-bg (mouse X driven)
// ---------------------------------------------------------------------------

// Pale cyan-blue tones (revealed behind the page while "Let's connect" is hovered).
const COLOR_STOPS = [
  { at: 0, r: 214, g: 236, b: 240 },
  { at: 33, r: 187, g: 225, b: 232 },
  { at: 66, r: 170, g: 217, b: 227 },
  { at: 100, r: 199, g: 231, b: 236 },
];

function interpolateColor(t: number): string {
  const pct = t * 100;
  let i = 0;
  for (; i < COLOR_STOPS.length - 1; i++) {
    if (pct <= COLOR_STOPS[i + 1].at) break;
  }
  const a = COLOR_STOPS[i];
  const b = COLOR_STOPS[Math.min(i + 1, COLOR_STOPS.length - 1)];
  const range = b.at - a.at || 1;
  const f = (pct - a.at) / range;
  const r = Math.round(a.r + (b.r - a.r) * f);
  const g = Math.round(a.g + (b.g - a.g) * f);
  const bl = Math.round(a.b + (b.b - a.b) * f);
  return `rgb(${r},${g},${bl})`;
}

// ---------------------------------------------------------------------------
// Placeholder component
// ---------------------------------------------------------------------------

function HeroImage({
  w,
  h,
  src,
  className,
  style,
}: {
  w: number;
  h: number;
  src: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="eager"
      className={`object-cover rounded-sm ${className ?? ""}`}
      style={{ aspectRatio: `${w}/${h}`, ...style, maxWidth: "none" }}
    />
  );
}

// ---------------------------------------------------------------------------
// HeroSection
// ---------------------------------------------------------------------------

export function HeroSection({ gridInView = false }: { gridInView?: boolean }) {
  const { t, L } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // ---- Mouse state (normalised 0-1, resting at 0.5) ----
  const mouseTarget = useRef({ x: 0.5, y: 0.5 });
  const mouseCurrent = useRef({ x: 0.5, y: 0.5 });

  // ---- Grid + individual image transforms (vw) ----
  const gridRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // ---- Grid intro animation state (a-18: opacity 0→1, scale 0.8→1, 800ms delay, 1400ms ease) ----
  const introStartTime = useRef<number | null>(null);
  const introScale = useRef(0.8);
  const introOpacity = useRef(0);
  const introDone = useRef(false);

  // ---- Color-bg ----
  const [buttonHovered, setButtonHovered] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const colorBgRef = useRef<HTMLDivElement>(null);

  // ---- Scroll-based parallax ----
  // Original Webflow event e-2 config (line 20146):
  //   smoothing: 97, startsEntering: false, startsExiting: false
  //   Progress 0% = section top at viewport top
  //   Progress 100% = section bottom at viewport bottom
  //   smoothing: 97 = heavy lerp on scroll progress (same as mouse parallax)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Apply smoothing: 97 equivalent — heavy spring that prevents instant jumps
  // (e.g. on page load with scroll restoration)
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 20,
    restDelta: 0.0001,
  });

  const imgY = useTransform(smoothProgress, [0, 1], ["0%", "-250%"]);
  const imgScale = useTransform(smoothProgress, [0, 1], [1, 1.3]);
  const imgBlur = useTransform(smoothProgress, [0, 1], [0, 30]);
  const imgOpacity = useTransform(smoothProgress, [0, 1], [1, 0]);
  const filterBlur = useMotionTemplate`blur(${imgBlur}px)`;

  // ---- Mouse tracking (page-level, replicating Webflow's PAGE MOUSE_MOVE) ----
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseTarget.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    // Skip mouse parallax on touch/coarse-pointer devices — saves battery and rAF work.
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mql.matches) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // ---- RAF lerp loop for mouse parallax + grid intro ----
  useEffect(() => {
    function tick(timestamp: number) {
      // ---- Grid intro animation (a-18): 800ms delay, 1400ms ease ----
      if (!introDone.current) {
        if (introStartTime.current === null) {
          introStartTime.current = timestamp;
        }
        const elapsed = timestamp - introStartTime.current;
        const DELAY = 800;
        const DURATION = 1400;

        if (elapsed < DELAY) {
          introScale.current = 0.8;
          introOpacity.current = 0;
        } else {
          const t = Math.min((elapsed - DELAY) / DURATION, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          introScale.current = 0.8 + 0.2 * eased;
          introOpacity.current = eased;
          if (t >= 1) introDone.current = true;
        }
      }

      // ---- Mouse parallax lerp ----
      const prev = mouseCurrent.current;
      const target = mouseTarget.current;

      const nx = lerp(prev.x, target.x);
      const ny = lerp(prev.y, target.y);
      mouseCurrent.current = { x: nx, y: ny };

      // Grid: maps [0,1] -> [+20, -20] vw
      const gridX = 20 - nx * 40;
      const gridY = 20 - ny * 40;

      // Combine intro scale + mouse translate on the SAME element (matches original)
      if (gridRef.current) {
        const s = introScale.current;
        gridRef.current.style.transform = `translate3d(${gridX}vw, ${gridY}vw, 0px) scale3d(${s}, ${s}, 1)`;
        gridRef.current.style.opacity = String(introOpacity.current);
      }

      // Individual images
      imgRefs.current.forEach((el, id) => {
        const img = IMAGES.find((i) => i.id === id);
        if (!img || img.parallax === null) return;

        const mag = img.parallax;
        const sign = img.parallaxPositive ? 1 : -1;

        // At mouse 0 (left/top): positive images get +mag, negative get -mag
        // At mouse 1 (right/bottom): positive images get -mag, negative get +mag
        const ix = sign * (mag - nx * mag * 2);
        const iy = sign * (mag - ny * mag * 2);

        el.style.transform = `translate3d(${ix}vw, ${iy}vw, 0)`;
      });

      // Color-bg color (mouse X driven)
      if (colorBgRef.current) {
        colorBgRef.current.style.backgroundColor = interpolateColor(nx);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ---- Ref callback for individual images ----
  const setImgRef = useCallback((id: number) => (el: HTMLDivElement | null) => {
    if (el) imgRefs.current.set(id, el);
    else imgRefs.current.delete(id);
  }, []);

  return (
    <>
      {/* color-bg: fixed at body level, z:-10, behind page background.
          Original: position fixed, inset 0%, z-index -10 */}
      <div
        ref={colorBgRef}
        className="fixed inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          zIndex: -10,
          opacity: buttonHovered ? 1 : 0,
          backgroundColor: "rgb(187,225,232)",
          pointerEvents: "none",
        }}
      />

      {/* Hero section — 250vh tall */}
      <div
        ref={sectionRef}
        className="relative"
        style={{ height: "250vh" }}
      >
        {/* Sticky viewport */}
        <div
          className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden"
          style={{ perspective: "1000px" }}
        >
          {/* ---- 1. Text content layer (z-200) — DOM order matches original ---- */}
          <div className="relative z-[200] flex flex-col justify-start items-center text-center px-[7%] md:px-0">
            {/* Logo reveal — height 0 -> auto */}
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ delay: 0.1, duration: 0.7, ease: "easeInOut" }}
            >
              {/* Logo placeholder — 4.23:1 aspect ratio */}
              <div className="w-[90vw] max-w-[90vw] lg:max-w-[800px] flex items-center justify-center py-[2vw]">
                <h1
                  className="text-[clamp(2rem,6.5vw,4.5rem)] font-medium uppercase tracking-[0.02em] leading-[1.05] text-balance"
                  style={{
                    color: "var(--hero-dark)",
                    fontFamily: "'Host Grotesk', sans-serif",
                  }}
                >
                  {profile.name}
                </h1>
              </div>
            </motion.div>

            {/* Subtitle + CTA — hero-overflow-c
                 Intro: height 0→auto (700ms ease)
                 a-7: grid enters view → height auto→0 (700ms ease) — collapses
                 a-5: grid leaves view → height 0→auto (700ms ease) — reveals
                 Source: lines 28227-28303, trigger: er() line 12683 */}
            <motion.div
              className="flex flex-col justify-start items-center overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: gridInView ? 0 : "auto" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Decorative line */}
              <div
                className="flex items-center justify-center mt-[18px] mb-[26px] md:mb-[30px] lg:mb-[38px]"
                style={{
                  width: 54,
                  height: 1,
                  backgroundColor: "var(--hero-border)",
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 1,
                    backgroundColor: "var(--hero-dark)",
                  }}
                />
              </div>

              {/* Subtitle */}
              <h5
                className="uppercase mb-[26px] md:mb-[30px] lg:mb-[36px] max-w-[390px] md:max-w-[450px] lg:max-w-[490px] text-[19px] md:text-[20px] lg:text-[24px] font-medium leading-[132%]"
                style={{
                  color: "var(--hero-dark)",
                  fontFamily: "'Host Grotesk', sans-serif",
                }}
              >
                {L(profile.tagline)}
              </h5>

              {/* One-line intro */}
              {profile.heroLine && (
                <p
                  className="mb-[26px] md:mb-[30px] lg:mb-[36px] -mt-[10px] md:-mt-[12px] max-w-[390px] md:max-w-[450px] text-[15px] md:text-[16px] leading-[160%]"
                  style={{ color: "var(--hero-paragraphs)", fontFamily: "'Host Grotesk', sans-serif" }}
                >
                  {L(profile.heroLine)}
                </p>
              )}

              {/* Button */}
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="rounded-full uppercase tracking-[1.85px] text-[15px] lg:text-[16px] px-[36px] py-[18px] lg:px-[40px] lg:py-[20px] leading-[120%] font-medium transition-all duration-300 cursor-pointer"
                style={{
                  color: buttonHovered ? "var(--hero-light)" : "var(--hero-dark)",
                  boxShadow: buttonHovered
                    ? "inset 0 0 0 40px var(--hero-dark)"
                    : "inset 0 0 0 2px var(--hero-dark)",
                  fontFamily: "'Host Grotesk', sans-serif",
                  backgroundColor: "transparent",
                  border: "none",
                  textDecoration: "none",
                  display: "inline-block",
                }}
                onMouseEnter={() => setButtonHovered(true)}
                onMouseLeave={() => setButtonHovered(false)}
              >
                {t("hero.cta")}
              </button>
            </motion.div>
          </div>

          {/* ---- 2. block-img-hero: absolute inset-0, flex col center ---- */}
          <motion.div
            className="absolute inset-0 z-0 flex flex-col items-center justify-center"
            style={{
              y: imgY,
              scale: imgScale,
              opacity: imgOpacity,
              filter: filterBlur,
              transformStyle: "preserve-3d",
              willChange: "opacity, filter, transform",
            }}
          >
            {/* grid-img-hero: scale + translate combined on same element (matches original a-18)
                Desktop: gap 10vw, images 20vw
                ≤991px:  gap 15vw, images 30vw
                ≤479px:  gap 15vw, images 40vw
                Tailwind is mobile-first, so base=479, md=768, lg=992 */}
              <div
                ref={gridRef}
                className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-[15vw] lg:gap-[10vw] absolute"
                style={{
                  gridTemplateRows: "auto auto",
                  gridAutoColumns: "1fr",
                  placeItems: "center stretch",
                  opacity: 0,
                  transform: "translate3d(0,0,0) scale3d(0.8, 0.8, 1)",
                  willChange: "transform, opacity",
                }}
              >
                {IMAGES.map((img) => (
                  <div
                    key={img.id}
                    ref={setImgRef(img.id)}
                    className="will-change-transform"
                    style={{ transform: "translate3d(0,0,0)" }}
                  >
                    <HeroImage
                      w={img.w}
                      h={img.h}
                      src={asset(HERO_PHOTOS[img.id - 1])}
                      className="w-[40vw] md:w-[30vw] lg:w-[20vw]"
                      style={{
                        maxWidth: "none",
                        position: "relative",
                        top: img.top,
                        left: img.left,
                      }}
                    />
                  </div>
                ))}
              </div>
          </motion.div>

          {/* ---- 3. Scroll indicator (z-50, bottom) ----
               a-12: grid enters view → height auto→0 (400ms ease)
               a-13: grid leaves view → height 0→auto (400ms ease) */}
          <motion.div
            className="absolute bottom-[30px] z-50 flex flex-col justify-end items-center overflow-hidden"
            initial={{ opacity: 0, height: "auto" }}
            animate={{
              opacity: gridInView ? 0 : 1,
              height: gridInView ? 0 : "auto",
            }}
            transition={{
              opacity: { duration: gridInView ? 0.4 : 0.7, delay: gridInView ? 0 : 0.1, ease: "easeOut" },
              height: { duration: 0.4, ease: "easeInOut" },
            }}
          >
            {/* Scroll line container */}
            <div
              className="overflow-hidden"
              style={{
                width: 1,
                height: 26,
                backgroundColor: "var(--hero-border)",
              }}
            >
              {/* Animated line — looping slide-through */}
              <motion.div
                style={{
                  width: 1,
                  height: 26,
                  backgroundColor: "var(--hero-dark)",
                }}
                animate={{
                  y: ["-100%", "-100%", "100%", "-120%"],
                }}
                transition={{
                  duration: 2.1,
                  times: [0, 0.33, 0.66, 0.67],
                  ease: ["easeInOut", "easeInOut", "easeInOut", "linear"],
                  repeat: Infinity,
                  repeatDelay: 0,
                }}
              />
            </div>

            {/* Scroll text with pulsing opacity */}
            <motion.span
              className="mt-3 text-[13px] uppercase font-medium leading-[120%]"
              style={{
                letterSpacing: "1.85px",
                fontFamily: "'Host Grotesk', sans-serif",
              }}
              animate={{
                color: [
                  "rgba(18,18,17,0.4)",
                  "rgba(18,18,17,0.4)",
                  "rgba(18,18,17,1)",
                  "rgba(18,18,17,0.4)",
                ],
              }}
              transition={{
                duration: 2.1,
                times: [0, 0.33, 0.66, 0.67],
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              {t("hero.scroll")}
            </motion.span>
          </motion.div>
        </div>
      </div>
      <ContactOverlay open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

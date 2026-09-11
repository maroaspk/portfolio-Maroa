import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/ui/site-header";
import { Eyebrow } from "@/components/ui/editorial";
import { getProjectBySlug } from "@/lib/projects";
import { projectThemeStyle } from "@/lib/color";
import { asset } from "@/lib/assets";
import { useI18n } from "@/lib/i18n";

/**
 * Read-only document viewer. Pages are pre-rendered, watermarked images (no PDF is
 * served), text cannot be selected or copied, and dragging / right-click are disabled.
 * Screenshots cannot be prevented by any website, so this is deterrence, not DRM.
 */
const DocumentReader = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, L } = useI18n();
  const project = getProjectBySlug(slug || "");
  const doc = project?.document;
  const [current, setCurrent] = useState(1);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pages = useMemo(() => (doc ? Array.from({ length: doc.pages }, (_, i) => i + 1) : []), [doc]);

  // Track the page nearest the viewport centre for the counter.
  useEffect(() => {
    if (!doc) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setCurrent(Number((visible.target as HTMLElement).dataset.page));
      },
      { threshold: [0.3, 0.6] },
    );
    pageRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [doc]);

  // Block the shortcuts people reach for first (save, print, select all).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ["s", "p", "a", "c"].includes(e.key.toLowerCase())) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!project || !doc) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--hero-light)", fontFamily: "'Host Grotesk', sans-serif" }}>
        <SiteHeader />
        <div className="text-center">
          <h1 className="text-2xl mb-4" style={{ color: "var(--hero-dark)" }}>
            {t("reader.notFound")}
          </h1>
          <Link to="/projects" className="underline" style={{ color: "var(--hero-paragraphs)" }}>
            {t("project.back")}
          </Link>
        </div>
      </div>
    );
  }

  const docTitle = L(doc.title) ?? L(project.title) ?? "";
  const pageBase = (n: number) => `${doc.path}/page-${String(n).padStart(3, "0")}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen select-none"
      style={{
        ...projectThemeStyle(project.accent),
        backgroundColor: "var(--project-bg, var(--hero-light))",
        fontFamily: "'Host Grotesk', sans-serif",
        color: "var(--hero-paragraphs)",
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <SiteHeader />

      <div className="px-6 md:px-12 lg:px-20 pt-28 pb-16 max-w-4xl mx-auto">
        {/* Title bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[2px] hover:opacity-70 transition-opacity mb-6"
              style={{ color: "var(--project-accent, var(--hero-dark))" }}
            >
              <ArrowLeft size={14} /> {t("reader.back")}
            </Link>
            <h1 className="text-3xl md:text-4xl" style={{ color: "var(--hero-dark)", lineHeight: 1.15 }}>
              {docTitle}
            </h1>
            <p className="text-sm mt-3" style={{ maxWidth: 520 }}>
              {L(doc.note) ?? t("reader.note")}
            </p>
          </div>
          <Eyebrow tone="accent" className="whitespace-nowrap md:pb-2">
            {t("reader.page")} {current} / {doc.pages}
          </Eyebrow>
        </div>

        {/* Pages */}
        <div className="flex flex-col gap-6">
          {pages.map((n, i) => (
            <div
              key={n}
              data-page={n}
              ref={(el) => {
                pageRefs.current[i] = el;
              }}
              className="w-full"
              style={{ boxShadow: "0 1px 0 var(--project-rule, var(--hero-border)), 0 0 0 1px var(--project-rule, var(--hero-border))" }}
            >
              <picture>
                <source type="image/webp" srcSet={asset(`${pageBase(n)}.webp`)} />
                <img
                  src={asset(`${pageBase(n)}.jpg`)}
                  alt={`${docTitle} — ${t("reader.page").toLowerCase()} ${n}`}
                  loading={n <= 2 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className="w-full h-auto block pointer-events-none"
                  style={{ aspectRatio: `${doc.w ?? 1200}/${doc.h ?? 849}` }}
                />
              </picture>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs uppercase tracking-[2px]" style={{ opacity: 0.5 }}>
          © {new Date().getFullYear()} {doc.authors ?? "Maroa González Rosdevall"} · {t("reader.rights")}
        </p>
      </div>
    </motion.div>
  );
};

export default DocumentReader;

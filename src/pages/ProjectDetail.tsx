import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { Eyebrow, FadeUp, MediaOrPlaceholder } from "@/components/ui/editorial";
import { getProjectBySlug, getAdjacentProjects, getProjectRatio, getGalleryItemId, type GalleryItem } from "@/lib/projects";
import { profile } from "@/lib/profile";
import { projectThemeStyle } from "@/lib/color";
import { asset } from "@/lib/assets";

/**
 * Project detail — keeps the template's split layout (sticky image left, copy right).
 * Everything is optional in the data, so missing fields simply don't render.
 */

const RULE = "1px solid var(--project-rule, var(--hero-border))";
const LABEL_STYLE = { color: "var(--project-accent, var(--hero-paragraphs))", opacity: 0.85 } as const;

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-6 py-4" style={{ borderBottom: RULE }}>
      <dt className="text-xs uppercase tracking-[2px] pt-0.5" style={LABEL_STYLE}>
        {label}
      </dt>
      <dd style={{ color: "var(--hero-dark)" }}>{value}</dd>
    </div>
  );
}

/**
 * Brand index for galleries: logo (or typographic wordmark) per item.
 * Clicking swaps the main image and scrolls to that item's explanation.
 */
function BrandIndex({
  items,
  activeId,
  onSelect,
}: {
  items: GalleryItem[];
  activeId: string | null;
  onSelect: (item: GalleryItem, id: string) => void;
}) {
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});
  return (
    <div className="flex flex-wrap items-center gap-x-10 gap-y-4 py-6" style={{ borderBottom: RULE }}>
      {items.map((item, i) => {
        const id = getGalleryItemId(item, i);
        const isActive = activeId === id;
        const showLogo = item.logo && !failedLogos[id];
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(item, id)}
            aria-label={`View the ${item.title ?? ""} analogy`}
            className="transition-opacity hover:opacity-100"
            style={{ opacity: isActive ? 1 : 0.55, color: "var(--hero-dark)" }}
          >
            {showLogo ? (
              <img
                src={asset(item.logo)}
                alt={item.title ?? ""}
                className="h-7 md:h-8 w-auto max-w-[150px] object-contain transition-[filter] duration-300"
                style={{ filter: isActive ? "none" : "grayscale(1)" }}
                onError={() => setFailedLogos((f) => ({ ...f, [id]: true }))}
              />
            ) : (
              <span className="text-xl md:text-2xl tracking-[0.02em]" style={{ fontFamily: "'Host Grotesk', sans-serif" }}>
                {item.title}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || "");
  const { prev, next } = getAdjacentProjects(slug || "");
  const [activeImage, setActiveImage] = useState<string | undefined>(undefined);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Reset the selected analogy when navigating between projects.
  useEffect(() => {
    setActiveImage(undefined);
    setActiveId(null);
  }, [slug]);

  const handleSelect = (item: GalleryItem, id: string) => {
    setActiveImage(item.src);
    setActiveId(id);
    document.getElementById(`gallery-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!project) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--hero-light)", fontFamily: "'Host Grotesk', sans-serif" }}
      >
        <SiteHeader />
        <div className="text-center">
          <h1 className="text-2xl mb-4" style={{ color: "var(--hero-dark)" }}>
            Project not found
          </h1>
          <Link to="/projects" className="underline" style={{ color: "var(--hero-paragraphs)" }}>
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const { w, h } = getProjectRatio(project);
  const meta = [project.category, project.year].filter(Boolean).join(" · ");
  const paragraphs = Array.isArray(project.description)
    ? project.description
    : project.description
      ? [project.description]
      : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
      style={{
        ...projectThemeStyle(project.accent),
        backgroundColor: "var(--project-bg, var(--hero-light))",
        transition: "background-color 0.6s ease",
        fontFamily: "'Host Grotesk', sans-serif",
        color: "var(--hero-paragraphs)",
      }}
    >
      <SiteHeader />

      {/* Close / back on mobile */}
      <div className="absolute top-6 right-6 z-10 md:hidden">
        <Link to="/projects" aria-label="Back to projects" className="hover:opacity-60 transition-opacity" style={{ color: "var(--hero-dark)" }}>
          <X size={28} strokeWidth={1.5} />
        </Link>
      </div>

      {/* Split layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left: main image */}
        <div className="w-full md:w-1/2 md:h-screen md:sticky md:top-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full h-[50vh] md:h-full"
          >
            <MediaOrPlaceholder
              key={activeImage ?? project.image}
              src={activeImage ?? project.image}
              alt={project.title}
              aspectRatio={`${w}/${h}`}
              label={project.audio ? "Audio" : "Project image"}
              logo={project.logo}
              className="h-full"
              style={{ aspectRatio: "auto", height: "100%", backgroundColor: "var(--project-surface, rgba(18,18,17,0.04))" }}
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Right: copy */}
        <div className="w-full md:w-1/2 flex flex-col justify-between px-8 md:px-14 lg:px-20 py-12 md:py-16 md:pt-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Eyebrow className="mb-6" tone="accent">{meta}</Eyebrow>
            <h1 className="text-3xl md:text-4xl mb-6" style={{ color: "var(--hero-dark)", lineHeight: 1.15 }}>
              {project.title}
            </h1>

            {project.award && (
              <p
                className="inline-flex items-center gap-3 mb-8 text-xs uppercase tracking-[2px]"
                style={{ color: "var(--project-accent, var(--hero-red))" }}
              >
                <span aria-hidden="true" style={{ display: "inline-block", width: 12, height: 1, backgroundColor: "currentColor" }} />
                <span>
                  Awarded · {project.award}
                  {project.awardCertificate && (
                    <>
                      {" · "}
                      <a
                        href={asset(project.awardCertificate)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-70 transition-opacity"
                      >
                        View certificate
                      </a>
                    </>
                  )}
                </span>
              </p>
            )}

            {paragraphs.length > 0 && (
              <div className="flex flex-col gap-4 text-sm leading-relaxed mb-12" style={{ maxWidth: 460 }}>
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {/* Brand index (e.g. one analogy per brand) */}
            {project.brandIndex && project.gallery && project.gallery.length > 0 && (
              <div className="mb-12" style={{ borderTop: RULE }}>
                <Eyebrow className="pt-6" tone="accent">Select a brand</Eyebrow>
                <BrandIndex items={project.gallery} activeId={activeId} onSelect={handleSelect} />
              </div>
            )}

            {/* Facts */}
            <dl className="text-sm" style={{ borderTop: RULE }}>
              {project.role && <Fact label="Role" value={project.role} />}
              {project.context && <Fact label="Context" value={project.context} />}
              {(project.period || project.year) && <Fact label="Date" value={project.period ?? project.year!} />}
              {project.tools && project.tools.length > 0 && <Fact label="Tools" value={project.tools.join(", ")} />}
            </dl>

            {/* Optional audio (e.g. radio ad) */}
            {project.audio && (
              <div className="mt-12">
                <Eyebrow className="mb-4" tone="accent">Listen</Eyebrow>
                <audio controls preload="metadata" src={asset(project.audio)} className="w-full" style={{ maxWidth: 460 }}>
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            {/* Optional gallery with captions */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="mt-14 flex flex-col gap-12">
                {project.gallery.map((item, i) => (
                  <FadeUp key={item.src} delay={0.05}>
                    <div id={`gallery-${getGalleryItemId(item, i)}`} style={{ scrollMarginTop: 96 }} />
                    <img src={asset(item.src)} alt={item.title ?? `${project.title} — ${i + 1}`} loading="lazy" className="w-full object-cover" />
                    {(item.title || item.caption) && (
                      <div className="mt-4" style={{ maxWidth: 460 }}>
                        {item.title && (
                          <p className="text-sm mb-2" style={{ color: "var(--hero-dark)" }}>
                            {item.title}
                          </p>
                        )}
                        {item.caption && <p className="text-sm leading-relaxed">{item.caption}</p>}
                      </div>
                    )}
                  </FadeUp>
                ))}
              </div>
            )}

            <p className="mt-14 text-sm">
              Interested in this project?{" "}
              <a
                href={`mailto:${profile.contact.email}`}
                className="underline hover:opacity-70 transition-opacity"
                style={{ color: "var(--hero-dark)", textDecorationColor: "var(--project-accent, currentColor)" }}
              >
                Get in touch
              </a>
              .
            </p>
          </motion.div>

          {/* Prev / Next */}
          <div className="mt-16 pt-8 flex justify-between items-center gap-6" style={{ borderTop: RULE }}>
            {prev ? (
              <Link
                to={`/projects/${prev.slug}`}
                className="inline-flex items-center gap-3 text-sm tracking-wide hover:opacity-70 transition-opacity group"
              >
                <ArrowLeft size={16} className="shrink-0 group-hover:-translate-x-1 transition-transform" />
                <span>
                  <span className="block text-xs uppercase tracking-widest mb-1" style={LABEL_STYLE}>Previous</span>
                  <span style={{ color: "var(--hero-dark)" }}>{prev.title}</span>
                </span>
              </Link>
            ) : (
              <Link to="/projects" className="text-sm underline hover:opacity-70 transition-opacity" style={{ color: "var(--hero-dark)" }}>
                All projects
              </Link>
            )}
            {next ? (
              <Link
                to={`/projects/${next.slug}`}
                className="inline-flex items-center gap-3 text-sm tracking-wide hover:opacity-70 transition-opacity text-right group"
              >
                <span>
                  <span className="block text-xs uppercase tracking-widest mb-1" style={LABEL_STYLE}>Next</span>
                  <span style={{ color: "var(--hero-dark)" }}>{next.title}</span>
                </span>
                <ArrowRight size={16} className="shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
    </motion.div>
  );
};

export default ProjectDetail;

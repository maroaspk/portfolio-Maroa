import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getProjectRatio, type Project } from "@/lib/projects";
import { MediaOrPlaceholder, EASE } from "./editorial";
import { projectThemeStyle } from "@/lib/color";
import { useI18n } from "@/lib/i18n";

/**
 * Three-column editorial grid, generalised from the template's photo grid.
 * Items are distributed round-robin so adding projects never requires touching the layout.
 */

const COLUMNS = 3;

function FadeUpOnScroll({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0, margin: "100% 0px 100% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { t, L } = useI18n();
  const { w, h } = getProjectRatio(project);
  const title = L(project.title) ?? "";
  const media = (
    <MediaOrPlaceholder
      src={project.image}
      alt={title}
      aspectRatio={`${w}/${h}`}
      label={project.audio ? t("project.audio") : undefined}
      logo={project.logo}
      sizes="(min-width: 1024px) 415px, (min-width: 768px) 50vw, 100vw"
      className="hover:opacity-90 transition-opacity duration-300"
      style={{ maxWidth: 415 }}
    />
  );

  const caption = (
    <div className="mt-4 text-sm leading-snug" style={{ maxWidth: 415 }}>
      {project.award && (
        <p className="mb-2 text-[11px] uppercase tracking-[2px]" style={{ color: "var(--project-accent, var(--hero-red))" }}>
          {t("project.awarded")}
        </p>
      )}
      <p style={{ color: "var(--hero-dark)" }}>{title}</p>
      {/* Category label picks up the project accent on hover */}
      <p
        className="mt-1 text-xs uppercase tracking-[2px] transition-colors duration-300 group-hover:text-(--project-accent)"
        style={{ opacity: 0.55 }}
      >
        {L(project.category)}
        {project.year ? ` · ${project.year}` : ""}
      </p>
    </div>
  );

  if (project.placeholder) {
    return (
      <div className="block" aria-label={title}>
        {media}
        {caption}
      </div>
    );
  }

  return (
    <Link to={`/projects/${project.slug}`} className="block group" style={projectThemeStyle(project.accent)}>
      {media}
      {caption}
    </Link>
  );
}

function ProjectColumn({ items, startDelay }: { items: Project[]; startDelay: number }) {
  return (
    <div
      className="flex flex-col w-full md:w-1/2 lg:w-1/3"
      style={{ gap: 40, paddingLeft: 20, paddingRight: 20, position: "relative", minHeight: 1 }}
    >
      {items.map((p, i) => (
        <FadeUpOnScroll key={p.slug} delay={i % 2 === 0 ? startDelay : startDelay + 0.1}>
          <ProjectCard project={p} />
        </FadeUpOnScroll>
      ))}
    </div>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const columns: Project[][] = Array.from({ length: COLUMNS }, () => []);
  projects.forEach((p, i) => columns[i % COLUMNS].push(p));
  const delays = [0.2, 0.3, 0.2];

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        maxWidth: 1365,
        margin: "0 auto",
        position: "relative",
      }}
    >
      <div className="flex flex-col md:flex-row" style={{ maxWidth: "100%", width: "100%" }}>
        {columns.map((items, i) => (
          <ProjectColumn key={i} items={items} startDelay={delays[i]} />
        ))}
      </div>
    </section>
  );
}

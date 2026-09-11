import { useRef } from "react";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/ui/hero-section";
import { ProjectGrid } from "@/components/ui/project-grid";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { FadeUp, SectionHeading } from "@/components/ui/editorial";
import { getFeaturedProjects } from "@/lib/projects";
import { useI18n } from "@/lib/i18n";

const Index = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { margin: "100% 0px 100% 0px" });
  const { t } = useI18n();

  return (
    <div
      className="min-h-screen"
      style={{
        color: "var(--hero-paragraphs)",
        fontFamily: "'Host Grotesk', sans-serif",
        fontSize: 18,
        lineHeight: "170%",
        letterSpacing: "0.35px",
      }}
    >
      <SiteHeader />
      <HeroSection gridInView={gridInView} />

      <div ref={gridRef} className="w-full" style={{ maxWidth: 1365, margin: "4vw auto 0" }}>
        <FadeUp className="px-5 mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading as="h2" eyebrow={t("home.eyebrow")} title={t("home.title")} />
          <Link
            to="/projects"
            className="text-sm underline hover:opacity-70 transition-opacity md:mb-2"
            style={{ color: "var(--hero-dark)" }}
          >
            {t("home.viewAll")}
          </Link>
        </FadeUp>
        <ProjectGrid projects={getFeaturedProjects()} />
      </div>

      <SiteFooter />
    </div>
  );
};

export default Index;

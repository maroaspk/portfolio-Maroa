import { PageLayout } from "@/components/ui/page-layout";
import { ProjectGrid } from "@/components/ui/project-grid";
import { FadeUp, SectionHeading } from "@/components/ui/editorial";
import { projects } from "@/lib/projects";
import { useI18n } from "@/lib/i18n";

const Projects = () => {
  const { t } = useI18n();
  return (
    <PageLayout wide>
      <FadeUp className="px-5 mb-12 md:mb-16 max-w-5xl">
        <SectionHeading eyebrow={t("projects.eyebrow")} title={t("projects.title")} />
        <p className="text-sm leading-relaxed mt-6" style={{ maxWidth: 460 }}>
          {t("projects.intro")}
        </p>
      </FadeUp>
      <ProjectGrid projects={projects} />
    </PageLayout>
  );
};

export default Projects;

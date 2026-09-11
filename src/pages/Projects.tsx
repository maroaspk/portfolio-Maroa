import { PageLayout } from "@/components/ui/page-layout";
import { ProjectGrid } from "@/components/ui/project-grid";
import { FadeUp, SectionHeading } from "@/components/ui/editorial";
import { projects } from "@/lib/projects";

const Projects = () => {
  return (
    <PageLayout wide>
      <FadeUp className="px-5 mb-12 md:mb-16 max-w-5xl">
        <SectionHeading eyebrow="Projects" title="Projects" />
        <p className="text-sm leading-relaxed mt-6" style={{ maxWidth: 460 }}>
          A selection of work in branding, advertising, content and social media, developed during my
          degree in Advertising and Public Relations. This section keeps growing.
        </p>
      </FadeUp>
      <ProjectGrid projects={projects} />
    </PageLayout>
  );
};

export default Projects;

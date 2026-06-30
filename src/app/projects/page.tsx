import type { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import { getProjects } from "@/data/queries";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "AI, computer vision, NLP and full-stack projects by Amin Kazempour — presented as detailed case studies.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pt-32">
      <section className="section-pad pb-20">
        <SectionHeading
          eyebrow="Portfolio"
          title="Projects"
          description="Case studies across AI, computer vision, NLP, and full-stack engineering."
        />
        <div className="mt-12">
          <ProjectsGrid projects={projects} />
        </div>
      </section>
    </div>
  );
}

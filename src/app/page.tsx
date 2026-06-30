import Link from "next/link";
import { ArrowRight, Brain, Eye, MessageSquareCode, Activity } from "lucide-react";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import SectionHeading from "@/components/shared/SectionHeading";
import SkillCloud from "@/components/skills/SkillCloud";
import ProjectCard from "@/components/projects/ProjectCard";
import PublicationCard from "@/components/research/PublicationCard";
import Reveal from "@/components/ux/Reveal";
import {
  getProfile,
  getStats,
  getSkillCategories,
  getProjects,
  getPublications,
} from "@/data/queries";

const RESEARCH_AREAS = [
  {
    icon: Activity,
    title: "Medical Image Analysis",
    desc: "Brain MRI/CT segmentation with hybrid Mamba–CNN architectures.",
  },
  {
    icon: Brain,
    title: "Deep Learning",
    desc: "Architectures, optimization, and efficient long-range modeling.",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    desc: "Image-based AI for detection, segmentation, and understanding.",
  },
  {
    icon: MessageSquareCode,
    title: "LLMs & NLP",
    desc: "Fine-tuning, RAG systems, and multi-modal language models.",
  },
];

// Revalidate from the DB so admin edits appear without a redeploy (ISR).
export const revalidate = 60;

export default async function HomePage() {
  const [profile, stats, skills, projects, publications] = await Promise.all([
    getProfile(),
    getStats(),
    getSkillCategories(),
    getProjects(),
    getPublications(),
  ]);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const projectList = featuredProjects.length ? featuredProjects : projects.slice(0, 3);
  const featuredPubs = publications.slice(0, 2);

  return (
    <>
      <Hero
        name={profile.name}
        title={profile.title}
        tagline={profile.tagline}
        cvUrl={profile.cvUrl}
      />

      {/* Stats */}
      <section className="section-pad -mt-20 pb-24">
        <Stats publications={stats.publications} projects={stats.projects} />
      </section>

      {/* Research areas */}
      <section className="section-pad py-12">
        <SectionHeading
          eyebrow="Focus"
          title="Research & Engineering Areas"
          description="Where I spend my time — from medical imaging to large language models."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RESEARCH_AREAS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07}>
              <div className="card h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-violet/20 text-neon-cyan">
                  <a.icon size={22} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="section-pad py-16">
        <SectionHeading
          eyebrow="Toolbox"
          title="Skills & Technologies"
          description="A serious AI/ML engineer with backend and infrastructure awareness."
        />
        <div className="mt-12">
          <SkillCloud categories={skills} />
        </div>
      </section>

      {/* Featured projects */}
      <section className="section-pad py-16">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Selected Work" title="Featured Projects" />
          <Link
            href="/projects"
            className="hidden items-center gap-1 text-sm font-semibold text-neon-cyan sm:flex"
          >
            All projects <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectList.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* Thesis highlight */}
      {profile.thesisTitle && (
        <section className="section-pad py-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl glass-strong p-8 sm:p-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-neon-cyan/15 blur-3xl" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-neon-cyan">
                M.Sc. Thesis
              </span>
              <h2 className="mt-3 max-w-3xl font-display text-2xl font-bold sm:text-3xl">
                {profile.thesisTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-white/65">
                {profile.thesisSummary}
              </p>
              <Link href="/research#thesis" className="btn-ghost mt-7">
                Read more <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </section>
      )}

      {/* Research highlight */}
      {featuredPubs.length > 0 && (
        <section className="section-pad py-16">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Publications" title="Recent Research" />
            <Link
              href="/research"
              className="hidden items-center gap-1 text-sm font-semibold text-neon-cyan sm:flex"
            >
              All research <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featuredPubs.map((p) => (
              <PublicationCard key={p.id} pub={p} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-pad py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neon-cyan/15 via-neon-violet/15 to-neon-magenta/15 p-10 text-center sm:p-16">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold sm:text-4xl">
              Let&apos;s build intelligent systems together.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/65">
              Open to research collaborations, AI engineering roles, and
              interesting problems in vision and language.
            </p>
            <Link href="/contact" className="btn-primary mt-8">
              Get in touch <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

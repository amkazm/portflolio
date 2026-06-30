import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Reveal from "@/components/ux/Reveal";
import { getProjectBySlug } from "@/data/queries";
import { toList, toLines } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary || project.problem,
  };
}

const SECTIONS: { key: keyof CaseFields; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "solution", label: "Solution" },
  { key: "architecture", label: "Architecture" },
  { key: "challenges", label: "Challenges" },
  { key: "results", label: "Results" },
];

type CaseFields = {
  problem: string;
  solution: string;
  architecture: string;
  challenges: string;
  results: string;
};

export default async function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const tech = toList(project.techStack);
  const images = toList(project.images);

  return (
    <article className="pt-32">
      <div className="section-pad">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-neon-cyan"
        >
          <ArrowLeft size={16} /> All projects
        </Link>

        <Reveal>
          <span className="chip mt-6 border-neon-violet/30 text-neon-violet">
            {project.category}
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold sm:text-5xl">
            {project.title}
          </h1>
          {project.summary && (
            <p className="mt-5 max-w-3xl text-lg text-white/70">
              {project.summary}
            </p>
          )}

          <div className="mt-7 flex flex-wrap gap-4">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Live demo <ExternalLink size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Github size={16} /> Source
              </a>
            )}
          </div>
        </Reveal>
      </div>

      {/* Cover / gallery */}
      {(project.coverImage || images.length > 0) && (
        <div className="section-pad mt-12">
          <div className="grid gap-4 md:grid-cols-2">
            {[project.coverImage, ...images].filter(Boolean).map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${project.title} ${i + 1}`} className="w-full" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tech stack */}
      {tech.length > 0 && (
        <section className="section-pad mt-14">
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-neon-cyan">
            Tech Stack
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Case study sections */}
      <div className="section-pad mt-8 max-w-3xl space-y-12 pb-24">
        {SECTIONS.map((s) => {
          const value = project[s.key];
          if (!value) return null;
          const lines = toLines(value);
          return (
            <Reveal key={s.key}>
              <section>
                <h2 className="font-display text-2xl font-bold text-white">
                  {s.label}
                </h2>
                {lines.length > 1 ? (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-white/70">
                    {lines.map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 leading-relaxed text-white/70">{value}</p>
                )}
              </section>
            </Reveal>
          );
        })}
      </div>
    </article>
  );
}

import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/types";
import { toList } from "@/lib/utils";

export default function ProjectCard({ project }: { project: Project }) {
  const tech = toList(project.techStack);
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="card h-full overflow-hidden">
        <div className="relative mb-5 flex h-40 items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-neon-cyan/10 via-neon-violet/10 to-neon-magenta/10">
          {project.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="font-display text-4xl font-bold text-white/15">
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          )}
          <span className="absolute right-3 top-3 chip backdrop-blur">
            {project.category}
          </span>
        </div>

        <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-neon-cyan">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/60">
          {project.summary || project.problem}
        </p>

        {tech.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tech.slice(0, 4).map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center gap-4 border-t border-white/5 pt-4 text-sm text-white/55">
          <span className="flex items-center gap-1 font-semibold text-neon-cyan">
            Case study <ArrowUpRight size={15} />
          </span>
          {project.githubUrl && (
            <span className="ml-auto flex items-center gap-1 text-white/40">
              <Github size={15} /> Code
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

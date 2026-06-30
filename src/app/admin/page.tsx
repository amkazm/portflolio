import Link from "next/link";
import { FileText, FolderGit2, Briefcase, PenLine, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [pubs, projects, experience, posts, messages] = await Promise.all([
    prisma.publication.count(),
    prisma.project.count(),
    prisma.experience.count(),
    prisma.blogPost.count(),
    prisma.contactMessage.count(),
  ]);

  const cards = [
    { label: "Publications", count: pubs, href: "/admin/publications", icon: FileText },
    { label: "Projects", count: projects, href: "/admin/projects", icon: FolderGit2 },
    { label: "Experience", count: experience, href: "/admin/experience", icon: Briefcase },
    { label: "Blog posts", count: posts, href: "/admin/blog", icon: PenLine },
  ];

  const recent = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-white/55">Manage your portfolio content.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="card group">
            <div className="flex items-center justify-between">
              <c.icon className="text-neon-cyan" size={22} />
              <ArrowRight
                size={16}
                className="text-white/30 transition-colors group-hover:text-neon-cyan"
              />
            </div>
            <p className="mt-4 font-display text-3xl font-bold">{c.count}</p>
            <p className="text-sm text-white/55">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-display text-xl font-semibold">
          Recent messages
          <span className="ml-2 text-sm font-normal text-white/40">({messages})</span>
        </h2>
        <div className="mt-4 space-y-3">
          {recent.map((m) => (
            <div key={m.id} className="rounded-xl glass p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{m.name}</span>
                <span className="text-xs text-white/40">
                  {m.createdAt.toLocaleDateString()}
                </span>
              </div>
              <a href={`mailto:${m.email}`} className="text-xs text-neon-cyan">
                {m.email}
              </a>
              <p className="mt-2 text-sm text-white/65">{m.message}</p>
            </div>
          ))}
          {recent.length === 0 && (
            <p className="text-sm text-white/40">No messages yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

import DataTable, { type Column } from "@/components/admin/DataTable";
import { prisma } from "@/lib/prisma";
import type { Project } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminProjects() {
  const items = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  const columns: Column<Project>[] = [
    { header: "Title", render: (p) => <span className="font-medium">{p.title}</span> },
    { header: "Category", render: (p) => p.category },
    { header: "Featured", render: (p) => (p.featured ? "★" : "—") },
  ];

  return (
    <DataTable
      title="Projects"
      items={items}
      columns={columns}
      editBase="/admin/projects"
      newHref="/admin/projects/new"
    />
  );
}

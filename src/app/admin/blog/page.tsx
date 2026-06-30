import DataTable, { type Column } from "@/components/admin/DataTable";
import { prisma } from "@/lib/prisma";
import type { BlogPost } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminBlog() {
  const items = await prisma.blogPost.findMany({ orderBy: { date: "desc" } });

  const columns: Column<BlogPost>[] = [
    { header: "Title", render: (p) => <span className="font-medium">{p.title}</span> },
    { header: "Date", render: (p) => p.date.toLocaleDateString() },
    { header: "Status", render: (p) => (p.published ? "Published" : "Draft") },
  ];

  return (
    <DataTable
      title="Blog posts"
      items={items}
      columns={columns}
      editBase="/admin/blog"
      newHref="/admin/blog/new"
    />
  );
}

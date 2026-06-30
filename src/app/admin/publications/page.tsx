import DataTable, { type Column } from "@/components/admin/DataTable";
import { prisma } from "@/lib/prisma";
import type { Publication } from "@/types";
import { PUBLICATION_TYPE_LABEL } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminPublications() {
  const items = await prisma.publication.findMany({
    orderBy: [{ year: "desc" }, { createdAt: "desc" }],
  });

  const columns: Column<Publication>[] = [
    { header: "Title", render: (p) => <span className="font-medium">{p.title}</span> },
    { header: "Type", render: (p) => PUBLICATION_TYPE_LABEL[p.type] },
    { header: "Year", render: (p) => p.year },
    { header: "Featured", render: (p) => (p.featured ? "★" : "—") },
  ];

  return (
    <DataTable
      title="Publications"
      items={items}
      columns={columns}
      editBase="/admin/publications"
      newHref="/admin/publications/new"
    />
  );
}

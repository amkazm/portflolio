import DataTable, { type Column } from "@/components/admin/DataTable";
import { prisma } from "@/lib/prisma";
import type { Experience } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminExperience() {
  const items = await prisma.experience.findMany({
    orderBy: [{ order: "asc" }, { startDate: "desc" }],
  });

  const columns: Column<Experience>[] = [
    { header: "Role", render: (e) => <span className="font-medium">{e.role}</span> },
    { header: "Organization", render: (e) => e.organization },
    { header: "Period", render: (e) => `${e.startDate || "?"} – ${e.endDate || "Present"}` },
  ];

  return (
    <DataTable
      title="Experience"
      items={items}
      columns={columns}
      editBase="/admin/experience"
      newHref="/admin/experience/new"
    />
  );
}

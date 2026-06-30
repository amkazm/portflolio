import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import CrudForm from "@/components/admin/CrudForm";
import { projectFields } from "@/components/admin/fields";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditProject({
  params,
}: {
  params: { id: string };
}) {
  const item = await prisma.project.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <div>
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-neon-cyan"
      >
        <ArrowLeft size={16} /> Projects
      </Link>
      <h1 className="mb-8 mt-4 font-display text-2xl font-bold">Edit project</h1>
      <CrudForm
        fields={projectFields}
        endpoint="/api/projects"
        id={item.id}
        initial={item as unknown as Record<string, unknown>}
        redirectTo="/admin/projects"
      />
    </div>
  );
}

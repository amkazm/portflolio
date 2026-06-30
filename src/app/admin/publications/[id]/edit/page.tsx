import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import CrudForm from "@/components/admin/CrudForm";
import { publicationFields } from "@/components/admin/fields";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditPublication({
  params,
}: {
  params: { id: string };
}) {
  const item = await prisma.publication.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <div>
      <Link
        href="/admin/publications"
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-neon-cyan"
      >
        <ArrowLeft size={16} /> Publications
      </Link>
      <h1 className="mb-8 mt-4 font-display text-2xl font-bold">Edit publication</h1>
      <CrudForm
        fields={publicationFields}
        endpoint="/api/publications"
        id={item.id}
        initial={item as unknown as Record<string, unknown>}
        redirectTo="/admin/publications"
      />
    </div>
  );
}

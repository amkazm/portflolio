import { prisma } from "@/lib/prisma";
import { publicationSchema } from "@/lib/validations";
import { ok, notFound, parseBody, requireAdmin } from "@/lib/api";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const parsed = await parseBody(request, publicationSchema);
  if ("error" in parsed) return parsed.error;

  const existing = await prisma.publication.findUnique({
    where: { id: params.id },
  });
  if (!existing) return notFound();

  const updated = await prisma.publication.update({
    where: { id: params.id },
    data: parsed.data,
  });
  return ok(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin();
  if (auth) return auth;

  await prisma.publication.delete({ where: { id: params.id } });
  return ok({ success: true });
}

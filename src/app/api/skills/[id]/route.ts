import { prisma } from "@/lib/prisma";
import { ok, requireAdmin } from "@/lib/api";

/**
 * DELETE removes a skill by id, or a category when ?type=category
 * (cascading to its skills).
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const { searchParams } = new URL(request.url);
  if (searchParams.get("type") === "category") {
    await prisma.skillCategory.delete({ where: { id: params.id } });
  } else {
    await prisma.skill.delete({ where: { id: params.id } });
  }
  return ok({ success: true });
}

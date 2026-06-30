import { prisma } from "@/lib/prisma";
import { skillSchema, skillCategorySchema } from "@/lib/validations";
import { ok, badRequest, parseBody, requireAdmin } from "@/lib/api";

export async function GET() {
  const categories = await prisma.skillCategory.findMany({
    orderBy: { order: "asc" },
    include: { skills: { orderBy: { order: "asc" } } },
  });
  return ok(categories);
}

/**
 * POST creates either a skill category or a skill.
 *  - { kind: "category", name, order }
 *  - { kind: "skill", name, categoryId, level, icon, order }
 */
export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth) return auth;

  let body: { kind?: string } & Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid JSON body");
  }

  if (body.kind === "category") {
    const parsed = skillCategorySchema.safeParse(body);
    if (!parsed.success) return badRequest("Validation failed", parsed.error.flatten());
    const created = await prisma.skillCategory.create({ data: parsed.data });
    return ok(created, 201);
  }

  const parsed = skillSchema.safeParse(body);
  if (!parsed.success) return badRequest("Validation failed", parsed.error.flatten());
  const created = await prisma.skill.create({ data: parsed.data });
  return ok(created, 201);
}

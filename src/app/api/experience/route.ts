import { prisma } from "@/lib/prisma";
import { experienceSchema } from "@/lib/validations";
import { ok, parseBody, requireAdmin } from "@/lib/api";

export async function GET() {
  const items = await prisma.experience.findMany({
    orderBy: [{ order: "asc" }, { startDate: "desc" }],
  });
  return ok(items);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const parsed = await parseBody(request, experienceSchema);
  if ("error" in parsed) return parsed.error;

  const created = await prisma.experience.create({ data: parsed.data });
  return ok(created, 201);
}

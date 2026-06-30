import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations";
import { ok, badRequest, parseBody, requireAdmin } from "@/lib/api";

export async function GET() {
  const items = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return ok(items);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const parsed = await parseBody(request, projectSchema);
  if ("error" in parsed) return parsed.error;

  const exists = await prisma.project.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (exists) return badRequest("A project with this slug already exists");

  const created = await prisma.project.create({ data: parsed.data });
  return ok(created, 201);
}

import { prisma } from "@/lib/prisma";
import { publicationSchema } from "@/lib/validations";
import { ok, badRequest, parseBody, requireAdmin } from "@/lib/api";

export async function GET() {
  const items = await prisma.publication.findMany({
    orderBy: [{ year: "desc" }, { createdAt: "desc" }],
  });
  return ok(items);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const parsed = await parseBody(request, publicationSchema);
  if ("error" in parsed) return parsed.error;

  const exists = await prisma.publication.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (exists) return badRequest("A publication with this slug already exists");

  const created = await prisma.publication.create({ data: parsed.data });
  return ok(created, 201);
}

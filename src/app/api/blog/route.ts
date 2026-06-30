import { prisma } from "@/lib/prisma";
import { blogSchema } from "@/lib/validations";
import { ok, badRequest, parseBody, requireAdmin } from "@/lib/api";

export async function GET() {
  const items = await prisma.blogPost.findMany({ orderBy: { date: "desc" } });
  return ok(items);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const parsed = await parseBody(request, blogSchema);
  if ("error" in parsed) return parsed.error;

  const exists = await prisma.blogPost.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (exists) return badRequest("A blog post with this slug already exists");

  const created = await prisma.blogPost.create({ data: parsed.data });
  return ok(created, 201);
}

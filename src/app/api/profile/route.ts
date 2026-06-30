import { prisma } from "@/lib/prisma";
import { profileSchema } from "@/lib/validations";
import { ok, parseBody, requireAdmin } from "@/lib/api";

export async function GET() {
  let profile = await prisma.profile.findUnique({ where: { id: "profile" } });
  if (!profile) profile = await prisma.profile.create({ data: { id: "profile" } });
  return ok(profile);
}

export async function PUT(request: Request) {
  const auth = await requireAdmin();
  if (auth) return auth;

  const parsed = await parseBody(request, profileSchema);
  if ("error" in parsed) return parsed.error;

  const updated = await prisma.profile.upsert({
    where: { id: "profile" },
    update: parsed.data,
    create: { id: "profile", ...parsed.data },
  });
  return ok(updated);
}

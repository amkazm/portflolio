import { prisma } from "@/lib/prisma";

/** Profile is a singleton; create a default row on first access. */
export async function getProfile() {
  let profile = await prisma.profile.findUnique({ where: { id: "profile" } });
  if (!profile) {
    profile = await prisma.profile.create({ data: { id: "profile" } });
  }
  return profile;
}

export function getPublications(type?: "JOURNAL" | "CONFERENCE" | "PREPRINT") {
  return prisma.publication.findMany({
    where: type ? { type } : undefined,
    orderBy: [{ year: "desc" }, { createdAt: "desc" }],
  });
}

export function getPublicationBySlug(slug: string) {
  return prisma.publication.findUnique({ where: { slug } });
}

export function getProjects(category?: string) {
  return prisma.project.findMany({
    where: category && category !== "All" ? { category } : undefined,
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug } });
}

export function getExperience() {
  return prisma.experience.findMany({
    orderBy: [{ order: "asc" }, { startDate: "desc" }],
  });
}

export function getBlogPosts(includeDrafts = false) {
  return prisma.blogPost.findMany({
    where: includeDrafts ? undefined : { published: true },
    orderBy: { date: "desc" },
  });
}

export function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export function getSkillCategories() {
  return prisma.skillCategory.findMany({
    orderBy: { order: "asc" },
    include: { skills: { orderBy: { order: "asc" } } },
  });
}

export async function getStats() {
  const [pubs, projects] = await Promise.all([
    prisma.publication.count(),
    prisma.project.count(),
  ]);
  return { publications: pubs, projects };
}

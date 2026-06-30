import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pubs, projects, posts] = await Promise.all([
    prisma.publication.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.project.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/research",
    "/experience",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const dynamicRoutes = [
    ...pubs.map((p) => ({ url: `${SITE_URL}/research/${p.slug}`, lastModified: p.updatedAt })),
    ...projects.map((p) => ({ url: `${SITE_URL}/projects/${p.slug}`, lastModified: p.updatedAt })),
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.updatedAt })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}

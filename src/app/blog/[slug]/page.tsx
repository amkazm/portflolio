import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getBlogPostBySlug } from "@/data/queries";
import { toList, formatDate } from "@/lib/utils";
import { blogPostingJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post || !post.published) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post || !post.published) notFound();

  const tags = toList(post.tags);
  const jsonLd = blogPostingJsonLd(post);

  return (
    <article className="pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="section-pad max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-neon-cyan"
        >
          <ArrowLeft size={16} /> All posts
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/45">
          <time>{formatDate(post.date)}</time>
          {tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        <h1 className="mt-4 font-display text-4xl font-bold leading-tight">
          {post.title}
        </h1>

        <div className="prose-invert-custom mt-10 pb-24">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </div>
    </article>
  );
}

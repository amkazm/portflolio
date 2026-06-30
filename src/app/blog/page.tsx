import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/ux/Reveal";
import { getBlogPosts } from "@/data/queries";
import { toList, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical writing by Amin Kazempour on deep learning, LLMs, RAG, computer vision, and AI engineering.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="pt-32">
      <section className="section-pad pb-24">
        <SectionHeading
          eyebrow="Writing"
          title="Blog"
          description="Notes on deep learning, LLMs, RAG, and building AI systems."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => {
            const tags = toList(post.tags);
            return (
              <Reveal key={post.id} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="card h-full">
                    <div className="flex items-center justify-between text-xs text-white/45">
                      <time>{formatDate(post.date)}</time>
                      <ArrowUpRight
                        size={16}
                        className="text-white/30 transition-colors group-hover:text-neon-cyan"
                      />
                    </div>
                    <h2 className="mt-3 font-display text-xl font-semibold transition-colors group-hover:text-neon-cyan">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm text-white/60">
                      {post.excerpt}
                    </p>
                    {tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tags.slice(0, 3).map((t) => (
                          <span key={t} className="chip">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {posts.length === 0 && (
          <p className="mt-12 text-white/40">No posts published yet.</p>
        )}
      </section>
    </div>
  );
}

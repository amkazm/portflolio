import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import Reveal from "@/components/ux/Reveal";
import CitationBox from "@/components/research/CitationBox";
import { getPublicationBySlug } from "@/data/queries";
import { toList, toLines } from "@/lib/utils";
import { PUBLICATION_TYPE_LABEL } from "@/types";
import { scholarlyArticleJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const pub = await getPublicationBySlug(params.slug);
  if (!pub) return { title: "Publication not found" };
  return {
    title: pub.title,
    description: pub.shortAbstract || pub.fullAbstract.slice(0, 160),
  };
}

export default async function PublicationDetail({
  params,
}: {
  params: { slug: string };
}) {
  const pub = await getPublicationBySlug(params.slug);
  if (!pub) notFound();

  const tags = toList(pub.tags);
  const contributions = toLines(pub.contributions);
  const jsonLd = scholarlyArticleJsonLd(pub);

  const links = [
    pub.doi && { href: `https://doi.org/${pub.doi}`, label: "DOI", icon: ExternalLink },
    pub.scholarUrl && { href: pub.scholarUrl, label: "Google Scholar", icon: GraduationCap },
    pub.researchGate && { href: pub.researchGate, label: "ResearchGate", icon: BookOpen },
    pub.pdfUrl && { href: pub.pdfUrl, label: "PDF", icon: FileText },
  ].filter(Boolean) as { href: string; label: string; icon: typeof FileText }[];

  return (
    <article className="pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="section-pad max-w-3xl">
        <Link
          href="/research"
          className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-neon-cyan"
        >
          <ArrowLeft size={16} /> All research
        </Link>

        <Reveal>
          <div className="mt-6 flex items-center gap-3">
            <span className="chip border-neon-violet/30 text-neon-violet">
              {PUBLICATION_TYPE_LABEL[pub.type]}
            </span>
            <span className="font-mono text-xs text-white/50">{pub.year}</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
            {pub.title}
          </h1>
          <p className="mt-4 text-white/70">{pub.authors}</p>
          <p className="italic text-white/50">{pub.venue}</p>

          {links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !px-4 !py-2 !text-xs"
                >
                  <l.icon size={14} /> {l.label}
                </a>
              ))}
            </div>
          )}
        </Reveal>
      </div>

      <div className="section-pad mt-12 max-w-3xl space-y-10 pb-24">
        {pub.fullAbstract && (
          <Reveal>
            <section>
              <h2 className="font-display text-2xl font-bold">Abstract</h2>
              <p className="mt-4 leading-relaxed text-white/70">{pub.fullAbstract}</p>
            </section>
          </Reveal>
        )}

        {contributions.length > 0 && (
          <Reveal>
            <section>
              <h2 className="font-display text-2xl font-bold">Key Contributions</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-white/70">
                {contributions.map((c, i) => (
                  <li key={i}>{c.replace(/^[•\-]\s*/, "")}</li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}

        {pub.methods && (
          <Reveal>
            <section>
              <h2 className="font-display text-2xl font-bold">Methods</h2>
              <p className="mt-4 leading-relaxed text-white/70">{pub.methods}</p>
            </section>
          </Reveal>
        )}

        {pub.results && (
          <Reveal>
            <section>
              <h2 className="font-display text-2xl font-bold">Results</h2>
              <p className="mt-4 leading-relaxed text-white/70">{pub.results}</p>
            </section>
          </Reveal>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        )}

        {pub.citation && (
          <Reveal>
            <section>
              <h2 className="font-display text-2xl font-bold">Citation</h2>
              <div className="mt-4">
                <CitationBox citation={pub.citation} />
              </div>
            </section>
          </Reveal>
        )}
      </div>
    </article>
  );
}

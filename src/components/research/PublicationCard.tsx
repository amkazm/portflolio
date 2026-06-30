import Link from "next/link";
import { FileText, GraduationCap, BookOpen, ExternalLink } from "lucide-react";
import type { Publication } from "@/types";
import { PUBLICATION_TYPE_LABEL } from "@/types";
import { toList } from "@/lib/utils";

export default function PublicationCard({ pub }: { pub: Publication }) {
  const tags = toList(pub.tags);
  return (
    <div className="card group flex flex-col">
      <div className="flex items-center justify-between gap-3">
        <span className="chip border-neon-violet/30 text-neon-violet">
          {PUBLICATION_TYPE_LABEL[pub.type]}
        </span>
        <span className="font-mono text-xs text-white/50">{pub.year}</span>
      </div>

      <Link href={`/research/${pub.slug}`} className="mt-4">
        <h3 className="font-display text-lg font-semibold leading-snug text-white transition-colors group-hover:text-neon-cyan">
          {pub.title}
        </h3>
      </Link>

      <p className="mt-2 text-sm text-white/55">{pub.authors}</p>
      <p className="text-sm italic text-white/45">{pub.venue}</p>

      {pub.shortAbstract && (
        <p className="mt-3 line-clamp-3 text-sm text-white/65">
          {pub.shortAbstract}
        </p>
      )}

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.slice(0, 4).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4 text-white/60">
        {pub.doi && (
          <a
            href={`https://doi.org/${pub.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs hover:text-neon-cyan"
            title="DOI"
          >
            <ExternalLink size={14} /> DOI
          </a>
        )}
        {pub.scholarUrl && (
          <a
            href={pub.scholarUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Scholar"
            className="hover:text-neon-cyan"
            title="Google Scholar"
          >
            <GraduationCap size={16} />
          </a>
        )}
        {pub.researchGate && (
          <a
            href={pub.researchGate}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ResearchGate"
            className="hover:text-neon-cyan"
            title="ResearchGate"
          >
            <BookOpen size={16} />
          </a>
        )}
        {pub.pdfUrl && (
          <a
            href={pub.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="PDF"
            className="hover:text-neon-cyan"
            title="PDF"
          >
            <FileText size={16} />
          </a>
        )}
        <Link
          href={`/research/${pub.slug}`}
          className="ml-auto text-xs font-semibold text-neon-cyan"
        >
          Details →
        </Link>
      </div>
    </div>
  );
}

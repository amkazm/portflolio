"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CitationBox({ citation }: { citation: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="relative rounded-2xl border border-white/10 bg-black/40 p-5">
      <button
        onClick={copy}
        data-cursor="hover"
        className="absolute right-4 top-4 flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-colors hover:text-neon-cyan"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="overflow-x-auto whitespace-pre-wrap pr-20 font-mono text-sm text-white/75">
        {citation}
      </pre>
    </div>
  );
}

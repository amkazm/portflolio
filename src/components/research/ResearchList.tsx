"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Publication } from "@/types";
import PublicationCard from "./PublicationCard";

const TABS = [
  { key: "ALL", label: "All" },
  { key: "JOURNAL", label: "Journal" },
  { key: "CONFERENCE", label: "Conference" },
  { key: "PREPRINT", label: "Preprint" },
] as const;

export default function ResearchList({
  publications,
}: {
  publications: Publication[];
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("ALL");
  const filtered =
    tab === "ALL" ? publications : publications.filter((p) => p.type === tab);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => {
          const count =
            t.key === "ALL"
              ? publications.length
              : publications.filter((p) => p.type === t.key).length;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              data-cursor="hover"
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                tab === t.key
                  ? "bg-gradient-to-r from-neon-cyan to-neon-violet font-semibold text-bg"
                  : "border border-white/10 text-white/60 hover:text-white"
              }`}
            >
              {t.label}{" "}
              <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <PublicationCard pub={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-white/40">
          No publications in this category yet.
        </p>
      )}
    </div>
  );
}

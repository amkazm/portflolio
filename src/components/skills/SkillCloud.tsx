"use client";

import { motion } from "framer-motion";
import type { Skill, SkillCategory } from "@/types";

type CategoryWithSkills = SkillCategory & { skills: Skill[] };

export default function SkillCloud({
  categories,
}: {
  categories: CategoryWithSkills[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {categories.map((cat, ci) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: ci * 0.1 }}
          className="card"
        >
          <h3 className="font-display text-lg font-semibold text-white">
            {cat.name}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {cat.skills.map((s) => (
              <motion.span
                key={s.id}
                whileHover={{ scale: 1.08, y: -2 }}
                className="cursor-default rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/80 transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
                data-cursor="hover"
              >
                {s.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import type { Skill, SkillCategory } from "@/types";

type CategoryWithSkills = SkillCategory & { skills: Skill[] };

export default function SkillsManager({
  categories,
}: {
  categories: CategoryWithSkills[];
}) {
  const router = useRouter();
  const [newCategory, setNewCategory] = useState("");
  const [skillInputs, setSkillInputs] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  async function addCategory() {
    if (!newCategory.trim()) return;
    setBusy(true);
    await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "category", name: newCategory, order: categories.length }),
    });
    setNewCategory("");
    setBusy(false);
    router.refresh();
  }

  async function addSkill(categoryId: string) {
    const name = (skillInputs[categoryId] || "").trim();
    if (!name) return;
    setBusy(true);
    await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "skill", name, categoryId }),
    });
    setSkillInputs((s) => ({ ...s, [categoryId]: "" }));
    setBusy(false);
    router.refresh();
  }

  async function remove(id: string, type?: "category") {
    if (type === "category" && !confirm("Delete category and all its skills?")) return;
    setBusy(true);
    await fetch(`/api/skills/${id}${type ? "?type=category" : ""}`, {
      method: "DELETE",
    });
    setBusy(false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category (e.g. AI / ML)"
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm focus:border-neon-cyan/60 focus:outline-none"
        />
        <button onClick={addCategory} disabled={busy} className="btn-primary !px-5 !py-2.5">
          <Plus size={16} /> Category
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {categories.map((cat) => (
          <div key={cat.id} className="card">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">{cat.name}</h3>
              <button
                onClick={() => remove(cat.id, "category")}
                className="text-white/40 hover:text-neon-magenta"
                aria-label="Delete category"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {cat.skills.map((s) => (
                <span
                  key={s.id}
                  className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm"
                >
                  {s.name}
                  <button
                    onClick={() => remove(s.id)}
                    className="text-white/30 hover:text-neon-magenta"
                    aria-label={`Delete ${s.name}`}
                  >
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <input
                value={skillInputs[cat.id] || ""}
                onChange={(e) =>
                  setSkillInputs((s) => ({ ...s, [cat.id]: e.target.value }))
                }
                onKeyDown={(e) => e.key === "Enter" && addSkill(cat.id)}
                placeholder="Add skill…"
                className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm focus:border-neon-cyan/60 focus:outline-none"
              />
              <button
                onClick={() => addSkill(cat.id)}
                disabled={busy}
                className="rounded-lg border border-white/15 px-3 text-sm hover:border-neon-cyan/60 hover:text-neon-cyan"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <p className="text-sm text-white/40">
          No skill categories yet. Add one above.
        </p>
      )}
    </div>
  );
}

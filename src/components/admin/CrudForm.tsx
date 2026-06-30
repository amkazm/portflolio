"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2, AlertCircle } from "lucide-react";
import type { FieldDef } from "./fields";

type Props = {
  fields: FieldDef[];
  endpoint: string; // e.g. "/api/publications"
  initial?: Record<string, unknown>;
  id?: string; // present = edit mode
  redirectTo: string;
  method?: "POST" | "PUT"; // override (profile uses PUT without id)
};

export default function CrudForm({
  fields,
  endpoint,
  initial = {},
  id,
  redirectTo,
  method,
}: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = {};
    for (const f of fields) {
      if (f.type === "checkbox") {
        payload[f.name] = fd.get(f.name) === "on";
      } else if (f.type === "number") {
        payload[f.name] = Number(fd.get(f.name) || 0);
      } else {
        payload[f.name] = (fd.get(f.name) as string) ?? "";
      }
    }

    const httpMethod = method ?? (id ? "PUT" : "POST");
    const url = id ? `${endpoint}/${id}` : endpoint;

    const res = await fetch(url, {
      method: httpMethod,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Failed to save. Check required fields.");
      return;
    }
    router.push(redirectTo);
    router.refresh();
  }

  async function onDelete() {
    if (!id || !confirm("Delete this item permanently?")) return;
    setDeleting(true);
    const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    setDeleting(false);
    if (res.ok) {
      router.push(redirectTo);
      router.refresh();
    } else {
      setError("Failed to delete.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
            <FieldInput field={f} value={initial[f.name]} />
            {f.hint && <p className="mt-1 text-xs text-white/40">{f.hint}</p>}
          </div>
        ))}
      </div>

      {error && (
        <p className="flex items-center gap-2 text-sm text-neon-magenta">
          <AlertCircle size={16} /> {error}
        </p>
      )}

      <div className="flex items-center gap-3 border-t border-white/10 pt-5">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          <Save size={16} /> {saving ? "Saving…" : "Save"}
        </button>
        {id && (
          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-full border border-neon-magenta/40 px-5 py-3 text-sm font-semibold text-neon-magenta transition-colors hover:bg-neon-magenta/10 disabled:opacity-60"
          >
            <Trash2 size={16} /> {deleting ? "Deleting…" : "Delete"}
          </button>
        )}
      </div>
    </form>
  );
}

function FieldInput({ field, value }: { field: FieldDef; value: unknown }) {
  const base =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm focus:border-neon-cyan/60 focus:outline-none";
  const v = value ?? "";

  if (field.type === "checkbox") {
    return (
      <label className="mt-6 flex items-center gap-3 text-sm text-white/80">
        <input
          type="checkbox"
          name={field.name}
          defaultChecked={Boolean(value)}
          className="h-4 w-4 accent-[#22D3EE]"
        />
        {field.label}
      </label>
    );
  }

  return (
    <>
      <label className="mb-2 block text-sm text-white/70">
        {field.label}
        {field.required && <span className="text-neon-magenta"> *</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea
          name={field.name}
          defaultValue={String(v)}
          rows={4}
          required={field.required}
          placeholder={field.placeholder}
          className={base}
        />
      ) : field.type === "select" ? (
        <select name={field.name} defaultValue={String(v)} className={base}>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value} className="bg-bg-soft">
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={field.name}
          type={field.type === "number" ? "number" : "text"}
          defaultValue={String(v)}
          required={field.required}
          placeholder={field.placeholder}
          step={field.type === "number" ? "any" : undefined}
          className={base}
        />
      )}
    </>
  );
}

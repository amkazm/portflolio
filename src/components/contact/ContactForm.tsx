"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send.");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center justify-center gap-3 py-16 text-center">
        <CheckCircle2 className="text-neon-cyan" size={40} />
        <h3 className="font-display text-xl font-semibold">Message sent!</h3>
        <p className="text-sm text-white/60">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
        <button onClick={() => setStatus("idle")} className="btn-ghost mt-2">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5">
      {/* Honeypot — hidden from users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" required />
        <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Message</label>
        <textarea
          name="message"
          rows={5}
          required
          minLength={10}
          placeholder="How can I help?"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-neon-cyan/60 focus:outline-none"
        />
      </div>

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-neon-magenta">
          <AlertCircle size={16} /> {error}
        </p>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-60">
        {status === "loading" ? "Sending…" : "Send message"} <Send size={16} />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/70">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-neon-cyan/60 focus:outline-none"
      />
    </div>
  );
}

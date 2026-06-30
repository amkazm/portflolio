"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogIn, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-neon-violet/20 blur-[120px]" />
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-sm rounded-2xl glass-strong p-8"
      >
        <h1 className="font-display text-2xl font-bold">
          <span className="neon-text">Admin</span> Sign in
        </h1>
        <p className="mt-2 text-sm text-white/55">
          Manage your portfolio content.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-white/70">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm focus:border-neon-cyan/60 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-white/70">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm focus:border-neon-cyan/60 focus:outline-none"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 flex items-center gap-2 text-sm text-neon-magenta">
            <AlertCircle size={16} /> {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-6 w-full disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"} <LogIn size={16} />
        </button>
      </form>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, FileDown } from "lucide-react";
import Link from "next/link";

// 3D is heavy → load only on the client, after first paint.
const Hero3D = dynamic(() => import("@/components/three/Hero3D"), {
  ssr: false,
  loading: () => null,
});

export default function Hero({
  name,
  title,
  tagline,
  cvUrl,
}: {
  name: string;
  title: string;
  tagline: string;
  cvUrl: string;
}) {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* faint grid + glow backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-neon-violet/20 blur-[140px]" />

      {/* 3D canvas */}
      <div className="absolute inset-0 z-0 opacity-90">
        <Hero3D />
      </div>

      <div className="section-pad relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="chip border-neon-cyan/40 text-neon-cyan"
          >
            ● Available for research &amp; AI engineering roles
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            <span className="text-white">{name.split(" ")[0]} </span>
            <span className="neon-text">{name.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 font-display text-xl text-white/80 sm:text-2xl"
          >
            {title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-5 max-w-xl text-white/60"
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link href="/projects" className="btn-primary">
              View Projects <ArrowRight size={18} />
            </Link>
            <Link href="/research" className="btn-ghost">
              View Research
            </Link>
            <a href={cvUrl} className="btn-ghost">
              <FileDown size={18} /> Download CV
            </a>
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/40"
      >
        <span className="animate-pulse">Scroll</span>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return controls.stop;
  }, [inView, to, suffix, mv]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats({
  publications,
  projects,
}: {
  publications: number;
  projects: number;
}) {
  const stats = [
    { value: publications, suffix: "+", label: "Publications" },
    { value: projects, suffix: "+", label: "Projects" },
    { value: 2, suffix: "", label: "Degrees (B.Sc. + M.Sc.)" },
    { value: 18, suffix: "+", label: "GPA / 20 (M.Sc.)" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="card text-center"
        >
          <div className="font-display text-4xl font-bold neon-text">
            <Counter to={s.value} suffix={s.suffix} />
          </div>
          <p className="mt-2 text-sm text-white/55">{s.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

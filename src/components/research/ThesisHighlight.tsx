import { FileDown } from "lucide-react";
import Reveal from "@/components/ux/Reveal";

/** Animated SVG pipeline: MRI/CT → CNN encoder → Mamba blocks → segmentation. */
function PipelineDiagram() {
  const stages = ["MRI / CT", "CNN Encoder", "Mamba Blocks", "Decoder", "Segmentation"];
  return (
    <div className="mt-8 overflow-x-auto">
      <svg viewBox="0 0 920 140" className="min-w-[760px] w-full" role="img" aria-label="Segmentation pipeline">
        <defs>
          <linearGradient id="stageGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        {stages.map((label, i) => {
          const x = 20 + i * 180;
          return (
            <g key={label}>
              <rect
                x={x}
                y={40}
                rx={14}
                width={150}
                height={60}
                fill="url(#stageGrad)"
                stroke="rgba(255,255,255,0.15)"
              />
              <text
                x={x + 75}
                y={75}
                textAnchor="middle"
                fill="#E6EAF2"
                fontSize="14"
                fontFamily="var(--font-display)"
              >
                {label}
              </text>
              {i < stages.length - 1 && (
                <line
                  x1={x + 150}
                  y1={70}
                  x2={x + 180}
                  y2={70}
                  stroke="#22D3EE"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                />
              )}
            </g>
          );
        })}
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="#22D3EE" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export default function ThesisHighlight({
  title,
  summary,
  pdfUrl,
}: {
  title: string;
  summary: string;
  pdfUrl?: string;
}) {
  return (
    <section id="thesis" className="scroll-mt-28">
      <Reveal>
        <div className="rounded-3xl glass-strong p-8 sm:p-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neon-cyan">
            M.Sc. Thesis
          </span>
          <h2 className="mt-3 max-w-3xl font-display text-2xl font-bold sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl text-white/70">{summary}</p>

          <PipelineDiagram />

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { h: "Key innovation", p: "Fusing CNN locality with Mamba long-range context." },
              { h: "Efficiency", p: "Linear-complexity sequence modeling vs. quadratic attention." },
              { h: "Result", p: "State-of-the-art Dice at reduced compute on MRI + CT." },
            ].map((c) => (
              <div key={c.h} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-neon-cyan">{c.h}</p>
                <p className="mt-1 text-sm text-white/65">{c.p}</p>
              </div>
            ))}
          </div>

          {pdfUrl && (
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-8">
              <FileDown size={16} /> Download thesis
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}

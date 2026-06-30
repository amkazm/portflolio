import Reveal from "@/components/ux/Reveal";

export type TimelineItem = {
  title: string;
  subtitle?: string;
  period?: string;
  description?: string;
  bullets?: string[];
};

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative space-y-8 pl-8">
      <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-neon-cyan/60 via-neon-violet/40 to-transparent" />
      {items.map((item, i) => (
        <Reveal key={i} delay={i * 0.05}>
          <div className="relative">
            <span className="absolute -left-[26px] top-1.5 h-3 w-3 rounded-full bg-neon-cyan shadow-glow" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-semibold text-white">
                {item.title}
              </h3>
              {item.period && (
                <span className="font-mono text-xs text-white/50">
                  {item.period}
                </span>
              )}
            </div>
            {item.subtitle && (
              <p className="text-sm text-neon-cyan/90">{item.subtitle}</p>
            )}
            {item.description && (
              <p className="mt-2 text-sm text-white/65">{item.description}</p>
            )}
            {item.bullets && item.bullets.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/65">
                {item.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

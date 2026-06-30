import Reveal from "@/components/ux/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  center,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <Reveal>
      <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
        {eyebrow && (
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neon-cyan">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-white/60">{description}</p>
        )}
      </div>
    </Reveal>
  );
}

import type { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";
import Timeline from "@/components/shared/Timeline";
import Reveal from "@/components/ux/Reveal";
import { getProfile } from "@/data/queries";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Amin Kazempour — AI Engineer & ML/DL researcher. B.Sc. (Mohaghegh Ardabili) and M.Sc. in AI (University of Tabriz), focused on medical image segmentation and LLMs.",
};

const RESEARCH_INTERESTS = [
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "Medical Image Analysis",
  "LLMs & NLP",
  "State-Space Models (Mamba)",
];

const VALUES = [
  {
    title: "Rigor",
    desc: "Reproducible experiments, honest baselines, and results that hold up.",
  },
  {
    title: "Impact",
    desc: "Research that solves real problems — especially in healthcare and imaging.",
  },
  {
    title: "Efficiency",
    desc: "Models that are not only accurate but practical to train and deploy.",
  },
];

export const revalidate = 60;

export default async function AboutPage() {
  const profile = await getProfile();

  const education = [
    {
      title: "M.Sc. in Computer Engineering — Artificial Intelligence",
      subtitle: "University of Tabriz",
      period: "2023 – 2025 · GPA 18.04 / 20",
      description:
        "Thesis on brain MRI/CT image segmentation using Mamba Transformers and CNNs.",
    },
    {
      title: "B.Sc. in Computer Engineering",
      subtitle: "Mohaghegh Ardabili University",
      period: "2019 – 2023 · GPA 17.66 / 20",
      description:
        "Foundations in software engineering, algorithms, and machine learning.",
    },
  ];

  return (
    <div className="pt-32">
      <section className="section-pad">
        <SectionHeading
          eyebrow="About"
          title="AI Engineer & ML / DL Researcher"
        />
        <Reveal>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/70">
            {profile.bio}
          </p>
        </Reveal>
      </section>

      {/* Thesis */}
      <section className="section-pad py-16">
        <Reveal>
          <div className="rounded-3xl glass-strong p-8 sm:p-10">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-neon-cyan">
              Thesis Highlight
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold">
              {profile.thesisTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-white/70">{profile.thesisSummary}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                "Brain MRI/CT segmentation",
                "Hybrid Mamba + CNN architecture",
                "Linear-complexity long-range modeling",
              ].map((t) => (
                <li
                  key={t}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/75"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Education timeline */}
      <section className="section-pad py-12">
        <SectionHeading eyebrow="Journey" title="Education & Milestones" />
        <div className="mt-12 max-w-3xl">
          <Timeline items={education} />
        </div>
      </section>

      {/* Research interests */}
      <section className="section-pad py-12">
        <SectionHeading eyebrow="Curiosity" title="Research Interests" />
        <div className="mt-8 flex flex-wrap gap-3">
          {RESEARCH_INTERESTS.map((r, i) => (
            <Reveal key={r} delay={i * 0.04}>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-white/80 transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan">
                {r}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section-pad py-12 pb-24">
        <SectionHeading eyebrow="Philosophy" title="How I Work" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="card h-full">
                <h3 className="font-display text-lg font-semibold text-neon-cyan">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-white/65">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";
import Timeline, { type TimelineItem } from "@/components/shared/Timeline";
import { getExperience } from "@/data/queries";
import { toLines, formatMonth } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Research, teaching, and industry experience of Amin Kazempour in AI and machine learning.",
};

export const revalidate = 60;

export default async function ExperiencePage() {
  const experiences = await getExperience();

  const items: TimelineItem[] = experiences.map((e) => ({
    title: e.role,
    subtitle: `${e.organization}${e.location ? " · " + e.location : ""}`,
    period: `${formatMonth(e.startDate)} – ${formatMonth(e.endDate)}`,
    description: e.summary,
    bullets: toLines(e.achievements),
  }));

  return (
    <div className="pt-32">
      <section className="section-pad pb-24">
        <SectionHeading
          eyebrow="Career"
          title="Experience"
          description="Research assistantships, teaching, and applied AI engineering."
        />
        <div className="mt-14 max-w-3xl">
          {items.length > 0 ? (
            <Timeline items={items} />
          ) : (
            <p className="text-white/40">No experience entries yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}

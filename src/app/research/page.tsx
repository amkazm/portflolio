import type { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";
import ResearchList from "@/components/research/ResearchList";
import ThesisHighlight from "@/components/research/ThesisHighlight";
import { getPublications, getProfile } from "@/data/queries";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Publications, journal and conference papers, and M.Sc. thesis by Amin Kazempour on medical image segmentation, deep learning, and LLMs.",
};

export const revalidate = 60;

export default async function ResearchPage() {
  const [publications, profile] = await Promise.all([
    getPublications(),
    getProfile(),
  ]);

  return (
    <div className="pt-32">
      <section className="section-pad">
        <SectionHeading
          eyebrow="Research"
          title="Publications & Thesis"
          description="Journal papers, conference papers, and preprints — plus my M.Sc. thesis."
        />
      </section>

      {profile.thesisTitle && (
        <section className="section-pad py-12">
          <ThesisHighlight
            title={profile.thesisTitle}
            summary={profile.thesisSummary}
            pdfUrl={profile.thesisPdfUrl}
          />
        </section>
      )}

      <section className="section-pad py-8 pb-24">
        <ResearchList publications={publications} />
      </section>
    </div>
  );
}

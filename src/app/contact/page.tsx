import type { Metadata } from "next";
import { Mail, Github, Linkedin, GraduationCap, BookOpen, Twitter } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";
import { getProfile } from "@/data/queries";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Amin Kazempour for AI research collaborations and engineering roles.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const profile = await getProfile();

  const channels = [
    { href: `mailto:${profile.email}`, icon: Mail, label: "Email", value: profile.email, show: !!profile.email },
    { href: profile.linkedinUrl, icon: Linkedin, label: "LinkedIn", value: "Connect", show: !!profile.linkedinUrl },
    { href: profile.githubUrl, icon: Github, label: "GitHub", value: "Follow", show: !!profile.githubUrl },
    { href: profile.scholarUrl, icon: GraduationCap, label: "Google Scholar", value: "Publications", show: !!profile.scholarUrl },
    { href: profile.researchGate, icon: BookOpen, label: "ResearchGate", value: "Profile", show: !!profile.researchGate },
    { href: profile.twitterUrl, icon: Twitter, label: "X / Twitter", value: "Follow", show: !!profile.twitterUrl },
  ].filter((c) => c.show);

  return (
    <div className="pt-32">
      <section className="section-pad pb-24">
        <SectionHeading
          eyebrow="Contact"
          title="Let's talk"
          description="Research collaborations, AI engineering roles, or interesting problems — my inbox is open."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <ContactForm />
          </div>

          <div className="space-y-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl glass p-5 transition-colors hover:border-neon-cyan/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-violet/20 text-neon-cyan">
                  <c.icon size={20} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">
                    {c.label}
                  </span>
                  <span className="block text-sm text-white/55">{c.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

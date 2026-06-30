import Link from "next/link";
import { Github, Linkedin, Mail, GraduationCap, BookOpen } from "lucide-react";
import { getProfile } from "@/data/queries";

export default async function Footer() {
  const profile = await getProfile();
  const year = new Date().getFullYear();

  const socials = [
    { href: `mailto:${profile.email}`, icon: Mail, label: "Email", show: !!profile.email },
    { href: profile.githubUrl, icon: Github, label: "GitHub", show: !!profile.githubUrl },
    { href: profile.linkedinUrl, icon: Linkedin, label: "LinkedIn", show: !!profile.linkedinUrl },
    { href: profile.scholarUrl, icon: GraduationCap, label: "Scholar", show: !!profile.scholarUrl },
    { href: profile.researchGate, icon: BookOpen, label: "ResearchGate", show: !!profile.researchGate },
  ].filter((s) => s.show);

  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="section-pad py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <p className="font-display text-xl font-bold">
              <span className="neon-text">Amin</span> Kazempour
            </p>
            <p className="mt-3 text-sm text-white/60">{profile.title}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
            {["About", "Projects", "Research", "Experience", "Blog", "Contact"].map(
              (l) => (
                <Link
                  key={l}
                  href={`/${l.toLowerCase()}`}
                  className="text-white/60 transition-colors hover:text-neon-cyan"
                >
                  {l}
                </Link>
              )
            )}
          </div>

          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full glass transition-colors hover:border-neon-cyan/60 hover:text-neon-cyan"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {year} Amin Kazempour. All rights reserved.</p>
          <p>Built with Next.js, Three.js &amp; Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}

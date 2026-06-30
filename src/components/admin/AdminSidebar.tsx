"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  FolderGit2,
  Briefcase,
  PenLine,
  Sparkles,
  UserCog,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/publications", label: "Publications", icon: FileText },
  { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/blog", label: "Blog", icon: PenLine },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/profile", label: "Profile", icon: UserCog },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex w-64 flex-col border-r border-white/10 bg-bg-soft p-4">
      <Link href="/admin" className="px-3 py-4 font-display text-lg font-bold">
        <span className="neon-text">Admin</span> Panel
      </Link>

      <nav className="mt-4 flex-1 space-y-1">
        {NAV.map((n) => {
          const active =
            n.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <n.icon size={18} />
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/10 pt-3">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 hover:bg-white/5 hover:text-white"
        >
          <ExternalLink size={18} /> View site
        </a>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 hover:bg-white/5 hover:text-neon-magenta"
        >
          <LogOut size={18} /> Sign out
        </button>
      </div>
    </aside>
  );
}

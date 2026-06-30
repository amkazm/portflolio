"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides chrome (e.g. the public Footer) on /admin routes. */
export default function HideOnAdmin({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <>{children}</>;
}

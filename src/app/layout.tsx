import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HideOnAdmin from "@/components/layout/HideOnAdmin";
import CustomCursor from "@/components/ux/CustomCursor";
import SmoothScroll from "@/components/ux/SmoothScroll";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  DEFAULT_KEYWORDS,
  personJsonLd,
} from "@/lib/seo";
import { getProfile } from "@/data/queries";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI Engineer & ML Researcher`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    title: `${SITE_NAME} — AI Engineer & ML Researcher`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — AI Engineer & ML Researcher`,
    description: SITE_DESCRIPTION,
    images: ["/images/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const profile = await getProfile();
  const jsonLd = personJsonLd(profile);

  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <HideOnAdmin>
              <Footer />
            </HideOnAdmin>
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}

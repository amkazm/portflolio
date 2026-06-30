export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const SITE_NAME = "Amin Kazempour";
export const SITE_DESCRIPTION =
  "Amin Kazempour — AI Engineer & Machine Learning / Deep Learning researcher. " +
  "Medical image segmentation, computer vision, and large language models.";

export const DEFAULT_KEYWORDS = [
  "Amin Kazempour",
  "AI Engineer",
  "Machine Learning Researcher",
  "Deep Learning",
  "Brain image segmentation",
  "Medical Image Analysis",
  "Computer Vision",
  "Mamba Transformer",
  "LLM",
];

/** JSON-LD: Person */
export function personJsonLd(profile: {
  name: string;
  title: string;
  bio: string;
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  scholarUrl?: string;
  researchGate?: string;
}) {
  const sameAs = [
    profile.linkedinUrl,
    profile.githubUrl,
    profile.scholarUrl,
    profile.researchGate,
  ].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.bio,
    url: SITE_URL,
    email: profile.email ? `mailto:${profile.email}` : undefined,
    sameAs,
    knowsAbout: [
      "Deep Learning",
      "Machine Learning",
      "Medical Image Segmentation",
      "Computer Vision",
      "Large Language Models",
    ],
  };
}

export function scholarlyArticleJsonLd(pub: {
  title: string;
  authors: string;
  year: number;
  venue: string;
  slug: string;
  fullAbstract?: string;
  doi?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: pub.title,
    author: pub.authors.split(",").map((a) => ({
      "@type": "Person",
      name: a.trim(),
    })),
    datePublished: String(pub.year),
    isPartOf: pub.venue,
    abstract: pub.fullAbstract,
    sameAs: pub.doi ? `https://doi.org/${pub.doi}` : undefined,
    url: `${SITE_URL}/research/${pub.slug}`,
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  excerpt: string;
  date: Date;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date.toISOString(),
    author: { "@type": "Person", name: SITE_NAME },
    url: `${SITE_URL}/blog/${post.slug}`,
  };
}

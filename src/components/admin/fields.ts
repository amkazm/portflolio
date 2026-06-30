export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "checkbox";

export type FieldDef = {
  name: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  hint?: string;
  required?: boolean;
  full?: boolean; // span both columns
};

import { PROJECT_CATEGORIES } from "@/types";

export const publicationFields: FieldDef[] = [
  { name: "title", label: "Title", required: true, full: true },
  { name: "slug", label: "Slug", required: true, hint: "URL id, e.g. my-paper" },
  {
    name: "type",
    label: "Type",
    type: "select",
    options: [
      { value: "JOURNAL", label: "Journal" },
      { value: "CONFERENCE", label: "Conference" },
      { value: "PREPRINT", label: "Preprint" },
    ],
  },
  { name: "authors", label: "Authors", required: true, full: true, hint: "Comma-separated" },
  { name: "venue", label: "Venue", required: true },
  { name: "year", label: "Year", type: "number", required: true },
  { name: "shortAbstract", label: "Short abstract", type: "textarea", full: true },
  { name: "fullAbstract", label: "Full abstract", type: "textarea", full: true },
  { name: "contributions", label: "Key contributions", type: "textarea", full: true, hint: "One per line" },
  { name: "methods", label: "Methods", type: "textarea", full: true },
  { name: "results", label: "Results", type: "textarea", full: true },
  { name: "tags", label: "Tags", full: true, hint: "Comma-separated" },
  { name: "doi", label: "DOI", hint: "e.g. 10.1000/xyz" },
  { name: "pdfUrl", label: "PDF URL" },
  { name: "scholarUrl", label: "Google Scholar URL" },
  { name: "researchGate", label: "ResearchGate URL" },
  { name: "citation", label: "Citation / BibTeX", type: "textarea", full: true },
  { name: "featured", label: "Featured", type: "checkbox" },
];

export const projectFields: FieldDef[] = [
  { name: "title", label: "Title", required: true, full: true },
  { name: "slug", label: "Slug", required: true },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: PROJECT_CATEGORIES.map((c) => ({ value: c, label: c })),
  },
  { name: "summary", label: "Summary", type: "textarea", full: true },
  { name: "problem", label: "Problem", type: "textarea", full: true },
  { name: "solution", label: "Solution", type: "textarea", full: true },
  { name: "techStack", label: "Tech stack", full: true, hint: "Comma-separated" },
  { name: "architecture", label: "Architecture", type: "textarea", full: true },
  { name: "challenges", label: "Challenges", type: "textarea", full: true, hint: "One per line for bullets" },
  { name: "results", label: "Results", type: "textarea", full: true },
  { name: "demoUrl", label: "Demo URL" },
  { name: "githubUrl", label: "GitHub URL" },
  { name: "coverImage", label: "Cover image URL", full: true },
  { name: "images", label: "Gallery images", full: true, hint: "Comma-separated URLs" },
  { name: "order", label: "Order", type: "number" },
  { name: "featured", label: "Featured", type: "checkbox" },
];

export const experienceFields: FieldDef[] = [
  { name: "role", label: "Role", required: true },
  { name: "organization", label: "Organization", required: true },
  { name: "location", label: "Location" },
  { name: "startDate", label: "Start", hint: "YYYY-MM" },
  { name: "endDate", label: "End", hint: "YYYY-MM (empty = Present)" },
  { name: "summary", label: "Summary", type: "textarea", full: true },
  { name: "achievements", label: "Achievements", type: "textarea", full: true, hint: "One per line" },
  { name: "order", label: "Order", type: "number" },
];

export const blogFields: FieldDef[] = [
  { name: "title", label: "Title", required: true, full: true },
  { name: "slug", label: "Slug", required: true },
  { name: "tags", label: "Tags", hint: "Comma-separated" },
  { name: "excerpt", label: "Excerpt", type: "textarea", full: true },
  { name: "content", label: "Content (Markdown)", type: "textarea", full: true },
  { name: "coverImage", label: "Cover image URL", full: true },
  { name: "published", label: "Published", type: "checkbox" },
];

export const profileFields: FieldDef[] = [
  { name: "name", label: "Name", required: true },
  { name: "title", label: "Title", required: true },
  { name: "tagline", label: "Tagline", type: "textarea", full: true },
  { name: "bio", label: "Bio", type: "textarea", full: true },
  { name: "cvUrl", label: "CV URL" },
  { name: "email", label: "Email" },
  { name: "linkedinUrl", label: "LinkedIn URL" },
  { name: "githubUrl", label: "GitHub URL" },
  { name: "scholarUrl", label: "Google Scholar URL" },
  { name: "researchGate", label: "ResearchGate URL" },
  { name: "twitterUrl", label: "X / Twitter URL" },
  { name: "thesisTitle", label: "Thesis title", full: true },
  { name: "thesisSummary", label: "Thesis summary", type: "textarea", full: true },
  { name: "thesisPdfUrl", label: "Thesis PDF URL", full: true },
];

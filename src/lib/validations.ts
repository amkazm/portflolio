import { z } from "zod";

export const publicationSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  authors: z.string().min(1),
  venue: z.string().min(1),
  year: z.coerce.number().int().min(1900).max(2100),
  type: z.enum(["JOURNAL", "CONFERENCE", "PREPRINT"]),
  shortAbstract: z.string().optional().default(""),
  fullAbstract: z.string().optional().default(""),
  contributions: z.string().optional().default(""),
  methods: z.string().optional().default(""),
  results: z.string().optional().default(""),
  tags: z.string().optional().default(""),
  scholarUrl: z.string().optional().default(""),
  researchGate: z.string().optional().default(""),
  doi: z.string().optional().default(""),
  pdfUrl: z.string().optional().default(""),
  citation: z.string().optional().default(""),
  featured: z.coerce.boolean().optional().default(false),
});

export const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().min(1),
  summary: z.string().optional().default(""),
  problem: z.string().optional().default(""),
  solution: z.string().optional().default(""),
  techStack: z.string().optional().default(""),
  architecture: z.string().optional().default(""),
  challenges: z.string().optional().default(""),
  results: z.string().optional().default(""),
  demoUrl: z.string().optional().default(""),
  githubUrl: z.string().optional().default(""),
  coverImage: z.string().optional().default(""),
  images: z.string().optional().default(""),
  featured: z.coerce.boolean().optional().default(false),
  order: z.coerce.number().int().optional().default(0),
});

export const experienceSchema = z.object({
  role: z.string().min(2),
  organization: z.string().min(1),
  location: z.string().optional().default(""),
  startDate: z.string().optional().default(""),
  endDate: z.string().optional().default(""),
  summary: z.string().optional().default(""),
  achievements: z.string().optional().default(""),
  order: z.coerce.number().int().optional().default(0),
});

export const blogSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  tags: z.string().optional().default(""),
  excerpt: z.string().optional().default(""),
  content: z.string().optional().default(""),
  coverImage: z.string().optional().default(""),
  published: z.coerce.boolean().optional().default(false),
});

export const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().optional().default(""),
  bio: z.string().optional().default(""),
  cvUrl: z.string().optional().default(""),
  email: z.string().email().or(z.literal("")).optional().default(""),
  linkedinUrl: z.string().optional().default(""),
  githubUrl: z.string().optional().default(""),
  scholarUrl: z.string().optional().default(""),
  researchGate: z.string().optional().default(""),
  twitterUrl: z.string().optional().default(""),
  thesisTitle: z.string().optional().default(""),
  thesisSummary: z.string().optional().default(""),
  thesisPdfUrl: z.string().optional().default(""),
});

export const skillCategorySchema = z.object({
  name: z.string().min(1),
  order: z.coerce.number().int().optional().default(0),
});

export const skillSchema = z.object({
  name: z.string().min(1),
  level: z.coerce.number().int().min(0).max(100).optional().default(80),
  icon: z.string().optional().default(""),
  order: z.coerce.number().int().optional().default(0),
  categoryId: z.string().min(1),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
  // honeypot — must stay empty
  website: z.string().max(0).optional().default(""),
});

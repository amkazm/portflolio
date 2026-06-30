export type {
  Profile,
  Publication,
  Project,
  Experience,
  BlogPost,
  Skill,
  SkillCategory,
} from "@prisma/client";

export const PUBLICATION_TYPES = ["JOURNAL", "CONFERENCE", "PREPRINT"] as const;
export type PublicationType = (typeof PUBLICATION_TYPES)[number];

export const PROJECT_CATEGORIES = [
  "AI Projects",
  "Research Projects",
  "Full-stack",
  "Computer Vision",
  "NLP",
  "Robotics",
  "Data Science",
] as const;

export const PUBLICATION_TYPE_LABEL: Record<string, string> = {
  JOURNAL: "Journal",
  CONFERENCE: "Conference",
  PREPRINT: "Preprint",
};

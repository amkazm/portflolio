import SkillsManager from "@/components/admin/SkillsManager";
import { getSkillCategories } from "@/data/queries";

export const dynamic = "force-dynamic";

export default async function AdminSkills() {
  const categories = await getSkillCategories();

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl font-bold">Skills</h1>
      <p className="mb-8 text-sm text-white/55">
        Organize skills into categories shown on the home page.
      </p>
      <SkillsManager categories={categories} />
    </div>
  );
}

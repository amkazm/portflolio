import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CrudForm from "@/components/admin/CrudForm";
import { experienceFields } from "@/components/admin/fields";

export default function NewExperience() {
  return (
    <div>
      <Link
        href="/admin/experience"
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-neon-cyan"
      >
        <ArrowLeft size={16} /> Experience
      </Link>
      <h1 className="mb-8 mt-4 font-display text-2xl font-bold">New experience</h1>
      <CrudForm
        fields={experienceFields}
        endpoint="/api/experience"
        redirectTo="/admin/experience"
        initial={{ order: 0 }}
      />
    </div>
  );
}

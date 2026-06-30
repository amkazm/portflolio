import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CrudForm from "@/components/admin/CrudForm";
import { projectFields } from "@/components/admin/fields";

export default function NewProject() {
  return (
    <div>
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-neon-cyan"
      >
        <ArrowLeft size={16} /> Projects
      </Link>
      <h1 className="mb-8 mt-4 font-display text-2xl font-bold">New project</h1>
      <CrudForm
        fields={projectFields}
        endpoint="/api/projects"
        redirectTo="/admin/projects"
        initial={{ category: "AI Projects", order: 0 }}
      />
    </div>
  );
}

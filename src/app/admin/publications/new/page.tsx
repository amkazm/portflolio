import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CrudForm from "@/components/admin/CrudForm";
import { publicationFields } from "@/components/admin/fields";

export default function NewPublication() {
  return (
    <div>
      <Link
        href="/admin/publications"
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-neon-cyan"
      >
        <ArrowLeft size={16} /> Publications
      </Link>
      <h1 className="mb-8 mt-4 font-display text-2xl font-bold">New publication</h1>
      <CrudForm
        fields={publicationFields}
        endpoint="/api/publications"
        redirectTo="/admin/publications"
        initial={{ type: "JOURNAL", year: new Date().getFullYear() }}
      />
    </div>
  );
}

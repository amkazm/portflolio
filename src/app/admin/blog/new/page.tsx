import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CrudForm from "@/components/admin/CrudForm";
import { blogFields } from "@/components/admin/fields";

export default function NewBlogPost() {
  return (
    <div>
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-neon-cyan"
      >
        <ArrowLeft size={16} /> Blog
      </Link>
      <h1 className="mb-8 mt-4 font-display text-2xl font-bold">New post</h1>
      <CrudForm
        fields={blogFields}
        endpoint="/api/blog"
        redirectTo="/admin/blog"
        initial={{ published: false }}
      />
    </div>
  );
}

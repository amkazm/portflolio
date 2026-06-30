import CrudForm from "@/components/admin/CrudForm";
import { profileFields } from "@/components/admin/fields";
import { getProfile } from "@/data/queries";

export const dynamic = "force-dynamic";

export default async function AdminProfile() {
  const profile = await getProfile();

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl font-bold">Profile</h1>
      <p className="mb-8 text-sm text-white/55">
        General info, social links, and thesis highlight shown across the site.
      </p>
      <CrudForm
        fields={profileFields}
        endpoint="/api/profile"
        method="PUT"
        initial={profile as unknown as Record<string, unknown>}
        redirectTo="/admin/profile"
      />
    </div>
  );
}

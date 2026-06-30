import Link from "next/link";
import { Pencil, Plus } from "lucide-react";

export type Column<T> = {
  header: string;
  render: (item: T) => React.ReactNode;
};

export default function DataTable<T extends { id: string }>({
  title,
  items,
  columns,
  editBase,
  newHref,
}: {
  title: string;
  items: T[];
  columns: Column<T>[];
  editBase: string; // e.g. "/admin/publications"
  newHref: string;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">{title}</h1>
        <Link href={newHref} className="btn-primary !px-5 !py-2.5">
          <Plus size={16} /> New
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.03] text-white/50">
            <tr>
              {columns.map((c) => (
                <th key={c.header} className="px-4 py-3 font-medium">
                  {c.header}
                </th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-t border-white/5 transition-colors hover:bg-white/[0.02]"
              >
                {columns.map((c, i) => (
                  <td key={i} className="px-4 py-3 text-white/80">
                    {c.render(item)}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`${editBase}/${item.id}/edit`}
                    className="inline-flex items-center gap-1 text-xs text-neon-cyan hover:underline"
                  >
                    <Pencil size={14} /> Edit
                  </Link>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-10 text-center text-white/40"
                >
                  Nothing here yet. Click “New” to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

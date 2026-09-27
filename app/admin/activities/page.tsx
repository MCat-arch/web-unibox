import React from "react";
import Link from "next/link";
import { getAdminActivities } from "@/lib/actions/activity-actions";
import { ActivityTableRow } from "@/components/admin/activity-table-row";
import { PlusCircle, Search, Filter } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>;
}) {
  const params = await searchParams;
  const filterType = params.type || "all";
  const searchQuery = (params.q || "").toLowerCase();

  const allActivities = await getAdminActivities();

  const filteredActivities = allActivities.filter((act) => {
    const matchesType =
      filterType === "all" ? true : act.type === filterType;
    const matchesSearch =
      searchQuery === ""
        ? true
        : act.title_id.toLowerCase().includes(searchQuery) ||
          act.title_en.toLowerCase().includes(searchQuery) ||
          act.slug.toLowerCase().includes(searchQuery);

    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Kelola Konten Aktivitas
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Daftar seluruh kegiatan event dan artikel edukasi Unibox di Supabase
          </p>
        </div>

        <Link
          href="/admin/activities/new"
          className="px-4 py-2.5 bg-[#0070ba] hover:bg-[#005a96] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Tambah Konten Baru
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Type Tabs */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Link
            href="/admin/activities?type=all"
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              filterType === "all"
                ? "bg-[#07243e] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Semua ({allActivities.length})
          </Link>
          <Link
            href="/admin/activities?type=event"
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              filterType === "event"
                ? "bg-[#0070ba] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Event ({allActivities.filter((a) => a.type === "event").length})
          </Link>
          <Link
            href="/admin/activities?type=blog"
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              filterType === "blog"
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Blog ({allActivities.filter((a) => a.type === "blog").length})
          </Link>
        </div>

        {/* Search Form */}
        <form method="GET" action="/admin/activities" className="w-full md:w-72 relative">
          {filterType !== "all" && (
            <input type="hidden" name="type" value={filterType} />
          )}
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            name="q"
            defaultValue={params.q || ""}
            placeholder="Cari judul atau slug..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all"
          />
        </form>
      </div>

      {/* Activities Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {filteredActivities.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Filter className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">Tidak ada konten yang sesuai kriteria.</p>
            <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau filter tipe.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Judul & Slug</th>
                  <th className="px-6 py-3.5">Tipe</th>
                  <th className="px-6 py-3.5">Tanggal</th>
                  <th className="px-6 py-3.5">Sorotan / Posisi</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredActivities.map((act) => (
                  <ActivityTableRow key={act.id} activity={act} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

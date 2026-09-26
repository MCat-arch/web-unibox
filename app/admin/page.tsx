import React from "react";
import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { getAdminActivities } from "@/lib/actions/activity-actions";
import { DashboardSeedButton } from "@/components/admin/dashboard-seed-button";
import {
  CalendarDays,
  BookOpen,
  Layers,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getSession();
  const activities = await getAdminActivities();

  const totalActivities = activities.length;
  const totalEvents = activities.filter((a) => a.type === "event").length;
  const totalBlogs = activities.filter((a) => a.type === "blog").length;
  const upcomingEvents = activities.filter(
    (a) => a.type === "event" && (a.status_id?.toLowerCase().includes("mendatang") || a.featured)
  ).length;

  return (
    <div className="space-y-8">
      {/* Header Welcome */}
      <div className="bg-gradient-to-r from-[#093254] to-[#07243e] rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 mb-3 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Admin Console Terenkripsi
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Selamat Datang, {session?.name || "Admin"}
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Kelola kegiatan maritim, publikasi berita, dan dokumentasi teknologi pendingin Unibox secara terpusat melalui Supabase.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Konten
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0070ba] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-800 mt-3">{totalActivities}</p>
          <p className="text-xs text-slate-500 mt-1">Event dan Blog terdaftar</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Event
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CalendarDays className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-800 mt-3">{totalEvents}</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">
            {upcomingEvents} Mendatang
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Artikel Blog
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-800 mt-3">{totalBlogs}</p>
          <p className="text-xs text-slate-500 mt-1">Edukasi & teknologi</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Aksi Cepat
            </span>
            <p className="text-sm font-semibold text-slate-800 mt-1">
              Publikasikan Konten
            </p>
          </div>
          <Link
            href="/admin/activities/new"
            className="mt-3 w-full py-2.5 px-3 bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            Buat Konten Baru
          </Link>
        </div>
      </div>

      {/* Sync / Seeding Card */}
      <DashboardSeedButton />

      {/* Recent Activities List */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Daftar Konten Terkini</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              10 aktivitas terakhir yang tersimpan di database
            </p>
          </div>
          <Link
            href="/admin/activities"
            className="text-xs font-bold text-[#0070ba] hover:underline flex items-center gap-1"
          >
            Lihat Semua
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {activities.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p className="text-sm font-medium">Belum ada konten di database Supabase.</p>
            <p className="text-xs text-slate-400 mt-1">
              Gunakan tombol &quot;Sinkronkan Data Bawaan&quot; di atas untuk mengimpor data bawaan.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Judul & Slug</th>
                  <th className="px-6 py-3.5">Tipe</th>
                  <th className="px-6 py-3.5">Tanggal</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activities.slice(0, 8).map((act) => (
                  <tr key={act.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800 line-clamp-1">
                        {act.title_id}
                      </p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        /{act.slug}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                          act.type === "event"
                            ? "bg-sky-50 text-[#0070ba] border border-sky-200"
                            : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                        }`}
                      >
                        {act.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">
                      {act.date_id}
                    </td>
                    <td className="px-6 py-4">
                      {act.is_published ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Terbit
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                          <Clock className="w-3.5 h-3.5" />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/activities/${act.id}/edit`}
                        className="text-xs font-bold text-[#0070ba] hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

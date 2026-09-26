import React from "react";
import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { LayoutDashboard, Newspaper, PlusCircle, ExternalLink, ShieldCheck } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Jika halaman login, jangan tampilkan sidebar
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigasi Admin */}
      <aside className="w-full md:w-64 bg-[#07243e] text-white flex-shrink-0 flex flex-col border-r border-slate-800">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0070ba] flex items-center justify-center font-bold text-white shadow-md">
              UB
            </div>
            <div>
              <span className="font-extrabold text-base tracking-wider block text-white">
                UNIBOX ADMIN
              </span>
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Security Hardened
              </span>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="px-6 py-4 bg-slate-900/60 border-b border-slate-800">
          <p className="text-xs text-slate-400">Masuk sebagai:</p>
          <p className="text-sm font-semibold text-white truncate">{session.name}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {session.role}
          </span>
        </div>

        {/* Nav Links */}
        <nav className="p-4 flex-1 space-y-1.5">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-[#0070ba]" />
            Dashboard
          </Link>

          <Link
            href="/admin/activities"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Newspaper className="w-4 h-4 text-emerald-400" />
            Kelola Aktivitas
          </Link>

          <Link
            href="/admin/activities/new"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            Tambah Konten
          </Link>

          <div className="pt-4 mt-4 border-t border-slate-800">
            <Link
              href="/news"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors"
            >
              <span className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-slate-400" />
                Lihat Web Publik
              </span>
            </Link>
          </div>
        </nav>

        {/* Footer Sidebar with Logout Button */}
        <div className="p-4 border-t border-slate-800">
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

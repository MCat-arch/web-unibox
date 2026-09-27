import React from "react";
import { getSession } from "@/lib/auth/session";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTabGuard } from "@/components/admin/admin-tab-guard";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Jika halaman login atau belum login, tampilkan layar penuh tanpa sidebar
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      <AdminTabGuard />
      {/* Sidebar Navigasi Admin Khusus CRUD */}
      <AdminSidebar
        userName={session.name || "Administrator"}
        userRole={session.role || "superadmin"}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

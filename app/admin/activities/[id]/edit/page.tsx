import React from "react";
import Link from "next/link";
import { getAdminActivityById } from "@/lib/actions/activity-actions";
import { ActivityForm } from "@/components/admin/activity-form";
import { ArrowLeft, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EditActivityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = await getAdminActivityById(id);

  if (!activity) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center max-w-md mx-auto my-12">
        <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-800">Konten Tidak Ditemukan</h2>
        <p className="text-xs text-slate-500 mt-1">
          Aktivitas dengan ID tersebut tidak ditemukan di database Supabase.
        </p>
        <Link
          href="/admin/activities"
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-[#0070ba] text-white text-xs font-bold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Aktivitas
        </Link>
      </div>
    );
  }

  return <ActivityForm initialData={activity} />;
}

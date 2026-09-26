"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteActivityAction } from "@/lib/actions/activity-actions";
import { DbActivity } from "@/lib/supabase/types";
import { Edit, Trash2, CheckCircle, Clock } from "lucide-react";

export function ActivityTableRow({ activity }: { activity: DbActivity }) {
  const router = useRouter();
  const [isDeleting, startDelete] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    if (!confirm(`Hapus permanen konten "${activity.title_id}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    startDelete(async () => {
      const res = await deleteActivityAction(activity.id);
      if (res.success) {
        router.refresh();
      } else {
        setError(res.message || "Gagal menghapus");
      }
    });
  };

  return (
    <tr className="hover:bg-slate-50/80 transition-colors">
      <td className="px-6 py-4">
        <p className="font-semibold text-slate-800 line-clamp-1">{activity.title_id}</p>
        <p className="text-xs text-slate-400 font-mono mt-0.5">/{activity.slug}</p>
        {error && <p className="text-xs text-rose-600 mt-1 font-semibold">{error}</p>}
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
            activity.type === "event"
              ? "bg-sky-50 text-[#0070ba] border border-sky-200"
              : "bg-indigo-50 text-indigo-700 border border-indigo-200"
          }`}
        >
          {activity.type}
        </span>
      </td>
      <td className="px-6 py-4 text-xs text-slate-600 font-medium">
        {activity.date_id}
      </td>
      <td className="px-6 py-4">
        {activity.is_published ? (
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
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/activities/${activity.id}/edit`}
            className="p-2 text-slate-600 hover:text-[#0070ba] hover:bg-slate-100 rounded-lg transition-colors"
            title="Edit Konten"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50"
            title="Hapus Konten"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

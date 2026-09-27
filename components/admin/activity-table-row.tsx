"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  deleteActivityAction,
  togglePublishActivityAction,
  toggleFeaturedActivityAction,
  toggleLandingActivityAction,
} from "@/lib/actions/activity-actions";
import { DbActivity } from "@/lib/supabase/types";
import { Edit, Trash2, CheckCircle, Clock, ExternalLink, RefreshCw, Star, Home } from "lucide-react";

export function ActivityTableRow({ activity }: { activity: DbActivity }) {
  const router = useRouter();
  const [isDeleting, startDelete] = useTransition();
  const [isTogglingPublish, startTogglePublish] = useTransition();
  const [isTogglingFeatured, startToggleFeatured] = useTransition();
  const [isTogglingLanding, startToggleLanding] = useTransition();
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

  const handleTogglePublish = () => {
    startTogglePublish(async () => {
      const res = await togglePublishActivityAction(activity.id);
      if (res.success) {
        router.refresh();
      } else {
        setError(res.message || "Gagal mengubah status publikasi");
      }
    });
  };

  const handleToggleFeatured = () => {
    startToggleFeatured(async () => {
      const res = await toggleFeaturedActivityAction(activity.id);
      if (res.success) {
        router.refresh();
      } else {
        setError(res.message || "Gagal mengubah status utama");
      }
    });
  };

  const handleToggleLanding = () => {
    startToggleLanding(async () => {
      const res = await toggleLandingActivityAction(activity.id);
      if (res.success) {
        router.refresh();
      } else {
        setError(res.message || "Gagal mengubah status landing page");
      }
    });
  };

  return (
    <tr className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-0">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3.5">
          {/* Thumbnail Preview */}
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
            {activity.image ? (
              <Image
                src={activity.image}
                alt={activity.title_id}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-semibold">
                No IMG
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="font-bold text-slate-800 line-clamp-1 text-sm">{activity.title_id}</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">/{activity.slug}</p>
            {error && <p className="text-xs text-rose-600 mt-1 font-semibold">{error}</p>}
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span
          className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
            activity.type === "event"
              ? "bg-sky-50 text-[#0070ba] border border-sky-200"
              : "bg-indigo-50 text-indigo-700 border border-indigo-200"
          }`}
        >
          {activity.type === "event" ? "Event" : "Blog / Wawasan"}
        </span>
      </td>

      <td className="px-6 py-4 text-xs text-slate-600 font-medium whitespace-nowrap">
        {activity.date_id}
      </td>

      {/* 1-Click Interactive Toggles for Featured and Landing Page */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {/* Toggle Utama Teratas di /news */}
          <button
            type="button"
            onClick={handleToggleFeatured}
            disabled={isTogglingFeatured}
            title={
              activity.featured
                ? "Aktif sebagai Event / Artikel Utama Teratas di /news. Klik untuk nonaktifkan."
                : "Jadikan Event / Artikel Utama Teratas di /news."
            }
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50 ${
              activity.featured
                ? "bg-amber-100 text-amber-900 border-amber-300 shadow-sm"
                : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100 hover:text-slate-600"
            }`}
          >
            <Star
              className={`w-3.5 h-3.5 ${
                activity.featured ? "text-amber-600 fill-amber-500" : "text-slate-400"
              }`}
            />
            <span>Utama</span>
            {isTogglingFeatured && <RefreshCw className="w-2.5 h-2.5 animate-spin text-amber-700" />}
          </button>

          {/* Toggle Tampil di Landing Page (Beranda) */}
          <button
            type="button"
            onClick={handleToggleLanding}
            disabled={isTogglingLanding}
            title={
              activity.show_on_landing
                ? "Tampil di Landing Page Beranda (Maksimal 2). Klik untuk nonaktifkan."
                : "Tampilkan di Landing Page Beranda (Maksimal 2 kartu)."
            }
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50 ${
              activity.show_on_landing
                ? "bg-emerald-100 text-emerald-900 border-emerald-300 shadow-sm"
                : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100 hover:text-slate-600"
            }`}
          >
            <Home
              className={`w-3.5 h-3.5 ${
                activity.show_on_landing ? "text-emerald-700 fill-emerald-600" : "text-slate-400"
              }`}
            />
            <span>Landing</span>
            {isTogglingLanding && <RefreshCw className="w-2.5 h-2.5 animate-spin text-emerald-700" />}
          </button>
        </div>
      </td>

      {/* 1-Click Interactive Status Toggle Button */}
      <td className="px-6 py-4">
        <button
          type="button"
          onClick={handleTogglePublish}
          disabled={isTogglingPublish}
          title={
            activity.is_published
              ? "Status Terbit di Web. Klik untuk ubah menjadi Draft."
              : "Status Draft (belum muncul di web). Klik untuk langsung Terbitkan."
          }
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50 ${
            activity.is_published
              ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
              : "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100"
          }`}
        >
          {activity.is_published ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Terbit</span>
            </>
          ) : (
            <>
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Draft</span>
            </>
          )}
          {isTogglingPublish && <RefreshCw className="w-3 h-3 animate-spin ml-1 text-slate-500" />}
        </button>
      </td>

      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <Link
            href={`/news/${activity.slug}`}
            target="_blank"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Lihat Pratinjau Publik"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <Link
            href={`/admin/activities/${activity.id}/edit`}
            className="p-2 text-slate-600 hover:text-[#0070ba] hover:bg-sky-50 rounded-lg transition-colors font-semibold"
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

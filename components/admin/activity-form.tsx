"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DbActivity } from "@/lib/supabase/types";
import {
  createActivityAction,
  updateActivityAction,
  ActivityFormInput,
} from "@/lib/actions/activity-actions";
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Languages,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface ActivityFormProps {
  initialData?: DbActivity | null;
}

export function ActivityForm({ initialData }: ActivityFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Klasifikasi & Pengaturan
  const [type, setType] = useState<"event" | "blog">(
    initialData?.type || "event"
  );
  const [featured, setFeatured] = useState<boolean>(
    initialData?.featured ?? false
  );
  const [isPublished, setIsPublished] = useState<boolean>(
    initialData?.is_published ?? true
  );

  // Field Utama (Cukup Bahasa Indonesia - Versi English diterjemahkan otomatis)
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [titleId, setTitleId] = useState(initialData?.title_id || "");
  const [categoryId, setCategoryId] = useState(
    initialData?.category_id || (type === "event" ? "Event · Demo Lapangan" : "Edukasi & Riset Nelayan")
  );

  const [dateId, setDateId] = useState(initialData?.date_id || "20 April 2026");
  const [timeId, setTimeId] = useState(initialData?.time_id || "08:30 - 12:00 WIB");
  const [locationId, setLocationId] = useState(initialData?.location_id || "");
  const [statusId, setStatusId] = useState(initialData?.status_id || "Kegiatan Mendatang");

  const [authorName, setAuthorName] = useState(initialData?.author_name || "Tim Operasional Unibox");
  const [authorRoleId, setAuthorRoleId] = useState(initialData?.author_role_id || "Divisi Kemitraan Pelabuhan");
  const [image, setImage] = useState(initialData?.image || "/images/unibox-port-cold-storage.jpg");

  const [summaryId, setSummaryId] = useState(initialData?.summary_id || "");
  const [introId, setIntroId] = useState(initialData?.intro_id || "");

  const [quoteTextId, setQuoteTextId] = useState(initialData?.quote_text_id || "");
  const [quoteAuthor, setQuoteAuthor] = useState(initialData?.quote_author || "");

  const [outcomeId, setOutcomeId] = useState(initialData?.outcome_id || "");
  const [participantsCount, setParticipantsCount] = useState(initialData?.participants_count || "");

  // Seksi Sub-bab Dinamis (Cukup Bahasa Indonesia)
  const [sections, setSections] = useState<
    { heading_id: string; body_id: string }[]
  >(
    initialData?.sections && initialData.sections.length > 0
      ? initialData.sections.map((s) => ({
          heading_id: s.heading_id,
          body_id: s.body_id,
        }))
      : [
          {
            heading_id: "Latar Belakang & Urgensi Program",
            body_id: "Tuliskan rincian penjelasan kegiatan atau materi artikel secara lengkap di sini...",
          },
        ]
  );

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        heading_id: "Judul Sub-Bab Baru",
        body_id: "Penjelasan seksi dalam bahasa Indonesia...",
      },
    ]);
  };

  const removeSection = (index: number) => {
    setSections((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAutoSlug = (text: string) => {
    if (!initialData) {
      const generatedSlug = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generatedSlug);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Payload hanya membutuhkan field Bahasa Indonesia, server otomatis translate ke English!
    const payload: ActivityFormInput = {
      slug,
      type,
      featured,
      category_id: categoryId,
      title_id: titleId,
      date_id: dateId,
      time_id: timeId || null,
      location_id: locationId || null,
      status_id: statusId || null,
      author_name: authorName,
      author_role_id: authorRoleId,
      image,
      summary_id: summaryId,
      intro_id: introId,
      quote_text_id: quoteTextId || null,
      quote_author: quoteAuthor || null,
      outcome_id: outcomeId || null,
      participants_count: participantsCount || null,
      is_published: isPublished,
      sections: sections.map((s, idx) => ({
        heading_id: s.heading_id,
        body_id: s.body_id,
        order_index: idx,
      })),
    };

    startTransition(async () => {
      let res;
      if (initialData?.id) {
        res = await updateActivityAction(initialData.id, payload);
      } else {
        res = await createActivityAction(payload);
      }

      if (res.success) {
        setSuccessMsg("Konten berhasil disimpan dan otomatis diterjemahkan ke Bahasa Inggris!");
        setTimeout(() => {
          router.push("/admin/activities");
          router.refresh();
        }, 1200);
      } else {
        setErrorMsg(res.message || "Gagal menyimpan konten.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/activities"
            className="p-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              {initialData ? "Edit Konten Aktivitas" : "Tambah Konten Baru"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Input data cukup dalam Bahasa Indonesia — sistem otomatis menerjemahkan ke Bahasa Inggris
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-[#0070ba] hover:bg-[#005a96] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isPending ? "Menerjemahkan & Menyimpan..." : "Simpan Konten"}
        </button>
      </div>

      {/* Auto-Translate Highlight Banner */}
      <div className="p-4 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200/80 rounded-2xl flex items-center justify-between gap-4 text-sky-900 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0070ba] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Languages className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-[#093254]">
                Google Auto-Translate Aktif
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Otomatis
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Anda tidak perlu mengisi terjemahan manual. Semua inputan di bawah akan otomatis diterjemahkan ke Bahasa Inggris untuk pengunjung global.
            </p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <p className="font-semibold">{errorMsg}</p>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <p className="font-semibold">{successMsg}</p>
        </div>
      )}

      {/* Main Form Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Core Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card: Basic & Title */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
              1. Informasi Utama & Judul
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                Judul Konten (Bahasa Indonesia) *
              </label>
              <input
                type="text"
                required
                value={titleId}
                onChange={(e) => {
                  setTitleId(e.target.value);
                  handleAutoSlug(e.target.value);
                }}
                placeholder="Contoh: Demo Pendingin Kapal Flywheel di Pelabuhan Brondong"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Akan otomatis diterjemahkan ke versi English untuk pembaca global
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                  Kategori *
                </label>
                <input
                  type="text"
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  placeholder="Contoh: Event · Demo Lapangan"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                  Slug URL (Unik & Huruf Kecil) *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase())}
                  placeholder="demo-pendingin-kapal-brondong"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-700 focus:outline-none focus:border-[#0070ba] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Card: Summary & Introduction */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
              2. Ringkasan & Paragraf Pengantar
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                Ringkasan Konten (Tampil di Kartu Cuplikan) *
              </label>
              <textarea
                rows={3}
                required
                value={summaryId}
                onChange={(e) => setSummaryId(e.target.value)}
                placeholder="Tuliskan 1-2 kalimat ringkasan yang menarik untuk cuplikan kartu..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                Paragraf Pengantar (Paragraf Pembuka Halaman Detail) *
              </label>
              <textarea
                rows={4}
                required
                value={introId}
                onChange={(e) => setIntroId(e.target.value)}
                placeholder="Tuliskan latar belakang dan pembuka artikel atau acara secara lengkap..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0070ba] focus:bg-white"
              />
            </div>
          </div>

          {/* Card: Dynamic Sub-sections */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  3. Seksi Sub-bab Konten ({sections.length} Sub-bab)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Setiap sub-bab akan diterjemahkan otomatis ke bahasa Inggris
                </p>
              </div>
              <button
                type="button"
                onClick={addSection}
                className="px-3 py-1.5 bg-sky-50 text-[#0070ba] hover:bg-sky-100 border border-sky-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Seksi
              </button>
            </div>

            {sections.map((sec, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                    Sub-bab #{idx + 1}
                  </span>
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(idx)}
                      className="text-slate-400 hover:text-rose-600 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Hapus
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Judul Sub-Bab
                  </label>
                  <input
                    type="text"
                    required
                    value={sec.heading_id}
                    onChange={(e) => {
                      const updated = [...sections];
                      updated[idx].heading_id = e.target.value;
                      setSections(updated);
                    }}
                    placeholder="Contoh: Rangkaian Uji Coba Suhu & Efisiensi Energi"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0070ba]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Isi Paragraf Sub-Bab
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={sec.body_id}
                    onChange={(e) => {
                      const updated = [...sections];
                      updated[idx].body_id = e.target.value;
                      setSections(updated);
                    }}
                    placeholder="Uraikan materi penjelasan sub-bab ini secara jelas..."
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0070ba]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Card: Quote (Opsional) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
              4. Kutipan Kunci / Quote (Opsional)
            </h2>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Teks Kutipan
              </label>
              <textarea
                rows={2}
                value={quoteTextId}
                onChange={(e) => setQuoteTextId(e.target.value)}
                placeholder="Kutipan penting dari nelayan, ketua koperasi, atau narasumber..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0070ba]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Pemberi Kutipan (Nama & Peran)
              </label>
              <input
                type="text"
                value={quoteAuthor}
                onChange={(e) => setQuoteAuthor(e.target.value)}
                placeholder="Contoh: H. Sutrisno (Ketua Rukun Nelayan Brondong)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0070ba]"
              />
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Meta, Type, Logistics */}
        <div className="space-y-6">
          {/* Card: Type & Status */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
              Klasifikasi Konten
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
                Tipe Aktivitas *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType("event")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                    type === "event"
                      ? "bg-[#0070ba] text-white border-[#0070ba]"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Event Kegiatan
                </button>
                <button
                  type="button"
                  onClick={() => setType("blog")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                    type === "blog"
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Artikel Blog
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-xs font-bold text-slate-800">Event Utama Teratas</p>
                <p className="text-[11px] text-slate-500">Tampilkan di featured top box</p>
              </div>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-5 h-5 accent-[#0070ba] rounded"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-xs font-bold text-slate-800">Status Terbit</p>
                <p className="text-[11px] text-slate-500">Tampilkan di web publik</p>
              </div>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-5 h-5 accent-emerald-600 rounded"
              />
            </div>
          </div>

          {/* Card: Media & Author */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
              Gambar & Penulis
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                URL Gambar Utama *
              </label>
              <input
                type="text"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/images/unibox-port-cold-storage.jpg"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Nama Penulis / Tim *
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Peran Penulis / Divisi *
              </label>
              <input
                type="text"
                required
                value={authorRoleId}
                onChange={(e) => setAuthorRoleId(e.target.value)}
                placeholder="Contoh: Divisi Kemitraan Pelabuhan"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Card: Event Logistics (Jika Tipe Event) */}
          {type === "event" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
                Logistik & Lokasi Event
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Tanggal Pelaksanaan *
                </label>
                <input
                  type="text"
                  required
                  value={dateId}
                  onChange={(e) => setDateId(e.target.value)}
                  placeholder="Contoh: 15 April 2026"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Waktu Pelaksanaan
                </label>
                <input
                  type="text"
                  value={timeId}
                  onChange={(e) => setTimeId(e.target.value)}
                  placeholder="08:30 - 13:00 WIB"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Lokasi Pelaksanaan
                </label>
                <input
                  type="text"
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                  placeholder="Dermaga TPI Brondong, Lamongan, Jawa Timur"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Status Kegiatan
                </label>
                <input
                  type="text"
                  value={statusId}
                  onChange={(e) => setStatusId(e.target.value)}
                  placeholder="Kegiatan Mendatang / Telah Terlaksana"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              {/* Outcome jika sudah terlaksana */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Capaian (Khusus Event Selesai)
                </span>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Capaian / Outcome
                  </label>
                  <input
                    type="text"
                    value={outcomeId}
                    onChange={(e) => setOutcomeId(e.target.value)}
                    placeholder="Contoh: 12 Unit Kapal 5 GT Terpasang"
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Jumlah Peserta
                  </label>
                  <input
                    type="text"
                    value={participantsCount}
                    onChange={(e) => setParticipantsCount(e.target.value)}
                    placeholder="Contoh: 45 Nelayan & Koperasi"
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

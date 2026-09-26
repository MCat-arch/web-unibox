"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { seedInitialDataAction } from "@/lib/actions/activity-actions";
import { Database, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

export function DashboardSeedButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleSeed = () => {
    if (!confirm("Apakah Anda yakin ingin mengimpor 12 data konten bawaan dan akun admin default ke Supabase?")) {
      return;
    }

    setFeedback(null);
    startTransition(async () => {
      const res = await seedInitialDataAction();
      setFeedback(res);
      if (res.success) {
        router.refresh();
      }
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#0070ba]" />
            <h3 className="font-bold text-slate-800 text-base">
              Inisialisasi & Migrasi Data Supabase
            </h3>
          </div>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Klik tombol ini untuk memindahkan seluruh 12 konten aktivitas bawaan Unibox (Event dan Blog) serta membuat kredensial admin default ke database Supabase Anda.
          </p>
        </div>

        <button
          onClick={handleSeed}
          disabled={isPending}
          className="flex-shrink-0 px-4 py-2.5 bg-[#0070ba] hover:bg-[#005a96] text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isPending ? "animate-spin" : ""}`} />
          {isPending ? "Mengimpor Data..." : "Sinkronkan Data Bawaan"}
        </button>
      </div>

      {feedback && (
        <div
          className={`mt-4 p-3.5 rounded-xl text-sm flex items-start gap-2.5 ${
            feedback.success
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {feedback.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          )}
          <p className="font-medium">{feedback.message}</p>
        </div>
      )}
    </div>
  );
}

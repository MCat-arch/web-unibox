"use client";

import React, { useState, useTransition, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAdminAction } from "@/lib/actions/auth-actions";
import { Lock, User, ShieldCheck, AlertCircle, ArrowRight, Info } from "lucide-react";

function TabLogoutNotice() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  if (reason !== "tab_changed") return null;

  return (
    <div className="mb-6 p-4 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-start gap-3 text-amber-200 text-sm">
      <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" />
      <div>
        <p className="font-semibold text-amber-300">Sesi Diakhiri Otomatis</p>
        <p className="mt-0.5 text-xs text-amber-200/90 leading-relaxed">
          Demi keamanan data dan integritas sistem, sesi admin Anda otomatis ditutup saat berpindah tab atau meninggalkan jendela aplikasi. Silakan masuk kembali.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await loginAdminAction(formData);
      if (result.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMessage(result.message || "Gagal masuk. Silakan periksa kredensial Anda.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0070ba]/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md bg-slate-800/90 border border-slate-700/80 rounded-2xl shadow-2xl p-8 backdrop-blur-xl relative z-10">
        {/* Header Brand */}
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 mx-auto mb-3">
            <Image
              src="/images/unibox-emblem.png"
              alt="Unibox Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Security Auto-Logout Notice */}
        <Suspense fallback={null}>
          <TabLogoutNotice />
        </Suspense>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-400" />
            <div>
              <p className="font-semibold text-rose-200">Gagal Masuk</p>
              <p className="mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Username atau Email
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="identifier"
                required
                placeholder="admin@unibox.id"
                autoComplete="username"
                className="w-full pl-11 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#0070ba] focus:ring-1 focus:ring-[#0070ba] transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                required
                placeholder="********"
                autoComplete="current-password"
                className="w-full pl-11 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#0070ba] focus:ring-1 focus:ring-[#0070ba] transition-all text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#0070ba] to-[#005a96] hover:from-[#007ccf] hover:to-[#0066aa] text-white font-bold rounded-xl shadow-lg shadow-[#0070ba]/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isPending ? (
              <span>Memverifikasi Sesi...</span>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Note Footer */}
        <div className="mt-8 pt-6 border-t border-slate-700/60 text-center">
          <p className="text-xs text-slate-500">
            Akses dibatasi hanya untuk staf resmi Unibox. Seluruh percobaan ilegal dipantau oleh rate limiter.
          </p>
        </div>
      </div>
    </div>
  );
}

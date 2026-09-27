"use client";

import React, { useState, useTransition } from "react";
import { changePasswordAction } from "@/lib/actions/auth-actions";
import { Lock, ShieldCheck, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";

export default function AdminSettingsPage() {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await changePasswordAction(formData);
      if (res.success) {
        setSuccessMsg(res.message || "Kata sandi berhasil diperbarui.");
        form.reset();
      } else {
        setErrorMsg(res.message || "Gagal memperbarui kata sandi.");
      }
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          Pengaturan Akun & Keamanan
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Ubah kata sandi akun administrator untuk menjaga keamanan akses panel dashboard.
        </p>
      </div>

      {/* Alert Messages */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-600" />
          <div>
            <p className="font-semibold">Gagal Memperbarui</p>
            <p className="mt-0.5 text-xs text-rose-700">{errorMsg}</p>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
          <div>
            <p className="font-semibold">Berhasil</p>
            <p className="mt-0.5 text-xs text-emerald-700">{successMsg}</p>
          </div>
        </div>
      )}

      {/* Change Password Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0070ba] flex items-center justify-center">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Ubah Kata Sandi</h2>
            <p className="text-xs text-slate-500">Masukkan kata sandi lama dan kata sandi baru Anda.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Kata Sandi Saat Ini *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="currentPassword"
                required
                placeholder="Masukkan kata sandi lama Anda"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Kata Sandi Baru * (Minimal 6 karakter)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="newPassword"
                required
                minLength={6}
                placeholder="Masukkan kata sandi baru"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Konfirmasi Kata Sandi Baru *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="confirmPassword"
                required
                minLength={6}
                placeholder="Ketik ulang kata sandi baru"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#0070ba] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto px-6 py-3 bg-[#0070ba] hover:bg-[#005a96] text-white font-bold text-sm rounded-xl shadow-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isPending ? "Menyimpan Perubahan..." : "Simpan Kata Sandi Baru"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

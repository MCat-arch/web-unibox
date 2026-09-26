"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { logoutAdminAction } from "@/lib/actions/auth-actions";
import { LogOut } from "lucide-react";

export function AdminLogoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAdminAction();
      router.push("/admin/login");
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-rose-300 bg-rose-950/40 border border-rose-800/40 hover:bg-rose-900/60 hover:text-white transition-colors disabled:opacity-50"
    >
      <LogOut className="w-4 h-4" />
      {isPending ? "Keluar..." : "Keluar Sesi (Logout)"}
    </button>
  );
}

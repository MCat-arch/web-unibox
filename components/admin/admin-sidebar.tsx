"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import {
  LayoutDashboard,
  Layers,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  userName: string;
  userRole: string;
}

export function AdminSidebar({ userName, userRole }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      exact: true,
      icon: LayoutDashboard,
    },
    {
      label: "Kelola Aktivitas (CRUD)",
      href: "/admin/activities",
      exact: true,
      icon: Layers,
    },
    {
      label: "Tambah Aktivitas Baru",
      href: "/admin/activities/new",
      exact: false,
      icon: PlusCircle,
    },
  ];

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#07243e] text-white px-4 py-3 border-b border-slate-800 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="relative w-7 h-7">
            <Image
              src="/images/unibox-emblem.png"
              alt="Unibox Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-extrabold text-sm tracking-wider">
            <span className="text-cyan-400">UNI</span>BOX ADMIN
          </span>
        </div>
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {isOpenMobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-50 md:z-auto w-64 bg-[#07243e] text-white flex-shrink-0 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 shrink-0">
              <Image
                src="/images/unibox-emblem.png"
                alt="Unibox Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="font-extrabold text-base tracking-wider block leading-none">
                <span className="text-cyan-400 font-black">UNI</span>
                <span className="text-white font-black">BOX</span>{" "}
                <span className="text-slate-300 font-semibold text-xs tracking-normal">ADMIN</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                CRUD Panel Aktif
              </span>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="px-6 py-4 bg-slate-900/60 border-b border-slate-800">
          <p className="text-xs text-slate-400">Masuk sebagai:</p>
          <p className="text-sm font-semibold text-white truncate">{userName}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {userRole}
          </span>
        </div>

        {/* Navigation Links with Active Indicator */}
        <nav className="p-4 flex-1 space-y-1.5 overflow-y-auto">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Menu CRUD Utama
          </div>

          {navItems.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpenMobile(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all relative ${
                  active
                    ? "bg-[#0070ba] text-white shadow-md shadow-[#0070ba]/30 font-bold"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    active ? "text-white" : "text-slate-400"
                  }`}
                />
                <span>{item.label}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-4 bg-cyan-300 rounded-full" />
                )}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-800">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Pratinjau
            </div>
            <Link
              href="/news"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors"
            >
              <span className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-slate-400" />
                Lihat Web Publik
              </span>
            </Link>
          </div>
        </nav>

        {/* Footer Sidebar with Logout Button */}
        <div className="p-4 border-t border-slate-800 bg-[#061e34]">
          <AdminLogoutButton />
        </div>
      </aside>
    </>
  );
}

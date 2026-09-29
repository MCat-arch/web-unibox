"use client";

import Image from "next/image";
import Link from "next/link";
import { useNavbarTransparency } from "@/components/layout/navbar-scroll-state";

export function NavbarLogo() {
  const isTransparent = useNavbarTransparency();

  return (
    <Link href="/" prefetch={false} className="flex items-center gap-2 group min-w-0">
      <div className="relative size-8 sm:size-10 shrink-0">
        <Image
          src="/images/unibox-emblem.png"
          alt="Unibox Logo"
          fill
          sizes="40px"
          className="object-contain"
        />
      </div>
      <span className="font-display text-lg sm:text-2xl font-black tracking-wider transition-colors duration-500 ease-in-out select-none truncate">
        <span className="text-cyan-500">UNI</span>
        <span className={isTransparent ? "text-white drop-shadow-sm" : "text-slate-900"}>BOX</span>
      </span>
    </Link>
  );
}

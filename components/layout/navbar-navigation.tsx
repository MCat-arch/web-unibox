"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { useNavbarTransparency } from "@/components/layout/navbar-scroll-state";

const navItems = [
  { href: "/", id: "Beranda", en: "Home" },
  { href: "/about", id: "Tentang", en: "About" },
  { href: "/product", id: "Produk", en: "Products" },
  { href: "/news", id: "Aktivitas", en: "Events" },
  { href: "/contact", id: "Kontak", en: "Contact" },
] as const;

export function NavbarNavigation() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const isTransparent = useNavbarTransparency();

  return (
    <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 text-sm font-semibold" aria-label="Navigasi Utama">
      {navItems.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false}
            className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm transition-all duration-500 ease-in-out ${isActive
                ? isTransparent
                  ? "bg-white/20 text-white backdrop-blur-md shadow-inner"
                  : "bg-slate-900 text-white shadow-sm"
                : isTransparent
                  ? "text-white/85 hover:text-white hover:bg-white/10"
                  : "text-slate-600 hover:text-blue-700 hover:bg-slate-100"
              }`}
          >
            {item[language]}
          </Link>
        );
      })}
    </nav>
  );
}

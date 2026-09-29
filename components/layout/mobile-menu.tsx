"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { useNavbarTransparency } from "@/components/layout/navbar-scroll-state";

type NavItem = { href: string; id: string; en: string };

const navItems: NavItem[] = [
  { href: "/", id: "Beranda", en: "Home" },
  { href: "/about", id: "Tentang", en: "About" },
  { href: "/product", id: "Produk", en: "Products" },
  { href: "/news", id: "Aktivitas", en: "Events" },
  { href: "/contact", id: "Kontak", en: "Contact" },
];

export function MobileMenu() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const isTransparent = useNavbarTransparency();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex md:hidden items-center gap-1.5 sm:gap-2.5 shrink-0">
      <button
        type="button"
        className={`p-2 transition-colors duration-500 cursor-pointer rounded-lg ${isTransparent
            ? "text-white hover:bg-white/10"
            : "text-slate-800 hover:text-blue-600 hover:bg-slate-100"
          }`}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {menuOpen && (
        <div className="absolute top-full inset-x-0 border-b border-slate-200 bg-white/98 px-5 py-6 shadow-xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-300 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-800 hover:bg-slate-100"
                    }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item[language]}
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <Button
              asChild
              className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 text-sm shadow-md transition-colors"
            >
              <Link href="/contact" prefetch={false} onClick={() => setMenuOpen(false)}>
                {language === "id" ? "Hubungi Kami" : "Contact Us"}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

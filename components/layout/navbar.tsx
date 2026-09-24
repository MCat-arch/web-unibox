"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";

type Language = "id" | "en";

const navItems = [
  { href: "/", id: "Beranda", en: "Home" },
  { href: "/about", id: "Tentang", en: "About" },
  { href: "/product", id: "Produk", en: "Products" },
  { href: "/news", id: "Berita", en: "News" },
  { href: "/contact", id: "Kontak", en: "Contact" },
];

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100/80 bg-white/95 shadow-sm shadow-blue-900/5 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onClick={() => setMenuOpen(false)}
        >
          <span className="grid size-9 place-items-center rounded-lg bg-blue-600 font-body text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-transform group-hover:scale-105">
            U
          </span>
          <span className="font-display text-lg uppercase tracking-wide text-navy group-hover:text-blue-600 transition-colors">
            Unibox
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-all duration-200 ${
                  isActive
                    ? "text-blue-600 font-bold"
                    : "text-slate-600 font-medium hover:text-blue-600"
                }`}
              >
                {item[language as Language]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language Switcher Toggle */}
          <div
            className="flex rounded-full border border-blue-200 bg-blue-50/70 p-1 shadow-xs"
            aria-label="Language selector"
          >
            {(["id", "en"] as const).map((code) => {
              const isActive = language === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLanguage(code)}
                  className={`h-7 rounded-full px-3 text-xs font-bold uppercase transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                      : "text-slate-600 hover:text-blue-600 hover:bg-blue-100/70"
                  }`}
                >
                  {code}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-700 hover:text-blue-600 hover:bg-blue-50"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav
          className="border-t border-blue-100 bg-white/98 px-5 py-4 md:hidden shadow-lg"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 font-display text-base font-semibold border-b border-slate-100 last:border-0 transition-colors ${
                  isActive
                    ? "text-blue-600 font-bold pl-2 bg-blue-50/60 rounded-md"
                    : "text-slate-700 hover:text-blue-600 hover:pl-2"
                }`}
              >
                {item[language as Language]}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}

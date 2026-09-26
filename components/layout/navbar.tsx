"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";

type Language = "id" | "en";

const navItems = [
  { href: "/", id: "Beranda", en: "Home" },
  { href: "/about", id: "Tentang", en: "About" },
  { href: "/product", id: "Produk", en: "Products" },
  { href: "/news", id: "Aktivitas", en: "Events" },
  { href: "/contact", id: "Kontak", en: "Contact" },
];

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (!isHome) {
        setScrolled(true);
        return;
      }
      const hero = document.getElementById("hero-section");
      // Transisi dimulai saat mendekati akhir page hero (tinggi hero dikurangi tinggi navbar)
      const threshold = hero ? hero.offsetHeight - 80 : window.innerHeight - 80;
      setScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHome]);

  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out ${isTransparent
          ? "bg-transparent border-b border-transparent text-white py-2"
          : "bg-white/95 border-b border-slate-200/80 shadow-md shadow-slate-900/5 backdrop-blur-xl text-slate-800 py-0"
        }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          onClick={() => setMenuOpen(false)}
        >
          <div className="relative size-9 sm:size-10 shrink-0">
            <Image
              src="/images/unibox-emblem.png"
              alt="Unibox Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-display text-xl sm:text-2xl font-black tracking-wider transition-colors duration-500 ease-in-out select-none">
            <span className="text-cyan-500">UNI</span>
            <span className={isTransparent ? "text-white drop-shadow-sm" : "text-slate-900"}>
              BOX
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1.5 lg:gap-2 text-sm font-semibold"
          aria-label="Navigasi Utama"
        >
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm transition-all duration-500 ease-in-out ${isActive
                    ? isTransparent
                      ? "bg-white/20 text-white backdrop-blur-md shadow-inner"
                      : "bg-slate-900 text-white shadow-sm"
                    : isTransparent
                      ? "text-white/85 hover:text-white hover:bg-white/10"
                      : "text-slate-600 hover:text-blue-700 hover:bg-slate-100"
                  }`}
              >
                {item[language as Language]}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Segmented Language Toggle */}
        <div className="hidden md:flex items-center gap-3.5">
          {/* Segmented Language Switcher Toggle */}
          <div
            className={`flex items-center rounded-full border p-0.5 transition-all duration-500 ease-in-out ${isTransparent
                ? "border-white/25 bg-white/10 backdrop-blur-md"
                : "border-slate-200 bg-slate-100/90 shadow-xs"
              }`}
            aria-label="Pilih Bahasa / Language selector"
          >
            {(["id", "en"] as const).map((code) => {
              const isActive = language === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLanguage(code)}
                  className={`h-7 rounded-full px-3 text-xs font-bold uppercase transition-all duration-300 cursor-pointer ${isActive
                      ? isTransparent
                        ? "bg-white text-slate-900 shadow-sm"
                        : "bg-blue-600 text-white shadow-xs"
                      : isTransparent
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                >
                  {code}
                </button>
              );
            })}
          </div>

          {/* Primary CTA Button */}
          <Button
            asChild
            size="sm"
            className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all hover:scale-105"
          >
            <Link href="/contact">
              {language === "id" ? "Hubungi Kami" : "Contact Us"}
            </Link>
          </Button>
        </div>

        {/* Mobile Segmented Language Toggle & Hamburger Button */}
        <div className="flex md:hidden items-center gap-2.5">
          <div
            className={`flex items-center rounded-full border p-0.5 transition-all duration-500 ${isTransparent
                ? "border-white/25 bg-white/10 backdrop-blur-md"
                : "border-slate-200 bg-slate-100"
              }`}
            aria-label="Pilih Bahasa / Language selector"
          >
            {(["id", "en"] as const).map((code) => {
              const isActive = language === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLanguage(code)}
                  className={`h-6 rounded-full px-2 text-[11px] font-bold uppercase transition-all duration-300 cursor-pointer ${isActive
                      ? isTransparent
                        ? "bg-white text-slate-900 shadow-sm"
                        : "bg-blue-600 text-white shadow-xs"
                      : isTransparent
                        ? "text-white/80 hover:text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  {code}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className={`p-2 transition-colors duration-500 cursor-pointer ${isTransparent ? "text-white" : "text-slate-800 hover:text-blue-600"
              }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/98 px-5 py-6 shadow-xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-300">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-800 hover:bg-slate-100"
                    }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item[language as Language]}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <Button
              asChild
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 shadow-md"
            >
              <Link href="/contact" onClick={() => setMenuOpen(false)}>
                {language === "id" ? "Hubungi Kami" : "Contact Us"}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

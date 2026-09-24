"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { Text } from "@/components/text";
import { Button } from "@/components/ui/button";

type Language = "id" | "en";

const navItems = [
  { href: "/", id: "Beranda", en: "Home" },
  { href: "/about", id: "Tentang", en: "About" },
  { href: "/product", id: "Produk", en: "Products" },
  { href: "/news", id: "Berita", en: "News" },
  { href: "/contact", id: "Kontak", en: "Contact" },
];

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="relative overflow-hidden bg-navy pt-20 text-ice sm:pt-28">
      {/* Curved ice arc at top */}
      <div
        className="absolute inset-x-0 top-0 h-16 bg-ice sm:h-20"
        style={{ borderRadius: "0 0 50% 50% / 0 0 70% 70%" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 pb-12 pt-6 text-center lg:px-8">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-md bg-ice font-body text-sm font-bold text-navy">
            U
          </span>
          <span className="font-display text-xl uppercase">Unibox</span>
        </Link>

        {/* Tagline */}
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-ice/70">
          <Text>
            {{
              id: "Teknologi rantai dingin untuk menjaga mutu hasil laut dan memperkuat industri perikanan Indonesia.",
              en: "Cold-chain technology that protects seafood quality and strengthens Indonesia's fisheries industry.",
            }}
          </Text>
        </p>

        {/* Nav Links */}
        <nav
          className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-ice/75"
          aria-label="Footer navigation"
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ice">
              {item[language as Language]}
            </Link>
          ))}
        </nav>

        {/* CTA Banner */}
        <div className="mx-auto mt-9 grid max-w-3xl gap-6 border-t border-ice/15 pt-8 text-left sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase text-brand-soft">
              <Text>{{ id: "Informasi terbaru", en: "Latest updates" }}</Text>
            </p>
            <p className="mt-2 text-sm text-ice/60">
              <Text>
                {{
                  id: "Kanal berita dan kontak resmi segera tersedia.",
                  en: "Official news and contact channels will be available soon.",
                }}
              </Text>
            </p>
          </div>
          <Button asChild className="bg-ice text-navy hover:bg-ice/90">
            <Link href="/contact">
              <Text>{{ id: "Hubungi kami", en: "Contact us" }}</Text>
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-ice/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-5 text-xs text-ice/50 sm:flex-row lg:px-8">
          <span>© 2026 Unibox.</span>
          <span>
            <Text>
              {{
                id: "Teknologi untuk hasil laut yang lebih bernilai.",
                en: "Technology for more valuable seafood.",
              }}
            </Text>
          </span>
        </div>
      </div>
    </footer>
  );
}

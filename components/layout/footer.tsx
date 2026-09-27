"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { Text } from "@/components/text";

type Language = "id" | "en";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const navItems = [
  { href: "/", id: "Beranda", en: "Home" },
  { href: "/about", id: "Tentang", en: "About" },
  { href: "/product", id: "Produk", en: "Products" },
  { href: "/news", id: "Aktivitas", en: "Activities" },
  { href: "/contact", id: "Kontak", en: "Contact" },
];

const socialMediaLinks = [
  {
    name: "LinkedIn",
    icon: LinkedinIcon,
    url: "https://linkedin.com",
    label: "LinkedIn Unibox",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    url: "https://instagram.com/unibox_id",
    label: "Instagram @unibox_id",
  },
  {
    name: "YouTube",
    icon: YoutubeIcon,
    url: "https://youtube.com",
    label: "YouTube Unibox",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    url: "https://wa.me/6281280921122",
    label: "WhatsApp Resmi",
  },
  {
    name: "Facebook",
    icon: FacebookIcon,
    url: "https://facebook.com",
    label: "Facebook Unibox",
  },
];

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="relative overflow-hidden bg-slate-100 pt-16 pb-12 text-slate-800 border-t-2 border-slate-200">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
        {/* Logo Unibox */}
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="relative size-11 shrink-0">
            <Image
              src="/images/unibox-emblem.png"
              alt="Unibox Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-display text-2xl font-black tracking-wider text-slate-900 select-none">
            <span className="text-cyan-600">UNI</span>
            <span className="text-slate-900">BOX</span>
          </span>
        </Link>

        {/* Tagline */}
        <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-600">
          <Text>
            {{
              id: "Teknologi pendingin dan elektrifikasi perahu nelayan untuk menjaga mutu hasil laut serta meningkatkan kesejahteraan maritim Indonesia.",
              en: "Fisher refrigeration and boat electrification technology protecting seafood quality and strengthening Indonesia's maritime livelihood.",
            }}
          </Text>
        </p>

        {/* Nav Links */}
        {/* <nav
          className="mt-7 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-semibold text-slate-700"
          aria-label="Footer navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-blue-700 transition-colors"
            >
              {item[language as Language]}
            </Link>
          ))}
        </nav> */}

        {/* Social Media Icons (Dipindahkan ke Footer) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          {socialMediaLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="grid size-10 place-items-center rounded-xl bg-white text-slate-700 border border-slate-200 shadow-xs transition-all duration-200 hover:scale-105 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Icon className="size-4.5" />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-slate-200/80 pt-6 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Unibox Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

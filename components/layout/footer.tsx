"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Text } from "@/components/text";

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
  return (
    <footer className="relative overflow-hidden bg-[#071c30] pt-16 pb-12 text-white border-t border-sky-900/60">
      {/* Atmospheric Marine Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/footer-marine-bg.jpg"
          alt="Marine background"
          fill
          className="object-cover object-bottom opacity-20 filter blur-[2px] scale-105"
          sizes="100vw"
        />
        {/* Oceanic gradient overlay ensuring main text and buttons are crisp & readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06182a]/95 via-[#071e35]/85 to-[#0a2644]/90 backdrop-blur-xs" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8 text-center">
        {/* Logo Unibox */}
        <Link href="/" prefetch={false} className="inline-flex items-center gap-2.5 group">
          <div className="relative size-11 shrink-0">
            <Image
              src="/images/unibox-emblem.png"
              alt="Unibox Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-display text-2xl font-black tracking-wider text-white select-none">
            <span className="text-cyan-400">UNI</span>
            <span className="text-white">BOX</span>
          </span>
        </Link>

        {/* Tagline */}
        <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed text-sky-100/90 font-normal">
          <Text>
            {{
              id: "Teknologi pendingin dan elektrifikasi perahu nelayan untuk menjaga mutu hasil laut serta meningkatkan kesejahteraan maritim Indonesia.",
              en: "Fisher refrigeration and boat electrification technology protecting seafood quality and strengthening Indonesia's maritime livelihood.",
            }}
          </Text>
        </p>

        {/* Social Media Icons */}
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
                className="grid size-10 place-items-center rounded-xl bg-white/10 text-sky-200 border border-white/15 backdrop-blur-md shadow-xs transition-all duration-200 hover:scale-105 hover:text-white hover:border-cyan-400/50 hover:bg-sky-500/20 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <Icon className="size-4.5" />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-sky-200/70">
          <p>© {new Date().getFullYear()} Unibox Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import { Text } from "@/components/text";

/* Aruna-style Custom Maritime Vector Line-Art Icons */
function FishermanIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-14 sm:size-16 shrink-0"
      aria-hidden="true"
    >
      {/* Conical Fisherman Hat (Caping) */}
      <path
        d="M32 10L14 26H50L32 10Z"
        stroke="#0284c7"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Hat Strap / Accent */}
      <path
        d="M26 26C26 31 38 31 38 26"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Body / Shoulders */}
      <path
        d="M18 48C18 38 24 35 32 35C40 35 46 38 46 48"
        stroke="#0284c7"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Fishing Hook */}
      <path
        d="M48 36V42C48 45.3137 45.3137 48 42 48"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Base Wave */}
      <path
        d="M12 54C16 52 20 52 24 54C28 56 32 56 36 54C40 52 44 52 48 54C50 55 52 55 54 54"
        stroke="#0284c7"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HubLocationIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-14 sm:size-16 shrink-0"
      aria-hidden="true"
    >
      {/* Map Pin Outer */}
      <path
        d="M32 10C22.0589 10 14 18.0589 14 28C14 41 32 54 32 54C32 54 50 41 50 28C50 18.0589 41.9411 10 32 10Z"
        stroke="#0284c7"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner Target Center */}
      <circle
        cx="32"
        cy="28"
        r="7"
        stroke="#f97316"
        strokeWidth="3"
      />
      {/* Harbor Wave Accents */}
      <path
        d="M18 56H46"
        stroke="#0284c7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

function FishCommodityIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-14 sm:size-16 shrink-0"
      aria-hidden="true"
    >
      {/* Swimming Fish Body */}
      <path
        d="M48 32C48 32 40 18 24 20C12 21.5 8 32 8 32C8 32 12 42.5 24 44C40 46 48 32 48 32Z"
        stroke="#0284c7"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tail Fin */}
      <path
        d="M48 32L58 22V42L48 32Z"
        stroke="#0284c7"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Gill Arch (Orange Accent) */}
      <path
        d="M26 24C29 27 29 37 26 40"
        stroke="#f97316"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Eye */}
      <circle cx="16" cy="30" r="2" fill="#0284c7" />
    </svg>
  );
}

function GlobalTradeIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-14 sm:size-16 shrink-0"
      aria-hidden="true"
    >
      {/* Globe Circle */}
      <circle
        cx="32"
        cy="32"
        r="20"
        stroke="#0284c7"
        strokeWidth="3"
      />
      {/* Latitude / Longitude lines */}
      <ellipse
        cx="32"
        cy="32"
        rx="9"
        ry="20"
        stroke="#0284c7"
        strokeWidth="2"
      />
      <path
        d="M12 32H52"
        stroke="#0284c7"
        strokeWidth="2"
      />
      {/* Route Arrow / Pin (Orange Accent) */}
      <path
        d="M24 44C28 40 36 38 42 22"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
      <circle cx="42" cy="22" r="3" fill="#f97316" />
    </svg>
  );
}

const statistics = [
  {
    renderIcon: FishermanIcon,
    value: "3,000 +",
    label: {
      id: "Nelayan Terlayani",
      en: "Fishers Served",
    },
  },
  {
    renderIcon: HubLocationIcon,
    value: "8 +",
    label: {
      id: "Hub Pesisir & Proyek",
      en: "Coastal Hubs & Projects",
    },
  },
  {
    renderIcon: FishCommodityIcon,
    value: "25 %",
    label: {
      id: "Peningkatan Pendapatan",
      en: "Income Improvement",
    },
  },
  {
    renderIcon: GlobalTradeIcon,
    value: "30 Ton",
    label: {
      id: "Limbah Ikan Diselamatkan",
      en: "Fish Waste Prevented",
    },
  },
];

export function StatsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-sky-900 pt-16 sm:pt-20 text-white">
      {/* Photographic background with bright, luminous ocean surface tone */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/unibox-harbor-aerial.jpg"
          alt="Latar belakang ekosistem maritim Unibox"
          fill
          className="object-cover object-center opacity-30 filter blur-[0.5px]"
          sizes="100vw"
        />
        {/* Bright ocean blue gradient overlay (Surface / Shallow marine zone) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e5c96]/85 via-[#0b4d82]/80 to-[#083c66]/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header: Vertical Blue Accent Bar + Breadcrumb */}
        <div className="flex items-center gap-3 mb-10 sm:mb-12">
          <span className="h-7 w-1.5 rounded-full bg-sky-300 sm:h-8 shadow-sm shadow-sky-300/50" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="font-semibold text-white drop-shadow-sm">
              <Text>{{ id: "Unibox dalam Angka", en: "Unibox in Numbers" }}</Text>
            </span>
          </h2>
        </div>

        {/* 4 White Horizontal Floating Cards (Aruna Reference Style) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 pb-20 sm:pb-28">
          {statistics.map((item, idx) => {
            const IconComponent = item.renderIcon;
            return (
              <div
                key={idx}
                className="group relative flex items-center gap-4 sm:gap-5 rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-xl shadow-blue-950/20 border border-slate-100/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/30"
              >
                {/* Left: Custom Maritime Vector Line Art */}
                <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <IconComponent />
                </div>

                {/* Right: Bold Stat Value & Label */}
                <div className="min-w-0">
                  <div className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                    {item.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-semibold text-slate-600 leading-snug">
                    <Text>{item.label}</Text>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Curved Wave Bottom Divider (Transitioning cleanly into slate-50 / light Solutions Section) */}
      <div className="relative z-10 w-full overflow-hidden leading-none text-slate-50">
        <svg
          className="relative block w-full h-12 sm:h-20 lg:h-24 fill-slate-50"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
}

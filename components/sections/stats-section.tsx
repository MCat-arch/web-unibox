"use client";

import Image from "next/image";
import { CloudRain, Droplets, Sun, Users } from "lucide-react";
import { Text } from "@/components/text";

const statistics = [
  {
    icon: Sun,
    value: "8",
    label: {
      id: "Proyek berhasil diselesaikan secara optimal",
      en: "Projects already successfully completed",
    },
  },
  {
    icon: CloudRain,
    value: "25 %",
    label: {
      id: "Peningkatan pendapatan rata-rata nelayan",
      en: "More income for fishers",
    },
  },
  {
    icon: Users,
    value: "3000",
    label: {
      id: "Nelayan terlayani merasa puas",
      en: "Fishers served were satisfied",
    },
  },
  {
    icon: Droplets,
    value: "30 MT",
    label: {
      id: "Limbah hasil tangkapan terselamatkan",
      en: "Food waste saved",
    },
  },
];

export function StatsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-navy pt-16 sm:pt-20 text-white">
      {/* Photographic background with maritime cold-chain atmosphere */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/unibox-harbor-aerial.jpg"
          alt="Latar belakang ekosistem maritim Unibox"
          fill
          className="object-cover object-center opacity-20 filter blur-[1px]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#091b2e]/95 via-[#0d2744]/90 to-[#091b2e]/98" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        {/* Header: Vertical Blue Accent Bar + Breadcrumb */}
        <div className="flex items-center gap-3 mb-10 sm:mb-14">
          <span className="h-7 w-1.5 rounded-full bg-sky-400 sm:h-8 shadow-sm shadow-sky-400/50" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="font-semibold text-white/90">Unibox</span>
            <span className="text-sky-400 font-bold">»</span>
            <span className="text-white">
              <Text>{{ id: "Statistik", en: "Statistics" }}</Text>
            </span>
          </h2>
        </div>

        {/* 4 Blue Floating Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 pb-20 sm:pb-28">
          {statistics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col items-center justify-between rounded-2xl bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 p-8 text-center text-white shadow-xl shadow-blue-950/40 border border-blue-400/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/25 hover:from-blue-500 hover:to-blue-600"
              >
                {/* Top Icon with smooth pulse/scale */}
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Icon className="size-6 text-white" />
                </div>

                {/* Big Bold Stat Value */}
                <div className="my-2">
                  <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
                    {item.value}
                  </span>
                </div>

                {/* Subtitle / Description */}
                <p className="mt-3 text-xs sm:text-sm font-medium leading-relaxed text-blue-100">
                  <Text>{item.label}</Text>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Curved Wave Bottom Divider (Transitioning cleanly into slate-50 Solutions Section) */}
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

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Cpu,
  Factory,
  Layers,
  Ship,
  Snowflake,
  Truck,
  Warehouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";

interface SolutionItem {
  id: string;
  tabLabel: { id: string; en: string };
  title: { id: string; en: string };
  highlight: { id: string; en: string };
  description: { id: string; en: string };
  image: string;
  correspondingProducts: { id: string; en: string }[];
}

const solutionsData: SolutionItem[] = [
  {
    id: "automated-production",
    tabLabel: {
      id: "Solusi Jalur Produksi Es Otomatis",
      en: "Automated Ice Production Line Solutions",
    },
    title: {
      id: "Solusi Jalur Produksi Es Otomatis",
      en: "Automated Ice Production Line Solutions",
    },
    highlight: {
      id: "Produksi es berkapasitas tinggi membutuhkan sistem terotomatisasi untuk memaksimalkan efisiensi dan menekan biaya tenaga kerja.",
      en: "High-volume ice production requires automated, unmanned systems to maximize efficiency and reduce labor costs.",
    },
    description: {
      id: "Kami menghadirkan lini produksi es terintegrasi penuh, mulai dari pembuatan es kristal/serpih, penyimpanan dingin terkontrol, hingga pengemasan otomatis dengan sistem pemantauan jarak jauh.",
      en: "We deliver fully integrated ice production lines, from ice making to storage, packaging, and delivery, with remote monitoring, automated control, and minimal manual intervention.",
    },
    image: "/images/unibox-product-detail.jpg",
    correspondingProducts: [
      {
        id: "Containerized Flake Ice Machine and Auto Ice Raker System",
        en: "Containerized Flake Ice Machine and Auto Ice Raker System",
      },
      {
        id: "Automatic Edible Ice Production Line",
        en: "Automatic Edible Ice Production Line",
      },
      {
        id: "Direct-cooling Ice Block Machine",
        en: "Direct-cooling Ice Block Machine",
      },
    ],
  },
  {
    id: "complete-ice-plant",
    tabLabel: {
      id: "Solusi Pabrik Es Terpadu",
      en: "Complete Ice Plant Solutions",
    },
    title: {
      id: "Solusi Pabrik Es Terpadu Skala Pelabuhan",
      en: "Complete Ice Plant Solutions for Harbors",
    },
    highlight: {
      id: "Infrastruktur pabrik es modular siap pakai untuk memenuhi pasokan harian kapal nelayan dan pelelangan ikan.",
      en: "Turnkey modular ice plant infrastructure designed to reliably supply daily needs of fishing fleets and auctions.",
    },
    description: {
      id: "Solusi rancang-bangun fasilitas es menyeluruh yang tahan terhadap korosi air laut, hemat energi, serta dilengkapi dengan genset atau panel surya hibrida untuk daerah pesisir kepulauan.",
      en: "Comprehensive facility design resilient against maritime corrosion, energy-optimized, and compatible with hybrid solar power for remote archipelagic coastal zones.",
    },
    image: "/images/unibox-port-cold-storage.jpg",
    correspondingProducts: [
      {
        id: "Modular Flake & Tube Ice Processing Units",
        en: "Modular Flake & Tube Ice Processing Units",
      },
      {
        id: "Overhead Ice Conveying & Dispensing System",
        en: "Overhead Ice Conveying & Dispensing System",
      },
      {
        id: "Integrated Blast Freezing Cold Storage",
        en: "Integrated Blast Freezing Cold Storage",
      },
    ],
  },
  {
    id: "modular-cold-room",
    tabLabel: {
      id: "Penyimpanan Dingin Modular Surya",
      en: "Solar Modular Cold Storage Solutions",
    },
    title: {
      id: "Penyimpanan Dingin Modular Surya Terdesentralisasi",
      en: "Decentralized Solar Modular Cold Storage",
    },
    highlight: {
      id: "Menjaga kualitas tangkapan bernilai tinggi tetap segar sejak detik pertama kapal bersandar hingga distribusi.",
      en: "Maintains top-tier grade quality of fresh seafood from the moment vessels dock until final consumer distribution.",
    },
    description: {
      id: "Unit cold storage modular Unibox dengan insulasi isolasi ganda PUR berdensitas tinggi, kendali suhu otomatis berbasis IoT, serta sistem pelaporan status real-time melalui smartphone.",
      en: "Unibox modular cold storage featuring high-density PUR insulation, IoT-enabled automated thermal management, and real-time smartphone telemetry reporting.",
    },
    image: "/images/unibox-harbor-aerial.jpg",
    correspondingProducts: [
      {
        id: "Smart Solar-Powered Walk-in Cold Room",
        en: "Smart Solar-Powered Walk-in Cold Room",
      },
      {
        id: "IoT Remote Temperature & Humidity Sensor Hub",
        en: "IoT Remote Temperature & Humidity Sensor Hub",
      },
      {
        id: "Multi-temperature Mobile Reefer Modules",
        en: "Multi-temperature Mobile Reefer Modules",
      },
    ],
  },
];

const industries = [
  {
    icon: Ship,
    name: { id: "Penangkapan Ikan Laut", en: "Fisheries Preservation" },
    image: "/images/unibox-fishermen.jpg",
    desc: { id: "Preservasi mutu tangkapan di atas kapal", en: "Onboard catch quality preservation" },
  },
  {
    icon: Warehouse,
    name: { id: "Pelabuhan & Pelelangan", en: "Harbor & Fish Auction" },
    image: "/images/unibox-harbor-aerial.jpg",
    desc: { id: "Pasokan es harian dan hub penyimpanan", en: "Daily ice supply & local cold hub" },
  },
  {
    icon: Factory,
    name: { id: "Pabrik Pengolahan", en: "Seafood Processing" },
    image: "/images/unibox-product-detail.jpg",
    desc: { id: "Lini pendinginan higienis skala pabrik", en: "Hygienic industrial chilling lines" },
  },
  {
    icon: Truck,
    name: { id: "Logistik Rantai Dingin", en: "Refrigerated Logistics" },
    image: "/images/unibox-port-cold-storage.jpg",
    desc: { id: "Distribusi terkontrol antar pulau", en: "Inter-island temperature-controlled transit" },
  },
];

export function SolutionsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const { language } = useLanguage();
  const currentSolution = solutionsData[activeTab] ?? solutionsData[0];

  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header (Attachment 1 reference) */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end mb-12 sm:mb-16">
          <div>
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-sm">
              <Cpu className="size-3.5 text-blue-600 animate-pulse" />
              <Text>{{ id: "SOLUSI SPESIFIKASI KHUSUS", en: "CUSTOMIZED SOLUTION" }}</Text>
            </div>

            {/* Main Title */}
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.2]">
              <Text>
                {{
                  id: "Solusi Mesin Es & Cold Chain End-to-End untuk Berbagai Industri",
                  en: "End to End Ice Machine Solutions for Diverse Industries",
                }}
              </Text>
            </h2>
          </div>

          {/* Right Lead Paragraph */}
          <div className="lg:pl-6">
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              <Text>
                {{
                  id: "Sebagai pelopor teknologi pendingin maritim, Unibox menghadirkan solusi pembuatan es dan cold storage modular terpadu untuk pengawetan hasil tangkapan laut, fasilitas pelabuhan, pemrosesan pangan, hingga logistik rantai dingin.",
                  en: "As a leading ice machine and cold-chain innovator, Unibox provides customized ice making solutions for a wide range of applications, including fisheries preservation, food processing, harbor storage, and distribution.",
                }}
              </Text>
            </p>
          </div>
        </div>

        {/* Main Showcase Split Card Container (Attachment 1 reference) */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <div className="grid lg:grid-cols-[1.3fr_1fr]">
            {/* Left Blueprint / Schematic Panel */}
            <div className="relative min-h-[420px] sm:min-h-[500px] flex flex-col justify-between overflow-hidden bg-[#0d2a4a] p-6 sm:p-8">
              {/* Technical cyan blueprint grid background */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right, rgba(56, 189, 248, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.1) 1px, transparent 1px)`,
                  backgroundSize: "24px 24px, 48px 48px, 48px 48px",
                }}
              />

              {/* Main Machine / Cold Storage Image */}
              <div className="relative z-10 my-auto w-full aspect-[16/10] overflow-hidden rounded-xl border border-sky-400/20 shadow-2xl">
                <Image
                  src={currentSolution.image}
                  alt={currentSolution.title[language]}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
              </div>

              {/* Corresponding Products Overlay Bar (Attachment 1 reference) */}
              <div className="relative z-10 mt-6 rounded-xl border border-sky-400/30 bg-sky-950/60 p-4 sm:p-5 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-wider text-sky-300">
                  <Text>{{ id: "Produk Terkait", en: "Corresponding Products" }}</Text>
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {currentSolution.correspondingProducts.map((prod, pIdx) => (
                    <span
                      key={pIdx}
                      className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/30 bg-sky-900/50 px-3 py-1 text-xs font-medium text-sky-100"
                    >
                      <span className="text-sky-400 font-bold">✓</span>
                      <span>{prod[language]}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Detail & Tab Switcher Panel */}
            <div className="flex flex-col justify-between p-6 sm:p-10 bg-white">
              <div>
                {/* Active Solution Title */}
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                  {currentSolution.title[language]}
                </h3>

                {/* Highlight Point with Blue Bullet Icon */}
                <div className="mt-5 flex items-start gap-3 rounded-xl bg-blue-50/80 p-4 border border-blue-200/80">
                  <CheckCircle2 className="size-5 shrink-0 text-blue-600 mt-0.5" />
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                    {currentSolution.highlight[language]}
                  </p>
                </div>

                {/* Description */}
                <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-600">
                  {currentSolution.description[language]}
                </p>
              </div>

              {/* Action Switcher Tabs (Attachment 1 style: Pill buttons) */}
              <div className="mt-8 space-y-3 pt-6 border-t border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <Text>{{ id: "Pilihan Solusi Tersedia", en: "Available Solution Modes" }}</Text>
                </p>
                {solutionsData.map((sol, index) => {
                  const isActive = index === activeTab;
                  return (
                    <button
                      key={sol.id}
                      type="button"
                      onClick={() => setActiveTab(index)}
                      className={`w-full flex items-center justify-between gap-3 px-5 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-[1.01]"
                          : "bg-blue-50/40 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-blue-100/80"
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <Layers
                          className={`size-4 shrink-0 ${
                            isActive ? "text-white" : "text-blue-500"
                          }`}
                        />
                        <span className="truncate">{sol.tabLabel[language]}</span>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/25 text-white"
                            : "bg-blue-100/80 text-blue-700 font-semibold"
                        }`}
                      >
                        0{index + 1}
                      </span>
                    </button>
                  );
                })}

                <div className="pt-2">
                  <Button asChild className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 shadow-md shadow-blue-500/20">
                    <Link href="/product">
                      <Text>{{ id: "Konsultasikan Kebutuhan Proyek", en: "Consult Project Requirements" }}</Text>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Horizontal Industry/Application Bar (Attachment 1 reference) */}
          <div className="border-t border-slate-200 bg-slate-50/70 p-5 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              <Text>{{ id: "Penerapan di Berbagai Industri", en: "Applications Across Industries" }}</Text>
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {industries.map((ind, iIdx) => {
                const Icon = ind.icon;
                return (
                  <div
                    key={iIdx}
                    className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-300"
                  >
                    <div className="relative mb-3 h-24 w-full overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={ind.image}
                        alt={ind.name[language]}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(min-width: 640px) 25vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon className="size-4 shrink-0 text-blue-600" />
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {ind.name[language]}
                      </h4>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">
                      {ind.desc[language]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

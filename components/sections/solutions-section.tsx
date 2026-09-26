"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";

function SonarRadarVisual() {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#081827] flex items-center justify-center border border-sky-900/60 shadow-inner">
      {/* Radar grid circles */}
      <div className="absolute size-52 rounded-full border border-sky-500/25" />
      <div className="absolute size-36 rounded-full border border-sky-500/35" />
      <div className="absolute size-20 rounded-full border border-sky-500/45" />
      <div className="absolute h-full w-px bg-sky-500/25" />
      <div className="absolute w-full h-px bg-sky-500/25" />

      {/* Rotating scanner beam */}
      <div
        className="absolute inset-0 origin-center animate-spin"
        style={{
          animationDuration: "6s",
          background:
            "conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(56, 189, 248, 0.25) 360deg)",
        }}
      />

      {/* Fish blips */}
      <div className="absolute top-1/4 left-1/3 flex items-center gap-1.5 animate-pulse">
        <span className="size-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
        <span className="text-[10px] font-mono text-emerald-300">Target 45m</span>
      </div>
      <div className="absolute bottom-1/3 right-1/4 flex items-center gap-1.5 animate-pulse">
        <span className="size-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
        <span className="text-[10px] font-mono text-emerald-300">Cluster 82m</span>
      </div>

      <div className="absolute bottom-3 left-4 rounded-md bg-black/60 px-2.5 py-1 text-[11px] font-mono text-sky-300 backdrop-blur-sm border border-sky-500/20">
        Sonar Ultrasonik Range: 100m Active
      </div>
    </div>
  );
}

const features = [
  {
    number: "01",
    title: {
      id: "Sumber Energi Mandiri di Perahu",
      en: "Self-Sustaining Energy Source Onboard",
    },
    description: {
      id: "Unibox bisa menghasilkan listrik sendiri dengan mengubah putaran flywheel mesin perahu menjadi energi listrik. Nelayan tidak lagi bergantung pada accu motor yang boros biaya dan mudah rusak.",
      en: "Unibox generates its own electricity by converting the rotation of the boat engine's flywheel into electrical power. Fishers no longer depend on expensive and fragile motorcycle batteries.",
    },
    image: "/images/unibox-fishermen.jpg",
    customVisual: false,
  },
  {
    number: "02",
    title: {
      id: "Pencarian Ikan Lebih Cepat dan Efisien",
      en: "Faster & More Efficient Fish Finding",
    },
    description: {
      id: "Dilengkapi dengan radar sonar ultrasonik yang bisa mendeteksi lokasi sebaran ikan hingga 100 meter. Hemat waktu, hemat bahan bakar, dan lebih ramah lingkungan karena mengurangi emisi polusi.",
      en: "Equipped with ultrasonic sonar radar capable of detecting fish school locations up to 100 meters. Saves time, conserves fuel, and protects the marine environment by reducing carbon emissions.",
    },
    image: "",
    customVisual: true,
  },
  {
    number: "03",
    title: {
      id: "Memiliki Kapasitas Pendingin Hingga 100 Liter",
      en: "Cooling Capacity up to 100 Liters",
    },
    description: {
      id: "Dirancang dengan kotak berinsulasi rapat ganda bervolume hingga 100 liter. Menjaga suhu stabil selama hari-hari melaut, bodi kokoh tahan ombak, dan sangat praktis ditempatkan di perahu nelayan.",
      en: "Engineered with a dual high-density insulated box holding up to 100 liters. Maintains thermal stability during long fishing trips, rugged against ocean conditions, and easily fits aboard fishing boats.",
    },
    image: "/images/unibox-port-cold-storage.jpg",
    customVisual: false,
  },
  {
    number: "04",
    title: {
      id: "Mengurangi Kerugian Akibat Ikan Busuk",
      en: "Reducing Losses from Spoiled Catch",
    },
    description: {
      id: "Dengan teknologi pendingin ramah lingkungan berbasis refrigerant R32, ikan bisa tetap segar tanpa harus bergantung pada es batu. Nelayan tidak perlu lagi membuang sebagian hasil tangkapan karena pembusukan.",
      en: "Powered by eco-friendly R32 refrigerant cooling technology, fish stays fresh without relying on conventional ice blocks. Fishers no longer need to discard valuable catch due to spoilage.",
    },
    image: "/images/unibox-product-detail.jpg",
    customVisual: false,
  },
  {
    number: "05",
    title: {
      id: "Sistem Penerangan Perahu yang Aman dan Efisien",
      en: "Safe & Efficient Boat Lighting System",
    },
    description: {
      id: "Menggunakan teknologi Light Emitting Diode (LED) yang rendah daya, terang, dan tahan lama, serta pemberian pelindung tahan air membuat proses penerangan pada perahu menjadi lebih optimal, murah, tahan lama, dan efisien.",
      en: "Utilizing low-power, high-brightness, and long-lasting Light Emitting Diode (LED) technology with waterproof marine enclosures, making nighttime boat illumination optimal, affordable, and durable.",
    },
    image: "/images/unibox-harbor-aerial.jpg",
    customVisual: false,
  },
];

export function SolutionsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // Default open first item
  const { language } = useLanguage();

  const toggleStep = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-slate-50 py-16 sm:py-24 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Authentic Unibox Value Proposition */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Header: Vertical Blue Accent Bar + Breadcrumb */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <span className="h-6 w-1 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50" />
                <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-blue-700">
                  <Text>{{ id: "Kenapa Unibox", en: "Why Unibox" }}</Text>
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-[1.25]">
                <Text>
                  {{
                    id: "Smart Fish Cooling System untuk Nelayan",
                    en: "Smart Fish Cooling System for Fishers",
                  }}
                </Text>
              </h2>

              {/* Official Caption from Unibox Instagram */}
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-700 font-medium">
                <Text>
                  {{
                    id: "Unibox dirancang dengan sistem pendingin efisien, insulasi rapat, serta sensor suhu presisi. Hasilnya? Ikan lebih awet, kualitas terjaga, dan potensi kehilangan hasil tangkapan bisa ditekan.",
                    en: "Unibox is engineered with an efficient cooling system, tight insulation, and precision temperature sensors. The result? Fresher fish, protected quality, and minimized catch loss.",
                  }}
                </Text>
              </p>

              <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-600">
                <Text>
                  {{
                    id: "Sebuah ekosistem terpadu di atas perahu nelayan: mengubah putaran mesin perahu menjadi sumber listrik mandiri, pendinginan bebas es batu konvensional, sonar pendeteksi ikan, serta penerangan LED maritim hemat energi.",
                    en: "A unified system aboard fishing vessels: converting engine rotation into self-sufficient power, ice-free refrigeration, fish-finding sonar, and energy-saving marine LED lighting.",
                  }}
                </Text>
              </p>
            </div>

            {/* 4 Clean Typographic Spec Callouts (No cluttered icons) */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
                <span className="block text-xl sm:text-2xl font-extrabold text-blue-700">100 L</span>
                <span className="block text-xs font-bold text-slate-800 mt-1">
                  <Text>{{ id: "Kapasitas Pendingin", en: "Cooling Capacity" }}</Text>
                </span>
                <span className="block text-[11px] text-slate-500 mt-0.5">
                  <Text>{{ id: "Insulasi rapat ganda", en: "Dual tight insulation" }}</Text>
                </span>
              </div>

              <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
                <span className="block text-xl sm:text-2xl font-extrabold text-blue-700">R32</span>
                <span className="block text-xs font-bold text-slate-800 mt-1">
                  <Text>{{ id: "Refrigerant Ramah", en: "Eco Refrigerant" }}</Text>
                </span>
                <span className="block text-[11px] text-slate-500 mt-0.5">
                  <Text>{{ id: "Bebas es batu balok", en: "Ice-block free" }}</Text>
                </span>
              </div>

              <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
                <span className="block text-xl sm:text-2xl font-extrabold text-blue-700">100 m</span>
                <span className="block text-xs font-bold text-slate-800 mt-1">
                  <Text>{{ id: "Jangkauan Sonar", en: "Sonar Range" }}</Text>
                </span>
                <span className="block text-[11px] text-slate-500 mt-0.5">
                  <Text>{{ id: "Radar sebaran ikan", en: "Fish school radar" }}</Text>
                </span>
              </div>

              <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
                <span className="block text-xl sm:text-2xl font-extrabold text-blue-700">Flywheel</span>
                <span className="block text-xs font-bold text-slate-800 mt-1">
                  <Text>{{ id: "Energi Mandiri", en: "Self-Sufficient Power" }}</Text>
                </span>
                <span className="block text-[11px] text-slate-500 mt-0.5">
                  <Text>{{ id: "Putaran mesin perahu", en: "Boat engine conversion" }}</Text>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Interactive Unibox Features (Accordion Style) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/80 bg-slate-100/60 p-4 sm:p-6">
              <div className="space-y-3">
                {features.map((item, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div
                      key={item.number}
                      className={`overflow-hidden rounded-2xl transition-all duration-300 border ${isOpen
                        ? "bg-white border-blue-200 shadow-md shadow-blue-900/5"
                        : "bg-white/90 border-slate-200/70 shadow-xs"
                        }`}
                    >
                      {/* Button Header (Distinct button vs hover colors) */}
                      <button
                        type="button"
                        onClick={() => toggleStep(idx)}
                        className={`w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-4.5 text-left transition-colors duration-200 cursor-pointer ${isOpen
                          ? "bg-white"
                          : "hover:bg-slate-100/90 hover:border-slate-300"
                          }`}
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                          {/* Number badge */}
                          <span
                            className={`shrink-0 grid size-8 place-items-center rounded-full text-xs font-extrabold transition-colors ${isOpen
                              ? "bg-blue-600 text-white shadow-xs"
                              : "bg-blue-50 text-blue-700 border border-blue-200/60"
                              }`}
                          >
                            {item.number}
                          </span>
                          <span
                            className={`font-display text-sm sm:text-base font-bold truncate ${isOpen ? "text-blue-700" : "text-slate-800"
                              }`}
                          >
                            {item.title[language]}
                          </span>
                        </div>

                        {/* Functional Toggle Button */}
                        <div
                          className={`shrink-0 grid size-7 place-items-center rounded-full border transition-colors ${isOpen
                            ? "border-blue-300 bg-blue-50 text-blue-600"
                            : "border-slate-300 bg-slate-50 text-slate-500"
                            }`}
                        >
                          {isOpen ? (
                            <Minus className="size-4" />
                          ) : (
                            <Plus className="size-4" />
                          )}
                        </div>
                      </button>

                      {/* Expandable Explanation + Photo/Visual (Hidden until clicked) */}
                      {isOpen && (
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-2 border-t border-slate-100">
                          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 mb-5">
                            {item.description[language]}
                          </p>

                          {/* Photo / Visual */}
                          {item.customVisual ? (
                            <SonarRadarVisual />
                          ) : (
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-slate-100">
                              <Image
                                src={item.image}
                                alt={item.title[language]}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 50vw, 100vw"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/page-intro";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";

const keySpecs = [
  {
    value: "-10°C",
    label: { id: "Suhu Pendinginan", en: "Cooling Temperature" },
    desc: { id: "Pendinginan optimal hingga -10 Celcius", en: "Optimal cooling down to -10 Celsius" },
  },
  {
    value: "100 L",
    label: { id: "Kapasitas Muatan", en: "Storage Capacity" },
    desc: { id: "Volume simpan 100 Liter perahu nelayan", en: "100-Liter storage volume for fishing boats" },
  },
  {
    value: "Stainless",
    label: { id: "Material Bodi", en: "Body Material" },
    desc: { id: "Stainless steel higienis anti karat laut", en: "Hygienic marine-grade stainless steel" },
  },
  {
    value: "± 200 W",
    label: { id: "Konsumsi Daya", en: "Power Consumption" },
    desc: { id: "Efisiensi tinggi hemat energi listrik", en: "High energy-efficient electrical draw" },
  },
];

const coreAdvantages = [
  {
    number: "01",
    title: {
      id: "Sistem Pembangkit Listrik Mandiri",
      en: "Self-Sustaining Power Generation",
    },
    description: {
      id: "Mengubah energi kinetik putaran flywheel mesin perahu menjadi daya listrik DC stabil. Membebaskan nelayan dari biaya cas aki motor yang mahal dan rawan tekor di laut.",
      en: "Converts kinetic energy from the boat engine's flywheel into stable DC power, eliminating reliance on costly and fragile motorcycle batteries at sea.",
    },
  },
  {
    number: "02",
    title: {
      id: "Cadangan Baterai Terintegrasi",
      en: "Integrated Battery Backup",
    },
    description: {
      id: "Dilengkapi sistem cadangan baterai cerdas yang memastikan sirkulasi dingin dan sensor tetap bekerja tanpa putus saat mesin perahu dimatikan atau bersandar.",
      en: "Equipped with a smart battery backup ensuring uninterrupted cooling and sensors even when the boat engine is idle or anchored.",
    },
  },
  {
    number: "03",
    title: {
      id: "Integrasi Fish Finder Sonar 100m",
      en: "Integrated 100m Sonar Fish Finder",
    },
    description: {
      id: "Transduser ultrasonik pendeteksi sebaran dan kedalaman ikan radius 100 meter terhubung langsung ke sistem, menghemat konsumsi bahan bakar solar hingga 30%.",
      en: "Ultrasonic transducer detecting fish school location and depth within 100-meter radius, slashing boat diesel fuel consumption by up to 30%.",
    },
  },
  {
    number: "04",
    title: {
      id: "Layar Digital & Tampilan Indikator LCD",
      en: "Digital Display & LCD Indicators",
    },
    description: {
      id: "Panel kontrol digital tahan air dengan indikator LCD presisi yang memudahkan nelayan memantau suhu ruang pendingin, voltase listrik, dan status sistem secara real-time.",
      en: "Waterproof digital control panel with precision LCD indicators, allowing fishers to monitor internal temperature, voltage, and system status in real time.",
    },
  },
];

const comparisons = [
  {
    feature: { id: "Sistem Pendingin", en: "Cooling Method" },
    conventional: {
      id: "Ketergantungan es batu balok yang cepat mencair dan memakan ruang muatan",
      en: "Heavy reliance on bulky ice blocks that melt rapidly and occupy deck space",
    },
    unibox: {
      id: "Sistem pendingin berbasis refrigerant R32 suhu hingga -10°C tanpa es batu",
      en: "R32 eco-refrigerant cooling system reaching -10°C with zero ice blocks needed",
    },
  },
  {
    feature: { id: "Sumber Kelistrikan", en: "Electrical Power" },
    conventional: {
      id: "Menggunakan accu motor yang boros biaya cas dan mudah rusak korosi air asin",
      en: "Fragile motorcycle batteries with high recharge costs and rapid saltwater corrosion",
    },
    unibox: {
      id: "Pembangkit listrik mandiri putaran flywheel mesin perahu + cadangan baterai",
      en: "Self-generating power from engine flywheel rotation plus built-in battery backup",
    },
  },
  {
    feature: { id: "Pencarian Ikan", en: "Fish Finding" },
    conventional: {
      id: "Pencarian manual berdasarkan insting, boros waktu dan solar",
      en: "Manual instinct-based searching resulting in wasted fuel and valuable voyage hours",
    },
    unibox: {
      id: "Integrasi radar sonar ultrasonik pendeteksi gerombolan ikan radius 100 meter",
      en: "Integrated ultrasonic sonar radar locating fish schools up to a 100-meter radius",
    },
  },
  {
    feature: { id: "Material & Ketahanan", en: "Material & Durability" },
    conventional: {
      id: "Boks gabus/plastik tipis mudah retak hantaman ombak dan sulit dibersihkan",
      en: "Styrofoam or thin plastic boxes easily cracked by ocean waves and hard to sanitize",
    },
    unibox: {
      id: "Bodi stainless steel higienis, anti karat laut, dengan insulasi ganda rapat",
      en: "Hygienic marine stainless steel body, corrosion-proof, with dual tight insulation",
    },
  },
  {
    feature: { id: "Monitoring Suhu", en: "Temperature Monitoring" },
    conventional: {
      id: "Tanpa indikator suhu, risiko ikan membusuk tinggi tanpa disadari",
      en: "No temperature monitoring, leaving high risk of unnoticed fish spoilage",
    },
    unibox: {
      id: "Layar digital & indikator LCD pemantau suhu presisi di atas dek",
      en: "Precision digital display and LCD indicators monitored directly on deck",
    },
  },
];

export function AboutContent() {
  const { language } = useLanguage();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Intro with Official Definition */}
      <PageIntro
        eyebrow={{ id: "Tentang Unibox", en: "About Unibox" }}
        title={{
          id: "Inovasi Teknologi Kemaritiman untuk Efektivitas & Produktivitas Nelayan",
          en: "Maritime Technology Innovation for Fisher Effectiveness & Productivity",
        }}
        description={{
          id: "Unibox adalah inovasi teknologi kemaritiman yang dirancang untuk meningkatkan efektivitas dan produktivitas nelayan dalam mencari ikan serta menjaga kesegaran hasil tangkapan di laut.",
          en: "Unibox is a maritime technology innovation engineered to enhance the effectiveness and productivity of fishers in locating fish while preserving the freshness of marine catches at sea.",
        }}
      />

      {/* Engineering Philosophy: Konversi Energi & Konservasi Termal */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Photo / Visual */}
          <div className="lg:col-span-6 relative aspect-[16/11] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-blue-950/10">
            <Image
              src="/images/unibox-fishermen.jpg"
              alt="Nelayan mitra Unibox di atas perahu"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          {/* Core Philosophy Copywriting */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-5 w-1 rounded-full bg-blue-600 shadow-sm shadow-blue-600/40" />
              <span className="text-xs font-bold tracking-wider uppercase text-blue-700">
                <Text>{{ id: "Prinsip Rekayasa", en: "Engineering Principle" }}</Text>
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              <Text>
                {{
                  id: "Teknologi Pendinginan Berbasis Konversi Energi Mesin Perahu",
                  en: "Cooling Technology Based on Boat Engine Energy Conversion",
                }}
              </Text>
            </h2>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-700 font-medium">
              <Text>
                {{
                  id: "Teknologi pendinginan berbasis konversi energi untuk mempertahankan kualitas ikan tangkapan nelayan melalui metode konservasi termal yang efisien.",
                  en: "Refrigeration technology based on energy conversion to maintain the quality of fish caught by fishers through an efficient thermal conservation method.",
                }}
              </Text>
            </p>

            <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-600">
              <Text>
                {{
                  id: "Lahir dari observasi langsung di sentra pesisir Indonesia, Unibox menjawab tantangan nelayan skala kecil yang selama ini terbebani tingginya biaya pembelian es batu balok yang cepat mencair, kerentanan aki motor, dan hilangnya nilai jual tangkapan akibat pembusukan.",
                  en: "Originating from direct observation in Indonesian coastal hubs, Unibox addresses challenges faced by artisanal fishers burdened by expensive fast-melting ice blocks, vulnerable batteries, and fish spoilage that devalues their hard-earned catch.",
                }}
              </Text>
            </p>

            <div className="mt-6 rounded-xl bg-blue-50/80 p-4 border border-blue-200/80">
              <p className="text-xs sm:text-sm font-semibold text-blue-900 leading-relaxed">
                <Text>
                  {{
                    id: "Terintegrasi dalam Satu Box: Pembangkit listrik putaran mesin, kompresi gas ramah lingkungan, radar sonar 100m, dan lampu LED maritim bekerja terpadu dalam satu unit kompak.",
                    en: "Integrated in One Box: Engine-rotation power generation, eco-friendly gas compression, 100m sonar radar, and marine LED lighting working seamlessly in a single compact unit.",
                  }}
                </Text>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Key Physical & Electrical Specifications */}
      <section className="bg-white py-16 sm:py-20 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              <Text>{{ id: "Spesifikasi Teknis Resmi Unibox", en: "Official Unibox Technical Specifications" }}</Text>
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-600">
              <Text>
                {{
                  id: "Konfigurasi teruji laboratorium dan uji coba lapangan di perahu nelayan pesisir.",
                  en: "Laboratory-verified and field-tested configuration aboard coastal fishing boats.",
                }}
              </Text>
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {keySpecs.map((spec, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6 shadow-xs text-center transition-all duration-300 hover:shadow-md hover:bg-white hover:-translate-y-1"
              >
                <span className="block font-display text-3xl sm:text-4xl font-extrabold text-blue-700">
                  {spec.value}
                </span>
                <span className="block text-xs sm:text-sm font-bold text-slate-900 mt-2">
                  <Text>{spec.label}</Text>
                </span>
                <span className="block text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug">
                  <Text>{spec.desc}</Text>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Core Integrated Advantages */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-5 w-1 rounded-full bg-blue-600 shadow-sm shadow-blue-600/40" />
            <span className="text-xs font-bold tracking-wider uppercase text-blue-700">
              <Text>{{ id: "Fitur Unggulan", en: "Core Advantages" }}</Text>
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            <Text>{{ id: "Keunggulan Sistem Rekayasa Unibox", en: "Unibox Engineering System Advantages" }}</Text>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            <Text>
              {{
                id: "Empat pilar keunggulan teknologi yang mengubah perahu tradisional menjadi armada modern.",
                en: "Four technological pillars turning traditional boats into modern fishing fleets.",
              }}
            </Text>
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coreAdvantages.map((adv) => (
            <div
              key={adv.number}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200"
            >
              <div>
                <span className="grid size-10 place-items-center rounded-xl bg-blue-600 font-display text-sm font-bold text-white shadow-md shadow-blue-600/30">
                  {adv.number}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-900 leading-snug">
                  <Text>{adv.title}</Text>
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                  <Text>{adv.description}</Text>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Head-to-Head Comparison: Conventional vs Unibox */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-5 w-1 rounded-full bg-blue-600 shadow-sm shadow-blue-600/40" />
              <span className="text-xs font-bold tracking-wider uppercase text-blue-700">
                <Text>{{ id: "Komparasi Lapangan", en: "Field Comparison" }}</Text>
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              <Text>
                {{
                  id: "Metode Konvensional vs Ekosistem Unibox",
                  en: "Conventional Method vs Unibox Ecosystem",
                }}
              </Text>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              <Text>
                {{
                  id: "Perbandingan nyata dampak efisiensi dan keamanan kualitas tangkapan nelayan di laut.",
                  en: "A real comparison of efficiency and seafood quality assurance at sea.",
                }}
              </Text>
            </p>
          </div>

          {/* Table / Card Comparison */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-12 bg-slate-100/90 p-4 sm:p-5 text-xs sm:text-sm font-bold border-b border-slate-200">
              <div className="col-span-3 text-slate-700">
                <Text>{{ id: "Aspek Operasional", en: "Operational Aspect" }}</Text>
              </div>
              <div className="col-span-4 sm:col-span-4 text-rose-700">
                <Text>{{ id: "Cara Konvensional", en: "Conventional Method" }}</Text>
              </div>
              <div className="col-span-5 sm:col-span-5 text-blue-700">
                <Text>{{ id: "Dengan Ekosistem Unibox", en: "With Unibox Ecosystem" }}</Text>
              </div>
            </div>

            <div className="divide-y divide-slate-100 bg-white">
              {comparisons.map((c, idx) => (
                <div key={idx} className="grid grid-cols-12 p-4 sm:p-5 items-start text-xs sm:text-sm">
                  <div className="col-span-3 font-bold text-slate-900 pr-2">
                    <Text>{c.feature}</Text>
                  </div>
                  <div className="col-span-4 sm:col-span-4 text-slate-600 pr-3 flex items-start gap-2">
                    <X className="size-4 text-rose-500 shrink-0 mt-0.5" />
                    <span><Text>{c.conventional}</Text></span>
                  </div>
                  <div className="col-span-5 sm:col-span-5 text-slate-800 font-medium flex items-start gap-2">
                    <Check className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><Text>{c.unibox}</Text></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Collaboration Banner */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-6 rounded-3xl bg-gradient-to-r from-[#092644] to-[#0d3b68] p-8 sm:p-12 text-white shadow-2xl shadow-blue-950/30 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white">
              <Text>
                {{
                  id: "Ingin Bermitra atau Menerapkan Unibox di Wilayah Anda?",
                  en: "Interested in Partnering or Deploying Unibox in Your Region?",
                }}
              </Text>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-sky-100/80 leading-relaxed">
              <Text>
                {{
                  id: "Kami menyambut baik kerja sama dengan kelompok nelayan, pemerintah daerah, dan pelaku industri perikanan.",
                  en: "We welcome collaborations with fishing groups, local governments, and maritime industry leaders.",
                }}
              </Text>
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="shrink-0 rounded-full bg-white text-blue-900 hover:bg-sky-50 font-bold px-8 py-6 text-sm sm:text-base shadow-xl transition-transform hover:scale-105"
          >
            <Link href="/contact">
              <Text>{{ id: "Hubungi Tim Kami", en: "Contact Our Team" }}</Text>
              <ArrowRight className="size-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

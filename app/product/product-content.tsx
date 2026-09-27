"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";

function SonarRadarVisual() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#081827] flex items-center justify-center border border-sky-900/60 shadow-xl shadow-blue-950/40">
      {/* Radar grid circles */}
      <div className="absolute size-40 sm:size-64 rounded-full border border-sky-500/25" />
      <div className="absolute size-28 sm:size-44 rounded-full border border-sky-500/35" />
      <div className="absolute size-16 sm:size-24 rounded-full border border-sky-500/45" />
      <div className="absolute h-full w-px bg-sky-500/25" />
      <div className="absolute w-full h-px bg-sky-500/25" />

      {/* Rotating scanner beam */}
      <div
        className="absolute inset-0 origin-center animate-spin"
        style={{
          animationDuration: "6s",
          background:
            "conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(56, 189, 248, 0.3) 360deg)",
        }}
      />

      {/* Fish blips */}
      <div className="absolute top-1/4 left-1/3 flex items-center gap-1.5 animate-pulse">
        <span className="size-2 sm:size-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
        <span className="text-[10px] sm:text-[11px] font-mono text-emerald-300 font-bold">Target 45m</span>
      </div>
      <div className="absolute bottom-1/3 right-1/4 flex items-center gap-1.5 animate-pulse">
        <span className="size-2 sm:size-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
        <span className="text-[10px] sm:text-[11px] font-mono text-emerald-300 font-bold">Cluster 82m</span>
      </div>

      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-5 rounded-md bg-black/70 px-2.5 py-1 text-[10px] sm:text-xs font-mono text-sky-300 backdrop-blur-sm border border-sky-500/30">
        Sonar Ultrasonik Range: 100m Active
      </div>
    </div>
  );
}

const productModules = [
  {
    number: "01",
    badge: { id: "Elektrifikasi Kapal", en: "Vessel Electrification" },
    title: {
      id: "Sumber Energi Mandiri di Perahu",
      en: "Self-Sustaining Energy Source Onboard",
    },
    subtitle: {
      id: "Pembangkit Listrik Flywheel Generator",
      en: "Flywheel Generator Power Generation",
    },
    description: {
      id: "Unibox bisa menghasilkan listrik sendiri dengan mengubah putaran flywheel mesin perahu menjadi energi listrik. Nelayan tidak lagi bergantung pada accu motor yang boros biaya, rawan tekor, dan mudah rusak akibat paparan air garam.",
      en: "Unibox generates its own electricity by converting the rotation of the boat engine's flywheel into electrical power. Fishers no longer depend on fragile and expensive motorcycle batteries damaged by saltwater.",
    },
    metrics: [
      { label: { id: "Sumber Energi", en: "Energy Source" }, value: "Flywheel" },
      { label: { id: "Tegangan Output", en: "Output Voltage" }, value: "12V / 24V" },
      { label: { id: "Penghematan Aki", en: "Battery Savings" }, value: "100%" },
    ],
    image: "/images/unibox-fishermen.jpg",
    customVisual: false,
    imageLeft: false,
  },
  {
    number: "02",
    badge: { id: "Teknologi Pendingin", en: "Cooling Technology" },
    title: {
      id: "Mengurangi Kerugian Akibat Ikan Busuk",
      en: "Eliminating Losses from Spoiled Catch",
    },
    subtitle: {
      id: "Sistem Pendingin Refrigerant R32",
      en: "R32 Eco-Refrigerant Cooling System",
    },
    description: {
      id: "Dengan teknologi pendingin ramah lingkungan berbasis refrigerant R32, ikan bisa tetap segar tanpa harus bergantung pada es batu balok. Nelayan tidak perlu lagi membuang sebagian hasil tangkapan karena pembusukan saat melaut berhari-hari.",
      en: "Powered by eco-friendly R32 refrigerant cooling technology, fish stays fresh without relying on conventional ice blocks. Fishers no longer discard valuable catches due to spoilage during multi-day trips.",
    },
    metrics: [
      { label: { id: "Tipe Refrigeran", en: "Refrigerant Type" }, value: "R32 Eco" },
      { label: { id: "Suhu Stabil", en: "Stable Temp" }, value: "0°C – 4°C" },
      { label: { id: "Kualitas Mutu", en: "Quality Standard" }, value: "Grade-A" },
    ],
    image: "/images/unibox-product-detail.jpg",
    customVisual: false,
    imageLeft: true,
  },
  {
    number: "03",
    badge: { id: "Kapasitas & Ketahanan", en: "Capacity & Durability" },
    title: {
      id: "Memiliki Kapasitas Pendingin Hingga 100 Liter",
      en: "Cooling Capacity up to 100 Liters",
    },
    subtitle: {
      id: "Cool Box Insulasi Rapat Ganda",
      en: "Dual High-Density Insulated Cool Box",
    },
    description: {
      id: "Dirancang dengan kotak berinsulasi rapat ganda bervolume hingga 100 liter. Menjaga suhu stabil selama hari-hari melaut, bodi kokoh tahan hantaman ombak, gasket kedap air, dan sangat praktis ditempatkan di dek perahu nelayan.",
      en: "Engineered with a dual high-density insulated box holding up to 100 liters. Maintains thermal stability during long fishing trips, rugged against ocean waves, and easily fits aboard fishing boat decks.",
    },
    metrics: [
      { label: { id: "Kapasitas Volume", en: "Volume Capacity" }, value: "100 Liter" },
      { label: { id: "Muatan Ikan", en: "Fish Capacity" }, value: "~60-75 kg" },
      { label: { id: "Material Bodi", en: "Body Material" }, value: "Food-Grade" },
    ],
    image: "/images/unibox-port-cold-storage.jpg",
    customVisual: false,
    imageLeft: false,
  },
  {
    number: "04",
    badge: { id: "Navigasi & Pencarian Ikan", en: "Navigation & Fish Finding" },
    title: {
      id: "Pencarian Ikan Lebih Cepat dan Efisien",
      en: "Faster & More Efficient Fish Finding",
    },
    subtitle: {
      id: "Radar Sonar Ultrasonik 100 Meter",
      en: "100-Meter Ultrasonic Sonar Radar",
    },
    description: {
      id: "Dilengkapi dengan radar sonar ultrasonik yang bisa mendeteksi lokasi dan kedalaman sebaran ikan hingga 100 meter. Nelayan dapat langsung menuju titik gerombolan ikan, hemat waktu, hemat bahan bakar solar, dan lebih ramah lingkungan.",
      en: "Equipped with ultrasonic sonar radar capable of detecting fish school locations and depth up to 100 meters. Fishers navigate directly to fishing grounds, saving time, conserving fuel, and reducing emissions.",
    },
    metrics: [
      { label: { id: "Jangkauan Deteksi", en: "Detection Range" }, value: "100 Meter" },
      { label: { id: "Teknologi Sensor", en: "Sensor Type" }, value: "Ultrasonik" },
      { label: { id: "Efisiensi Solar", en: "Fuel Efficiency" }, value: "Hingga 30%" },
    ],
    image: "",
    customVisual: true,
    imageLeft: true,
  },
  {
    number: "05",
    badge: { id: "Pencahayaan Maritim", en: "Marine Illumination" },
    title: {
      id: "Sistem Penerangan Perahu yang Aman dan Efisien",
      en: "Safe & Efficient Boat Lighting System",
    },
    subtitle: {
      id: "Lampu LED Maritim Tahan Air",
      en: "Waterproof Marine LED Illumination",
    },
    description: {
      id: "Menggunakan teknologi Light Emitting Diode (LED) yang rendah daya, terang, dan tahan lama, serta pemberian pelindung kedap air membuat proses penerangan pada perahu menjadi lebih optimal, murah, tahan lama, dan efisien saat melaut malam hari.",
      en: "Utilizing low-power, high-brightness, and durable Light Emitting Diode (LED) technology with waterproof marine enclosures, making nighttime navigation and fishing optimal, affordable, and durable.",
    },
    metrics: [
      { label: { id: "Proteksi Air", en: "Water Protection" }, value: "IP67 / IP68" },
      { label: { id: "Konsumsi Daya", en: "Power Draw" }, value: "< 15 Watt" },
      { label: { id: "Daya Tembus", en: "Light Penetration" }, value: "Anti Kabut" },
    ],
    image: "/images/unibox-harbor-aerial.jpg",
    customVisual: false,
    imageLeft: false,
  },
];

const orderingSteps = [
  {
    number: "01",
    title: { id: "Konsultasi Kebutuhan", en: "Requirement Consultation" },
    desc: {
      id: "Diskusikan tipe perahu, mesin diesel yang digunakan, dan target kapasitas muatan ikan Anda.",
      en: "Discuss your vessel type, diesel engine specs, and daily target fish payload.",
    },
  },
  {
    number: "02",
    title: { id: "Survei Mesin & Kapasitas", en: "Engine & Capacity Survey" },
    desc: {
      id: "Pengecekan teknis flywheel mesin perahu dan penentuan dimensi dudukan cool box 100L di kapal.",
      en: "Technical check of engine flywheel and mounting dimensions for the 100L cool box on deck.",
    },
  },
  {
    number: "03",
    title: { id: "Perakitan & Uji Coba Dingin", en: "Assembly & Cold Testing" },
    desc: {
      id: "Pemasangan generator flywheel, unit kompresor R32, sonar, dan pengujian pendinginan suhu 0°C.",
      en: "Mounting the flywheel generator, R32 compressor, sonar unit, and testing 0°C refrigeration.",
    },
  },
  {
    number: "04",
    title: { id: "Pendampingan & Garansi", en: "Training & Warranty Support" },
    desc: {
      id: "Pelatihan pengoperasian bagi nelayan, pendampingan pelayaran perdana, dan jaminan suku cadang.",
      en: "Hands-on operational training for fishers, maiden voyage support, and full parts warranty.",
    },
  },
];

export function ProductContent() {
  const { language } = useLanguage();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ========================================================
          TOP SECTION: WHITE BACKGROUND with Breadcrumb and Friendly Header
      ======================================================== */}
      <section className="relative pt-28 pb-14 sm:pt-32 sm:pb-18 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              <Text>{{ id: "Beranda", en: "Home" }}</Text>
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="font-semibold text-blue-900">
              <Text>{{ id: "Produk ", en: "Products " }}</Text>
            </span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-5 w-1 rounded-full bg-blue-600 shadow-sm shadow-blue-600/40" />
              <span className="text-xs font-bold tracking-wider uppercase text-blue-700">
                <Text>{{ id: "Produk ", en: "Products" }}</Text>
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              <Text>
                {{
                  id: "Ekosistem Pendingin & Elektrifikasi Terpadu untuk Perahu Nelayan",
                  en: "Integrated Cooling & Electrification Ecosystem for Fishing Boats",
                }}
              </Text>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              <Text>
                {{
                  id: "Unibox dirancang dengan sistem pendingin efisien, insulasi rapat, serta sensor suhu presisi. Hasilnya, ikan lebih awet, kualitas mutu terjaga, dan potensi kehilangan hasil tangkapan dapat ditekan secara optimal.",
                  en: "Unibox is engineered with an efficient cooling system, tight insulation, and precision temperature sensors. Catches stay fresh, fish quality is preserved, and catch loss is significantly minimized.",
                }}
              </Text>
            </p>
          </div>
        </div>
      </section>

      {/* 5 Detailed Feature Modules (Alternating Layout) */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-16 sm:py-24 space-y-20 sm:space-y-28">
        {productModules.map((item) => {
          const isImageLeft = item.imageLeft;
          return (
            <div
              key={item.number}
              className={`grid gap-10 lg:gap-14 lg:grid-cols-12 items-center ${isImageLeft ? "lg:grid-flow-dense" : ""
                }`}
            >
              {/* Text Information Column */}
              <div
                className={`lg:col-span-6 flex flex-col justify-center ${isImageLeft ? "lg:col-start-7" : ""
                  }`}
              >
                {/* Badge & Number */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="grid size-8 place-items-center rounded-xl bg-blue-600 font-display text-xs font-bold text-white shadow-md shadow-blue-600/30">
                    {item.number}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    <Text>{item.badge}</Text>
                  </span>
                </div>

                {/* Subtitle & Main Title */}
                <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  <Text>{item.subtitle}</Text>
                </p>
                <h2 className="mt-1 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                  <Text>{item.title}</Text>
                </h2>

                {/* Description */}
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700 font-normal">
                  <Text>{item.description}</Text>
                </p>

                {/* 3 Metric Cards (No icon clutter) */}
                <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 border-t border-slate-200 pt-6">
                  {item.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-200 bg-white p-2.5 sm:p-4 shadow-xs min-w-0"
                    >
                      <span className="block font-display text-sm sm:text-xl font-extrabold text-blue-700 truncate">
                        {m.value}
                      </span>
                      <span className="block text-[10px] sm:text-[11px] font-semibold text-slate-500 mt-0.5 sm:mt-1 truncate">
                        <Text>{m.label}</Text>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Column */}
              <div
                className={`lg:col-span-6 ${isImageLeft ? "lg:col-start-1" : ""
                  }`}
              >
                {item.customVisual ? (
                  <SonarRadarVisual />
                ) : (
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-blue-950/10">
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
            </div>
          );
        })}
      </section>

      {/* 4 Ordering & Implementation Stages */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-5 w-1 rounded-full bg-blue-600 shadow-sm shadow-blue-600/40" />
              <span className="text-xs font-bold tracking-wider uppercase text-blue-700">
                <Text>{{ id: "Alur Pemesanan", en: "Order & Deployment Process" }}</Text>
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              <Text>
                {{
                  id: "Empat Tahap Menuju Perahu Siap Melaut",
                  en: "Four Stages to a Voyage-Ready Boat System",
                }}
              </Text>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              <Text>
                {{
                  id: "Proses terstruktur dari survei spesifikasi perahu hingga pendampingan operasional nelayan.",
                  en: "A structured process from boat specification survey to on-site operational support.",
                }}
              </Text>
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {orderingSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-display text-2xl font-black text-blue-600">
                    {step.number}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-slate-900 leading-snug">
                    <Text>{step.title}</Text>
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    <Text>{step.desc}</Text>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Consultation Banner */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-6 rounded-3xl bg-gradient-to-r from-[#092644] to-[#0d3b68] p-8 sm:p-12 text-white shadow-2xl shadow-blue-950/30 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white">
              <Text>
                {{
                  id: "Siap Memodernisasi Perahu Nelayan Anda?",
                  en: "Ready to Modernize Your Fishing Boats?",
                }}
              </Text>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-sky-100/80 leading-relaxed">
              <Text>
                {{
                  id: "Diskusikan tipe perahu dan konfigurasi kapasitas coolbox Unibox yang paling pas dengan tim ahli kami.",
                  en: "Discuss your vessel specs and find the optimal Unibox coolbox configuration with our team.",
                }}
              </Text>
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="shrink-0 rounded-full bg-white text-blue-900 font-bold px-8 py-6 text-sm sm:text-base shadow-xl"
          >
            <Link href="/contact">
              <Text>{{ id: "Mulai Pemesanan & Konsultasi", en: "Start Order & Consultation" }}</Text>
              <ArrowRight className="size-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

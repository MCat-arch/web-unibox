"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";

const partnershipSteps = [
  {
    number: "01",
    image: "/images/unibox-fishermen.jpg",
    title: { id: "Konsultasi dan Pemetaan Kebutuhan", en: "Consultation and Needs Assessment" },
    description: { id: "Diskusikan tipe perahu, rute berlayar, dan target kapasitas muat ikan yang ingin dijaga kesegarannya.", en: "Provide your boat type, sailing duration, and the target catch volume you need kept fresh." }
  },
  {
    number: "02",
    image: "/images/unibox-harbor-aerial.jpg",
    title: { id: "Survei & Perancangan", en: "Survey & Configuration" },
    description: { id: "Tim teknis Unibox menganalisis kelistrikan flywheel perahu dan mengonfigurasi unit pendingin 100L agar terpasang presisi.", en: "Our technical team inspects flywheel electrical output and configures the 100L cooling unit for a precision fit." }
  },
  {
    number: "03",
    image: "/images/unibox-port-cold-storage.jpg",
    title: { id: "Implementasi & Pendampingan", en: "Deployment & Training" },
    description: { id: "Pemasangan unit langsung di perahu, pengujian performa refrigeran R32, serta pendampingan hingga perahu siap berlayar.", en: "Direct harbor installation, R32 refrigerant performance testing, and full on-site training until your vessel is voyage-ready." }
  },
];

export function PartnershipSection() {
  const { language } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0e4877] via-[#0b3c63] to-[#093254] py-16 sm:py-24 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header: Vertical Sky Accent Bar + Breadcrumb */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <div>
            {/* Tag / Badge */}
            <div className="flex items-center gap-3 mb-3">
              <span className="h-6 w-1 rounded-full bg-sky-400 shadow-sm shadow-sky-400/50" />
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-sky-200">
                <Text>{{ id: "Keunggulan & Cara Pemesanan", en: "Key Advantages & How to Order" }}</Text>
              </span>
            </div>

            {/* Judul Utama (Ukuran sesuai acuan) */}
            <h2 className="mt-10 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-[1.25]">
              <Text>
                {{
                  id: "Langkah Mudah Mengintegrasikan Unibox ke Armada Anda",
                  en: "Seamless Steps to Integrate Unibox into Your Fleet",
                }}
              </Text>
            </h2>
          </div>

          {/* Penjelasan di bawah judul */}
          <p className="text-sm sm:text-base leading-relaxed text-sky-100/90 font-normal">
            <Text>
              {{
                id: "Kami bermitra dengan nelayan mandiri, pemilik armada kapal, hingga koperasi pesisir untuk menghadirkan teknologi pendingin ikan yang tangguh dan efisien.",
                en: "Partnership and orders are open for traditional fishers, vessel fleet owners, coastal cooperatives, and seafood facility operators modernizing the fish cold chain.",
              }}
            </Text>
          </p>
        </div>

        {/* 3 Step Cards: White Cards on Medium Ocean Blue */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partnershipSteps.map((step) => (
            <article
              key={step.number}
              className="group overflow-hidden rounded-2xl bg-white shadow-xl shadow-blue-950/25 border-4 border-white/20"
            >
              {/* Photo Header */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={step.image}
                  alt={step.title[language]}
                  fill
                  className="size-full object-cover transition-transform duration-500"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                {/* Step Pill */}
                <span className="absolute left-4 top-4 grid size-9 place-items-center rounded-xl bg-blue-600 font-display text-xs font-extrabold text-white shadow-md shadow-blue-900/40">
                  {step.number}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6">
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {step.title[language]}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {step.description[language]}
                </p>
              </div>

            </article>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl bg-white/10 p-5 sm:p-8 backdrop-blur-sm border border-white/15 sm:flex-row sm:items-center">
          <p className="max-w-2xl font-display text-lg sm:text-xl font-bold leading-snug text-white">
            <Text>
              {{
                id: "Siap tingkatkan kualitas hasil tangkapan dan efisiensi pendinginan di perahu Anda?",
                en: "Ready to maximize catch freshness and cut ice costs on your vessel?",
              }}
            </Text>
          </p>
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto shrink-0 bg-white text-blue-900 hover:bg-sky-50 font-bold shadow-xl shadow-blue-950/30"
          >
            <Link href="/contact" className="justify-center">
              <Text>{{ id: "Konsultasi Gratis Sekarang", en: "Get Free Consultation" }}</Text>
              <ArrowRight className="size-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section >
  );
}

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
    title: { id: "Ceritakan Kebutuhan", en: "Share Your Requirements" },
    description: {
      id: "Sampaikan lokasi perahu, kapasitas muatan ikan harian, dan tantangan operasional Anda di laut.",
      en: "Tell us about your vessel location, daily fish volume, and ocean operational challenges.",
    },
  },
  {
    number: "02",
    image: "/images/unibox-harbor-aerial.jpg",
    title: { id: "Survei & Perancangan", en: "Survey & Configuration" },
    description: {
      id: "Tim ahli Unibox memetakan tipe mesin perahu, kelistrikan flywheel, dan menyiapkan unit bodi 100L.",
      en: "Unibox engineers evaluate boat engine specs, flywheel wiring, and prepare the 100L cooling unit.",
    },
  },
  {
    number: "03",
    image: "/images/unibox-port-cold-storage.jpg",
    title: { id: "Implementasi & Pendampingan", en: "Deployment & Training" },
    description: {
      id: "Sistem dipasang langsung di perahu nelayan, diuji dingin R32, dan didampingi hingga siap berlayar.",
      en: "Installed directly on your vessel, R32 temperature tested, and supported through field voyages.",
    },
  },
];

export function PartnershipSection() {
  const { language } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0e4877] via-[#0b3c63] to-[#093254] py-16 sm:py-24 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header: Vertical Sky Accent Bar + Breadcrumb */}
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-6 w-1 rounded-full bg-sky-400 shadow-sm shadow-sky-400/50" />
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-sky-200">
                <Text>{{ id: "Keunggulan & Cara Pemesanan", en: "Key Advantages & How to Order" }}</Text>
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-[1.2]">
              <Text>
                {{
                  id: "Mulai dari Kebutuhan Nyata di Perahu Anda.",
                  en: "Built Around the Real Needs Aboard Your Vessel.",
                }}
              </Text>
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-sky-100/90 lg:justify-self-end max-w-2xl font-normal">
            <Text>
              {{
                id: "Kesempatan kemitraan dan pemesanan terbuka bagi nelayan tradisional, pemilik armada kapal, koperasi pesisir, dan pengelola gudang hasil laut untuk memodernisasi rantai dingin ikan.",
                en: "Partnership and orders are open for traditional fishers, vessel fleet owners, coastal cooperatives, and seafood facility operators modernizing the marine cold chain.",
              }}
            </Text>
          </p>
        </div>

        {/* 3 Step Cards: White Cards on Medium Ocean Blue */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
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
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                {/* Step Pill */}
                <span className="absolute left-4 top-4 grid size-9 place-items-center rounded-xl bg-blue-600 font-display text-xs font-extrabold text-white shadow-md shadow-blue-900/40">
                  {step.number}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6">
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
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl bg-white/10 p-6 sm:p-8 backdrop-blur-sm border border-white/15 sm:flex-row sm:items-center">
          <p className="max-w-2xl font-display text-lg sm:text-xl font-bold leading-snug text-white">
            <Text>
              {{
                id: "Buka percakapan pertama untuk menemukan konfigurasi Unibox yang tepat bagi perahu Anda.",
                en: "Start the conversation to discover the optimal Unibox configuration for your boat.",
              }}
            </Text>
          </p>
          <Button
            asChild
            size="lg"
            className="shrink-0 bg-white text-blue-900 hover:bg-sky-50 font-bold shadow-xl shadow-blue-950/30"
          >
            <Link href="/contact">
              <Text>{{ id: "Buka Pemesanan", en: "Start Order" }}</Text>
              <ArrowRight className="size-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

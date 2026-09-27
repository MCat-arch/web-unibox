"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";

const testimonials = [
  {
    name: "H. Sukirman",
    role: { id: "Ketua Koperasi Nelayan Pesisir · Jawa Timur", en: "Fishermen Cooperative Leader · East Java" },
    avatar: "/images/unibox-fishermen.jpg",
    quote: {
      id: "Solusi Unibox membantu kami memangkas pembusukan ikan hingga mendekati nol saat cuaca buruk. Nelayan kami dapat menyimpan hasil tangkapan dengan aman sebelum dibawa ke pelelangan.",
      en: "Unibox helped us reduce fish spoilage to near zero during rough weather. Our fishers can safely store catches before taking them to auction.",
    },
  },
  {
    name: "Bambang Wijaya",
    role: { id: "Pengelola Fasilitas Pelelangan & Gudang · Sulawesi", en: "Fish Auction & Warehouse Manager · Sulawesi" },
    avatar: "/images/unibox-port-cold-storage.jpg",
    quote: {
      id: "Pendampingannya sangat terstruktur, mulai dari perhitungan kebutuhan tonase es harian hingga perakitan unit modular yang hemat listrik di pelabuhan.",
      en: "The support was very structured, from daily ice tonnage calculation to assembling energy-efficient modular cold units at our harbor.",
    },
  },
  {
    name: "Dewi Lestari",
    role: { id: "Direktur Pengolahan Hasil Laut Ekspor · Bali", en: "Export Seafood Processing Director · Bali" },
    avatar: "/images/unibox-product-detail.jpg",
    quote: {
      id: "Rantai dingin terintegrasi dari Unibox menjaga kesegaran ikan tuna kami tetap berstandar ekspor Grade-A dengan suhu yang sangat stabil.",
      en: "Unibox's integrated cold chain maintains our tuna freshness at export Grade-A standards with exceptionally stable temperatures.",
    },
  },
];

export function TestimonialsSection() {
  const { language } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#093254] via-[#082a47] to-[#07243e] pt-16 sm:pt-24 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header: Vertical Sky Accent Bar + Breadcrumb */}
        <div className="flex flex-col gap-4 max-w-3xl mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-6 w-1 rounded-full bg-sky-400 shadow-sm shadow-sky-400/50" />
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-sky-200">
                <Text>{{ id: "Cerita Mitra & Testimoni", en: "Partner Stories & Testimonials" }}</Text>
              </span>
            </div>

            {/* Ukuran heading disamakan dengan seksi kemitraan */}
            <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-[1.25]">
              <Text>
                {{
                  id: "Kepercayaan Dibangun dari Bukti Nyata",
                  en: "Trust Built Through Proven Results ",
                }}
              </Text>
            </h2>
          </div>
        </div>

        {/* Linear 3-column Cards with 5-Star Rating & Profile Photos */}
        <div className="grid gap-6 md:grid-cols-3 items-stretch">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex flex-col justify-between rounded-2xl bg-white p-5 sm:p-7 text-slate-800 shadow-xl shadow-blue-950/25 border border-white/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600 shadow-xs">
                    <Quote className="size-5" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                    <Text>{{ id: "Mitra Nelayan", en: "Fisher Partner" }}</Text>
                  </span>
                </div>

                {/* 5-Star Rating Icon */}
                <div className="flex items-center gap-1 mb-4" aria-label="Rating 5 dari 5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <blockquote className="text-sm sm:text-base leading-relaxed text-slate-700">
                  &ldquo;{testimonial.quote[language]}&rdquo;
                </blockquote>
              </div>

              {/* Author with Avatar Photo */}
              <div className="mt-8 border-t border-slate-100 pt-5 flex items-center gap-4">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full border-2 border-blue-200 shadow-xs bg-slate-100">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {testimonial.role[language]}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Curved Wave Bottom Divider */}
      <div className="relative z-10 w-full overflow-hidden leading-none text-slate-50 mt-14 sm:mt-20">
        <svg
          className="relative block w-full h-10 sm:h-20 lg:h-24 fill-slate-50"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
}
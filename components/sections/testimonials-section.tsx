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
    <section className="bg-gradient-to-b from-[#093254] via-[#082a47] to-[#07243e] py-16 sm:py-24 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header: Vertical Sky Accent Bar + Breadcrumb */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-6 w-1 rounded-full bg-sky-400 shadow-sm shadow-sky-400/50" />
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-sky-200">
                <Text>{{ id: "Cerita Mitra & Testimoni", en: "Partner Stories & Testimonials" }}</Text>
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              <Text>
                {{
                  id: "Kepercayaan Dibangun dari Bukti Nyata di Laut",
                  en: "Trust Built Through Proven Results at Sea",
                }}
              </Text>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-sky-100/80 max-w-xs sm:text-right">
            <Text>
              {{
                id: "Pengalaman langsung nelayan dan pengelola fasilitas maritim di berbagai pesisir Indonesia",
                en: "First-hand experiences from fishers and maritime operators across coastal Indonesia",
              }}
            </Text>
          </p>
        </div>

        {/* Linear 3-column Cards with Profile Photos: White Cards on Ocean Blue */}
        <div className="grid gap-6 md:grid-cols-3 items-stretch">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex flex-col justify-between rounded-2xl bg-white p-7 text-slate-800 shadow-xl shadow-blue-950/25 border border-white/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Quote className="size-5" />
                  </span>
                  <div className="flex gap-1 text-amber-500" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} className="size-4 fill-current" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-sm sm:text-base leading-relaxed text-slate-700">
                  "{testimonial.quote[language]}"
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
    </section>
  );
}

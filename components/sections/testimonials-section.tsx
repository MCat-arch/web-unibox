"use client";

import { Quote, Star } from "lucide-react";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";

const testimonials = [
  {
    name: "H. Sukirman",
    role: { id: "Ketua Koperasi Nelayan Pesisir · Jawa Timur", en: "Fishermen Cooperative Leader · East Java" },
    quote: {
      id: "Solusi Unibox membantu kami memangkas pembusukan ikan hingga mendekati nol saat cuaca buruk. Nelayan kami dapat menyimpan hasil tangkapan dengan aman sebelum dibawa ke pelelangan.",
      en: "Unibox helped us reduce fish spoilage to near zero during rough weather. Our fishers can safely store catches before taking them to auction.",
    },
  },
  {
    name: "Bambang Wijaya",
    role: { id: "Pengelola Fasilitas Pelelangan & Gudang · Sulawesi", en: "Fish Auction & Warehouse Manager · Sulawesi" },
    quote: {
      id: "Pendampingannya sangat terstruktur, mulai dari perhitungan kebutuhan tonase es harian hingga perakitan unit modular yang hemat listrik di pelabuhan.",
      en: "The support was very structured, from daily ice tonnage calculation to assembling energy-efficient modular cold units at our harbor.",
    },
  },
  {
    name: "Dewi Lestari",
    role: { id: "Direktur Pengolahan Hasil Laut Ekspor · Bali", en: "Export Seafood Processing Director · Bali" },
    quote: {
      id: "Rantai dingin terintegrasi dari Unibox menjaga kesegaran ikan tuna kami tetap berstandar ekspor Grade-A dengan suhu yang sangat stabil.",
      en: "Unibox's integrated cold chain maintains our tuna freshness at export Grade-A standards with exceptionally stable temperatures.",
    },
  },
];

export function TestimonialsSection() {
  const { language } = useLanguage();

  return (
    <section className="bg-slate-50 py-16 sm:py-24 border-t border-slate-200/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              <Text>{{ id: "CERITA MITRA & TESTIMONI", en: "PARTNER STORIES & TESTIMONIALS" }}</Text>
            </div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              <Text>
                {{
                  id: "Kepercayaan Dibangun dari Bukti Nyata di Lapangan",
                  en: "Trust Built Through Proven Field Results",
                }}
              </Text>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs sm:text-right">
            <Text>
              {{
                id: "Pengalaman nyata mitra nelayan dan pengelola fasilitas di berbagai daerah",
                en: "Real experiences from fishers and facility managers across coastal regions",
              }}
            </Text>
          </p>
        </div>

        {/* Linear 3-column Cards (All flat in one row, no vertical offset) */}
        <div className="grid gap-6 md:grid-cols-3 items-stretch">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Quote className="size-5" />
                  </span>
                  <div className="flex gap-1 text-amber-400" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} className="size-4 fill-current" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-sm sm:text-base leading-relaxed text-slate-700">
                  "{testimonial.quote[language]}"
                </blockquote>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-5">
                <p className="font-display text-sm sm:text-base font-bold text-slate-900">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-xs text-slate-500 leading-normal">
                  {testimonial.role[language]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

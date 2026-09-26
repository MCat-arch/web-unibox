"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";

const activities = [
  {
    slug: "demo-coolbox-flywheel-pelabuhan-brondong",
    image: "/images/unibox-port-cold-storage.jpg",
    category: { id: "Event · Demo Lapangan", en: "Event · Field Demo" },
    date: { id: "15 April 2026", en: "April 15, 2026" },
    title: {
      id: "Demo Pemasangan Modular Cool Box 100L & Flywheel di Pelabuhan Brondong",
      en: "100L Cool Box & Flywheel Mounting Demonstration at Brondong Port",
    },
  },
  {
    slug: "uji-coba-pendingin-r32-perahu-nelayan",
    image: "/images/unibox-product-detail.jpg",
    category: { id: "Blog · Teknologi Rantai Dingin", en: "Blog · Cold Chain Tech" },
    date: { id: "25 Maret 2026", en: "March 25, 2026" },
    title: {
      id: "Uji Coba Pendingin R32 & Kestabilan Suhu Ikan di Perahu Nelayan",
      en: "R32 Refrigeration Field Trial & Fish Temperature Stability Aboard Boats",
    },
  },
];

export function NewsPreviewSection() {
  const { language } = useLanguage();

  return (
    <section className="bg-slate-50 pt-8 pb-16 sm:pt-12 sm:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header: Vertical Blue Accent Bar + Breadcrumb */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <span className="h-5 w-1 rounded-full bg-blue-600 shadow-sm shadow-blue-600/40" />
            <span className="text-xs font-bold tracking-wider uppercase text-blue-700">
              <Text>{{ id: "Aktivitas & Agenda", en: "Activities & Events" }}</Text>
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            <Text>{{ id: "Aktivitas Lapangan & Kemitraan Pesisir", en: "Field Activities & Coastal Partnerships" }}</Text>
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
            <Text>
              {{
                id: "Dokumentasi uji coba teknologi rantai dingin, pelatihan operasional nelayan, dan perakitan cold box langsung di sentra perikanan.",
                en: "Documentation of cold-chain field trials, fisher operational training, and on-site cold box assembly in fisheries hubs.",
              }}
            </Text>
          </p>
        </div>

        {/* 2 Horizontal Activity Cards (Retaining User's Preferred Layout) */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {activities.map((item) => (
            <article key={item.title.id} className="flex flex-col">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-700">
                  {item.category[language]}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Calendar className="size-3.5 text-slate-400" />
                  {item.date[language]}
                </span>
              </div>

              <Link
                href={`/news/${item.slug}`}
                className="flex min-h-36 items-center gap-5 rounded-2xl bg-[#092644] p-4 text-white sm:p-5 shadow-lg shadow-blue-950/15 border border-blue-900/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-[#0c3156] group cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-32 shrink-0 sm:w-40 overflow-hidden rounded-xl bg-slate-800">
                  <Image
                    src={item.image}
                    alt={item.title[language]}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="160px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/50 mb-2">
                    <Text>{{ id: "Dokumentasi", en: "Documentation" }}</Text>
                  </span>
                  <h3 className="font-display text-sm sm:text-base font-bold leading-snug text-white line-clamp-2 group-hover:text-sky-300 transition-colors">
                    {item.title[language]}
                  </h3>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-blue-200 bg-white text-blue-900 hover:bg-blue-50 font-bold px-7 py-2.5 shadow-sm transition-all"
          >
            <Link href="/news">
              <Text>{{ id: "Lihat Semua Aktivitas", en: "View All Activities" }}</Text>
              <ArrowRight className="size-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

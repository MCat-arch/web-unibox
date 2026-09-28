"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";

import type { ActivityItem } from "@/lib/activities-data";

const defaultActivities = [
  {
    slug: "demo-coolbox-flywheel-pelabuhan-brondong",
    image: "/images/unibox-deck-closeup.jpg",
    date: { id: "15 April 2026", en: "April 15, 2026" },
    title: {
      id: "Demo Pemasangan Modular Cool Box 100L & Flywheel di Pelabuhan Brondong",
      en: "100L Cool Box & Flywheel Mounting Demonstration at Brondong Port",
    },
  },
  {
    slug: "uji-coba-pendingin-r32-perahu-nelayan",
    image: "/images/assets_kapal.jpeg",
    date: { id: "25 Maret 2026", en: "March 25, 2026" },
    title: {
      id: "Uji Coba Pendingin R32 & Kestabilan Suhu Ikan di Perahu Nelayan",
      en: "R32 Refrigeration Field Trial & Fish Temperature Stability Aboard Boats",
    },
  },
];

export function NewsPreviewSection({ initialActivities }: { initialActivities?: ActivityItem[] }) {
  const { language } = useLanguage();
  const activities = initialActivities && initialActivities.length > 0 ? initialActivities : defaultActivities;

  return (
    <section className="bg-slate-50 pt-8 pb-16 sm:pt-12 sm:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header: Vertical Blue Accent Bar + Breadcrumb */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <span className="h-5 w-1 rounded-full bg-blue-600 shadow-sm shadow-blue-600/40" />
            <span className="text-xs sm:text-sm font-black/50 tracking-wider uppercase text-black-700">
              <Text>{{ id: "Aktivitas Terbaru", en: "Activities" }}</Text>
            </span>
          </div>

          {/* Heading dengan ukuran konsisten */}
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-[1.25]">
            <Text>
              {{
                id: "Aktivitas Lapangan & Perkembangan Terkini",
                en: "Field Activities & Latest Developments",
              }}
            </Text>
          </h2>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
            <Text>
              {{
                id: "Catatan implementasi teknologi rantai dingin, pendampingan nelayan, dan uji operasional di lapangan.",
                en: "Records of cold-chain technology deployments, fisher assistance, and field operational trials.",
              }}
            </Text>
          </p>
        </div>

        {/* 2 Horizontal Activity Cards (Tanpa Efek Hover) */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {activities.map((item) => (
            <article key={item.title.id} className="flex flex-col">
              {/* Hanya menampilkan tanggal (kategori event/blog dihilangkan) */}
              {/* <div className="flex items-center justify-end mb-2.5 px-1">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Calendar className="size-3.5 text-slate-400" />
                  {item.date[language]}
                </span>
              </div> */}

              {/* Card statis tanpa animasi/hover */}
              <Link
                href={`/news/${item.slug}`}
                className="flex min-h-28 sm:min-h-36 items-center gap-3.5 sm:gap-5 rounded-2xl bg-[#092644] p-3.5 sm:p-5 text-white shadow-lg shadow-blue-950/15 border border-blue-900/40 cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-24 sm:w-36 md:w-40 shrink-0 overflow-hidden rounded-xl bg-slate-800">
                  <Image
                    src={item.image}
                    alt={item.title[language]}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(min-width: 640px) 160px, 96px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xs sm:text-base font-bold leading-snug text-white line-clamp-3">
                    {item.title[language]}
                  </h3>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Bottom CTA Button: Clean button without hover jump */}
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            className="rounded-full bg-slate-950 hover:bg-slate-800 text-white font-semibold px-7 py-2.5 shadow-md"
          >
            <Link href="/news" className="flex items-center gap-2">
              <Text>{{ id: "Lihat Semua Aktivitas", en: "View All Activities" }}</Text>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
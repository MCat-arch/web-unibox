"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Info,
  ChevronRight,
  BookOpen,
  ChevronDown,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";
import { activitiesData, upcomingEventsData, pastEventsData } from "@/lib/activities-data";

function WavePattern({ className = "text-sky-300" }: { className?: string }) {
  return (
    <svg className={className} width="48" height="64" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8C8 4 12 4 16 8C20 12 24 12 28 8C32 4 36 4 40 8C44 12 48 12 52 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 22C8 18 12 18 16 22C20 26 24 26 28 22C32 18 36 18 40 22C44 26 48 26 52 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 36C8 32 12 32 16 36C20 40 24 40 28 36C32 32 36 32 40 36C44 40 48 40 52 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 50C8 46 12 46 16 50C20 54 24 54 28 50C32 46 36 46 40 50C44 54 48 54 52 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function ScalePattern({ className = "text-orange-400" }: { className?: string }) {
  return (
    <svg className={className} width="42" height="96" viewBox="0 0 42 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 14C4 22 17 22 17 14M17 14C17 22 30 22 30 14M30 14C30 22 43 22 43 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 34C4 42 17 42 17 34M17 34C17 42 30 42 30 34M30 34C30 42 43 42 43 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 54C4 62 17 62 17 54M17 54C17 62 30 62 30 54M30 54C30 62 43 62 43 54" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 74C4 82 17 82 17 74M17 74C17 82 30 82 30 74M30 74C30 82 43 82 43 74" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

import type { ActivityItem } from "@/lib/activities-data";

export function NewsContent({ initialActivities }: { initialActivities?: ActivityItem[] }) {
  const { language } = useLanguage();
  const [showAllBlogs, setShowAllBlogs] = useState(false);

  const activities = initialActivities && initialActivities.length > 0 ? initialActivities : activitiesData;

  // Top main event (Featured latest event)
  const featuredEvent =
    activities.find((a) => a.type === "event" && a.featured) ||
    activities.find((a) => a.type === "event") ||
    activities[0];

  // All blog articles
  const blogArticles = activities.filter((a) => a.type === "blog");

  // Displayed blog articles based on toggle
  const visibleBlogs = showAllBlogs ? blogArticles : blogArticles.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* ========================================================
          TOP SECTION: WHITE BACKGROUND
          1. Event Utama Paling Atas (Layout 2-Kolom)
          2. Upcoming Events Lainnya di Bawahnya (Card Memanjang)
      ======================================================== */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-8 sm:mb-12">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              <Text>{{ id: "Beranda", en: "Home" }}</Text>
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="font-semibold text-blue-900">
              <Text>{{ id: "Event & Blog", en: "Events & Blog" }}</Text>
            </span>
          </nav>

          {/* 1. Event Utama 2-Kolom di Atas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Kiri: Foto Besar Event */}
            <div className="lg:col-span-6 xl:col-span-6">
              <Link href={`/news/${featuredEvent.slug}`} className="group block relative">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-xl shadow-slate-200/80 border border-slate-100">
                  <Image
                    src={featuredEvent.image}
                    alt={featuredEvent.title[language]}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  {/* Badge Highlight */}
                  <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                    <Text>{{ id: "Kegiatan Mendatang", en: "Upcoming Event" }}</Text>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm">
                    <span className="text-xs font-black tracking-widest text-blue-900 uppercase">
                      UNIBOX
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Kanan: Informasi Event Utama */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
              {/* Category */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                  <Sparkles className="size-3.5 text-amber-600" />
                  {featuredEvent.category[language]}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-[1.2] tracking-tight">
                <Link
                  href={`/news/${featuredEvent.slug}`}
                  className="hover:text-blue-700 transition-colors"
                >
                  {featuredEvent.title[language]}
                </Link>
              </h1>

              {/* Box Info Logistik Event */}
              <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-200/80 p-4 space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
                  <Calendar className="size-4 text-blue-600 shrink-0" />
                  <span>{featuredEvent.date[language]}</span>
                  {featuredEvent.time && (
                    <>
                      <span className="text-slate-300">|</span>
                      <Clock className="size-3.5 text-slate-500" />
                      <span className="text-slate-600 font-normal">{featuredEvent.time[language]}</span>
                    </>
                  )}
                </div>

                {featuredEvent.location && (
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <MapPin className="size-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-800">{featuredEvent.location[language]}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 border-t border-slate-200/60 font-medium">
                  <Info className="size-3.5 text-blue-600 shrink-0" />
                  <Text>
                    {{
                      id: "Informasi terbuka bagi seluruh nelayan & mitra — Tanpa biaya atau pendaftaran.",
                      en: "Open public information for fishers & partners — No registration needed.",
                    }}
                  </Text>
                </div>
              </div>

              {/* Summary */}
              <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                {featuredEvent.summary[language]}
              </p>

              {/* Action Link */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500 font-medium">
                  <Text>{{ id: "Penyelenggara:", en: "Organized by:" }}</Text>{" "}
                  <span className="font-bold text-slate-800">{featuredEvent.author.name}</span>
                </div>

                <Link
                  href={`/news/${featuredEvent.slug}`}
                  className="group inline-flex items-center gap-2 text-sm sm:text-base font-bold text-blue-700 hover:text-blue-900 transition-colors"
                >
                  <span className="border-b-2 border-blue-700 group-hover:border-blue-900 pb-0.5 transition-colors">
                    <Text>{{ id: "Lihat Informasi Lengkap", en: "View Event Details" }}</Text>
                  </span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* 2. Upcoming Events Lainnya di Bawah Event Utama (Card Memanjang Horizontal - Gaya Landing Page) */}
          <div className="mt-16 sm:mt-20 pt-12 border-t border-slate-200/80">
            <div className="flex items-center justify-between mb-8">
              <div className="inline-flex items-center gap-2.5">
                <span className="h-5 w-1 rounded-full bg-blue-600 shadow-sm shadow-blue-600/40" />
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                  <Text>{{ id: "Agenda & Kegiatan Mendatang Lainnya", en: "Other Upcoming Events & Agenda" }}</Text>
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
                <Text>{{ id: "Informasi Terbuka", en: "Open Information" }}</Text>
              </span>
            </div>

            {/* Grid Kartu Memanjang Horizontal */}
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingEventsData.map((item) => (
                <article key={item.id} className="flex flex-col">
                  {/* Category & Date Header */}
                  <div className="flex items-center justify-between mb-2.5 px-1">
                    <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-700">
                      {item.tag[language]}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Calendar className="size-3.5 text-slate-400" />
                      {item.day} {item.monthYear}
                    </span>
                  </div>

                  {/* Horizontal Card Box (Matches Landing Page News Preview) */}
                  <Link
                    href={`/news/${item.slug || featuredEvent.slug}`}
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
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/50">
                          <Text>{{ id: "Informasi Terbuka", en: "Open Info" }}</Text>
                        </span>
                        {item.time && (
                          <span className="text-[11px] text-slate-400 font-medium">
                            {item.time[language]}
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-sm sm:text-base font-bold leading-snug text-white line-clamp-2 group-hover:text-sky-300 transition-colors">
                        {item.title[language]}
                      </h4>
                      <p className="mt-1.5 text-xs text-slate-300 flex items-center gap-1.5 truncate">
                        <MapPin className="size-3 text-red-400 shrink-0" />
                        <span className="truncate">{item.location[language]}</span>
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SEKSI BLOG: LATAR BIRU LAUT (3 Card per Row + Arrow Down)
      ======================================================== */}
      <section className="relative py-20 sm:py-28 bg-[#0070ba] text-white overflow-hidden">
        {/* Ornamen Motif Gelombang Laut */}
        <div className="absolute -left-2 top-20 opacity-80 pointer-events-none hidden md:block">
          <ScalePattern className="text-amber-400" />
        </div>
        <div className="absolute right-4 bottom-12 opacity-40 pointer-events-none hidden lg:block">
          <WavePattern className="text-sky-200" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Header Seksi Blog */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-sky-100 text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="size-3.5 text-sky-300" />
              <Text>{{ id: "Kategori Blog", en: "Blog Category" }}</Text>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              <Text>{{ id: "Blog & Wawasan Maritim", en: "Maritime Insights & Blog" }}</Text>
            </h2>
            <p className="mt-3 text-sky-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              <Text>
                {{
                  id: "Artikel penelitian, uji coba teknologi pendingin R32, efisiensi solar dengan sonar, serta standardisasi mutu hasil tangkapan nelayan.",
                  en: "Research articles on R32 refrigeration, fuel efficiency with sonar, and catch quality standardization for small-scale fishers.",
                }}
              </Text>
            </p>
          </div>

          {/* Grid 3 Card per Row untuk Blog */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visibleBlogs.map((blog) => (
              <article
                key={blog.slug}
                className="group flex flex-col rounded-3xl bg-white p-5 sm:p-6 text-slate-900 shadow-xl shadow-blue-950/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Thumbnail Foto */}
                <Link
                  href={`/news/${blog.slug}`}
                  className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100 block"
                >
                  <Image
                    src={blog.image}
                    alt={blog.title[language]}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute top-3 left-3 bg-blue-900/90 text-white backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {blog.category[language]}
                    </span>
                  </div>
                </Link>

                {/* Konten Blog */}
                <div className="flex flex-1 flex-col pt-5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-2.5">
                    <Calendar className="size-3.5 text-blue-600" />
                    <span>{blog.date[language]}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold leading-snug text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                    <Link href={`/news/${blog.slug}`}>
                      {blog.title[language]}
                    </Link>
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">
                    {blog.summary[language]}
                  </p>

                  {/* Footer Card */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-semibold truncate max-w-[130px]">
                      {blog.author.name}
                    </span>

                    <Link
                      href={`/news/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-700 group-hover:text-blue-900 transition-colors"
                    >
                      <span>
                        <Text>{{ id: "Baca Artikel", en: "Read Article" }}</Text>
                      </span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Tombol Arrow Down untuk Tampilkan Semua Blog */}
          {blogArticles.length > 3 && (
            <div className="mt-12 sm:mt-14 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllBlogs(!showAllBlogs)}
                className="group inline-flex items-center gap-2.5 rounded-full bg-white text-blue-900 hover:bg-sky-50 px-7 py-3 text-xs sm:text-sm font-extrabold shadow-lg shadow-blue-950/20 hover:shadow-xl transition-all duration-300"
              >
                <span>
                  {showAllBlogs ? (
                    <Text>{{ id: "Tampilkan Lebih Sedikit", en: "Show Less Articles" }}</Text>
                  ) : (
                    <Text>{{ id: "Tampilkan Semua Blog", en: "Show All Blog Articles" }}</Text>
                  )}
                </span>
                <ChevronDown
                  className={`size-4 text-blue-700 transition-transform duration-300 ${
                    showAllBlogs ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          SEKSI BAWAH: HANYA EVENT YANG SUDAH DILAKSANAKAN (PAST EVENTS)
          Latar Belakang Putih Bersih dengan Border Bawah Tegas
      ======================================================== */}
      <section className="py-20 sm:py-28 bg-white border-b-2 border-slate-200/90 relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Header Seksi Event Terlaksana */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200/70">
                <CheckCircle2 className="size-3.5 text-emerald-600" />
                <Text>{{ id: "Rekam Jejak & Dokumentasi", en: "Track Record & Documentation" }}</Text>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                <Text>{{ id: "Kegiatan yang Telah Dilaksanakan", en: "Completed Field Events" }}</Text>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
              <Text>
                {{
                  id: "Dokumentasi uji coba nyata, sosialisasi modul flywheel, dan riset lapangan yang telah sukses diselesaikan bersama kelompok nelayan pesisir.",
                  en: "Documentation of live sea trials, flywheel workshops, and field research successfully completed with coastal fishing groups.",
                }}
              </Text>
            </p>
          </div>

          {/* Grid Kartu Kegiatan yang Telah Dilaksanakan */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {pastEventsData.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col rounded-3xl bg-slate-50/80 border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Thumbnail dengan Badges */}
                <Link href={`/news/${item.slug}`} className="relative aspect-[16/10] w-full overflow-hidden block bg-slate-200">
                  <Image
                    src={item.image}
                    alt={item.title[language]}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  {/* Badge Telah Terlaksana */}
                  <div className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <CheckCircle2 className="size-3" />
                    <Text>{{ id: "Telah Terlaksana", en: "Completed" }}</Text>
                  </div>
                  {/* Badge Tanggal */}
                  <div className="absolute top-3 right-3 bg-slate-950/70 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-full shadow-xs">
                    {item.date[language]}
                  </div>
                </Link>

                {/* Konten Card */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Tag Kategori & Lokasi */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-bold uppercase tracking-wider text-blue-700">
                      {item.tag[language]}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-slate-500">
                      <Users className="size-3 text-slate-400" />
                      {item.participantsCount[language]}
                    </span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                    <Link href={`/news/${item.slug}`}>
                      {item.title[language]}
                    </Link>
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="size-3.5 text-red-500 shrink-0" />
                    <span className="truncate">{item.location[language]}</span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 flex-1">
                    {item.summary[language]}
                  </p>

                  {/* Highlight Capaian / Hasil Kegiatan */}
                  <div className="mt-4 rounded-xl bg-blue-50/70 border border-blue-100/80 p-3 text-xs text-slate-700">
                    <span className="font-bold text-blue-900 block mb-0.5">
                      <Text>{{ id: "Capaian Lapangan:", en: "Field Outcome:" }}</Text>
                    </span>
                    <p className="text-slate-600 line-clamp-2">{item.outcome[language]}</p>
                  </div>

                  {/* Card Bottom Link */}
                  <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-700 font-bold uppercase tracking-wider">
                      <Text>{{ id: "Dokumentasi Sukses", en: "Success Report" }}</Text>
                    </span>

                    <Link
                      href={`/news/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-700 group-hover:text-blue-900 transition-colors"
                    >
                      <span>
                        <Text>{{ id: "Lihat Dokumentasi", en: "View Report" }}</Text>
                      </span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  User,
  Quote,
  CheckCircle2,
  Info,
  BookOpen,
} from "lucide-react";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";
import { ActivityItem, upcomingEventsData } from "@/lib/activities-data";

function WavePattern({ className = "text-sky-400" }: { className?: string }) {
  return (
    <svg className={className} width="48" height="64" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8C8 4 12 4 16 8C20 12 24 12 28 8C32 4 36 4 40 8C44 12 48 12 52 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 22C8 18 12 18 16 22C20 26 24 26 28 22C32 18 36 18 40 22C44 26 48 26 52 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 36C8 32 12 32 16 36C20 40 24 40 28 36C32 32 36 32 40 36C44 40 48 40 52 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 50C8 46 12 46 16 50C20 54 24 54 28 50C32 46 36 46 40 50C44 54 48 54 52 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function ActivityDetailContent({ activity }: { activity: ActivityItem }) {
  const { language } = useLanguage();
  const isEvent = activity.type === "event";

  return (
    <article className="min-h-screen bg-white pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        {/* Back Link & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <Text>
              {{
                id: isEvent ? "Kembali ke Jadwal Event" : "Kembali ke Daftar Blog",
                en: isEvent ? "Back to Events Schedule" : "Back to Blog List",
              }}
            </Text>
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              <Text>{{ id: "Beranda", en: "Home" }}</Text>
            </Link>
            <span>/</span>
            <Link href="/news" className="hover:text-blue-600 transition-colors">
              <Text>{{ id: isEvent ? "Event" : "Blog", en: isEvent ? "Events" : "Blog" }}</Text>
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-10 sm:mb-12">
          {/* Title */}
          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.2] tracking-tight mb-6">
            {activity.title[language]}
          </h1>

          {/* If EVENT: Show prominent Event Logistics Card (Date, Time, Location) */}
          {isEvent ? (
            <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-5 space-y-3 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 text-sm text-slate-700 font-semibold">
                  <Calendar className="size-4.5 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-[11px] block uppercase font-bold text-slate-400">
                      <Text>{{ id: "Tanggal Kegiatan", en: "Event Date" }}</Text>
                    </span>
                    <span>{activity.date[language]}</span>
                  </div>
                </div>

                {activity.time && (
                  <div className="flex items-center gap-2.5 text-sm text-slate-700 font-semibold">
                    <Clock className="size-4.5 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-[11px] block uppercase font-bold text-slate-400">
                        <Text>{{ id: "Waktu Pelaksanaan", en: "Event Time" }}</Text>
                      </span>
                      <span>{activity.time[language]}</span>
                    </div>
                  </div>
                )}
              </div>

              {activity.location && (
                <div className="pt-2 border-t border-slate-200/60 flex items-start gap-2.5 text-sm text-slate-700">
                  <MapPin className="size-4.5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] block uppercase font-bold text-slate-400">
                      <Text>{{ id: "Lokasi / Sentra Pendaratan", en: "Location / Landing Pier" }}</Text>
                    </span>
                    <span className="font-medium text-slate-900">{activity.location[language]}</span>
                  </div>
                </div>
              )}

              {/* Explicit Notice: Pure Information, No Registration */}
              <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/80 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl border-t border-emerald-100 font-medium">
                <Info className="size-4 text-emerald-600 shrink-0" />
                <Text>
                  {{
                    id: "Informasi terbuka bagi seluruh nelayan, koperasi & mitra maritim — Bebas dihadiri tanpa biaya atau pendaftaran.",
                    en: "Open public information for all fishers, cooperatives & partners — Free to attend with no registration needed.",
                  }}
                </Text>
              </div>
            </div>
          ) : (
            /* If BLOG: Show Author & Publish Date */
            <div className="flex items-center gap-3.5 pt-2">
              <div className="size-11 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-blue-100">
                <User className="size-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {activity.author.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span>{activity.date[language]}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3 text-slate-400" />
                    <Text>{{ id: "3 mnt baca", en: "3 min read" }}</Text>
                  </span>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Cinematic Hero Image with Wave Pattern (Matches Attachment 2) */}
        <div className="relative mb-12 sm:mb-16">
          {/* Decorative Wave Pattern (Attachment 2 Motif) */}
          <div className="absolute -left-14 top-10 pointer-events-none hidden lg:block opacity-60">
            <WavePattern className="text-blue-500" />
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-xl shadow-slate-200/80 border border-slate-100">
            <Image
              src={activity.image}
              alt={activity.title[language]}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
            {/* Subtle Brand Tag */}
            {/* <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="text-xs font-black tracking-widest text-blue-900 uppercase">
                UNIBOX
              </span>
            </div> */}
          </div>
        </div>

        {/* Main Content Body (Centered, Single-Column per User Direction) */}
        <div className="space-y-8 text-slate-700">
          {/* Summary / Lead Box */}
          <div className="rounded-2xl bg-blue-50/70 border-l-4 border-blue-600 p-5 sm:p-6 text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
            {activity.summary[language]}
          </div>

          {/* Introduction Paragraph */}
          <p className="text-base sm:text-lg leading-relaxed text-slate-700">
            {activity.content.introduction[language]}
          </p>

          {/* Body Sections */}
          {activity.content.sections.map((section, idx) => (
            <div key={idx} className="pt-4">
              <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-snug mb-3">
                {section.heading[language]}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                {section.body[language]}
              </p>
            </div>
          ))}

          {/* Quote Block (if exists) */}
          {activity.content.quote && (
            <blockquote className="my-10 rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-[#0070ba] p-7 sm:p-9 text-white shadow-xl relative overflow-hidden">
              <Quote className="size-10 text-sky-300/40 mb-3" />
              <p className="font-display text-lg sm:text-xl font-bold leading-relaxed text-white mb-4">
                &ldquo;{activity.content.quote.text[language]}&rdquo;
              </p>
              <footer className="text-xs sm:text-sm font-semibold text-sky-200">
                {activity.content.quote.author}
              </footer>
            </blockquote>
          )}

          {/* Highlights Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-start gap-3 rounded-2xl bg-slate-50 border border-slate-200/80 p-4">
              <CheckCircle2 className="size-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  <Text>{{ id: "Efisiensi Energi Mandiri", en: "Self-Sustaining Energy Efficiency" }}</Text>
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  <Text>
                    {{
                      id: "Memanfaatkan putaran mesin perahu melalui flywheel generator tanpa membebani aki kapal.",
                      en: "Harnessing boat engine rotation via flywheel generator without auxiliary battery strain.",
                    }}
                  </Text>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-slate-50 border border-slate-200/80 p-4">
              <CheckCircle2 className="size-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  <Text>{{ id: "Standar Kesegaran Tangkapan Grade A", en: "Grade-A Catch Quality Standard" }}</Text>
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  <Text>
                    {{
                      id: "Pendinginan hingga -10°C menjaga kualitas daging ikan tetap segar hingga ke pelabuhan pelelangan.",
                      en: "Cooling to -10°C preserves fish flesh quality until reaching the auction landing harbor.",
                    }}
                  </Text>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-50 shadow-xs transition-all"
            >
              <ArrowLeft className="size-4" />
              <Text>{{ id: "Kembali ke Halaman Utama", en: "Back to Main Page" }}</Text>
            </Link>

            <span className="text-xs text-slate-400 font-medium">
              <Text>{{ id: "Pusat Informasi Teknologi Maritim Unibox", en: "Unibox Maritime Technology Hub" }}</Text>
            </span>
          </div>
        </div>

        {/* ========================================================
            UPCOMING EVENTS SECTION AT THE END OF ARTICLE
            (Pure Information - No Registration)
        ======================================================== */}
        <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t-2 border-slate-100">
          <div className="mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              <Text>{{ id: "Agenda & Informasi Kegiatan Mendatang", en: "Upcoming Event Agenda & Activities" }}</Text>
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              <Text>
                {{
                  id: "Jadwal kegiatan demonstrasi terbuka dan workshop teknologi Unibox di sentra pendaratan ikan pesisir.",
                  en: "Schedule for open demonstrations and Unibox tech workshops at coastal fish landing hubs.",
                }}
              </Text>
            </p>
          </div>

          <div className="space-y-4">
            {upcomingEventsData.map((event) => (
              <div
                key={event.id}
                className="group rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div className="flex items-start gap-4">
                  {/* Date Badge */}
                  <div className="flex flex-col items-center justify-center size-14 shrink-0 rounded-2xl bg-blue-50 text-blue-900 font-extrabold border border-blue-200/70 shadow-xs">
                    <span className="text-xl leading-none">{event.day}</span>
                    <span className="text-[10px] uppercase font-bold text-blue-700 leading-tight">
                      {event.monthYear.split(" ")[0]}
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <div className="flex items-center gap-1 text-xs text-slate-600 font-medium">
                        <MapPin className="size-3.5 text-blue-600 shrink-0" />
                        <span>{event.location[language]}</span>
                      </div>
                      {event.time && (
                        <>
                          <span className="text-xs text-slate-400">·</span>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Clock className="size-3 text-slate-400" />
                            <span>{event.time[language]}</span>
                          </div>
                        </>
                      )}
                    </div>

                    <h4 className="font-display text-base sm:text-lg font-bold text-slate-900">
                      {event.title[language]}
                    </h4>

                    <p className="mt-1 text-xs sm:text-sm text-slate-600 line-clamp-2">
                      {event.description[language]}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 self-end md:self-center">
                  {event.slug && (
                    <Link
                      href={`/news/${event.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-blue-900"
                    >
                      <span>
                        <Text>{{ id: "Lihat Detail", en: "View Details" }}</Text>
                      </span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

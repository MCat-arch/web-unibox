"use client";

import { Clock, ExternalLink, Mail, MapPin, Phone, Warehouse } from "lucide-react";
import { Text } from "@/components/text";

const surabayaOffice = {
  badge: { id: "Pusat Perakitan & Layanan", en: "Assembly & Marine Service Hub" },
  title: { id: "Surabaya Marine Hub", en: "Surabaya Marine Hub" },
  address: {
    id: "Jl. Bendul Merisi Selatan VII No.57, Bendul Merisi, Kec. Wonocolo, Surabaya, Jawa Timur",
    en: "Jl. Bendul Merisi Selatan VII No.57, Bendul Merisi, Kec. Wonocolo, Surabaya, Jawa Timur",
  },
  hours: { id: "Senin – Sabtu: 08.00 – 16.30 WIB", en: "Monday – Saturday: 08:00 – 16:30 WIB" },
  phone: "+62 31 7490 8820",
  email: "surabaya@unibox.id",
  mapQuery: "Jl. Bendul Merisi Selatan VII No.57, Bendul Merisi, Kec. Wonocolo, Surabaya, Jawa Timur",
  mapsUrl: "https://maps.app.goo.gl/WPcAtf1UWT4jv8HC8",
};

export function ContactCtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#092644] via-[#071f38] to-[#05172a] py-16 sm:py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-start lg:px-12">
        {/* Left Column: Contact Info (Desain Sekarang Dipertahankan) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-6 w-1 rounded-full bg-sky-400 shadow-sm shadow-sky-400/50" />
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-sky-300">
                <Text>{{ id: "Hubungi Kami", en: "Contact Us" }}</Text>
              </span>
            </div>

            <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-[1.25]">
              <Text>
                {{
                  id: "Mari Diskusikan Kebutuhan Rantai Dingin Anda.",
                  en: "Let's Discuss Your Cold-Chain Requirements.",
                }}
              </Text>
            </h2>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-sky-100/80">
              <Text>
                {{
                  id: "Ceritakan lokasi perahu, kapasitas tangkapan, dan tantangan operasional Anda. Tim teknis Unibox siap membantu memetakan konfigurasi sistem pendingin dan kelistrikan perahu yang paling efisien.",
                  en: "Tell us about your vessel location, catch volume, and operating challenges. Unibox engineering team is ready to map the most efficient refrigeration and boat electrification configuration.",
                }}
              </Text>
            </p>

            <div className="mt-8 space-y-4 border-t border-sky-800/60 pt-7">
              <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4 border border-white/10 backdrop-blur-sm">
                <div className="grid size-11 place-items-center rounded-lg bg-sky-500/20 text-sky-300 shrink-0">
                  <Mail className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-sky-300">Email Resmi</p>
                  <a href="mailto:halo@unibox.id" className="text-sm sm:text-base font-semibold text-white hover:text-sky-300 transition-colors">
                    halo@unibox.id
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4 border border-white/10 backdrop-blur-sm">
                <div className="grid size-11 place-items-center rounded-lg bg-sky-500/20 text-sky-300 shrink-0">
                  <Phone className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-sky-300">WhatsApp / Layanan Cepat</p>
                  <a href="https://wa.me/6281280921122" target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base font-semibold text-white hover:text-sky-300 transition-colors">
                    +62 812-8092-1122
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Single Office (Surabaya Marine Hub) + Google Maps Interactive Embed */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-white p-6 sm:p-8 text-slate-900 shadow-2xl shadow-blue-950/40 border border-slate-100">
            {/* Header: Badge & Title (Tanpa Tab Switcher) */}
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
              {/* <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200 mb-2">
                  <Warehouse className="size-3.5" />
                  <Text>{surabayaOffice.badge}</Text>
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                  <Text>{surabayaOffice.title}</Text>
                </h3>
              </div> */}

              <a
                href={surabayaOffice.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <Text>{{ id: "Buka Peta", en: "Open Maps" }}</Text>
                <ExternalLink className="size-3" />
              </a>
            </div>

            {/* Office Info Details */}
            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="size-4 text-blue-600 shrink-0 mt-1" />
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  <Text>{surabayaOffice.address}</Text>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="size-3.5 text-blue-600 shrink-0" />
                  <span><Text>{surabayaOffice.hours}</Text></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 text-blue-600 shrink-0" />
                  <span className="font-semibold text-slate-800">{surabayaOffice.phone}</span>
                </div>
              </div>
            </div>

            {/* Google Maps Interactive Embed for Surabaya */}
            <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-inner">
              <iframe
                title="Peta Lokasi Surabaya Marine Hub"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(surabayaOffice.mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full"
              />
            </div>

            {/* Open in Google Maps Mobile Button */}
            <div className="mt-4 flex sm:hidden items-center justify-between pt-1">
              <a
                href={surabayaOffice.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <MapPin className="size-3.5" />
                <Text>{{ id: "Buka Rute di Google Maps", en: "Open in Google Maps" }}</Text>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

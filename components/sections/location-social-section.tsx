"use client";

import { Clock, ExternalLink, Mail, MapPin, Phone, Warehouse } from "lucide-react";
import { Text } from "@/components/text";

const surabayaOffice = {
  badge: { id: "Pusat Perakitan & Layanan", en: "Assembly & Marine Service Hub" },
  title: { id: "Surabaya Marine Hub", en: "Surabaya Marine Hub" },
  address: {
    id: "Kawasan Pergudangan Perak Timur Blok C-4, Pabean Cantikan, Surabaya, Jawa Timur 60165",
    en: "East Perak Warehousing Complex Block C-4, Pabean Cantikan, Surabaya, East Java 60165",
  },
  hours: { id: "Senin – Sabtu: 08.00 – 16.30 WIB", en: "Monday – Saturday: 08:00 – 16:30 WIB" },
  phone: "+62 31 7490 8820",
  mapsUrl: "https://maps.google.com/?q=Perak+Timur+Surabaya",
};

export function LocationSocialSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#092644] via-[#071f38] to-[#05172a] py-16 sm:py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-start lg:px-12">
        {/* Kolom Kiri: Kontak Langsung (Clean List tanpa Card Container) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-6 w-1 rounded-full bg-sky-400 shadow-sm shadow-sky-400/50" />
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-sky-200">
                <Text>{{ id: "Hubungi Kami", en: "Contact Us" }}</Text>
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-[1.25]">
              <Text>
                {{
                  id: "Mari Diskusikan Kebutuhan Rantai Dingin Anda.",
                  en: "Let's Discuss Your Cold-Chain Requirements.",
                }}
              </Text>
            </h2>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-sky-100/80 font-normal">
              <Text>
                {{
                  id: "Ceritakan lokasi perahu, kapasitas tangkapan, dan tantangan operasional Anda. Tim teknis Unibox siap membantu memetakan konfigurasi sistem pendingin dan kelistrikan perahu yang paling efisien.",
                  en: "Tell us about your vessel location, catch volume, and operating challenges. Unibox engineering team is ready to map the most efficient refrigeration and boat electrification configuration.",
                }}
              </Text>
            </p>

            {/* List Kontak Minimalis & Terbuka */}
            <div className="mt-8 space-y-5 border-t border-sky-800/60 pt-7">
              <div className="flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-2xl bg-sky-500/15 text-sky-300 shrink-0 border border-sky-400/20">
                  <Mail className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-sky-300/80">
                    <Text>{{ id: "Email Resmi", en: "Official Email" }}</Text>
                  </p>
                  <a
                    href="mailto:halo@unibox.id"
                    className="text-base sm:text-lg font-semibold text-white hover:text-sky-300 transition-colors"
                  >
                    halo@unibox.id
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-2xl bg-sky-500/15 text-sky-300 shrink-0 border border-sky-400/20">
                  <Phone className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-sky-300/80">
                    <Text>{{ id: "WhatsApp / Layanan Cepat", en: "WhatsApp / Fast Response" }}</Text>
                  </p>
                  <a
                    href="https://wa.me/6281280921122"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-semibold text-white hover:text-sky-300 transition-colors"
                  >
                    +62 812-8092-1122
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Card Lengkap dengan Detail Informasi & Desain Peta Bersih */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-white p-6 sm:p-8 text-slate-900 shadow-2xl shadow-blue-950/40 border border-slate-100">
            {/* Header Card: Badge, Title & Button Buka Peta */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200 mb-2.5">
                  <Warehouse className="size-3.5" />
                  <Text>{surabayaOffice.badge}</Text>
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                  <Text>{surabayaOffice.title}</Text>
                </h3>
              </div>

              <a
                href={surabayaOffice.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors shrink-0"
              >
                <MapPin className="size-3.5" />
                <Text>{{ id: "Buka Peta", en: "Open Maps" }}</Text>
                <ExternalLink className="size-3" />
              </a>
            </div>

            {/* Office Info Details: Alamat, Jam Operasional & Telepon */}
            <div className="mt-5 space-y-3.5">
              <div className="flex items-start gap-3">
                <MapPin className="size-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  <Text>{surabayaOffice.address}</Text>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-blue-600 shrink-0" />
                  <span>
                    <Text>{surabayaOffice.hours}</Text>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-blue-600 shrink-0" />
                  <span className="font-semibold text-slate-800">{surabayaOffice.phone}</span>
                </div>
              </div>
            </div>

            {/* Clean, Informative Vector Map (Minimalis & Cepat Dimuat) */}
            <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-[#EBF0F5] shadow-inner">
              <svg
                className="absolute inset-0 size-full"
                viewBox="0 0 600 340"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Lahan Daratan */}
                <rect width="600" height="340" fill="#E8EEF5" />

                {/* Perairan / Selat Madura / Dermaga Perak (Sisi Kanan Atas) */}
                <path d="M440 0 L600 0 L600 160 L500 130 Z" fill="#CFE4F6" />
                <text x="545" y="60" fontSize="9" fontWeight="700" fill="#7FA4C4" letterSpacing="1" textAnchor="middle">
                  SECTOR PELABUHAN
                </text>

                {/* Zona Kawasan Pergudangan & Logistik Perak */}
                <rect x="30" y="30" width="160" height="90" rx="8" fill="#DDE6EF" opacity="0.8" />
                <rect x="220" y="25" width="180" height="95" rx="8" fill="#D2DFEC" opacity="0.9" />
                <rect x="40" y="190" width="220" height="120" rx="8" fill="#DDE6EF" opacity="0.8" />
                <rect x="300" y="210" width="260" height="100" rx="8" fill="#DDE6EF" opacity="0.8" />

                {/* Label Zona Pergudangan */}
                <text x="310" y="65" fontSize="9" fontWeight="700" fill="#5E7892">
                  Komp. Pergudangan Perak Timur
                </text>

                {/* Jalan Sekunder Lingkungan */}
                <line x1="200" y1="0" x2="200" y2="340" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
                <line x1="0" y1="270" x2="600" y2="270" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />

                {/* Jalan Utama: Jl. Perak Timur (Jalur Arteri Pelabuhan) */}
                <path d="M-10 150 Q280 155 610 180" stroke="#FFFFFF" strokeWidth="24" strokeLinecap="round" />
                <path
                  d="M-10 150 Q280 155 610 180"
                  stroke="#F2C335"
                  strokeWidth="5"
                  strokeDasharray="14 10"
                  fill="none"
                  opacity="0.85"
                />

                {/* Akses Masuk Blok Pergudangan */}
                <line x1="310" y1="155" x2="310" y2="70" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />

                {/* Label Jalan dengan Badge Putih agar Kontras */}
                <rect x="50" y="132" width="115" height="18" rx="4" fill="#FFFFFF" opacity="0.92" />
                <text x="107" y="145" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">
                  Jl. Perak Timur
                </text>

                {/* Pin Lokasi Utama: Unibox Blok C-4 */}
                <g transform="translate(310, 75)">
                  {/* Efek Radius / Pulse */}
                  <circle cx="0" cy="0" r="26" fill="#0284C7" fillOpacity="0.15" />
                  <circle cx="0" cy="0" r="16" fill="#0284C7" fillOpacity="0.25" />
                  {/* Pin Head */}
                  <circle cx="0" cy="-4" r="12" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2.5" />
                  <circle cx="0" cy="-4" r="3.5" fill="#FFFFFF" />
                  {/* Callout Marker */}
                  <rect x="18" y="-16" width="76" height="20" rx="5" fill="#0F172A" />
                  <text x="56" y="-3" fontSize="8.5" fontWeight="700" fill="#FFFFFF" textAnchor="middle">
                    Unibox Blok C-4
                  </text>
                </g>
              </svg>
            </div>

            {/* Tombol Mobile Google Maps */}
            <div className="mt-4 flex sm:hidden">
              <a
                href={surabayaOffice.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
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
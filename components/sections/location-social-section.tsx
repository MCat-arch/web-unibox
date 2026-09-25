"use client";

import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Warehouse,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Text } from "@/components/text";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socialMediaIcons = [
  { name: "LinkedIn", icon: LinkedinIcon, url: "https://linkedin.com", label: "LinkedIn Unibox" },
  { name: "Instagram", icon: InstagramIcon, url: "https://instagram.com/unibox_id", label: "Instagram @unibox_id" },
  { name: "YouTube", icon: YoutubeIcon, url: "https://youtube.com", label: "YouTube Unibox" },
  { name: "WhatsApp", icon: MessageCircle, url: "https://wa.me/6281280921122", label: "WhatsApp Resmi" },
  { name: "Facebook", icon: FacebookIcon, url: "https://facebook.com", label: "Facebook Unibox" },
];

export function LocationSocialSection() {
  return (
    <section className="bg-gradient-to-b from-[#031120] to-[#020b16] py-16 sm:py-24 text-white border-t border-sky-950/80">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-6 w-1 rounded-full bg-sky-400 shadow-sm shadow-sky-400/50" />
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-sky-300">
                <Text>{{ id: "Lokasi & Media Sosial", en: "Locations & Social Media" }}</Text>
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              <Text>
                {{
                  id: "Hub Operasional & Pusat Layanan Kami",
                  en: "Our Operational Hubs & Service Centers",
                }}
              </Text>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-sky-100/70 max-w-sm sm:text-right">
            <Text>
              {{
                id: "Kunjungi workshop perakitan atau hubungi tim teknis kami di Surabaya",
                en: "Visit our assembly workshop or reach our technical engineers in Surabaya",
              }}
            </Text>
          </p>
        </div>

        {/* 2-Column Layout: Office Info Card + Map Card (Screenshot Reference) */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Sisi Kiri: Detail Kontak & Jam Kerja */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-8 text-slate-900 shadow-2xl shadow-blue-950/50 border border-slate-100">
            <div>
              <div className="flex items-center justify-between gap-4 mb-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">
                  <Warehouse className="size-3.5" />
                  <Text>{{ id: "Pusat Perakitan & Layanan", en: "Assembly & Service Hub" }}</Text>
                </span>
                <a
                  href="https://maps.google.com/?q=Jl.+Margomulyo+Indah+V+No.1+Blok+C+Surabaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <MapPin className="size-3.5" />
                  <Text>{{ id: "Buka Peta", en: "Open Maps" }}</Text>
                  <ExternalLink className="size-3" />
                </a>
              </div>

              <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">
                Surabaya Marine Hub
              </h3>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 mb-6">
                Jl. Margomulyo Indah V No.1 Blok C, Pabean Cantikan, Surabaya, Jawa Timur 60165
              </p>
            </div>

            <div className="border-t border-slate-100 pt-5 space-y-3.5 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <Clock className="size-4 text-blue-600 shrink-0" />
                <span>
                  <Text>{{ id: "Senin – Sabtu: 08.00 – 16.30 WIB", en: "Monday – Saturday: 08:00 – 16:30 WIB" }}</Text>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-blue-600 shrink-0" />
                <span className="font-semibold text-slate-800">+62 31 7490 8820</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-blue-600 shrink-0" />
                <span className="font-semibold text-slate-800">surabaya@unibox.id</span>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/6281280921122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 text-xs sm:text-sm shadow-sm transition-all"
                >
                  <MessageCircle className="size-4" />
                  <span>
                    <Text>{{ id: "Chat WhatsApp Resmi (+62 812-8092-1122)", en: "Official WhatsApp (+62 812-8092-1122)" }}</Text>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Map Card Sesuai Screenshot 1753 */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700/40 aspect-[16/11] sm:aspect-[16/10] w-full bg-[#E5ECF2]">
              {/* Map Illustration Vector */}
              <svg
                className="absolute inset-0 size-full pointer-events-none"
                viewBox="0 0 600 400"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Land Background */}
                <rect width="600" height="400" fill="#E8EEF4" />

                {/* Green Zone (Bottom Left) */}
                <path d="M0 240 L160 260 L140 400 L0 400 Z" fill="#D6E8D6" />

                {/* Buildings */}
                <rect x="180" y="50" width="130" height="110" rx="6" fill="#D8E2EC" stroke="#C5D3E0" strokeWidth="2" />
                <rect x="325" y="40" width="160" height="120" rx="6" fill="#D8E2EC" stroke="#C5D3E0" strokeWidth="2" />
                <rect x="250" y="180" width="110" height="70" rx="8" fill="#D2DFEA" stroke="#B8CBDC" strokeWidth="2" />
                <rect x="370" y="175" width="150" height="110" rx="6" fill="#D8E2EC" stroke="#C5D3E0" strokeWidth="2" />
                <rect x="20" y="60" width="140" height="130" rx="6" fill="#D8E2EC" stroke="#C5D3E0" strokeWidth="2" />

                {/* Mosque Landmark */}
                <g transform="translate(480, 240)">
                  <circle cx="12" cy="12" r="10" fill="#A4BBD0" />
                  <path d="M12 6 C10 8 10 10 12 12 C14 10 14 8 12 6" fill="white" />
                  <text x="12" y="32" fontSize="9" fontWeight="bold" fill="#6A829A" textAnchor="middle">
                    Masjid Al-Falah
                  </text>
                </g>

                {/* Roads */}
                <path d="M-20 120 L230 220 L620 330" stroke="#FFFFFF" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M-20 120 L230 220 L620 330" stroke="#C8D6E5" strokeWidth="32" strokeOpacity="0.4" fill="none" />
                <path d="M175 40 L230 220 L200 410" stroke="#FFFFFF" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M340 40 L370 270 L350 410" stroke="#FFFFFF" strokeWidth="20" strokeLinecap="round" />
                <path d="M480 30 L500 280" stroke="#FFFFFF" strokeWidth="20" strokeLinecap="round" />

                {/* Road Labels */}
                <text x="245" y="262" fontSize="11" fontWeight="bold" fill="#4D6277" transform="rotate(13 245 262)">
                  Jalan Margomulyo
                </text>
                <text x="430" y="125" fontSize="10" fontWeight="bold" fill="#4D6277" transform="rotate(-15 430 125)">
                  Jalan Margomulyo Indah V
                </text>

                {/* Glowing Green Pin */}
                <g transform="translate(305, 175)">
                  <circle cx="0" cy="0" r="32" fill="#0F8259" fillOpacity="0.18" />
                  <circle cx="0" cy="0" r="24" fill="#0F8259" fillOpacity="0.3" />
                  <circle cx="0" cy="0" r="18" fill="white" />
                  <circle cx="0" cy="0" r="15" fill="#0F8259" />
                  <path d="M0 -7 C-3.5 -7 -6 -4.5 -6 -1 C-6 3.5 0 7 0 7 C0 7 6 3.5 6 -1 C6 -4.5 3.5 -7 0 -7 Z" fill="white" />
                  <circle cx="0" cy="-1.5" r="1.8" fill="#0F8259" />
                </g>
              </svg>

              {/* Floating Pill Card (Matches Screenshot 1753) */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6">
                <a
                  href="https://maps.google.com/?q=Jl.+Margomulyo+Indah+V+No.1+Blok+C+Surabaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 sm:gap-4 rounded-full bg-white/95 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-4 shadow-xl shadow-slate-950/20 border border-slate-200/90 transition-all duration-300 hover:bg-white hover:scale-[1.01] hover:shadow-2xl group"
                >
                  <div className="size-10 sm:size-12 rounded-full bg-[#EAF5F0] text-[#0F8259] flex items-center justify-center shrink-0 border border-[#CDE7DC] shadow-xs group-hover:bg-[#0F8259] group-hover:text-white transition-colors">
                    <MapPin className="size-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#0F8259] block">
                      <Text>{{ id: "TITIK PENJEMPUTAN & WORKSHOP", en: "PICKUP POINT & WORKSHOP" }}</Text>
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      Jl. Margomulyo Indah V No.1 Blok C, Surabaya
                    </p>
                  </div>

                  <div className="size-8 sm:size-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ChevronRight className="size-5" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Channels */}
        <div className="mt-12 rounded-2xl bg-white/5 p-6 sm:p-8 backdrop-blur-sm border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-lg font-bold text-white">
              <Text>{{ id: "Terhubung di Media Sosial", en: "Connect on Social Media" }}</Text>
            </h3>
            <p className="text-xs sm:text-sm text-sky-100/70 mt-1">
              <Text>
                {{
                  id: "Dapatkan pembaruan visual terbaru dari pelabuhan dan kegiatan nelayan",
                  en: "Get latest visual updates from harbors and fishing activities",
                }}
              </Text>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialMediaIcons.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="grid size-11 place-items-center rounded-xl bg-white text-blue-900 border border-white/20 shadow-md transition-all duration-200 hover:scale-110 hover:bg-sky-400 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

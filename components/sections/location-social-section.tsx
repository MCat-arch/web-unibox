"use client";

import {
  Building2,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Warehouse,
} from "lucide-react";
import { Text } from "@/components/text";
import { Button } from "@/components/ui/button";

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

const offices = [
  // {
  //   icon: Building2,
  //   badge: { id: "Kantor Pusat & Rekayasa", en: "Head Office & Engineering" },
  //   title: { id: "Jakarta Office", en: "Jakarta Office" },
  //   address: {
  //     id: "Kawasan Industri Maritim, Jl. Danau Sunter Barat No. 88, Tanjung Priok, Jakarta Utara, DKI Jakarta 14350",
  //     en: "Maritime Industrial Estate, Jl. Danau Sunter Barat No. 88, Tanjung Priok, North Jakarta, 14350",
  //   },
  //   hours: { id: "Senin – Jumat: 08.30 – 17.00 WIB", en: "Monday – Friday: 08:30 – 17:00 WIB" },
  //   phone: "+62 21 8092 1122",
  //   email: "halo@unibox.id",
  //   mapsUrl: "https://maps.google.com/?q=Tanjung+Priok+Jakarta",
  // },
  {
    icon: Warehouse,
    badge: { id: "Pusat Perakitan & Layanan", en: "Assembly & Service Hub" },
    title: { id: "Surabaya Marine Hub", en: "Surabaya Marine Hub" },
    address: {
      id: "Kawasan Pergudangan Perak Timur Blok C-4, Pabean Cantikan, Surabaya, Jawa Timur 60165",
      en: "East Perak Warehousing Complex Block C-4, Pabean Cantikan, Surabaya, East Java 60165",
    },
    hours: { id: "Senin – Sabtu: 08.00 – 16.30 WIB", en: "Monday – Saturday: 08:00 – 16:30 WIB" },
    phone: "+62 31 7490 8820",
    email: "surabaya@unibox.id",
    mapsUrl: "https://maps.google.com/?q=Perak+Timur+Surabaya",
  },
];

const socialMediaIcons = [
  {
    name: "LinkedIn",
    icon: LinkedinIcon,
    url: "https://linkedin.com",
    label: "LinkedIn Unibox",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    url: "https://instagram.com/unibox_id",
    label: "Instagram @unibox_id",
  },
  {
    name: "YouTube",
    icon: YoutubeIcon,
    url: "https://youtube.com",
    label: "YouTube Unibox",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    url: "https://wa.me/6281280921122",
    label: "WhatsApp Resmi",
  },
  {
    name: "Facebook",
    icon: FacebookIcon,
    url: "https://facebook.com",
    label: "Facebook Unibox",
  },
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
                id: "Kunjungi workshop perakitan atau jangkau tim kami melalui berbagai saluran resmi",
                en: "Visit our assembly workshops or reach our team via official maritime channels",
              }}
            </Text>
          </p>
        </div>

        {/* 2 White Office Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {offices.map((office) => {
            const OfficeIcon = office.icon;
            return (
              <div
                key={office.title.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-8 text-slate-900 shadow-2xl shadow-blue-950/50 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">
                      <OfficeIcon className="size-3.5" />
                      <Text>{office.badge}</Text>
                    </span>
                    <a
                      href={office.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <MapPin className="size-3.5" />
                      <Text>{{ id: "Buka Peta", en: "Open Maps" }}</Text>
                      <ExternalLink className="size-3" />
                    </a>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                    <Text>{office.title}</Text>
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600 mb-6">
                    <Text>{office.address}</Text>
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-3">
                    <Clock className="size-4 text-blue-600 shrink-0" />
                    <span><Text>{office.hours}</Text></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="size-4 text-blue-600 shrink-0" />
                    <span className="font-semibold text-slate-800">{office.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="size-4 text-blue-600 shrink-0" />
                    <span className="font-semibold text-slate-800">{office.email}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Social Media Channels (Icon-only with clean label tooltip) */}
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

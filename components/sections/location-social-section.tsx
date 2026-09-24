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
  {
    icon: Building2,
    badge: { id: "Kantor Pusat & Rekayasa", en: "Head Office & Engineering" },
    title: { id: "Jakarta Office", en: "Jakarta Office" },
    address: {
      id: "Kawasan Industri Maritim, Jl. Danau Sunter Barat No. 88, Tanjung Priok, Jakarta Utara, DKI Jakarta 14350",
      en: "Maritime Industrial Estate, Jl. Danau Sunter Barat No. 88, Tanjung Priok, North Jakarta, 14350",
    },
    hours: { id: "Senin – Jumat: 08.30 – 17.00 WIB", en: "Monday – Friday: 08:30 – 17:00 WIB" },
    phone: "+62 21 8092 1122",
    email: "halo@unibox.id",
    mapsUrl: "https://maps.google.com/?q=Tanjung+Priok+Jakarta",
  },
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
    hoverClass: "text-slate-600 hover:text-[#0a66c2] hover:border-[#0a66c2]/40 hover:bg-[#0a66c2]/5",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    url: "https://instagram.com",
    hoverClass: "text-slate-600 hover:text-[#e4405f] hover:border-[#e4405f]/40 hover:bg-[#e4405f]/5",
  },
  {
    name: "YouTube",
    icon: YoutubeIcon,
    url: "https://youtube.com",
    hoverClass: "text-slate-600 hover:text-[#ff0000] hover:border-[#ff0000]/40 hover:bg-[#ff0000]/5",
  },
  {
    name: "WhatsApp Business",
    icon: MessageCircle,
    url: "https://wa.me/6281198765432",
    hoverClass: "text-slate-600 hover:text-[#25d366] hover:border-[#25d366]/40 hover:bg-[#25d366]/5",
  },
  {
    name: "Facebook",
    icon: FacebookIcon,
    url: "https://facebook.com",
    hoverClass: "text-slate-600 hover:text-[#1877f2] hover:border-[#1877f2]/40 hover:bg-[#1877f2]/5",
  },
];

export function LocationSocialSection() {
  return (
    <section className="bg-ice py-16 sm:py-24 border-t border-blue-100">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-xs">
            <MapPin className="size-3.5 text-blue-600" />
            <Text>{{ id: "LOKASI & KANAL DIGITAL", en: "OFFICES & DIGITAL CHANNELS" }}</Text>
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy leading-tight">
            <Text>
              {{
                id: "Kunjungi Kantor Kami & Terhubung Bersama Kami",
                en: "Visit Our Offices & Connect With Us",
              }}
            </Text>
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
            <Text>
              {{
                id: "Kami siap menyambut Anda untuk diskusi teknis langsung di pusat operasional kami, maupun melalui saluran komunikasi resmi Unibox.",
                en: "We welcome you for in-person technical discussions at our operating hubs, as well as through our official digital channels.",
              }}
            </Text>
          </p>
        </div>

        {/* Office Location Cards (2 Columns) */}
        <div className="grid gap-6 lg:grid-cols-2 mb-12">
          {offices.map((office, idx) => {
            const Icon = office.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-blue-100/90 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 hover:border-blue-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      <Text>{office.badge}</Text>
                    </span>
                    <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-105">
                      <Icon className="size-5" />
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-navy group-hover:text-blue-600 transition-colors">
                    <Text>{office.title}</Text>
                  </h3>

                  <div className="mt-5 space-y-3.5 text-sm text-slate-700">
                    <div className="flex items-start gap-3">
                      <MapPin className="size-4 shrink-0 text-blue-600 mt-1" />
                      <p className="leading-relaxed">
                        <Text>{office.address}</Text>
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-slate-500">
                      <Clock className="size-4 shrink-0 text-blue-600" />
                      <span>
                        <Text>{office.hours}</Text>
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm">
                      <a
                        href={`tel:${office.phone.replace(/[^0-9+]/g, "")}`}
                        className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                      >
                        <Phone className="size-4 text-blue-600" />
                        <span className="font-medium">{office.phone}</span>
                      </a>
                      <a
                        href={`mailto:${office.email}`}
                        className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                      >
                        <Mail className="size-4 text-blue-600" />
                        <span className="font-medium">{office.email}</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-5">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto rounded-xl gap-2 font-semibold border-blue-200 text-blue-700 bg-blue-50/40 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-xs"
                  >
                    <a href={office.mapsUrl} target="_blank" rel="noopener noreferrer">
                      <Text>{{ id: "Buka di Google Maps", en: "Open in Google Maps" }}</Text>
                      <ExternalLink className="size-3.5" />
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Social Media: Compact Icon-Only Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-blue-100/90 bg-white p-6 sm:p-8 shadow-sm">
          <div className="text-center sm:text-left">
            <h3 className="font-display text-lg sm:text-xl font-bold text-navy">
              <Text>
                {{
                  id: "Media Sosial & Saluran Komunikasi",
                  en: "Social Media & Communication Channels",
                }}
              </Text>
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              <Text>
                {{
                  id: "Ikuti perkembangan teknologi dan dokumentasi instalasi lapangan kami",
                  en: "Follow our technology updates and field installation documentations",
                }}
              </Text>
            </p>
          </div>

          {/* Social Icons Only with Consistent Blue Theme */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            {socialMediaIcons.map((soc) => {
              const Icon = soc.icon;
              return (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={soc.name}
                  aria-label={soc.name}
                  className="group grid size-12 sm:size-14 place-items-center rounded-2xl border border-blue-100 bg-blue-50/50 text-blue-700 shadow-xs transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
                >
                  <Icon className="size-5 sm:size-6 transition-transform duration-300 group-hover:scale-110" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

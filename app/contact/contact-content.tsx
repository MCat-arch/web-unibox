"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  ExternalLink,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Warehouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/page-intro";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";

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

const socialLinks = [
  { name: "LinkedIn", icon: LinkedinIcon, url: "https://linkedin.com", label: "LinkedIn Unibox" },
  { name: "Instagram", icon: InstagramIcon, url: "https://instagram.com/unibox_id", label: "Instagram @unibox_id" },
  { name: "YouTube", icon: YoutubeIcon, url: "https://youtube.com", label: "YouTube Unibox" },
  { name: "WhatsApp", icon: MessageCircle, url: "https://wa.me/6281280921122", label: "WhatsApp Resmi" },
  { name: "Facebook", icon: FacebookIcon, url: "https://facebook.com", label: "Facebook Unibox" },
];

const faqs = [
  {
    question: {
      id: "Berapa kapasitas volume dan rentang suhu pendinginan Unibox?",
      en: "What is the volume capacity and cooling temperature range of Unibox?",
    },
    answer: {
      id: "Unibox memiliki kapasitas penyimpanan bersih sebesar 100 Liter yang mampu memuat hingga 70-80 kg hasil tangkapan ikan laut. Sistem kompresor refrigerasi DC berbasis refrigeran ramah lingkungan R32 mampu menurunkan dan mempertahankan suhu dingin beku stabil mulai dari 0°C hingga -10°C secara terus-menerus selama pelayaran.",
      en: "Unibox features a 100-Liter net storage volume accommodating 70-80 kg of fresh seafood. The eco-friendly R32 DC compressor continuously maintains cold storage temperatures from 0°C down to -10°C throughout ocean voyages.",
    },
  },
  {
    question: {
      id: "Bagaimana sistem pendingin Unibox memperoleh daya listrik tanpa membebani aki kapal?",
      en: "How does the Unibox refrigeration system generate power without draining boat batteries?",
    },
    answer: {
      id: "Unibox memanfaatkan putaran kinetik flywheel pada mesin diesel perahu nelayan (seperti tipe satu silinder Dongfeng, Yanmar, dan Kubota) yang dikonversi menjadi energi listrik DC stabil sebesar ±200 Watt. Dilengkapi unit cadangan daya terintegrasi, suhu dingin tetap bertahan stabil bahkan saat mesin perahu dimatikan untuk berlabuh.",
      en: "Unibox harnesses the rotational kinetic energy of the boat diesel engine's flywheel (such as popular single-cylinder Dongfeng, Yanmar, and Kubota engines), converting it into stable ±200W DC electricity. An integrated reserve unit maintains cold temperatures even when the engine is off at anchor.",
    },
  },
  {
    question: {
      id: "Apakah sensor sonar ultrasonik aman bagi biota laut dan berapa radius deteksinya?",
      en: "Is the ultrasonic sonar safe for marine life, and what is its scanning radius?",
    },
    answer: {
      id: "Transduser ultrasonik Unibox dirancang dengan pulsa frekuensi terarah yang aman bagi ekosistem laut tanpa polusi suara destruktif. Sensor mampu mendeteksi gerombolan ikan dan kontur dasar perairan secara presisi hingga radius 100 meter, sehingga memangkas waktu jelajah perahu dan menghemat konsumsi BBM solar hingga 35%.",
      en: "The Unibox ultrasonic transducer operates with directional high-frequency pulses that are safe for marine life without excessive acoustic disruption. It precisely detects fish schools up to a 100-meter radius, slashing cruising search times and cutting diesel fuel use by up to 35%.",
    },
  },
  {
    question: {
      id: "Bagaimana ketahanan bodi penyimpanan terhadap benturan ombak dan air laut?",
      en: "How durable is the storage body against wave impacts and saltwater exposure?",
    },
    answer: {
      id: "Bodi cool box dibuat dari pelat baja tahan karat (stainless steel) food-grade standar maritim dengan dinding ganda berinsulasi busa poliuretan berkerapatan tinggi. Struktur ini dilengkapi gasket karet ganda anti-bocor serta engsel pengunci kokoh yang telah teruji tahan terhadap salinitas ekstrem pesisir dan benturan ombak.",
      en: "The cool box body is forged from marine-grade, food-grade stainless steel with double-walled high-density polyurethane insulation. It includes dual leak-proof rubber gaskets and heavy-duty latches tested to withstand harsh coastal salinity and turbulent wave shocks.",
    },
  },
  {
    question: {
      id: "Bagaimana cara nelayan, koperasi, atau dinas perikanan berkonsultasi atau memesan?",
      en: "How can fishers, cooperatives, or fisheries agencies consult or place an order?",
    },
    answer: {
      id: "Anda dapat langsung menghubungi tim Unibox melalui chat WhatsApp resmi (+62 812-8092-1122), telepon kantor Surabaya (+62 31 7490 8820), atau berkunjung langsung ke workshop perakitan kami di Margomulyo Surabaya. Tim teknis kami siap memberikan konsultasi konfigurasi mesin dan demonstrasi unit.",
      en: "You can reach the Unibox team directly via our official WhatsApp chat (+62 812-8092-1122), Surabaya office line (+62 31 7490 8820), or by visiting our assembly workshop in Margomulyo, Surabaya. Our technical team is ready to provide engine configuration advice and product demos.",
    },
  },
  {
    question: {
      id: "Apakah tersedia panduan instalasi, garansi, dan ketersediaan suku cadang?",
      en: "Are installation guidance, warranty, and local spare parts provided?",
    },
    answer: {
      id: "Setiap unit Unibox dilengkapi garansi pabrikan, modul suku cadang universal yang mudah dirawat oleh montir kapal lokal, serta buku manual instalasi ringkas. Tim teknis lapangan Unibox juga menyediakan sesi pelatihan perakitan braket flywheel langsung di sentra pendaratan ikan mitra.",
      en: "Every Unibox unit comes with a manufacturer warranty, universal spare parts easily serviced by local dock mechanics, and concise installation guides. Unibox field engineers also provide hands-on flywheel mounting training at partner fishing ports.",
    },
  },
];

export function ContactContent() {
  const { language } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header / Intro */}
      <PageIntro
        eyebrow={{ id: "Kontak & Layanan", en: "Contact & Service" }}
        title={{
          id: "Pusat Informasi & Workshop Perakitan Unibox",
          en: "Unibox Information & Assembly Workshop Hub",
        }}
        description={{
          id: "Hubungi tim teknis kami secara langsung untuk konsultasi konfigurasi mesin kapal, jadwal demonstrasi pelabuhan, atau kunjungi fasilitas perakitan kami di Surabaya.",
          en: "Contact our technical engineers directly for vessel engine configuration, harbor demonstration schedules, or visit our assembly workshop in Surabaya.",
        }}
      />

      {/* ========================================================
          MAIN SECTION: 2 COLUMNS
          Left: Direct Contact Channels (WhatsApp, Phone, Email)
          Right: Address & Map Card (Matches Screenshot Reference)
      ======================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* SISI KIRI: INFORMASI KONTAK LENGKAP (TANPA FORM) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-5 w-1 rounded-full bg-blue-600 shadow-sm shadow-blue-600/40" />
                <span className="text-xs font-bold tracking-wider uppercase text-blue-700">
                  <Text>{{ id: "Saluran Komunikasi Langsung", en: "Direct Contact Channels" }}</Text>
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                <Text>{{ id: "Terhubung Langsung dengan Tim Kami", en: "Connect Directly with Our Team" }}</Text>
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                <Text>
                  {{
                    id: "Tidak perlu mengisi formulir panjang. Anda dapat menghubungi saluran resmi kami untuk respons cepat mengenai produk, harga, dan kemitraan.",
                    en: "No lengthy forms required. Reach our official channels directly for fast responses regarding products, pricing, and partnerships.",
                  }}
                </Text>
              </p>
            </div>

            {/* Kartu Kontak 1: WhatsApp Resmi (Primary CTA) */}
            <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200/80 p-5 sm:p-6 transition-all hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                  <MessageCircle className="size-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
                    <Text>{{ id: "WhatsApp Chat Cepat", en: "Fast WhatsApp Chat" }}</Text>
                  </span>
                  <h3 className="font-display text-lg font-bold text-slate-900 mt-0.5">
                    +62 812-8092-1122
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    <Text>
                      {{
                        id: "Konsultasi teknis cepat, konfirmasi kunjungan, dan informasi unit.",
                        en: "Fast technical inquiries, visit bookings, and unit information.",
                      }}
                    </Text>
                  </p>
                  <div className="mt-4">
                    <a
                      href="https://wa.me/6281280921122"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-5 py-2.5 shadow-sm transition-all hover:scale-[1.02]"
                    >
                      <MessageCircle className="size-4" />
                      <span>
                        <Text>{{ id: "Chat WhatsApp Sekarang", en: "Chat on WhatsApp" }}</Text>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Kartu Kontak 2: Telepon Kantor & Email */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5 sm:p-6 space-y-4">
              {/* Telepon */}
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                  <Phone className="size-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <Text>{{ id: "Telepon Kantor", en: "Office Telephone" }}</Text>
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    +62 31 7490 8820
                  </p>
                  <p className="text-xs text-slate-500">
                    <Text>{{ id: "Senin – Sabtu: 08.00 – 16.30 WIB", en: "Monday – Saturday: 08:00 – 16:30 WIB" }}</Text>
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200/60 pt-4 flex items-start gap-4">
                <div className="size-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                  <Mail className="size-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <Text>{{ id: "Surat Elektronik (Email)", en: "Official Email" }}</Text>
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    surabaya@unibox.id · halo@unibox.id
                  </p>
                  <p className="text-xs text-slate-500">
                    <Text>
                      {{
                        id: "Untuk korespondensi formal, proposal dinas, dan kemitraan industri.",
                        en: "For formal correspondence, institutional proposals, and corporate partnerships.",
                      }}
                    </Text>
                  </p>
                </div>
              </div>
            </div>

            {/* Media Sosial */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
              <span className="text-xs font-bold text-slate-700 block mb-3">
                <Text>{{ id: "Kanal Media Sosial Resmi", en: "Official Social Media Channels" }}</Text>
              </span>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-700 border border-slate-200 shadow-xs transition-all hover:scale-105 hover:bg-blue-600 hover:text-white"
                    >
                      <Icon className="size-4.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SISI KANAN: CARD ALAMAT & PETA SESUAI REFERENSI LAMPIRAN (Screenshot 1753) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-5 w-1 rounded-full bg-blue-600 shadow-sm shadow-blue-600/40" />
                <span className="text-xs font-bold tracking-wider uppercase text-blue-700">
                  <Text>{{ id: "Lokasi Workshop & Perakitan", en: "Workshop & Assembly Location" }}</Text>
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                <Text>{{ id: "Pusat Perakitan Surabaya Marine Hub", en: "Surabaya Marine Hub Assembly Center" }}</Text>
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                <Text>
                  {{
                    id: "Fasilitas perakitan dan pengujian unit Unibox berlokasi strategis di kawasan industri maritim Margomulyo, Surabaya.",
                    en: "Unibox assembly and unit testing facilities are strategically located in the Margomulyo maritime industrial hub, Surabaya.",
                  }}
                </Text>
              </p>
            </div>

            {/* PETA GRAFIS SESUAI SCREENSHOT 1753 DENGAN FLOATING PILL CARD */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200/90 aspect-[16/11] sm:aspect-[16/10] w-full bg-[#E5ECF2]">
              {/* SVG Vector Map Realistic Styling (Matching Screenshot Margomulyo Grid) */}
              <svg
                className="absolute inset-0 size-full pointer-events-none"
                viewBox="0 0 600 400"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Land */}
                <rect width="600" height="400" fill="#E8EEF4" />

                {/* Soft Green Park / Open Area (Bottom Left as in screenshot) */}
                <path d="M0 240 L160 260 L140 400 L0 400 Z" fill="#D6E8D6" />

                {/* Building / Plot Polygons */}
                <rect x="180" y="50" width="130" height="110" rx="6" fill="#D8E2EC" stroke="#C5D3E0" strokeWidth="2" />
                <rect x="325" y="40" width="160" height="120" rx="6" fill="#D8E2EC" stroke="#C5D3E0" strokeWidth="2" />
                <rect x="250" y="180" width="110" height="70" rx="8" fill="#D2DFEA" stroke="#B8CBDC" strokeWidth="2" />
                <rect x="370" y="175" width="150" height="110" rx="6" fill="#D8E2EC" stroke="#C5D3E0" strokeWidth="2" />
                <rect x="20" y="60" width="140" height="130" rx="6" fill="#D8E2EC" stroke="#C5D3E0" strokeWidth="2" />

                {/* Mosque Landmark icon & text (Masjid Al-Falah as in screenshot) */}
                <g transform="translate(480, 240)">
                  <circle cx="12" cy="12" r="10" fill="#A4BBD0" />
                  <path d="M12 6 C10 8 10 10 12 12 C14 10 14 8 12 6" fill="white" />
                  <text x="12" y="32" fontSize="9" fontWeight="bold" fill="#6A829A" textAnchor="middle">
                    Masjid Al-Falah
                  </text>
                </g>

                {/* Road Network (White Corridors) */}
                {/* Main Avenue: Jalan Margomulyo (Diagonal corridor) */}
                <path
                  d="M-20 120 L230 220 L620 330"
                  stroke="#FFFFFF"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M-20 120 L230 220 L620 330"
                  stroke="#C8D6E5"
                  strokeWidth="32"
                  strokeOpacity="0.4"
                  fill="none"
                />

                {/* Jalan Margomulyo Indah V (Branching Road) */}
                <path
                  d="M175 40 L230 220 L200 410"
                  stroke="#FFFFFF"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M340 40 L370 270 L350 410"
                  stroke="#FFFFFF"
                  strokeWidth="20"
                  strokeLinecap="round"
                />
                <path
                  d="M480 30 L500 280"
                  stroke="#FFFFFF"
                  strokeWidth="20"
                  strokeLinecap="round"
                />

                {/* Road Labels */}
                <text
                  x="245"
                  y="262"
                  fontSize="11"
                  fontWeight="bold"
                  fill="#4D6277"
                  transform="rotate(13 245 262)"
                  letterSpacing="0.5"
                >
                  Jalan Margomulyo
                </text>
                <text
                  x="430"
                  y="125"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#4D6277"
                  transform="rotate(-15 430 125)"
                  letterSpacing="0.5"
                >
                  Jalan Margomulyo Indah V
                </text>
                <text
                  x="30"
                  y="135"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#788D9E"
                >
                  Surabaya Barat
                </text>

                {/* Central Pin Marker (Emerald Circle with Soft Glow - Exact Screenshot Representation) */}
                <g transform="translate(305, 175)">
                  {/* Subtle Glow Ring */}
                  <circle cx="0" cy="0" r="32" fill="#0F8259" fillOpacity="0.18" />
                  <circle cx="0" cy="0" r="24" fill="#0F8259" fillOpacity="0.3" />
                  {/* Outer White Border Ring */}
                  <circle cx="0" cy="0" r="18" fill="white" />
                  {/* Inner Emerald Pin Circle */}
                  <circle cx="0" cy="0" r="15" fill="#0F8259" />
                  {/* White Location Icon */}
                  <path
                    d="M0 -7 C-3.5 -7 -6 -4.5 -6 -1 C-6 3.5 0 7 0 7 C0 7 6 3.5 6 -1 C6 -4.5 3.5 -7 0 -7 Z"
                    fill="white"
                  />
                  <circle cx="0" cy="-1.5" r="1.8" fill="#0F8259" />
                </g>
              </svg>

              {/* FLOATING PILL CARD DI BAGIAN BAWAH PETA (Sesuai Referensi Lampiran) */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6">
                <a
                  href="https://maps.google.com/?q=Jl.+Margomulyo+Indah+V+No.1+Blok+C+Surabaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 sm:gap-4 rounded-full bg-white/95 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-4 shadow-xl shadow-slate-950/20 border border-slate-200/90 transition-all duration-300 hover:bg-white hover:scale-[1.01] hover:shadow-2xl group"
                >
                  {/* Ikon Lingkaran Kiri */}
                  <div className="size-10 sm:size-12 rounded-full bg-[#EAF5F0] text-[#0F8259] flex items-center justify-center shrink-0 border border-[#CDE7DC] shadow-xs group-hover:bg-[#0F8259] group-hover:text-white transition-colors">
                    <MapPin className="size-5" />
                  </div>

                  {/* Teks Alamat Tengah */}
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#0F8259] block">
                      <Text>{{ id: "TITIK PENJEMPUTAN & WORKSHOP", en: "PICKUP POINT & WORKSHOP" }}</Text>
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      Jl. Margomulyo Indah V No.1 Blok C, Surabaya
                    </p>
                  </div>

                  {/* Panah Kanan */}
                  <div className="size-8 sm:size-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ChevronRight className="size-5" />
                  </div>
                </a>
              </div>
            </div>

            {/* Informasi Akses & Jam Kunjungan */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5 space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="size-4.5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-slate-900 block">
                    <Text>{{ id: "Jam Operasional Workshop", en: "Workshop Operating Hours" }}</Text>
                  </span>
                  <span className="text-slate-600">
                    <Text>
                      {{
                        id: "Senin – Sabtu: 08.00 – 16.30 WIB (Minggu & Hari Libur Nasional Tutup)",
                        en: "Monday – Saturday: 08:00 – 16:30 WIB (Closed Sundays & Public Holidays)",
                      }}
                    </Text>
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-200/60 pt-3 flex items-start gap-3">
                <ShieldCheck className="size-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 leading-relaxed">
                  <Text>
                    {{
                      id: "Kunjungan langsung untuk inspeksi fisik bodi cool box, simulasi flywheel, atau pengujian radar sonar dipersilakan dengan konfirmasi terlebih dahulu melalui WhatsApp.",
                      en: "On-site visits to inspect cool box hardware, test flywheel power, or observe sonar demos are welcome with prior WhatsApp confirmation.",
                    }}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FAQ SECTION: RAPI, KOMPREHENSIF, & INTERAKTIF
      ======================================================== */}
      <section className="border-t-2 border-slate-200/90 bg-slate-50/70 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          {/* Header FAQ */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="size-3.5 text-blue-600" />
              <Text>{{ id: "Pertanyaan yang Sering Diajukan", en: "Frequently Asked Questions" }}</Text>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              <Text>{{ id: "Informasi Lengkap Seputar Unibox", en: "Comprehensive Information on Unibox" }}</Text>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              <Text>
                {{
                  id: "Pelajari lebih lanjut mengenai kapasitas pendingin, mekanisme flywheel, sistem navigasi sonar, dan kemitraan nelayan.",
                  en: "Learn more about cooling capacity, flywheel power mechanisms, sonar navigation, and fisher partnership workflows.",
                }}
              </Text>
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white border-blue-300 shadow-md shadow-blue-950/5 ring-1 ring-blue-100"
                      : "bg-white/80 border-slate-200/90 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  >
                    <span className="font-display text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {faq.question[language]}
                    </span>
                    <span
                      className={`size-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-blue-600 text-white rotate-180"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <ChevronDown className="size-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base leading-relaxed text-slate-600 border-t border-slate-100 pt-4">
                      <p>{faq.answer[language]}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom FAQ Help Card */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-900 to-[#0070ba] p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold">
                <Text>{{ id: "Masih Memiliki Pertanyaan Lain?", en: "Still Have Questions?" }}</Text>
              </h3>
              <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-md">
                <Text>
                  {{
                    id: "Tim teknis Unibox siap membantu memetakan kebutuhan spesifik kapal perahu dan koperasi Anda.",
                    en: "Unibox technical engineers are ready to map the specific needs of your boats and cooperatives.",
                  }}
                </Text>
              </p>
            </div>

            <a
              href="https://wa.me/6281280921122"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white text-blue-900 hover:bg-sky-50 px-6 py-3 text-xs sm:text-sm font-extrabold shadow-md transition-all shrink-0 hover:scale-105"
            >
              <MessageCircle className="size-4 text-emerald-600" />
              <span>
                <Text>{{ id: "Hubungi via WhatsApp", en: "Contact via WhatsApp" }}</Text>
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
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
  Warehouse,
} from "lucide-react";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";
import {
  WavePattern,
  ScalePattern,
  WaveTilePattern,
  DotGridPattern,
  WaveDivider,
} from "@/components/ui/marine-patterns";

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

const surabayaOffice = {
  badge: { id: "Pusat Perakitan & Layanan", en: "Assembly & Marine Service Hub" },
  title: { id: "Surabaya Marine Hub", en: "Surabaya Marine Hub" },
  address: {
    id: "Jl. Bendul Merisi Selatan VII No.57, Bendul Merisi, Kec. Wonocolo, Surabaya, Jawa Timur",
    en: "Jl. Bendul Merisi Selatan VII No.57, Bendul Merisi, Kec. Wonocolo, Surabaya, Jawa Timur",
  },
  hours: { id: "Senin – Sabtu: 08.00 – 16.30 WIB", en: "Monday – Saturday: 08:00 – 16:30 WIB" },
  phone: "+62 31 7490 8820",
  mapsUrl: "https://maps.app.goo.gl/WPcAtf1UWT4jv8HC8",
};

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
      id: "Anda dapat langsung menghubungi tim Unibox melalui chat WhatsApp resmi (+62 812-8092-1122), telepon kantor Surabaya (+62 31 7490 8820), atau berkunjung langsung ke fasilitas kami di Surabaya Marine Hub Perak Timur. Tim teknis kami siap memberikan konsultasi konfigurasi mesin dan demonstrasi unit.",
      en: "You can reach the Unibox team directly via our official WhatsApp chat (+62 812-8092-1122), Surabaya office line (+62 31 7490 8820), or by visiting our Surabaya Marine Hub facility in Perak Timur. Our technical team is ready to provide engine configuration advice and product demos.",
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
      {/* ========================================================
          TOP SECTION: RICH OCEAN BLUE HEADER — Multi-layer ornaments
      ======================================================== */}
      <section className="relative pt-28 pb-0 sm:pt-32 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #003d7a 0%, #0070ba 45%, #0096e0 100%)",
        }}
      >
        {/* === Layer 1: Radial glow center === */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 60% 30%, rgba(56,182,255,0.25) 0%, transparent 70%)",
          }}
        />
        {/* === Layer 2: Dot grid texture === */}
        <div className="absolute top-10 right-10 opacity-20 pointer-events-none hidden lg:block">
          <DotGridPattern className="text-sky-200" />
        </div>
        {/* === Layer 3: Wave tile texture === */}
        <div className="absolute left-0 bottom-12 opacity-[0.08] pointer-events-none w-full overflow-hidden">
          <WaveTilePattern className="text-white w-full" />
        </div>
        {/* === Layer 4: Scale ornament left === */}
        {/* <div className="absolute -left-1 top-20 opacity-70 pointer-events-none hidden lg:block scale-[2] origin-top-left">
          <ScalePattern className="text-amber-400" />
        </div> */}
        <div className="absolute -left-1 top-20 opacity-20 pointer-events-none hidden lg:block scale-[2] origin-top-left">
          <ScalePattern className="text-sky-300" />
        </div>
        {/* === Layer 5: Wave stroke ornament right === */}
        <div className="absolute right-6 top-28 opacity-30 pointer-events-none hidden md:block scale-[3] origin-top-right">
          <WavePattern className="text-sky-200" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 pb-20 sm:pb-28">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-sky-100/80 mb-6 sm:mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              <Text>{{ id: "Beranda", en: "Home" }}</Text>
            </Link>
            <ChevronRight className="size-3.5 text-sky-300" />
            <span className="font-semibold text-white">
              <Text>{{ id: "Kontak", en: "Contact" }}</Text>
            </span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-5 w-1 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
              <span className="text-xs font-bold tracking-widest uppercase text-amber-300">
                <Text>{{ id: "Kontak", en: "Contact" }}</Text>
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              <Text>
                {{
                  id: "Pusat Informasi Unibox",
                  en: "Unibox Information Hub",
                }}
              </Text>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-sky-100/90 leading-relaxed font-normal max-w-2xl">
              <Text>
                {{
                  id: "Hubungi tim teknis kami secara langsung untuk konsultasi konfigurasi mesin kapal, jadwal demonstrasi pelabuhan, atau kunjungi fasilitas perakitan kami di Surabaya.",
                  en: "Contact our technical engineers directly for vessel engine configuration, harbor demonstration schedules, or visit our assembly facilities at Surabaya.",
                }}
              </Text>
            </p>
          </div>
        </div>

        {/* === Wave divider === */}
        <div className="relative w-full -mb-px">
          <WaveDivider className="w-full h-12 sm:h-16 text-white" />
        </div>
      </section>

      {/* ========================================================
          MAIN SECTION: 2 COLUMNS
          Left: Direct Contact Channels (WhatsApp, Phone, Email, Social)
          Right: Address & Modern Vector Map (Matches Landing Page)
      ======================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* SISI KIRI: INFORMASI KONTAK LENGKAP */}
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

            {/* Kartu Kontak 1: WhatsApp Resmi */}
            <div className="rounded-2xl bg-emerald-50/80 border border-emerald-200/90 p-4 sm:p-6 shadow-xs">
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="size-11 sm:size-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                  <MessageCircle className="size-5 sm:size-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mt-1">
                    <a
                      href="https://wa.me/6281280921122"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-emerald-600 text-white text-xs sm:text-sm font-bold px-5 py-2.5 shadow-sm"
                    >
                      <span>
                        <Text>{{ id: "Chat WhatsApp Sekarang", en: "Chat on WhatsApp" }}</Text>
                      </span>
                    </a>
                  </div>
                  <p className="mt-4 text-xs text-slate-600 leading-relaxed">
                    <Text>
                      {{
                        id: "Konsultasi teknis cepat, konfirmasi kunjungan, dan informasi unit.",
                        en: "Fast technical inquiries, visit bookings, and unit information.",
                      }}
                    </Text>
                  </p>
                </div>
              </div>
            </div>

            {/* Kartu Kontak 2: Telepon Kantor & Email */}
            <div className="rounded-2xl bg-slate-50/90 border border-slate-200/90 p-4 sm:p-6 space-y-4 shadow-xs">
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

              {/* Email */}
              <div className="border-t border-slate-200/60 pt-4 flex items-start gap-4">
                <div className="size-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                  <Mail className="size-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <Text>{{ id: "Surat Elektronik (Email)", en: "Official Email" }}</Text>
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    halo@unibox.id · surabaya@unibox.id
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
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
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
                      className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-700 border border-slate-200 shadow-xs"
                    >
                      <Icon className="size-4.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SISI KANAN: CARD ALAMAT & PETA SESUAI LANDING PAGE */}
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
                  src={`https://maps.google.com/maps?q=${encodeURIComponent('UNIBOX SURABAYA')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
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

      {/* ========================================================
          FAQ SECTION: RAPI, KOMPREHENSIF, TANPA HOVER JUMPY
      ======================================================== */}
      <section className="border-t border-slate-200/90 bg-slate-50/70 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          {/* Header FAQ */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="size-3.5 text-blue-600" />
              <Text>{{ id: "Pertanyaan yang Sering Diajukan", en: "Frequently Asked Questions" }}</Text>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              <Text>{{ id: "Informasi Lengkap Seputar Unibox", en: "Comprehensive Information on Unibox" }}</Text>
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <Text>
                {{
                  id: "Pelajari lebih lanjut mengenai kapasitas pendingin, mekanisme flywheel, sistem navigasi sonar, dan kemitraan nelayan.",
                  en: "Learn more about cooling capacity, flywheel power mechanisms, sonar navigation, and fisher partnership workflows.",
                }}
              </Text>
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-colors ${isOpen
                    ? "bg-white border-blue-300 shadow-md shadow-blue-950/5 ring-1 ring-blue-100"
                    : "bg-white border-slate-200/90 shadow-xs"
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between gap-4 p-4 sm:p-6 text-left cursor-pointer"
                  >
                    <span className="font-display text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {faq.question[language]}
                    </span>
                    <span
                      className={`size-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen
                        ? "bg-blue-600 text-white rotate-180"
                        : "bg-slate-100 text-slate-600"
                        }`}
                    >
                      <ChevronDown className="size-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base leading-relaxed text-slate-600 border-t border-slate-100 pt-4">
                      <p>{faq.answer[language]}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom FAQ Help Card */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#092644] to-[#0d3b68] p-5 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold">
                <Text>{{ id: "Masih Memiliki Pertanyaan Lain?", en: "Still Have Questions?" }}</Text>
              </h3>
              <p className="text-xs sm:text-sm text-sky-100/90 mt-1 max-w-md">
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
              className="inline-flex items-center gap-2 rounded-full bg-white text-blue-900 px-6 py-3 text-xs sm:text-sm font-extrabold shadow-md shrink-0"
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

"use client";

import { useState } from "react";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/page-intro";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";

const faqs = [
  {
    id: "Siapa yang dapat bermitra dengan Unibox?",
    en: "Who can partner with Unibox?",
    answerId:
      "Nelayan, koperasi, pemilik kapal, pengelola gudang, dan pelaku industri perikanan.",
    answerEn:
      "Fishers, cooperatives, vessel owners, warehouse operators, and fisheries businesses.",
  },
  {
    id: "Apakah sistem dapat disesuaikan?",
    en: "Can the system be customized?",
    answerId:
      "Ya. Konfigurasi ditentukan berdasarkan kebutuhan, kapasitas, lokasi, dan sumber energi.",
    answerEn:
      "Yes. Configuration is based on needs, capacity, location, and energy source.",
  },
  {
    id: "Apakah tersedia dukungan setelah instalasi?",
    en: "Is support available after installation?",
    answerId:
      "Rancangan layanan mencakup panduan instalasi, pelatihan, dan dukungan pemeliharaan.",
    answerEn:
      "The service plan includes installation guidance, training, and maintenance support.",
  },
];

const contactInfo = [
  { icon: Mail, label: "Email resmi segera tersedia" },
  { icon: Phone, label: "Nomor telepon segera tersedia" },
  { icon: MapPin, label: "Alamat kantor segera tersedia" },
];

export function ContactContent() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(0);
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageIntro
        eyebrow={{ id: "Kontak", en: "Contact" }}
        title={{
          id: "Mari diskusikan kebutuhan rantai dingin Anda",
          en: "Let's discuss your cold-chain needs",
        }}
        description={{
          id: "Ceritakan lokasi, kapasitas, dan tantangan operasional Anda. Tim Unibox akan membantu memetakan langkah berikutnya.",
          en: "Tell us about your location, capacity, and operating challenges. The Unibox team will help map the next step.",
        }}
      />

      {/* Form + Company Info */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-12 lg:px-8">
        {/* Company Info */}
        <div className="lg:col-span-5">
          <h2 className="font-display text-3xl font-semibold">
            <Text>{{ id: "Informasi perusahaan", en: "Company information" }}</Text>
          </h2>
          <p className="mt-4 max-w-md leading-7 text-muted-foreground">
            <Text>
              {{
                id: "Detail resmi berikut masih menunggu konfirmasi dari Unibox.",
                en: "The official details below are pending confirmation from Unibox.",
              }}
            </Text>
          </p>
          <div className="mt-8 space-y-5">
            {contactInfo.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-md bg-primary/10 text-primary">
                  <Icon />
                </span>
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          className="rounded-lg border border-border bg-card p-7 lg:col-span-7"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">
              <Text>{{ id: "Nama", en: "Name" }}</Text>
              <input
                required
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="text-sm font-medium">
              Email
              <input
                type="email"
                required
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              WhatsApp
              <input
                type="tel"
                placeholder="+62"
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              <Text>{{ id: "Kebutuhan Anda", en: "Your needs" }}</Text>
              <textarea
                required
                className="mt-2 min-h-32 w-full resize-y rounded-md border border-input bg-background p-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
          </div>
          <Button type="submit" className="mt-6 rounded-full">
            <Text>{{ id: "Kirim pertanyaan", en: "Send inquiry" }}</Text>
          </Button>
          {sent && (
            <p role="status" className="mt-4 text-sm text-primary">
              <Text>
                {{
                  id: "Terima kasih. Ini adalah pratinjau formulir; pengiriman belum diaktifkan.",
                  en: "Thank you. This is a form preview; delivery is not yet enabled.",
                }}
              </Text>
            </p>
          )}
        </form>
      </section>

      {/* FAQ Accordion */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
          <p className="section-label">FAQ</p>
          <h2 className="mt-4 font-display text-4xl font-semibold">
            <Text>
              {{
                id: "Pertanyaan yang sering diajukan",
                en: "Frequently asked questions",
              }}
            </Text>
          </h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {faqs.map((faq, i) => (
              <div key={faq.id}>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex h-auto w-full items-center justify-between gap-4 rounded-none px-0 py-5 text-left font-display text-lg font-semibold hover:bg-transparent"
                >
                  <span>{language === "id" ? faq.id : faq.en}</span>
                  <ChevronDown
                    className={`size-5 transition-transform ${open === i ? "rotate-180" : ""}`}
                  />
                </Button>
                {open === i && (
                  <p className="pb-5 leading-7 text-muted-foreground">
                    {language === "id" ? faq.answerId : faq.answerEn}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

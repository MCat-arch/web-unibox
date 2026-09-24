"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";

const partnershipSteps = [
  {
    number: "01",
    image: "/images/unibox-fishermen.jpg",
    title: { id: "Ceritakan kebutuhan", en: "Share your requirements" },
    description: {
      id: "Sampaikan lokasi, kapasitas, dan tantangan operasional Anda.",
      en: "Tell us about your site, capacity, and operational challenges.",
    },
  },
  {
    number: "02",
    image: "/images/unibox-harbor-aerial.jpg",
    title: { id: "Survei & perancangan", en: "Survey & design" },
    description: {
      id: "Tim kami memetakan kondisi lapangan dan menyusun konfigurasi.",
      en: "Our team maps field conditions and develops the configuration.",
    },
  },
  {
    number: "03",
    image: "/images/unibox-port-cold-storage.jpg",
    title: { id: "Implementasi & dukungan", en: "Implementation & support" },
    description: {
      id: "Sistem dipasang, diuji, dan didampingi hingga siap beroperasi.",
      en: "The system is installed, tested, and supported until operational.",
    },
  },
];

export function PartnershipSection() {
  const { language } = useLanguage();

  return (
    <section className="overflow-hidden bg-primary py-16 text-primary-foreground sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase text-primary-foreground/70">
              <Text>{{ id: "Keunggulan & Cara Pemesanan", en: "Key Advantages & How to Partner" }}</Text>
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight sm:text-5xl">
              <Text>
                {{
                  id: "Mulai dari kebutuhan nyata di lapangan.",
                  en: "Start with real needs in the field.",
                }}
              </Text>
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-primary-foreground/75 lg:justify-self-end lg:text-base">
            <Text>
              {{
                id: "Kesempatan kemitraan terbuka bagi nelayan, pemilik kapal, pengelola gudang, dan pelaku industri yang ingin memperkuat rantai dingin perikanan.",
                en: "Partnership opportunities are open to fishers, vessel owners, warehouse operators, and industry players strengthening the fisheries cold chain.",
              }}
            </Text>
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {partnershipSteps.map((step) => (
            <article
              key={step.number}
              className="group overflow-hidden rounded-lg border border-primary-foreground/20 bg-primary-foreground/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title[language]}
                  fill
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <span className="absolute left-4 top-4 grid size-10 place-items-center rounded-md bg-background font-display text-xs text-primary">
                  {step.number}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-display text-xl leading-tight">
                  {step.title[language]}
                </h3>
                <p className="mt-3 text-sm leading-6 text-primary-foreground/70">
                  {step.description[language]}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-primary-foreground/20 pt-8 sm:flex-row sm:items-center">
          <p className="max-w-2xl font-display text-xl leading-snug sm:text-2xl">
            <Text>
              {{
                id: "Buka percakapan pertama untuk menemukan konfigurasi yang tepat.",
                en: "Start the first conversation to find the right configuration.",
              }}
            </Text>
          </p>
          <Button
            asChild
            size="lg"
            className="shrink-0 bg-white text-blue-900 hover:bg-blue-50 font-bold shadow-lg shadow-blue-950/20"
          >
            <Link href="/contact">
              <Text>{{ id: "Buka kemitraan", en: "Start a partnership" }}</Text>
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

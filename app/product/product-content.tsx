"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/section-heading";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";

const gallery = [
  { src: "/images/unibox-product-detail.jpg", alt: "Interior ruang penyimpanan dingin" },
  { src: "/images/unibox-port-cold-storage.jpg", alt: "Unit penyimpanan di pelabuhan" },
  { src: "/images/unibox-fishermen.jpg", alt: "Penanganan hasil tangkapan" },
];

const specs = [
  { id: "Panel insulasi untuk lingkungan pesisir", en: "Insulation panels for coastal environments" },
  { id: "Pengaturan suhu sesuai produk", en: "Product-specific temperature control" },
  { id: "Tata letak yang mendukung alur kerja", en: "Layout supporting workflow" },
  { id: "Pilihan sistem monitoring", en: "Monitoring system options" },
  { id: "Dukungan instalasi dan pemeliharaan", en: "Installation and maintenance support" },
];

const orderingSteps = [
  { id: "Konsultasi", en: "Consultation" },
  { id: "Survei & desain", en: "Survey & design" },
  { id: "Produksi & instalasi", en: "Production & installation" },
  { id: "Pelatihan & dukungan", en: "Training & support" },
];

export function ProductContent() {
  const [image, setImage] = useState(0);
  const { language } = useLanguage();
  const current = gallery[image] ?? gallery[0];

  return (
    <>
      <PageIntro
        eyebrow={{ id: "Produk", en: "Products" }}
        title={{
          id: "Sistem cold-chain yang mengikuti kebutuhan operasional",
          en: "Cold-chain systems shaped around operations",
        }}
        description={{
          id: "Konfigurasi modular untuk penyimpanan, pendinginan, dan penanganan hasil laut di kapal, dermaga, maupun gudang.",
          en: "Modular configurations for seafood storage, cooling, and handling aboard vessels, dockside, or in warehouses.",
        }}
      />

      {/* Gallery + Specs */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-lg bg-card">
            <div className="relative aspect-[4/3] w-full">
              {current && (
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                />
              )}
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setImage((image - 1 + gallery.length) % gallery.length)}
                aria-label="Previous image"
              >
                <ChevronLeft />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setImage((image + 1) % gallery.length)}
                aria-label="Next image"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {image + 1} / {gallery.length} · {current?.alt}
          </p>
        </div>

        <div className="lg:col-span-5">
          <p className="section-label">Unibox Modular System</p>
          <h2 className="mt-4 font-display text-4xl font-semibold">
            <Text>
              {{
                id: "Dirancang sebagai satu alur, bukan peralatan terpisah",
                en: "Designed as one workflow, not separate equipment",
              }}
            </Text>
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            <Text>
              {{
                id: "Konfigurasi akhir disesuaikan setelah survei kebutuhan, lokasi, kapasitas, dan sumber energi.",
                en: "The final configuration is tailored after assessing needs, site, capacity, and energy source.",
              }}
            </Text>
          </p>
          <ul className="mt-7 space-y-4">
            {specs.map((spec) => (
              <li key={spec.id} className="flex gap-3">
                <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>
                  <Text>{spec}</Text>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">
            <Text>
              {{
                id: "Spesifikasi teknis final tersedia melalui konsultasi.",
                en: "Final technical specifications are available through consultation.",
              }}
            </Text>
          </p>
        </div>
      </section>

      {/* Ordering Steps */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow={{ id: "Cara pemesanan", en: "How to order" }}
            title={{
              id: "Empat tahap menuju sistem yang siap bekerja",
              en: "Four stages to an operational system",
            }}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {orderingSteps.map((step, i) => (
              <div key={step.id} className="border-t-2 border-primary pt-5">
                <p className="font-display text-sm text-primary">0{i + 1}</p>
                <h3 className="mt-3 font-display text-xl font-semibold">
                  <Text>{step}</Text>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-6 rounded-lg bg-navy p-8 text-ice sm:flex-row sm:items-center sm:p-12">
          <div>
            <h2 className="font-display text-3xl font-semibold">
              <Text>{{ id: "Punya kebutuhan khusus?", en: "Have a specific requirement?" }}</Text>
            </h2>
            <p className="mt-3 text-ice/70">
              <Text>
                {{
                  id: "Mari rancang konfigurasi yang sesuai dengan operasi Anda.",
                  en: "Let's design a configuration that fits your operation.",
                }}
              </Text>
            </p>
          </div>
          <Button
            asChild
            className="shrink-0 rounded-full bg-ice text-navy hover:bg-ice/90"
          >
            <Link href="/contact">
              <Text>{{ id: "Mulai konsultasi", en: "Start a consultation" }}</Text>
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

"use client";

import Image from "next/image";
import { PageIntro } from "@/components/page-intro";
import { SectionHeading } from "@/components/section-heading";
import { Text } from "@/components/text";

export function AboutContent() {
  return (
    <>
      <PageIntro
        eyebrow={{ id: "Tentang Unibox", en: "About Unibox" }}
        title={{
          id: "Teknologi yang memperkuat rantai nilai perikanan",
          en: "Technology strengthening the fisheries value chain",
        }}
        description={{
          id: "Kami merancang solusi penyimpanan ikan yang mempertimbangkan mutu hasil laut, efisiensi operasional, dan kondisi nyata di pesisir.",
          en: "We design fish storage solutions around seafood quality, operating efficiency, and real coastal conditions.",
        }}
      />

      {/* Overview Section */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src="/images/unibox-harbor-aerial.jpg"
            alt="Pelabuhan perikanan Indonesia"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col justify-center">
          <SectionHeading
            eyebrow={{ id: "Gambaran umum", en: "Overview" }}
            title={{
              id: "Dari kebutuhan lapangan menjadi sistem yang tepat guna",
              en: "Turning field needs into fit-for-purpose systems",
            }}
          />
          <p className="mt-6 leading-8 text-muted-foreground">
            <Text>
              {{
                id: "Unibox hadir sebagai mitra teknologi bagi nelayan, pemilik kapal, pengelola gudang, dan pelaku industri. Setiap proyek dimulai dengan memahami volume, lokasi, energi, serta alur distribusi.",
                en: "Unibox works as a technology partner for fishers, vessel owners, warehouse operators, and industry. Every project begins by understanding volume, location, energy, and distribution flow.",
              }}
            </Text>
          </p>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-navy text-ice">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionHeading
            eyebrow={{ id: "Perbandingan", en: "Comparison" }}
            title={{
              id: "Perubahan yang ingin diwujudkan",
              en: "The change we aim to create",
            }}
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg bg-ice/15 md:grid-cols-2">
            <div className="bg-navy p-8">
              <p className="text-xs font-semibold uppercase text-coral">
                <Text>{{ id: "Tanpa sistem memadai", en: "Without adequate systems" }}</Text>
              </p>
              <ul className="mt-5 space-y-4 text-ice/70">
                <li>
                  — <Text>{{ id: "Mutu lebih sulit dipertahankan", en: "Quality is harder to maintain" }}</Text>
                </li>
                <li>
                  — <Text>{{ id: "Penanganan bergantung proses manual", en: "Handling relies on manual processes" }}</Text>
                </li>
                <li>
                  — <Text>{{ id: "Risiko kehilangan nilai lebih tinggi", en: "Higher risk of value loss" }}</Text>
                </li>
              </ul>
            </div>
            <div className="bg-navy p-8">
              <p className="text-xs font-semibold uppercase text-brand-soft">
                <Text>{{ id: "Dengan Unibox", en: "With Unibox" }}</Text>
              </p>
              <ul className="mt-5 space-y-4">
                <li>
                  + <Text>{{ id: "Suhu dan alur lebih terkontrol", en: "Better controlled temperature and flow" }}</Text>
                </li>
                <li>
                  + <Text>{{ id: "Kapasitas disesuaikan kebutuhan", en: "Capacity tailored to needs" }}</Text>
                </li>
                <li>
                  + <Text>{{ id: "Dukungan teknis berkelanjutan", en: "Ongoing technical support" }}</Text>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-5 text-xs text-ice/50">
            <Text>
              {{
                id: "Perbandingan bersifat kualitatif; data kuantitatif menunggu verifikasi Unibox.",
                en: "Comparison is qualitative; quantitative data awaits Unibox verification.",
              }}
            </Text>
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeading
          eyebrow={{ id: "Manfaat", en: "Benefits" }}
          title={{ id: "Nilai untuk setiap bagian ekosistem", en: "Value across the ecosystem" }}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { id: "Mutu hasil laut lebih konsisten", en: "More consistent seafood quality" },
            { id: "Operasional lebih tertata", en: "Better organized operations" },
            { id: "Peluang pasar lebih luas", en: "Broader market opportunities" },
          ].map((benefit, i) => (
            <div key={benefit.id} className="rounded-lg border border-border bg-card p-7">
              <p className="font-display text-3xl font-semibold text-primary">0{i + 1}</p>
              <h3 className="mt-5 font-display text-xl font-semibold">
                <Text>{benefit}</Text>
              </h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

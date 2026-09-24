"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";

const latestNews = [
  {
    image: "/images/unibox-port-cold-storage.jpg",
    category: { id: "Proyek terbaru", en: "Latest project" },
    title: {
      id: "Menjaga mutu ikan sejak proses pendaratan",
      en: "Protecting fish quality from the moment it lands",
    },
  },
  {
    image: "/images/unibox-harbor-aerial.jpg",
    category: { id: "Agenda berikutnya", en: "Next agenda" },
    title: {
      id: "Kolaborasi untuk rantai dingin pesisir",
      en: "Collaboration for the coastal cold chain",
    },
  },
];

export function NewsPreviewSection() {
  const { language } = useLanguage();

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="section-label">
            <Text>{{ id: "Berita terbaru", en: "Latest news" }}</Text>
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy sm:text-5xl">
            <Text>{{ id: "Tetap terinformasi", en: "Stay informed" }}</Text>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            <Text>
              {{
                id: "Ikuti kabar proyek, wawasan operasional, dan perkembangan terbaru dari Unibox.",
                en: "Follow project updates, operational insights, and the latest developments from Unibox.",
              }}
            </Text>
          </p>
        </div>
        <p className="mt-5 text-center text-xs text-muted-foreground">
          <Text>
            {{
              id: "Contoh konten — menunggu materi resmi",
              en: "Sample content — awaiting official materials",
            }}
          </Text>
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {latestNews.map((article) => (
            <article key={article.title.id}>
              <p className="mb-4 font-display text-lg text-navy">
                {article.category[language]}
              </p>
              <div className="flex min-h-32 items-center gap-5 rounded-lg bg-navy p-4 text-ice sm:p-5">
                <div className="relative aspect-[4/3] w-28 shrink-0 sm:w-36">
                  <Image
                    src={article.image}
                    alt={article.title[language]}
                    fill
                    loading="lazy"
                    className="rounded-md object-cover"
                    sizes="144px"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase text-brand-soft">
                    <Text>{{ id: "Contoh artikel", en: "Sample article" }}</Text>
                  </p>
                  <h3 className="mt-2 font-display text-base leading-snug sm:text-lg">
                    {article.title[language]}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/news">
              <Text>{{ id: "Lihat semua berita", en: "View all news" }}</Text>
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

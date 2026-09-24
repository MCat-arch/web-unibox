"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Text } from "@/components/text";
import { useLanguage } from "@/context/language-context";

const articles = [
  {
    img: "/images/unibox-harbor-aerial.jpg",
    title: { id: "Menjaga mutu ikan sejak proses pendaratan", en: "Protecting fish quality from the moment it lands" },
    cat: { id: "Rantai dingin", en: "Cold chain" },
    featured: true,
  },
  {
    img: "/images/unibox-fishermen.jpg",
    title: { id: "Teknologi sebagai penguat ekonomi pesisir", en: "Technology as a driver of coastal economics" },
    cat: { id: "Dampak", en: "Impact" },
    featured: false,
  },
  {
    img: "/images/unibox-harbor-aerial.jpg",
    title: { id: "Membangun alur penyimpanan yang lebih efisien", en: "Building more efficient storage workflows" },
    cat: { id: "Operasional", en: "Operations" },
    featured: false,
  },
];

export function NewsContent() {
  const { language } = useLanguage();

  return (
    <>
      <PageIntro
        eyebrow={{ id: "Berita & wawasan", en: "News & insights" }}
        title={{
          id: "Perkembangan dari laut, teknologi, dan manusia",
          en: "Stories from the sea, technology, and people",
        }}
        description={{
          id: "Ruang untuk kabar perusahaan, edukasi penanganan hasil laut, dan perkembangan industri perikanan.",
          en: "A space for company news, seafood handling education, and fisheries industry developments.",
        }}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <p className="mb-8 text-xs text-muted-foreground">
          <Text>
            {{
              id: "Seluruh artikel di halaman ini merupakan contoh tampilan hingga materi resmi tersedia.",
              en: "All articles on this page are sample content until official materials are available.",
            }}
          </Text>
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article, i) => (
            <article key={article.title.id} className={i === 0 ? "md:col-span-2" : ""}>
              <div
                className={
                  i === 0
                    ? "grid overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-2"
                    : "overflow-hidden rounded-lg border border-border bg-card"
                }
              >
                <div className={`relative ${i === 0 ? "aspect-[16/10] h-full" : "aspect-[16/10]"}`}>
                  <Image
                    src={article.img}
                    alt=""
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                  />
                </div>
                <div className="p-7">
                  <p className="text-xs font-semibold uppercase text-primary">
                    {article.cat[language]} ·{" "}
                    <Text>{{ id: "Contoh konten", en: "Sample content" }}</Text>
                  </p>
                  <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                    {article.title[language]}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    <Text>
                      {{
                        id: "Ringkasan artikel akan berisi informasi resmi dan relevan dari Unibox.",
                        en: "The article summary will contain official, relevant information from Unibox.",
                      }}
                    </Text>
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    <Text>{{ id: "Segera hadir", en: "Coming soon" }}</Text>
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

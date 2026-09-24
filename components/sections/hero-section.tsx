"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/text";

const slides = [
  {
    src: "/images/unibox-fishermen.jpg",
    alt: { id: "Nelayan dan perahu perikanan pesisir", en: "Fishers and coastal fishing boat" },
    headline: {
      id: "Perusahaan perikanan terintegrasi terbesar",
      en: "The largest integrated fisheries company",
    },
    cta: { id: "Kegiatan Kami", en: "Our Activities" },
    href: "/about",
  },
  {
    src: "/images/unibox-harbor-aerial.jpg",
    alt: { id: "Pelabuhan dan ekosistem rantai dingin", en: "Harbor and cold-chain ecosystem" },
    headline: {
      id: "Menghubungkan nelayan dengan rantai dingin modern",
      en: "Connecting fishers to modern cold-chain infrastructure",
    },
    cta: { id: "Lihat Solusi", en: "Explore Solutions" },
    href: "/product",
  },
  {
    src: "/images/unibox-port-cold-storage.jpg",
    alt: { id: "Penyimpanan dingin modular pesisir", en: "Modular coastal cold storage" },
    headline: {
      id: "Menjaga kualitas hasil tangkapan laut Indonesia",
      en: "Preserving the quality of Indonesian marine catch",
    },
    cta: { id: "Hubungi Kami", en: "Contact Us" },
    href: "/contact",
  },
];

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % slides.length),
      7000
    );
    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[activeSlide] ?? slides[0];

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-end">
      {/* Background slide images */}
      {slides.map((s, index) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
          style={{ transitionProperty: "opacity, transform" }}
        >
          <Image
            src={s.src}
            alt={s.alt.id}
            fill
            priority={index === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Atmospheric overlay: slight top dark for navbar readability, gradient bottom for bold white text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/40" />

      {/* Main hero content — positioned at bottom left matching Aruna reference */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-16 pt-36">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* Left: Big clean headline + Orange rounded pill CTA */}
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12] drop-shadow-md">
              <Text>{slide.headline}</Text>
            </h1>
            <div className="mt-8 flex items-center gap-4">
              <Button
                asChild
                className="rounded-full bg-[#f15a24] text-white hover:bg-[#d94e1e] font-semibold px-8 py-6 text-base sm:text-lg shadow-xl shadow-orange-950/30 transition-transform active:scale-95"
              >
                <Link href={slide.href}>
                  <Text>{slide.cta}</Text>
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Minimalist horizontal slide indicators matching Aruna */}
          <div className="flex items-center gap-3 self-start lg:self-end pb-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === activeSlide
                    ? "w-12 bg-white"
                    : "w-6 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

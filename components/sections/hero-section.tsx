"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/text";

interface SlideItem {
  type: "video" | "image";
  src: string;
  poster?: string;
  alt: { id: string; en: string };
  headline: { id: string; en: string };
  cta: { id: string; en: string };
  href: string;
}

// 3 Slides di Hero (termasuk video)
const slides: SlideItem[] = [
  {
    type: "video",
    src: "/videos/laut.mp4",
    poster: "/videos/laut_poster.jpg",
    alt: { id: "Video ekosistem laut dan operasional perikanan Unibox", en: "Marine ecosystem and Unibox fisheries video" },
    headline: {
      id: "Inovasi Alat Pendingin Ikan Otomatis di Perahu",
      en: "Innovation of Automatic Fish Cooling Technology on Boats",
    },
    cta: { id: "Tentang Produk", en: "About Products" },
    href: "/product",
  },
  {
    type: "image",
    src: "/images/unibox-fishermen.jpg",
    alt: { id: "Nelayan dan perahu perikanan pesisir", en: "Fishers and coastal fishing boat" },
    headline: {
      id: "Memberdayakan Nelayan Pesisir dengan Teknologi",
      en: "Empowering Coastal Fishers with Technology",
    },
    cta: { id: "Kegiatan Kami", en: "Our Activities" },
    href: "/activities",
  },
  {
    type: "image",
    src: "/images/unibox-harbor-aerial.jpg",
    alt: { id: "Pelabuhan dan ekosistem rantai dingin", en: "Harbor and cold-chain ecosystem" },
    headline: {
      id: "Menghasilkan Listrik Mandiri dari Putaran Mesin Perahu",
      en: "Generating Electricity Independently from Boat Engine Rotation",
    },
    cta: { id: "Eksplorasi", en: "Explore" },
    href: "/product",
  },
];

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-play, durasi video 10 detik, dan slide looping
  useEffect(() => {
    // Slide 0: Video diputar selama 10 detik
    if (activeSlide === 0) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // Gracefully handle jika browser membatasi autoplay
        });
      }

      // Durasi video diset tepat 10 detik
      const videoTimer = window.setTimeout(() => {
        setActiveSlide(1);
      }, 10000);

      return () => window.clearTimeout(videoTimer);
    }

    // Slide 1 & 2: Foto berdurasi 7 detik
    const imageTimer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 7000);

    return () => window.clearTimeout(imageTimer);
  }, [activeSlide]);

  const handleVideoEnded = () => {
    // Jika video selesai sebelum 10 detik, langsung pindah ke slide berikutnya
    setActiveSlide(1);
  };

  const slide = slides[activeSlide] ?? slides[0];

  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-end"
    >
      {/* Background Slides: Video or Image */}
      {slides.map((s, index) => {
        const isActive = index === activeSlide;

        if (s.type === "video") {
          return (
            <div
              key={s.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
                }`}
            >
              <video
                ref={videoRef}
                src={s.src}
                poster={s.poster}
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={handleVideoEnded}
                className="absolute inset-0 size-full min-w-full min-h-full object-cover object-center pointer-events-none"
              />
            </div>
          );
        }

        return (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 scale-100 z-0" : "opacity-0 scale-105 -z-10 pointer-events-none"
              }`}
            style={{ transitionProperty: "opacity, transform" }}
          >
            <Image
              src={s.src}
              alt={s.alt.id}
              fill
              priority={index === 1}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        );
      })}

      {/* Atmospheric overlay: kontras konsisten untuk navbar putih & teks headline */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/45 z-[1]" />

      {/* Main hero content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 pt-36">
        <div className="max-w-2xl">
          {/* Responsive headline */}
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.2] drop-shadow-md">
            <Text>{slide.headline}</Text>
          </h1>
          <div className="mt-7 flex items-center gap-4">
            <Button
              asChild
              className="rounded-full bg-[#0f3d6b] hover:bg-[#0a2847] text-white font-semibold px-8 py-6 text-sm sm:text-base shadow-xl shadow-blue-950/50 border border-blue-400/25 transition-colors"
            >
              <Link href={slide.href}>
                <Text>{slide.cta}</Text>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Center Slide Indicator: 3 Dots */}
      <div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2.5"
        aria-label="Slide indicators"
      >
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveSlide(idx)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${idx === activeSlide
              ? "size-2 bg-white shadow-sm ring-2 ring-white/30"
              : "size-1.5 bg-white/40 hover:bg-white/70"
              }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

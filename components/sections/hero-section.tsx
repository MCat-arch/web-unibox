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

// 3 Slides di Hero (Slide 1 & Slide 3 video tanpa suara, Slide 2 foto otentik perahu)
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
    src: "/images/assets_kapal.jpeg",
    alt: { id: "Kapal armada nelayan terintegrasi teknologi pendingin Unibox", en: "Fishermen vessel fleet integrated with Unibox cooling technology" },
    headline: {
      id: "Memberdayakan Nelayan Pesisir dengan Teknologi",
      en: "Empowering Coastal Fishers with Technology",
    },
    cta: { id: "Kegiatan Kami", en: "Our Activities" },
    href: "/activities",
  },
  {
    type: "video",
    src: "/videos/C7614.MP4",
    poster: "/videos/c7614_poster.jpg",
    alt: { id: "Video operasional unit pendingin Unibox di atas perahu nelayan", en: "Operational video of Unibox cooling unit aboard fishing boat" },
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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Auto-play, sinkronisasi video tanpa suara (muted), dan perputaran slide
  useEffect(() => {
    const currentSlide = slides[activeSlide];

    if (currentSlide.type === "video") {
      const vid = videoRefs.current[activeSlide];
      if (vid) {
        vid.currentTime = 0;
        vid.play().catch(() => {
          // Browser autoplay restriction fallback
        });
      }

      // Durasi pemutaran video per slide
      const duration = activeSlide === 2 ? 8000 : 10000;
      const videoTimer = window.setTimeout(() => {
        setActiveSlide((current) => (current + 1) % slides.length);
      }, duration);

      return () => window.clearTimeout(videoTimer);
    }

    // Slide gambar berdurasi 7 detik
    const imageTimer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 7000);

    return () => window.clearTimeout(imageTimer);
  }, [activeSlide]);

  const handleVideoEnded = (index: number) => {
    if (index === activeSlide) {
      setActiveSlide((current) => (current + 1) % slides.length);
    }
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
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={s.src}
                poster={s.poster}
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={() => handleVideoEnded(index)}
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 pb-16 sm:pb-20 pt-28 sm:pt-36">
        <div className="max-w-2xl">
          {/* Responsive headline */}
          <h1 className="font-display text-[1.35rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.2] drop-shadow-md">
            <Text>{slide.headline}</Text>
          </h1>
          <div className="mt-6 sm:mt-7 flex items-center gap-4">
            <Button
              asChild
              className="w-full sm:w-auto rounded-full bg-[#0f3d6b] hover:bg-[#0a2847] text-white font-semibold px-8 py-6 text-sm sm:text-base shadow-xl shadow-blue-950/50 border border-blue-400/25 transition-colors"
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

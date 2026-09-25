import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "Tentang Unibox — Inovasi Teknologi Kemaritiman untuk Nelayan Indonesia",
  description:
    "Unibox adalah inovasi teknologi kemaritiman yang dirancang untuk meningkatkan efektivitas dan produktivitas nelayan dalam mencari ikan serta menjaga kesegaran hasil tangkapan di laut.",
  openGraph: {
    title: "Tentang Unibox Indonesia",
    description:
      "Teknologi pendinginan berbasis konversi energi mesin perahu dan konservasi termal efisien untuk nelayan Indonesia.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

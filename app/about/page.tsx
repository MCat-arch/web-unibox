import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "Tentang Unibox — Teknologi untuk Perikanan",
  description: "Mengenal misi, pendekatan, dan manfaat teknologi cold-chain Unibox.",
  openGraph: {
    title: "Tentang Unibox",
    description: "Mengenal misi, pendekatan, dan manfaat teknologi cold-chain Unibox.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

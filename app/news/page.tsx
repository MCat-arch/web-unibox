import type { Metadata } from "next";
import { NewsContent } from "./news-content";

export const metadata: Metadata = {
  title: "Berita Unibox — Wawasan Perikanan",
  description: "Berita dan wawasan mengenai teknologi cold-chain dan perikanan Indonesia.",
  openGraph: {
    title: "Berita Unibox",
    description: "Wawasan mengenai teknologi cold-chain dan perikanan Indonesia.",
    type: "website",
  },
};

export default function NewsPage() {
  return <NewsContent />;
}

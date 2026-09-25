import type { Metadata } from "next";
import { NewsContent } from "./news-content";

export const metadata: Metadata = {
  title: "Event & Blog Maritim — Unibox",
  description: "Informasi jadwal kegiatan, demonstrasi lapangan terbuka, dan artikel blog teknologi pendingin maritim Unibox.",
  openGraph: {
    title: "Event & Blog Maritim — Unibox",
    description: "Informasi jadwal kegiatan, demonstrasi lapangan terbuka, dan artikel blog teknologi pendingin maritim Unibox.",
    type: "website",
  },
};

export default function NewsPage() {
  return <NewsContent />;
}

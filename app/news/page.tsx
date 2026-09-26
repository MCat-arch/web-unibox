import type { Metadata } from "next";
import { NewsContent } from "./news-content";
import { getPublicActivities } from "@/lib/activities-fetcher";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Event & Blog Maritim — Unibox",
  description: "Informasi jadwal kegiatan, demonstrasi lapangan terbuka, dan artikel blog teknologi pendingin maritim Unibox.",
  openGraph: {
    title: "Event & Blog Maritim — Unibox",
    description: "Informasi jadwal kegiatan, demonstrasi lapangan terbuka, dan artikel blog teknologi pendingin maritim Unibox.",
    type: "website",
  },
};

export default async function NewsPage() {
  const activities = await getPublicActivities();
  return <NewsContent initialActivities={activities} />;
}


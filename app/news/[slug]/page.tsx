import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { activitiesData } from "@/lib/activities-data";
import { getPublicActivityBySlug } from "@/lib/activities-fetcher";
import { ActivityDetailContent } from "./activity-detail-content";

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return activitiesData.map((activity) => ({
    slug: activity.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const activity = await getPublicActivityBySlug(slug);

  if (!activity) {
    return {
      title: "Aktivitas Tidak Ditemukan — Unibox",
    };
  }

  return {
    title: `${activity.title.id} — Unibox`,
    description: activity.summary.id,
    openGraph: {
      title: activity.title.id,
      description: activity.summary.id,
      images: [
        {
          url: activity.image,
          width: 1200,
          height: 630,
          alt: activity.title.id,
        },
      ],
      type: "article",
    },
  };
}

export default async function ActivityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const activity = await getPublicActivityBySlug(slug);

  if (!activity) {
    notFound();
  }

  return <ActivityDetailContent activity={activity} />;
}


import type { Activity, ContentSection } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ActivityItem, activitiesData } from "@/lib/activities-data";

export type LandingActivity = Pick<ActivityItem, "slug" | "image" | "date" | "title">;

type LandingActivityRecord = Pick<
  Activity,
  "slug" | "image" | "date_id" | "date_en" | "title_id" | "title_en"
>;

type ActivityWithSections = Activity & { sections: ContentSection[] };

function mapPrismaLandingActivityToItem(act: LandingActivityRecord): LandingActivity {
  return {
    slug: act.slug,
    image: act.image,
    date: { id: act.date_id, en: act.date_en },
    title: { id: act.title_id, en: act.title_en },
  };
}

function mapPrismaActivityToItem(act: ActivityWithSections): ActivityItem {
  const sections = [...act.sections]
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map((s) => ({
      heading: { id: s.heading_id, en: s.heading_en },
      body: { id: s.body_id, en: s.body_en },
    }));

  return {
    slug: act.slug,
    type: act.type as "event" | "blog",
    featured: act.featured,
    showOnLanding: act.showOnLanding ?? false,
    category: { id: act.category_id, en: act.category_en },
    title: { id: act.title_id, en: act.title_en },
    date: { id: act.date_id, en: act.date_en },
    time: act.time_id && act.time_en ? { id: act.time_id, en: act.time_en } : undefined,
    location: act.location_id && act.location_en ? { id: act.location_id, en: act.location_en } : undefined,
    status: act.status_id && act.status_en ? { id: act.status_id, en: act.status_en } : undefined,
    author: {
      name: act.authorName,
      role: { id: act.authorRole_id, en: act.authorRole_en },
    },
    image: act.image,
    summary: { id: act.summary_id, en: act.summary_en },
    content: {
      introduction: { id: act.intro_id, en: act.intro_en },
      sections,
      quote:
        act.quoteText_id && act.quoteText_en && act.quoteAuthor
          ? {
              text: { id: act.quoteText_id, en: act.quoteText_en },
              author: act.quoteAuthor,
            }
          : undefined,
    },
  };
}

// 1. Ambil seluruh aktivitas publik (fallback otomatis ke activitiesData)
export async function getPublicActivities(): Promise<ActivityItem[]> {
  try {
    const data = await prisma.activity.findMany({
      where: { isPublished: true },
      include: { sections: { orderBy: { orderIndex: "asc" } } },
      orderBy: { createdAt: "desc" },
    });

    if (!data || data.length === 0) {
      return activitiesData;
    }

    return data.map(mapPrismaActivityToItem);
  } catch {
    return activitiesData;
  }
}

// 2. Ambil 2 aktivitas untuk halaman Landing Page (prioritas: showOnLanding = true)
export async function getLandingActivities(): Promise<LandingActivity[]> {
  try {
    const landingActivities = await prisma.activity.findMany({
      where: { isPublished: true },
      select: {
        slug: true,
        image: true,
        date_id: true,
        date_en: true,
        title_id: true,
        title_en: true,
      },
      orderBy: [
        { showOnLanding: "desc" },
        { updatedAt: "desc" },
      ],
      take: 2,
    });

    if (landingActivities.length > 0) {
      return landingActivities.map(mapPrismaLandingActivityToItem);
    }

    return activitiesData.slice(0, 2);
  } catch {
    return activitiesData.slice(0, 2);
  }
}

// 2. Ambil satu aktivitas berdasarkan slug (fallback otomatis)
export async function getPublicActivityBySlug(slug: string): Promise<ActivityItem | null> {
  try {
    const data = await prisma.activity.findUnique({
      where: { slug },
      include: { sections: { orderBy: { orderIndex: "asc" } } },
    });

    if (!data || !data.isPublished) {
      return null;
    }

    return mapPrismaActivityToItem(data);
  } catch {
    return activitiesData.find((a) => a.slug === slug) || null;
  }
}

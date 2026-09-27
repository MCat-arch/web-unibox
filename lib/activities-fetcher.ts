import { prisma } from "@/lib/prisma";
import { ActivityItem, activitiesData } from "@/lib/activities-data";

function mapPrismaActivityToItem(act: any): ActivityItem {
  const sections = (act.sections || [])
    .sort((a: any, b: any) => a.orderIndex - b.orderIndex)
    .map((s: any) => ({
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
export async function getLandingActivities(): Promise<ActivityItem[]> {
  try {
    // Cari yang ditandai showOnLanding terlebih dahulu
    const landingMarked = await prisma.activity.findMany({
      where: { isPublished: true, showOnLanding: true },
      include: { sections: { orderBy: { orderIndex: "asc" } } },
      orderBy: { updatedAt: "desc" },
      take: 2,
    });

    if (landingMarked.length === 2) {
      return landingMarked.map(mapPrismaActivityToItem);
    }

    // Jika kurang dari 2, lengkapi dengan aktivitas terbaru lainnya
    const needed = 2 - landingMarked.length;
    const excludeIds = landingMarked.map((a) => a.id);

    const additional = await prisma.activity.findMany({
      where: {
        isPublished: true,
        id: { notIn: excludeIds },
      },
      include: { sections: { orderBy: { orderIndex: "asc" } } },
      orderBy: { createdAt: "desc" },
      take: needed,
    });

    const combined = [...landingMarked, ...additional];
    if (combined.length > 0) {
      return combined.map(mapPrismaActivityToItem);
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
      return activitiesData.find((a) => a.slug === slug) || null;
    }

    return mapPrismaActivityToItem(data);
  } catch {
    return activitiesData.find((a) => a.slug === slug) || null;
  }
}

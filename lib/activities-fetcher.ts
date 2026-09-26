import { getPublicSupabase } from "@/lib/supabase/client";
import { ActivityItem, activitiesData } from "@/lib/activities-data";
import { DbActivity } from "@/lib/supabase/types";

// Konversi format DbActivity (database) ke ActivityItem (UI)
function mapDbActivityToItem(db: DbActivity): ActivityItem {
  const sections = (db.sections || [])
    .sort((a, b) => a.order_index - b.order_index)
    .map((s) => ({
      heading: { id: s.heading_id, en: s.heading_en },
      body: { id: s.body_id, en: s.body_en },
    }));

  return {
    slug: db.slug,
    type: db.type,
    featured: db.featured,
    category: { id: db.category_id, en: db.category_en },
    title: { id: db.title_id, en: db.title_en },
    date: { id: db.date_id, en: db.date_en },
    time: db.time_id && db.time_en ? { id: db.time_id, en: db.time_en } : undefined,
    location: db.location_id && db.location_en ? { id: db.location_id, en: db.location_en } : undefined,
    status: db.status_id && db.status_en ? { id: db.status_id, en: db.status_en } : undefined,
    author: {
      name: db.author_name,
      role: { id: db.author_role_id, en: db.author_role_en },
    },
    image: db.image,
    summary: { id: db.summary_id, en: db.summary_en },
    content: {
      introduction: { id: db.intro_id, en: db.intro_en },
      sections,
      quote:
        db.quote_text_id && db.quote_text_en && db.quote_author
          ? {
              text: { id: db.quote_text_id, en: db.quote_text_en },
              author: db.quote_author,
            }
          : undefined,
    },
  };
}

// 1. Ambil seluruh aktivitas publik (dengan fallback aman ke activitiesData)
export async function getPublicActivities(): Promise<ActivityItem[]> {
  try {
    const supabase = getPublicSupabase();
    if (!supabase) {
      return activitiesData;
    }

    const { data, error } = await supabase
      .from("activities")
      .select("*, sections:content_sections(*)")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return activitiesData;
    }

    return (data as DbActivity[]).map(mapDbActivityToItem);
  } catch {
    return activitiesData;
  }
}

// 2. Ambil satu aktivitas berdasarkan slug (dengan fallback aman)
export async function getPublicActivityBySlug(slug: string): Promise<ActivityItem | null> {
  try {
    const supabase = getPublicSupabase();
    if (!supabase) {
      return activitiesData.find((a) => a.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from("activities")
      .select("*, sections:content_sections(*)")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error || !data) {
      return activitiesData.find((a) => a.slug === slug) || null;
    }

    return mapDbActivityToItem(data as DbActivity);
  } catch {
    return activitiesData.find((a) => a.slug === slug) || null;
  }
}

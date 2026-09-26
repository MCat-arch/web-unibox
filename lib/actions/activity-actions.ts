"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getAdminSupabase } from "@/lib/supabase/server";
import { getSession } from "@/lib/auth/session";
import { DbActivity } from "@/lib/supabase/types";
import { activitiesData } from "@/lib/activities-data";
import { hashPassword } from "@/lib/auth/password";
import { translateIdToEn } from "@/lib/utils/translate";

const sectionSchema = z.object({
  id: z.string().optional(),
  heading_id: z.string().min(1, "Judul seksi ID wajib diisi"),
  heading_en: z.string().optional(),
  body_id: z.string().min(1, "Konten seksi ID wajib diisi"),
  body_en: z.string().optional(),
  order_index: z.number().default(0),
});

const activitySchema = z.object({
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan strip (-)"),
  type: z.enum(["event", "blog"]),
  featured: z.boolean().default(false),
  category_id: z.string().min(1, "Kategori ID wajib diisi"),
  category_en: z.string().optional(),
  title_id: z.string().min(1, "Judul ID wajib diisi"),
  title_en: z.string().optional(),
  date_id: z.string().min(1, "Tanggal ID wajib diisi"),
  date_en: z.string().optional(),
  time_id: z.string().optional().nullable(),
  time_en: z.string().optional().nullable(),
  location_id: z.string().optional().nullable(),
  location_en: z.string().optional().nullable(),
  status_id: z.string().optional().nullable(),
  status_en: z.string().optional().nullable(),
  author_name: z.string().min(1, "Nama penulis wajib diisi"),
  author_role_id: z.string().min(1, "Peran penulis ID wajib diisi"),
  author_role_en: z.string().optional(),
  image: z.string().min(1, "Gambar URL wajib diisi"),
  summary_id: z.string().min(1, "Ringkasan ID wajib diisi"),
  summary_en: z.string().optional(),
  intro_id: z.string().min(1, "Pengantar ID wajib diisi"),
  intro_en: z.string().optional(),
  quote_text_id: z.string().optional().nullable(),
  quote_text_en: z.string().optional().nullable(),
  quote_author: z.string().optional().nullable(),
  outcome_id: z.string().optional().nullable(),
  outcome_en: z.string().optional().nullable(),
  participants_count: z.string().optional().nullable(),
  is_published: z.boolean().default(true),
  sections: z.array(sectionSchema).default([]),
});

export type ActivityFormInput = z.infer<typeof activitySchema>;

// Helper internal untuk memastikan semua teks terjemahan English terisi otomatis via Google Translate
async function fillTranslations(input: ActivityFormInput) {
  const [
    title_en,
    category_en,
    date_en,
    time_en,
    location_en,
    status_en,
    author_role_en,
    summary_en,
    intro_en,
    quote_text_en,
    outcome_en,
  ] = await Promise.all([
    input.title_en || translateIdToEn(input.title_id),
    input.category_en || translateIdToEn(input.category_id),
    input.date_en || translateIdToEn(input.date_id),
    input.time_en || (input.time_id ? translateIdToEn(input.time_id) : Promise.resolve(null)),
    input.location_en || (input.location_id ? translateIdToEn(input.location_id) : Promise.resolve(null)),
    input.status_en || (input.status_id ? translateIdToEn(input.status_id) : Promise.resolve(null)),
    input.author_role_en || translateIdToEn(input.author_role_id),
    input.summary_en || translateIdToEn(input.summary_id),
    input.intro_en || translateIdToEn(input.intro_id),
    input.quote_text_en || (input.quote_text_id ? translateIdToEn(input.quote_text_id) : Promise.resolve(null)),
    input.outcome_en || (input.outcome_id ? translateIdToEn(input.outcome_id) : Promise.resolve(null)),
  ]);

  const translatedSections = await Promise.all(
    input.sections.map(async (sec, idx) => ({
      heading_id: sec.heading_id,
      heading_en: sec.heading_en || (await translateIdToEn(sec.heading_id)),
      body_id: sec.body_id,
      body_en: sec.body_en || (await translateIdToEn(sec.body_id)),
      order_index: idx,
    }))
  );

  return {
    activityData: {
      slug: input.slug,
      type: input.type,
      featured: input.featured,
      category_id: input.category_id,
      category_en,
      title_id: input.title_id,
      title_en,
      date_id: input.date_id,
      date_en,
      time_id: input.time_id || null,
      time_en,
      location_id: input.location_id || null,
      location_en,
      status_id: input.status_id || null,
      status_en,
      author_name: input.author_name,
      author_role_id: input.author_role_id,
      author_role_en,
      image: input.image,
      summary_id: input.summary_id,
      summary_en,
      intro_id: input.intro_id,
      intro_en,
      quote_text_id: input.quote_text_id || null,
      quote_text_en,
      quote_author: input.quote_author || null,
      outcome_id: input.outcome_id || null,
      outcome_en,
      participants_count: input.participants_count || null,
      is_published: input.is_published,
    },
    sections: translatedSections,
  };
}

// 1. Fetch seluruh aktivitas untuk Admin
export async function getAdminActivities(): Promise<DbActivity[]> {
  const session = await getSession();
  if (!session) return [];

  const supabase = getAdminSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("activities")
    .select("*, sections:content_sections(*)")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as DbActivity[];
}

// 2. Fetch satu aktivitas berdasarkan ID untuk Edit
export async function getAdminActivityById(id: string): Promise<DbActivity | null> {
  const session = await getSession();
  if (!session) return null;

  const supabase = getAdminSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("activities")
    .select("*, sections:content_sections(*)")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as DbActivity;
}

// 3. Simpan Aktivitas Baru (Dengan Auto-Translate Google Translate)
export async function createActivityAction(payload: ActivityFormInput): Promise<{ success: boolean; message?: string; id?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, message: "Akses ditolak. Sesi Anda tidak valid." };
  }

  const validation = activitySchema.safeParse(payload);
  if (!validation.success) {
    return { success: false, message: validation.error.issues[0]?.message || "Input tidak valid" };
  }

  const supabase = getAdminSupabase();
  if (!supabase) {
    return { success: false, message: "Koneksi database belum terkonfigurasi di .env.local." };
  }

  // Proses Auto-Translate teks ID ke EN via Google Translate
  const { activityData, sections } = await fillTranslations(validation.data);

  // Insert tabel activities
  const { data: newActivity, error: activityError } = await supabase
    .from("activities")
    .insert([activityData])
    .select("id, slug")
    .single();

  if (activityError || !newActivity) {
    return { success: false, message: `Gagal menyimpan aktivitas: ${activityError?.message || "Kesalahan database"}` };
  }

  // Insert sections jika ada
  if (sections && sections.length > 0) {
    const formattedSections = sections.map((sec) => ({
      activity_id: newActivity.id,
      heading_id: sec.heading_id,
      heading_en: sec.heading_en,
      body_id: sec.body_id,
      body_en: sec.body_en,
      order_index: sec.order_index,
    }));

    await supabase.from("content_sections").insert(formattedSections);
  }

  revalidatePath("/news");
  revalidatePath(`/news/${newActivity.slug}`);
  revalidatePath("/admin/activities");

  return { success: true, id: newActivity.id };
}

// 4. Update Aktivitas Eksisting (Dengan Auto-Translate Google Translate)
export async function updateActivityAction(id: string, payload: ActivityFormInput): Promise<{ success: boolean; message?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, message: "Akses ditolak. Sesi Anda tidak valid." };
  }

  const validation = activitySchema.safeParse(payload);
  if (!validation.success) {
    return { success: false, message: validation.error.issues[0]?.message || "Input tidak valid" };
  }

  const supabase = getAdminSupabase();
  if (!supabase) {
    return { success: false, message: "Koneksi database belum terkonfigurasi di .env.local." };
  }

  // Proses Auto-Translate teks ID ke EN via Google Translate
  const { activityData, sections } = await fillTranslations(validation.data);

  // Update tabel activities
  const { error: updateError } = await supabase
    .from("activities")
    .update(activityData)
    .eq("id", id);

  if (updateError) {
    return { success: false, message: `Gagal memperbarui aktivitas: ${updateError.message}` };
  }

  // Hapus seksi lama lalu masukkan yang baru
  await supabase.from("content_sections").delete().eq("activity_id", id);

  if (sections && sections.length > 0) {
    const formattedSections = sections.map((sec) => ({
      activity_id: id,
      heading_id: sec.heading_id,
      heading_en: sec.heading_en,
      body_id: sec.body_id,
      body_en: sec.body_en,
      order_index: sec.order_index,
    }));

    await supabase.from("content_sections").insert(formattedSections);
  }

  revalidatePath("/news");
  revalidatePath(`/news/${activityData.slug}`);
  revalidatePath("/admin/activities");

  return { success: true };
}

// 5. Hapus Aktivitas
export async function deleteActivityAction(id: string): Promise<{ success: boolean; message?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, message: "Akses ditolak. Sesi Anda tidak valid." };
  }

  const supabase = getAdminSupabase();
  if (!supabase) {
    return { success: false, message: "Koneksi database belum terkonfigurasi di .env.local." };
  }

  const { error } = await supabase.from("activities").delete().eq("id", id);
  if (error) {
    return { success: false, message: `Gagal menghapus: ${error.message}` };
  }

  revalidatePath("/news");
  revalidatePath("/admin/activities");

  return { success: true };
}

// 6. Seeding Data Awal
export async function seedInitialDataAction(adminEmail = "admin@unibox.id", adminPassword = "AdminUnibox2026!"): Promise<{ success: boolean; message: string; count?: number }> {
  const supabase = getAdminSupabase();
  if (!supabase) {
    return { success: false, message: "Konfigurasi Supabase belum terpasang di .env.local." };
  }

  try {
    const { data: existingUser } = await supabase
      .from("admin_users")
      .select("id")
      .eq("email", adminEmail)
      .maybeSingle();

    if (!existingUser) {
      const passwordHash = await hashPassword(adminPassword);
      await supabase.from("admin_users").insert([
        {
          username: "admin",
          email: adminEmail,
          password_hash: passwordHash,
          name: "Administrator Unibox",
          role: "superadmin",
        },
      ]);
    }

    const { count } = await supabase
      .from("activities")
      .select("*", { count: "exact", head: true });

    if (count && count > 0) {
      return {
        success: true,
        message: `Database sudah memiliki ${count} aktivitas. Akun admin siap digunakan.`,
        count,
      };
    }

    let insertedCount = 0;
    for (const act of activitiesData) {
      const { data: insertedAct, error: actErr } = await supabase
        .from("activities")
        .insert([
          {
            slug: act.slug,
            type: act.type,
            featured: act.featured ?? false,
            category_id: act.category.id,
            category_en: act.category.en,
            title_id: act.title.id,
            title_en: act.title.en,
            date_id: act.date.id,
            date_en: act.date.en,
            time_id: act.time?.id || null,
            time_en: act.time?.en || null,
            location_id: act.location?.id || null,
            location_en: act.location?.en || null,
            status_id: act.status?.id || null,
            status_en: act.status?.en || null,
            author_name: act.author.name,
            author_role_id: act.author.role.id,
            author_role_en: act.author.role.en,
            image: act.image,
            summary_id: act.summary.id,
            summary_en: act.summary.en,
            intro_id: act.content.introduction.id,
            intro_en: act.content.introduction.en,
            quote_text_id: act.content.quote?.text.id || null,
            quote_text_en: act.content.quote?.text.en || null,
            quote_author: act.content.quote?.author || null,
            is_published: true,
          },
        ])
        .select("id")
        .single();

      if (!actErr && insertedAct) {
        insertedCount++;
        if (act.content.sections && act.content.sections.length > 0) {
          const formattedSecs = act.content.sections.map((s, idx) => ({
            activity_id: insertedAct.id,
            heading_id: s.heading.id,
            heading_en: s.heading.en,
            body_id: s.body.id,
            body_en: s.body.en,
            order_index: idx,
          }));
          await supabase.from("content_sections").insert(formattedSecs);
        }
      }
    }

    revalidatePath("/news");
    return {
      success: true,
      message: `Berhasil mengimpor ${insertedCount} aktivitas ke Supabase dan menyiapkan akun admin.`,
      count: insertedCount,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Kesalahan sistem";
    return { success: false, message: `Gagal proses seeding: ${errorMsg}` };
  }
}

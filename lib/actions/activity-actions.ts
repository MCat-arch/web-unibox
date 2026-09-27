"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
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
  show_on_landing: z.boolean().default(false),
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

function mapToDbActivity(act: any): DbActivity {
  return {
    id: act.id,
    slug: act.slug,
    type: act.type as "event" | "blog",
    featured: act.featured,
    show_on_landing: act.showOnLanding ?? false,
    category_id: act.category_id,
    category_en: act.category_en,
    title_id: act.title_id,
    title_en: act.title_en,
    date_id: act.date_id,
    date_en: act.date_en,
    time_id: act.time_id,
    time_en: act.time_en,
    location_id: act.location_id,
    location_en: act.location_en,
    status_id: act.status_id,
    status_en: act.status_en,
    author_name: act.authorName,
    author_role_id: act.authorRole_id,
    author_role_en: act.authorRole_en,
    image: act.image,
    summary_id: act.summary_id,
    summary_en: act.summary_en,
    intro_id: act.intro_id,
    intro_en: act.intro_en,
    quote_text_id: act.quoteText_id,
    quote_text_en: act.quoteText_en,
    quote_author: act.quoteAuthor,
    outcome_id: act.outcome_id,
    outcome_en: act.outcome_en,
    participants_count: act.participantsCount,
    is_published: act.isPublished,
    created_at: act.createdAt instanceof Date ? act.createdAt.toISOString() : String(act.createdAt),
    updated_at: act.updatedAt instanceof Date ? act.updatedAt.toISOString() : String(act.updatedAt),
    sections: (act.sections || []).map((s: any) => ({
      id: s.id,
      activity_id: s.activityId,
      heading_id: s.heading_id,
      heading_en: s.heading_en,
      body_id: s.body_id,
      body_en: s.body_en,
      order_index: s.orderIndex,
      created_at: s.createdAt instanceof Date ? s.createdAt.toISOString() : String(s.createdAt),
    })),
  };
}

// Helper auto-translate
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
      show_on_landing: input.show_on_landing,
      category_id: input.category_id,
      category_en,
      title_id: input.title_id,
      title_en,
      date_id: input.date_id,
      date_en,
      time_id: input.time_id || null,
      time_en: time_en || null,
      location_id: input.location_id || null,
      location_en: location_en || null,
      status_id: input.status_id || null,
      status_en: status_en || null,
      author_name: input.author_name,
      author_role_id: input.author_role_id,
      author_role_en,
      image: input.image,
      summary_id: input.summary_id,
      summary_en,
      intro_id: input.intro_id,
      intro_en,
      quote_text_id: input.quote_text_id || null,
      quote_text_en: quote_text_en || null,
      quote_author: input.quote_author || null,
      outcome_id: input.outcome_id || null,
      outcome_en: outcome_en || null,
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

  try {
    const acts = await prisma.activity.findMany({
      include: { sections: { orderBy: { orderIndex: "asc" } } },
      orderBy: { createdAt: "desc" },
    });
    return acts.map(mapToDbActivity);
  } catch (err) {
    console.error("getAdminActivities error:", err);
    return [];
  }
}

// 2. Fetch satu aktivitas berdasarkan ID untuk Edit
export async function getAdminActivityById(id: string): Promise<DbActivity | null> {
  const session = await getSession();
  if (!session) return null;

  try {
    const act = await prisma.activity.findUnique({
      where: { id },
      include: { sections: { orderBy: { orderIndex: "asc" } } },
    });
    return act ? mapToDbActivity(act) : null;
  } catch (err) {
    console.error("getAdminActivityById error:", err);
    return null;
  }
}

// 3. Simpan Aktivitas Baru
export async function createActivityAction(payload: ActivityFormInput): Promise<{ success: boolean; message?: string; id?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, message: "Akses ditolak. Sesi Anda tidak valid." };
  }

  const validation = activitySchema.safeParse(payload);
  if (!validation.success) {
    return { success: false, message: validation.error.issues[0]?.message || "Input tidak valid" };
  }

  const { activityData, sections } = await fillTranslations(validation.data);

  try {
    const newActivity = await prisma.activity.create({
      data: {
        slug: activityData.slug,
        type: activityData.type,
        featured: activityData.featured,
        showOnLanding: activityData.show_on_landing,
        category_id: activityData.category_id,
        category_en: activityData.category_en,
        title_id: activityData.title_id,
        title_en: activityData.title_en,
        date_id: activityData.date_id,
        date_en: activityData.date_en,
        time_id: activityData.time_id,
        time_en: activityData.time_en,
        location_id: activityData.location_id,
        location_en: activityData.location_en,
        status_id: activityData.status_id,
        status_en: activityData.status_en,
        authorName: activityData.author_name,
        authorRole_id: activityData.author_role_id,
        authorRole_en: activityData.author_role_en,
        image: activityData.image,
        summary_id: activityData.summary_id,
        summary_en: activityData.summary_en,
        intro_id: activityData.intro_id,
        intro_en: activityData.intro_en,
        quoteText_id: activityData.quote_text_id,
        quoteText_en: activityData.quote_text_en,
        quoteAuthor: activityData.quote_author,
        outcome_id: activityData.outcome_id,
        outcome_en: activityData.outcome_en,
        participantsCount: activityData.participants_count,
        isPublished: activityData.is_published,
        sections: {
          create: sections.map((sec) => ({
            heading_id: sec.heading_id,
            heading_en: sec.heading_en,
            body_id: sec.body_id,
            body_en: sec.body_en,
            orderIndex: sec.order_index,
          })),
        },
      },
    });

    revalidatePath("/news");
    revalidatePath(`/news/${newActivity.slug}`);
    revalidatePath("/admin/activities");

    return { success: true, id: newActivity.id };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Kesalahan database";
    return { success: false, message: `Gagal menyimpan aktivitas: ${errorMsg}` };
  }
}

// 4. Update Aktivitas Eksisting
export async function updateActivityAction(id: string, payload: ActivityFormInput): Promise<{ success: boolean; message?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, message: "Akses ditolak. Sesi Anda tidak valid." };
  }

  const validation = activitySchema.safeParse(payload);
  if (!validation.success) {
    return { success: false, message: validation.error.issues[0]?.message || "Input tidak valid" };
  }

  const { activityData, sections } = await fillTranslations(validation.data);

  try {
    await prisma.$transaction([
      prisma.contentSection.deleteMany({ where: { activityId: id } }),
      prisma.activity.update({
        where: { id },
        data: {
          slug: activityData.slug,
          type: activityData.type,
          featured: activityData.featured,
          showOnLanding: activityData.show_on_landing,
          category_id: activityData.category_id,
          category_en: activityData.category_en,
          title_id: activityData.title_id,
          title_en: activityData.title_en,
          date_id: activityData.date_id,
          date_en: activityData.date_en,
          time_id: activityData.time_id,
          time_en: activityData.time_en,
          location_id: activityData.location_id,
          location_en: activityData.location_en,
          status_id: activityData.status_id,
          status_en: activityData.status_en,
          authorName: activityData.author_name,
          authorRole_id: activityData.author_role_id,
          authorRole_en: activityData.author_role_en,
          image: activityData.image,
          summary_id: activityData.summary_id,
          summary_en: activityData.summary_en,
          intro_id: activityData.intro_id,
          intro_en: activityData.intro_en,
          quoteText_id: activityData.quote_text_id,
          quoteText_en: activityData.quote_text_en,
          quoteAuthor: activityData.quote_author,
          outcome_id: activityData.outcome_id,
          outcome_en: activityData.outcome_en,
          participantsCount: activityData.participants_count,
          isPublished: activityData.is_published,
          sections: {
            create: sections.map((sec) => ({
              heading_id: sec.heading_id,
              heading_en: sec.heading_en,
              body_id: sec.body_id,
              body_en: sec.body_en,
              orderIndex: sec.order_index,
            })),
          },
        },
      }),
    ]);

    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath(`/news/${activityData.slug}`);
    revalidatePath("/admin/activities");

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Kesalahan database";
    return { success: false, message: `Gagal memperbarui aktivitas: ${errorMsg}` };
  }
}

// 5. Hapus Aktivitas
export async function deleteActivityAction(id: string): Promise<{ success: boolean; message?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, message: "Akses ditolak. Sesi Anda tidak valid." };
  }

  try {
    await prisma.activity.delete({ where: { id } });
    revalidatePath("/news");
    revalidatePath("/admin/activities");
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Kesalahan database";
    return { success: false, message: `Gagal menghapus: ${errorMsg}` };
  }
}

// 5b. Toggle Status Publikasi (Terbit / Draft)
export async function togglePublishActivityAction(id: string): Promise<{ success: boolean; isPublished?: boolean; message?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, message: "Akses ditolak. Sesi Anda tidak valid." };
  }

  try {
    const current = await prisma.activity.findUnique({
      where: { id },
      select: { isPublished: true, slug: true },
    });

    if (!current) {
      return { success: false, message: "Konten tidak ditemukan." };
    }

    const updated = await prisma.activity.update({
      where: { id },
      data: { isPublished: !current.isPublished },
      select: { isPublished: true, slug: true },
    });

    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath(`/news/${updated.slug}`);
    revalidatePath("/admin/activities");

    return { success: true, isPublished: updated.isPublished };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Kesalahan database";
    return { success: false, message: `Gagal mengubah status: ${errorMsg}` };
  }
}

// 5c. Toggle Event / Konten Utama Teratas (Featured di /news)
export async function toggleFeaturedActivityAction(id: string): Promise<{ success: boolean; featured?: boolean; message?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, message: "Akses ditolak. Sesi Anda tidak valid." };
  }

  try {
    const current = await prisma.activity.findUnique({
      where: { id },
      select: { featured: true, slug: true },
    });

    if (!current) {
      return { success: false, message: "Konten tidak ditemukan." };
    }

    const nextFeatured = !current.featured;

    // Jika di-set menjadi TRUE, nonaktifkan featured pada konten lain agar satu yang jadi bintang utama
    if (nextFeatured) {
      await prisma.activity.updateMany({
        where: { id: { not: id } },
        data: { featured: false },
      });
    }

    const updated = await prisma.activity.update({
      where: { id },
      data: { featured: nextFeatured },
      select: { featured: true, slug: true },
    });

    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath(`/news/${updated.slug}`);
    revalidatePath("/admin/activities");

    return { success: true, featured: updated.featured };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Kesalahan database";
    return { success: false, message: `Gagal mengubah status utama: ${errorMsg}` };
  }
}

// 5d. Toggle Tampil di Landing Page (Maksimal 2 kartu aktif)
export async function toggleLandingActivityAction(id: string): Promise<{ success: boolean; showOnLanding?: boolean; message?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, message: "Akses ditolak. Sesi Anda tidak valid." };
  }

  try {
    const current = await prisma.activity.findUnique({
      where: { id },
      select: { showOnLanding: true, slug: true },
    });

    if (!current) {
      return { success: false, message: "Konten tidak ditemukan." };
    }

    const nextLanding = !current.showOnLanding;

    // Jika diaktifkan, pastikan hanya ada 2 yang aktif dengan menonaktifkan yang paling lama
    if (nextLanding) {
      const activeLanding = await prisma.activity.findMany({
        where: { showOnLanding: true },
        orderBy: { updatedAt: "asc" },
      });

      if (activeLanding.length >= 2) {
        const oldest = activeLanding[0];
        await prisma.activity.update({
          where: { id: oldest.id },
          data: { showOnLanding: false },
        });
      }
    }

    const updated = await prisma.activity.update({
      where: { id },
      data: { showOnLanding: nextLanding },
      select: { showOnLanding: true, slug: true },
    });

    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath("/admin/activities");

    return { success: true, showOnLanding: updated.showOnLanding };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Kesalahan database";
    return { success: false, message: `Gagal mengubah status landing page: ${errorMsg}` };
  }
}

// 6. Seeding Data Awal
export async function seedInitialDataAction(adminEmail = "admin@unibox.id", adminPassword = "AdminUnibox2026!"): Promise<{ success: boolean; message: string; count?: number }> {
  try {
    const existingUser = await prisma.adminUser.findUnique({
      where: { email: adminEmail },
    });

    if (!existingUser) {
      const passwordHash = await hashPassword(adminPassword);
      await prisma.adminUser.create({
        data: {
          username: "admin",
          email: adminEmail,
          passwordHash,
          name: "Administrator Unibox",
          role: "superadmin",
        },
      });
    }

    const count = await prisma.activity.count();
    if (count > 0) {
      return {
        success: true,
        message: `Database sudah memiliki ${count} aktivitas. Akun admin siap digunakan.`,
        count,
      };
    }

    let insertedCount = 0;
    for (const act of activitiesData) {
      const created = await prisma.activity.create({
        data: {
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
          authorName: act.author.name,
          authorRole_id: act.author.role.id,
          authorRole_en: act.author.role.en,
          image: act.image,
          summary_id: act.summary.id,
          summary_en: act.summary.en,
          intro_id: act.content.introduction.id,
          intro_en: act.content.introduction.en,
          quoteText_id: act.content.quote?.text.id || null,
          quoteText_en: act.content.quote?.text.en || null,
          quoteAuthor: act.content.quote?.author || null,
          isPublished: true,
          sections: {
            create: (act.content.sections || []).map((s, idx) => ({
              heading_id: s.heading.id,
              heading_en: s.heading.en,
              body_id: s.body.id,
              body_en: s.body.en,
              orderIndex: idx,
            })),
          },
        },
      });

      if (created) insertedCount++;
    }

    revalidatePath("/news");
    return {
      success: true,
      message: `Berhasil mengimpor ${insertedCount} aktivitas ke database dan menyiapkan akun admin.`,
      count: insertedCount,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Kesalahan sistem";
    return { success: false, message: `Gagal proses seeding: ${errorMsg}` };
  }
}

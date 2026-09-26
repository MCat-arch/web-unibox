"use server";

import { z } from "zod";
import { getAdminSupabase } from "@/lib/supabase/server";
import { comparePassword } from "@/lib/auth/password";
import { createSession, deleteSession } from "@/lib/auth/session";
import { checkRateLimit, resetRateLimit } from "@/lib/auth/rate-limiter";

const loginSchema = z.object({
  identifier: z.string().min(3, "Username atau email minimal 3 karakter").max(100),
  password: z.string().min(6, "Password minimal 6 karakter").max(100),
});

export interface LoginResult {
  success: boolean;
  message?: string;
}

export async function loginAdminAction(formData: FormData): Promise<LoginResult> {
  const rawIdentifier = formData.get("identifier") as string;
  const rawPassword = formData.get("password") as string;

  // 1. Validasi Skema Zod
  const validation = loginSchema.safeParse({
    identifier: rawIdentifier,
    password: rawPassword,
  });

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0]?.message || "Input tidak valid",
    };
  }

  const { identifier, password } = validation.data;

  // 2. Proteksi Brute Force Rate Limiter
  const rateLimitKey = `login:${identifier.toLowerCase().trim()}`;
  const rateCheck = checkRateLimit(rateLimitKey);
  if (!rateCheck.allowed) {
    return {
      success: false,
      message: `Terlalu banyak percobaan gagal. Silakan coba lagi dalam ${rateCheck.retryAfterSeconds} detik.`,
    };
  }

  // 3. Cek Koneksi Supabase Admin
  const supabase = getAdminSupabase();
  if (!supabase) {
    return {
      success: false,
      message: "Konfigurasi Supabase belum terpasang di .env.local. Harap lengkapi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  try {
    // 4. Query Admin User (Parameterized via Supabase SDK)
    const isEmail = identifier.includes("@");
    const query = supabase
      .from("admin_users")
      .select("id, username, email, password_hash, name, role");

    const { data: user, error } = isEmail
      ? await query.eq("email", identifier).single()
      : await query.eq("username", identifier).single();

    if (error || !user) {
      return {
        success: false,
        message: "Username atau kata sandi tidak valid.",
      };
    }

    // 5. Verifikasi Hash Password
    const isValidPassword = await comparePassword(password, user.password_hash);
    if (!isValidPassword) {
      return {
        success: false,
        message: "Username atau kata sandi tidak valid.",
      };
    }

    // Reset rate limit jika berhasil
    resetRateLimit(rateLimitKey);

    // 6. Buat Sesi Terenkripsi
    await createSession({
      userId: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return { success: true };
  } catch {
    return {
      success: false,
      message: "Terjadi kesalahan sistem saat memproses login.",
    };
  }
}

export async function logoutAdminAction(): Promise<void> {
  await deleteSession();
}

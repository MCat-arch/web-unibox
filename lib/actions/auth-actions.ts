"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { comparePassword, hashPassword } from "@/lib/auth/password";
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

  try {
    const isEmail = identifier.includes("@");
    let user = isEmail
      ? await prisma.adminUser.findUnique({ where: { email: identifier } })
      : await prisma.adminUser.findUnique({ where: { username: identifier } });

    // Auto-bootstrap master admin jika tabel masih kosong
    if (!user && (identifier === "admin@unibox.id" || identifier === "admin") && password === "AdminUnibox2026!") {
      try {
        const count = await prisma.adminUser.count();
        if (count === 0) {
          const passwordHash = await hashPassword(password);
          user = await prisma.adminUser.create({
            data: {
              username: "admin",
              email: "admin@unibox.id",
              passwordHash,
              name: "Administrator Unibox",
              role: "superadmin",
            },
          });
        }
      } catch (bootstrapErr) {
        console.warn("Bootstrap user error:", bootstrapErr);
      }
    }

    if (!user) {
      return {
        success: false,
        message: "Username atau kata sandi tidak valid.",
      };
    }

    // 3. Verifikasi Hash Password
    const isValidPassword = await comparePassword(password, user.passwordHash);
    if (!isValidPassword) {
      return {
        success: false,
        message: "Username atau kata sandi tidak valid.",
      };
    }

    resetRateLimit(rateLimitKey);

    // 4. Buat Sesi Terenkripsi
    await createSession({
      userId: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return { success: true };
  } catch (err: unknown) {
    console.error("Login process error:", err);
    return {
      success: false,
      message: "Gagal terhubung ke database. Pastikan DATABASE_URL di .env terpasang dengan benar.",
    };
  }
}

export async function logoutAdminAction(): Promise<void> {
  await deleteSession();
}

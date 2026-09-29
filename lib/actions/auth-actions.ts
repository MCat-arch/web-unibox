"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { comparePassword, hashPassword } from "@/lib/auth/password";
import { createSession, deleteSession, getSession } from "@/lib/auth/session";
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

    // Optional bootstrap is enabled only when explicit deployment secrets are configured.
    const bootstrapEmail = process.env.ADMIN_BOOTSTRAP_EMAIL;
    const bootstrapUsername = process.env.ADMIN_BOOTSTRAP_USERNAME || "admin";
    const bootstrapPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;
    const matchesBootstrap =
      bootstrapEmail &&
      bootstrapPassword &&
      (identifier.toLowerCase() === bootstrapEmail.toLowerCase() || identifier === bootstrapUsername) &&
      password === bootstrapPassword;

    if (!user && matchesBootstrap) {
      try {
        const count = await prisma.adminUser.count();
        if (count === 0) {
          const passwordHash = await hashPassword(password);
          user = await prisma.adminUser.create({
            data: {
              username: bootstrapUsername,
              email: bootstrapEmail,
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

export async function changePasswordAction(formData: FormData): Promise<{ success: boolean; message?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, message: "Akses ditolak. Sesi Anda tidak valid." };
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!newPassword || newPassword.length < 6) {
    return { success: false, message: "Kata sandi baru minimal 6 karakter." };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, message: "Konfirmasi kata sandi baru tidak cocok." };
  }

  try {
    const user = await prisma.adminUser.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return { success: false, message: "Akun admin tidak ditemukan." };
    }

    const isValid = await comparePassword(currentPassword, user.passwordHash);
    if (!isValid) {
      return { success: false, message: "Kata sandi lama yang Anda masukkan tidak tepat." };
    }

    const passwordHash = await hashPassword(newPassword);
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    return { success: true, message: "Kata sandi akun admin berhasil diperbarui!" };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Kesalahan database";
    return { success: false, message: `Gagal memperbarui kata sandi: ${errorMsg}` };
  }
}

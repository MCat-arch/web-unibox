import { NextResponse } from "next/server";
import { getPublicSupabase } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export async function GET() {
  const timestamp = new Date().toISOString();

  try {
    const supabase = getPublicSupabase();

    if (!supabase) {
      return NextResponse.json(
        {
          status: "fallback",
          message: "Supabase client tidak terkonfigurasi. Server Next.js aktif.",
          timestamp,
        },
        { status: 200 }
      );
    }

    // Ping ringan ke tabel activities
    const { data, error } = await supabase
      .from("activities")
      .select("id")
      .limit(1);

    if (error) {
      return NextResponse.json(
        {
          status: "warning",
          message: "Query ke database Supabase menerima error.",
          error: error.message,
          timestamp,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        status: "ok",
        message: "Database Supabase aktif dan berhasil diping.",
        recordCount: data?.length ?? 0,
        timestamp,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Kesalahan sistem";
    return NextResponse.json(
      {
        status: "error",
        message: "Gagal memproses ping database.",
        error: errorMessage,
        timestamp,
      },
      { status: 500 }
    );
  }
}

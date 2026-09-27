"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function AdminTabGuard() {
  const router = useRouter();
  const hasTriggered = useRef(false);

  useEffect(() => {
    const performLogout = () => {
      if (hasTriggered.current) return;
      hasTriggered.current = true;

      // Panggil API logout via fetch dengan keepalive agar pasti selesai di background
      try {
        fetch("/api/admin/logout", {
          method: "POST",
          keepalive: true,
        });
      } catch {
        // Fallback
      }
    };

    const handleVisibilityChange = () => {
      // Jika tab tidak aktif (user berpindah ke tab lain, meminimalkan, atau menutup tab)
      if (document.visibilityState === "hidden") {
        performLogout();
      } else if (document.visibilityState === "visible" && hasTriggered.current) {
        // Saat kembali ke tab ini, arahkan langsung ke halaman login dengan alasan keamanan
        window.location.href = "/admin/login?reason=tab_changed";
      }
    };

    const handlePageHide = () => {
      // Saat berpindah halaman atau meninggalkan halaman admin
      performLogout();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [router]);

  return null;
}

"use client";

import { useLanguage } from "@/context/language-context";
import { useNavbarTransparency } from "@/components/layout/navbar-scroll-state";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const isTransparent = useNavbarTransparency();

  return (
    <div
      className={`flex items-center rounded-full border p-0.5 transition-all duration-500 ease-in-out ${isTransparent
          ? "border-white/25 bg-white/10 backdrop-blur-md"
          : "border-slate-200 bg-slate-100/90 shadow-xs"
        }`}
      aria-label="Pilih Bahasa / Language selector"
    >
      {(["id", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          className={`h-7 rounded-full px-3 text-xs font-bold uppercase transition-all duration-300 cursor-pointer ${language === code
              ? isTransparent
                ? "bg-white text-slate-900 shadow-sm"
                : "bg-blue-600 text-white shadow-xs"
              : isTransparent
                ? "text-white/80 hover:text-white hover:bg-white/10"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

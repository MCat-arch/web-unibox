"use client";

import { useLanguage } from "@/context/language-context";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100/80 p-1 text-xs font-semibold backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
      <Globe className="ml-1.5 mr-1 h-3.5 w-3.5 text-slate-500" />
      <button
        type="button"
        onClick={() => setLanguage("id")}
        className={`rounded-full px-2.5 py-1 transition-all ${
          language === "id"
            ? "bg-white text-blue-600 shadow-xs font-bold dark:bg-slate-800 dark:text-blue-400"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-2.5 py-1 transition-all ${
          language === "en"
            ? "bg-white text-blue-600 shadow-xs font-bold dark:bg-slate-800 dark:text-blue-400"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}

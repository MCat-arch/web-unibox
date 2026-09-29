"use client";

import React, { createContext, startTransition, useContext, useEffect, useState } from "react";

export type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLanguage = "id",
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    const saved = localStorage.getItem("unibox_lang") as Language | null;
    if (saved === "id" || saved === "en") {
      if (saved !== initialLanguage) {
        startTransition(() => setLanguageState(saved));
      }
    }
    document.documentElement.lang = saved === "en" ? "en" : initialLanguage;
  }, [initialLanguage]);

  const setLanguage = (lang: Language) => {
    if (lang === language) {
      return;
    }

    setLanguageState(lang);
    localStorage.setItem("unibox_lang", lang);
    document.cookie = `unibox_lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    setLanguage(language === "id" ? "en" : "id");
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

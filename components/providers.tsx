"use client";

import { LanguageProvider } from "@/context/language-context";
import type { Language } from "@/context/language-context";

export function Providers({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  return <LanguageProvider initialLanguage={initialLanguage}>{children}</LanguageProvider>;
}

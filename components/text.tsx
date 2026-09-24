"use client";

import { useLanguage } from "@/context/language-context";

type Copy = { id: string; en: string };

/** Renders the active language's string from a bilingual { id, en } object. */
export function Text({ children }: { children: Copy }) {
  const { language } = useLanguage();
  return <>{children[language]}</>;
}

export type { Copy };

import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";
import type { Language } from "@/context/language-context";

function getInitialLanguage(value: string | undefined): Language {
  return value === "en" ? "en" : "id";
}

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguage(cookieStore.get("unibox_lang")?.value);

  return (
    <Providers initialLanguage={initialLanguage}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </Providers>
  );
}

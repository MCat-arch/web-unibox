import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Kontak Unibox — Diskusikan Kebutuhan Anda",
  description: "Hubungi Unibox untuk konsultasi solusi penyimpanan ikan dan kemitraan.",
  openGraph: {
    title: "Kontak Unibox",
    description: "Diskusikan kebutuhan solusi penyimpanan ikan bersama Unibox.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}

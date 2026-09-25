import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Kontak & Workshop — Unibox",
  description: "Pusat informasi dan workshop perakitan teknologi pendingin perikanan Unibox di Margomulyo, Surabaya.",
  openGraph: {
    title: "Kontak & Workshop — Unibox",
    description: "Pusat informasi dan workshop perakitan teknologi pendingin perikanan Unibox di Margomulyo, Surabaya.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}

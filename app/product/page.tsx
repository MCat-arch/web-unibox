import type { Metadata } from "next";
import { ProductContent } from "./product-content";

export const metadata: Metadata = {
  title: "Produk & Teknologi Unibox — Sistem Pendingin & Elektrifikasi Perahu Nelayan",
  description:
    "Jelajahi 5 teknologi terintegrasi Unibox: Flywheel Generator mandiri, Pendingin Refrigerant R32, Coolbox 100 Liter, Sonar Ultrasonik 100m, dan Lampu LED Maritim Tahan Air.",
  openGraph: {
    title: "Produk & Teknologi Unibox",
    description:
      "Sistem pendingin dan elektrifikasi terpadu untuk perahu nelayan Indonesia.",
    type: "website",
  },
};

export default function ProductPage() {
  return <ProductContent />;
}

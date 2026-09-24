import type { Metadata } from "next";
import { ProductContent } from "./product-content";

export const metadata: Metadata = {
  title: "Produk Unibox — Solusi Cold-Chain Modular",
  description: "Jelajahi rancangan sistem penyimpanan dingin modular Unibox.",
  openGraph: {
    title: "Produk Unibox",
    description: "Solusi penyimpanan dingin modular untuk industri perikanan.",
    type: "website",
  },
};

export default function ProductPage() {
  return <ProductContent />;
}

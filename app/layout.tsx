import type { Metadata } from "next";
import { Archivo_Black, Hind } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/conditional-layout";
import { Providers } from "@/components/providers";

const archivoBlack = Archivo_Black({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const hind = Hind({
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Unibox",
    template: "%s | Unibox",
  },
  description:
    "Unibox menghadirkan solusi penyimpanan dingin dan sistem es terintegrasi untuk industri perikanan Indonesia.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Unibox",
    description:
      "Solusi penyimpanan dingin dan sistem es terintegrasi untuk menjaga mutu hasil laut.",
    type: "website",
    images: [{ url: "/images/unibox-logo.png", width: 1024, height: 1024, alt: "Unibox Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/unibox-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${archivoBlack.variable} ${hind.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-body">
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}

"use client";

import { useState } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/text";

export function ContactCtaSection() {
  const [contactSent, setContactSent] = useState(false);

  return (
    <section className="overflow-hidden bg-ice py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
        {/* Left: Info */}
        <div>
          <p className="section-label">
            <Text>{{ id: "Hubungi kami", en: "Contact us" }}</Text>
          </p>
          <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight text-navy sm:text-5xl">
            <Text>
              {{
                id: "Mari diskusikan kebutuhan rantai dingin Anda.",
                en: "Let's discuss your cold-chain needs.",
              }}
            </Text>
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">
            <Text>
              {{
                id: "Ceritakan lokasi, kapasitas, dan tantangan operasional Anda. Kami akan membantu memetakan langkah berikutnya.",
                en: "Tell us about your location, capacity, and operating challenges. We will help map the next step.",
              }}
            </Text>
          </p>
          <div className="mt-8 grid gap-5 border-t border-border pt-7 sm:grid-cols-2">
            <div className="flex gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-[10px] font-semibold uppercase text-muted-foreground">
                  Email
                </p>
                <p className="mt-1 text-sm font-semibold">
                  <Text>{{ id: "Segera tersedia", en: "Coming soon" }}</Text>
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-[10px] font-semibold uppercase text-muted-foreground">
                  <Text>{{ id: "Telepon", en: "Phone" }}</Text>
                </p>
                <p className="mt-1 text-sm font-semibold">
                  <Text>{{ id: "Segera tersedia", en: "Coming soon" }}</Text>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <form
          className="rounded-lg border border-border bg-card p-6 shadow-lg sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setContactSent(true);
          }}
        >
          <h3 className="font-display text-xl text-navy">
            <Text>{{ id: "Ceritakan kebutuhan Anda", en: "Tell us what you need" }}</Text>
          </h3>
          <div className="mt-6 grid gap-4">
            <label className="text-xs font-semibold text-muted-foreground">
              <Text>{{ id: "Nama", en: "Name" }}</Text>
              <input
                required
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </label>
            <label className="text-xs font-semibold text-muted-foreground">
              Email
              <input
                required
                type="email"
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </label>
            <label className="text-xs font-semibold text-muted-foreground">
              WhatsApp
              <input
                type="tel"
                placeholder="+62"
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </label>
            <label className="text-xs font-semibold text-muted-foreground">
              <Text>{{ id: "Pesan", en: "Message" }}</Text>
              <textarea
                required
                className="mt-2 min-h-28 w-full resize-y rounded-md border border-input bg-background p-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </label>
          </div>
          <Button type="submit" className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 shadow-md shadow-blue-500/20">
            <Text>{{ id: "Kirim pertanyaan", en: "Send inquiry" }}</Text>
            <ArrowRight />
          </Button>
          {contactSent && (
            <p role="status" className="mt-4 text-xs leading-5 text-primary">
              <Text>
                {{
                  id: "Terima kasih. Ini masih formulir contoh; pengiriman belum diaktifkan.",
                  en: "Thank you. This is still a sample form; delivery is not enabled yet.",
                }}
              </Text>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

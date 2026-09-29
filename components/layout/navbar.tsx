import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/text";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavbarLogo } from "@/components/layout/navbar-logo";
import { NavbarNavigation } from "@/components/layout/navbar-navigation";
import { NavbarScrollState } from "@/components/layout/navbar-scroll-state";

export function Navbar() {
  return (
    <NavbarScrollState>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
        <NavbarLogo />
        <NavbarNavigation />

        <div className="hidden md:flex items-center gap-3.5">
          <LanguageSwitcher />
          <Button
            asChild
            size="sm"
            className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all hover:scale-105"
          >
            <Link href="/contact" prefetch={false}>
              <Text>{{ id: "Hubungi Kami", en: "Contact Us" }}</Text>
            </Link>
          </Button>
        </div>

        <MobileMenu />
      </div>
    </NavbarScrollState>
  );
}

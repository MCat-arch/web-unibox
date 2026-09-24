import { HeroSection } from "@/components/sections/hero-section";
import { StatsSection } from "@/components/sections/stats-section";
import { SolutionsSection } from "@/components/sections/solutions-section";
import { PartnershipSection } from "@/components/sections/partnership-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { NewsPreviewSection } from "@/components/sections/news-preview-section";
import { ContactCtaSection } from "@/components/sections/cta-section";
import { LocationSocialSection } from "@/components/sections/location-social-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <SolutionsSection />
      <PartnershipSection />
      <TestimonialsSection />
      <NewsPreviewSection />
      <ContactCtaSection />
      <LocationSocialSection />
    </>
  );
}

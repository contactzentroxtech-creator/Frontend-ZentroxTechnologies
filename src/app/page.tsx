import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/hero/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import LocalSection from "@/components/sections/LocalSection";
import PricingWizard from "@/components/sections/PricingWizard";
import ClassesSection from "@/components/sections/ClassesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import PopupManager from "@/components/ui/PopupManager";
import FloatingCTA from "@/components/ui/FloatingCTA";
import CursorEffect from "@/components/ui/CursorEffect";

export const metadata: Metadata = {
  title:
    "Zentrox Technologies — Premium website development & AI Solutions | Mohali, Chandigarh",
  description:
    "Zentrox Technologies is an MSME-registered technology company in Mohali & Chandigarh. We build premium websites, mobile apps, SaaS platforms, AI automation, and Digital Marketing Services solutions.",
  alternates: { canonical: "https://zentroxtech.com" },
};

export default function HomePage() {
  return (
    <>
      <CursorEffect />
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <LocalSection />
        <PricingWizard />
        {/* <ClassesSection /> */}
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <PopupManager />
      <FloatingCTA />
    </>
  );
}

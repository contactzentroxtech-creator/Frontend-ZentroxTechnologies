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
  title: "Zentrox Technologies — Software & Digital Growth Partner",
  description:
    "Premium software development and digital services for Indian and international businesses. Remote-first custom solutions delivered worldwide. Founded 2023.",
  alternates: { canonical: "https://zentroxtechnologies.com" },
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

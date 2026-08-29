import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/components/hero/HeroSection";

import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import LocalSection from "@/components/sections/LocalSection";
import PricingWizard from "@/components/sections/PricingWizard";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

import PopupManager from "@/components/ui/PopupManager";
import FloatingCTA from "@/components/ui/FloatingCTA";
import CursorEffect from "@/components/ui/CursorEffect";

export const metadata: Metadata = {
  title: "Zentrox Technologies — Software & Digital Growth Partner",

  description:
    "Premium software development, website development, mobile applications, AI solutions, SaaS development, SEO and digital services for businesses in India and worldwide.",

  alternates: {
    canonical: "https://zentroxtechnologies.com",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Premium Cursor Effect */}
      <CursorEffect />

      {/* Header */}
      <Navbar />

      {/* Main Website Content */}
      <main>
        {/* Hero */}
        <HeroSection />

        {/* Company Statistics */}
        <StatsSection />

        {/* Services */}
        <ServicesSection />

        {/* Local Business Section */}
        <LocalSection />

        {/* Pricing & Quote */}
        <PricingWizard />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Final Call To Action */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Website Popup System */}
      <PopupManager />

      {/* Floating WhatsApp / CTA */}
      <FloatingCTA />
    </>
  );
}

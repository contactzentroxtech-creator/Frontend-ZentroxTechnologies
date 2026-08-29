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
  title: "Zentrox Technologies | Software Development & Digital Growth Partner",

  description:
    "Zentrox Technologies provides custom software development, website development, mobile app development, SaaS solutions, AI integration, SEO, digital marketing and UI/UX design for businesses in India and worldwide.",

  alternates: {
    canonical: "https://zentroxtechnologies.com/",
  },

  openGraph: {
    title:
      "Zentrox Technologies | Software Development & Digital Growth Partner",

    description:
      "Custom software, websites, mobile apps, SaaS, AI integration, SEO and digital marketing solutions for growing businesses worldwide.",

    url: "https://zentroxtechnologies.com/",

    siteName: "Zentrox Technologies",

    type: "website",

    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Zentrox Technologies | Software Development & Digital Growth Partner",

    description:
      "Custom software, websites, mobile apps, SaaS, AI integration, SEO and digital marketing solutions for growing businesses.",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Premium Cursor Effect */}
      <CursorEffect />

      {/* Header / Navigation */}
      <Navbar />

      {/* Main Website Content */}
      <main>
        {/* Hero Section */}
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
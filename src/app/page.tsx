import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/components/hero/HeroSection";

import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import LocalSection from "@/components/sections/LocalSection";
import PricingWizard from "@/components/sections/PricingWizard";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

import PopupManager from "@/components/ui/PopupManager";
import FloatingCTA from "@/components/ui/FloatingCTA";
import CursorEffect from "@/components/ui/CursorEffect";

export const metadata: Metadata = {
  title:
    "Zentrox Technologies | Software, Web & Digital Marketing Services",

  description:
    "Zentrox Technologies delivers custom software development, website development, mobile app development, SaaS solutions, AI integration, SEO, UI/UX design and digital marketing services for businesses in India and worldwide.",

  keywords: [
    "software development company",
    "website development company",
    "mobile app development",
    "custom software development",
    "SaaS development",
    "AI integration services",
    "SEO services",
    "digital marketing services",
    "website development India",
    "software development India",
    "digital agency Mohali",
    "website development Chandigarh",
    "digital marketing Punjab",
    "IT services India",
    "affordable software development",
    "global software development company",
  ],

  alternates: {
    canonical: "https://zentroxtechnologies.com/",
  },

  openGraph: {
    title:
      "Zentrox Technologies | Software, Web & Digital Growth Partner",

    description:
      "Custom software, websites, mobile apps, SaaS, AI integration, SEO and digital marketing services for businesses in India and worldwide.",

    url: "https://zentroxtechnologies.com/",

    siteName: "Zentrox Technologies",

    type: "website",

    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Zentrox Technologies | Software, Web & Digital Growth Partner",

    description:
      "Custom software, websites, mobile apps, SaaS, AI integration, SEO and digital marketing solutions for growing businesses worldwide.",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Optional desktop cursor effect */}
      <CursorEffect />

      {/* Website Navigation */}
      <Navbar />

      <main>
        {/* Hero */}
        <HeroSection />

        {/* Trust & Company Statistics */}
        <StatsSection />

        {/* Core Digital Services */}
        <ServicesSection />

        {/* Why Choose Zentrox Technologies */}
        <WhyChooseUsSection />

        {/* Industries & Global Service Coverage */}
        <LocalSection />

        {/* Interactive Project Estimator */}
        <PricingWizard />

        {/* Client Testimonials */}
        <TestimonialsSection />

        {/* Final Lead Generation CTA */}
        <CTASection />
      </main>

      {/* Website Footer */}
      <Footer />

      {/* Promotional / Lead Generation Popup */}
      <PopupManager />

      {/* WhatsApp / Quick Contact CTA */}
      <FloatingCTA />
    </>
  );
}

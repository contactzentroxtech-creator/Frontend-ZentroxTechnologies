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
  title: "Zentrox Technologies | Software, Web & Digital Growth Solutions",
  description: "Zentrox Technologies delivers custom software, website development, mobile app development, SaaS solutions, AI integration, SEO, UI/UX design and digital marketing services for businesses in India and worldwide.",
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
    title: "Zentrox Technologies | Software, Web & Digital Growth Solutions",
    description: "Custom software, websites, mobile apps, SaaS, AI integration, SEO and digital marketing services for businesses in India and worldwide.",
    url: "https://zentroxtechnologies.com/",
    siteName: "Zentrox Technologies",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentrox Technologies | Software, Web & Digital Growth Solutions",
    description: "Custom software, websites, mobile apps, SaaS, AI integration, SEO and digital marketing solutions for growing businesses worldwide.",
  },
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
        <WhyChooseUsSection />
        <LocalSection />
        <PricingWizard />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <PopupManager />
      <FloatingCTA />
    </>
  );
}

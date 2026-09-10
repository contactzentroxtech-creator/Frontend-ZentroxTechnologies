import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services | Zentrox Technologies | Software, Web & Digital Growth",
  description:
    "Explore Zentrox Technologies services — custom software development, website development, mobile apps, SaaS, AI integration, SEO, UI/UX design and digital marketing for businesses in India and worldwide.",
  keywords: [
    "custom software development",
    "website development services",
    "mobile app development",
    "SaaS development",
    "AI integration services",
    "SEO services",
    "digital marketing services",
    "UI/UX design",
    "software company Mohali",
    "web development Chandigarh",
  ],
  alternates: {
    canonical: "https://zentroxtechnologies.com/services",
  },
  openGraph: {
    title: "Services | Zentrox Technologies",
    description:
      "Custom software, websites, mobile apps, SaaS, AI integration, SEO and digital marketing services for businesses in India and worldwide.",
    url: "https://zentroxtechnologies.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Zentrox Technologies",
    description:
      "Custom software, websites, mobile apps, SaaS, AI integration, SEO and digital marketing solutions.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FDF8F3] pt-20">
        <ServicesClient />
      </main>
      <Footer />
    </>
  );
}

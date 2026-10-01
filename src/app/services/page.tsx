import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services | Web, Mobile, Software & Digital Marketing",
  description:
    "Explore Zentrox Technologies services — website development, mobile apps, custom software, UI/UX design, SEO, AI integration, SaaS development and more. Serving businesses in Mohali, Chandigarh and worldwide.",
  keywords: [
    "website development services",
    "mobile app development services",
    "custom software development",
    "UI UX design services",
    "SEO services Mohali",
    "digital marketing Chandigarh",
    "AI integration services",
    "SaaS development India",
    "software company services",
  ],
  alternates: {
    canonical: "https://zentroxtechnologies.com/services",
  },
  openGraph: {
    title: "Services | Zentrox Technologies",
    description:
      "Complete digital services — web, mobile, software, design, SEO and AI — for businesses in India and worldwide.",
    url: "https://zentroxtechnologies.com/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}

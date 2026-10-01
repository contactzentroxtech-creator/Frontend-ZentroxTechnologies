import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services | Web, Mobile, Software & Digital Marketing",
  description:
    "Explore Zentrox Technologies services — website development, mobile apps, custom software, UI/UX design, SEO, AI integration, SaaS development and more.",
  keywords: [
    "website development services",
    "mobile app development services",
    "custom software development",
    "SEO services Mohali",
    "digital marketing Chandigarh",
  ],
  alternates: { canonical: "https://zentroxtechnologies.com/services" },
};

export default function ServicesPage() {
  return <ServicesClient />;
}

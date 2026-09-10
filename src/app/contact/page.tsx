import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Zentrox Technologies | Get a Free Consultation",
  description:
    "Get in touch with Zentrox Technologies for custom software, website development, mobile apps, AI integration, SEO and digital marketing services. Free consultation for businesses in India and worldwide.",
  keywords: [
    "contact Zentrox Technologies",
    "software company contact",
    "free consultation",
    "web development contact",
    "digital marketing agency contact",
    "Mohali software company",
    "Chandigarh web development",
  ],
  alternates: {
    canonical: "https://zentroxtechnologies.com/contact",
  },
  openGraph: {
    title: "Contact Zentrox Technologies | Get a Free Consultation",
    description:
      "Talk to our team about your project. Free consultation for businesses in India and worldwide.",
    url: "https://zentroxtechnologies.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Zentrox Technologies",
    description:
      "Get in touch for a free consultation about your digital project.",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FDF8F3] pt-20">
        <ContactPageClient />
      </main>
      <Footer />
    </>
  );
}

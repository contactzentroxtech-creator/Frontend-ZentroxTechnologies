import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services — Zentrox Technologies | Web, Mobile, AI & SEO Solutions",
  description:
    "Zentrox Technologies offers website development, mobile apps, SaaS development, AI integration, SEO, Digital Marketing Services, and UI/UX design — serving Mohali, Chandigarh, and all of India.",
  alternates: { canonical: "https://zentroxtech.com/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ServicesClient />
      </main>
      <Footer />
    </>
  );
}

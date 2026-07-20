import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Software & Digital Services — Zentrox Technologies",
  description:
    "Custom software, web apps, SaaS, Android, SEO, AI automation, and more. Premium technology services for businesses in India and globally.",
  alternates: { canonical: "https://zentroxtechnologies.com/services" },
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

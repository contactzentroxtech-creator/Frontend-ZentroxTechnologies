import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us — Zentrox Technologies",
  description:
    "Get a free consultation via form, WhatsApp, or Calendly. Remote-first team in Mohali serving worldwide. We respond within 24-48 hours.",
  alternates: { canonical: "https://zentroxtech.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ContactPageClient />
      </main>
      <Footer />
    </>
  );
}

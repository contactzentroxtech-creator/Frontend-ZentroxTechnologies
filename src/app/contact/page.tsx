import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title:
    "Contact Zentrox Technologies — Free Consultation | Mohali & Chandigarh",
  description:
    "Contact Zentrox Technologies for website development, AI solutions, SEO, and Digital Marketing Services. Based in Mohali & Chandigarh. MSME registered. Free consultation available.",
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

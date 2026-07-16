import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: "About Zentrox — Remote-First Software Company Founded 2023",
  description:
    "Founded in 2023 by Prince Paul Singh. Remote-first software and digital growth partner serving India, USA, UK, UAE, Singapore & beyond.",
  alternates: { canonical: "https://zentroxtech.com/about" },
  openGraph: {
    title: "About Zentrox Technologies",
    description:
      "MSME-registered technology startup based in Mohali & Chandigarh.",
    url: "https://zentroxtech.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <AboutClient />
      </main>
      <Footer />
    </>
  );
}

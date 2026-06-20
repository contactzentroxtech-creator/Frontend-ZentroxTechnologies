import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Zentrox Technologies — MSME Registered Tech Company | Mohali & Chandigarh',
  description:
    'Zentrox Technologies is an MSME-registered, remote-first technology company in Mohali & Chandigarh building premium web, mobile, AI, and SaaS solutions for growing businesses.',
  alternates: { canonical: 'https://zentroxtech.com/about' },
  openGraph: {
    title: 'About Zentrox Technologies',
    description: 'MSME-registered technology startup based in Mohali & Chandigarh.',
    url: 'https://zentroxtech.com/about',
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

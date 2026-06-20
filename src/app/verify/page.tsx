import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VerifyIndexClient from './VerifyIndexClient';

export const metadata: Metadata = {
  title: 'Verify Certificate — Zentrox Technologies',
  description: 'Verify the authenticity of a Zentrox Technologies certificate. Enter your certificate ID to instantly verify your course completion, internship, or recommendation letter.',
  alternates: { canonical: 'https://zentroxtech.com/verify' },
};

export default function VerifyIndexPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <VerifyIndexClient />
      </main>
      <Footer />
    </>
  );
}

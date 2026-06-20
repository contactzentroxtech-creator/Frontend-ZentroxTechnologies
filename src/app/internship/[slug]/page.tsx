import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import InternshipDetailClient from './InternshipDetailClient';

export const metadata: Metadata = {
  title: 'Remote Internship — Zentrox Technologies',
  description: 'Apply for a remote internship at Zentrox Technologies. Gain real-world experience, earn a certificate, and get a recommendation letter.',
};

export default function InternshipDetailPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <InternshipDetailClient slug={params.slug} />
      </main>
      <Footer />
    </>
  );
}

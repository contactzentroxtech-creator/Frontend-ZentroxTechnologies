import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VerifyClient from './VerifyClient';

export const metadata: Metadata = {
  title: 'Verify Certificate — Zentrox Technologies',
  description: 'Verify the authenticity of a Zentrox Technologies certificate using the unique certificate ID or QR code.',
  robots: { index: false },
};

export default function VerifyCertPage({ params }: { params: { certId: string } }) {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <VerifyClient certId={params.certId} />
      </main>
      <Footer />
    </>
  );
}

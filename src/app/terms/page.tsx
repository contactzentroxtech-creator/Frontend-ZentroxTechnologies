import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service — Zentrox Technologies',
  description: 'Terms of Service for Zentrox Technologies — the rules governing the use of our platform, services, courses, and internship program.',
};

const TERMS = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing or using the Zentrox Technologies platform ("Service"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.',
  },
  {
    title: '2. Use of Services',
    content: 'You agree to use our services only for lawful purposes. You must not use the platform to violate any laws, infringe on intellectual property rights, transmit malicious code, or engage in any activity that disrupts our services or other users\' experience.',
  },
  {
    title: '3. Accounts and Registration',
    content: 'You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. You must provide accurate, current, and complete information during registration.',
  },
  {
    title: '4. Courses and LMS',
    content: 'Course enrollments are personal and non-transferable. Upon enrollment, you receive a limited, non-exclusive license to access the course content. Sharing, redistributing, or reproducing course materials without permission is strictly prohibited. Certificates are issued upon successful completion of all course requirements.',
  },
  {
    title: '5. Internship Program',
    content: 'The Remote Internship Program is subject to eligibility requirements including aptitude test qualification. Selection is at the sole discretion of Zentrox Technologies. Internship participants must complete all assigned tasks professionally and meet deadlines. Certificates and recommendation letters are issued upon satisfactory completion.',
  },
  {
    title: '6. Payments and Refunds',
    content: 'All payments are processed securely through Razorpay or Stripe. Course fees are non-refundable once course access has been granted. Service project fees are governed by individual project agreements. For billing disputes, contact us within 7 days of the charge.',
  },
  {
    title: '7. Intellectual Property',
    content: 'All content on this platform, including course materials, brand assets, designs, and code, is the intellectual property of Zentrox Technologies and is protected under applicable copyright law. You may not reproduce, distribute, or create derivative works without express written permission.',
  },
  {
    title: '8. Limitation of Liability',
    content: 'Zentrox Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim.',
  },
  {
    title: '9. Termination',
    content: 'We reserve the right to terminate or suspend your account for violations of these Terms, fraudulent activity, or any behavior detrimental to other users or the platform. Upon termination, your right to use the Service ceases immediately.',
  },
  {
    title: '10. Governing Law',
    content: 'These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Mohali/Chandigarh, Punjab, India.',
  },
  {
    title: '11. Contact',
    content: 'For questions about these Terms, contact Zentrox Technologies at contact.zentroxtech@gmail.com or +91 89881 83513.',
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-24 pb-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <div className="z-badge mb-4">Legal</div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">Terms of Service</h1>
            <p className="text-z-muted text-sm">Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="text-z-muted text-sm mt-2">
              Please read these Terms of Service carefully before using the Zentrox Technologies platform.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {TERMS.map(term => (
              <div key={term.title} className="glass-card p-6">
                <h2 className="text-sm font-bold text-white mb-2">{term.title}</h2>
                <p className="text-sm text-z-muted leading-relaxed">{term.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

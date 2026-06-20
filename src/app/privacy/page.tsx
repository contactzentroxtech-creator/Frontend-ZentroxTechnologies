import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — Zentrox Technologies',
  description: 'Privacy Policy for Zentrox Technologies — how we collect, use, and protect your data.',
  robots: { index: true },
};

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us, such as when you submit a contact form, register for an account, enroll in a course, or apply for an internship. This includes your name, email address, phone number, and any other information you choose to provide.

We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:
- Respond to your inquiries and provide customer support
- Process course enrollments and internship applications
- Send transactional emails including certificates and notifications
- Improve our services and website experience
- Send marketing communications (with your consent)
- Comply with legal obligations`,
  },
  {
    title: '3. Data Sharing',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist in operating our website and services, subject to confidentiality agreements. These include cloud hosting providers, email service providers, and payment processors (Razorpay, Stripe).`,
  },
  {
    title: '4. Data Security',
    content: `We implement industry-standard security measures including SSL encryption, hashed passwords, JWT authentication, and secure API design. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: '5. Cookies',
    content: `We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences. Essential cookies required for the website to function properly cannot be disabled.`,
  },
  {
    title: '6. Your Rights',
    content: `You have the right to access, update, or delete your personal information at any time. To exercise these rights, contact us at contact.zentroxtech@gmail.com. We will respond to your request within 30 days.`,
  },
  {
    title: '7. Third-Party Links',
    content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to review their privacy policies independently.`,
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a prominent notice on our website. Continued use of our services after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '9. Contact Us',
    content: `If you have any questions about this Privacy Policy, please contact us at:

Zentrox Technologies
Email: contact.zentroxtech@gmail.com
Phone: +91 89881 83513
Location: Mohali & Chandigarh, Punjab, India`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-24 pb-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <div className="z-badge mb-4">Legal</div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">Privacy Policy</h1>
            <p className="text-z-muted text-sm">Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="text-z-muted text-sm mt-2">
              Zentrox Technologies ("we", "our", "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {SECTIONS.map(section => (
              <div key={section.title} className="glass-card p-6">
                <h2 className="text-base font-bold text-white mb-3">{section.title}</h2>
                <p className="text-sm text-z-muted leading-relaxed whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

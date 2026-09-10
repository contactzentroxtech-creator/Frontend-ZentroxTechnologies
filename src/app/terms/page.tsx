import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Zentrox Technologies",
  description:
    "Read the Terms of Service for Zentrox Technologies. Understand the terms and conditions for using our website and services.",
  alternates: {
    canonical: "https://zentroxtechnologies.com/terms",
  },
  openGraph: {
    title: "Terms of Service | Zentrox Technologies",
    description:
      "Terms and conditions for using Zentrox Technologies website and services.",
    url: "https://zentroxtechnologies.com/terms",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FDF8F3] pt-20">
        <section className="px-4 py-20 sm:py-24 md:px-6 md:py-28 lg:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <span className="text-xs font-medium uppercase tracking-wider text-blue-600">
                Legal
              </span>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Terms of Service
              </h1>
              <p className="mt-3 text-sm text-slate-500">
                Last updated: January 2026
              </p>
            </div>

            <div className="card-cream space-y-8 p-6 sm:p-10">
              <section>
                <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  By accessing or using the Zentrox Technologies website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">2. Services</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Zentrox Technologies provides software development, website development, mobile app development, SaaS development, AI integration, SEO, digital marketing, UI/UX design, and related technology and digital services. The scope of any specific project will be defined in a separate proposal or agreement.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">3. Use of Website</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the website. Prohibited activities include:
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Violating any applicable laws or regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Attempting to gain unauthorized access to our systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Transmitting harmful or malicious content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Using our website for spam or unsolicited communications</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">4. Intellectual Property</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  All content on the Zentrox Technologies website, including text, graphics, logos, images, and software, is the property of Zentrox Technologies or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written permission.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">5. Client Projects</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  For client projects, specific terms related to scope, deliverables, payment schedules, timelines, revisions, and intellectual property rights will be defined in a separate project agreement. These Terms of Service apply in addition to any project-specific agreement.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">6. Payment Terms</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Payment terms for services will be specified in individual project proposals or agreements. Unless otherwise agreed, we may require advance payment or milestone-based payments. All fees are exclusive of applicable taxes unless stated otherwise.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">7. Limitation of Liability</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Zentrox Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our website or services. Our total liability shall not exceed the amount paid by you for the specific service in question.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">8. Warranty Disclaimer</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Our website and services are provided "as is" without warranty of any kind, either express or implied. We do not guarantee that the website will be error-free, uninterrupted, or free of viruses or other harmful components.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">9. Modifications to Terms</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our website or services after any changes constitutes your acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">10. Governing Law</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Punjab, India.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">11. Contact Us</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-3 rounded-xl border border-[#F0E6D8] bg-[#FDF8F3] p-4 text-sm text-slate-600">
                  <p><strong>Email:</strong> contact.zentroxtech@gmail.com</p>
                  <p className="mt-1"><strong>Phone:</strong> +91 89881 83513</p>
                  <p className="mt-1"><strong>Location:</strong> Mohali & Chandigarh, Punjab, India</p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

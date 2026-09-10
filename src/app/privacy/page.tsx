import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Zentrox Technologies",
  description:
    "Read the Privacy Policy of Zentrox Technologies. Learn how we collect, use, and protect your information when you use our website and services.",
  alternates: {
    canonical: "https://zentroxtechnologies.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Zentrox Technologies",
    description:
      "Learn how Zentrox Technologies collects, uses, and protects your information.",
    url: "https://zentroxtechnologies.com/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
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
                Privacy Policy
              </h1>
              <p className="mt-3 text-sm text-slate-500">
                Last updated: January 2026
              </p>
            </div>

            <div className="card-cream space-y-8 p-6 sm:p-10">
              <section>
                <h2 className="text-xl font-bold text-slate-900">1. Introduction</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Zentrox Technologies ("we", "our", "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">2. Information We Collect</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  We may collect the following types of information:
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span><strong>Personal Information:</strong> Name, email address, phone number, and other contact details you provide when filling out forms or contacting us.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span><strong>Business Information:</strong> Project details, budget range, and business requirements shared with us during consultations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, and pages visited.</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">3. How We Use Your Information</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  We use the information we collect to:
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Respond to your inquiries and provide requested services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Send project updates, proposals, and relevant communications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Improve our website, services, and customer experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Comply with legal obligations and prevent fraud</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">4. Information Sharing</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only with:
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Trusted service providers who assist us in operating our website and delivering services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Legal authorities when required by law</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">5. Data Security</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">6. Cookies</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Our website may use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can control cookies through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">7. Your Rights</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  You have the right to:
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Access and request a copy of your personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Request correction of inaccurate information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Request deletion of your personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span>Opt-out of marketing communications</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">8. Contact Us</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  If you have any questions about this Privacy Policy or how we handle your information, please contact us at:
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

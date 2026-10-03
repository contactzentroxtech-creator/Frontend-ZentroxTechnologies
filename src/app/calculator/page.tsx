import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Calculator,
  Zap,
  ShieldCheck,
  Clock,
  TrendingUp,
  Award,
  Search,
  Smartphone,
  Globe,
  Code2,
  Palette,
  Megaphone,
  Sparkles,
} from "lucide-react";
import PricingWizard from "@/components/sections/PricingWizard";

/* ═══════════════════════════════════════════════════════════════
   SEO METADATA
═══════════════════════════════════════════════════════════════ */
export const metadata: Metadata = {
  title:
    "IT Services Budget Calculator | Website & App Cost Estimator India",
  description:
    "Free IT services budget calculator for website development, mobile app, SEO and digital marketing. Get instant cost estimate for your project in India. No signup required. Transparent pricing from Zentrox Technologies.",
  keywords: [
    "IT services budget calculator",
    "website cost calculator India",
    "web development cost calculator",
    "mobile app cost calculator",
    "app development cost calculator",
    "SEO price calculator",
    "digital marketing budget calculator",
    "website development cost India",
    "software development cost estimator",
    "Google Ads cost calculator",
    "Meta Ads cost calculator",
    "e-commerce website cost India",
    "custom software cost India",
    "SaaS development cost India",
    "website cost calculator Mohali",
    "IT services calculator Chandigarh",
  ],
  alternates: {
    canonical: "https://zentroxtechnologies.com/calculator",
  },
  openGraph: {
    title: "IT Services Budget Calculator | Zentrox Technologies",
    description:
      "Get instant cost estimate for website, mobile app, SEO, digital marketing and software projects. Free calculator — no signup required.",
    url: "https://zentroxtechnologies.com/calculator",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zentrox Technologies IT Services Budget Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Services Budget Calculator | Zentrox Technologies",
    description:
      "Instant cost estimate for website, app, SEO and digital marketing projects in India.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/* ═══════════════════════════════════════════════════════════════
   CALCULATOR PAGE
═══════════════════════════════════════════════════════════════ */
export default function CalculatorPage() {
  /* ─── FAQ Schema ────────────────────────────── */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a website cost in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A basic website in India costs ₹7,999 to ₹15,999 with 1-5 pages. A business website with 15 pages, CMS and blog costs ₹15,999 to ₹29,999. E-commerce stores with payment integration start from ₹49,999. Final cost depends on pages, features and design complexity.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a mobile app cost in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mobile app development in India starts from ₹79,999 for a basic Android app. Cross-platform apps (iOS + Android with React Native) cost ₹89,999+. Complex apps with payment integration, push notifications, user authentication and admin dashboard cost ₹1,50,000+.",
        },
      },
      {
        "@type": "Question",
        name: "What is the cost of SEO services in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SEO services in India start from ₹7,999/month for basic SEO with 10 keywords. Advanced SEO with 25 keywords, content marketing and link building costs ₹15,999/month. Enterprise SEO with 50+ keywords costs ₹29,999/month.",
        },
      },
      {
        "@type": "Question",
        name: "How much does Google Ads management cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Google Ads management starts from ₹9,999/month. Ad spend is separate and paid directly to Google. So total budget = management fee + ad spend. Meta Ads management also starts from ₹9,999/month with separate ad spend.",
        },
      },
      {
        "@type": "Question",
        name: "Is the budget calculator free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our IT services budget calculator is completely free. No signup or credit card required. You get instant estimates for all our services including website development, mobile apps, SEO and digital marketing.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate is this calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The calculator provides accurate ballpark estimates based on real market pricing in India. For a detailed, final quote, our team reviews your exact requirements and sends you a personalized proposal within 24 hours.",
        },
      },
    ],
  };

  /* ─── Breadcrumb Schema ─────────────────────── */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://zentroxtechnologies.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "IT Services Budget Calculator",
        item: "https://zentroxtechnologies.com/calculator",
      },
    ],
  };

  /* ─── Service Schema ───────────────────────── */
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "IT Services Cost Estimation",
    provider: {
      "@type": "Organization",
      name: "Zentrox Technologies",
      url: "https://zentroxtechnologies.com",
      telephone: "+91-89881-83513",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mohali",
        addressLocality: "Mohali",
        addressRegion: "Punjab",
        postalCode: "140308",
        addressCountry: "IN",
      },
    },
    areaServed: [
      "Mohali",
      "Chandigarh",
      "Punjab",
      "Haryana",
      "Delhi NCR",
      "India",
      "USA",
      "UK",
      "Canada",
      "Australia",
      "UAE",
      "Singapore",
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      priceRange: "₹7,999 - ₹1,99,999",
    },
  };

  return (
    <main className="bg-white">
      {/* ═══════════════════════════════════════════════
          SCHEMA MARKUP
      ═══════════════════════════════════════════════ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ═══════════════════════════════════════════════
          HERO — H1 with main keyword
      ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#FDF8F3] pt-12 pb-16 md:pt-16 md:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-blue-100/60 blur-[120px]" />
          <div className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-purple-100/50 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center justify-center gap-2 text-xs text-slate-500"
          >
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-semibold">Calculator</span>
          </nav>

          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
              <Calculator size={13} />
              Free Budget Calculator
            </div>

            {/* H1 with Main Keyword */}
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              IT Services Budget Calculator
              <br />
              <span className="gradient-text">Get Instant Cost Estimate</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 lg:text-lg">
              Calculate the cost of your <strong>website development</strong>,{" "}
              <strong>mobile app</strong>, <strong>SEO services</strong>,{" "}
              <strong>digital marketing</strong> or{" "}
              <strong>custom software</strong> project in India. Free, instant
              and transparent pricing from Zentrox Technologies — no hidden
              charges.
            </p>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
              <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700">
                <Zap size={14} className="text-blue-600" />
                Instant Estimate
              </span>
              <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700">
                <ShieldCheck size={14} className="text-emerald-500" />
                No Signup Required
              </span>
              <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700">
                <CheckCircle2 size={14} className="text-emerald-500" />
                100% Transparent
              </span>
              <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700">
                <Clock size={14} className="text-purple-500" />
                Response in 24 Hours
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CALCULATOR COMPONENT
      ═══════════════════════════════════════════════ */}
      <PricingWizard />

      {/* ═══════════════════════════════════════════════
          SEO CONTENT — 800+ words
      ═══════════════════════════════════════════════ */}
      <section className="relative bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* How It Works */}
          <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            How Our IT Services Budget Calculator Works
          </h2>

          <p className="mt-5 text-base leading-relaxed text-slate-600 lg:text-lg">
            Zentrox Technologies&apos; <strong>IT services budget calculator</strong>{" "}
            helps businesses in India and worldwide get an instant cost estimate
            for their digital projects. Whether you need a{" "}
            <strong>website development cost calculator</strong>, a{" "}
            <strong>mobile app cost estimator</strong>, or an{" "}
            <strong>SEO price calculator</strong> — our tool gives you a
            transparent cost range in seconds. No signup, no hidden fees, no
            pressure.
          </p>

          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Simply select your service category, choose the specific service,
            add optional features, and see your estimate update live. You can
            also apply a referral code (if you have one from our team) to get up
            to 20% discount on your project. Once you&apos;re happy with the
            estimate, submit your details and our team will send you a
            personalized, detailed quote within 24 hours.
          </p>

          {/* What You Can Calculate */}
          <h3 className="mt-12 text-2xl font-bold text-slate-900 sm:text-3xl">
            What Can You Calculate?
          </h3>

          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Our calculator covers all major IT services offered by Zentrox
            Technologies:
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                icon: Globe,
                title: "Website Development Cost",
                price: "₹7,999 – ₹79,999+",
                desc: "Basic, business, e-commerce and custom web apps",
                color: "#2563eb",
              },
              {
                icon: Smartphone,
                title: "Mobile App Development Cost",
                price: "₹79,999 – ₹1,99,999",
                desc: "Android, iOS and cross-platform apps",
                color: "#7c3aed",
              },
              {
                icon: Search,
                title: "SEO Services Cost",
                price: "₹7,999 – ₹29,999/month",
                desc: "On-page, technical and enterprise SEO",
                color: "#059669",
              },
              {
                icon: Megaphone,
                title: "Digital Marketing Cost",
                price: "₹7,999 – ₹24,999/month",
                desc: "Social media, content and email marketing",
                color: "#dc2626",
              },
              {
                icon: TrendingUp,
                title: "Google Ads & Meta Ads",
                price: "₹9,999+/month + ad spend",
                desc: "Paid campaigns on Google, FB and Instagram",
                color: "#ea580c",
              },
              {
                icon: Code2,
                title: "Custom Software / CRM / ERP",
                price: "₹99,999 – ₹1,99,999+",
                desc: "Custom software, SaaS platforms, dashboards",
                color: "#0891b2",
              },
              {
                icon: Palette,
                title: "UI/UX Design Cost",
                price: "₹9,999 – ₹19,999",
                desc: "Wireframes, design systems, prototypes",
                color: "#be185d",
              },
              {
                icon: Sparkles,
                title: "AI Integration Cost",
                price: "₹29,999 – ₹49,999",
                desc: "AI chatbots, workflow automation, analytics",
                color: "#4f46e5",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200/70 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: `${item.color}12`,
                      color: item.color,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-base font-extrabold text-blue-600">
                    {item.price}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detailed Guide */}
          <h3 className="mt-12 text-2xl font-bold text-slate-900 sm:text-3xl">
            Website Development Cost in India — Complete Guide 2026
          </h3>

          <p className="mt-4 text-base leading-relaxed text-slate-600">
            <strong>Website development cost in India</strong> depends on pages,
            design complexity, features, integrations and timeline. Here&apos;s a
            breakdown of typical pricing:
          </p>

          <ul className="mt-4 space-y-2 text-base text-slate-600">
            <li>
              <strong>Starter Website (1-5 pages):</strong> ₹7,999 – ₹15,999 —
              Perfect for personal projects, portfolios and landing pages.
            </li>
            <li>
              <strong>Business Website (5-15 pages):</strong> ₹15,999 – ₹29,999
              — Includes CMS, blog and advanced SEO.
            </li>
            <li>
              <strong>Premium Website (15-30 pages):</strong> ₹29,999+ — Custom
              design with full feature set.
            </li>
            <li>
              <strong>E-Commerce Store:</strong> ₹49,999+ — Product catalog,
              payment gateway, order management.
            </li>
            <li>
              <strong>Custom Web App:</strong> ₹79,999+ — Dashboards,
              integrations, user authentication.
            </li>
          </ul>

          <h3 className="mt-12 text-2xl font-bold text-slate-900 sm:text-3xl">
            Mobile App Development Cost in India
          </h3>

          <p className="mt-4 text-base leading-relaxed text-slate-600">
            <strong>Mobile app development cost</strong> varies by platform and
            features:
          </p>

          <ul className="mt-4 space-y-2 text-base text-slate-600">
            <li>
              <strong>Basic Android App:</strong> ₹79,999 — Single platform,
              essential features
            </li>
            <li>
              <strong>iOS App:</strong> ₹89,999 — Apple App Store deployment
            </li>
            <li>
              <strong>Cross-Platform (React Native):</strong> ₹89,999 — iOS +
              Android from one codebase
            </li>
            <li>
              <strong>Complex App:</strong> ₹1,50,000+ — Custom features, admin
              dashboard, integrations
            </li>
          </ul>

          <h3 className="mt-12 text-2xl font-bold text-slate-900 sm:text-3xl">
            SEO Services Cost — Monthly Pricing in India
          </h3>

          <p className="mt-4 text-base leading-relaxed text-slate-600">
            <strong>SEO services in India</strong> are typically charged
            monthly:
          </p>

          <ul className="mt-4 space-y-2 text-base text-slate-600">
            <li>
              <strong>SEO Starter:</strong> ₹7,999/month — 10 keywords, on-page
              SEO
            </li>
            <li>
              <strong>SEO Growth:</strong> ₹15,999/month — 25 keywords, content
              + link building
            </li>
            <li>
              <strong>SEO Enterprise:</strong> ₹29,999/month — 50+ keywords,
              full strategy
            </li>
          </ul>

          <h3 className="mt-12 text-2xl font-bold text-slate-900 sm:text-3xl">
            Google Ads & Meta Ads — Management Cost
          </h3>

          <p className="mt-4 text-base leading-relaxed text-slate-600">
            <strong>Google Ads management</strong> and{" "}
            <strong>Meta Ads management</strong> both start from{" "}
            <strong>₹9,999/month</strong> for our management fee. Ad spend is
            separate and paid directly to Google or Meta. For example, if you
            want ₹50,000 ad spend per month, your total investment will be
            ₹9,999 (management) + ₹50,000 (ad spend) = ₹59,999.
          </p>

          <h3 className="mt-12 text-2xl font-bold text-slate-900 sm:text-3xl">
            Why Choose Zentrox Technologies?
          </h3>

          <ul className="mt-4 space-y-3 text-base text-slate-600">
            <li className="flex items-start gap-3">
              <CheckCircle2
                size={18}
                className="mt-1 flex-shrink-0 text-emerald-500"
              />
              <span>
                <strong>MSME-registered company</strong> based in Mohali &
                Chandigarh, Punjab
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2
                size={18}
                className="mt-1 flex-shrink-0 text-emerald-500"
              />
              <span>
                <strong>Transparent pricing</strong> — no hidden charges, no
                surprises
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2
                size={18}
                className="mt-1 flex-shrink-0 text-emerald-500"
              />
              <span>
                <strong>100+ projects delivered</strong> for businesses in India
                and worldwide
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2
                size={18}
                className="mt-1 flex-shrink-0 text-emerald-500"
              />
              <span>
                <strong>Post-launch support</strong> included in every project
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2
                size={18}
                className="mt-1 flex-shrink-0 text-emerald-500"
              />
              <span>
                <strong>24-hour response time</strong> for all inquiries
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2
                size={18}
                className="mt-1 flex-shrink-0 text-emerald-500"
              />
              <span>
                <strong>On-time delivery</strong> — we deliver what we promise
              </span>
            </li>
          </ul>

          {/* FAQ Section */}
          <h3 className="mt-12 text-2xl font-bold text-slate-900 sm:text-3xl">
            Frequently Asked Questions
          </h3>

          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-6">
              <h4 className="text-lg font-bold text-slate-900">
                How much does a website cost in India?
              </h4>
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                A basic website in India costs ₹7,999 to ₹15,999. Business
                websites with 15 pages, CMS and blog cost ₹15,999 to ₹29,999.
                E-commerce stores start from ₹49,999. Final cost depends on
                pages, features and design complexity.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-6">
              <h4 className="text-lg font-bold text-slate-900">
                How much does a mobile app cost in India?
              </h4>
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                Mobile app development starts from ₹79,999 for a basic Android
                app. Cross-platform apps cost ₹89,999+. Complex custom apps
                with payment, notifications and dashboards cost ₹1,50,000+.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-6">
              <h4 className="text-lg font-bold text-slate-900">
                What is the cost of SEO services?
              </h4>
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                SEO services in India start from ₹7,999/month for basic SEO with
                10 keywords. Advanced SEO packages cost ₹15,999-₹29,999/month
                depending on keywords and competition.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-6">
              <h4 className="text-lg font-bold text-slate-900">
                How much does Google Ads management cost?
              </h4>
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                Google Ads management starts from ₹9,999/month. Ad spend is
                separate and paid directly to Google. Total budget = management
                fee + ad spend.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-6">
              <h4 className="text-lg font-bold text-slate-900">
                Is the budget calculator free?
              </h4>
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                Yes, our IT services budget calculator is completely free. No
                signup or credit card required. You get instant estimates for
                all our services including website development, mobile apps, SEO
                and digital marketing.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-6">
              <h4 className="text-lg font-bold text-slate-900">
                How accurate is this calculator?
              </h4>
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                The calculator provides accurate ballpark estimates based on
                real market pricing in India. For a detailed, final quote, our
                team reviews your exact requirements and sends you a
                personalized proposal within 24 hours.
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-12 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-center shadow-2xl sm:p-12">
            <Award size={40} className="mx-auto mb-4 text-white" />
            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to Get a Detailed Quote?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-blue-50 sm:text-base">
              Our team at Zentrox Technologies will review your requirements and
              send you a personalized proposal within 24 hours.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-lg transition-all hover:-translate-y-1"
              >
                Contact Us
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/20"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

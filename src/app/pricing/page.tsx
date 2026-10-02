import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  Rocket,
  Crown,
  ShoppingBag,
  Smartphone,
  Code2,
  Info,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | Web, Mobile & Software Development Plans",
  description:
    "Transparent pricing for website development, mobile apps, custom software and digital marketing services. Choose a plan or get a custom quote from Zentrox Technologies.",
  alternates: { canonical: "https://zentroxtechnologies.com/pricing" },
};

/* ═══════════════════════════════════════════════════════════════
   PLANS
═══════════════════════════════════════════════════════════════ */
const PLANS = [
  {
    name: "Starter Website",
    desc: "Perfect for personal projects & small businesses getting online.",
    price: "₹9,999",
    period: "one-time",
    icon: Zap,
    color: "#2563eb",
    popular: false,
    idealFor: "Freelancers, portfolios, landing pages",
    deliveryTime: "5-7 days",
    revisions: "2 revisions",
    features: [
      "Up to 5 pages",
      "Mobile responsive design",
      "Basic on-page SEO",
      "Contact form",
      "WhatsApp integration",
      "3 months support",
    ],
  },
  {
    name: "Business Website",
    desc: "Ideal for growing businesses that need a strong online presence.",
    price: "₹24,999",
    period: "one-time",
    icon: Rocket,
    color: "#7c3aed",
    popular: true,
    idealFor: "Small businesses, agencies, service providers",
    deliveryTime: "10-15 days",
    revisions: "5 revisions",
    features: [
      "Up to 15 pages",
      "Custom UI/UX design",
      "CMS integration (blog, gallery)",
      "Advanced SEO setup",
      "Google Analytics",
      "Contact + lead forms",
      "6 months support",
    ],
  },
  {
    name: "E-Commerce Store",
    desc: "Complete online store with product catalog and payments.",
    price: "₹49,999",
    period: "starting",
    icon: ShoppingBag,
    color: "#ea580c",
    popular: false,
    idealFor: "Retailers, D2C brands, product sellers",
    deliveryTime: "20-30 days",
    revisions: "Unlimited (30 days)",
    features: [
      "Unlimited products",
      "Payment gateway (Razorpay/Stripe)",
      "Order management system",
      "Inventory tracking",
      "Customer accounts",
      "Coupons & discounts",
      "Shipping integration",
      "1 year support",
    ],
  },
  {
    name: "Mobile App",
    desc: "Android + iOS app built with modern tech stack.",
    price: "₹89,999",
    period: "starting",
    icon: Smartphone,
    color: "#0891b2",
    popular: false,
    idealFor: "Startups, service apps, booking apps",
    deliveryTime: "30-45 days",
    revisions: "Unlimited (45 days)",
    features: [
      "iOS + Android (React Native)",
      "Admin dashboard",
      "Push notifications",
      "User authentication",
      "Payment integration",
      "App Store submission",
      "6 months support",
    ],
  },
  {
    name: "Custom Software",
    desc: "Tailored software, CRM, ERP, SaaS platform for your business.",
    price: "₹1,49,999",
    period: "starting",
    icon: Code2,
    color: "#be185d",
    popular: false,
    idealFor: "Enterprises, SaaS startups, custom tools",
    deliveryTime: "45-90 days",
    revisions: "Unlimited (90 days)",
    features: [
      "Custom features",
      "Role-based access",
      "API integration",
      "Scalable architecture",
      "Cloud deployment",
      "Admin + user dashboards",
      "1 year support",
    ],
  },
  {
    name: "Enterprise",
    desc: "Large-scale solution with dedicated team and priority support.",
    price: "Custom",
    period: "quote",
    icon: Crown,
    color: "#059669",
    popular: false,
    idealFor: "Enterprises, multi-tenant SaaS, complex systems",
    deliveryTime: "Custom timeline",
    revisions: "As per contract",
    features: [
      "Dedicated team",
      "Custom architecture",
      "Advanced integrations",
      "Security & compliance",
      "SLA-backed support",
      "Dedicated project manager",
      "24/7 priority support",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   FACTORS THAT AFFECT PRICING
═══════════════════════════════════════════════════════════════ */
const FACTORS = [
  {
    icon: Info,
    title: "Number of Pages / Screens",
    desc: "More pages = more design, content and development time. Each additional page adds to the total cost.",
    color: "#2563eb",
  },
  {
    icon: Zap,
    title: "Complexity of Features",
    desc: "Simple website vs. dashboard, payments, user login, notifications and third-party integrations.",
    color: "#7c3aed",
  },
  {
    icon: TrendingUp,
    title: "Timeline",
    desc: "Urgent delivery (rush) can increase the cost by 20–40%. Standard timelines keep pricing lower.",
    color: "#ea580c",
  },
  {
    icon: Code2,
    title: "Third-Party Integrations",
    desc: "Payment gateways, CRMs, APIs, AI tools — each integration adds to the final cost.",
    color: "#0891b2",
  },
  {
    icon: Crown,
    title: "Post-Launch Support",
    desc: "More support months = higher value. Can be quoted separately based on your needs.",
    color: "#059669",
  },
  {
    icon: Smartphone,
    title: "Platforms",
    desc: "One platform (web) is cheaper than multi-platform (web + iOS + Android) development.",
    color: "#be185d",
  },
];

export default function PricingPage() {
  return (
    <main className="bg-white">
      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#FDF8F3] pt-12 pb-16 md:pt-16 md:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-blue-100/60 blur-[120px]" />
          <div className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-purple-100/50 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
            Our Pricing
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Simple, Transparent{" "}
            <span className="gradient-text">Pricing</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
            Choose the plan that fits your needs. Every project is unique — the
            final quote depends on your exact requirements.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PLANS GRID
      ═══════════════════════════════════════════ */}
      <section className="relative bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PLANS.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-3xl border p-6 transition-all hover:-translate-y-2 sm:p-8 ${
                    plan.popular
                      ? "border-blue-500 bg-gradient-to-br from-blue-50/60 to-purple-50/60 shadow-2xl shadow-blue-500/20"
                      : "border-slate-200 bg-white hover:shadow-xl"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Most Popular
                    </span>
                  )}

                  {/* Icon */}
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${plan.color}12`,
                      color: plan.color,
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  {/* Title + Desc */}
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{plan.desc}</p>

                  {/* Price */}
                  <div className="mt-6">
                    <p className="text-3xl font-extrabold text-slate-900">
                      {plan.price}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{plan.period}</p>
                  </div>

                  {/* Quick Facts */}
                  <div className="mt-4 space-y-1.5 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                    <p className="text-[11px] text-slate-700">
                      <span className="font-bold">Ideal for:</span>{" "}
                      {plan.idealFor}
                    </p>
                    <p className="text-[11px] text-slate-700">
                      <span className="font-bold">Delivery:</span>{" "}
                      {plan.deliveryTime}
                    </p>
                    <p className="text-[11px] text-slate-700">
                      <span className="font-bold">Revisions:</span>{" "}
                      {plan.revisions}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 flex-shrink-0 text-emerald-500"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-1 ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25"
                        : "border border-slate-200 bg-white text-slate-900 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {plan.price === "Custom" ? "Request Quote" : "Get Started"}
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FACTORS AFFECTING PRICING
      ═══════════════════════════════════════════ */}
      <section className="relative bg-[#FDF8F3] px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/60 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-blue-700">
              <Info size={12} />
              Good to Know
            </div>
            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              What Affects the Final Price?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 lg:text-lg">
              Every project is different. These factors determine the exact
              cost of your project.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FACTORS.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-slate-200/70 bg-white p-6 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${f.color}12`,
                      color: f.color,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CUSTOM CTA
      ═══════════════════════════════════════════ */}
      <section className="relative bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-blue-50/60 via-white to-purple-50/60 p-8 text-center sm:p-12">
            <div className="mx-auto max-w-2xl">
              <h3 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Need a Custom Solution?
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
                Every business is unique. Tell us your requirements and
                Zentrox Technologies will prepare a tailored quote for your
                project.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-slate-800"
                >
                  Get Custom Quote
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600"
                >
                  View Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

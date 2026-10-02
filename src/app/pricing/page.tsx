import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Zap, Rocket, Crown } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | Web, Mobile & Software Development Plans",
  description:
    "Transparent pricing for website development, mobile apps, custom software and digital marketing services. Choose a plan or get a custom quote.",
  alternates: { canonical: "https://zentroxtechnologies.com/pricing" },
};

const PLANS = [
  {
    name: "Starter",
    desc: "Perfect for small businesses and personal projects.",
    price: "₹9,999",
    period: "starting",
    icon: Zap,
    color: "#2563eb",
    features: [
      "1-5 Pages Website",
      "Responsive Design",
      "Basic SEO Setup",
      "Contact Form",
      "3 Months Support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Business",
    desc: "Ideal for growing businesses and startups.",
    price: "₹19,999",
    period: "starting",
    icon: Rocket,
    color: "#7c3aed",
    features: [
      "Up to 15 Pages Website",
      "Mobile Responsive",
      "CMS Integration",
      "Advanced SEO Setup",
      "UI/UX Design",
      "6 Months Support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    desc: "For large businesses with custom requirements.",
    price: "Custom",
    period: "quote",
    icon: Crown,
    color: "#ea580c",
    features: [
      "Unlimited Pages",
      "Custom Web Application",
      "Advanced Integrations",
      "E-Commerce / SaaS",
      "Priority Support",
      "12 Months Support",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
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
            Choose the plan that fits your needs. No hidden fees. Just great value
            and real results.
          </p>
        </div>
      </section>

      {/* PLANS */}
      <section className="relative bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-3xl border p-8 transition-all hover:-translate-y-2 ${
                    plan.popular
                      ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-2xl shadow-blue-500/20"
                      : "border-slate-200 bg-white hover:shadow-xl"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Most Popular
                    </span>
                  )}

                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${plan.color}12`,
                      color: plan.color,
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{plan.desc}</p>

                  <div className="mt-6">
                    <p className="text-3xl font-extrabold text-slate-900">
                      {plan.price}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{plan.period}</p>
                  </div>

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

                  <Link
                    href="/contact"
                    className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-1 ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25"
                        : "border border-slate-200 bg-white text-slate-900 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* CUSTOM CTA */}
          <div className="mt-16 rounded-3xl border border-slate-200/70 bg-gradient-to-r from-blue-50/60 via-white to-purple-50/60 p-8 text-center sm:p-12">
            <h3 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Need a Custom Solution?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
              We build tailored solutions for unique business requirements. Let's
              discuss your project and get a custom quote.
            </p>
            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-slate-800"
            >
              Contact Us
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

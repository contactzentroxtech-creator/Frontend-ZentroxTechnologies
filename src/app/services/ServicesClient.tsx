"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Smartphone,
  Code2,
  Palette,
  BarChart3,
  Bot,
  Cloud,
  Cable,
  Megaphone,
  Database,
  CheckCircle2,
} from "lucide-react";

const ALL_SERVICES = [
  { id: "web", icon: Globe, color: "#2563eb", title: "Website Development", desc: "Fast, mobile-responsive, SEO-optimized websites that help businesses build credibility and generate leads.", features: ["Responsive Design", "SEO Optimized", "Fast Loading"] },
  { id: "android", icon: Smartphone, color: "#7c3aed", title: "Mobile App Development", desc: "High-performance Android and iOS applications with intuitive interfaces and smooth user experiences.", features: ["iOS & Android", "Cross-Platform", "App Store Deploy"] },
  { id: "software", icon: Code2, color: "#0f766e", title: "Custom Software Development", desc: "Scalable, secure and custom software solutions designed around your business processes.", features: ["Scalable Architecture", "Secure Systems", "Custom Workflows"] },
  { id: "design", icon: Palette, color: "#0891b2", title: "UI/UX Design", desc: "Human-centered design that makes complex products simple to use.", features: ["User Research", "Wireframes", "Design Systems"] },
  { id: "seo", icon: BarChart3, color: "#ea580c", title: "SEO & Digital Marketing", desc: "Data-driven strategies that improve visibility, attract traffic and generate more leads.", features: ["On-Page SEO", "Technical SEO", "Analytics"] },
  { id: "ai", icon: Bot, color: "#4f46e5", title: "AI Integration & Automation", desc: "Practical AI integrations and automation systems that reduce repetitive work.", features: ["AI Chatbots", "Workflow Automation", "Smart Analytics"] },
  { id: "saas", icon: Cloud, color: "#be185d", title: "SaaS Development", desc: "From MVP to full-scale SaaS products, we handle multi-tenancy, subscriptions and dashboards.", features: ["Multi-Tenancy", "Subscriptions", "Scalable Infra"] },
  { id: "crm", icon: Database, color: "#0369a1", title: "CRM Development", desc: "Custom CRM systems designed around your sales process.", features: ["Lead Management", "Sales Pipeline", "Reports"] },
  { id: "api", icon: Cable, color: "#059669", title: "API Integration", desc: "Reliable API integrations that connect your tools and workflows.", features: ["REST APIs", "Payment Gateways", "Data Sync"] },
  { id: "marketing", icon: Megaphone, color: "#dc2626", title: "Digital Marketing", desc: "Smart digital campaigns that strengthen your brand and generate leads.", features: ["Social Media", "Content Marketing", "Paid Campaigns"] },
];

export default function ServicesClient() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-[#FDF8F3] pt-12 pb-16 md:pt-16 md:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-blue-100/60 blur-[120px]" />
          <div className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-purple-100/50 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Digital Solutions for{" "}
            <span className="gradient-text">Modern Businesses</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
            We offer a complete range of digital services to help you build, scale and succeed.
          </p>
        </div>
      </section>

      <section className="relative bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
                  whileHover={{ y: -6 }}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200/70 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-lg sm:p-7"
                >
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${service.color}12`, color: service.color }}
                  >
                    <Icon size={22} />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 sm:text-lg">
                    {service.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {service.desc}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle2 size={12} className="flex-shrink-0 text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/contact?service=${service.id}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-all group-hover:gap-3"
                  >
                    Learn More <ArrowRight size={15} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 px-8 py-14 text-center shadow-2xl sm:px-12">
            <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
              Have a Project in Mind?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-blue-50 sm:text-base">
              Let's discuss your ideas and turn them into a powerful digital solution.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-blue-700 shadow-lg transition-all hover:-translate-y-1"
              >
                Get a Free Quote
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-1"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

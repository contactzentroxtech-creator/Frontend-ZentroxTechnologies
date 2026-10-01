"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
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
  Users,
  Megaphone,
  CheckCircle2,
  Database,
  Layers,
} from "lucide-react";
import { useLang } from "@/lib/providers";

/* =========================================================
   ALL SERVICES DATA
========================================================= */

const ALL_SERVICES = [
  {
    id: "web",
    icon: Globe,
    color: "#2563eb",
    titleKey: "service.web.title",
    longKey: "service.web.long",
    titleFB: "Website Development",
    longFB:
      "We design and develop fast, mobile-responsive, SEO-optimized websites that help businesses build credibility, generate leads and grow online. Whether you need a business website, landing page or e-commerce store, we build websites that perform.",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "CMS Integration"],
  },
  {
    id: "android",
    icon: Smartphone,
    color: "#7c3aed",
    titleKey: "service.android.title",
    longKey: "service.android.long",
    titleFB: "Mobile App Development",
    longFB:
      "We build high-performance Android and iOS applications with intuitive interfaces and smooth user experiences. From concept to launch, we handle strategy, design, development, testing and deployment.",
    features: ["iOS & Android", "Cross-Platform", "Push Notifications", "App Store Deploy"],
  },
  {
    id: "software",
    icon: Code2,
    color: "#0f766e",
    titleKey: "service.software.title",
    longKey: "service.software.long",
    titleFB: "Custom Software Development",
    longFB:
      "We build scalable, secure and custom software solutions designed around your business processes. Whether you need internal tools, management systems or industry-specific software, we deliver reliable solutions.",
    features: ["Scalable Architecture", "Secure Systems", "Custom Workflows", "API Integration"],
  },
  {
    id: "design",
    icon: Palette,
    color: "#0891b2",
    titleKey: "service.design.title",
    longKey: "service.design.long",
    titleFB: "UI/UX Design",
    longFB:
      "Human-centered design that makes complex products simple to use. We combine research, strategy and visual design to create digital experiences that users enjoy and businesses benefit from.",
    features: ["User Research", "Wireframes", "Prototyping", "Design Systems"],
  },
  {
    id: "seo",
    icon: BarChart3,
    color: "#ea580c",
    titleKey: "service.seo.title",
    longKey: "service.seo.long",
    titleFB: "SEO & Digital Marketing",
    longFB:
      "Data-driven SEO and digital marketing strategies that improve visibility, attract qualified traffic and generate more leads. We focus on practical, measurable results for your business.",
    features: ["On-Page SEO", "Technical SEO", "Content Strategy", "Analytics"],
  },
  {
    id: "ai",
    icon: Bot,
    color: "#4f46e5",
    titleKey: "service.ai.title",
    longKey: "service.ai.long",
    titleFB: "AI Integration & Automation",
    longFB:
      "Practical AI integrations and automation systems that reduce repetitive work, improve productivity and give your business a competitive edge. From chatbots to workflow automation, we build AI solutions that work.",
    features: ["AI Chatbots", "Workflow Automation", "Smart Analytics", "Custom AI Models"],
  },
  {
    id: "saas",
    icon: Cloud,
    color: "#be185d",
    titleKey: "service.saas.title",
    longKey: "service.saas.long",
    titleFB: "SaaS Development",
    longFB:
      "From MVP to full-scale SaaS products, we help turn your product ideas into reliable digital businesses. We handle multi-tenancy, subscriptions, billing, dashboards and scalable architecture.",
    features: ["Multi-Tenancy", "Subscriptions", "Dashboards", "Scalable Infrastructure"],
  },
  {
    id: "crm",
    icon: Database,
    color: "#0369a1",
    titleKey: "service.crm.title",
    longKey: "service.crm.long",
    titleFB: "CRM Development",
    longFB:
      "Custom CRM systems designed around your sales process. Organize customer data, streamline sales workflows, improve team visibility and build stronger customer relationships.",
    features: ["Lead Management", "Sales Pipeline", "Reports & Analytics", "Team Collaboration"],
  },
  {
    id: "api",
    icon: Cable,
    color: "#059669",
    titleKey: "service.api.title",
    longKey: "service.api.long",
    titleFB: "API Integration",
    longFB:
      "Reliable API integrations that connect your existing tools, platforms and workflows. Payment gateways, third-party services, data syncing — we make your systems work together seamlessly.",
    features: ["REST APIs", "Payment Gateways", "Third-Party Services", "Data Sync"],
  },
  {
    id: "marketing",
    icon: Megaphone,
    color: "#dc2626",
    titleKey: "service.marketing.title",
    longKey: "service.marketing.long",
    titleFB: "Digital Marketing",
    longFB:
      "Smart digital campaigns that strengthen your brand, generate leads and support sustainable growth. We combine SEO, social media, content and paid campaigns for measurable business outcomes.",
    features: ["Social Media", "Content Marketing", "Paid Campaigns", "Brand Strategy"],
  },
];

/* =========================================================
   SERVICE CARD COMPONENT
========================================================= */

function ServiceCard({
  service,
  index,
  inView,
}: {
  service: (typeof ALL_SERVICES)[number];
  index: number;
  inView: boolean;
}) {
  const { t } = useLang();
  const Icon = service.icon;

  return (
    <motion.div
      id={service.id}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="
        group flex h-full flex-col
        overflow-hidden rounded-2xl
        border border-slate-200/70
        bg-white p-6
        transition-all duration-300
        hover:border-blue-200
        hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]
        sm:p-7
      "
    >
      {/* Icon */}
      <div
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundColor: `${service.color}12`,
          color: service.color,
        }}
      >
        <Icon size={22} />
      </div>

      {/* Title */}
      <h3 className="text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-600 sm:text-lg">
        {t(service.titleKey, service.titleFB)}
      </h3>

      {/* Description */}
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
        {t(service.longKey, service.longFB)}
      </p>

      {/* Features */}
      <ul className="mt-4 space-y-1.5">
        {service.features.slice(0, 3).map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-xs text-slate-500"
          >
            <CheckCircle2 size={12} className="flex-shrink-0 text-emerald-500" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Learn More */}
      <Link
        href={`/contact?service=${service.id}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-all group-hover:gap-3"
      >
        {t("services.learn_more", "Learn More")}
        <ArrowRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </motion.div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ServicesClient() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const [filter, setFilter] = useState<string>("all");

  const FILTERS = [
    { id: "all", label: "All Services" },
    { id: "web", label: "Web" },
    { id: "mobile", label: "Mobile" },
    { id: "software", label: "Software" },
    { id: "design", label: "Design" },
    { id: "marketing", label: "Marketing" },
  ];

  const filteredServices =
    filter === "all"
      ? ALL_SERVICES
      : ALL_SERVICES.filter((s) => {
          if (filter === "mobile") return s.id === "android";
          if (filter === "marketing") return s.id === "seo" || s.id === "marketing";
          return s.id === filter;
        });

  return (
    <main className="bg-white">
      {/* ─── HERO SECTION ─────────────────────────── */}
      <section className="relative overflow-hidden bg-[#FDF8F3] pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-blue-100/60 blur-[120px]" />
          <div className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-purple-100/50 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-sm">
              <Layers size={13} />
              {t("services.page.badge", "Our Services")}
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {t("services.page.title1", "Digital Solutions for")}{" "}
              <span className="gradient-text">
                {t("services.page.title2", "Modern Businesses")}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
              {t(
                "services.page.sub",
                "We offer a complete range of digital services to help you build, scale and succeed in the online world."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES GRID ────────────────────────── */}
      <section className="relative bg-white px-4 py-16 sm:py-20 md:px-6 md:py-24">
        <div ref={ref} className="mx-auto max-w-7xl">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-wrap items-center justify-center gap-2"
          >
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`
                  rounded-full border px-5 py-2
                  text-xs font-semibold transition-all duration-300
                  ${
                    filter === f.id
                      ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-600"
                  }
                `}
              >
                {f.label}
              </button>
            ))}
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE ───────────────────────────── */}
      <section className="relative bg-[#FDF8F3] px-4 py-16 sm:py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              {t("services.page.why.title", "Why Choose Zentrox")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              {t(
                "services.page.why.sub",
                "We combine technical expertise with business understanding to deliver solutions that actually work."
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, label: "Expert Team", color: "#2563eb" },
              { icon: CheckCircle2, label: "Quality Work", color: "#0891b2" },
              { icon: BarChart3, label: "Results Driven", color: "#ea580c" },
              { icon: Cable, label: "Ongoing Support", color: "#7c3aed" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-6 text-center"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${item.color}12`,
                      color: item.color,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────── */}
      <section className="relative bg-white px-4 py-16 sm:py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="
              relative overflow-hidden rounded-3xl
              bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700
              px-8 py-14 text-center
              shadow-2xl shadow-blue-600/20
              sm:px-12 sm:py-16
            "
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
                `,
                backgroundSize: "48px 48px",
              }}
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                {t("services.page.cta.title", "Have a Project in Mind?")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-blue-50 sm:text-base">
                {t(
                  "services.page.cta.sub",
                  "Let's discuss your ideas and turn them into a powerful digital solution."
                )}
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="
                    group inline-flex items-center gap-2
                    rounded-full bg-white px-7 py-3.5
                    text-sm font-semibold text-blue-700
                    shadow-lg shadow-black/10
                    transition-all duration-300
                    hover:-translate-y-1 hover:shadow-xl
                  "
                >
                  {t("services.page.cta.primary", "Get a Free Quote")}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/portfolio"
                  className="
                    inline-flex items-center gap-2
                    rounded-full border border-white/30 bg-white/10
                    px-7 py-3.5
                    text-sm font-semibold text-white
                    backdrop-blur-sm
                    transition-all duration-300
                    hover:-translate-y-1 hover:bg-white/20
                  "
                >
                  {t("services.page.cta.secondary", "View Our Work")}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

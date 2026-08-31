"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Smartphone,
  Bot,
  BarChart3,
  Cloud,
  Palette,
  Code2,
  Users,
  Cable,
  Sparkles,
  Megaphone,
  CheckCircle2,
} from "lucide-react";
import { useLang } from "@/lib/providers";
import ScrollTilt from "@/components/ui/ScrollTilt";

const SERVICES = [
  {
    id: "software",
    icon: Code2,
    color: "#2563eb",
    titleKey: "service.software.title",
    descKey: "service.software.desc",
    titleFB: "Software Development",
    descFB: "Scalable custom software designed around your business processes, workflows and operational needs.",
  },
  {
    id: "web",
    icon: Globe,
    color: "#4f46e5",
    titleKey: "service.web.title",
    descKey: "service.web.desc",
    titleFB: "Website Development",
    descFB: "Fast, responsive and conversion-focused websites built to represent your brand and generate business.",
  },
  {
    id: "saas",
    icon: Cloud,
    color: "#0f766e",
    titleKey: "service.saas.title",
    descKey: "service.saas.desc",
    titleFB: "SaaS Development",
    descFB: "Custom SaaS platforms with subscription models, dashboards, integrations and scalable architecture.",
  },
  {
    id: "android",
    icon: Smartphone,
    color: "#c7771a",
    titleKey: "service.android.title",
    descKey: "service.android.desc",
    titleFB: "Mobile App Development",
    descFB: "User-friendly Android and iOS applications focused on performance, usability and reliability.",
  },
  {
    id: "design",
    icon: Palette,
    color: "#9333ea",
    titleKey: "service.design.title",
    descKey: "service.design.desc",
    titleFB: "UI/UX Design",
    descFB: "Clear and intuitive digital experiences designed to make complex products simple to use.",
  },
  {
    id: "seo",
    icon: BarChart3,
    color: "#2563eb",
    titleKey: "service.seo.title",
    descKey: "service.seo.desc",
    titleFB: "SEO & Digital Growth",
    descFB: "Data-driven SEO strategies designed to improve visibility, organic traffic and long-term growth.",
  },
  {
    id: "marketing",
    icon: Megaphone,
    color: "#7c3aed",
    titleKey: "service.marketing.title",
    descKey: "service.marketing.desc",
    titleFB: "Digital Marketing",
    descFB: "Digital campaigns and content strategies focused on awareness, leads and measurable business growth.",
  },
  {
    id: "ai",
    icon: Bot,
    color: "#0f766e",
    titleKey: "service.ai.title",
    descKey: "service.ai.desc",
    titleFB: "AI Integration",
    descFB: "Practical AI integrations, automation and intelligent features that improve business workflows.",
  },
  {
    id: "crm",
    icon: Users,
    color: "#c2410c",
    titleKey: "service.crm.title",
    descKey: "service.crm.desc",
    titleFB: "CRM Development",
    descFB: "Custom CRM systems that organize sales, customer relationships and business operations.",
  },
  {
    id: "api",
    icon: Cable,
    color: "#7e22ce",
    titleKey: "service.api.title",
    descKey: "service.api.desc",
    titleFB: "API Integration",
    descFB: "Connect your existing tools, platforms and workflows through reliable API integrations.",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const { t } = useLang();
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.2 });

  const title = t(service.titleKey, service.titleFB);
  const description = t(service.descKey, service.descFB);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.4) }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <Link
        href="/services"
        className="block h-full"
      >
        <div
          className="
            relative h-full min-h-[200px] rounded-xl
            border border-gray-200/80
            bg-white p-6
            shadow-sm
            transition-all duration-300
            hover:border-blue-300
            hover:shadow-md
          "
        >
          <span className="text-[11px] font-medium tracking-wider text-blue-400">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div
            className="mt-3 flex h-11 w-11 items-center justify-center rounded-lg border"
            style={{
              backgroundColor: `${service.color}10`,
              borderColor: `${service.color}20`,
            }}
          >
            <Icon size={20} style={{ color: service.color }} />
          </div>

          <h3 className="mt-4 text-base font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-3">
            {description}
          </p>

          <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-all group-hover:gap-2.5">
            {t("services.explore")}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-white px-4 py-16 sm:py-20 md:px-6 md:py-24 lg:py-28"
    >
      <div ref={ref} className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <span className="text-xs font-medium uppercase tracking-wider text-blue-600">
            {t("services.badge")}
          </span>
          <h2
            id="services-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {t("services.title")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-500 sm:text-lg">
            {t("services.sub")}
          </p>
        </div>

        {/* Grid with 3D Scroll Tilt */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {SERVICES.map((service, index) => (
            <ScrollTilt key={service.id} tiltIntensity={4} scaleRange={0.05}>
              <ServiceCard service={service} index={index} />
            </ScrollTilt>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-md"
          >
            {t("services.view_all")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Globe,
  Smartphone,
  Bot,
  BarChart3,
  ShoppingCart,
  Cloud,
  Palette,
  Code2,
  Users,
  Cable,
} from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/providers";

// Exactly 10 services matching "Section 3: What We Do (H2) - Services Grid"
const SERVICES = [
  {
    icon: Code2,
    color: "#3b7bff",
    href: "/services#software",
    titleKey: "service.software.title",
    descKey: "service.software.desc",
    titleFB: "Custom Software Development",
    descFB:
      "Tailored solutions that solve your specific business challenges. From enterprise systems to niche applications, built to scale.",
  },
  {
    icon: Globe,
    color: "#7c3aed",
    href: "/services#web",
    titleKey: "service.web.title",
    descKey: "service.web.desc",
    titleFB: "Web Application Development",
    descFB:
      "High-performance web applications with modern architectures that deliver exceptional user experiences and business results.",
  },
  {
    icon: Cloud,
    color: "#06d6a0",
    href: "/services#saas",
    titleKey: "service.saas.title",
    descKey: "service.saas.desc",
    titleFB: "SaaS Development",
    descFB:
      "Build, launch, and scale software-as-a-service products. From MVP to enterprise-grade platforms with multi-tenant architectures.",
  },
  {
    icon: Smartphone,
    color: "#f59e0b",
    href: "/services#android",
    titleKey: "service.android.title",
    descKey: "service.android.desc",
    titleFB: "Android App Development",
    descFB:
      "Native Android applications with intuitive interfaces, robust architecture, and seamless performance.",
  },
  {
    icon: Palette,
    color: "#ec4899",
    href: "/services#design",
    titleKey: "service.design.title",
    descKey: "service.design.desc",
    titleFB: "UI/UX Design",
    descFB:
      "Research-driven, user-centered design that creates products people love to use.",
  },
  {
    icon: BarChart3,
    color: "#3b7bff",
    href: "/services#seo",
    titleKey: "service.seo.title",
    descKey: "service.seo.desc",
    titleFB: "SEO & Local SEO",
    descFB:
      "Drive organic traffic and generate qualified leads with data-driven SEO strategies for Indian and international markets.",
  },
  {
    icon: ShoppingCart,
    color: "#7c3aed",
    href: "/services#marketing",
    titleKey: "service.marketing.title",
    descKey: "service.marketing.desc",
    titleFB: "Digital Marketing",
    descFB:
      "Comprehensive digital marketing that builds brand awareness, generates leads, and drives revenue.",
  },
  {
    icon: Bot,
    color: "#06d6a0",
    href: "/services#ai",
    titleKey: "service.ai.title",
    descKey: "service.ai.desc",
    titleFB: "AI Automation",
    descFB:
      "Transform your business with AI-powered automation, intelligent workflows, and smart decision-making systems.",
  },
  {
    icon: Users,
    color: "#f59e0b",
    href: "/services#crm",
    titleKey: "service.crm.title",
    descKey: "service.crm.desc",
    titleFB: "CRM Development",
    descFB:
      "Custom CRM solutions that streamline sales, improve customer relationships, and drive growth.",
  },
  {
    icon: Cable,
    color: "#ec4899",
    href: "/services#api",
    titleKey: "service.api.title",
    descKey: "service.api.desc",
    titleFB: "API Integration",
    descFB:
      "Seamless system integration that connects your tools, data, and workflows for optimal efficiency.",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const { t } = useLang();
  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--mx",
      `${(((e.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`
    );
    e.currentTarget.style.setProperty(
      "--my",
      `${(((e.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className="group tile-glow glass-card p-6 hover:border-z-accent/40 hover:-translate-y-1 transition-all duration-300 cursor-default flex flex-col"
    >
      <div
        className="w-11 h-11 rounded-xl border flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          background: `${service.color}18`,
          borderColor: `${service.color}30`,
        }}
      >
        <Icon size={22} style={{ color: service.color }} />
      </div>
      <h3 className="text-sm font-bold text-white mb-2">
        {t(service.titleKey, service.titleFB)}
      </h3>
      <p className="text-sm text-z-muted leading-relaxed flex-1">
        {t(service.descKey, service.descFB)}
      </p>
      <Link
        href={service.href}
        className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-z-accent hover:gap-2 transition-all duration-200"
      >
        {t("services.explore", "Explore")} <ArrowUpRight size={13} />
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLang();

  return (
    <section id="services" className="relative z-10 pt-24 pb-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Badge text updated */}
          <div className="z-badge mb-4">
            {t("services.badge", "Your Digital Growth Partner")}
          </div>

          {/* Heading updated to match doc exactly */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 max-w-2xl">
            {t("services.title", "What We Do")}
          </h2>

          {/* Section 2 Paragraph included verbatim */}
          <p className="text-base text-z-muted max-w-3xl leading-relaxed">
            {t(
              "services.sub",
              "At Zentrox Technologies, we don't just build software — we build growth engines. Whether you are a startup in Chandigarh, an enterprise in Delhi, or a business in the United States or UK, we create technology solutions that solve real problems and deliver measurable results. Founded in 2023 by Prince Paul Singh, our remote-first team brings together expertise in custom development, SaaS, mobile apps, AI, and digital marketing."
            )}
          </p>
        </motion.div>

        {/* Adjusted grid to cleanly map all 10 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.titleKey} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-z-border text-sm font-semibold text-z-muted hover:border-z-accent hover:text-white transition-all duration-300"
          >
            {t("services.view_all", "View All Services")}{" "}
            <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

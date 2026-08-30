"use client";

import { useRef, useState } from "react";
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

const SERVICES = [
  {
    id: "software",
    icon: Code2,
    color: "#2563eb",
    href: "/services#software",
    titleKey: "service.software.title",
    descKey: "service.software.desc",
    titleFB: "Custom Software Development",
    descFB:
      "Secure, scalable software solutions tailored around your workflows, processes and business goals.",
  },
  {
    id: "web",
    icon: Globe,
    color: "#4f46e5",
    href: "/services#web",
    titleKey: "service.web.title",
    descKey: "service.web.desc",
    titleFB: "Web Application Development",
    descFB:
      "Fast, modern, scalable web applications built for excellent user experience and measurable business results.",
  },
  {
    id: "saas",
    icon: Cloud,
    color: "#0f766e",
    href: "/services#saas",
    titleKey: "service.saas.title",
    descKey: "service.saas.desc",
    titleFB: "SaaS Development",
    descFB:
      "From MVP to scalable SaaS platforms, we help turn your product ideas into reliable digital businesses.",
  },
  {
    id: "android",
    icon: Smartphone,
    color: "#c7771a",
    href: "/services#android",
    titleKey: "service.android.title",
    descKey: "service.android.desc",
    titleFB: "Mobile App Development",
    descFB:
      "High-performance mobile applications with intuitive interfaces and smooth experiences across devices.",
  },
  {
    id: "design",
    icon: Palette,
    color: "#9333ea",
    href: "/services#design",
    titleKey: "service.design.title",
    descKey: "service.design.desc",
    titleFB: "UI/UX Design",
    descFB:
      "Human-centered digital experiences that look professional, feel intuitive, and help users take action.",
  },
  {
    id: "seo",
    icon: BarChart3,
    color: "#2563eb",
    href: "/services#seo",
    titleKey: "service.seo.title",
    descKey: "service.seo.desc",
    titleFB: "SEO & Local SEO",
    descFB:
      "Data-driven SEO strategies that improve visibility, attract qualified traffic, and generate more leads.",
  },
  {
    id: "marketing",
    icon: Megaphone,
    color: "#7c3aed",
    href: "/services#marketing",
    titleKey: "service.marketing.title",
    descKey: "service.marketing.desc",
    titleFB: "Digital Marketing",
    descFB:
      "Smart digital campaigns that strengthen your brand, generate leads, and support sustainable business growth.",
  },
  {
    id: "ai",
    icon: Bot,
    color: "#0f766e",
    href: "/services#ai",
    titleKey: "service.ai.title",
    descKey: "service.ai.desc",
    titleFB: "AI Integration & Automation",
    descFB:
      "Practical AI integrations and automation systems that save time and improve productivity.",
  },
  {
    id: "crm",
    icon: Users,
    color: "#c2410c",
    href: "/services#crm",
    titleKey: "service.crm.title",
    descKey: "service.crm.desc",
    titleFB: "CRM Development",
    descFB:
      "Custom CRM systems that organize customer data, streamline sales, and improve business relationships.",
  },
  {
    id: "api",
    icon: Cable,
    color: "#7e22ce",
    href: "/services#api",
    titleKey: "service.api.title",
    descKey: "service.api.desc",
    titleFB: "API Integration",
    descFB:
      "Connect your software, platforms, and workflows with reliable integrations built for efficiency.",
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
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const title = t(service.titleKey, service.titleFB);
  const description = t(service.descKey, service.descFB);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPosition({ x, y });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: "-60px",
      }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.05, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative h-full"
    >
      <Link
        href={service.href}
        aria-label={`Explore ${title}`}
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
      >
        <div
          ref={cardRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          className="
            relative
            flex h-full min-h-[280px] max-h-[340px] flex-col
            overflow-hidden rounded-[24px]
            border border-slate-200/60
            bg-white/90
            p-6
            shadow-[0_8px_30px_rgba(15,23,42,0.04)]
            backdrop-blur-sm
            transition-all duration-500
            hover:border-blue-300/60
            hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]
            dark:border-white/8
            dark:bg-[#1a1e2b]/90
            dark:hover:border-blue-400/25
            dark:hover:bg-[#1a1e2b]/95
          "
          style={{ transformStyle: "preserve-3d" }}
        >
          {isHovered && (
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${spotlightPosition.x}% ${spotlightPosition.y}%, ${service.color}12, transparent 60%)`,
              }}
            />
          )}

          <div
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-[0.10]"
            style={{ backgroundColor: service.color }}
          />

          <span className="absolute right-5 top-5 text-[11px] font-bold tracking-[0.12em] text-slate-300 dark:text-white/15">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="relative z-10 flex flex-1 flex-col">
            <motion.div
              whileHover={{ rotate: 4, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border flex-shrink-0"
              style={{
                backgroundColor: `${service.color}10`,
                borderColor: `${service.color}25`,
              }}
            >
              <Icon size={25} style={{ color: service.color }} aria-hidden="true" />
            </motion.div>

            <h3 className="text-xl font-bold leading-snug tracking-[-0.02em] text-slate-900 dark:text-white line-clamp-2">
              {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300 line-clamp-3 flex-1">
              {description}
            </p>
          </div>

          <div className="relative z-10 mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/6 flex-shrink-0">
            <span className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-blue-300">
              Explore Service
            </span>

            <span
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-45 flex-shrink-0"
              style={{
                color: service.color,
                backgroundColor: `${service.color}12`,
              }}
            >
              <ArrowRight size={17} />
            </span>
          </div>

          <div
            className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full"
            style={{ backgroundColor: service.color }}
          />
        </div>
      </Link>
    </motion.article>
  );
}

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLang();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="
        relative overflow-hidden
        bg-white
        px-4 py-16
        sm:py-20 md:px-6 md:py-24 lg:py-28
        dark:bg-[#111827]
        transition-colors duration-300
      "
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[-150px] top-[10%] h-[450px] w-[450px] rounded-full bg-blue-500/[0.05] blur-[140px] dark:bg-blue-400/[0.05]" />
        <div className="absolute right-[-150px] bottom-[5%] h-[450px] w-[450px] rounded-full bg-orange-400/[0.04] blur-[140px] dark:bg-orange-400/[0.04]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-4xl text-center sm:mb-14 md:mb-16"
        >
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/60 px-4 py-1.5 text-[11px] font-bold tracking-[0.1em] text-blue-700 backdrop-blur-sm dark:border-blue-400/20 dark:bg-blue-400/[0.05] dark:text-blue-200">
            <Sparkles size={13} />
            <span>{t("services.badge")}</span>
          </div>

          <h2
            id="services-heading"
            className="mx-auto max-w-4xl text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white"
          >
            {t("services.title")}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg dark:text-slate-300">
            {t("services.sub")}
          </p>
        </motion.div>

        <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 max-w-3xl rounded-[28px] border border-slate-200/60 bg-white/80 px-6 py-10 text-center shadow-[0_15px_50px_rgba(15,23,42,0.04)] backdrop-blur-md sm:px-10 dark:border-white/8 dark:bg-[#1a1e2b]/80"
        >
          <div className="mb-4 flex justify-center">
            <CheckCircle2 size={26} className="text-blue-600 dark:text-blue-400" />
          </div>

          <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
            {t("services.cta_title")}
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {t("services.cta_sub")}
          </p>

          <Link
            href="/services"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3.5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(37,99,235,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(37,99,235,0.30)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
          >
            {t("services.view_all")}
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

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

const SERVICES = [
  {
    id: "software",
    icon: Code2,
    color: "#2563eb",
    title: "Software Development",
    description: "Scalable custom software designed around your business processes, workflows and operational needs.",
    features: ["Custom web applications", "Internal tools & dashboards", "API development", "Third-party integrations"],
  },
  {
    id: "web",
    icon: Globe,
    color: "#4f46e5",
    title: "Website Development",
    description: "Fast, responsive and conversion-focused websites built to represent your brand and generate business.",
    features: ["Business websites", "Landing pages", "E-commerce stores", "CMS-based websites"],
  },
  {
    id: "saas",
    icon: Cloud,
    color: "#0f766e",
    title: "SaaS Development",
    description: "Custom SaaS platforms with subscription models, dashboards, integrations and scalable architecture.",
    features: ["Multi-tenant SaaS platforms", "Subscription & billing", "Admin dashboards", "User management"],
  },
  {
    id: "android",
    icon: Smartphone,
    color: "#c7771a",
    title: "Mobile App Development",
    description: "User-friendly Android and iOS applications focused on performance, usability and reliability.",
    features: ["Android & iOS apps", "Cross-platform apps", "Mobile UI/UX", "Push notifications"],
  },
  {
    id: "design",
    icon: Palette,
    color: "#9333ea",
    title: "UI/UX Design",
    description: "Clear and intuitive digital experiences designed to make complex products simple to use.",
    features: ["User research", "Wireframing", "Prototyping", "Design systems"],
  },
  {
    id: "seo",
    icon: BarChart3,
    color: "#2563eb",
    title: "SEO & Digital Growth",
    description: "Data-driven SEO strategies designed to improve visibility, organic traffic and long-term growth.",
    features: ["Local SEO", "Technical SEO", "Content SEO", "Link building"],
  },
  {
    id: "marketing",
    icon: Megaphone,
    color: "#7c3aed",
    title: "Digital Marketing",
    description: "Digital campaigns and content strategies focused on awareness, leads and measurable business growth.",
    features: ["Social media marketing", "Google Ads", "Content marketing", "Email campaigns"],
  },
  {
    id: "ai",
    icon: Bot,
    color: "#0f766e",
    title: "AI Integration",
    description: "Practical AI integrations, automation and intelligent features that improve business workflows.",
    features: ["AI chatbots", "Workflow automation", "AI content tools", "Custom AI integrations"],
  },
  {
    id: "crm",
    icon: Users,
    color: "#c2410c",
    title: "CRM Development",
    description: "Custom CRM systems that organize sales, customer relationships and business operations.",
    features: ["Sales pipeline management", "Customer tracking", "Team dashboards", "Reporting & analytics"],
  },
  {
    id: "api",
    icon: Cable,
    color: "#7e22ce",
    title: "API Integration",
    description: "Connect your existing tools, platforms and workflows through reliable API integrations.",
    features: ["Payment gateway integration", "Third-party APIs", "Data syncing", "Webhook setup"],
  },
];

function ServiceCard({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -6 }}
      className="group h-full"
      id={service.id}
    >
      <div className="card-cream relative h-full flex flex-col p-6 sm:p-7">
        <span className="text-[11px] font-medium tracking-wider text-slate-400">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div
          className="mt-3 flex h-12 w-12 items-center justify-center rounded-xl border"
          style={{
            backgroundColor: `${service.color}10`,
            borderColor: `${service.color}20`,
          }}
        >
          <Icon size={22} style={{ color: service.color }} />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {service.description}
        </p>

        <div className="mt-4 space-y-1.5">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2 size={13} style={{ color: service.color }} className="flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:gap-2.5 transition-all"
          >
            Get a Quote
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesClient() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="bg-[#FDF8F3] px-4 py-20 sm:py-24 md:px-6 md:py-28 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
            <Sparkles size={13} className="text-blue-600" />
            Our Services
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Technology and Digital Solutions Built Around Your Business
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            From custom software and websites to mobile apps, AI, and digital marketing — Zentrox Technologies brings together the services you need to build and grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="card-cream mx-auto max-w-2xl p-8 sm:p-10">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Have a Project in Mind?
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Let's discuss how we can help you build the right solution for your business.
            </p>
            <Link href="/contact" className="btn-primary mt-6">
              Start Your Project
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

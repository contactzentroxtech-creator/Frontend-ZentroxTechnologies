"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Code2,
  Palette,
  Search,
  Megaphone,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import api from "@/lib/api";

interface CMSData {
  services_title?: string;
  services_subtitle?: string;
  services_image?: string;
}

const SERVICES = [
  {
    id: "web",
    title: "Website Development",
    description: "Fast, responsive, SEO-friendly websites built with modern tech.",
    icon: Globe,
    color: "#2563eb",
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description: "Native & cross-platform apps for Android and iOS.",
    icon: Smartphone,
    color: "#7c3aed",
  },
  {
    id: "software",
    title: "Custom Software",
    description: "CRM, ERP, SaaS — tailored software for your business needs.",
    icon: Code2,
    color: "#0891b2",
  },
  {
    id: "design",
    title: "UI/UX Design",
    description: "Beautiful, user-centric designs that convert visitors.",
    icon: Palette,
    color: "#ea580c",
  },
  {
    id: "seo",
    title: "SEO Services",
    description: "Rank higher on Google and drive organic traffic.",
    icon: Search,
    color: "#059669",
  },
  {
    id: "digital",
    title: "Digital Marketing",
    description: "Full-funnel marketing — social, content, email & more.",
    icon: Megaphone,
    color: "#dc2626",
  },
  {
    id: "ads",
    title: "Google Ads",
    description: "High-ROI Google Ads campaigns that bring real leads.",
    icon: TrendingUp,
    color: "#ea580c",
  },
  {
    id: "meta_ads",
    title: "Meta Ads",
    description: "Facebook & Instagram ad campaigns that scale.",
    icon: TrendingUp,
    color: "#be185d",
  },
  {
    id: "ai",
    title: "AI Integration",
    description: "Chatbots, automation, and AI-powered features.",
    icon: Sparkles,
    color: "#4f46e5",
  },
];

export default function ServicesSection() {
  const [cms, setCms] = useState<CMSData>({});
  const [loading, setLoading] = useState(true);

  /* ─── Fetch CMS ─── */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/cms");
        if (data?.success && data.data) {
          setCms(data.data);
        } else if (data && typeof data === "object") {
          setCms(data);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ─── Defaults ─── */
  const title = cms.services_title || "Services That Drive Real Growth";
  const subtitle =
    cms.services_subtitle ||
    "From web and mobile to AI and marketing — we deliver end-to-end solutions under one roof.";
  const servicesImage = cms.services_image;

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white px-4 py-20 sm:py-24 md:px-6 md:py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* ═══ Header ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 mb-5">
            <Sparkles size={12} />
            Our Services
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
            {title.includes("Growth") ? (
              <>
                {title.split("Growth")[0]}
                <span className="gradient-text">Growth</span>
                {title.split("Growth")[1]}
              </>
            ) : (
              title
            )}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* ═══ Optional CMS Image ═══ */}
        {servicesImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 mx-auto max-w-4xl"
          >
            <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xl">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={servicesImage}
                  alt="Our Services"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ Services Grid ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  href="/services"
                  className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Icon */}
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${service.color}15`,
                      color: service.color,
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Learn more */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:gap-2.5 transition-all">
                    Learn More
                    <ArrowRight size={13} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ═══ Bottom CTA ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 size={20} className="text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900">
                  Not sure which service you need?
                </p>
                <p className="text-xs text-slate-600">
                  Get a free consultation from our experts.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Talk to Expert
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

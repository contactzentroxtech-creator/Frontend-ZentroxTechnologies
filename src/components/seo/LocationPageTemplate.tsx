"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  MapPin,
  Sparkles,
  Code2,
  Smartphone,
  Bot,
  BarChart3,
  Cloud,
  Palette,
  Users,
  Cable,
  Megaphone,
} from "lucide-react";

const SERVICES = [
  { icon: Code2, color: "#2563eb", title: "Custom Software" },
  { icon: Globe2, color: "#4f46e5", title: "Website Development" },
  { icon: Smartphone, color: "#c7771a", title: "Mobile Apps" },
  { icon: Cloud, color: "#0f766e", title: "SaaS Development" },
  { icon: Palette, color: "#9333ea", title: "UI/UX Design" },
  { icon: BarChart3, color: "#2563eb", title: "SEO Services" },
  { icon: Megaphone, color: "#7c3aed", title: "Digital Marketing" },
  { icon: Bot, color: "#0f766e", title: "AI Integration" },
  { icon: Users, color: "#c2410c", title: "CRM Development" },
  { icon: Cable, color: "#7e22ce", title: "API Integration" },
];

interface LocationPageTemplateProps {
  title: string;
  description: string;
  city: string;
  state: string;
  country: string;
  highlights: string[];
  industries: string[];
}

export default function LocationPageTemplate({
  title,
  description,
  city,
  state,
  country,
  highlights,
  industries,
}: LocationPageTemplateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="bg-[#FDF8F3] px-4 py-20 sm:py-24 md:px-6 md:py-28 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-4xl text-center sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
            <MapPin size={13} className="text-blue-600" />
            {city}, {state}
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Get a Free Consultation
              <ArrowRight size={16} />
            </Link>
            <Link href="/services" className="btn-secondary">
              Explore Our Services
            </Link>
          </div>
        </motion.div>

        {/* HIGHLIGHTS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {highlights.map((highlight, idx) => (
            <div key={idx} className="card-cream p-4 text-center">
              <CheckCircle2 size={20} className="mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-medium text-slate-700">{highlight}</p>
            </div>
          ))}
        </motion.div>

        {/* SERVICES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
              <Sparkles size={13} className="text-blue-600" />
              Our Services
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              What We Offer in {city}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {SERVICES.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="card-cream flex flex-col items-center gap-2 p-4 text-center"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg border"
                    style={{
                      backgroundColor: `${service.color}10`,
                      borderColor: `${service.color}20`,
                    }}
                  >
                    <Icon size={18} style={{ color: service.color }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    {service.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* INDUSTRIES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Industries We Serve in {city}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <span
                key={industry}
                className="card-cream px-4 py-2 text-sm font-medium text-slate-700"
              >
                {industry}
              </span>
            ))}
          </div>
        </motion.div>

        {/* WHY CHOOSE US */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <div className="card-cream p-8 sm:p-10">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Why Businesses in {city} Choose Zentrox Technologies
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                { icon: Globe2, title: "Local Understanding", desc: `We understand the business landscape of ${city} and ${state}.` },
                { icon: Sparkles, title: "Modern Technology", desc: "We use the latest tools and frameworks to build reliable solutions." },
                { icon: Users, title: "Dedicated Team", desc: "A team of developers, designers, and digital marketers working together." },
                { icon: CheckCircle2, title: "Proven Results", desc: "We focus on practical outcomes, not just deliverables." },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* FINAL CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Ready to Start Your Project in {city}?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Let's discuss how Zentrox Technologies can help your business grow.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Start Your Project
              <ArrowRight size={16} />
            </Link>
            <a href="tel:+918988183513" className="btn-secondary">
              Call +91 89881 83513
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Globe2,
  Building2,
  Briefcase,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

const INDUSTRIES = [
  { icon: Briefcase, label: "Startups", color: "#2563eb" },
  { icon: Building2, label: "Local Businesses", color: "#7c3aed" },
  { icon: TrendingUp, label: "Growing Enterprises", color: "#0891b2" },
  { icon: Globe2, label: "Global Brands", color: "#ea580c" },
  { icon: CheckCircle2, label: "Service Providers", color: "#059669" },
  { icon: MapPin, label: "E-Commerce", color: "#dc2626" },
];

const LOCATIONS = [
  "Mohali",
  "Chandigarh",
  "Punjab",
  "Haryana",
  "Delhi NCR",
  "India",
  "USA",
  "UK",
  "Canada",
  "Australia",
  "UAE",
  "Singapore",
];

const TRUST_CARDS = [
  {
    icon: MapPin,
    title: "India & Worldwide",
    desc: "Serving businesses locally and globally.",
    color: "#2563eb",
  },
  {
    icon: Briefcase,
    title: "Business-Focused Solutions",
    desc: "Technology built around real business needs.",
    color: "#7c3aed",
  },
  {
    icon: CheckCircle2,
    title: "Reliable Project Delivery",
    desc: "On-time, on-budget, every time.",
    color: "#0891b2",
  },
];

export default function LocalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="global"
      aria-label="Industries and locations served by Zentrox Technologies"
      className="relative bg-white px-4 py-20 sm:py-24 md:px-6 md:py-28"
    >
      <div ref={ref} className="mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/60 bg-cyan-50/60 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-cyan-700">
            Industries
          </div>

          <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Built for Different Industries
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
            Every industry has different workflows, customers and challenges. Our
            approach starts by understanding the business before choosing the technology.
          </p>
        </motion.div>

        {/* INDUSTRIES GRID */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {INDUSTRIES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-5 text-center transition-all hover:border-blue-200 hover:shadow-lg"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${item.color}10`,
                    color: item.color,
                  }}
                >
                  <Icon size={20} />
                </div>
                <p className="text-xs font-semibold text-slate-800">{item.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* TRUST CARDS */}
        <div className="mb-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TRUST_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-slate-200/70 bg-white p-7 transition-all hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${card.color}10`,
                    color: card.color,
                  }}
                >
                  <Icon size={22} />
                </div>

                <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* LOCATIONS STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-3xl border border-slate-200/70 bg-gradient-to-r from-blue-50/60 via-white to-purple-50/60 p-8 sm:p-10"
        >
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Serving Businesses Worldwide
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                From Mohali to the world — we deliver technology that scales across borders.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {LOCATIONS.map((loc) => (
                <span
                  key={loc}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600"
                >
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

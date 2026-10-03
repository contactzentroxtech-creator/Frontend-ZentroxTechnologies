"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Play,
  Code2,
  Globe2,
  Smartphone,
  Bot,
  TrendingUp,
  Award,
  Calculator,
} from "lucide-react";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const trustFlags = [
    "INDIA",
    "USA",
    "UK",
    "CANADA",
    "AUSTRALIA",
    "UAE",
    "SINGAPORE",
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24"
    >
      {/* Background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-[120px]" />
        <div className="absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-purple-100/50 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ═══════ LEFT CONTENT ═══════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              </span>
              Your Growth. Our Technology.
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[68px]">
              Build Better,
              <br />
              <span className="gradient-text">Grow Faster</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              Zentrox Technologies builds modern websites, mobile apps and
              custom software solutions that help businesses grow online and
              reach their full potential. Remote-first, premium quality,
              delivered worldwide from Mohali, India.
            </p>

            {/* ═══════ CTA BUTTONS ═══════ */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {/* PRIMARY CTA */}
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
              >
                Start Your Project
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              {/* ✅ NEW — CALCULATOR CTA */}
              <Link
                href="/calculator"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <Calculator size={16} />
                Calculate Project Cost
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              {/* SECONDARY CTA */}
              <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600 hover:shadow-lg"
              >
                <Play size={14} className="fill-slate-700" />
                Watch Our Work
              </Link>
            </div>

            {/* ═══════ TRUST FLAGS ═══════ */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-medium text-slate-500">
                Trusted by businesses across India, USA, UK, Canada, Australia,
                UAE &amp; Singapore. Founded in 2023.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {trustFlags.map((flag) => (
                  <span
                    key={flag}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600"
                  >
                    {flag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ═══════ RIGHT VISUAL — CSS DASHBOARD ═══════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative lg:col-span-6"
          >
            <div className="relative mx-auto max-w-[560px]">
              {/* Dashboard mockup */}
              <div className="relative z-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60">
                {/* Browser Top Bar */}
                <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-[10px] text-slate-400">
                    zentroxtechnologies.com
                  </div>
                </div>

                {/* Dashboard Body */}
                <div className="grid grid-cols-12 gap-3 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-4">
                  {/* Sidebar */}
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 p-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/20 text-xs font-black text-white">
                        Z
                      </span>
                      <span className="text-[9px] font-bold text-white">
                        ZENTROX
                      </span>
                    </div>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-6 rounded-md bg-slate-100" />
                    ))}
                  </div>

                  {/* Main Area */}
                  <div className="col-span-9 space-y-3">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Projects", value: "124" },
                        { label: "Clients", value: "58" },
                        { label: "Revenue", value: "₹8L" },
                      ].map((kpi) => (
                        <div
                          key={kpi.label}
                          className="rounded-lg border border-slate-100 bg-white p-2"
                        >
                          <div className="mb-1 h-1.5 w-6 rounded-full bg-slate-200" />
                          <p className="text-[10px] font-extrabold text-slate-900">
                            {kpi.value}
                          </p>
                          <p className="text-[8px] text-slate-400">
                            {kpi.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Chart */}
                    <div className="rounded-lg border border-slate-100 bg-white p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-[10px] font-bold text-slate-700">
                          Growth
                        </p>
                        <span className="text-[9px] font-semibold text-emerald-600">
                          +140%
                        </span>
                      </div>
                      <div className="flex items-end gap-1">
                        {[40, 65, 45, 80, 60, 90, 75, 95, 85, 100].map(
                          (h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-sm bg-gradient-to-t from-blue-500 to-purple-500"
                              style={{ height: `${h * 0.5}px` }}
                            />
                          )
                        )}
                      </div>
                    </div>

                    {/* Line Items */}
                    <div className="space-y-1.5">
                      {[1, 2].map((i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 rounded-lg border border-slate-100 bg-white p-2"
                        >
                          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-100 to-purple-100" />
                          <div className="flex-1 space-y-1">
                            <div className="h-1.5 w-16 rounded-full bg-slate-200" />
                            <div className="h-1.5 w-10 rounded-full bg-slate-100" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card 1 — Traffic */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 -top-6 z-20 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-500">
                      Traffic Growth
                    </p>
                    <p className="text-lg font-extrabold text-slate-900">
                      +140%
                    </p>
                    <p className="text-[9px] text-slate-500">
                      SEO &amp; Marketing
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 — Mobile */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -left-6 top-1/3 z-20 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900">
                      Mobile App
                    </p>
                    <p className="text-[9px] text-slate-500">
                      iOS · Android
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 3 — Code */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -top-10 left-1/4 z-20 hidden rounded-xl border border-slate-800 bg-slate-900 p-3 shadow-xl md:block"
              >
                <div className="mb-2 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                </div>
                <div className="space-y-1 font-mono text-[9px]">
                  <p className="text-blue-400">initZentrox();</p>
                  <p className="text-emerald-400">✓ Software Dev</p>
                  <p className="text-emerald-400">✓ Web Apps</p>
                  <p className="text-emerald-400">✓ SaaS Solutions</p>
                </div>
              </motion.div>

              {/* Floating Card 4 — Ranking */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="absolute -bottom-6 -right-6 z-20 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Award size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-900">
                      RANKING #1
                    </p>
                    <p className="text-[9px] text-slate-500">
                      Best SEO Company
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ═══════ SERVICE CHIPS ROW ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {[
            { icon: Globe2, label: "Website Development", color: "blue" },
            { icon: Smartphone, label: "Mobile App Development", color: "purple" },
            { icon: Code2, label: "Custom Software", color: "emerald" },
            { icon: Play, label: "UI/UX Design", color: "cyan" },
            { icon: TrendingUp, label: "SEO & Digital Marketing", color: "orange" },
            { icon: Bot, label: "AI Integration", color: "indigo" },
          ].map((item, idx) => {
            const Icon = item.icon;
            const colors: Record<string, string> = {
              blue: "bg-blue-50 text-blue-600",
              purple: "bg-purple-50 text-purple-600",
              emerald: "bg-emerald-50 text-emerald-600",
              cyan: "bg-cyan-50 text-cyan-600",
              orange: "bg-orange-50 text-orange-600",
              indigo: "bg-indigo-50 text-indigo-600",
            };
            return (
              <Link
                key={idx}
                href="/calculator"
                className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors[item.color]}`}
                >
                  <Icon size={20} />
                </div>
                <p className="text-xs font-semibold text-slate-800">
                  {item.label}
                </p>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

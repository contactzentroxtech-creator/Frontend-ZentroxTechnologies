"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Code2,
  Globe2,
  Smartphone,
  Bot,
  TrendingUp,
} from "lucide-react";
import { useLang } from "@/lib/providers";

export default function HeroSection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const trustFlags = ["India", "USA", "UK", "Canada", "Australia", "UAE", "Singapore"];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24"
    >
      {/* ─── BACKGROUND DECORATION ─────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft gradient blobs */}
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-[120px]" />
        <div className="absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-purple-100/50 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-pink-100/40 blur-[120px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(100,116,139,.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100,116,139,.6) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ─── LEFT CONTENT ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              </span>
              {t("hero.badge", "Your Growth. Our Technology.")}
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[68px]"
            >
              {t("hero.line1", "Build Better,")}
              <br />
              <span className="gradient-text">
                {t("hero.line2", "Grow Faster")}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg"
            >
              {t(
                "hero.sub",
                "We build modern websites, mobile apps and custom software solutions that help businesses grow online and reach their full potential. Remote-first, premium quality, delivered worldwide from Mohali, India."
              )}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/35"
              >
                {t("hero.cta_primary", "Start Your Project")}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600 hover:shadow-lg"
              >
                <Play size={14} className="fill-slate-700 group-hover:fill-blue-600" />
                {t("hero.cta_secondary", "Watch Our Work")}
              </Link>
            </motion.div>

            {/* Trust Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-8"
            >
              <p className="mb-3 text-xs font-medium text-slate-500">
                {t(
                  "hero.trust_text",
                  "Trusted by businesses across India, USA, UK, Canada, Australia, UAE & Singapore. Founded in 2023."
                )}
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
            </motion.div>
          </motion.div>

          {/* ─── RIGHT VISUAL ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative lg:col-span-6"
          >
            <div className="relative mx-auto max-w-[560px]">
              {/* Main Laptop Image */}
              <div className="relative z-10">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60">
                  <Image
                    src="/hero-laptop.png"
                    alt="Zentrox Technologies - Digital Solutions"
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Floating Card 1 - Traffic Growth */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
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
                    <p className="text-lg font-extrabold text-slate-900">+140%</p>
                    <p className="text-[9px] text-slate-500">
                      SEO &amp; Digital Marketing
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 - Mobile App */}
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
                    <p className="text-[11px] font-bold text-slate-900">
                      Development
                    </p>
                    <p className="text-[9px] text-slate-500">
                      iOS · Android · Cross Platform
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 3 - Code Window */}
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
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                </div>
                <div className="space-y-1 font-mono text-[9px]">
                  <p className="text-blue-400">initZentrox();</p>
                  <p className="text-emerald-400">✓ Software Development</p>
                  <p className="text-emerald-400">✓ Web Applications</p>
                  <p className="text-emerald-400">✓ SaaS Solutions</p>
                </div>
              </motion.div>

              {/* Floating Card 4 - Ranking */}
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
                    <Bot size={14} />
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

        {/* ─── SERVICE CHIPS ROW ────────────────────────── */}
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
              <div
                key={idx}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors[item.color]}`}
                >
                  <Icon size={20} />
                </div>
                <p className="text-xs font-semibold text-slate-800">
                  {item.label}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

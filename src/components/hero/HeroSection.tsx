"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Code2,
  Sparkles,
  TrendingUp,
  Layers3,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useLang } from "@/lib/providers";

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const { t, lang } = useLang();

  const heroWords = t(
    "hero.words",
    "Custom Software|Web Experiences|Mobile Apps|Digital Growth"
  )
    .split("|")
    .filter(Boolean);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);

      const timeout = setTimeout(() => {
        setWordIdx((i) => (i + 1) % heroWords.length);
        setWordVisible(true);
      }, 350);

      return () => clearTimeout(timeout);
    }, 3200);

    return () => clearInterval(interval);
  }, [heroWords.length]);

  useEffect(() => {
    setWordIdx(0);
    setWordVisible(true);
  }, [lang]);

  return (
    <section
      aria-label="Zentrox Technologies digital solutions"
      className="relative overflow-hidden px-4 pt-32 pb-20 md:px-6 md:pt-40 md:pb-28"
    >
      {/* Soft premium background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-400/10 blur-[140px]" />

        <div className="absolute left-[5%] top-[25%] h-[300px] w-[300px] rounded-full bg-indigo-400/10 blur-[120px]" />

        <div className="absolute bottom-[5%] right-[5%] h-[350px] w-[350px] rounded-full bg-sky-300/10 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Hero Content */}
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="z-badge mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {t("hero.badge", "Building Digital Experiences That Perform")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="max-w-5xl text-5xl font-extrabold leading-[1.03] tracking-tight text-z-text md:text-7xl lg:text-8xl"
          >
            <span className="block">
              {t("hero.line1", "Digital Solutions")}
            </span>

            <span
              className="gradient-text mt-2 block"
              style={{
                opacity: wordVisible ? 1 : 0,
                transform: wordVisible
                  ? "translateY(0)"
                  : "translateY(8px)",
                transition: "all 0.3s ease",
                minHeight: "1.15em",
              }}
            >
              {heroWords[wordIdx] || heroWords[0]}
            </span>

            <span className="mt-3 block text-3xl font-bold text-z-text md:text-5xl lg:text-6xl">
              {t("hero.line2", "Built Around Your Business Goals")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 max-w-3xl text-base leading-relaxed text-z-muted md:text-lg"
          >
            {t(
              "hero.description",
              "Zentrox Technologies helps businesses grow with custom software, high-performing websites, mobile applications, AI integration, SEO, and digital marketing solutions."
            )}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2563eb] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/25"
            >
              {t("hero.cta_primary", "Start Your Project")}
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/services"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-z-border bg-white/40 px-7 py-4 text-sm font-semibold text-z-text backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:text-blue-600 dark:bg-white/5"
            >
              <Play
                size={15}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              {t("hero.cta_secondary", "Explore Our Services")}
            </Link>
          </motion.div>

          {/* Trust */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-z-muted"
          >
            <span>✓ Founded in 2023</span>
            <span>✓ Custom Solutions</span>
            <span>✓ Global Delivery</span>
          </motion.div>
        </div>

        {/* Interactive Product Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="relative mx-auto mt-16 max-w-6xl md:mt-20"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-z-border bg-white/55 p-4 shadow-2xl backdrop-blur-xl dark:bg-white/[0.04] md:p-6">
            {/* Browser top */}
            <div className="mb-5 flex items-center justify-between border-b border-z-border pb-4">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>

              <div className="hidden rounded-full border border-z-border px-4 py-1.5 text-xs text-z-muted sm:block">
                zentroxtechnologies.com
              </div>

              <div className="w-12" />
            </div>

            <div className="grid gap-4 md:grid-cols-12">
              {/* Main Dashboard */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
                className="relative overflow-hidden rounded-2xl border border-z-border bg-white/60 p-5 dark:bg-white/[0.03] md:col-span-7"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-z-muted">
                      Digital Growth Overview
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-z-text">
                      Your business, moving forward.
                    </h3>
                  </div>

                  <div className="rounded-xl bg-blue-500/10 p-2 text-blue-600">
                    <TrendingUp size={20} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "Web",
                      icon: Layers3,
                      value: "Modern",
                    },
                    {
                      label: "Software",
                      icon: Code2,
                      value: "Custom",
                    },
                    {
                      label: "Growth",
                      icon: TrendingUp,
                      value: "Scalable",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="rounded-xl border border-z-border bg-white/70 p-3 dark:bg-white/[0.04]"
                      >
                        <Icon size={17} className="mb-4 text-blue-600" />
                        <p className="text-[10px] text-z-muted">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-z-text">
                          {item.value}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Animated graph */}
                <div className="mt-5 flex h-28 items-end gap-2 rounded-xl border border-z-border bg-gradient-to-br from-blue-500/[0.04] to-transparent p-4">
                  {[35, 50, 42, 65, 58, 78, 72, 92].map((height, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{
                        duration: 0.8,
                        delay: 0.7 + index * 0.08,
                      }}
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-600/70 to-blue-400"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Side Cards */}
              <div className="flex flex-col gap-4 md:col-span-5">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl border border-z-border bg-white/60 p-5 shadow-sm dark:bg-white/[0.03]"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-violet-500/10 p-2.5 text-violet-600">
                      <Sparkles size={20} />
                    </div>

                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold text-emerald-600">
                      SMART TECH
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-bold text-z-text">
                    AI Integration
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-z-muted">
                    Automate workflows and build smarter digital experiences.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl border border-z-border bg-white/60 p-5 shadow-sm dark:bg-white/[0.03]"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-sky-500/10 p-2.5 text-sky-600">
                      <Smartphone size={20} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-z-text">
                        Mobile Experiences
                      </p>

                      <p className="mt-1 text-xs text-z-muted">
                        Android & iOS solutions
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl border border-z-border bg-white/60 p-5 shadow-sm dark:bg-white/[0.03]"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={22} className="text-emerald-600" />

                    <div>
                      <p className="text-sm font-semibold text-z-text">
                        Built for Long-Term Growth
                      </p>

                      <p className="text-xs text-z-muted">
                        Strategy, technology & support.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Floating subtle 3D elements */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 4, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-5 top-1/4 hidden rounded-2xl border border-z-border bg-white/80 p-4 shadow-xl backdrop-blur-xl dark:bg-[#20242c]/90 lg:block"
          >
            <Code2 size={22} className="text-blue-600" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 12, 0],
              rotate: [0, -4, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-5 bottom-1/4 hidden rounded-2xl border border-z-border bg-white/80 p-4 shadow-xl backdrop-blur-xl dark:bg-[#20242c]/90 lg:block"
          >
            <Sparkles size={22} className="text-violet-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

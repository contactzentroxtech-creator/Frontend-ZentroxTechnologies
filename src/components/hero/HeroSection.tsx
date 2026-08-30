"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Code2,
  Globe2,
  Smartphone,
  Bot,
  BarChart3,
} from "lucide-react";
import { useLang } from "@/lib/providers";

/* =========================================================
   SERVICES DATA
========================================================= */

const SERVICES = [
  {
    id: 0,
    title: "Website Development",
    description:
      "Fast, modern and SEO-friendly websites designed to build trust and turn visitors into customers.",
    icon: Globe2,
    accent: "blue",
  },
  {
    id: 1,
    title: "Mobile App Development",
    description:
      "Powerful Android and iOS applications built for seamless user experiences and business growth.",
    icon: Smartphone,
    accent: "cyan",
  },
  {
    id: 2,
    title: "Custom Software",
    description:
      "Secure, scalable software solutions tailored around your workflows, processes and business goals.",
    icon: Code2,
    accent: "purple",
  },
  {
    id: 3,
    title: "AI & Automation",
    description:
      "Practical AI integrations and automation systems that save time and improve productivity.",
    icon: Bot,
    accent: "emerald",
  },
  {
    id: 4,
    title: "SEO & Digital Growth",
    description:
      "Data-driven SEO and digital marketing strategies focused on visibility, quality leads and growth.",
    icon: BarChart3,
    accent: "orange",
  },
];

/* =========================================================
   CARD POSITION CALCULATIONS
========================================================= */

function getCardStyle(index: number, activeIndex: number) {
  const total = SERVICES.length;
  let position = index - activeIndex;

  if (position > total / 2) position -= total;
  if (position < -total / 2) position += total;

  const positions: Record<number, any> = {
    0: {
      x: "0%",
      scale: 1,
      rotateY: 0,
      opacity: 1,
      zIndex: 30,
      filter: "blur(0px)",
    },
    [-1]: {
      x: "-95%",
      scale: 0.78,
      rotateY: 12,
      opacity: 0.6,
      zIndex: 20,
      filter: "blur(0.3px)",
    },
    1: {
      x: "95%",
      scale: 0.78,
      rotateY: -12,
      opacity: 0.6,
      zIndex: 20,
      filter: "blur(0.3px)",
    },
    [-2]: {
      x: "-165%",
      scale: 0.6,
      rotateY: 18,
      opacity: 0.15,
      zIndex: 10,
      filter: "blur(1px)",
    },
    2: {
      x: "165%",
      scale: 0.6,
      rotateY: -18,
      opacity: 0.15,
      zIndex: 10,
      filter: "blur(1px)",
    },
  };

  return (
    positions[position] || {
      x: position > 0 ? "220%" : "-220%",
      scale: 0.45,
      opacity: 0,
      zIndex: 0,
      filter: "blur(3px)",
    }
  );
}

/* =========================================================
   ACCENT COLOR HELPERS
========================================================= */

function getAccentClasses(accent: string) {
  switch (accent) {
    case "cyan":
      return {
        icon: "bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-300",
        glow: "from-cyan-500/10",
        border: "border-cyan-500/30 dark:border-cyan-400/20",
        shadow: "shadow-cyan-500/10",
      };
    case "purple":
      return {
        icon: "bg-violet-500/10 border-violet-500/20 text-violet-600 dark:text-violet-300",
        glow: "from-violet-500/10",
        border: "border-violet-500/30 dark:border-violet-400/20",
        shadow: "shadow-violet-500/10",
      };
    case "emerald":
      return {
        icon: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-300",
        glow: "from-emerald-500/10",
        border: "border-emerald-500/30 dark:border-emerald-400/20",
        shadow: "shadow-emerald-500/10",
      };
    case "orange":
      return {
        icon: "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-300",
        glow: "from-orange-500/10",
        border: "border-orange-500/30 dark:border-orange-400/20",
        shadow: "shadow-orange-500/10",
      };
    default:
      return {
        icon: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-300",
        glow: "from-blue-500/10",
        border: "border-blue-500/30 dark:border-blue-400/20",
        shadow: "shadow-blue-500/10",
      };
  }
}

/* =========================================================
   HERO SECTION COMPONENT
========================================================= */

export default function HeroSection() {
  const { t } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SERVICES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextCard = () => {
    setActiveIndex((current) => (current + 1) % SERVICES.length);
  };

  const prevCard = () => {
    setActiveIndex((current) =>
      current === 0 ? SERVICES.length - 1 : current - 1
    );
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Zentrox Technologies Digital Solutions"
      className="
        relative
        overflow-hidden
        bg-white
        py-20
        transition-colors
        duration-500
        dark:bg-[#0f172a]
        md:py-28
        lg:py-32
      "
    >
      {/* ===== BACKGROUND ELEMENTS ===== */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Subtle grid */}
        <div
          className="
            absolute inset-0
            opacity-[0.03]
            dark:opacity-[0.05]
          "
          style={{
            backgroundImage: `
              linear-gradient(rgba(100,116,139,.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100,116,139,.3) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Floating blobs */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute -left-32 top-10
            h-[500px] w-[500px]
            rounded-full
            bg-blue-500/[0.06]
            blur-[140px]
            dark:bg-blue-400/[0.08]
          "
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 35, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute -right-32 top-20
            h-[550px] w-[550px]
            rounded-full
            bg-amber-400/[0.05]
            blur-[160px]
            dark:bg-orange-400/[0.05]
          "
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute left-1/2 top-1/2
            h-[500px] w-[700px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-blue-500/[0.05]
            blur-[130px]
            dark:bg-blue-400/[0.06]
          "
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* ===== HERO TEXT ===== */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
              mx-auto mb-6
              inline-flex items-center gap-2.5
              rounded-full
              border border-blue-200/60
              bg-blue-50/70
              px-5 py-2
              text-[11px] font-bold
              tracking-[0.1em]
              text-blue-700
              backdrop-blur-md
              dark:border-blue-400/20
              dark:bg-blue-400/[0.06]
              dark:text-blue-200
              sm:text-xs
            "
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            {t(
              "hero.badge",
              "MOHALI, INDIA · BUILDING DIGITAL SOLUTIONS WORLDWIDE"
            )}
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="
              font-extrabold
              leading-[1.05]
              tracking-[-0.04em]
            "
          >
            <span className="block text-4xl text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {t("hero.line1", "Build Better.")}
            </span>
            <span
              className="
                mt-1 block
                bg-gradient-to-r
                from-blue-600
                via-indigo-500
                to-cyan-600
                bg-clip-text
                text-4xl
                text-transparent
                dark:from-blue-300
                dark:via-indigo-300
                dark:to-cyan-300
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              {t("hero.line2", "Grow Faster.")}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="
              mx-auto mt-6
              max-w-3xl
              text-[16px] leading-7
              text-slate-600
              dark:text-slate-300
              md:text-lg md:leading-8
            "
          >
            {t(
              "hero.description",
              "We create custom software, high-performance websites, mobile apps and digital growth systems that help ambitious businesses move forward."
            )}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact"
              className="
                group inline-flex min-w-[200px] items-center justify-center gap-2
                rounded-xl
                bg-gradient-to-r from-blue-600 to-blue-700
                px-7 py-4
                text-sm font-bold text-white
                shadow-[0_12px_30px_rgba(37,99,235,.25)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_20px_45px_rgba(37,99,235,.35)]
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600
              "
            >
              {t("hero.cta_primary", "Start Your Project")}
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/services"
              className="
                group inline-flex min-w-[200px] items-center justify-center gap-2
                rounded-xl
                border border-slate-200/80
                bg-white/70
                px-7 py-4
                text-sm font-bold text-slate-700
                shadow-sm
                backdrop-blur-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:border-blue-300
                hover:bg-white
                hover:text-blue-600
                hover:shadow-md
                dark:border-white/10
                dark:bg-white/[0.04]
                dark:text-slate-200
                dark:hover:border-blue-400/30
                dark:hover:bg-white/[0.08]
                dark:hover:text-blue-300
              "
            >
              Explore Our Services
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* ===== SERVICES CAROUSEL ===== */}
        <div
          className="relative mt-16 md:mt-20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Section label */}
          <div className="mb-7 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
              What We Do
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
              Technology built around your business
            </h2>
          </div>

          {/* Navigation Arrows (desktop) */}
          <button
            type="button"
            onClick={prevCard}
            aria-label="Previous service"
            className="
              absolute left-0 top-[58%] z-50 hidden -translate-y-1/2
              h-12 w-12 items-center justify-center
              rounded-full
              border border-slate-200/80
              bg-white/90
              text-slate-700
              shadow-lg
              backdrop-blur-xl
              transition-all
              hover:scale-105 hover:border-blue-300 hover:text-blue-600
              dark:border-white/10
              dark:bg-[#1e293b]/90
              dark:text-white
              xl:flex
            "
          >
            <ChevronLeft size={21} />
          </button>

          <button
            type="button"
            onClick={nextCard}
            aria-label="Next service"
            className="
              absolute right-0 top-[58%] z-50 hidden -translate-y-1/2
              h-12 w-12 items-center justify-center
              rounded-full
              border border-slate-200/80
              bg-white/90
              text-slate-700
              shadow-lg
              backdrop-blur-xl
              transition-all
              hover:scale-105 hover:border-blue-300 hover:text-blue-600
              dark:border-white/10
              dark:bg-[#1e293b]/90
              dark:text-white
              xl:flex
            "
          >
            <ChevronRight size={21} />
          </button>

          {/* Desktop 3D Carousel */}
          <div
            className="relative mx-auto hidden h-[360px] max-w-[1200px] lg:block"
            style={{ perspective: "1600px" }}
          >
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              const isActive = index === activeIndex;
              const accent = getAccentClasses(service.accent);

              return (
                <motion.div
                  key={service.id}
                  animate={getCardStyle(index, activeIndex)}
                  transition={{
                    type: "spring",
                    stiffness: 130,
                    damping: 22,
                    mass: 0.8,
                  }}
                  onClick={() => setActiveIndex(index)}
                  className="
                    absolute left-1/2 top-1/2
                    w-[340px] -translate-x-1/2 -translate-y-1/2
                    cursor-pointer
                  "
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className={`
                      group relative
                      min-h-[300px]
                      overflow-hidden rounded-3xl
                      border p-7
                      transition-all duration-500
                      ${
                        isActive
                          ? `
                            border-blue-300/60
                            bg-white/95
                            shadow-[0_25px_70px_rgba(37,99,235,.18)]
                            dark:border-blue-400/25
                            dark:bg-[#1e293b]/95
                          `
                          : `
                            border-slate-200/60
                            bg-white/80
                            shadow-[0_15px_45px_rgba(15,23,42,.06)]
                            dark:border-white/10
                            dark:bg-[#172032]/90
                          `
                      }
                    `}
                  >
                    {/* Glow overlay */}
                    <div
                      className={`
                        pointer-events-none absolute inset-0
                        bg-gradient-to-br ${accent.glow}
                        via-transparent to-transparent
                        opacity-60
                      `}
                    />

                    <div className="relative z-10">
                      {/* Icon */}
                      <div
                        className={`
                          flex h-14 w-14 items-center justify-center
                          rounded-2xl border
                          ${accent.icon}
                        `}
                      >
                        <Icon size={25} />
                      </div>

                      {/* Title */}
                      <h3 className="mt-6 text-xl font-bold leading-tight text-slate-900 dark:text-white">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {service.description}
                      </p>

                      {/* Link */}
                      <Link
                        href="/services"
                        onClick={(e) => e.stopPropagation()}
                        className="
                          group/link mt-6 inline-flex items-center gap-2
                          text-sm font-bold text-blue-600
                          transition-all hover:gap-3
                          dark:text-blue-300
                        "
                      >
                        Explore Service
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover/link:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile / Tablet: single active card */}
          <div className="mx-auto max-w-md lg:hidden">
            <AnimatePresence mode="wait">
              {SERVICES.map((service, index) => {
                if (index !== activeIndex) return null;
                const Icon = service.icon;
                const accent = getAccentClasses(service.accent);

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: 30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -30, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="
                      relative overflow-hidden rounded-3xl
                      border border-slate-200/60
                      bg-white/90
                      p-7
                      shadow-[0_20px_55px_rgba(15,23,42,.08)]
                      backdrop-blur-sm
                      dark:border-white/10
                      dark:bg-[#1e293b]/90
                    "
                  >
                    <div
                      className={`
                        absolute inset-0
                        bg-gradient-to-br ${accent.glow}
                        via-transparent to-transparent
                      `}
                    />
                    <div className="relative z-10">
                      <div
                        className={`
                          flex h-14 w-14 items-center justify-center
                          rounded-2xl border
                          ${accent.icon}
                        `}
                      >
                        <Icon size={25} />
                      </div>
                      <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {service.description}
                      </p>
                      <Link
                        href="/services"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-300"
                      >
                        Explore Service
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Mobile controls */}
            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={prevCard}
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-xl border border-slate-200/60
                  bg-white text-slate-700 shadow-sm
                  dark:border-white/10 dark:bg-[#1e293b] dark:text-white
                "
                aria-label="Previous service"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextCard}
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-xl border border-slate-200/60
                  bg-white text-slate-700 shadow-sm
                  dark:border-white/10 dark:bg-[#1e293b] dark:text-white
                "
                aria-label="Next service"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="mt-5 flex justify-center gap-2">
            {SERVICES.map((service, index) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${service.title}`}
                className="flex h-7 items-center justify-center px-1"
              >
                <motion.span
                  animate={{
                    width: index === activeIndex ? 28 : 8,
                    opacity: index === activeIndex ? 1 : 0.35,
                  }}
                  transition={{ duration: 0.25 }}
                  className="h-2 rounded-full bg-blue-600 dark:bg-blue-400"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ===== TRUST BAR ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            mx-auto mt-16
            grid max-w-5xl
            grid-cols-2
            overflow-hidden
            rounded-2xl
            border border-slate-200/60
            bg-white/80
            shadow-[0_10px_40px_rgba(15,23,42,.05)]
            backdrop-blur-md
            dark:border-white/10
            dark:bg-[#1e293b]/80
            md:grid-cols-4
          "
        >
          {[
            { label: "Founded in 2023", icon: "🚀" },
            { label: "Custom Solutions", icon: "⚙️" },
            { label: "Modern Technology", icon: "💡" },
            { label: "Global Delivery", icon: "🌍" },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`
                flex items-center justify-center gap-2.5
                px-4 py-4 text-center text-xs font-semibold
                text-slate-600 dark:text-slate-300
                ${index < 3 ? "md:border-r md:border-slate-200/60 dark:md:border-white/10" : ""}
              `}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

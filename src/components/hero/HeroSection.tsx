"use client";

import { useEffect, useState } from "react";
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
   SERVICES
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
   CARD POSITION
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
      opacity: 0.62,
      zIndex: 20,
      filter: "blur(0.3px)",
    },

    1: {
      x: "95%",
      scale: 0.78,
      rotateY: -12,
      opacity: 0.62,
      zIndex: 20,
      filter: "blur(0.3px)",
    },

    [-2]: {
      x: "-165%",
      scale: 0.6,
      rotateY: 18,
      opacity: 0.16,
      zIndex: 10,
      filter: "blur(1px)",
    },

    2: {
      x: "165%",
      scale: 0.6,
      rotateY: -18,
      opacity: 0.16,
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
   ACCENT COLORS
========================================================= */

function getAccentClasses(accent: string) {
  switch (accent) {
    case "cyan":
      return {
        icon: "bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-300",
        glow: "from-cyan-500/10",
      };

    case "purple":
      return {
        icon: "bg-violet-500/10 border-violet-500/20 text-violet-600 dark:text-violet-300",
        glow: "from-violet-500/10",
      };

    case "emerald":
      return {
        icon: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-300",
        glow: "from-emerald-500/10",
      };

    case "orange":
      return {
        icon: "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-300",
        glow: "from-orange-500/10",
      };

    default:
      return {
        icon: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-300",
        glow: "from-blue-500/10",
      };
  }
}

/* =========================================================
   HERO
========================================================= */

export default function HeroSection() {
  const { t } = useLang();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /* AUTO PLAY */

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SERVICES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  function nextCard() {
    setActiveIndex((current) => (current + 1) % SERVICES.length);
  }

  function previousCard() {
    setActiveIndex((current) =>
      current === 0 ? SERVICES.length - 1 : current - 1
    );
  }

  return (
    <section
      aria-label="Zentrox Technologies Digital Solutions"
      className="
        relative
        overflow-hidden
        bg-[#ffffff]
        py-24
        transition-colors
        duration-500
        dark:bg-[#111827]
        md:py-28
        lg:py-32
      "
    >
      {/* BACKGROUND */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* GRID */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            dark:opacity-[0.04]
          "
          style={{
            backgroundImage: `
              linear-gradient(rgba(100,116,139,.45) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100,116,139,.45) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />

        {/* SOFT BLOBS */}

        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-40
            top-10
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-500/[0.07]
            blur-[130px]
            dark:bg-blue-500/[0.09]
          "
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-40
            top-20
            h-[520px]
            w-[520px]
            rounded-full
            bg-amber-400/[0.05]
            blur-[140px]
            dark:bg-orange-400/[0.05]
          "
        />

        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-[45%]
            h-[450px]
            w-[650px]
            -translate-x-1/2
            rounded-full
            bg-blue-500/[0.06]
            blur-[120px]
            dark:bg-blue-500/[0.08]
          "
        />
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1440px]
          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* HERO TEXT */}

        <div className="mx-auto max-w-4xl text-center">
          {/* BADGE */}

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
              mx-auto
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-200
              bg-blue-50/80
              px-4
              py-2
              text-[10px]
              font-bold
              tracking-[0.08em]
              text-blue-700
              backdrop-blur-xl
              dark:border-blue-400/20
              dark:bg-blue-400/[0.07]
              dark:text-blue-200
              sm:text-xs
            "
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            {t(
              "hero.badge",
              "MOHALI, INDIA · BUILDING DIGITAL SOLUTIONS WORLDWIDE"
            )}
          </motion.div>

          {/* HEADING */}

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="
              font-extrabold
              leading-[1.02]
              tracking-[-0.045em]
            "
          >
            <span className="block text-4xl text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {t("hero.line1", "Build Better.")}
            </span>

            <span
              className="
                mt-2
                block
                bg-gradient-to-r
                from-blue-600
                via-blue-500
                to-teal-600
                bg-clip-text
                text-4xl
                text-transparent
                dark:from-blue-300
                dark:via-blue-400
                dark:to-teal-300
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              {t("hero.line2", "Grow Faster.")}
            </span>
          </motion.h1>

          {/* DESCRIPTION */}

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-[15px]
              leading-7
              text-slate-600
              dark:text-slate-300
              md:text-lg
            "
          >
            {t(
              "hero.description",
              "We create custom software, high-performance websites, mobile apps and digital growth systems that help ambitious businesses move forward."
            )}
          </motion.p>

          {/* CTA */}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="
              mt-8
              flex
              flex-col
              items-center
              justify-center
              gap-3
              sm:flex-row
            "
          >
            <Link
              href="/contact"
              className="
                group
                inline-flex
                min-w-[190px]
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-blue-700
                px-6
                py-4
                text-sm
                font-bold
                text-white
                shadow-[0_12px_30px_rgba(37,99,235,.22)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_18px_40px_rgba(37,99,235,.30)]
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
                inline-flex
                min-w-[190px]
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white/80
                px-6
                py-4
                text-sm
                font-bold
                text-slate-700
                shadow-sm
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-300
                hover:text-blue-600
                dark:border-white/10
                dark:bg-white/[0.04]
                dark:text-slate-200
              "
            >
              Explore Our Services

              <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>

        {/* CAROUSEL */}

        <div
          className="relative mt-16 md:mt-20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* SECTION LABEL */}

          <div className="mb-7 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
              What We Do
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
              Technology built around your business
            </h2>
          </div>

          {/* ARROWS */}

          <button
            type="button"
            onClick={previousCard}
            aria-label="Previous service"
            className="
              absolute
              left-0
              top-[58%]
              z-50
              hidden
              h-12
              w-12
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white/90
              text-slate-700
              shadow-lg
              backdrop-blur-xl
              transition-all
              hover:scale-105
              hover:border-blue-300
              hover:text-blue-600
              dark:border-white/10
              dark:bg-[#1c293b]/90
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
              absolute
              right-0
              top-[58%]
              z-50
              hidden
              h-12
              w-12
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white/90
              text-slate-700
              shadow-lg
              backdrop-blur-xl
              transition-all
              hover:scale-105
              hover:border-blue-300
              hover:text-blue-600
              dark:border-white/10
              dark:bg-[#1c293b]/90
              dark:text-white
              xl:flex
            "
          >
            <ChevronRight size={21} />
          </button>

          {/* DESKTOP 3D CAROUSEL */}

          <div
            className="
              relative
              mx-auto
              hidden
              h-[340px]
              max-w-[1200px]
              lg:block
            "
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
                    stiffness: 120,
                    damping: 20,
                    mass: 0.8,
                  }}
                  onClick={() => setActiveIndex(index)}
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    w-[330px]
                    -translate-x-1/2
                    -translate-y-1/2
                    cursor-pointer
                  "
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className={`
                      group
                      relative
                      min-h-[280px]
                      overflow-hidden
                      rounded-3xl
                      border
                      p-7
                      transition-all
                      duration-500
                      ${
                        isActive
                          ? `
                            border-blue-300
                            bg-white/[0.96]
                            shadow-[0_25px_70px_rgba(37,99,235,.18)]
                            dark:border-blue-400/25
                            dark:bg-[#1c293b]/95
                          `
                          : `
                            border-slate-200
                            bg-white/80
                            shadow-[0_15px_45px_rgba(15,23,42,.07)]
                            dark:border-white/10
                            dark:bg-[#162033]/90
                          `
                      }
                    `}
                  >
                    <div
                      className={`
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-br
                        ${accent.glow}
                        via-transparent
                        to-transparent
                        opacity-70
                      `}
                    />

                    <div className="relative z-10">
                      <div
                        className={`
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          ${accent.icon}
                        `}
                      >
                        <Icon size={25} />
                      </div>

                      <h3 className="mt-6 text-xl font-bold leading-tight text-slate-900 dark:text-white">
                        {service.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {service.description}
                      </p>

                      <Link
                        href="/services"
                        onClick={(event) => event.stopPropagation()}
                        className="
                          group/link
                          mt-6
                          inline-flex
                          items-center
                          gap-2
                          text-sm
                          font-bold
                          text-blue-600
                          transition-all
                          hover:gap-3
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

          {/* MOBILE / TABLET ACTIVE CARD */}

          <div className="mx-auto max-w-md lg:hidden">
            <AnimatePresence mode="wait">
              {SERVICES.map((service, index) => {
                if (index !== activeIndex) return null;

                const Icon = service.icon;
                const accent = getAccentClasses(service.accent);

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: 35, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -35, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                    className="
                      relative
                      overflow-hidden
                      rounded-3xl
                      border
                      border-slate-200
                      bg-white/90
                      p-7
                      shadow-[0_20px_55px_rgba(15,23,42,.08)]
                      dark:border-white/10
                      dark:bg-[#1c293b]/90
                    "
                  >
                    <div
                      className={`
                        absolute
                        inset-0
                        bg-gradient-to-br
                        ${accent.glow}
                        via-transparent
                        to-transparent
                      `}
                    />

                    <div className="relative z-10">
                      <div
                        className={`
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          border
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
                        className="
                          mt-6
                          inline-flex
                          items-center
                          gap-2
                          text-sm
                          font-bold
                          text-blue-600
                          dark:text-blue-300
                        "
                      >
                        Explore Service
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={previousCard}
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-700
                  shadow-sm
                  dark:border-white/10
                  dark:bg-[#1c293b]
                  dark:text-white
                "
                aria-label="Previous service"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextCard}
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-700
                  shadow-sm
                  dark:border-white/10
                  dark:bg-[#1c293b]
                  dark:text-white
                "
                aria-label="Next service"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* DOTS */}

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

        {/* TRUST BAR */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            mx-auto
            mt-16
            grid
            max-w-5xl
            grid-cols-2
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white/80
            shadow-[0_10px_40px_rgba(15,23,42,.06)]
            backdrop-blur-xl
            dark:border-white/10
            dark:bg-[#1c293b]/80
            md:grid-cols-4
          "
        >
          {[
            "Founded in 2023",
            "Custom Solutions",
            "Modern Technology",
            "Global Delivery",
          ].map((item, index) => (
            <div
              key={item}
              className={`
                flex
                items-center
                justify-center
                gap-2
                px-4
                py-4
                text-center
                text-xs
                font-semibold
                text-slate-600
                dark:text-slate-300
                ${
                  index < 3
                    ? "md:border-r md:border-slate-200 dark:md:border-white/10"
                    : ""
                }
              `}
            >
              <CheckCircle2
                size={17}
                className="shrink-0 text-blue-600 dark:text-blue-400"
              />

              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

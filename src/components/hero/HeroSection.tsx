"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
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
      "Fast, SEO-friendly, modern websites that build trust and help your business grow.",
    icon: Globe2,
    accent: "blue",
  },
  {
    id: 1,
    title: "Mobile App Development",
    description:
      "Cross-platform mobile apps for Android and iOS that engage your users.",
    icon: Smartphone,
    accent: "cyan",
  },
  {
    id: 2,
    title: "Custom Software Development",
    description:
      "Scalable, secure and high-performance software tailored to your business workflows.",
    icon: Code2,
    accent: "purple",
  },
  {
    id: 3,
    title: "AI Integration & Automation",
    description:
      "Smart AI solutions to automate tasks and improve your business productivity.",
    icon: Bot,
    accent: "emerald",
  },
  {
    id: 4,
    title: "Digital Marketing & SEO",
    description:
      "Rank higher, get more traffic, generate quality leads and grow online.",
    icon: BarChart3,
    accent: "pink",
  },
];

/* =========================================================
   3D CARD POSITION
========================================================= */

function getCardStyle(index: number, activeIndex: number) {
  const total = SERVICES.length;

  let position = index - activeIndex;

  if (position > total / 2) position -= total;
  if (position < -total / 2) position += total;

  if (position === 0) {
    return {
      x: "0%",
      scale: 1,
      rotateY: 0,
      rotateZ: 0,
      opacity: 1,
      zIndex: 50,
      filter: "blur(0px)",
    };
  }

  if (position === -1) {
    return {
      x: "-112%",
      scale: 0.82,
      rotateY: 18,
      rotateZ: -5,
      opacity: 0.78,
      zIndex: 30,
      filter: "blur(0px)",
    };
  }

  if (position === 1) {
    return {
      x: "112%",
      scale: 0.82,
      rotateY: -18,
      rotateZ: 5,
      opacity: 0.78,
      zIndex: 30,
      filter: "blur(0px)",
    };
  }

  if (position === -2) {
    return {
      x: "-205%",
      scale: 0.65,
      rotateY: 25,
      rotateZ: -8,
      opacity: 0.28,
      zIndex: 10,
      filter: "blur(1px)",
    };
  }

  if (position === 2) {
    return {
      x: "205%",
      scale: 0.65,
      rotateY: -25,
      rotateZ: 8,
      opacity: 0.28,
      zIndex: 10,
      filter: "blur(1px)",
    };
  }

  return {
    x: position > 0 ? "280%" : "-280%",
    scale: 0.5,
    rotateY: position > 0 ? -25 : 25,
    opacity: 0,
    zIndex: 0,
    filter: "blur(4px)",
  };
}

/* =========================================================
   ACCENT CLASSES
========================================================= */

function getAccentClasses(accent: string) {
  switch (accent) {
    case "purple":
      return "border-purple-400/30 bg-purple-500/10 text-purple-500 dark:text-purple-400";

    case "cyan":
      return "border-cyan-400/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400";

    case "emerald":
      return "border-emerald-400/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

    case "pink":
      return "border-pink-400/30 bg-pink-500/10 text-pink-600 dark:text-pink-400";

    default:
      return "border-blue-400/30 bg-blue-500/10 text-blue-600 dark:text-blue-400";
  }
}

/* =========================================================
   HERO SECTION
========================================================= */

export default function HeroSection() {
  const { t } = useLang();

  const sectionRef = useRef<HTMLElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(2);
  const [scrollStep, setScrollStep] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* =======================================================
     SCROLL CONTROL
  ======================================================= */

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.05) return;

    const nextStep = Math.min(
      SERVICES.length - 1,
      Math.floor(latest * SERVICES.length)
    );

    if (nextStep !== scrollStep) {
      setScrollStep(nextStep);
      setActiveIndex(nextStep);
    }
  });

  /* =======================================================
     AUTO PLAY
  ======================================================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => {
        return (current + 1) % SERVICES.length;
      });
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  function nextCard() {
    setActiveIndex((current) => {
      return (current + 1) % SERVICES.length;
    });
  }

  function previousCard() {
    setActiveIndex((current) => {
      return current === 0
        ? SERVICES.length - 1
        : current - 1;
    });
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Zentrox Technologies Digital Solutions"
      className="
        relative
        h-[185vh]
        overflow-hidden
        bg-[#f8fafc]
        transition-colors
        duration-500
        dark:bg-[#050914]
      "
    >
      {/* ===================================================
          STICKY SCREEN
      ==================================================== */}

      <div className="sticky top-0 h-screen overflow-hidden">
        {/* =================================================
            BACKGROUND
        ================================================= */}

        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          {/* GRID */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.045]
              dark:opacity-[0.10]
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(100,116,139,.5) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(100,116,139,.5) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "72px 72px",
            }}
          />

          {/* TOP CENTER GLOW */}

          <div
            className="
              absolute
              left-1/2
              top-[20%]
              h-[600px]
              w-[850px]
              -translate-x-1/2
              rounded-full
              bg-blue-500/[0.07]
              blur-[160px]
              dark:bg-blue-600/[0.14]
            "
          />

          {/* LEFT GLOW */}

          <div
            className="
              absolute
              -left-40
              bottom-[-100px]
              h-[500px]
              w-[500px]
              rounded-full
              bg-blue-500/[0.08]
              blur-[150px]
              dark:bg-blue-500/[0.14]
            "
          />

          {/* RIGHT GLOW */}

          <div
            className="
              absolute
              -right-40
              bottom-[-100px]
              h-[500px]
              w-[500px]
              rounded-full
              bg-cyan-500/[0.08]
              blur-[150px]
              dark:bg-cyan-500/[0.14]
            "
          />

          {/* FLOOR */}

          <div
            className="
              absolute
              bottom-[-150px]
              left-1/2
              h-[300px]
              w-[900px]
              -translate-x-1/2
              rounded-full
              bg-blue-500/[0.08]
              blur-[100px]
              dark:bg-blue-500/[0.18]
            "
          />

          {/* PARTICLES */}

          <div className="absolute left-[8%] top-[30%] h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_12px_3px_rgba(59,130,246,.5)]" />

          <div className="absolute right-[12%] top-[40%] h-1 w-1 rounded-full bg-cyan-500 shadow-[0_0_12px_3px_rgba(6,182,212,.5)]" />

          <div className="absolute left-[15%] bottom-[25%] h-1 w-1 rounded-full bg-blue-400" />

          <div className="absolute right-[8%] bottom-[30%] h-1 w-1 rounded-full bg-cyan-400" />
        </div>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            h-full
            w-full
            max-w-[1500px]
            flex-col
            justify-center
            px-4
            pt-20
            pb-5
            md:px-8
            lg:px-12
          "
        >
          {/* ===============================================
              HERO TEXT
          =============================================== */}

          <div className="mx-auto w-full max-w-5xl text-center">
            {/* BADGE */}

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="
                mx-auto
                mb-4
                flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-blue-400/30
                bg-white/70
                px-4
                py-2
                text-[10px]
                font-bold
                tracking-[0.1em]
                text-slate-600
                shadow-sm
                backdrop-blur-xl
                dark:bg-blue-500/[0.08]
                dark:text-blue-200
                sm:text-xs
              "
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,.8)]" />

              {t(
                "hero.badge",
                "MOHALI & CHANDIGARH — MSME REGISTERED TECHNOLOGY COMPANY"
              )}
            </motion.div>

            {/* HEADING */}

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="font-extrabold leading-[0.95] tracking-tight"
            >
              <span className="block text-4xl text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {t("hero.line1", "We Build")}
              </span>

              <span
                className="
                  mt-2
                  block
                  bg-gradient-to-r
                  from-blue-600
                  via-blue-500
                  to-cyan-500
                  bg-clip-text
                  text-4xl
                  text-transparent
                  dark:from-blue-400
                  dark:via-blue-500
                  dark:to-cyan-300
                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                "
              >
                {t("hero.line2", "Digital Solutions")}
              </span>
            </motion.h1>

            {/* DESCRIPTION */}

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="
                mx-auto
                mt-4
                max-w-3xl
                text-sm
                leading-relaxed
                text-slate-600
                dark:text-slate-300
                md:text-base
              "
            >
              {t(
                "hero.description",
                "Custom Software, Websites, Mobile Apps, AI, SEO & Digital Marketing to help your business grow in the modern world."
              )}
            </motion.p>

            {/* BUTTONS */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="
                mt-5
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
                  items-center
                  gap-2
                  rounded-full
                  bg-gradient-to-r
                  from-blue-600
                  to-blue-500
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_10px_30px_rgba(37,99,235,.3)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_15px_40px_rgba(37,99,235,.4)]
                "
              >
                {t("hero.cta_primary", "Start Your Project")}

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/services"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-slate-300
                  bg-white/70
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-slate-800
                  shadow-sm
                  backdrop-blur-xl
                  transition-all
                  hover:-translate-y-1
                  hover:border-blue-400
                  dark:border-white/15
                  dark:bg-white/[0.04]
                  dark:text-white
                "
              >
                <span className="h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-current" />

                {t("hero.cta_secondary", "View Our Work")}
              </Link>
            </motion.div>
          </div>

          {/* ===============================================
              3D CAROUSEL
          =============================================== */}

          <div className="relative mt-5 md:mt-6">
            {/* CENTER GLOW */}

            <motion.div
              animate={{
                opacity: [0.25, 0.65, 0.25],
                scale: [0.9, 1.08, 0.9],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[260px]
                w-[500px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-blue-500/[0.10]
                blur-[80px]
                dark:bg-blue-500/[0.18]
              "
            />

            {/* LEFT ARROW */}

            <button
              type="button"
              onClick={previousCard}
              aria-label="Previous service"
              className="
                absolute
                left-2
                top-1/2
                z-[70]
                hidden
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-slate-300
                bg-white/80
                text-slate-700
                shadow-lg
                backdrop-blur-xl
                transition-all
                hover:scale-110
                hover:border-blue-400
                dark:border-white/15
                dark:bg-white/[0.06]
                dark:text-white
                lg:flex
              "
            >
              <ChevronLeft size={21} />
            </button>

            {/* RIGHT ARROW */}

            <button
              type="button"
              onClick={nextCard}
              aria-label="Next service"
              className="
                absolute
                right-2
                top-1/2
                z-[70]
                hidden
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-slate-300
                bg-white/80
                text-slate-700
                shadow-lg
                backdrop-blur-xl
                transition-all
                hover:scale-110
                hover:border-blue-400
                dark:border-white/15
                dark:bg-white/[0.06]
                dark:text-white
                lg:flex
              "
            >
              <ChevronRight size={21} />
            </button>

            {/* CARDS */}

            <div
              className="
                relative
                mx-auto
                h-[265px]
                w-full
                max-w-[1180px]
                overflow-visible
                sm:h-[280px]
                md:h-[295px]
              "
              style={{
                perspective: "1800px",
              }}
            >
              {SERVICES.map((service, index) => {
                const Icon = service.icon;

                const isActive = index === activeIndex;

                const cardStyle = getCardStyle(
                  index,
                  activeIndex
                );

                return (
                  <motion.div
                    key={service.id}
                    animate={cardStyle}
                    transition={{
                      type: "spring",
                      stiffness: 130,
                      damping: 21,
                      mass: 0.8,
                    }}
                    onClick={() => setActiveIndex(index)}
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      w-[245px]
                      -translate-x-1/2
                      -translate-y-1/2
                      cursor-pointer
                      sm:w-[270px]
                      md:w-[300px]
                    "
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className={`
                        relative
                        min-h-[245px]
                        overflow-hidden
                        rounded-[22px]
                        border
                        p-5
                        backdrop-blur-xl
                        transition-all
                        duration-500

                        ${
                          isActive
                            ? `
                              border-blue-400/70
                              bg-white/90
                              shadow-[0_20px_60px_rgba(37,99,235,.22)]
                              dark:bg-[#101827]/90
                              dark:shadow-[0_25px_80px_rgba(37,99,235,.30)]
                            `
                            : `
                              border-slate-200
                              bg-white/70
                              shadow-xl
                              dark:border-white/10
                              dark:bg-[#0d1525]/80
                            `
                        }
                      `}
                    >
                      {/* ACTIVE EFFECT */}

                      {isActive && (
                        <>
                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-0
                              bg-gradient-to-br
                              from-blue-500/[0.08]
                              via-transparent
                              to-purple-500/[0.08]
                            "
                          />

                          <div
                            className="
                              absolute
                              bottom-0
                              left-1/2
                              h-px
                              w-2/3
                              -translate-x-1/2
                              bg-gradient-to-r
                              from-transparent
                              via-blue-400
                              to-transparent
                            "
                          />
                        </>
                      )}

                      <div className="relative z-10">
                        {/* ICON */}

                        <div
                          className={`
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            ${getAccentClasses(service.accent)}
                          `}
                        >
                          <Icon size={23} />
                        </div>

                        {/* TITLE */}

                        <h3
                          className={`
                            mt-4
                            font-bold
                            leading-tight
                            text-slate-900
                            dark:text-white
                            ${
                              isActive
                                ? "text-xl md:text-2xl"
                                : "text-lg"
                            }
                          `}
                        >
                          {service.title}
                        </h3>

                        {/* DESCRIPTION */}

                        <p
                          className="
                            mt-3
                            text-xs
                            leading-6
                            text-slate-600
                            dark:text-slate-400
                            md:text-sm
                          "
                        >
                          {service.description}
                        </p>

                        {/* LINK */}

                        <Link
                          href="/services"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                          className="
                            group
                            mt-4
                            inline-flex
                            items-center
                            gap-2
                            text-xs
                            font-bold
                            text-blue-600
                            transition-all
                            hover:gap-3
                            dark:text-blue-400
                          "
                        >
                          Explore Service

                          <ArrowRight
                            size={15}
                            className="
                              transition-transform
                              group-hover:translate-x-1
                            "
                          />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* DOTS */}

            <div className="mt-1 flex justify-center gap-2">
              {SERVICES.map((service, index) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${service.title}`}
                  className="
                    flex
                    h-6
                    items-center
                    justify-center
                  "
                >
                  <motion.span
                    animate={{
                      width:
                        index === activeIndex
                          ? 18
                          : 8,
                      opacity:
                        index === activeIndex
                          ? 1
                          : 0.4,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="
                      h-2
                      rounded-full
                      bg-blue-500
                      shadow-[0_0_10px_rgba(59,130,246,.5)]
                      dark:bg-blue-400
                    "
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ===============================================
              TRUST BAR
          =============================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="
              mx-auto
              mt-4
              grid
              w-full
              max-w-5xl
              grid-cols-2
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white/75
              shadow-lg
              backdrop-blur-xl
              dark:border-white/10
              dark:bg-[#0d1525]/80
              md:grid-cols-4
            "
          >
            {[
              "Founded in 2023",
              "Custom Solutions",
              "Cutting-edge Technology",
              "Global Delivery",
            ].map((item, index) => (
              <div
                key={item}
                className={`
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-3
                  py-3
                  text-center
                  text-xs
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                  ${
                    index !== 3
                      ? `
                        md:border-r
                        md:border-slate-200
                        dark:md:border-white/10
                      `
                      : ""
                  }
                `}
              >
                <CheckCircle2
                  size={17}
                  className="shrink-0 text-blue-500"
                />

                <span>{item}</span>
              </div>
            ))}
          </motion.div>

          {/* SCROLL TEXT */}

          <div
            className="
              mt-2
              text-center
              text-[9px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-slate-400
              dark:text-slate-500
            "
          >
            Scroll to explore services
          </div>
        </div>
      </div>
    </section>
  );
}
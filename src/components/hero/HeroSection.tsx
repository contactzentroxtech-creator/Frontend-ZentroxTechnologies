"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
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
  Sparkles,
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
      "Fast, SEO-friendly, modern websites that build trust and scale your brand.",
    icon: Globe2,
    accent: "blue",
  },
  {
    id: 1,
    title: "Mobile App Development",
    description:
      "Cross-platform mobile apps for Android & iOS that engage users.",
    icon: Smartphone,
    accent: "cyan",
  },
  {
    id: 2,
    title: "Custom Software Development",
    description:
      "Scalable, secure, and high-performance software tailored to your business workflows.",
    icon: Code2,
    accent: "purple",
  },
  {
    id: 3,
    title: "AI Integration & Automation",
    description:
      "Smart AI solutions to automate tasks and improve business productivity.",
    icon: Bot,
    accent: "emerald",
  },
  {
    id: 4,
    title: "Digital Marketing & SEO",
    description:
      "Rank higher, get more traffic, generate leads and grow your business online.",
    icon: BarChart3,
    accent: "pink",
  },
];

/* =========================================================
   CARD POSITIONS
========================================================= */

function getCardStyle(index: number, activeIndex: number) {
  const total = SERVICES.length;

  let position = index - activeIndex;

  if (position > total / 2) {
    position -= total;
  }

  if (position < -total / 2) {
    position += total;
  }

  const absPosition = Math.abs(position);

  /* CENTER CARD */
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

  /* LEFT */
  if (position === -1) {
    return {
      x: "-108%",
      scale: 0.88,
      rotateY: 12,
      rotateZ: -6,
      opacity: 0.85,
      zIndex: 30,
      filter: "blur(0px)",
    };
  }

  /* RIGHT */
  if (position === 1) {
    return {
      x: "108%",
      scale: 0.88,
      rotateY: -12,
      rotateZ: 6,
      opacity: 0.85,
      zIndex: 30,
      filter: "blur(0px)",
    };
  }

  /* FAR LEFT */
  if (position === -2) {
    return {
      x: "-205%",
      scale: 0.72,
      rotateY: 18,
      rotateZ: -8,
      opacity: 0.45,
      zIndex: 10,
      filter: "blur(1px)",
    };
  }

  /* FAR RIGHT */
  if (position === 2) {
    return {
      x: "205%",
      scale: 0.72,
      rotateY: -18,
      rotateZ: 8,
      opacity: 0.45,
      zIndex: 10,
      filter: "blur(1px)",
    };
  }

  return {
    x: position > 0 ? "280%" : "-280%",
    scale: 0.6,
    rotateY: position > 0 ? -20 : 20,
    opacity: 0,
    zIndex: 0,
    filter: "blur(4px)",
  };
}

/* =========================================================
   COMPONENT
========================================================= */

export default function HeroSection() {
  const { t } = useLang();

  const sectionRef = useRef<HTMLElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(2);
  const [lastScrollStep, setLastScrollStep] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* =========================================================
     SCROLL → CHANGE CARDS
  ========================================================= */

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {
      /*
       0 → 1 scroll progress
       5 zones = cards change
      */

      const step = Math.min(
        SERVICES.length - 1,
        Math.floor(latest * SERVICES.length)
      );

      if (step !== lastScrollStep && latest > 0.05) {
        setLastScrollStep(step);

        setActiveIndex(step);
      }
    }
  );

  /* =========================================================
     AUTO PLAY
  ========================================================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        return (prev + 1) % SERVICES.length;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  function nextCard() {
    setActiveIndex((prev) => {
      return (prev + 1) % SERVICES.length;
    });
  }

  function previousCard() {
    setActiveIndex((prev) => {
      return prev === 0
        ? SERVICES.length - 1
        : prev - 1;
    });
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Zentrox Technologies"
      className="
        relative
        min-h-[180vh]
        bg-white
        transition-colors
        duration-500
        dark:bg-[#050914]
      "
    >
      {/* =====================================================
          STICKY HERO
      ====================================================== */}

      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">

        {/* ===================================================
            BACKGROUND
        ==================================================== */}

        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          {/* Dark grid */}

          <div
            className="
              absolute inset-0
              opacity-[0.06]
              dark:opacity-[0.12]
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(100,116,139,.35) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(100,116,139,.35) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "72px 72px",
            }}
          />

          {/* Center Glow */}

          <div
            className="
              absolute
              left-1/2
              top-[42%]
              h-[700px]
              w-[900px]
              -translate-x-1/2
              rounded-full
              bg-blue-500/[0.07]
              blur-[170px]

              dark:bg-blue-600/[0.12]
            "
          />

          {/* Left Glow */}

          <div
            className="
              absolute
              -left-40
              bottom-0
              h-[450px]
              w-[450px]
              rounded-full
              bg-blue-500/[0.08]
              blur-[130px]

              dark:bg-blue-500/[0.14]
            "
          />

          {/* Right Glow */}

          <div
            className="
              absolute
              -right-40
              bottom-0
              h-[450px]
              w-[450px]
              rounded-full
              bg-cyan-500/[0.07]
              blur-[130px]

              dark:bg-cyan-500/[0.12]
            "
          />

          {/* Blue floor glow */}

          <div
            className="
              absolute
              bottom-0
              left-1/2
              h-[220px]
              w-[900px]
              -translate-x-1/2
              rounded-full
              bg-blue-500/[0.06]
              blur-[90px]

              dark:bg-blue-600/[0.15]
            "
          />

          {/* Stars */}

          <div className="absolute left-[8%] top-[45%] h-1 w-1 rounded-full bg-blue-400 shadow-[0_0_12px_2px_rgba(59,130,246,.8)]" />

          <div className="absolute right-[13%] top-[48%] h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,.8)]" />

          <div className="absolute right-[6%] top-[65%] h-1 w-1 rounded-full bg-blue-400" />

          <div className="absolute left-[18%] top-[70%] h-1 w-1 rounded-full bg-blue-400" />
        </div>

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pt-24 md:px-8 lg:px-12">

          {/* =================================================
              TOP HERO
          ================================================= */}

          <div className="mx-auto max-w-5xl text-center">

            {/* Badge */}

            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                mx-auto
                mb-7
                flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-blue-400/30
                bg-blue-500/[0.06]
                px-5
                py-2.5
                text-[11px]
                font-bold
                tracking-[0.12em]
                text-slate-600

                dark:bg-blue-500/[0.08]
                dark:text-blue-200

                md:text-xs
              "
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,1)]" />

              {t(
                "hero.badge",
                "MOHALI & CHANDIGARH — MSME REGISTERED TECHNOLOGY COMPANY"
              )}
            </motion.div>

            {/* Heading */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="
                font-extrabold
                leading-[0.9]
                tracking-tight
              "
            >
              <span
                className="
                  block
                  text-5xl
                  text-slate-900

                  dark:text-white

                  sm:text-6xl
                  md:text-7xl
                  lg:text-8xl
                "
              >
                {t("hero.line1", "We Build")}
              </span>

              <span
                className="
                  mt-3
                  block
                  bg-gradient-to-r
                  from-blue-600
                  via-blue-500
                  to-cyan-400
                  bg-clip-text
                  text-5xl
                  text-transparent

                  dark:from-blue-500
                  dark:via-blue-400
                  dark:to-cyan-300

                  sm:text-6xl
                  md:text-7xl
                  lg:text-8xl
                "
              >
                {t(
                  "hero.line2",
                  "Digital Solutions"
                )}
              </span>
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="
                mx-auto
                mt-6
                max-w-3xl
                text-base
                leading-relaxed
                text-slate-600

                dark:text-slate-300

                md:text-lg
              "
            >
              {t(
                "hero.description",
                "Custom Software, Websites, Mobile Apps, AI, SEO & Digital Marketing to grow your business in the modern world."
              )}
            </motion.p>

            {/* Buttons */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              className="
                mt-7
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
                  gap-3
                  rounded-full
                  bg-gradient-to-r
                  from-blue-600
                  to-blue-500
                  px-7
                  py-4
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_12px_35px_rgba(37,99,235,.35)]
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:shadow-[0_18px_45px_rgba(37,99,235,.45)]
                "
              >
                {t(
                  "hero.cta_primary",
                  "Start Your Project"
                )}

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>

              <Link
                href="/services"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-slate-300
                  bg-white/50
                  px-7
                  py-4
                  text-sm
                  font-bold
                  text-slate-800
                  backdrop-blur-xl
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-blue-400

                  dark:border-white/15
                  dark:bg-white/[0.03]
                  dark:text-white
                  dark:hover:border-blue-400/60
                "
              >
                <span className="flex h-5 w-5 items-center justify-center">
                  <span className="h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-current" />
                </span>

                {t(
                  "hero.cta_secondary",
                  "View Our Work"
                )}
              </Link>
            </motion.div>
          </div>

          {/* =================================================
              3D SERVICES CAROUSEL
          ================================================= */}

          <div className="relative mt-8 md:mt-10">

            {/* Glow behind center */}

            <motion.div
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[300px]
                w-[500px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-blue-500/[0.08]
                blur-[90px]

                dark:bg-blue-500/[0.16]
              "
            />

            {/* Left Arrow */}

            <button
              onClick={previousCard}
              aria-label="Previous service"
              className="
                absolute
                left-0
                top-1/2
                z-[70]
                hidden
                h-12
                w-12
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-slate-300
                bg-white/70
                text-slate-700
                shadow-lg
                backdrop-blur-xl
                transition-all

                hover:scale-110
                hover:border-blue-400

                dark:border-white/15
                dark:bg-white/[0.05]
                dark:text-white

                lg:flex
              "
            >
              <ChevronLeft size={23} />
            </button>

            {/* Right Arrow */}

            <button
              onClick={nextCard}
              aria-label="Next service"
              className="
                absolute
                right-0
                top-1/2
                z-[70]
                hidden
                h-12
                w-12
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-slate-300
                bg-white/70
                text-slate-700
                shadow-lg
                backdrop-blur-xl
                transition-all

                hover:scale-110
                hover:border-blue-400

                dark:border-white/15
                dark:bg-white/[0.05]
                dark:text-white

                lg:flex
              "
            >
              <ChevronRight size={23} />
            </button>

            {/* CARDS AREA */}

            <div
              className="
                relative
                mx-auto
                h-[310px]
                w-full
                max-w-[1180px]
                overflow-visible

                sm:h-[330px]
                md:h-[360px]
              "
              style={{
                perspective: "1800px",
              }}
            >
              {SERVICES.map(
                (service, index) => {
                  const Icon = service.icon;

                  const isActive =
                    index === activeIndex;

                  const cardStyle =
                    getCardStyle(
                      index,
                      activeIndex
                    );

                  return (
                    <motion.div
                      key={service.id}
                      animate={cardStyle}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                        mass: 0.8,
                      }}
                      onClick={() =>
                        setActiveIndex(index)
                      }
                      className="
                        absolute
                        left-1/2
                        top-1/2
                        w-[280px]
                        -translate-x-1/2
                        -translate-y-1/2
                        cursor-pointer

                        sm:w-[310px]
                        md:w-[340px]
                      "
                      style={{
                        transformStyle:
                          "preserve-3d",
                      }}
                    >
                      <div
                        className={`
                          relative
                          min-h-[285px]
                          overflow-hidden
                          rounded-[24px]
                          border
                          p-6
                          backdrop-blur-xl
                          transition-all
                          duration-500

                          ${
                            isActive
                              ? `
                                border-blue-400/70
                                bg-white/80
                                shadow-[0_20px_70px_rgba(37,99,235,.22)]
                                dark:bg-[#111827]/85
                                dark:shadow-[0_25px_90px_rgba(79,70,229,.32)]
                              `
                              : `
                                border-slate-200
                                bg-white/70
                                shadow-xl
                                dark:border-white/10
                                dark:bg-[#0f172a]/75
                              `
                          }
                        `}
                      >
                        {/* Active glow */}

                        {isActive && (
                          <>
                            <div
                              className="
                                pointer-events-none
                                absolute
                                inset-0
                                rounded-[24px]
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
                                shadow-[0_0_18px_rgba(96,165,250,.9)]
                              "
                            />
                          </>
                        )}

                        <div className="relative z-10">

                          {/* Icon */}

                          <div
                            className={`
                              flex
                              h-14
                              w-14
                              items-center
                              justify-center
                              rounded-2xl
                              border

                              ${
                                service.accent ===
                                "purple"
                                  ? `
                                    border-purple-400/30
                                    bg-purple-500/10
                                    text-purple-500
                                  `
                                  : ""
                              }

                              ${
                                service.accent ===
                                "blue"
                                  ? `
                                    border-blue-400/30
                                    bg-blue-500/10
                                    text-blue-500
                                  `
                                  : ""
                              }

                              ${
                                service.accent ===
                                "cyan"
                                  ? `
                                    border-cyan-400/30
                                    bg-cyan-500/10
                                    text-cyan-500
                                  `
                                  : ""
                              }

                              ${
                                service.accent ===
                                "emerald"
                                  ? `
                                    border-emerald-400/30
                                    bg-emerald-500/10
                                    text-emerald-500
                                  `
                                  : ""
                              }

                              ${
                                service.accent ===
                                "pink"
                                  ? `
                                    border-pink-400/30
                                    bg-pink-500/10
                                    text-pink-500
                                  `
                                  : ""
                              }
                            `}
                          >
                            <Icon size={27} />
                          </div>

                          {/* Title */}

                          <h3
                            className={`
                              mt-6
                              text-xl
                              font-bold
                              leading-tight
                              text-slate-900
                              dark:text-white

                              ${
                                isActive
                                  ? "md:text-2xl"
                                  : ""
                              }
                            `}
                          >
                            {service.title}
                          </h3>

                          {/* Description */}

                          <p
                            className="
                              mt-4
                              text-sm
                              leading-7
                              text-slate-600
                              dark:text-slate-400
                            "
                          >
                            {service.description}
                          </p>

                          {/* CTA */}

                          <Link
                            href="/services"
                            onClick={(event) =>
                              event.stopPropagation()
                            }
                            className="
                              group
                              mt-6
                              inline-flex
                              items-center
                              gap-2
                              text-sm
                              font-semibold
                              text-blue-600
                              transition-all

                              hover:gap-3

                              dark:text-blue-400
                            "
                          >
                            Explore Service

                            <ArrowRight
                              size={16}
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
                }
              )}
            </div>

            {/* =================================================
                DOTS
            ================================================= */}

            <div className="mt-2 flex justify-center gap-3">
              {SERVICES.map(
                (service, index) => (
                  <button
                    key={service.id}
                    onClick={() =>
                      setActiveIndex(index)
                    }
                    aria-label={`Show ${service.title}`}
                    className="
                      group
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
                            ? 20
                            : 9,
                        opacity:
                          index === activeIndex
                            ? 1
                            : 0.4,
                      }}
                      className="
                        h-2.5
                        rounded-full
                        bg-blue-500
                        shadow-[0_0_12px_rgba(59,130,246,.6)]

                        dark:bg-blue-400
                      "
                    />
                  </button>
                )
              )}
            </div>
          </div>

          {/* =================================================
              TRUST BAR
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.5,
            }}
            className="
              mx-auto
              mt-7
              mb-5
              grid
              max-w-5xl
              grid-cols-2
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white/70
              shadow-lg
              backdrop-blur-xl

              dark:border-white/10
              dark:bg-[#0d1525]/70

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
                  px-4
                  py-5
                  text-center
                  text-sm
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
                  size={20}
                  className="shrink-0 text-blue-500"
                />

                <span>{item}</span>
              </div>
            ))}
          </motion.div>

          {/* Scroll Hint */}

          <div
            className="
              mt-3
              pb-5
              text-center
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-slate-400

              dark:text-slate-600
            "
          >
            Scroll to explore services
          </div>
        </div>
      </div>
    </section>
  );
}

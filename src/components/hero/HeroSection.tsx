"use client";

import { useRef, useState } from "react";
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
      "Powerful Android and iOS applications designed for smooth experiences and growth.",
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
      "Smart AI solutions that automate workflows and improve business productivity.",
    icon: Bot,
    accent: "emerald",
  },
  {
    id: 4,
    title: "Digital Marketing & SEO",
    description:
      "Rank higher, generate quality leads, and grow your business online.",
    icon: BarChart3,
    accent: "pink",
  },
];

/* =========================================================
   CARD POSITION LOGIC
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

  /* CENTER */

  if (position === 0) {
    return {
      x: "0%",
      y: "0%",
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
      x: "-102%",
      y: "3%",
      scale: 0.84,
      rotateY: 14,
      rotateZ: -5,
      opacity: 0.72,
      zIndex: 30,
      filter: "blur(0px)",
    };
  }

  /* RIGHT */

  if (position === 1) {
    return {
      x: "102%",
      y: "3%",
      scale: 0.84,
      rotateY: -14,
      rotateZ: 5,
      opacity: 0.72,
      zIndex: 30,
      filter: "blur(0px)",
    };
  }

  /* FAR LEFT */

  if (position === -2) {
    return {
      x: "-185%",
      y: "7%",
      scale: 0.68,
      rotateY: 20,
      rotateZ: -8,
      opacity: 0.28,
      zIndex: 10,
      filter: "blur(1px)",
    };
  }

  /* FAR RIGHT */

  if (position === 2) {
    return {
      x: "185%",
      y: "7%",
      scale: 0.68,
      rotateY: -20,
      rotateZ: 8,
      opacity: 0.28,
      zIndex: 10,
      filter: "blur(1px)",
    };
  }

  return {
    x: position > 0 ? "250%" : "-250%",
    y: "10%",
    scale: 0.5,
    rotateY: position > 0 ? -25 : 25,
    rotateZ: 0,
    opacity: 0,
    zIndex: 0,
    filter: "blur(5px)",
  };
}

/* =========================================================
   ACCENT COLOR FUNCTION
========================================================= */

function getAccentClasses(accent: string) {
  switch (accent) {
    case "purple":
      return {
        icon: "border-purple-400/30 bg-purple-500/10 text-purple-500 dark:text-purple-400",
        glow: "from-purple-500/10 via-transparent to-indigo-500/10",
        line: "via-purple-400",
      };

    case "cyan":
      return {
        icon: "border-cyan-400/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
        glow: "from-cyan-500/10 via-transparent to-blue-500/10",
        line: "via-cyan-400",
      };

    case "emerald":
      return {
        icon: "border-emerald-400/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        glow: "from-emerald-500/10 via-transparent to-cyan-500/10",
        line: "via-emerald-400",
      };

    case "pink":
      return {
        icon: "border-pink-400/30 bg-pink-500/10 text-pink-600 dark:text-pink-400",
        glow: "from-pink-500/10 via-transparent to-purple-500/10",
        line: "via-pink-400",
      };

    default:
      return {
        icon: "border-blue-400/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
        glow: "from-blue-500/10 via-transparent to-cyan-500/10",
        line: "via-blue-400",
      };
  }
}

/* =========================================================
   HERO SECTION
========================================================= */

export default function HeroSection() {
  const { t } = useLang();

  const sectionRef = useRef<HTMLElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(2);
  const lastStepRef = useRef(-1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* =======================================================
     SCROLL CHANGES ACTIVE CARD
  ======================================================= */

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {
      /*
        Scroll zones:

        0% → Website
        20% → Mobile
        40% → Software
        60% → AI
        80% → Marketing
      */

      if (latest < 0.08) return;

      const step = Math.min(
        SERVICES.length - 1,
        Math.floor(latest * SERVICES.length)
      );

      if (step !== lastStepRef.current) {
        lastStepRef.current = step;
        setActiveIndex(step);
      }
    }
  );

  /* =======================================================
     BUTTON FUNCTIONS
  ======================================================= */

  function nextCard() {
    setActiveIndex((prev) => {
      return prev === SERVICES.length - 1
        ? 0
        : prev + 1;
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
      aria-label="Zentrox Technologies Digital Solutions"
      className="
        relative
        min-h-[220vh]
        overflow-visible
        bg-[#f7f9fc]
        transition-colors
        duration-500
        dark:bg-[#070b14]
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
              dark:opacity-[0.12]
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(100,116,139,.45) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(100,116,139,.45) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "72px 72px",
            }}
          />

          {/* CENTER GLOW */}

          <div
            className="
              absolute
              left-1/2
              top-[35%]
              h-[650px]
              w-[850px]
              -translate-x-1/2
              rounded-full
              bg-blue-500/[0.08]
              blur-[170px]
              dark:bg-blue-500/[0.12]
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
              blur-[140px]
              dark:bg-blue-500/[0.12]
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
              blur-[140px]
              dark:bg-cyan-500/[0.12]
            "
          />

          {/* FLOOR */}

          <div
            className="
              absolute
              bottom-[-120px]
              left-1/2
              h-[300px]
              w-[1000px]
              -translate-x-1/2
              rounded-full
              bg-blue-500/[0.06]
              blur-[100px]
              dark:bg-blue-500/[0.14]
            "
          />

          {/* PARTICLES */}

          <div className="absolute left-[8%] top-[48%] h-1 w-1 rounded-full bg-blue-400 shadow-[0_0_12px_2px_rgba(59,130,246,.7)]" />

          <div className="absolute right-[12%] top-[52%] h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,.7)]" />

          <div className="absolute right-[8%] top-[70%] h-1 w-1 rounded-full bg-blue-400" />

          <div className="absolute left-[15%] top-[68%] h-1 w-1 rounded-full bg-cyan-400" />
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
            max-w-[1600px]
            flex-col
            px-4
            pt-[90px]
            sm:px-6
            md:px-8
            lg:px-12
          "
        >

          {/* ===============================================
              HERO TEXT
          =============================================== */}

          <div className="shrink-0 text-center">

            {/* BADGE */}

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="
                mx-auto
                mb-5
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
                text-[9px]
                font-bold
                tracking-[0.1em]
                text-slate-600
                shadow-sm
                backdrop-blur-xl

                dark:bg-blue-500/[0.07]
                dark:text-blue-200

                sm:px-5
                sm:py-2.5
                sm:text-[10px]
                md:text-xs
              "
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,1)]" />

              {t(
                "hero.badge",
                "MOHALI & CHANDIGARH — MSME REGISTERED TECHNOLOGY COMPANY"
              )}
            </motion.div>

            {/* HEADING */}

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="
                font-extrabold
                leading-[0.92]
                tracking-tight
              "
            >
              <span
                className="
                  block
                  text-4xl
                  text-slate-900
                  dark:text-white

                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                "
              >
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

                  dark:from-blue-500
                  dark:via-blue-400
                  dark:to-cyan-300

                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                "
              >
                {t(
                  "hero.line2",
                  "Digital Solutions"
                )}
              </span>
            </motion.h1>

            {/* DESCRIPTION */}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
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
                "Custom Software, Websites, Mobile Apps, AI, SEO & Digital Marketing to grow your business in the modern world."
              )}
            </motion.p>

            {/* BUTTONS */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              className="
                mt-5
                flex
                flex-wrap
                items-center
                justify-center
                gap-3
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
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_10px_30px_rgba(37,99,235,.35)]
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:shadow-[0_16px_40px_rgba(37,99,235,.45)]
                "
              >
                {t(
                  "hero.cta_primary",
                  "Start Your Project"
                )}

                <ArrowRight
                  size={17}
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
                  gap-2
                  rounded-full
                  border
                  border-slate-300
                  bg-white/70
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-slate-800
                  shadow-sm
                  backdrop-blur-xl
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-blue-400

                  dark:border-white/15
                  dark:bg-white/[0.04]
                  dark:text-white
                "
              >
                <span className="h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-current" />

                {t(
                  "hero.cta_secondary",
                  "View Our Work"
                )}
              </Link>
            </motion.div>
          </div>

          {/* ===============================================
              3D CAROUSEL
          =============================================== */}

          <div
            className="
              relative
              mt-6
              flex
              flex-1
              items-center
              justify-center
              md:mt-7
            "
          >

            {/* CENTER GLOW */}

            <motion.div
              animate={{
                opacity: [0.3, 0.65, 0.3],
                scale: [0.95, 1.05, 0.95],
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
                h-[280px]
                w-[500px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-blue-500/[0.10]
                blur-[90px]
                dark:bg-blue-500/[0.15]
              "
            />

            {/* LEFT ARROW */}

            <button
              onClick={previousCard}
              aria-label="Previous service"
              className="
                absolute
                left-1
                top-1/2
                z-[80]
                hidden
                h-12
                w-12
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
                dark:bg-white/[0.05]
                dark:text-white

                lg:flex
              "
            >
              <ChevronLeft size={22} />
            </button>

            {/* RIGHT ARROW */}

            <button
              onClick={nextCard}
              aria-label="Next service"
              className="
                absolute
                right-1
                top-1/2
                z-[80]
                hidden
                h-12
                w-12
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
                dark:bg-white/[0.05]
                dark:text-white

                lg:flex
              "
            >
              <ChevronRight size={22} />
            </button>

            {/* CARDS CONTAINER */}

            <div
              className="
                relative
                h-[290px]
                w-full
                max-w-[1250px]
                overflow-hidden
                sm:h-[310px]
                md:h-[330px]
                lg:overflow-visible
              "
              style={{
                perspective: "1800px",
              }}
            >
              {SERVICES.map((service, index) => {
                const Icon = service.icon;

                const isActive =
                  index === activeIndex;

                const cardStyle =
                  getCardStyle(
                    index,
                    activeIndex
                  );

                const accent =
                  getAccentClasses(
                    service.accent
                  );

                return (
                  <motion.div
                    key={service.id}
                    animate={cardStyle}
                    transition={{
                      type: "spring",
                      stiffness: 110,
                      damping: 18,
                      mass: 0.85,
                    }}
                    onClick={() =>
                      setActiveIndex(index)
                    }
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      w-[250px]
                      -translate-x-1/2
                      -translate-y-1/2
                      cursor-pointer

                      sm:w-[280px]
                      md:w-[310px]
                    "
                    style={{
                      transformStyle:
                        "preserve-3d",
                    }}
                  >
                    <div
                      className={`
                        relative
                        min-h-[255px]
                        overflow-hidden
                        rounded-[24px]
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
                              shadow-[0_20px_70px_rgba(37,99,235,.22)]

                              dark:bg-[#101827]/90
                              dark:shadow-[0_25px_90px_rgba(37,99,235,.28)]
                            `
                            : `
                              border-slate-200/90
                              bg-white/75
                              shadow-[0_15px_40px_rgba(15,23,42,.10)]

                              dark:border-white/10
                              dark:bg-[#0d1422]/80
                            `
                        }
                      `}
                    >
                      {/* ACTIVE BACKGROUND */}

                      {isActive && (
                        <>
                          <div
                            className={`
                              pointer-events-none
                              absolute
                              inset-0
                              bg-gradient-to-br
                              ${accent.glow}
                            `}
                          />

                          <div
                            className={`
                              absolute
                              bottom-0
                              left-1/2
                              h-px
                              w-2/3
                              -translate-x-1/2
                              bg-gradient-to-r
                              from-transparent
                              ${accent.line}
                              to-transparent
                              shadow-[0_0_18px_rgba(96,165,250,.8)]
                            `}
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
                            ${accent.icon}
                          `}
                        >
                          <Icon size={23} />
                        </div>

                        {/* TITLE */}

                        <h3
                          className={`
                            mt-5
                            text-lg
                            font-bold
                            leading-tight
                            text-slate-900
                            dark:text-white

                            ${
                              isActive
                                ? "md:text-xl"
                                : ""
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
                            mt-5
                            inline-flex
                            items-center
                            gap-2
                            text-xs
                            font-semibold
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
          </div>

          {/* ===============================================
              DOTS
          =============================================== */}

          <div className="shrink-0 pb-3">

            <div className="flex justify-center gap-2">
              {SERVICES.map(
                (service, index) => (
                  <button
                    key={service.id}
                    onClick={() =>
                      setActiveIndex(index)
                    }
                    aria-label={`Show ${service.title}`}
                    className="
                      flex
                      h-6
                      items-center
                      justify-center
                      px-1
                    "
                  >
                    <motion.span
                      animate={{
                        width:
                          index === activeIndex
                            ? 20
                            : 8,

                        opacity:
                          index === activeIndex
                            ? 1
                            : 0.35,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="
                        h-2
                        rounded-full
                        bg-blue-500
                        shadow-[0_0_10px_rgba(59,130,246,.55)]
                        dark:bg-blue-400
                      "
                    />
                  </button>
                )
              )}
            </div>
          </div>

          {/* ===============================================
              TRUST BAR
          =============================================== */}

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
              delay: 0.5,
            }}
            className="
              mx-auto
              mb-3
              grid
              w-full
              max-w-5xl
              shrink-0
              grid-cols-2
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white/80
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

                  md:py-4
                  md:text-sm

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
                  className="
                    shrink-0
                    text-blue-500
                  "
                />

                <span>{item}</span>
              </div>
            ))}
          </motion.div>

          {/* SCROLL TEXT */}

          <div
            className="
              shrink-0
              pb-3
              text-center
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.22em]
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

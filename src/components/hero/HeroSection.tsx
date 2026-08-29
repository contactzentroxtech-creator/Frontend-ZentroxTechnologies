"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Play,
  Code2,
  Sparkles,
  TrendingUp,
  Smartphone,
  Globe2,
  BrainCircuit,
  BarChart3,
  Rocket,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useLang } from "@/lib/providers";

type ShowcaseCard = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  tag: string;
  stats: string[];
  gradient: string;
};

export default function HeroSection() {
  const { t, lang } = useLang();

  const [wordIdx, setWordIdx] = useState(0);
  const [activeCard, setActiveCard] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);

  const heroWords = useMemo(() => {
    const words = t(
      "hero.words",
      "Custom Software|Web Experiences|Mobile Apps|Digital Growth"
    )
      .split("|")
      .map((word) => word.trim())
      .filter(Boolean);

    return words.length > 0
      ? words
      : [
          "Custom Software",
          "Web Experiences",
          "Mobile Apps",
          "Digital Growth",
        ];
  }, [t, lang]);

  const cards: ShowcaseCard[] = [
    {
      id: 1,
      title: "Web Experiences",
      subtitle: "Modern. Fast. Powerful.",
      description:
        "High-performing websites designed to convert visitors into customers.",
      icon: Globe2,
      tag: "WEB DEVELOPMENT",
      stats: ["Lightning Fast", "SEO Ready", "Responsive"],
      gradient:
        "from-blue-600 via-blue-500 to-cyan-400",
    },
    {
      id: 2,
      title: "Custom Software",
      subtitle: "Built Around Your Business.",
      description:
        "Scalable software solutions designed around your exact workflow.",
      icon: Code2,
      tag: "CUSTOM SOFTWARE",
      stats: ["Scalable", "Secure", "Automated"],
      gradient:
        "from-violet-600 via-purple-500 to-fuchsia-400",
    },
    {
      id: 3,
      title: "AI & Digital Growth",
      subtitle: "Smarter Business Systems.",
      description:
        "AI automation, SEO and digital marketing designed for long-term growth.",
      icon: BrainCircuit,
      tag: "AI + GROWTH",
      stats: ["AI Powered", "Data Driven", "Growth Focused"],
      gradient:
        "from-emerald-500 via-teal-500 to-cyan-400",
    },
  ];

  /* =====================================================
     SCROLL ANIMATION
  ===================================================== */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  });

  /*
    CARD 1
  */

  const card1Y = useTransform(
    smoothScroll,
    [0, 0.3, 0.6, 1],
    [0, -30, -120, -220]
  );

  const card1Rotate = useTransform(
    smoothScroll,
    [0, 0.5, 1],
    [0, -6, -12]
  );

  const card1Scale = useTransform(
    smoothScroll,
    [0, 0.6, 1],
    [1, 0.95, 0.88]
  );

  /*
    CARD 2
  */

  const card2Y = useTransform(
    smoothScroll,
    [0, 0.3, 0.65, 1],
    [90, 20, -60, -150]
  );

  const card2Rotate = useTransform(
    smoothScroll,
    [0, 0.5, 1],
    [8, 2, -8]
  );

  const card2Scale = useTransform(
    smoothScroll,
    [0, 0.5, 1],
    [0.94, 1, 0.9]
  );

  /*
    CARD 3
  */

  const card3Y = useTransform(
    smoothScroll,
    [0, 0.3, 0.7, 1],
    [180, 80, -20, -80]
  );

  const card3Rotate = useTransform(
    smoothScroll,
    [0, 0.5, 1],
    [-8, -2, 10]
  );

  const card3Scale = useTransform(
    smoothScroll,
    [0, 0.6, 1],
    [0.88, 0.98, 1]
  );

  /* =====================================================
     ROTATING HERO WORD
  ===================================================== */

  useEffect(() => {
    if (heroWords.length <= 1) return;

    const interval = setInterval(() => {
      setWordIdx((current) => {
        return (current + 1) % heroWords.length;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [heroWords.length]);

  useEffect(() => {
    setWordIdx(0);
  }, [lang]);

  /*
    AUTO CHANGE ACTIVE CARD
  */

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((current) => {
        return (current + 1) % cards.length;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <section
      ref={sectionRef}
      aria-label="Zentrox Technologies digital solutions"
      className="
        relative min-h-[180vh] overflow-hidden
        bg-[#f8fafc]
        dark:bg-[#05070d]
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Grid */}

        <div
          className="
            absolute inset-0
            opacity-[0.45]
            dark:opacity-[0.12]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.16) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Blue Glow */}

        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute left-1/2 top-20
            h-[500px] w-[500px]
            -translate-x-1/2
            rounded-full
            bg-blue-500/10
            blur-[150px]
            dark:bg-blue-500/[0.12]
          "
        />

        {/* Purple Glow */}

        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute right-[5%] top-[35%]
            h-[420px] w-[420px]
            rounded-full
            bg-purple-500/[0.07]
            blur-[150px]
            dark:bg-purple-500/[0.10]
          "
        />

        {/* Cyan Glow */}

        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute bottom-[10%] left-[5%]
            h-[400px] w-[400px]
            rounded-full
            bg-cyan-400/[0.07]
            blur-[150px]
            dark:bg-cyan-400/[0.08]
          "
        />

        {/* Noise */}

        <div
          className="
            absolute inset-0
            opacity-[0.025]
            dark:opacity-[0.04]
          "
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      {/* =====================================================
          STICKY AREA
      ===================================================== */}

      <div className="sticky top-0 flex min-h-screen items-center">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 md:px-6">

          {/* =================================================
              HERO CONTENT
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
                mb-6 inline-flex items-center gap-2
                rounded-full
                border border-blue-500/20
                bg-blue-500/[0.06]
                px-4 py-2
                text-[11px]
                font-bold
                tracking-[0.12em]
                text-blue-600
                backdrop-blur-xl
                dark:text-blue-300
              "
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              {t(
                "hero.badge",
                "MOHALI & CHANDIGARH — DIGITAL TECHNOLOGY COMPANY"
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
                mx-auto max-w-6xl
                text-5xl
                font-black
                leading-[0.98]
                tracking-[-0.045em]
                text-slate-950
                dark:text-white
                md:text-7xl
                lg:text-[100px]
              "
            >
              <span className="block">
                {t(
                  "hero.line1",
                  "We Build"
                )}
              </span>

              <AnimatePresence mode="wait">
                <motion.span
                  key={heroWords[wordIdx]}
                  initial={{
                    opacity: 0,
                    y: 35,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: -35,
                    filter: "blur(8px)",
                  }}
                  transition={{
                    duration: 0.45,
                  }}
                  className="
                    mt-2 block
                    bg-gradient-to-r
                    from-blue-700
                    via-blue-500
                    to-cyan-500
                    bg-clip-text
                    text-transparent
                    dark:from-blue-400
                    dark:via-blue-500
                    dark:to-cyan-300
                  "
                >
                  {heroWords[wordIdx]}
                </motion.span>
              </AnimatePresence>

              <span
                className="
                  mt-3 block
                  text-3xl
                  font-extrabold
                  tracking-[-0.03em]
                  text-slate-900
                  dark:text-slate-100
                  md:text-5xl
                  lg:text-6xl
                "
              >
                {t(
                  "hero.line2",
                  "Built Around Your Business Goals"
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
                delay: 0.25,
              }}
              className="
                mx-auto mt-7 max-w-3xl
                text-base
                leading-relaxed
                text-slate-600
                dark:text-slate-400
                md:text-lg
              "
            >
              {t(
                "hero.description",
                "Zentrox Technologies helps ambitious businesses grow with custom software, powerful websites, mobile applications, AI integration, SEO and digital marketing."
              )}
            </motion.p>

            {/* CTA */}

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
                delay: 0.35,
              }}
              className="
                mt-8 flex
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
                  group inline-flex
                  items-center justify-center
                  gap-2
                  rounded-full
                  bg-gradient-to-r
                  from-blue-600
                  to-blue-500
                  px-7 py-4
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_15px_40px_rgba(37,99,235,0.3)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_20px_50px_rgba(37,99,235,0.45)]
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
                  group inline-flex
                  items-center justify-center
                  gap-2
                  rounded-full
                  border border-slate-300
                  bg-white/60
                  px-7 py-4
                  text-sm
                  font-bold
                  text-slate-800
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-400
                  hover:text-blue-600

                  dark:border-white/10
                  dark:bg-white/[0.04]
                  dark:text-white
                "
              >
                <Play
                  size={15}
                  className="
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />

                {t(
                  "hero.cta_secondary",
                  "Explore Our Services"
                )}
              </Link>
            </motion.div>

            {/* Trust */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.5,
                duration: 0.7,
              }}
              className="
                mt-7 flex
                flex-wrap
                items-center
                justify-center
                gap-x-6
                gap-y-2
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              <span>✓ Founded in 2023</span>
              <span>✓ Custom Solutions</span>
              <span>✓ Global Delivery</span>
            </motion.div>
          </div>

          {/* =================================================
              3D CARDS
          ================================================= */}

          <div
            className="
              relative mx-auto
              mt-14
              h-[400px]
              max-w-6xl
              perspective-[2000px]
              md:mt-20
              md:h-[470px]
            "
          >
            {/* CARD 1 */}

            <motion.div
              style={{
                y: card1Y,
                rotate: card1Rotate,
                scale: card1Scale,
                zIndex: 10,
              }}
              onClick={() => setActiveCard(0)}
              whileHover={{
                y: -12,
                rotate: -2,
              }}
              className="
                absolute left-[4%] top-0
                w-[92%]
                cursor-pointer
                md:left-[8%]
                md:w-[58%]
              "
            >
              <ShowcaseCard
                card={cards[0]}
                active={activeCard === 0}
              />
            </motion.div>

            {/* CARD 2 */}

            <motion.div
              style={{
                y: card2Y,
                rotate: card2Rotate,
                scale: card2Scale,
                zIndex: 20,
              }}
              onClick={() => setActiveCard(1)}
              whileHover={{
                y: -12,
                rotate: 1,
              }}
              className="
                absolute right-[2%] top-[30px]
                w-[88%]
                cursor-pointer
                md:right-[5%]
                md:w-[58%]
              "
            >
              <ShowcaseCard
                card={cards[1]}
                active={activeCard === 1}
              />
            </motion.div>

            {/* CARD 3 */}

            <motion.div
              style={{
                y: card3Y,
                rotate: card3Rotate,
                scale: card3Scale,
                zIndex: 30,
              }}
              onClick={() => setActiveCard(2)}
              whileHover={{
                y: -12,
                rotate: 2,
              }}
              className="
                absolute left-[5%] top-[70px]
                w-[90%]
                cursor-pointer
                md:left-[20%]
                md:w-[60%]
              "
            >
              <ShowcaseCard
                card={cards[2]}
                active={activeCard === 2}
              />
            </motion.div>

            {/* Floating Tech Icons */}

            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute -left-3 top-[20%]
                z-40 hidden
                rounded-2xl
                border border-white/10
                bg-white/70
                p-4
                shadow-2xl
                backdrop-blur-xl
                dark:bg-white/[0.06]
                lg:block
              "
            >
              <Code2
                size={24}
                className="text-blue-500"
              />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 18, 0],
                rotate: [0, -8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute -right-3 bottom-[15%]
                z-40 hidden
                rounded-2xl
                border border-white/10
                bg-white/70
                p-4
                shadow-2xl
                backdrop-blur-xl
                dark:bg-white/[0.06]
                lg:block
              "
            >
              <Sparkles
                size={24}
                className="text-violet-500"
              />
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="
                absolute right-[10%] top-[5%]
                z-40 hidden
                h-3 w-3
                rounded-full
                bg-emerald-400
                shadow-[0_0_30px_rgba(52,211,153,0.8)]
                lg:block
              "
            />
          </div>

          {/* Scroll Hint */}

          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              mt-8 flex
              items-center
              justify-center
              gap-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-slate-400
              dark:text-slate-600
            "
          >
            Scroll to explore
            <ChevronRight
              size={15}
              className="rotate-90"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SHOWCASE CARD COMPONENT
========================================================= */

function ShowcaseCard({
  card,
  active,
}: {
  card: ShowcaseCard;
  active: boolean;
}) {
  const Icon = card.icon;

  return (
    <div
      className={`
        group relative overflow-hidden
        rounded-[30px]
        border
        p-5
        shadow-[0_30px_100px_rgba(15,23,42,0.18)]
        backdrop-blur-2xl
        transition-all
        duration-500

        md:p-7

        ${
          active
            ? `
              border-blue-400/50
              bg-white/[0.88]
              dark:bg-[#10141f]/[0.92]
            `
            : `
              border-slate-200/80
              bg-white/[0.75]
              dark:border-white/[0.08]
              dark:bg-[#0b0f18]/[0.82]
            `
        }
      `}
    >
      {/* Gradient Background */}

      <div
        className={`
          pointer-events-none absolute
          -right-20 -top-20
          h-56 w-56
          rounded-full
          bg-gradient-to-br
          ${card.gradient}
          opacity-[0.12]
          blur-[70px]
        `}
      />

      {/* Grid */}

      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.06]
          dark:opacity-[0.08]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10">

        {/* Top */}

        <div className="flex items-start justify-between gap-4">

          <div
            className={`
              inline-flex items-center
              gap-2 rounded-full
              bg-gradient-to-r
              ${card.gradient}
              px-3 py-1.5
              text-[10px]
              font-black
              tracking-[0.12em]
              text-white
              shadow-lg
            `}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />

            {card.tag}
          </div>

          <motion.div
            animate={
              active
                ? {
                    rotate: [0, 8, -8, 0],
                    scale: [1, 1.08, 1],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="
              flex h-12 w-12
              items-center
              justify-center
              rounded-2xl
              border border-white/20
              bg-white/50
              shadow-lg
              backdrop-blur-xl
              dark:bg-white/[0.05]
            "
          >
            <Icon
              size={22}
              className="text-blue-600 dark:text-blue-400"
            />
          </motion.div>
        </div>

        {/* Content */}

        <div className="mt-8">

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.15em]
              text-slate-500
              dark:text-slate-500
            "
          >
            {card.subtitle}
          </p>

          <h3
            className="
              mt-2
              text-2xl
              font-black
              tracking-tight
              text-slate-950
              dark:text-white
              md:text-4xl
            "
          >
            {card.title}
          </h3>

          <p
            className="
              mt-4 max-w-xl
              text-sm
              leading-relaxed
              text-slate-600
              dark:text-slate-400
              md:text-base
            "
          >
            {card.description}
          </p>
        </div>

        {/* Stats */}

        <div
          className="
            mt-7 grid
            grid-cols-3
            gap-2
            border-t
            border-slate-200/80
            pt-5
            dark:border-white/[0.08]
          "
        >
          {card.stats.map((stat, index) => (
            <motion.div
              key={stat}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={
                active
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                delay: index * 0.08,
              }}
              className="
                rounded-xl
                border border-slate-200/70
                bg-white/50
                px-2 py-3
                text-center
                text-[9px]
                font-bold
                text-slate-600
                backdrop-blur-md

                dark:border-white/[0.07]
                dark:bg-white/[0.03]
                dark:text-slate-400

                md:text-xs
              "
            >
              {stat}
            </motion.div>
          ))}
        </div>

        {/* Bottom Dashboard */}

        <div
          className="
            mt-5 flex
            items-center
            justify-between
            rounded-2xl
            border border-slate-200/70
            bg-slate-50/70
            p-4

            dark:border-white/[0.07]
            dark:bg-black/20
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-9 w-9
                items-center
                justify-center
                rounded-xl
                bg-blue-500/10
                text-blue-600
                dark:text-blue-400
              "
            >
              <TrendingUp size={17} />
            </div>

            <div>
              <p className="text-[10px] text-slate-500">
                Performance
              </p>

              <p
                className="
                  text-sm font-black
                  text-slate-900
                  dark:text-white
                "
              >
                Growing Forward
              </p>
            </div>
          </div>

          <motion.div
            animate={
              active
                ? {
                    x: [0, 4, 0],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <Rocket
              size={20}
              className="text-blue-500"
            />
          </motion.div>
        </div>
      </div>

      {/* Active Border Glow */}

      {active && (
        <motion.div
          layoutId="activeGlow"
          className="
            pointer-events-none
            absolute inset-0
            rounded-[30px]
            ring-1 ring-blue-400/30
          "
        />
      )}
    </div>
  );
}

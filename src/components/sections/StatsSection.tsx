"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle2,
  FolderCheck,
  Globe2,
  Star,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import { useLang } from "@/lib/providers";
import api from "@/lib/api";

/* =========================================================
   TYPES
========================================================= */

interface StatItem {
  num?: number;
  suffix?: string;
  label: string;
  labelKey: string;
  custom?: string;
  settingKey?: string;
}

interface StatConfig {
  icon: typeof FolderCheck;
  iconClass: string;
  accent: string;
}

/* =========================================================
   ANIMATED COUNTER
========================================================= */

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  useEffect(() => {
    if (!inView || target <= 0) return;

    let animationFrame: number;
    const duration = 1400;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress =
        1 - Math.pow(1 - progress, 4);

      setCount(
        Math.floor(target * easedProgress)
      );

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () =>
      cancelAnimationFrame(animationFrame);
  }, [inView, target]);

  return (
    <div ref={ref}>
      {count}
      {suffix}
    </div>
  );
}

/* =========================================================
   DEFAULT STATS
========================================================= */

const DEFAULT_STATS: StatItem[] = [
  {
    num: 200,
    suffix: "+",
    label: "Digital Solutions Delivered",
    labelKey: "stats.projects",
    settingKey: "stats_projects",
  },
  {
    num: 150,
    suffix: "+",
    label: "Businesses Supported",
    labelKey: "stats.clients",
    settingKey: "stats_clients",
  },
  {
    num: 3,
    suffix: "+",
    label: "Years of Digital Experience",
    labelKey: "stats.years",
    settingKey: "stats_years",
  },
  {
    label: "Client Satisfaction",
    labelKey: "stats.rating",
    custom: "4.9★",
    settingKey: "stats_rating",
  },
];

/* =========================================================
   VISUAL CONFIG
========================================================= */

const STAT_CONFIG: StatConfig[] = [
  {
    icon: FolderCheck,
    iconClass:
      "bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300",
    accent:
      "from-blue-500/[0.10] via-transparent to-transparent",
  },
  {
    icon: Globe2,
    iconClass:
      "bg-teal-500/10 text-teal-600 dark:bg-teal-400/10 dark:text-teal-300",
    accent:
      "from-teal-500/[0.10] via-transparent to-transparent",
  },
  {
    icon: Sparkles,
    iconClass:
      "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300",
    accent:
      "from-indigo-500/[0.10] via-transparent to-transparent",
  },
  {
    icon: Star,
    iconClass:
      "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300",
    accent:
      "from-amber-500/[0.10] via-transparent to-transparent",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function StatsSection() {
  const { t } = useLang();

  const [stats, setStats] =
    useState<StatItem[]>(DEFAULT_STATS);

  /* =======================================================
     LOAD CMS STATS
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadStats = async () => {
      try {
        const { data } =
          await api.get("/cms/settings");

        if (!mounted || !data?.data) return;

        const cms = data.data;

        const updatedStats =
          DEFAULT_STATS.map((stat) => {
            if (
              !stat.settingKey ||
              cms[stat.settingKey] === undefined ||
              cms[stat.settingKey] === null
            ) {
              return stat;
            }

            const value =
              cms[stat.settingKey];

            if (stat.custom !== undefined) {
              const rating =
                String(value).trim();

              if (!rating) return stat;

              return {
                ...stat,
                custom: rating.includes("★")
                  ? rating
                  : `${rating}★`,
              };
            }

            const numericValue =
              Number(value);

            if (
              Number.isFinite(numericValue) &&
              numericValue > 0
            ) {
              return {
                ...stat,
                num: numericValue,
              };
            }

            return stat;
          });

        if (mounted) {
          setStats(updatedStats);
        }
      } catch {
        // Keep default stats safely
      }
    };

    void loadStats();

    return () => {
      mounted = false;
    };
  }, []);

  const trustItems = [
    t(
      "stats.trust1",
      "Custom-Built Solutions"
    ),
    t(
      "stats.trust2",
      "Transparent Communication"
    ),
    t(
      "stats.trust3",
      "India & Global Delivery"
    ),
    t(
      "stats.trust4",
      "Long-Term Support"
    ),
  ];

  return (
    <section
      aria-label="Zentrox Technologies achievements"
      className="
        relative overflow-hidden
        px-4 py-20
        sm:px-6
        md:py-28
      "
    >
      {/* BACKGROUND */}

      <div
        className="
          pointer-events-none
          absolute inset-0
          overflow-hidden
        "
        aria-hidden="true"
      >
        <div
          className="
            absolute
            left-[3%]
            top-1/2
            h-[360px]
            w-[360px]
            -translate-y-1/2
            rounded-full
            bg-blue-500/[0.055]
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            right-[3%]
            top-1/2
            h-[360px]
            w-[360px]
            -translate-y-1/2
            rounded-full
            bg-teal-500/[0.045]
            blur-[130px]
          "
        />
      </div>

      <div
        className="
          relative
          mx-auto
          max-w-7xl
        "
      >
        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 0.65,
          }}
          className="
            mx-auto
            mb-12
            max-w-3xl
            text-center
            md:mb-16
          "
        >
          <div className="z-badge mx-auto mb-5 w-fit">
            <CheckCircle2
              size={14}
              aria-hidden="true"
            />

            <span>
              {t(
                "stats.trust",
                "Built for Real Business Growth"
              )}
            </span>
          </div>

          <h2
            className="
              text-3xl
              font-extrabold
              tracking-tight
              text-slate-900
              sm:text-4xl
              md:text-5xl
              dark:text-z-text
            "
          >
            {t(
              "stats.title",
              "Results That Reflect Our Commitment"
            )}
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-relaxed
              text-slate-600
              sm:text-base
              dark:text-z-muted
            "
          >
            {t(
              "stats.description",
              "Helping businesses build stronger digital products, improve their online presence, and move forward with confidence."
            )}
          </p>
        </motion.div>

        {/* STATS GRID */}

        <div
          className="
            grid
            grid-cols-2
            gap-4
            md:grid-cols-4
            md:gap-5
          "
        >
          {stats.map((stat, index) => {
            const config =
              STAT_CONFIG[index];

            const Icon = config.icon;

            return (
              <motion.article
                key={stat.labelKey}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -7,
                }}
                className="
                  group
                  relative
                  min-h-[200px]
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-slate-200/90
                  bg-white/[0.92]
                  p-5
                  shadow-[0_10px_35px_rgba(15,23,42,0.055)]
                  backdrop-blur-xl
                  transition-all
                  duration-300

                  hover:border-blue-300/70
                  hover:shadow-[0_22px_60px_rgba(15,23,42,0.10)]

                  dark:border-white/10
                  dark:bg-white/[0.045]

                  sm:p-6
                  md:min-h-[235px]
                "
              >
                {/* HOVER GLOW */}

                <div
                  className={`
                    pointer-events-none
                    absolute inset-0
                    bg-gradient-to-br
                    ${config.accent}
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  `}
                />

                {/* TOP */}

                <div
                  className="
                    relative
                    flex
                    items-start
                    justify-between
                  "
                >
                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-2xl
                      transition-all
                      duration-300
                      group-hover:scale-110
                      group-hover:rotate-3
                      ${config.iconClass}
                    `}
                  >
                    <Icon size={20} />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="
                      text-slate-300
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-blue-500
                      dark:text-slate-600
                    "
                  />
                </div>

                {/* CONTENT */}

                <div
                  className="
                    relative
                    mt-8
                    md:mt-10
                  "
                >
                  <div
                    className="
                      text-3xl
                      font-extrabold
                      tracking-tight
                      text-slate-900
                      sm:text-4xl
                      md:text-[42px]
                      dark:text-z-text
                    "
                  >
                    {stat.custom ? (
                      stat.custom
                    ) : (
                      <AnimatedCounter
                        target={stat.num ?? 0}
                        suffix={stat.suffix}
                      />
                    )}
                  </div>

                  <p
                    className="
                      mt-3
                      text-[10px]
                      font-bold
                      uppercase
                      leading-relaxed
                      tracking-[0.1em]
                      text-slate-500
                      sm:text-[11px]
                      dark:text-z-muted
                    "
                  >
                    {t(
                      stat.labelKey,
                      stat.label
                    )}
                  </p>
                </div>

                {/* BOTTOM ACCENT */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[3px]
                    w-full
                    origin-left
                    scale-x-0
                    bg-gradient-to-r
                    from-blue-600
                    via-blue-400
                    to-transparent
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                  "
                />
              </motion.article>
            );
          })}
        </div>

        {/* TRUST ITEMS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="
            mx-auto
            mt-12
            flex
            max-w-5xl
            flex-wrap
            justify-center
            gap-x-7
            gap-y-4
            rounded-2xl
            border
            border-slate-200/80
            bg-white/60
            px-5
            py-5
            text-xs
            text-slate-600
            backdrop-blur-xl

            dark:border-white/10
            dark:bg-white/[0.035]
            dark:text-z-muted

            md:mt-14
          "
        >
          {trustItems.map((item) => (
            <span
              key={item}
              className="
                flex
                items-center
                gap-2
                font-medium
              "
            >
              <CheckCircle2
                size={14}
                className="
                  shrink-0
                  text-blue-500
                "
              />

              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

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

      setCount(Math.floor(target * easedProgress));

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
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
    label: "Clients & Businesses Supported",
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
      "from-blue-500/10 via-transparent to-transparent",
  },
  {
    icon: Globe2,
    iconClass:
      "bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-300",
    accent:
      "from-orange-500/10 via-transparent to-transparent",
  },
  {
    icon: Sparkles,
    iconClass:
      "bg-violet-500/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300",
    accent:
      "from-violet-500/10 via-transparent to-transparent",
  },
  {
    icon: Star,
    iconClass:
      "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300",
    accent:
      "from-amber-500/10 via-transparent to-transparent",
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

            /* Custom stat such as rating */

            if (stat.custom !== undefined) {
              const rating =
                String(value).trim();

              if (!rating) {
                return stat;
              }

              return {
                ...stat,
                custom: rating.includes("★")
                  ? rating
                  : `${rating}★`,
              };
            }

            /* Numeric stats */

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
        // Safe fallback to default stats
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
      "Custom Development"
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
      className="relative overflow-hidden px-4 py-16 md:px-6 md:py-24"
    >
      {/* Background */}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-[5%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-500/[0.06] blur-[120px]" />

        <div className="absolute right-[5%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-orange-500/[0.05] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/15 bg-blue-500/[0.05] px-4 py-2 text-xs font-semibold text-blue-700 dark:text-blue-300">
            <CheckCircle2 size={15} />

            {t(
              "stats.trust",
              "Technology Built Around Real Business Growth"
            )}
          </div>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-z-muted md:text-base">
            {t(
              "stats.description",
              "Helping businesses in India and worldwide build stronger digital products, improve online visibility and scale with confidence."
            )}
          </p>
        </motion.div>

        {/* Stats Grid */}

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
          {stats.map((stat, index) => {
            const config =
              STAT_CONFIG[index];

            const Icon =
              config.icon;

            return (
              <motion.article
                key={stat.labelKey}
                initial={{
                  opacity: 0,
                  y: 28,
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
                  y: -6,
                }}
                className="group relative min-h-[190px] overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-slate-300 hover:shadow-[0_20px_55px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-white/15 sm:p-5 md:min-h-[220px] md:p-6"
              >
                {/* Hover Gradient */}

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${config.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Top */}

                <div className="relative flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${config.iconClass}`}
                  >
                    <Icon size={20} />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-z-accent dark:text-slate-600"
                  />
                </div>

                {/* Content */}

                <div className="relative mt-7 md:mt-9">
                  <div className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-z-text sm:text-4xl md:text-5xl">
                    {stat.custom ? (
                      stat.custom
                    ) : (
                      <AnimatedCounter
                        target={stat.num ?? 0}
                        suffix={stat.suffix}
                      />
                    )}
                  </div>

                  <p className="mt-3 text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] text-slate-500 dark:text-z-muted sm:text-[11px]">
                    {t(
                      stat.labelKey,
                      stat.label
                    )}
                  </p>
                </div>

                {/* Bottom Accent */}

                <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-z-accent via-blue-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </motion.article>
            );
          })}
        </div>

        {/* Trust Footer */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-500 dark:text-z-muted md:mt-12"
        >
          {trustItems.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5"
            >
              <CheckCircle2
                size={13}
                className="text-z-accent"
              />

              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

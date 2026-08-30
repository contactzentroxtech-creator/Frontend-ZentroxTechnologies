"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle2,
  FolderCheck,
  Globe2,
  Star,
  Sparkles,
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
  borderColor: string;
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
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView || target <= 0) return;

    let animationFrame: number;
    const duration = 1600;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(target * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [inView, target]);

  return (
    <div ref={ref} className="tabular-nums">
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
    accent: "from-blue-500/15 via-transparent to-transparent",
    borderColor: "border-blue-500/20 dark:border-blue-400/15",
  },
  {
    icon: Globe2,
    iconClass:
      "bg-teal-500/10 text-teal-600 dark:bg-teal-400/10 dark:text-teal-300",
    accent: "from-teal-500/15 via-transparent to-transparent",
    borderColor: "border-teal-500/20 dark:border-teal-400/15",
  },
  {
    icon: Sparkles,
    iconClass:
      "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300",
    accent: "from-indigo-500/15 via-transparent to-transparent",
    borderColor: "border-indigo-500/20 dark:border-indigo-400/15",
  },
  {
    icon: Star,
    iconClass:
      "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300",
    accent: "from-amber-500/15 via-transparent to-transparent",
    borderColor: "border-amber-500/20 dark:border-amber-400/15",
  },
];

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  stat,
  config,
  index,
}: {
  stat: StatItem;
  config: StatConfig;
  index: number;
}) {
  const { t } = useLang();
  const Icon = config.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative min-h-[210px] overflow-hidden rounded-[24px] border border-slate-200/70 bg-white/85 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] backdrop-blur-sm transition-all duration-300 hover:border-blue-200/80 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/[0.06] dark:bg-[#1e293b]/70 dark:hover:border-blue-400/20 sm:p-7 md:min-h-[240px]"
    >
      {/* Glow overlay */}
      <div
        className={`
          pointer-events-none absolute inset-0
          bg-gradient-to-br ${config.accent}
          opacity-0 transition-opacity duration-500
          group-hover:opacity-100
        `}
      />

      {/* Top section */}
      <div className="relative flex items-start justify-between">
        <div
          className={`
            flex h-12 w-12 items-center justify-center
            rounded-2xl border transition-all duration-300
            group-hover:scale-110 group-hover:rotate-3
            ${config.iconClass} ${config.borderColor}
          `}
        >
          <Icon size={22} />
        </div>
      </div>

      {/* Content */}
      <div className="relative mt-8 md:mt-10">
        <div className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-[44px] dark:text-white">
          {stat.custom ? (
            stat.custom
          ) : (
            <AnimatedCounter target={stat.num ?? 0} suffix={stat.suffix} />
          )}
        </div>
        <p className="mt-3 text-[10px] font-bold uppercase leading-relaxed tracking-[0.1em] text-slate-500 sm:text-[11px] dark:text-slate-400">
          {t(stat.labelKey, stat.label)}
        </p>
      </div>

      {/* Bottom accent bar */}
      <div
        className="
          absolute bottom-0 left-0 h-[3px] w-full
          origin-left scale-x-0
          bg-gradient-to-r from-blue-600 via-blue-400 to-transparent
          transition-transform duration-500
          group-hover:scale-x-100
        "
      />
    </motion.article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function StatsSection() {
  const { t } = useLang();
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_STATS);

  // Load CMS stats
  useEffect(() => {
    let mounted = true;

    const loadStats = async () => {
      try {
        const { data } = await api.get("/cms/settings");
        if (!mounted || !data?.data) return;

        const cms = data.data;
        const updatedStats = DEFAULT_STATS.map((stat) => {
          if (!stat.settingKey || cms[stat.settingKey] === undefined || cms[stat.settingKey] === null) {
            return stat;
          }
          const value = cms[stat.settingKey];

          if (stat.custom !== undefined) {
            const rating = String(value).trim();
            if (!rating) return stat;
            return {
              ...stat,
              custom: rating.includes("★") ? rating : `${rating}★`,
            };
          }

          const numericValue = Number(value);
          if (Number.isFinite(numericValue) && numericValue > 0) {
            return { ...stat, num: numericValue };
          }
          return stat;
        });

        if (mounted) {
          setStats(updatedStats);
        }
      } catch {
        // Keep default stats
      }
    };

    loadStats();

    return () => {
      mounted = false;
    };
  }, []);

  const trustItems = [
    t("stats.trust1", "Custom-Built Solutions"),
    t("stats.trust2", "Transparent Communication"),
    t("stats.trust3", "India & Global Delivery"),
    t("stats.trust4", "Long-Term Support"),
  ];

  return (
    <section
      aria-label="Zentrox Technologies achievements"
      className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-28"
    >
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="
            absolute left-[5%] top-1/2 h-[400px] w-[400px]
            -translate-y-1/2 rounded-full
            bg-blue-500/[0.05] blur-[140px]
            dark:bg-blue-400/[0.06]
          "
        />
        <div
          className="
            absolute right-[5%] top-1/2 h-[400px] w-[400px]
            -translate-y-1/2 rounded-full
            bg-teal-500/[0.04] blur-[140px]
            dark:bg-teal-400/[0.05]
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/60 px-4 py-1.5 text-[11px] font-bold tracking-[0.1em] text-blue-700 backdrop-blur-sm dark:border-blue-400/20 dark:bg-blue-400/[0.06] dark:text-blue-200">
            <CheckCircle2 size={13} aria-hidden="true" />
            <span>{t("stats.trust", "Built for Real Business Growth")}</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            {t("stats.title", "Results That Reflect Our Commitment")}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            {t(
              "stats.description",
              "Helping businesses build stronger digital products, improve their online presence, and move forward with confidence."
            )}
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {stats.map((stat, index) => {
            const config = STAT_CONFIG[index] || STAT_CONFIG[0];
            return <StatCard key={stat.labelKey} stat={stat} config={config} index={index} />;
          })}
        </div>

        {/* Trust items */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="
            mx-auto mt-12 flex max-w-5xl flex-wrap
            items-center justify-center gap-x-8 gap-y-4
            rounded-2xl border border-slate-200/60
            bg-white/60 px-6 py-5
            text-xs text-slate-600
            backdrop-blur-md
            dark:border-white/[0.06] dark:bg-[#1e293b]/50 dark:text-slate-300
            md:mt-14
          "
        >
          {trustItems.map((item) => (
            <span key={item} className="flex items-center gap-2 font-medium">
              <CheckCircle2 size={14} className="shrink-0 text-blue-500 dark:text-blue-400" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

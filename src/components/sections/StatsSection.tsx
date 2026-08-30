"use client";

import { useEffect, useState, useRef } from "react";
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

interface StatItem {
  num?: number;
  suffix?: string;
  label: string;
  labelKey: string;
  custom?: string;
  settingKey?: string;
}

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

const DEFAULT_STATS: StatItem[] = [
  {
    num: 200,
    suffix: "+",
    label: "Projects Delivered",
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
    label: "Years Experience",
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

export default function StatsSection() {
  const { t } = useLang();
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_STATS);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

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

  const locations = [
    "India",
    "USA",
    "UK",
    "Canada",
    "Australia",
    "UAE",
    "Singapore",
  ];

  return (
    <section
      id="about"
      aria-label="About Zentrox Technologies"
      className="bg-slate-50/70 px-4 py-16 sm:py-20 md:px-6 md:py-24 lg:py-28"
    >
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Content */}
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-blue-600">
              {t("stats.trust")}
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {t("stats.title")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-500">
              {t("stats.description")}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
              {locations.map((loc) => (
                <span key={loc} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  {loc}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                  {stat.custom ? (
                    stat.custom
                  ) : (
                    <AnimatedCounter target={stat.num ?? 0} suffix={stat.suffix} />
                  )}
                </div>
                <p className="mt-1.5 text-sm text-slate-500">
                  {t(stat.labelKey, stat.label)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

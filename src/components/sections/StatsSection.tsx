"use client";

import { useRef, useEffect, useState } from "react";
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

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || target === 0) return;

    let start = 0;
    const step = target / 60;

    const timer = setInterval(() => {
      start += step;

      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="inline-block">
      {count}
      {suffix}
    </div>
  );
}

interface StatItem {
  num?: number;
  suffix?: string;
  label: string;
  labelKey: string;
  custom?: string;
  settingKey?: string;
}

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
    label: "Global Clients Served",
    labelKey: "stats.clients",
    settingKey: "stats_clients",
  },
  {
    num: 3,
    suffix: "+",
    label: "Years of Excellence",
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

const STAT_ICONS = [
  FolderCheck,
  Globe2,
  Sparkles,
  Star,
];

export default function StatsSection() {
  const { t } = useLang();
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_STATS);

  useEffect(() => {
    api
      .get("/cms/settings")
      .then(({ data }) => {
        if (!data?.data) return;

        const cms = data.data;

        setStats(
          DEFAULT_STATS.map((s) => {
            if (!s.settingKey || !cms[s.settingKey]) return s;

            const val = cms[s.settingKey];

            if (s.custom !== undefined) {
              return {
                ...s,
                custom: String(val),
              };
            }

            const num = Number(val);

            if (!isNaN(num) && num > 0) {
              return {
                ...s,
                num,
              };
            }

            return s;
          })
        );
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden px-4 py-16 md:px-6 md:py-20">
      
      {/* Soft background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-blue-400/[0.05] blur-[100px]" />
        <div className="absolute right-[10%] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-purple-400/[0.05] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* Top trust line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col items-center justify-center gap-2 text-center"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-z-text">
            <CheckCircle2 size={17} className="text-z-accent" />
            Building digital solutions that create real business impact
          </div>

          <p className="text-sm text-slate-500 dark:text-z-muted">
            Strategy, technology and growth — working together.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {stats.map((s, i) => {
            const Icon = STAT_ICONS[i];

            return (
              <motion.div
                key={s.labelKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 text-center shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-z-accent/30 hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.07]"
              >
                {/* Hover glow */}
                <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-z-accent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10" />

                {/* Icon */}
                <div className="relative mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-z-accent/10 text-z-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon size={19} />
                </div>

                {/* Number */}
                <div className="relative text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl dark:text-z-text">
                  {s.custom ? (
                    s.custom
                  ) : (
                    <AnimatedCounter
                      target={s.num ?? 0}
                      suffix={s.suffix}
                    />
                  )}
                </div>

                {/* Label */}
                <div className="relative mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 md:text-[11px] dark:text-z-muted">
                  {t(s.labelKey, s.label)}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

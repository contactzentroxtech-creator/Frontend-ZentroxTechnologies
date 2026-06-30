"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
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
      } else setCount(Math.floor(start));
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
    label: "Projects Delivered",
    labelKey: "stats.projects",
    settingKey: "stats_projects",
  },
  {
    num: 150,
    suffix: "+",
    label: "Happy Clients",
    labelKey: "stats.clients",
    settingKey: "stats_clients",
  },
  {
    num: 5,
    suffix: "+",
    label: "Years Experience",
    labelKey: "stats.years",
    settingKey: "stats_years",
  },
  {
    label: "Average Rating",
    labelKey: "stats.rating",
    custom: "4.9★",
    settingKey: "stats_rating",
  },
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
            if (s.custom !== undefined) return { ...s, custom: String(val) };
            const num = Number(val);
            if (!isNaN(num) && num > 0) return { ...s, num };
            return s;
          })
        );
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative z-10 border-y border-slate-200/60 dark:border-z-border bg-slate-50/70 dark:bg-z-dark3/40 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center relative group"
            >
              {/* Premium typography with responsive light/dark gradients */}
              <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-900 via-z-accent to-z-accent2 dark:from-white dark:via-z-text dark:to-z-accent bg-clip-text text-transparent tracking-tight">
                {s.custom ? (
                  s.custom
                ) : (
                  <AnimatedCounter target={s.num ?? 0} suffix={s.suffix} />
                )}
              </div>

              {/* Scannable, clearly legible label colors */}
              <div className="text-[11px] font-bold text-slate-500 dark:text-z-muted uppercase tracking-widest mt-2.5 transition-colors duration-300">
                {t(s.labelKey, s.label)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

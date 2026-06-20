'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '@/lib/providers';
import api from '@/lib/api';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || target === 0) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <div ref={ref}>{count}{suffix}</div>;
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
  { num: 200, suffix: '+', label: 'Projects Delivered', labelKey: 'stats.projects', settingKey: 'stats_projects' },
  { num: 150, suffix: '+', label: 'Happy Clients', labelKey: 'stats.clients', settingKey: 'stats_clients' },
  { num: 5, suffix: '+', label: 'Years Experience', labelKey: 'stats.years', settingKey: 'stats_years' },
  { label: 'Average Rating', labelKey: 'stats.rating', custom: '4.9★', settingKey: 'stats_rating' },
];

export default function StatsSection() {
  const { t } = useLang();
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_STATS);

  // Pull CMS stats if available
  useEffect(() => {
    api.get('/cms/settings').then(({ data }) => {
      if (!data?.data) return;
      const cms = data.data;
      setStats(DEFAULT_STATS.map(s => {
        if (!s.settingKey || !cms[s.settingKey]) return s;
        const val = cms[s.settingKey];
        // Custom text stats (like rating)
        if (s.custom !== undefined) return { ...s, custom: String(val) };
        // Numeric stats
        const num = Number(val);
        if (!isNaN(num) && num > 0) return { ...s, num };
        return s;
      }));
    }).catch(() => {});
  }, []);

  return (
    <section className="relative z-10 border-y border-z-border bg-[rgba(8,12,21,0.5)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-z-accent bg-clip-text text-transparent">
                {s.custom ? s.custom : <AnimatedCounter target={s.num ?? 0} suffix={s.suffix} />}
              </div>
              <div className="text-xs text-z-muted uppercase tracking-widest mt-2">
                {t(s.labelKey, s.label)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

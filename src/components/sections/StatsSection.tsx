"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Smile, Briefcase, Globe2, Calendar } from "lucide-react";

interface StatItem {
  num?: number;
  suffix?: string;
  label: string;
  custom?: string;
  icon: typeof Smile;
  accent: string;
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView || target <= 0) return;

    let animationFrame: number;
    const duration = 1800;
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
    num: 50,
    suffix: "+",
    label: "Happy Clients",
    icon: Smile,
    accent: "#2563eb",
  },
  {
    num: 100,
    suffix: "+",
    label: "Projects Delivered",
    icon: Briefcase,
    accent: "#7c3aed",
  },
  {
    num: 5,
    suffix: "+",
    label: "Countries Served",
    icon: Globe2,
    accent: "#0891b2",
  },
  {
    label: "Founded",
    custom: "2023",
    icon: Calendar,
    accent: "#ea580c",
  },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [stats] = useState<StatItem[]>(DEFAULT_STATS);

  return (
    <section
      id="stats"
      aria-label="Zentrox Technologies achievements"
      className="relative bg-white px-4 py-20 sm:py-24 md:px-6 md:py-28"
    >
      <div ref={ref} className="mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl md:mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/60 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-blue-700">
            Our Impact
          </div>

          <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Numbers That Tell Our Story
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
            We're proud of the trust our clients place in us and the results we deliver.
          </p>
        </motion.div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col items-center rounded-2xl border border-slate-200/70 bg-white p-6 text-center transition-all hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] md:p-8"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${stat.accent}10`,
                    color: stat.accent,
                  }}
                >
                  <Icon size={22} />
                </div>

                <div className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[44px]">
                  {stat.custom ? (
                    stat.custom
                  ) : (
                    <AnimatedCounter target={stat.num ?? 0} suffix={stat.suffix} />
                  )}
                </div>

                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 sm:text-sm">
                  {stat.label}
                </p>

                <div
                  className="absolute bottom-0 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-t-full transition-all duration-500 group-hover:w-3/4"
                  style={{ backgroundColor: stat.accent }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* FOOTER LINE */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center text-sm text-slate-500 md:mt-14"
        >
          Trusted by businesses across India, USA, UK, Canada, Australia, UAE & Singapore.
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Zap } from "lucide-react";
import { useLang } from "@/lib/providers";

const SESSIONS = [
  {
    day: "17",
    month: "May",
    topic: "React Fundamentals + Hooks Deep Dive",
    time: "10:00 AM — 12:30 PM IST",
    status: "live",
  },
  {
    day: "24",
    month: "May",
    topic: "Full-Stack Next.js: Build a SaaS App",
    time: "10:00 AM — 1:00 PM IST",
    status: "soon",
  },
  {
    day: "31",
    month: "May",
    topic: "AI Integration with Claude API",
    time: "10:00 AM — 12:00 PM IST",
    status: "soon",
  },
  {
    day: "07",
    month: "Jun",
    topic: "Node.js + MongoDB: Backend Mastery",
    time: "10:00 AM — 1:30 PM IST",
    status: "soon",
  },
];

function useCountdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const daysUntil = now.getDay() === 6 ? 7 : 6 - now.getDay();
      const next = new Date(now);
      next.setDate(now.getDate() + daysUntil);
      next.setHours(10, 0, 0, 0);
      const diff = next.getTime() - now.getTime();
      setTime({
        d: Math.max(0, Math.floor(diff / 86400000)),
        h: Math.max(0, Math.floor((diff % 86400000) / 3600000)),
        m: Math.max(0, Math.floor((diff % 3600000) / 60000)),
        s: Math.max(0, Math.floor((diff % 60000) / 1000)),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      {/* Replaced hardcoded glass-card class with standard light/dark utilities */}
      <div className="w-16 h-16 flex items-center justify-center text-2xl font-extrabold rounded-2xl border bg-white dark:bg-z-dark3 border-slate-200 dark:border-z-border shadow-md dark:shadow-glow-sm text-slate-900 dark:text-z-text mb-1.5 transition-colors duration-300">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[10px] text-slate-500 dark:text-z-muted uppercase tracking-widest font-semibold">
        {label}
      </div>
    </div>
  );
}

export default function ClassesSection() {
  const { d, h, m, s } = useCountdown();
  const { t } = useLang();

  const cd_labels = {
    days: t("countdown.days", "Days"),
    hours: t("countdown.hours", "Hours"),
    mins: t("countdown.mins", "Mins"),
    secs: t("countdown.secs", "Secs"),
  };

  return (
    <section
      id="classes"
      className="relative z-10 py-24 px-4 md:px-6 bg-slate-50 dark:bg-z-dark2 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="mb-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-z-accent/10 text-z-accent border border-z-border">
            {t("classes.badge", "Learn with Zentrox Technologies")}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-z-text leading-tight tracking-tight mb-4">
            {t("classes.title", "Live Saturday Classes — Every Week")}
          </h2>
          <p className="text-base text-slate-600 dark:text-z-muted max-w-xl leading-relaxed">
            {t(
              "classes.sub",
              "Master modern website development with weekly live sessions. Interactive, practical, and industry-focused."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Countdown Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-white dark:bg-z-dark3/60 border border-slate-200 dark:border-z-border shadow-xl dark:shadow-card backdrop-blur-xl transition-colors duration-300"
          >
            <div className="mb-6 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-z-accent/10 text-z-accent border border-z-accent/20">
              {t("classes.next_session", "Next Live Session")}
            </div>
            <div className="flex gap-4 justify-center mb-6">
              <CountdownUnit value={d} label={cd_labels.days} />
              <CountdownUnit value={h} label={cd_labels.hours} />
              <CountdownUnit value={m} label={cd_labels.mins} />
              <CountdownUnit value={s} label={cd_labels.secs} />
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-z-muted mb-6">
              <Clock size={14} className="text-z-accent" />
              {t("classes.every_saturday", "Every Saturday — 10:00 AM IST")}
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                [
                  t("classes.feat1", "Interactive"),
                  t("classes.feat1_sub", "Live sessions"),
                ],
                [
                  t("classes.feat2", "Mentored"),
                  t("classes.feat2_sub", "Expert guidance"),
                ],
                [
                  t("classes.feat3", "Certificate"),
                  t("classes.feat3_sub", "On completion"),
                ],
              ].map(([title, sub]) => (
                <div
                  key={title}
                  className="text-center p-3 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200 dark:border-z-border transition-colors duration-300"
                >
                  <div className="text-xs font-bold text-slate-800 dark:text-z-text mb-0.5">
                    {title}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-z-muted">
                    {sub}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/courses"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-z-accent text-white font-semibold text-sm hover:opacity-95 transition-all duration-300 shadow-glow-sm"
            >
              <Zap size={15} />{" "}
              {t("classes.enroll", "Enroll Free — Saturday Classes")}
            </Link>
          </motion.div>

          {/* Sessions List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            {SESSIONS.map((session, i) => (
              <motion.div
                key={session.topic}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-4 flex items-center gap-4 rounded-2xl bg-white dark:bg-z-dark3/60 border border-slate-200 dark:border-z-border shadow-md dark:shadow-card hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-xl"
              >
                <div className="min-w-[52px] h-14 rounded-xl bg-z-accent/10 border border-z-accent/20 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-lg font-extrabold text-z-accent leading-none">
                    {session.day}
                  </span>
                  <span className="text-[10px] text-z-accent/70 dark:text-z-muted uppercase tracking-widest font-semibold mt-0.5">
                    {session.month}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900 dark:text-z-text truncate">
                    {session.topic}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock
                      size={11}
                      className="text-slate-400 dark:text-z-muted flex-shrink-0"
                    />
                    <span className="text-xs text-slate-500 dark:text-z-muted">
                      {session.time}
                    </span>
                  </div>
                </div>
                {session.status === "live" ? (
                  <span className="flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-500/15 text-red-500 dark:text-red-400 border border-red-500/20">
                    LIVE
                  </span>
                ) : (
                  <span className="flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full bg-z-accent/10 text-z-accent border border-z-accent/20">
                    SOON
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Globe2,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { useLang } from "@/lib/providers";

type CardData = {
  icon: typeof Globe2;
  color: string;
  title: string;
  desc: string;
  points: string[];
};

/* =========================================================
   INTERACTIVE GROWTH CARD
========================================================= */

function GrowthCard({ card, index }: { card: CardData; index: number }) {
  const Icon = card.icon;
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      className="
        group relative h-full
        overflow-hidden rounded-[28px]
        border border-slate-200/60
        bg-white/85 p-6
        shadow-[0_8px_30px_rgba(15,23,42,0.04)]
        backdrop-blur-sm
        transition-all duration-500
        hover:border-blue-300/60
        hover:shadow-[0_25px_70px_rgba(15,23,42,0.08)]
        dark:border-white/8
        dark:bg-[#1a1e2b]/80
        dark:hover:border-blue-400/20
        md:p-7
      "
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(450px circle at ${spotlight.x}px ${spotlight.y}px, ${card.color}12, transparent 65%)`,
        }}
      />

      {/* Background glow blob */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundColor: `${card.color}15` }}
      />

      {/* Top accent bar */}
      <div
        className="absolute left-0 top-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: card.color }}
      />

      {/* Icon */}
      <div
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
        style={{
          backgroundColor: `${card.color}10`,
          borderColor: `${card.color}25`,
        }}
      >
        <Icon size={25} style={{ color: card.color }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mt-7">
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          {card.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {card.desc}
        </p>
      </div>

      {/* Points */}
      <div className="relative z-10 mt-6 space-y-3">
        {card.points.map((point) => (
          <div
            key={point}
            className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
          >
            <CheckCircle2
              size={17}
              className="mt-0.5 shrink-0"
              style={{ color: card.color }}
            />
            <span>{point}</span>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div
        className="relative z-10 mt-8 flex items-center gap-2 text-sm font-semibold"
        style={{ color: card.color }}
      >
        <span>Explore how we can help</span>
        <ArrowUpRight
          size={17}
          className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>
    </motion.article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function LocalSection() {
  const { t } = useLang();

  // ── Only English – no Hindi/Punjabi ──
  const LOCATIONS = [
    "Mohali",
    "Chandigarh",
    "Punjab",
    "Haryana",
    "Himachal Pradesh",
    "Delhi NCR",
    "India",
    "USA",
    "UK",
    "Canada",
    "Australia",
    "Worldwide",
  ];

  const INDUSTRIES = [
    "Startups",
    "Healthcare",
    "Real Estate",
    "E-commerce",
    "Education",
    "Manufacturing",
    "Professional Services",
    "Growing Businesses",
  ];

  const marqueeItems = [...LOCATIONS, ...INDUSTRIES];
  const loopItems = [...marqueeItems, ...marqueeItems];

  /* ===== CARDS DATA ===== */
  const cards: CardData[] = [
    {
      icon: Globe2,
      color: "#2563eb",
      title: t("global.card1.title", "Local Understanding. Global Delivery."),
      desc: t(
        "global.card1.desc",
        "We understand the needs of businesses in India while building digital solutions ready for customers, teams and markets worldwide."
      ),
      points: [
        t("global.card1.point1", "Serving businesses across India"),
        t("global.card1.point2", "Remote-first global collaboration"),
        t("global.card1.point3", "Solutions built for scalable growth"),
      ],
    },
    {
      icon: Code2,
      color: "#7c3aed",
      title: t(
        "global.card2.title",
        "Technology Built Around Your Business"
      ),
      desc: t(
        "global.card2.desc",
        "Instead of forcing your business into generic tools, we design websites, software and digital systems around your actual workflows."
      ),
      points: [
        t("global.card2.point1", "Custom websites and web applications"),
        t("global.card2.point2", "Mobile apps and SaaS platforms"),
        t("global.card2.point3", "AI and automation workflows"),
      ],
    },
    {
      icon: Rocket,
      color: "#ea580c",
      title: t("global.card3.title", "Built for Long-Term Growth"),
      desc: t(
        "global.card3.desc",
        "Our goal is not just to launch a project. We help businesses create stronger digital foundations that can evolve as they grow."
      ),
      points: [
        t("global.card3.point1", "Clear communication and strategy"),
        t("global.card3.point2", "Scalable technology decisions"),
        t("global.card3.point3", "Ongoing digital growth support"),
      ],
    },
  ];

  /* ===== TRUST ITEMS ===== */
  const trustItems = [
    {
      icon: MapPin,
      text: t("global.trust.location", "India & Worldwide"),
    },
    {
      icon: BriefcaseBusiness,
      text: t("global.trust.business", "Business-Focused Solutions"),
    },
    {
      icon: ShieldCheck,
      text: t("global.trust.delivery", "Reliable Project Delivery"),
    },
  ];

  return (
    <section
      aria-labelledby="global-heading"
      className="relative overflow-hidden bg-white px-4 py-16 transition-colors duration-300 dark:bg-[#111827] md:px-6 md:py-20 lg:py-24"
    >
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 top-[15%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.05] blur-[150px] dark:bg-blue-400/[0.05]" />
        <div className="absolute -right-40 bottom-[10%] h-[500px] w-[500px] rounded-full bg-orange-400/[0.04] blur-[150px] dark:bg-orange-400/[0.04]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(100,116,139,.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100,116,139,.3) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/60 px-4 py-1.5 text-[11px] font-bold tracking-[0.1em] text-blue-700 backdrop-blur-sm dark:border-blue-400/20 dark:bg-blue-400/[0.05] dark:text-blue-200">
            <Globe2 size={13} />
            <span>{t("global.badge", "Digital Solutions for India & Worldwide")}</span>
          </div>

          <h2
            id="global-heading"
            className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl"
          >
            {t("global.title", "Built in India. Ready for Business Anywhere.")}
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
            {t(
              "global.sub",
              "From Mohali and Chandigarh to businesses across India and international markets, Zentrox Technologies creates modern websites, software, AI solutions and digital growth systems designed around real business goals."
            )}
          </p>

          {/* Trust pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/80 px-4 py-2.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-sm dark:border-white/8 dark:bg-white/[0.04] dark:text-slate-300"
                >
                  <Icon size={14} className="text-blue-600 dark:text-blue-400" />
                  {item.text}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ===== MARQUEE ===== */}
        <div className="relative mt-14 overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent dark:from-[#111827] md:w-40" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent dark:from-[#111827] md:w-40" />

          <motion.div
            className="flex w-max gap-4 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {loopItems.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-slate-200/60 bg-white/80 px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm dark:border-white/8 dark:bg-white/[0.04] dark:text-slate-300"
              >
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ===== SECTION INTRO ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 max-w-3xl text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
              <Users size={20} />
            </div>
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
            {t("global.why.title", "One Technology Partner for Your Digital Growth")}
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
            {t(
              "global.why.sub",
              "We combine strategy, design, development and digital growth so your business can move forward without managing multiple disconnected teams."
            )}
          </p>
        </motion.div>

        {/* ===== CARDS ===== */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <GrowthCard key={`${card.title}-${index}`} card={card} index={index} />
          ))}
        </div>

        {/* ===== BOTTOM TRUST LINE ===== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400"
        >
          <span className="flex items-center gap-2">
            <Sparkles size={14} className="text-blue-500" />
            {t("global.footer1", "Strategy-led digital solutions")}
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-blue-500" />
            {t("global.footer2", "Designed for real business outcomes")}
          </span>
          <span className="flex items-center gap-2">
            <Globe2 size={14} className="text-blue-500" />
            {t("global.footer3", "India-based. Globally connected.")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

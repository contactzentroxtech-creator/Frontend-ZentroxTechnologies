"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, Code2, Globe2, Smartphone, Bot, Sparkles } from "lucide-react";
import { useLang } from "@/lib/providers";

export default function HeroSection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const serviceCards = [
    { icon: Globe2, label: "Website Development", color: "blue", desc: "Fast, responsive, SEO-friendly" },
    { icon: Smartphone, label: "Mobile App Development", color: "purple", desc: "Android & iOS apps" },
    { icon: Code2, label: "Custom Software", color: "emerald", desc: "Tailored business solutions" },
    { icon: Bot, label: "AI & Automation", color: "amber", desc: "Smart automation & integration" },
  ];

  const getColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-50 text-blue-600 border-blue-100",
      purple: "bg-purple-50 text-purple-600 border-purple-100",
      emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
      amber: "bg-amber-50 text-amber-600 border-amber-100",
    };
    return colors[color] || colors.blue;
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#FDF8F3] pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 w-fit rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
              {t("hero.badge")}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-slate-900">
              {t("hero.line1")}
              <br />
              <span className="text-blue-600">{t("hero.line2")}</span>
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-slate-600 md:text-lg">
              {t("hero.sub")}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                {t("hero.cta_primary")}
                <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="btn-secondary">
                {t("hero.cta_secondary")}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-blue-600" />
                MSME Registered
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-blue-600" />
                Founded 2023
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-blue-600" />
                Remote-First
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-3"
          >
            {serviceCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  whileHover={{ x: 6, scale: 1.02 }}
                  className="card-cream flex items-center gap-4 p-4"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${getColor(card.color)}`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-800">{card.label}</h4>
                    <p className="text-xs text-slate-500">{card.desc}</p>
                  </div>
                  <Sparkles size={14} className="text-slate-300" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

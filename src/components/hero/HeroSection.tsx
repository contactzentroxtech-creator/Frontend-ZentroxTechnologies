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

  const floatingCards = [
    { icon: Code2, label: "Custom Software", color: "blue", top: "10%", left: "8%", delay: 0 },
    { icon: Globe2, label: "Web Apps", color: "emerald", top: "55%", left: "70%", delay: 1 },
    { icon: Smartphone, label: "Mobile Apps", color: "purple", top: "15%", left: "75%", delay: 2 },
    { icon: Bot, label: "AI Solutions", color: "amber", top: "65%", left: "12%", delay: 0.5 },
  ];

  const getColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "border-blue-200 bg-blue-50/50 text-blue-600",
      emerald: "border-emerald-200 bg-emerald-50/50 text-emerald-600",
      purple: "border-purple-200 bg-purple-50/50 text-purple-600",
      amber: "border-amber-200 bg-amber-50/50 text-amber-600",
    };
    return colors[color] || colors.blue;
  };

  return (
    <section
      ref={sectionRef}
      className="bg-white pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-36 lg:pb-24 overflow-hidden relative"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 md:gap-6"
          >
            <div className="inline-flex items-center gap-2 w-fit rounded-full border border-gray-200 bg-gray-50 px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-medium text-slate-700">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              {t("hero.badge")}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-slate-900">
              {t("hero.line1")}
              <br />
              <span className="text-blue-600">{t("hero.line2")}</span>
            </h1>

            <p className="max-w-lg text-sm md:text-base leading-relaxed text-slate-700">
              {t("hero.sub")}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 md:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 md:px-6 md:py-3 text-sm font-medium text-white hover:bg-blue-700 w-full sm:w-auto justify-center"
              >
                {t("hero.cta_primary")}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 md:px-6 md:py-3 text-sm font-medium text-slate-700 hover:bg-gray-50 w-full sm:w-auto justify-center"
              >
                {t("hero.cta_secondary")}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[10px] md:text-xs text-slate-600">
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

          {/* Right - Floating Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center min-h-[380px] md:min-h-[420px]"
          >
            {floatingCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className={`absolute ${getColor(card.color)} rounded-xl border bg-white/80 backdrop-blur-sm p-4 shadow-lg w-[140px] sm:w-[160px]`}
                  style={{
                    top: card.top,
                    left: card.left,
                    transform: "translate(-50%, -50%)",
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                      <Icon size={18} className={card.color === "blue" ? "text-blue-600" : card.color === "emerald" ? "text-emerald-600" : card.color === "purple" ? "text-purple-600" : "text-amber-600"} />
                    </div>
                    <span className="text-xs font-medium text-slate-700">{card.label}</span>
                  </div>
                </motion.div>
              );
            })}

            {/* Center Card - Big */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative z-10 w-[200px] sm:w-[240px] md:w-[280px] rounded-2xl border border-gray-200 bg-white shadow-xl p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-blue-600/10 flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-base font-semibold text-slate-800">Zentrox</h3>
              <p className="text-xs text-slate-500 mt-1">Technology & Growth Partner</p>
              <div className="mt-3 flex justify-center gap-2">
                <span className="px-2 py-0.5 text-[10px] bg-blue-100 text-blue-700 rounded-full">Web</span>
                <span className="px-2 py-0.5 text-[10px] bg-purple-100 text-purple-700 rounded-full">Mobile</span>
                <span className="px-2 py-0.5 text-[10px] bg-emerald-100 text-emerald-700 rounded-full">AI</span>
              </div>
              <div className="mt-3 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

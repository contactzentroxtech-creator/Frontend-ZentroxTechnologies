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

  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    frameRef.current.style.transform =
      `rotateX(${y * -6}deg) rotateY(${x * 8}deg) translateY(-6px) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!frameRef.current) return;
    frameRef.current.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
  };

  const serviceCards = [
    { icon: Globe2, label: "Website Development", color: "blue", desc: "Fast, responsive, SEO-friendly" },
    { icon: Smartphone, label: "Mobile App Development", color: "purple", desc: "Android & iOS apps" },
    { icon: Code2, label: "Custom Software", color: "emerald", desc: "Tailored business solutions" },
    { icon: Bot, label: "AI & Automation", color: "amber", desc: "Smart automation & integration" },
  ];

  const getColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "border-blue-200 bg-blue-50/80 text-blue-700",
      purple: "border-purple-200 bg-purple-50/80 text-purple-700",
      emerald: "border-emerald-200 bg-emerald-50/80 text-emerald-700",
      amber: "border-amber-200 bg-amber-50/80 text-amber-700",
    };
    return colors[color] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "text-blue-600",
      purple: "text-purple-600",
      emerald: "text-emerald-600",
      amber: "text-amber-600",
    };
    return colors[color] || colors.blue;
  };

  return (
    <section
      ref={sectionRef}
      className="bg-white pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 md:gap-6 order-1"
          >
            <div className="inline-flex items-center gap-2 w-fit rounded-full border border-gray-200 bg-gray-50 px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-medium text-slate-700">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
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

          {/* Right - Browser + Service Cards */}
          <div className="flex flex-col items-center gap-5 order-2 mt-4 md:mt-0">
            {/* Browser Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative flex justify-center w-full"
            >
              <div
                ref={frameRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full max-w-[420px] md:max-w-[480px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition-shadow duration-300 hover:shadow-2xl relative"
                style={{ transformStyle: "preserve-3d", perspective: "900px", zIndex: 1 }}
              >
                <div className="relative bg-white rounded-xl">
                  {/* Browser Bar */}
                  <div className="flex items-center gap-1.5 sm:gap-2 border-b border-gray-100 bg-gray-50 px-3 py-2 sm:px-4 sm:py-3">
                    <span className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-400" />
                    <span className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-yellow-400" />
                    <span className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-400" />
                    <span className="ml-1 sm:ml-2 rounded-full bg-white px-2 py-0.5 sm:px-3 sm:py-0.5 text-[8px] sm:text-xs text-slate-400 border border-gray-200 truncate max-w-[100px] sm:max-w-none">
                      zentroxtechnologies.com
                    </span>
                  </div>

                  {/* Browser Body */}
                  <div className="p-4 sm:p-6">
                    <div className="mb-1 sm:mb-2 text-sm sm:text-base font-semibold text-slate-900">
                      Custom Software for Growing Businesses
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Built around your workflows, users and goals.
                    </p>

                    <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                      <span className="rounded-full border border-gray-200 bg-white px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-xs font-medium text-slate-700">
                        Web
                      </span>
                      <span className="rounded-full border border-gray-200 bg-white px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-xs font-medium text-slate-700">
                        Mobile
                      </span>
                      <span className="rounded-full border border-blue-600 bg-blue-50 px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-xs font-medium text-blue-700">
                        SaaS
                      </span>
                      <span className="rounded-full border border-gray-200 bg-white px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-xs font-medium text-slate-700">
                        AI
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service Cards - Vertical Stack */}
            <div className="w-full max-w-[420px] md:max-w-[480px] flex flex-col gap-2">
              {serviceCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                    whileHover={{
                      x: 6,
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    className={`rounded-lg border ${getColor(card.color)} bg-white/90 backdrop-blur-sm p-2.5 sm:p-3 shadow-sm hover:shadow-md transition-all duration-300`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColor(card.color)}`}>
                        <Icon size={16} className={getIconColor(card.color)} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-800">{card.label}</h4>
                        <p className="text-[10px] sm:text-xs text-slate-500">{card.desc}</p>
                      </div>
                      <Sparkles size={12} className={`${getIconColor(card.color)} opacity-50`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
      `rotateX(${y * -8}deg) rotateY(${x * 10}deg) translateY(-8px) scale(1.01)`;
  };

  const handleMouseLeave = () => {
    if (!frameRef.current) return;
    frameRef.current.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
  };

  return (
    <section className="bg-white pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 w-fit rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium text-slate-600">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
              {t("hero.badge")}
            </div>

            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              {t("hero.line1")}
              <br />
              <span className="text-blue-600">{t("hero.line2")}</span>
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
              {t("hero.sub")}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
              >
                {t("hero.cta_primary")}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:bg-gray-50"
              >
                {t("hero.cta_secondary")}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
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
            className="flex justify-center"
          >
            <div
              ref={frameRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full max-w-[520px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
              style={{ transformStyle: "preserve-3d", perspective: "900px" }}
            >
              <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-2 rounded-full bg-white px-3 py-0.5 text-xs text-slate-400 border border-gray-200">
                  zentroxtechnologies.com
                </span>
              </div>
              <div className="p-6 sm:p-8">
                <div className="mb-2 text-sm font-semibold text-slate-900">
                  Custom Software for Growing Businesses
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Built around your workflows, users and goals.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                    Web
                  </span>
                  <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                    Mobile
                  </span>
                  <span className="rounded-full border border-blue-600 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    SaaS
                  </span>
                  <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                    AI
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

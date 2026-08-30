"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Smartphone,
  Code2,
  Cloud,
  Palette,
  Bot,
  BarChart3,
  Users,
  Cable,
  Sparkles,
  Megaphone,
} from "lucide-react";
import { useLang } from "@/lib/providers";

export default function HeroSection() {
  const { t } = useLang();
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  // 3D tilt effect on browser frame
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateX = y * -8;
    const rotateY = x * 10;
    frameRef.current.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
  };

  const handleMouseLeave = () => {
    if (!frameRef.current) return;
    frameRef.current.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Zentrox Technologies Digital Solutions"
      className="relative overflow-hidden bg-white pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24"
    >
      {/* Background Shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-slate-100/30 blur-[100px]" />
        
        {/* Floating Shapes */}
        <div className="absolute top-[15%] left-[5%] h-64 w-64 rounded-full bg-amber-500/5 blur-3xl animate-float" />
        <div className="absolute bottom-[20%] right-[8%] h-40 w-40 rounded-full bg-blue-500/5 blur-3xl animate-float-delayed" />
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 h-24 w-24 rounded-full bg-amber-500/5 blur-3xl animate-float-slow" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 w-fit rounded-full border border-gray-200 bg-gray-50/80 px-4 py-1.5 text-xs font-medium text-slate-600 backdrop-blur-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
              {t("hero.badge")}
            </div>

            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              {t("hero.line1")}
              <br />
              <span className="text-amber-600 relative">
                {t("hero.line2")}
                <span className="absolute -bottom-2 left-0 h-2 w-full bg-amber-500/20 rounded-full" />
              </span>
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg">
              {t("hero.sub")}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5"
              >
                {t("hero.cta_primary")}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-6 py-3 text-sm font-medium text-slate-700 transition-all hover:border-gray-300 hover:bg-white hover:shadow-sm"
              >
                {t("hero.cta_secondary")}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-amber-500" />
                MSME Registered
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-amber-500" />
                Founded 2023
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-amber-500" />
                Remote-First
              </span>
            </div>
          </motion.div>

          {/* Right - Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              ref={frameRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full max-w-[520px] overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-xl transition-shadow duration-300 hover:shadow-2xl"
              style={{ transformStyle: "preserve-3d", perspective: "900px" }}
            >
              {/* Browser Bar */}
              <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-2 rounded-full bg-white px-3 py-0.5 text-xs text-slate-400 border border-gray-200">
                  zentroxtechnologies.com
                </span>
              </div>

              {/* Browser Body */}
              <div className="p-6 sm:p-8">
                <div className="mb-3 text-sm font-semibold text-slate-900">
                  Custom Software for Growing Businesses
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Built around your workflows, users and goals.
                </p>

                <div className="mt-4 space-y-2">
                  <div className="h-2 w-full rounded-full bg-slate-100" />
                  <div className="h-2 w-3/4 rounded-full bg-slate-100" />
                  <div className="h-2 w-1/2 rounded-full bg-slate-100" />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                    Web
                  </span>
                  <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                    Mobile
                  </span>
                  <span className="rounded-full border border-amber-600 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
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

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(20px, -15px) rotate(3deg); }
          66% { transform: translate(-15px, 10px) rotate(-3deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-20px, 15px) rotate(-3deg); }
          66% { transform: translate(15px, -10px) rotate(3deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(0, -20px) scale(1.05); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite alternate;
        }
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite alternate;
        }
        .animate-float-slow {
          animation: float-slow 18s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Star,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import api from "@/lib/api";

interface CMSData {
  hero_title?: string;
  hero_subtitle?: string;
  hero_image?: string;
  hero_cta_text?: string;
}

export default function HeroSection() {
  const [cms, setCms] = useState<CMSData>({});
  const [loading, setLoading] = useState(true);

  /* ─── Fetch CMS ─── */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/cms");
        if (data?.success && data.data) {
          setCms(data.data);
        } else if (data && typeof data === "object") {
          setCms(data);
        }
      } catch {
        // Fallback — no CMS data, use defaults
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ─── Defaults (fallback) ─── */
  const title =
    cms.hero_title || "Build. Grow. Scale with Zentrox Technologies";
  const subtitle =
    cms.hero_subtitle ||
    "From websites and mobile apps to AI-powered software and digital marketing — we deliver end-to-end solutions that move your business forward.";
  const ctaText = cms.hero_cta_text || "Start Your Project";
  const heroImage = cms.hero_image;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FDF8F3] via-white to-[#EFF6FF] px-4 pt-24 pb-20 sm:pt-28 sm:pb-24 md:px-6 md:pt-32 md:pb-28">
      {/* Background Blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-pink-200/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ═══ Left — Content ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-sm mb-6">
              <Sparkles size={13} />
              MSME Registered • Trusted by 100+ Clients
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-6">
              {title.includes("Zentrox") ? (
                <>
                  {title.split("Zentrox")[0]}
                  <span className="gradient-text">Zentrox</span>
                  {title.split("Zentrox")[1]}
                </>
              ) : (
                title
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start mb-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                {ctaText}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all"
              >
                Get Instant Quote
              </Link>
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center lg:justify-start">
              {[
                "Free Consultation",
                "24hr Response",
                "Post-Launch Support",
              ].map((point, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600"
                >
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  {point}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              {[
                { icon: Users, value: "100+", label: "Clients" },
                { icon: Award, value: "150+", label: "Projects" },
                { icon: TrendingUp, value: "5+", label: "Years" },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-3 text-center shadow-sm"
                  >
                    <Icon
                      size={16}
                      className="mx-auto text-blue-600 mb-1.5"
                    />
                    <p className="text-lg font-extrabold text-slate-900 leading-none">
                      {stat.value}
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-1">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ═══ Right — Hero Image / Visual ═══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Decorative frame */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-2xl" />

              {/* Image container */}
              <div className="relative rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
                  {heroImage ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={heroImage}
                        alt="Zentrox Technologies — Hero"
                        className="w-full h-full object-cover"
                      />
                    </>
                  ) : (
                    /* Fallback visual — no CMS image yet */
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg">
                        <Sparkles size={36} className="text-blue-600" />
                      </div>
                      <p className="text-sm font-bold text-slate-700">
                        Your Hero Image
                      </p>
                      <p className="text-xs text-slate-500 text-center max-w-[200px]">
                        Upload an image via Media Manager and select it in CMS
                        → Hero Section
                      </p>
                    </div>
                  )}
                </div>

                {/* Floating badges */}
                <div className="absolute -top-3 -left-3 rounded-xl border border-emerald-200 bg-white px-3 py-2 shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                      <CheckCircle2 size={12} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-900 leading-none">
                        Delivered
                      </p>
                      <p className="text-[9px] text-slate-500">
                        150+ Projects
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-3 -right-3 rounded-xl border border-blue-200 bg-white px-3 py-2 shadow-lg">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={11}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="text-[10px] font-bold text-slate-900 ml-1">
                      4.9
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5">
                    Client Rating
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

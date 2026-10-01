"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Users,
  ShieldCheck,
  Clock,
  Headphones,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { useLang } from "@/lib/providers";

const POINTS = [
  {
    icon: Users,
    titleKey: "about.point1.title",
    descKey: "about.point1.desc",
    titleFB: "Client-Centric Approach",
    descFB: "Your goals, our priority. We listen first, then build.",
    color: "#2563eb",
  },
  {
    icon: ShieldCheck,
    titleKey: "about.point2.title",
    descKey: "about.point2.desc",
    titleFB: "Transparent Process",
    descFB: "No hidden costs. No surprises. Clear communication at every step.",
    color: "#7c3aed",
  },
  {
    icon: Clock,
    titleKey: "about.point3.title",
    descKey: "about.point3.desc",
    titleFB: "On-Time Delivery",
    descFB: "Because your time matters. We deliver what we promise.",
    color: "#0891b2",
  },
  {
    icon: Headphones,
    titleKey: "about.point4.title",
    descKey: "about.point4.desc",
    titleFB: "Long-Term Support",
    descFB: "We're with you always — before, during and after launch.",
    color: "#ea580c",
  },
];

export default function WhyChooseUsSection() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="about"
      aria-label="About Zentrox Technologies"
      className="relative overflow-hidden bg-[#FDF8F3] px-4 py-20 sm:py-24 md:px-6 md:py-28 lg:py-32"
    >
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-blue-100/40 blur-[120px]" />
        <div className="absolute -left-40 bottom-20 h-[400px] w-[400px] rounded-full bg-purple-100/30 blur-[120px]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ─── LEFT: IMAGE ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60">
                <Image
                  src="/team-photo.png"
                  alt="Zentrox Technologies team working on digital solutions"
                  width={600}
                  height={700}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>

              {/* Floating badge - Founded */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 -top-4 z-10 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-500">
                      Founded
                    </p>
                    <p className="text-lg font-extrabold text-slate-900">2023</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge - Projects */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-4 z-10 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-500">
                      Projects Delivered
                    </p>
                    <p className="text-lg font-extrabold text-slate-900">100+</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ─── RIGHT: CONTENT ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7"
          >
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-purple-50/60 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-purple-700">
              {t("about.badge", "About Zentrox")}
            </div>

            {/* Title */}
            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {t("about.title", "More Than Just a Tech Company")}
            </h2>

            {/* Description */}
            <p className="mt-5 text-base leading-relaxed text-slate-600 lg:text-lg">
              {t(
                "about.sub",
                "We're a team of passionate developers, designers and digital marketers dedicated to turning your ideas into powerful digital experiences. We believe in clean code, creative design and long-term partnerships."
              )}
            </p>

            {/* Points Grid */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {POINTS.map((point, index) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={point.titleKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.1,
                    }}
                    className="group flex items-start gap-4"
                  >
                    <div
                      className="
                        flex h-11 w-11 flex-shrink-0 items-center justify-center
                        rounded-xl
                        transition-transform duration-300
                        group-hover:scale-110
                      "
                      style={{
                        backgroundColor: `${point.color}10`,
                        color: point.color,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {t(point.titleKey, point.titleFB)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {t(point.descKey, point.descFB)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8"
            >
              <Link
                href="/about"
                className="
                  group inline-flex items-center gap-2
                  rounded-full bg-slate-900 px-6 py-3
                  text-sm font-semibold text-white
                  shadow-lg shadow-slate-900/20
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-slate-800
                  hover:shadow-xl
                "
              >
                {t("about.learn_more", "Learn More About Us")}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
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

const POINTS = [
  {
    icon: Users,
    title: "Client-Centric Approach",
    desc: "Your goals, our priority. We listen first, then build.",
    color: "#2563eb",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Process",
    desc: "No hidden costs. No surprises. Clear communication.",
    color: "#7c3aed",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "Because your time matters. We deliver what we promise.",
    color: "#0891b2",
  },
  {
    icon: Headphones,
    title: "Long-Term Support",
    desc: "We're with you always — before, during and after launch.",
    color: "#ea580c",
  },
];

const TEAM = [
  { name: "Dev Team", role: "Backend & APIs", color: "blue" },
  { name: "Design", role: "UI/UX", color: "purple" },
  { name: "Marketing", role: "SEO & Growth", color: "emerald" },
  { name: "Support", role: "24/7 Client Care", color: "orange" },
];

export default function WhyChooseUsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="about"
      aria-label="About Zentrox Technologies"
      className="relative overflow-hidden bg-[#FDF8F3] px-4 py-20 sm:py-24 md:px-6 md:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-blue-100/40 blur-[120px]" />
        <div className="absolute -left-40 bottom-20 h-[400px] w-[400px] rounded-full bg-purple-100/30 blur-[120px]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT - CSS ILLUSTRATION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-6 shadow-2xl shadow-slate-200/60">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                      <span className="text-xs font-black text-white">Z</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-slate-900">
                        ZENTROX
                      </p>
                      <p className="text-[8px] font-semibold tracking-[0.15em] text-slate-500">
                        TECHNOLOGIES
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-600">
                    ● Online
                  </span>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {TEAM.map((m) => (
                    <div
                      key={m.name}
                      className="rounded-xl border border-slate-100 bg-white p-3"
                    >
                      <div
                        className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${
                          m.color === "blue"
                            ? "bg-blue-50 text-blue-600"
                            : m.color === "purple"
                            ? "bg-purple-50 text-purple-600"
                            : m.color === "emerald"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        <span className="text-xs font-black">
                          {m.name.charAt(0)}
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-900">
                        {m.name}
                      </p>
                      <p className="text-[9px] text-slate-500">{m.role}</p>
                    </div>
                  ))}
                </div>

                {/* Stats bar */}
                <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-slate-100 bg-white p-3">
                  {[
                    { v: "100+", l: "Projects" },
                    { v: "50+", l: "Clients" },
                    { v: "5+", l: "Countries" },
                  ].map((s) => (
                    <div key={s.l} className="text-center">
                      <p className="text-sm font-extrabold text-slate-900">
                        {s.v}
                      </p>
                      <p className="text-[9px] text-slate-500">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge - Founded */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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
                    <p className="text-lg font-extrabold text-slate-900">
                      2023
                    </p>
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
                    <p className="text-lg font-extrabold text-slate-900">
                      100+
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT - CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-purple-50/60 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-purple-700">
              About Zentrox Technologies
            </div>

            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              More Than Just a Tech Company
            </h2>

            <p className="mt-5 text-base leading-relaxed text-slate-600 lg:text-lg">
              Zentrox Technologies is a team of passionate developers, designers
              and digital marketers dedicated to turning your ideas into
              powerful digital experiences. We believe in clean code, creative
              design and long-term partnerships.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {POINTS.map((point, index) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.1,
                    }}
                    className="group flex items-start gap-4"
                  >
                    <div
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${point.color}10`,
                        color: point.color,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {point.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {point.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl"
              >
                Learn More About Us
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

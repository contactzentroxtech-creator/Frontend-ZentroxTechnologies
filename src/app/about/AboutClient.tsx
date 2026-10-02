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
  Rocket,
  Heart,
  Target,
  Lightbulb,
  Handshake,
  Globe2,
} from "lucide-react";

const VALUES = [
  {
    icon: Heart,
    title: "Client First",
    desc: "Your goals guide every decision.",
    color: "#2563eb",
  },
  {
    icon: ShieldCheck,
    title: "Quality Always",
    desc: "Clean code, tested delivery.",
    color: "#7c3aed",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "Modern tools, practical thinking.",
    color: "#0891b2",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnerships",
    desc: "We grow when you grow.",
    color: "#ea580c",
  },
];

const POINTS = [
  {
    icon: Users,
    title: "Client-Centric Approach",
    desc: "Your goals, our priority.",
    color: "#2563eb",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Process",
    desc: "No hidden costs. No surprises.",
    color: "#7c3aed",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "Because your time matters.",
    color: "#0891b2",
  },
  {
    icon: Headphones,
    title: "Long-Term Support",
    desc: "We're with you always.",
    color: "#ea580c",
  },
];

const STATS = [
  { num: "50+", label: "Happy Clients", icon: Users, color: "#2563eb" },
  { num: "100+", label: "Projects Delivered", icon: Rocket, color: "#7c3aed" },
  { num: "5+", label: "Countries Served", icon: Globe2, color: "#0891b2" },
  { num: "2023", label: "Founded", icon: Building2, color: "#ea580c" },
];

const SERVICES_GRID = [
  { t: "Web Development", c: "blue" },
  { t: "Mobile Apps", c: "purple" },
  { t: "Custom Software", c: "emerald" },
  { t: "UI/UX Design", c: "cyan" },
  { t: "SEO & Marketing", c: "orange" },
  { t: "AI Integration", c: "indigo" },
];

export default function AboutClient() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#FDF8F3] pt-12 pb-16 md:pt-16 md:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-blue-100/60 blur-[120px]" />
          <div className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-purple-100/50 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-white/80 px-4 py-1.5 text-xs font-semibold text-purple-700 shadow-sm">
                <Building2 size={13} />
                About Zentrox Technologies
              </div>

              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-[56px]">
                More Than Just a
                <br />
                <span className="gradient-text">Tech Company</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 lg:text-lg">
                Zentrox Technologies is a team of passionate developers,
                designers and digital marketers dedicated to turning your ideas
                into powerful digital experiences.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Rocket size={18} />
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-slate-900">
                      100+
                    </p>
                    <p className="text-[11px] text-slate-500">Projects</p>
                  </div>
                </div>
                <div className="h-10 w-px bg-slate-200" />
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-slate-900">
                      50+
                    </p>
                    <p className="text-[11px] text-slate-500">Clients</p>
                  </div>
                </div>
                <div className="h-10 w-px bg-slate-200" />
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <Globe2 size={18} />
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-slate-900">5+</p>
                    <p className="text-[11px] text-slate-500">Countries</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CSS Services Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:col-span-6"
            >
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                      <span className="text-xs font-black text-white">Z</span>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold text-slate-900">
                        Zentrox Technologies
                      </p>
                      <p className="text-[9px] text-slate-500">
                        Building digital products since 2023
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {SERVICES_GRID.map((s) => (
                    <div
                      key={s.t}
                      className="rounded-xl border border-slate-100 bg-white p-3"
                    >
                      <div
                        className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${
                          s.c === "blue"
                            ? "bg-blue-50 text-blue-600"
                            : s.c === "purple"
                            ? "bg-purple-50 text-purple-600"
                            : s.c === "emerald"
                            ? "bg-emerald-50 text-emerald-600"
                            : s.c === "cyan"
                            ? "bg-cyan-50 text-cyan-600"
                            : s.c === "orange"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-indigo-50 text-indigo-600"
                        }`}
                      >
                        <span className="text-xs font-black">
                          {s.t.charAt(0)}
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-900">
                        {s.t}
                      </p>
                      <div className="mt-2 flex gap-1">
                        <div className="h-1 flex-1 rounded-full bg-slate-100" />
                        <div className="h-1 w-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
                      </div>
                    </div>
                  ))}
                </div>

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
            </motion.div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="relative bg-white px-4 py-20 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/60 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-blue-700">
                <Target size={12} />
                Our Story
              </div>

              <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                Built with Passion, Driven by Purpose
              </h2>

              <p className="mt-5 text-base leading-relaxed text-slate-600">
                Zentrox Technologies was founded in 2023 with a single vision —
                to help businesses grow through technology. Today, we work with
                clients across India and worldwide, delivering high-quality
                digital solutions.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "MSME Registered Company",
                  "Remote-First, Global Delivery",
                  "Transparent, Honest Communication",
                  "Long-Term Client Relationships",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-slate-700"
                  >
                    <CheckCircle2
                      size={16}
                      className="flex-shrink-0 text-emerald-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {VALUES.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div
                      key={value.title}
                      className="group rounded-2xl border border-slate-200/70 bg-white p-6 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                    >
                      <div
                        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${value.color}12`,
                          color: value.color,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {value.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                        {value.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section
        ref={ref}
        className="relative bg-[#FDF8F3] px-4 py-20 md:px-6"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-purple-50/60 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-purple-700">
              Why Zentrox
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              What Makes Us Different
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="group flex flex-col items-center rounded-2xl border border-slate-200/70 bg-white p-6 text-center transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${point.color}12`,
                      color: point.color,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative bg-white px-4 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-2xl border border-slate-200/70 bg-white p-6 text-center"
                >
                  <div
                    className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${stat.color}12`,
                      color: stat.color,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    {stat.num}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-white px-4 py-16 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-8 py-14 text-center shadow-2xl sm:px-12">
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                Let's Build Something Great Together
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
                Have a project in mind? Let's discuss how we can bring your
                ideas to life.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition-all hover:-translate-y-1"
                >
                  Start Your Project
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-1"
                >
                  View Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

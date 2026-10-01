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
  Rocket,
  Heart,
  Target,
  Lightbulb,
  Handshake,
  Globe2,
  TrendingUp,
} from "lucide-react";
import { useLang } from "@/lib/providers";

const VALUES = [
  {
    icon: Heart,
    title: "Client First",
    desc: "Your goals guide every decision we make.",
    color: "#2563eb",
  },
  {
    icon: ShieldCheck,
    title: "Quality Always",
    desc: "Clean code, thoughtful design, tested delivery.",
    color: "#7c3aed",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "Modern tools and practical thinking combined.",
    color: "#0891b2",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnerships",
    desc: "We grow when our clients grow.",
    color: "#ea580c",
  },
];

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

const STATS = [
  { num: "50+", label: "Happy Clients", icon: Users, color: "#2563eb" },
  { num: "100+", label: "Projects Delivered", icon: Rocket, color: "#7c3aed" },
  { num: "5+", label: "Countries Served", icon: Globe2, color: "#0891b2" },
  { num: "2023", label: "Founded", icon: Building2, color: "#ea580c" },
];

export default function AboutClient() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <main className="bg-white">
      {/* ─── HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#FDF8F3] pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-blue-100/60 blur-[120px]" />
          <div className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-purple-100/50 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-white/80 px-4 py-1.5 text-xs font-semibold text-purple-700 shadow-sm backdrop-blur-sm">
                <Building2 size={13} />
                {t("about.page.badge", "About Zentrox")}
              </div>

              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-[56px]">
                {t("about.page.title1", "More Than Just a")}
                <br />
                <span className="gradient-text">
                  {t("about.page.title2", "Tech Company")}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 lg:text-lg">
                {t(
                  "about.page.sub",
                  "We're a team of passionate developers, designers and digital marketers dedicated to turning your ideas into powerful digital experiences. We believe in clean code, creative design and long-term partnerships."
                )}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Rocket size={18} />
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-slate-900">100+</p>
                    <p className="text-[11px] text-slate-500">Projects</p>
                  </div>
                </div>

                <div className="h-10 w-px bg-slate-200" />

                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-slate-900">50+</p>
                    <p className="text-[11px] text-slate-500">Happy Clients</p>
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

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:col-span-6"
            >
              <div className="relative">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60">
                  <Image
                    src="/about-team.png"
                    alt="Zentrox Technologies team collaborating"
                    width={700}
                    height={500}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-6 -left-6 z-10 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-slate-500">
                        Client Growth
                      </p>
                      <p className="text-lg font-extrabold text-slate-900">
                        +140%
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── OUR STORY ────────────────────────────── */}
      <section className="relative bg-white px-4 py-20 sm:py-24 md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/60 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-blue-700">
                <Target size={12} />
                {t("about.story.badge", "Our Story")}
              </div>

              <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                {t("about.story.title", "Built with Passion, Driven by Purpose")}
              </h2>

              <p className="mt-5 text-base leading-relaxed text-slate-600">
                {t(
                  "about.story.desc1",
                  "Zentrox Technologies was founded in 2023 with a single vision — to help businesses grow through technology. Today, we work with clients across India and worldwide, delivering high-quality digital solutions that make an impact."
                )}
              </p>

              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {t(
                  "about.story.desc2",
                  "From startups and local businesses to growing enterprises, we build practical digital products that solve real business problems. Every project starts by understanding the business first, then choosing the right technology."
                )}
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-6"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {VALUES.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div
                      key={value.title}
                      className="group rounded-2xl border border-slate-200/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                    >
                      <div
                        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─────────────────────────── */}
      <section
        ref={ref}
        className="relative bg-[#FDF8F3] px-4 py-20 sm:py-24 md:px-6 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14 max-w-3xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-purple-50/60 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-purple-700">
              {t("about.why.badge", "Why Zentrox")}
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {t("about.why.title", "What Makes Us Different")}
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
              {t(
                "about.why.sub",
                "We combine technical expertise with business understanding to deliver solutions that actually work."
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {POINTS.map((point, i) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex flex-col items-center rounded-2xl border border-slate-200/70 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ──────────────────────────── */}
      <section className="relative bg-white px-4 py-16 sm:py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center rounded-2xl border border-slate-200/70 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────── */}
      <section className="relative bg-white px-4 py-16 sm:py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-8 py-14 text-center shadow-2xl shadow-slate-900/20 sm:px-12 sm:py-16"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)
                `,
                backgroundSize: "48px 48px",
              }}
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                {t("about.cta.title", "Let's Build Something Great Together")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                {t(
                  "about.cta.sub",
                  "Have a project in mind? Let's discuss how we can bring your ideas to life."
                )}
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-xl"
                >
                  {t("about.cta.primary", "Start Your Project")}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  {t("about.cta.secondary", "View Our Services")}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

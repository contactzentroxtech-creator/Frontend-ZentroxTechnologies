"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Smartphone,
  Code2,
  Palette,
  CheckCircle2,
  Download,
  Calculator,
  Zap,
  ShieldCheck,
  Heart,
  Users,
} from "lucide-react";
import { useLang } from "@/lib/providers";
import api from "@/lib/api";

/* =========================================================
   DATA
========================================================= */

const PROJECT_TYPES = [
  { id: "web", label: "Website", desc: "Business, E-commerce, Landing Page etc.", icon: Globe, base: 25000, color: "#2563eb" },
  { id: "mobile", label: "Mobile App", desc: "iOS, Android, Cross-Platform", icon: Smartphone, base: 40000, color: "#7c3aed" },
  { id: "software", label: "Custom Software", desc: "Web Apps, SaaS, Enterprise Solutions", icon: Code2, base: 60000, color: "#0891b2" },
  { id: "design", label: "UI/UX Design", desc: "Design, Redesign, Prototyping", icon: Palette, base: 20000, color: "#ea580c" },
];

const PAGES_OPTIONS = [
  { value: "1-5", label: "1 – 5", multiplier: 0.8 },
  { value: "5-10", label: "5 – 10", multiplier: 1.0 },
  { value: "10-25", label: "10 – 25", multiplier: 1.3 },
  { value: "25-50", label: "25 – 50", multiplier: 1.7 },
  { value: "50+", label: "50+", multiplier: 2.2 },
];

const FEATURES_OPTIONS = [
  { value: "basic", label: "Basic (Contact, About, Gallery, etc.)", multiplier: 0.9 },
  { value: "standard", label: "Standard (CMS, Blog, Forms, etc.)", multiplier: 1.0 },
  { value: "advanced", label: "Advanced (Payments, Dashboards, Integrations)", multiplier: 1.4 },
  { value: "enterprise", label: "Enterprise (Multi-role, Custom Logic)", multiplier: 2.0 },
];

const TIMELINE_OPTIONS = [
  { value: "flexible", label: "Flexible", multiplier: 0.9 },
  { value: "1-2", label: "1 – 2 Months", multiplier: 1.0 },
  { value: "2-4", label: "2 – 4 Months", multiplier: 1.15 },
  { value: "urgent", label: "Urgent (ASAP)", multiplier: 1.5 },
];

const BUDGET_OPTIONS = [
  { value: "under-25k", label: "Under ₹25,000" },
  { value: "25k-50k", label: "₹25,000 – ₹50,000" },
  { value: "50k-1l", label: "₹50,000 – ₹1,00,000" },
  { value: "1l-3l", label: "₹1,00,000 – ₹3,00,000" },
  { value: "3l+", label: "₹3,00,000+" },
];

/* =========================================================
   HELPERS
========================================================= */

function formatPrice(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function PricingWizard() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  const [projectType, setProjectType] = useState<string>("web");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState("5-10");
  const [features, setFeatures] = useState("standard");
  const [timeline, setTimeline] = useState("1-2");
  const [budget, setBudget] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ─── CALCULATE ESTIMATE ──────────────────────── */
  const calculateEstimate = () => {
    const pt = PROJECT_TYPES.find((p) => p.id === projectType);
    const pg = PAGES_OPTIONS.find((p) => p.value === pages);
    const ft = FEATURES_OPTIONS.find((f) => f.value === features);
    const tl = TIMELINE_OPTIONS.find((t2) => t2.value === timeline);

    if (!pt || !pg || !ft || !tl) return { low: 0, high: 0 };

    const base = pt.base;
    const estimated = base * pg.multiplier * ft.multiplier * tl.multiplier;

    const low = Math.max(
      pt.base * 0.9,
      Math.round((estimated * 0.85) / 1000) * 1000
    );
    const high = Math.round((estimated * 1.35) / 1000) * 1000;

    return { low, high };
  };

  const estimate = calculateEstimate();

  /* ─── SUBMIT ──────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    setSubmitting(true);
    try {
      await api.post("/leads", {
        name: projectName || "Budget Calculator Lead",
        service: PROJECT_TYPES.find((p) => p.id === projectType)?.label,
        budget:
          budget ||
          `${formatPrice(estimate.low)} - ${formatPrice(estimate.high)}`,
        message: `Project: ${projectName}\nDescription: ${description}\nPages: ${pages}\nFeatures: ${features}\nTimeline: ${timeline}\nEstimate: ${formatPrice(estimate.low)} - ${formatPrice(estimate.high)}`,
        source: "budget-calculator",
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadQuote = () => {
    const content = `
ZENTROX TECHNOLOGIES — PROJECT ESTIMATE
========================================
Project: ${projectName || "Untitled"}
Type: ${PROJECT_TYPES.find((p) => p.id === projectType)?.label}
Description: ${description}
Pages: ${pages}
Features: ${features}
Timeline: ${timeline}

Estimated Range: ${formatPrice(estimate.low)} - ${formatPrice(estimate.high)}
(May vary based on final requirements)

Generated: ${new Date().toLocaleDateString("en-IN")}
Website: zentroxtechnologies.com
Contact: contact.zentroxtech@gmail.com
`.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zentrox-estimate-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="budget-calculator"
      aria-label="Project budget calculator"
      className="relative overflow-hidden bg-white px-4 py-20 sm:py-24 md:px-6 md:py-28 lg:py-32"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute -right-40 top-60 h-[500px] w-[500px] rounded-full bg-purple-100/40 blur-[120px]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl">
        {/* ─── HERO HEADER ───────────────────────────── */}
        <div className="mb-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/60 px-4 py-1.5 text-xs font-semibold text-blue-700">
              <Zap size={13} />
              {t("calc.badge", "Plan Smarter")}
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">
                {t("calc.badge2", "Build Better")}
              </span>
            </div>

            <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-[56px]">
              {t("calc.title1", "Website & App")}
              <br />
              <span className="gradient-text">
                {t("calc.title2", "Budget Calculator")}
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 lg:text-lg">
              {t(
                "calc.sub",
                "Get an instant estimate for your website, mobile app or custom software project. Tell us your requirements and see a clear, transparent budget — no hidden costs, no surprises."
              )}
            </p>

            {/* Feature pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: Zap, text: "Instant Estimate in Seconds", color: "#2563eb" },
                { icon: ShieldCheck, text: "100% Transparent Pricing", color: "#0891b2" },
                { icon: Heart, text: "Tailored to Your Business Needs", color: "#ea580c" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm"
                  >
                    <div
                      className="flex h-6 w-6 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                      }}
                    >
                      <Icon size={12} />
                    </div>
                    {item.text}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:col-span-6"
          >
            <div className="relative mx-auto max-w-[520px]">
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src="/calculator-hero.png"
                  alt="Zentrox Technologies budget calculator illustration"
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* Floating price cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-2 top-4 z-10 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:top-8"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Globe size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-700">
                      Website Development
                    </p>
                    <p className="text-xs font-extrabold text-slate-900">
                      ₹25,000+
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -right-2 top-1/3 z-10 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <Smartphone size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-700">
                      Mobile App Development
                    </p>
                    <p className="text-xs font-extrabold text-slate-900">
                      ₹40,000+
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -right-2 bottom-8 z-10 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                    <Code2 size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-700">
                      Custom Software
                    </p>
                    <p className="text-xs font-extrabold text-slate-900">
                      ₹60,000+
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ─── CALCULATOR CARD ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* ─── LEFT FORM ─────────────────────────── */}
            <div className="border-b border-slate-100 p-6 sm:p-8 lg:col-span-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Calculator size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                    {t("calc.form.title", "Calculate Your Project Budget")}
                  </h3>
                  <p className="text-xs text-slate-500 sm:text-sm">
                    {t(
                      "calc.form.sub",
                      "Choose your project type and tell us a few details. Get an instant estimate based on your requirements."
                    )}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Type Cards */}
                <div>
                  <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    {t("calc.form.type", "Project Type")}
                  </label>
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {PROJECT_TYPES.map((pt) => {
                      const Icon = pt.icon;
                      const active = projectType === pt.id;
                      return (
                        <button
                          key={pt.id}
                          type="button"
                          onClick={() => setProjectType(pt.id)}
                          className={`
                            group flex flex-col items-start gap-2 rounded-2xl border p-4 text-left
                            transition-all duration-300
                            ${
                              active
                                ? "border-blue-500 bg-blue-50/60 shadow-md shadow-blue-500/10"
                                : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm"
                            }
                          `}
                        >
                          <div
                            className="flex h-9 w-9 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                            style={{
                              backgroundColor: active
                                ? `${pt.color}20`
                                : `${pt.color}10`,
                              color: pt.color,
                            }}
                          >
                            <Icon size={16} />
                          </div>
                          <p className="text-xs font-bold text-slate-900 sm:text-sm">
                            {pt.label}
                          </p>
                          <p className="text-[10px] leading-tight text-slate-500 sm:text-xs">
                            {pt.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Name + Description */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      {t("calc.form.name", "Project Name")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder={t(
                        "calc.form.name.ph",
                        "e.g. Business Website / Food Delivery App"
                      )}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      {t("calc.form.desc", "Project Description")}
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t(
                        "calc.form.desc.ph",
                        "Tell us about your idea or requirements..."
                      )}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Pages + Features */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      {t("calc.form.pages", "Pages / Screens (Approx.)")}
                    </label>
                    <select
                      value={pages}
                      onChange={(e) => setPages(e.target.value)}
                      className="input-field"
                    >
                      {PAGES_OPTIONS.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      {t("calc.form.features", "Features Needed")}
                    </label>
                    <select
                      value={features}
                      onChange={(e) => setFeatures(e.target.value)}
                      className="input-field"
                    >
                      {FEATURES_OPTIONS.map((f) => (
                        <option key={f.value} value={f.value}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Timeline + Budget */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      {t("calc.form.timeline", "Estimated Timeline")}
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="input-field"
                    >
                      {TIMELINE_OPTIONS.map((tl) => (
                        <option key={tl.value} value={tl.value}>
                          {tl.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      {t("calc.form.budget", "Your Budget Range")}
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="input-field"
                    >
                      <option value="">
                        {t("calc.form.budget.ph", "Select Budget Range")}
                      </option>
                      {BUDGET_OPTIONS.map((b) => (
                        <option key={b.value} value={b.label}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Agreement */}
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span className="text-xs text-slate-600">
                    {t(
                      "calc.form.agree",
                      "I agree to be contacted by Zentrox Technologies regarding this estimate."
                    )}
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!agreed || submitting}
                  className={`
                    group flex w-full items-center justify-center gap-2
                    rounded-full bg-gradient-to-r from-blue-600 to-purple-600
                    px-7 py-3.5 text-sm font-semibold text-white
                    shadow-lg shadow-blue-600/25
                    transition-all duration-300
                    ${
                      !agreed || submitting
                        ? "cursor-not-allowed opacity-60"
                        : "hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/35"
                    }
                  `}
                >
                  {submitting
                    ? t("calc.form.sending", "Sending...")
                    : submitted
                    ? t("calc.form.sent", "Estimate Sent")
                    : t("calc.form.cta", "Get My Estimate")}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </form>
            </div>

            {/* ─── RIGHT ESTIMATE PANEL ──────────────── */}
            <div className="bg-gradient-to-br from-blue-50/40 via-white to-purple-50/40 p-6 sm:p-8 lg:col-span-4 lg:p-10">
              <div className="lg:sticky lg:top-24">
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-blue-700 shadow-sm">
                  <Calculator size={11} />
                  {t("calc.result.badge", "Estimated Budget")}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
                  {t("calc.result.title", "Your Project Estimate")}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {t("calc.result.sub", "Based on the details you provided")}
                </p>

                {/* Price */}
                <div className="my-6 rounded-2xl border border-blue-200/60 bg-white p-6 shadow-sm">
                  <p className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                    {formatPrice(estimate.low)}
                    <span className="mx-1.5 text-slate-400">–</span>
                    {formatPrice(estimate.high)}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    {t(
                      "calc.result.note",
                      "(May vary based on final requirements)"
                    )}
                  </p>
                </div>

                {/* Feature checklist */}
                <ul className="mb-6 space-y-3">
                  {[
                    "Professional development team",
                    "Clean, modern & responsive design",
                    "SEO friendly structure",
                    "Post-launch support",
                    "On-time delivery",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 flex-shrink-0 text-emerald-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <Link
                  href="/contact"
                  className="
                    group mb-3 flex w-full items-center justify-center gap-2
                    rounded-full bg-gradient-to-r from-blue-600 to-purple-600
                    px-6 py-3.5 text-sm font-semibold text-white
                    shadow-lg shadow-blue-600/25
                    transition-all duration-300
                    hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/35
                  "
                >
                  {t("calc.result.talk", "Talk to Our Experts")}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <button
                  type="button"
                  onClick={handleDownloadQuote}
                  className="
                    group flex w-full items-center justify-center gap-2
                    rounded-full border border-blue-300 bg-white
                    px-6 py-3.5 text-sm font-semibold text-blue-700
                    transition-all duration-300
                    hover:-translate-y-1 hover:bg-blue-50 hover:shadow-lg
                  "
                >
                  <Download size={15} />
                  {t("calc.result.download", "Download Detailed Quote")}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── WHY CHOOSE + TESTIMONIAL ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center"
        >
          {/* Left: Illustration */}
          <div className="relative lg:col-span-4">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="/why-choose-calc.png"
                alt="Zentrox Technologies development team at work"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          {/* Middle: Why Choose */}
          <div className="lg:col-span-5">
            <h3 className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
              {t("calc.why.title", "Why Choose Zentrox?")}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {t(
                "calc.why.sub",
                "We don't just build websites and apps, we build digital solutions that help your business grow."
              )}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { icon: ShieldCheck, label: "Transparent Pricing", color: "#2563eb" },
                { icon: Users, label: "Expert Team", color: "#7c3aed" },
                { icon: Zap, label: "On-Time Delivery", color: "#0891b2" },
                { icon: Heart, label: "Ongoing Support", color: "#ea580c" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `${item.color}12`,
                        color: item.color,
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <p className="text-xs font-semibold text-slate-800">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <Link
              href="/services"
              className="
                group mt-6 inline-flex items-center gap-2
                rounded-full bg-gradient-to-r from-blue-600 to-purple-600
                px-6 py-3 text-sm font-semibold text-white
                shadow-lg shadow-blue-600/25
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl
              "
            >
              {t("calc.why.cta", "Explore Our Services")}
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Right: Testimonial */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-slate-700">
                "The budget calculator was super helpful! It gave us a clear
                idea of the cost and timeline. The team was professional and
                delivered exactly what we needed."
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-xs font-bold text-white">
                  RS
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Rohit Sharma
                  </p>
                  <p className="text-xs text-slate-500">
                    Founder, The Tipsy Bar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

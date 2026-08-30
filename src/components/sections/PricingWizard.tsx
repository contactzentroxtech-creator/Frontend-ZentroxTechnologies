"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Search, PenTool, Code, Rocket } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/providers";

const STEPS = [
  {
    icon: Search,
    title: "Discover",
    desc: "Understand the business, objectives, users and requirements.",
    number: "01",
  },
  {
    icon: PenTool,
    title: "Plan",
    desc: "Define the product structure, technology, scope and priorities.",
    number: "02",
  },
  {
    icon: Code,
    title: "Build",
    desc: "Design and develop the solution with regular progress updates.",
    number: "03",
  },
  {
    icon: Rocket,
    title: "Launch & Improve",
    desc: "Deploy, test and continue improving based on real-world feedback.",
    number: "04",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const Icon = step.icon;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <div className="h-full rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:shadow-md">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <Icon size={20} />
        </div>
        <span className="mt-3 block text-xs font-medium text-amber-600">
          Step {step.number}
        </span>
        <h3 className="mt-1 text-base font-semibold text-slate-900">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function PricingWizard() {
  const { t } = useLang();

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-white px-4 py-16 sm:py-20 md:px-6 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <span className="text-xs font-medium uppercase tracking-wider text-amber-600">
            {t("pricing.badge")}
          </span>
          <h2
            id="process-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {t("pricing.title")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-500 sm:text-lg">
            {t("pricing.sub")}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-slate-800 hover:shadow-md"
          >
            {t("pricing.consultation")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

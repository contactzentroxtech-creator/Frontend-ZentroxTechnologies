"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Users,
  Award,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/providers";
import ScrollTilt from "@/components/ui/ScrollTilt";

const REASONS = [
  {
    icon: Shield,
    titleKey: "global.card1.title",
    descKey: "global.card1.desc",
    titleFB: "Business-Focused Solutions",
    descFB:
      "We don't build technology just for the sake of technology. Every solution is designed around a real business requirement.",
  },
  {
    icon: Award,
    titleKey: "global.card2.title",
    descKey: "global.card2.desc",
    titleFB: "Quality & Reliability",
    descFB:
      "Clean development practices, testing and attention to detail help us deliver dependable digital products.",
  },
  {
    icon: Users,
    titleKey: "global.card3.title",
    descKey: "global.card3.desc",
    titleFB: "Transparent Process",
    descFB:
      "From discovery to deployment, clients stay informed about progress, priorities and deliverables.",
  },
  {
    icon: Zap,
    titleKey: "global.why.title",
    descKey: "global.why.sub",
    titleFB: "Remote-First Delivery",
    descFB:
      "Work with a dedicated technology team from India while serving businesses across different markets.",
  },
];

function ReasonCard({
  reason,
  index,
}: {
  reason: (typeof REASONS)[number];
  index: number;
}) {
  const { t } = useLang();
  const Icon = reason.icon;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const title = t(reason.titleKey, reason.titleFB);
  const description = t(reason.descKey, reason.descFB);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <div className="h-full rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-blue-200/50 bg-blue-50/50 text-blue-600">
          <Icon size={20} />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUsSection() {
  const { t } = useLang();

  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className="bg-white px-4 py-16 sm:py-20 md:px-6 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <span className="text-xs font-medium uppercase tracking-wider text-blue-600">
            Why Zentrox
          </span>
          <h2
            id="why-choose-us-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {t("global.why.title")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-500 sm:text-lg">
            {t("global.why.sub")}
          </p>
        </div>

        {/* Grid with 3D Scroll Tilt */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, index) => (
            <ScrollTilt key={reason.titleFB} tiltIntensity={4} scaleRange={0.05}>
              <ReasonCard reason={reason} index={index} />
            </ScrollTilt>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-md"
          >
            {t("services.cta_title")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Users, Award, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/providers";
import ScrollTilt from "@/components/ui/ScrollTilt";

const REASONS = [
  {
    icon: Shield,
    titleKey: "global.card1.title",
    descKey: "global.card1.desc",
    titleFB: "Business-Focused Solutions",
    descFB: "We don't build technology just for the sake of technology. Every solution is designed around a real business requirement.",
  },
  {
    icon: Award,
    titleKey: "global.card2.title",
    descKey: "global.card2.desc",
    titleFB: "Quality & Reliability",
    descFB: "Clean development practices, testing and attention to detail help us deliver dependable digital products.",
  },
  {
    icon: Users,
    titleKey: "global.card3.title",
    descKey: "global.card3.desc",
    titleFB: "Transparent Process",
    descFB: "From discovery to deployment, clients stay informed about progress, priorities and deliverables.",
  },
  {
    icon: Zap,
    titleKey: "global.why.title",
    descKey: "global.why.sub",
    titleFB: "Remote-First Delivery",
    descFB: "Work with a dedicated technology team from India while serving businesses across different markets.",
  },
];

function ReasonCard({ reason, index }: { reason: (typeof REASONS)[number]; index: number }) {
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
      className="group h-full"
    >
      <div className="card-cream h-full p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-blue-200/50 bg-blue-50/50 text-blue-600">
          <Icon size={20} />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-800">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUsSection() {
  const { t } = useLang();

  return (
    <section id="why-choose-us" className="bg-[#FDF8F3] px-4 py-20 sm:py-24 md:px-6 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <span className="text-xs font-medium uppercase tracking-wider text-blue-600">
            Why Zentrox
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {t("global.why.title")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
            {t("global.why.sub")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, index) => (
            <ScrollTilt key={reason.titleFB} tiltIntensity={6} scaleRange={0.06}>
              <ReasonCard reason={reason} index={index} />
            </ScrollTilt>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/contact" className="btn-primary">
            {t("services.cta_title")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

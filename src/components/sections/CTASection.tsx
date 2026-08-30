"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { useLang } from "@/lib/providers";

export default function CTASection() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-slate-900 px-4 py-16 sm:py-20 md:px-6 md:py-24 lg:py-28"
      ref={ref}
    >
      {/* Background decorative */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-medium uppercase tracking-wider text-amber-400">
            {t("cta.badge")}
          </span>
          <h2
            id="cta-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {t("cta.title2")}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-medium text-slate-900 transition-all hover:bg-amber-400 hover:shadow-lg hover:-translate-y-0.5"
            >
              {t("cta.primary")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="mailto:contact.zentroxtech@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-all hover:border-white/60 hover:bg-white/10"
            >
              <Mail size={16} />
              Email Us
            </a>
            <a
              href="tel:+918988183513"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-all hover:border-white/60 hover:bg-white/10"
            >
              <Phone size={16} />
              Call Us
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
              MSME Registered
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
              Remote-First
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
              Innovation-Driven
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

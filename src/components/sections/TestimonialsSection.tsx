"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { useLang } from "@/lib/providers";

// SEO FIX: Updated testimonials to reflect targeted industries (E-commerce, Education, Startups, Healthcare, Real Estate) and core services.
const TESTIMONIALS = [
  {
    name: "Rajveer Singh",
    role: "Owner, E-commerce Business",
    initials: "RS",
    text: "Zentrox Technologies built our custom e-commerce platform in record time. Sales doubled within 3 months of launch. Exceptional remote-first team and attention to detail.",
  },
  {
    name: "Priya Kapoor",
    role: "Director, Education Institute",
    initials: "PK",
    text: "The custom CRM and management system they built saved us 20+ hours per week. The web application is beautiful, responsive, and incredibly easy to use.",
  },
  {
    name: "Arjun Sharma",
    role: "Founder, Tech Startup",
    initials: "AS",
    text: "From concept to launch in just weeks. Our startup's SaaS platform gets compliments from investors in every meeting. Absolutely world-class custom software development service.",
  },
  {
    name: "Mandeep Gill",
    role: "CEO, Retail Brand",
    initials: "MG",
    text: "Zentrox Technologies put us on page one with their data-driven SEO strategies. Real measurable results and increased organic traffic, not just promises. Highly recommended.",
  },
  {
    name: "Harman Bhatia",
    role: "Operations Manager, Healthcare",
    initials: "HB",
    text: "Their custom software development service transformed our workflows. The AI automation integration was a complete game-changer for our operational efficiency.",
  },
  {
    name: "Simran Kaur",
    role: "Entrepreneur, Real Estate",
    initials: "SK",
    text: "A truly reliable digital growth partner. They delivered our native Android application ahead of schedule with premium quality and a seamless user experience.",
  },
];

function TestimonialCard({
  t: testi,
  delay,
}: {
  t: (typeof TESTIMONIALS)[0];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="glass-card p-6 flex flex-col gap-4"
    >
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={13} className="text-z-gold fill-z-gold" />
        ))}
      </div>
      <p className="text-sm text-z-muted leading-relaxed flex-1">
        {testi.text}
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-z-border">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-z-accent to-z-accent2 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {testi.initials}
        </div>
        <div>
          <div className="text-sm font-semibold text-z-text">{testi.name}</div>
          <div className="text-xs text-z-muted">{testi.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const { t } = useLang();
  return (
    <section className="relative z-10 py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="z-badge mb-4">Client Stories</div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-z-text leading-tight tracking-tight mb-4">
            {/* SEO FIX: Updated to reflect global reach instead of just local Punjab */}
            {t(
              "testimonials.title",
              "Trusted by businesses across India, USA, UK, Canada, Australia, UAE & Singapore."
            )}
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((testi, i) => (
            <TestimonialCard key={testi.name} t={testi} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  const { t } = useLang();
  return (
    /* FIXED: Swapped out absolute dark class for a theme responsive background class */
    <section className="relative z-10 py-24 px-4 md:px-6 bg-white dark:bg-z-dark2 transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-z-accent opacity-[0.05] blur-[150px]" />
      </div>
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="z-badge mx-auto mb-6">
            {/* SEO FIX: Standardized CTA Badge */}
            {t("cta.badge", "Let's Build Something Great Together")}
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-z-text leading-tight tracking-tight mb-6">
            {/* SEO FIX: Applied document H2 tags */}
            {t("cta.title", "Ready to Build Something Great?")}
            <br />
            <span className="gradient-text">
              {t("cta.title2", "with Zentrox Technologies")}
            </span>
          </h2>
          <p className="text-base md:text-lg text-z-muted max-w-xl mx-auto leading-relaxed mb-10">
            {/* SEO FIX: Applied comprehensive services list from the final CTA section */}
            {t(
              "cta.sub",
              "Whether you need custom software, a mobile app, or a complete digital strategy — we are here to help. Get a free consultation and discover how Zentrox Technologies can transform your business."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* FIXED: Applied clean text styling that remains clear against blue buttons in both modes */}
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-blue-600 dark:bg-z-accent text-white font-semibold hover:bg-blue-500 transition-all duration-300 shadow-md hover:shadow-glow-accent"
            >
              {/* SEO FIX: Matched primary CTA button text */}
              {t("cta.primary", "Get a Free Consultation")}{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/about"
              className="flex items-center justify-center gap-2 px-10 py-4 rounded-full border border-z-border text-z-text font-semibold hover:border-z-accent hover:text-z-accent transition-all duration-300"
            >
              {/* SEO FIX: Changed from generic courses to standard 'View Our Work' */}
              {t("cta.secondary", "View Our Work")}
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-z-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-z-accent3" /> MSME
              Registered
            </span>
            <span className="flex items-center gap-1.5">
              {/* SEO FIX: Replaced duplicate free consultation with factual company age */}
              <span className="w-1.5 h-1.5 rounded-full bg-z-accent3" /> Founded
              2023
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-z-accent3" />{" "}
              Remote-First
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

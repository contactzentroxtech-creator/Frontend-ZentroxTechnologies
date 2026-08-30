"use client";

import { useState, useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Sparkles, CheckCircle2, Globe2, Rocket } from "lucide-react";
import { useLang } from "@/lib/providers";

const TESTIMONIALS = [
  {
    name: "Rajveer Singh",
    role: "E-commerce Business Owner",
    initials: "RS",
    text: "Zentrox Technologies helped us build a modern digital platform focused on performance, usability, and business growth. The team was responsive and professional throughout the project.",
  },
  {
    name: "Priya Kapoor",
    role: "Education Institute Director",
    initials: "PK",
    text: "The custom management solution improved our workflow and made daily operations easier to manage. The interface is clean, responsive, and simple for our team to use.",
  },
  {
    name: "Arjun Sharma",
    role: "Startup Founder",
    initials: "AS",
    text: "From the initial idea to development, the team provided valuable technical guidance. They understood our product requirements and helped us move forward with confidence.",
  },
  {
    name: "Mandeep Gill",
    role: "Retail Brand Owner",
    initials: "MG",
    text: "Their digital marketing and SEO support helped us improve our online presence. The team explained the process clearly and focused on practical strategies for long-term growth.",
  },
  {
    name: "Harman Bhatia",
    role: "Healthcare Operations Manager",
    initials: "HB",
    text: "The team understood our workflow challenges and proposed a practical software solution. The automation features helped simplify repetitive processes and improve efficiency.",
  },
  {
    name: "Simran Kaur",
    role: "Real Estate Entrepreneur",
    initials: "SK",
    text: "Professional communication, modern design, and a smooth development process. Zentrox Technologies delivered a solution aligned with our business requirements.",
  },
];

function TestimonialCard({
  testimonial,
  delay,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="glass-card p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-z-accent/30"
    >
      <div
        className="flex gap-0.5"
        aria-label="5 star testimonial rating"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className="text-z-gold fill-z-gold"
          />
        ))}
      </div>

      <p className="text-sm text-slate-600 dark:text-z-muted leading-relaxed flex-1">
        “{testimonial.text}”
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-z-border">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-z-accent to-z-accent2 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {testimonial.initials}
        </div>

        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900 dark:text-z-text truncate">
            {testimonial.name}
          </div>

          <div className="text-xs text-slate-500 dark:text-z-muted truncate">
            {testimonial.role}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function TestimonialsSection() {
  const { t } = useLang();

  return (
    <section
      id="testimonials"
      className="relative z-10 py-24 px-4 md:px-6 bg-white dark:bg-transparent transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <div className="z-badge mb-4">
            {t("testimonials.badge", "Client Stories")}
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-z-text leading-tight tracking-tight mb-4">
            {t(
              "testimonials.title",
              "Trusted by Businesses Building Their Digital Future"
            )}
          </h2>

          <p className="text-base md:text-lg text-slate-600 dark:text-z-muted leading-relaxed">
            {t(
              "testimonials.sub",
              "We work with startups, growing businesses, and organizations across multiple industries to build practical digital solutions designed for growth."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard
              key={`${testimonial.name}-${i}`}
              testimonial={testimonial}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CTA SECTION – Premium Redesign
========================================================= */

export function CTASection() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y });
  };

  // Floating decorative shapes – subtle ambient motion
  const floatingShapes = [
    { icon: Sparkles, color: "blue", top: "10%", left: "5%", delay: 0 },
    { icon: Globe2, color: "teal", bottom: "15%", right: "8%", delay: 2 },
    { icon: Rocket, color: "purple", top: "50%", left: "85%", delay: 4 },
  ];

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      className="
        relative z-10 overflow-hidden
        py-24 px-4 md:px-6
        bg-gradient-to-br from-slate-50 via-white to-blue-50/30
        dark:from-[#0b0f19] dark:via-[#111827] dark:to-blue-950/20
        transition-colors duration-500
      "
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* ===== Background Elements ===== */}

      {/* Main glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[800px] h-[800px] rounded-full
            bg-blue-500/10 dark:bg-blue-400/10
            blur-[160px]"
        />
        <div
          className="absolute top-0 right-0
            w-[500px] h-[500px] rounded-full
            bg-purple-500/8 dark:bg-purple-400/8
            blur-[140px]"
        />
        <div
          className="absolute bottom-0 left-0
            w-[500px] h-[500px] rounded-full
            bg-teal-500/8 dark:bg-teal-400/8
            blur-[140px]"
        />
      </div>

      {/* Floating decorative shapes */}
      {floatingShapes.map((shape, idx) => {
        const Icon = shape.icon;
        const colorMap = {
          blue: "text-blue-500/20 dark:text-blue-400/20",
          teal: "text-teal-500/20 dark:text-teal-400/20",
          purple: "text-purple-500/20 dark:text-purple-400/20",
        };
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovering ? 0.8 : 0.4,
              scale: isHovering ? 1.1 : 1,
              y: [0, -15, 0],
            }}
            transition={{
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: shape.delay },
              opacity: { duration: 0.6 },
              scale: { duration: 0.6 },
            }}
            className={`pointer-events-none absolute ${colorMap[shape.color as keyof typeof colorMap]}`}
            style={{
              top: shape.top,
              left: shape.left,
              bottom: shape.bottom,
              right: shape.right,
            }}
          >
            <Icon size={48} strokeWidth={1.5} />
          </motion.div>
        );
      })}

      {/* ===== Spotlight overlay ===== */}
      {isHovering && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(37,99,235,0.06), transparent 60%)`,
          }}
        />
      )}

      {/* ===== Content ===== */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/70 px-5 py-2 text-[11px] font-bold tracking-[0.1em] text-blue-700 backdrop-blur-sm dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-200"
          >
            <Sparkles size={13} />
            {t("cta.badge", "Let's Build Something Great Together")}
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-slate-900 dark:text-white"
          >
            {t("cta.title", "Ready to Build Something Great?")}
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-600 bg-clip-text text-transparent dark:from-blue-300 dark:via-indigo-300 dark:to-cyan-300">
              {t("cta.title2", "Let's Grow Your Business Together")}
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg"
          >
            {t(
              "cta.sub",
              "Whether you need a website, custom software, mobile application, SaaS platform, AI automation, SEO, or digital marketing services — our team is ready to help you build and grow."
            )}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="
                group inline-flex items-center justify-center gap-2
                px-8 py-4 rounded-full
                bg-gradient-to-r from-blue-600 to-blue-700
                text-sm font-bold text-white
                shadow-lg shadow-blue-600/25
                transition-all duration-300
                hover:-translate-y-1 hover:scale-105
                hover:shadow-xl hover:shadow-blue-600/35
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              "
            >
              {t("cta.primary", "Get a Free Consultation")}
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/services"
              className="
                group inline-flex items-center justify-center gap-2
                px-8 py-4 rounded-full
                border-2 border-slate-200/80
                bg-white/70 backdrop-blur-sm
                text-sm font-bold text-slate-700
                transition-all duration-300
                hover:-translate-y-1 hover:scale-105
                hover:border-blue-300 hover:bg-white hover:text-blue-600
                hover:shadow-lg
                dark:border-white/10 dark:bg-white/5
                dark:text-slate-200 dark:hover:border-blue-400/30
                dark:hover:bg-white/10 dark:hover:text-blue-300
              "
            >
              {t("cta.secondary", "Explore Our Services")}
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-slate-500 dark:text-slate-400"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-blue-500" />
              MSME Registered
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-blue-500" />
              Founded 2023
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-blue-500" />
              Remote-First Team
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-blue-500" />
              Global Delivery
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

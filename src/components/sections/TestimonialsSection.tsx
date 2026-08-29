"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
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

export function CTASection() {
  const { t } = useLang();

  return (
    <section
      className="relative z-10 py-24 px-4 md:px-6 bg-slate-50 dark:bg-z-dark2 transition-colors duration-300 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-z-accent opacity-[0.06] blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="z-badge mx-auto mb-6">
            {t(
              "cta.badge",
              "Let's Build Something Great Together"
            )}
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-z-text leading-tight tracking-tight mb-6">
            {t(
              "cta.title",
              "Ready to Build Something Great?"
            )}

            <br />

            <span className="gradient-text">
              {t(
                "cta.title2",
                "Let's Grow Your Business Together"
              )}
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-600 dark:text-z-muted max-w-2xl mx-auto leading-relaxed mb-10">
            {t(
              "cta.sub",
              "Whether you need a website, custom software, mobile application, SaaS platform, AI automation, SEO, or digital marketing services — our team is ready to help you build and grow."
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-z-accent text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {t(
                "cta.primary",
                "Get a Free Consultation"
              )}

              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <Link
              href="/services"
              className="flex items-center justify-center gap-2 px-10 py-4 rounded-full border border-slate-300 dark:border-z-border text-slate-900 dark:text-z-text font-semibold hover:border-z-accent hover:text-z-accent transition-all duration-300"
            >
              {t(
                "cta.secondary",
                "Explore Our Services"
              )}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-slate-500 dark:text-z-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-z-accent3" />
              MSME Registered
            </span>

            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-z-accent3" />
              Founded 2023
            </span>

            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-z-accent3" />
              Remote-First Team
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

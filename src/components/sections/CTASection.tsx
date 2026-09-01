"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="cta"
      className="bg-white px-4 py-16 sm:py-20 md:px-6 md:py-24 lg:py-28"
      ref={ref}
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <span className="inline-block text-xs font-medium uppercase tracking-wider text-blue-600">
            LET'S BUILD SOMETHING GREAT TOGETHER
          </span>

          {/* Heading */}
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl lg:text-5xl">
            Have a Digital Product in Mind?
          </h2>

          {/* Subtext */}
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Let's turn your idea into a practical digital solution.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5"
            >
              Start a Project
              <ArrowRight size={16} />
            </Link>

            <a
              href="mailto:contact.zentroxtech@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5"
            >
              <Mail size={16} />
              Email Us
            </a>

            <a
              href="tel:+918988183513"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5"
            >
              <Phone size={16} />
              Call Us
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
              MSME Registered
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
              Remote-First
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
              Innovation-Driven
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

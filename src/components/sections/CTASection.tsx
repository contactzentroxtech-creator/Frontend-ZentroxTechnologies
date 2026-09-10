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
      className="bg-[#FDF8F3] px-4 py-20 sm:py-24 md:px-6 md:py-28 lg:py-32"
      ref={ref}
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-medium uppercase tracking-wider text-blue-600">
            LET'S BUILD SOMETHING GREAT TOGETHER
          </span>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Have a Digital Product in Mind?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Let's turn your idea into a practical digital solution.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Start a Project
              <ArrowRight size={16} />
            </Link>
            <a href="mailto:contact.zentroxtech@gmail.com" className="btn-primary">
              <Mail size={16} />
              Email Us
            </a>
            <a href="tel:+918988183513" className="btn-primary">
              <Phone size={16} />
              Call Us
            </a>
          </div>

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

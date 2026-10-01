"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles, Mail, Phone } from "lucide-react";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918988183513";
  const whatsappMsg = encodeURIComponent(
    "Hi Zentrox Technologies, I'd like to discuss a project."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  return (
    <section
      id="cta"
      aria-label="Call to action"
      className="relative bg-white px-4 py-20 sm:py-24 md:px-6 md:py-28"
    >
      <div ref={ref} className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-6 py-16 text-center shadow-2xl shadow-slate-900/20 sm:px-12 sm:py-20 lg:px-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-[120px]" />
            <div className="absolute -right-20 -bottom-20 h-[400px] w-[400px] rounded-full bg-purple-600/20 blur-[120px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-blue-300 backdrop-blur-sm">
              <Sparkles size={12} />
              Get Started
            </div>

            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Have a Digital Product in Mind?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 lg:text-lg">
              Let's turn your idea into a practical digital solution.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-lg shadow-black/20 transition-all hover:-translate-y-1 hover:bg-blue-50 sm:w-auto"
              >
                Start a Project
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="mailto:contact.zentroxtech@gmail.com"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-white/40 hover:bg-white/10 sm:w-auto"
              >
                <Mail size={16} />

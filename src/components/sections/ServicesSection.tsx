"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Smartphone,
  Code2,
  Palette,
  BarChart3,
  Bot,
} from "lucide-react";

const SERVICES = [
  {
    id: "web",
    icon: Globe,
    color: "#2563eb",
    bg: "bg-blue-50",
    title: "Website Development",
    desc: "Modern, responsive and SEO-friendly websites that represent your brand perfectly.",
  },
  {
    id: "android",
    icon: Smartphone,
    color: "#7c3aed",
    bg: "bg-purple-50",
    title: "Mobile App Development",
    desc: "iOS & Android apps that users love, with smooth performance and reliable features.",
  },
  {
    id: "software",
    icon: Code2,
    color: "#0f766e",
    bg: "bg-emerald-50",
    title: "Custom Software Development",
    desc: "Tailored solutions for your unique business needs, built around your workflows.",
  },
  {
    id: "design",
    icon: Palette,
    color: "#0891b2",
    bg: "bg-cyan-50",
    title: "UI/UX Design",
    desc: "Beautiful designs. Better experiences. Stronger brand identity.",
  },
  {
    id: "seo",
    icon: BarChart3,
    color: "#ea580c",
    bg: "bg-orange-50",
    title: "SEO & Digital Marketing",
    desc: "More visibility. More customers. More growth through data-driven campaigns.",
  },
  {
    id: "ai",
    icon: Bot,
    color: "#4f46e5",
    bg: "bg-indigo-50",
    title: "AI Integration & Automation",
    desc: "Work smarter with AI-powered solutions and workflow automation.",
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="services"
      className="relative bg-white px-4 py-20 sm:py-24 md:px-6 md:py-28"
    >
      <div ref={ref} className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/60 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-blue-700">
              Our Services
            </div>
            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Everything Your Business Needs Under One Roof
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <p className="mb-5 text-base leading-relaxed text-slate-600">
              From idea to impact — we offer end-to-end digital solutions that help
              you build, grow and stay ahead.
            </p>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all hover:gap-3"
            >
              View All Services <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: Math.min(index * 0.08, 0.4),
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="group"
              >
                <Link
                  href={`/services#${service.id}`}
                  className="block h-full"
                  aria-label={`Learn more about ${service.title}`}
                >
                  <div className="relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                    <div
                      className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${service.bg} transition-transform group-hover:scale-110`}
                    >
                      <Icon size={22} style={{ color: service.color }} />
                    </div>

                    <h3 className="text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-600">
                      {service.title}
                    </h3>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                      {service.desc}
                    </p>

                    <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-all group-hover:gap-3">
                      Learn More
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-slate-200/70 bg-gradient-to-r from-blue-50/60 via-white to-purple-50/60 p-8 sm:p-10 md:flex-row md:gap-10">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Have a Project in Mind?
              </h3>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Let's discuss your ideas and turn them into a powerful digital solution.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-1 hover:bg-blue-700"
            >
              Get a Free Quote
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

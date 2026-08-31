"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/providers";
import ScrollTilt from "@/components/ui/ScrollTilt";

const LOCATIONS = ["Mohali", "Chandigarh", "Punjab", "Haryana", "Himachal Pradesh", "Delhi NCR", "India", "USA", "UK", "Canada", "Australia", "Worldwide"];
const INDUSTRIES = ["Startups", "Healthcare", "Real Estate", "E-commerce", "Education", "Manufacturing", "Professional Services", "Growing Businesses"];

export default function LocalSection() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const marqueeItems = [...LOCATIONS, ...INDUSTRIES];
  const loopItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section id="industries" className="bg-slate-50/70 px-4 py-16 sm:py-20 md:px-6 md:py-24 lg:py-28">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-blue-600">{t("global.badge")}</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl">{t("global.title")}</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{t("global.sub")}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {INDUSTRIES.map((industry) => (
            <ScrollTilt key={industry} tiltIntensity={4} scaleRange={0.05}>
              <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
                {industry}
              </div>
            </ScrollTilt>
          ))}
        </div>
        <div className="relative mt-10 overflow-hidden rounded-xl border border-gray-200 bg-white py-4 shadow-sm">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />
          <motion.div
            className="flex w-max gap-6 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {loopItems.map((item, index) => (
              <span key={`${item}-${index}`} className="whitespace-nowrap text-sm font-medium text-slate-600">
                {item}
              </span>
            ))}
          </motion.div>
        </div>
        <p className="mt-6 text-center text-sm text-slate-600">
          We work with businesses across India and international markets, delivering solutions that are practical, reliable and built to last.
        </p>
      </div>
    </section>
  );
}

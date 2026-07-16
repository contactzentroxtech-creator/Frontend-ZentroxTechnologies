"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Zap, Activity, Sparkles } from "lucide-react";
import { useLang } from "@/lib/providers";

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { t, lang } = useLang();

  // Updated to match the specific services mentioned in the document's H2
  const heroWords = t(
    "hero.words",
    "Custom Software|Web Applications|Mobile Apps|Digital Growth"
  )
    .split("|")
    .filter(Boolean);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % heroWords.length);
        setWordVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, [heroWords.length]);

  useEffect(() => {
    setWordIdx(0);
    setWordVisible(true);
  }, [lang]);

  const hoverTransition = {
    type: "spring",
    stiffness: 70,
    damping: 18,
    mass: 1.4,
  };

  return (
    <section
      aria-label="Hero Introduction"
      className="relative w-full flex flex-col items-center justify-start pt-32 pb-24 px-4 md:px-6 text-center overflow-hidden"
    >
      {/* ── Ambient Backdrop Blurs ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.3, ease: "easeOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-z-accent blur-[160px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
          className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-z-accent2 blur-[140px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.7, ease: "easeOut" }}
          className="absolute bottom-1/8 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-z-accent3 blur-[120px]"
        />

        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2/3"
          style={{
            background:
              "linear-gradient(180deg, rgba(59,123,255,0.55) 0%, rgba(59,123,255,0.08) 60%, transparent 100%)",
          }}
        />

        {isMounted &&
          [
            { x: "10%", y: "15%", size: 2 },
            { x: "90%", y: "20%", size: 1.5 },
            { x: "80%", y: "70%", size: 2.5 },
            { x: "15%", y: "75%", size: 1.5 },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-z-accent opacity-40 animate-pulse"
              style={{
                left: p.x,
                top: p.y,
                width: p.size * 2,
                height: p.size * 2,
              }}
            />
          ))}
      </div>

      {/* ── Hero Copy ── */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-5xl z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-badge mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-z-accent3" />
          {t("hero.badge", "Zentrox Technologies")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.02] tracking-tight mb-6 max-w-5xl"
        >
          {/* Updated Line 1 */}
          <span className="block text-z-text">
            {t("hero.line1", "Build Better, Grow Faster")}
          </span>
          <span
            className="block gradient-text"
            style={{
              opacity: wordVisible ? 1 : 0,
              minHeight: "1.1em",
              transition: "opacity 0.3s ease",
            }}
          >
            {heroWords[wordIdx] || heroWords[0]}
          </span>
          {/* Updated Line 2 */}
          <span className="block text-z-text mt-2 text-4xl md:text-6xl lg:text-7xl">
            {t("hero.line2", "— With Zentrox Technologies")}
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base md:text-lg text-z-muted max-w-3xl leading-relaxed mb-8 font-normal"
        >
          {/* Updated H2 */}
          {t(
            "Custom software, web applications, mobile apps, and digital growth solutions for Indian and international businesses. Remote-first, premium quality, delivered worldwide from Mohali, India."
          )}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <Link
            href="/contact"
            title="Start Your Project"
            className="relative group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#3b7bff] text-white font-semibold text-sm hover:bg-blue-500 transition-all duration-100 z-20"
          >
            {/* Updated CTA 1 */}
            {t("hero.cta_primary", "Start Your Project")}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/about"
            title="View Our Work"
            className=" relative group flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-z-border text-z-text font-semibold text-sm hover:border-z-accent hover:text-z-accent transition-all duration-300 z-20"
          >
            <Play
              size={14}
              className="group-hover:text-z-accent transition-colors"
              aria-hidden="true"
            />
            {/* Updated CTA 2 */}
            {t("View Our Work")}
          </Link>
        </motion.div>

        {/* Added Trust Line directly below buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-14 z-20 mt-8"
        >
          <p className="text-sm text-z-muted font-medium">
            {t(
              "hero.trust",
              "Trusted by businesses across India, USA, UK, Canada, Australia, UAE & Singapore. Founded in 2023."
            )}
          </p>
        </motion.div>

        {/* ── Interactive Showcase Canvas ── */}
        <div
          className="relative w-full max-w-5xl h-[340px] mx-auto z-20"
          aria-hidden="true"
        >
          {/* Card 1: Code Window */}
          <motion.div
            initial={{ opacity: 0, x: -60, y: 20, rotate: -4 }}
            animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
            whileHover={{ scale: 1.08, rotate: -1, zIndex: 50 }}
            transition={{
              opacity: { duration: 0.8, delay: 0.5 },
              x: { duration: 0.8, delay: 0.5 },
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
              scale: hoverTransition,
              rotate: hoverTransition,
            }}
            className="absolute left-[2%] top-[5%] w-68 md:w-76 glass-card p-4 shadow-2xl text-left pointer-events-auto cursor-pointer group"
          >
            <div className="absolute inset-0 bg-z-accent opacity-0 group-hover:opacity-25 blur-[45px] transition-opacity duration-500 rounded-2xl -z-10" />
            <div className="flex gap-1.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
              <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
              <span className="w-2 h-2 rounded-full bg-[#28c840]" />
            </div>
            <div className="font-mono text-[11px] leading-relaxed text-left opacity-90">
              <div>
                <span className="code-kw">const</span> project ={" "}
                <span className="code-fn">initZentrox</span>
                {"({"}
              </div>
              <div>
                &nbsp;&nbsp;
                <span className="code-str">&quot;solution&quot;</span>:{" "}
                <span className="code-str">
                  &quot;Software Development&quot;
                </span>
                ,
              </div>
              <div>
                &nbsp;&nbsp;
                <span className="code-str">&quot;platform&quot;</span>: [
                <span className="code-str">&quot;SaaS&quot;</span>]
              </div>
              <div>{"}"});</div>
            </div>
          </motion.div>

          {/* Card 2: Dashboard Metric */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: -10, rotate: 3 }}
            animate={{ opacity: 1, x: 0, y: [0, 14, 0] }}
            whileHover={{ scale: 1.08, rotate: 1, zIndex: 50 }}
            transition={{
              opacity: { duration: 0.8, delay: 0.6 },
              x: { duration: 0.8, delay: 0.6 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              scale: hoverTransition,
              rotate: hoverTransition,
            }}
            className="absolute right-[2%] top-0 w-60 md:w-68 glass-card p-4 shadow-2xl pointer-events-auto cursor-pointer group"
          >
            <div className="absolute inset-0 bg-z-accent3 opacity-0 group-hover:opacity-25 blur-[45px] transition-opacity duration-500 rounded-2xl -z-10" />
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] text-z-muted uppercase tracking-widest">
                Traffic Growth
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-z-accent3/15 text-z-accent3">
                SEO
              </span>
            </div>
            <div className="text-xl font-bold text-z-text mb-3 text-left">
              +140%
            </div>
            <div className="flex items-end gap-1 h-12">
              {[40, 65, 50, 85, 70, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${h}%`,
                    background:
                      i === 5 ? "var(--z-accent3)" : "var(--z-accent)",
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Card 3: Service Profile */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: 1 }}
            animate={{ opacity: 1, y: [0, -10, 0] }}
            whileHover={{ scale: 1.08, rotate: -1, zIndex: 50 }}
            transition={{
              opacity: { duration: 0.8, delay: 0.7 },
              y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
              scale: hoverTransition,
              rotate: hoverTransition,
            }}
            className="absolute left-[33%] bottom-4 w-56 md:w-64 glass-card p-4 shadow-2xl text-left pointer-events-auto cursor-pointer group"
          >
            <div className="absolute inset-0 bg-z-accent2 opacity-0 group-hover:opacity-30 blur-[45px] transition-opacity duration-500 rounded-2xl -z-10" />
            <div className="w-8 h-8 rounded-lg bg-z-accent2/15 border border-z-accent2/30 flex items-center justify-center mb-3">
              <Zap size={16} className="text-z-accent2" />
            </div>
            <div className="text-sm font-semibold text-z-text mb-1">
              Mobile App Dev
            </div>
            <div className="text-[11px] text-z-muted leading-relaxed">
              High-performance Android & iOS applications.
            </div>
          </motion.div>

          {/* Card 4: System Performance Check */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 80, rotate: -6 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
            transition={{
              opacity: { duration: 0.8, delay: 0.8 },
              y: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
              scale: hoverTransition,
              rotate: hoverTransition,
            }}
            className="absolute left-[5%] bottom-6 w-44 md:w-52 glass-card p-3 shadow-xl text-left pointer-events-auto cursor-pointer group"
          >
            <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-25 blur-[40px] transition-opacity duration-500 rounded-2xl -z-10" />
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] mb-1.5">
              <Activity size={12} className="animate-pulse" />
              <span>RANKING #1</span>
            </div>
            <div className="text-xs font-medium text-z-text">
              Best SEO Company
            </div>
            <div className="text-[10px] text-z-muted mt-0.5">
              Data-driven organic growth.
            </div>
          </motion.div>

          {/* Card 5: AI Status Flag */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 100, rotate: 5 }}
            animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
            transition={{
              opacity: { duration: 0.8, delay: 0.9 },
              y: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
              scale: hoverTransition,
              rotate: hoverTransition,
            }}
            className="absolute right-[6%] bottom-[12%] w-48 md:w-56 glass-card p-3.5 shadow-xl text-left pointer-events-auto cursor-pointer group"
          >
            <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-30 blur-[45px] transition-opacity duration-500 rounded-2xl -z-10" />
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                <span className="text-[10px] font-semibold text-purple-400 tracking-wider">
                  SMART TECH
                </span>
              </div>
              <Sparkles size={12} className="text-purple-400" />
            </div>
            <div className="text-xs font-semibold text-z-text">
              AI Integration
            </div>
            <div className="text-[10px] text-z-muted mt-0.5">
              Automating workflows securely.
            </div>
          </motion.div>

          {/* Core Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
            whileHover={{
              scale: 1.14,
              filter: "drop-shadow(0px 0px 35px rgba(59,123,255,0.75))",
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.4 },
              scale: { duration: 0.8, delay: 0.4 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute bottom-4 right-[36%] w-26 md:w-34 pointer-events-auto cursor-pointer"
          >
            <svg
              viewBox="0 0 120 180"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full drop-shadow-[0_0_15px_rgba(59,123,255,0.3)]"
            >
              <ellipse
                cx="60"
                cy="172"
                rx="34"
                ry="6"
                fill="rgba(59,123,255,0.18)"
              />
              <rect
                x="32"
                y="80"
                width="56"
                height="68"
                rx="20"
                fill="#0d1220"
                stroke="rgba(59,123,255,0.45)"
                strokeWidth="1.5"
              />
              <rect
                x="33"
                y="28"
                width="54"
                height="54"
                rx="20"
                fill="#0d1220"
                stroke="rgba(59,123,255,0.45)"
                strokeWidth="1.5"
              />
              <ellipse
                cx="46"
                cy="52"
                rx="4"
                ry="5"
                fill="#3b7bff"
                opacity="0.9"
              />
              <ellipse
                cx="74"
                cy="52"
                rx="4"
                ry="5"
                fill="#3b7bff"
                opacity="0.9"
              />
              <circle cx="47" cy="51" r="1.5" fill="#fff" />
              <circle cx="75" cy="51" r="1.5" fill="#fff" />
              <path
                d="M50 64 Q60 70 70 64"
                fill="none"
                stroke="rgba(59,123,255,0.6)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

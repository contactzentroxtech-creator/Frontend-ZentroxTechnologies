"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Award } from "lucide-react";
import { useLang } from "@/lib/providers";
import { MouseEvent, useState, useEffect } from "react";

// Individual Card Component with clean client-side protection for spotlight animations
function Card({ card, index }: { card: any; index: number }) {
  const Icon = card.icon;
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    setCoords({
      x: clientX - left,
      y: clientY - top,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.21, 1.02, 0.43, 1.01],
      }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#080c15]/80 backdrop-blur-md p-8 shadow-sm dark:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-slate-300 dark:hover:border-gray-700"
    >
      {/* Interactive Spotlight Glow Effect */}
      {isMounted && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
          style={{
            background: `radial-gradient(450px circle at ${coords.x}px ${coords.y}px, ${card.color}15, transparent 80%)`,
          }}
        />
      )}

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
        style={{
          background: `${card.color}18`,
          border: `1px solid ${card.color}40`,
        }}
      >
        <Icon size={24} style={{ color: card.color }} />
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
        {card.title}
      </h3>

      <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
        {card.desc}
      </p>
    </motion.div>
  );
}

export default function LocalSection() {
  const { t, lang } = useLang();

  // SEO FIX: Updated target locations to match the documented service areas
  const CITIES_EN = [
    "Mohali",
    "Chandigarh",
    "Punjab",
    "Himachal Pradesh",
    "Delhi NCR",
    "India",
    "United States",
    "United Kingdom",
    "Australia",
  ];
  const CITIES_HI = [
    "मोहाली",
    "चंडीगढ़",
    "पंजाब",
    "हिमाचल प्रदेश",
    "दिल्ली एनसीआर",
    "भारत",
    "संयुक्त राज्य",
    "यूनाइटेड किंगडम",
    "ऑस्ट्रेलिया",
  ];
  const CITIES_PA = [
    "ਮੋਹਾਲੀ",
    "ਚੰਡੀਗੜ੍ਹ",
    "ਪੰਜਾਬ",
    "ਹਿਮਾਚਲ ਪ੍ਰਦੇਸ਼",
    "ਦਿੱਲੀ ਐਨਸੀਆਰ",
    "ਭਾਰਤ",
    "ਸੰਯੁਕਤ ਰਾਜ",
    "ਯੂਨਾਈਟਿਡ ਕਿੰਗਡਮ",
    "ਆਸਟ੍ਰੇਲੀਆ",
  ];

  // SEO FIX: Updated business types to match the documented industries served
  const BIZ_EN = [
    "Healthcare",
    "Real Estate",
    "Education",
    "Startups",
    "Manufacturing",
    "E-commerce",
  ];
  const BIZ_HI = [
    "स्वास्थ्य सेवा",
    "रियल एस्टेट",
    "शिक्षा",
    "स्टार्टअप",
    "विनिर्माण",
    "ई-कॉमर्स",
  ];
  const BIZ_PA = [
    "ਸਿਹਤ ਸੰਭਾਲ",
    "ਰੀਅਲ ਅਸਟੇਟ",
    "ਸਿੱਖਿਆ",
    "ਸਟਾਰਟਅੱਪ",
    "ਨਿਰਮਾਣ",
    "ਈ-ਕਾਮਰਸ",
  ];

  const cities =
    lang === "hi" ? CITIES_HI : lang === "pa" ? CITIES_PA : CITIES_EN;
  const bizTypes = lang === "hi" ? BIZ_HI : lang === "pa" ? BIZ_PA : BIZ_EN;

  const marqueeItems = [...cities, ...bizTypes];
  const doubledMarqueeItems = [...marqueeItems, ...marqueeItems];

  // SEO FIX: Replaced generic card content with core high-intent commercial services
  const LOCAL_CARDS = [
    {
      icon: Users,
      color: "#3b7bff",
      title: t("local.card1.title", "Professional Website Development"),
      desc: t(
        "local.card1.desc",
        "Responsive, fast, and scalable websites tailored to represent your brand and convert visitors into customers."
      ),
    },
    {
      icon: BookOpen,
      color: "#7c3aed",
      title: t("local.card2.title", "Custom Software & Mobile Apps"),
      desc: t(
        "local.card2.desc",
        "Tailored enterprise software, robust SaaS platforms, and native Mobile Application services that improve efficiency."
      ),
    },
    {
      icon: Award,
      color: "#06d6a0",
      title: t("local.card3.title", "SEO & Digital Marketing Services"),
      desc: t(
        "local.card3.desc",
        "Data-driven SEO strategies and comprehensive Digital Marketing Services campaigns to increase online visibility and generate leads."
      ),
    },
  ];

  return (
    <section className="relative z-10 pt-16 pb-24 px-4 md:px-6 bg-white dark:bg-[#04050a] text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
      {/* Decorative ambient background shapes adjusting opacities elegantly */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-14 text-center md:text-left flex flex-col items-center md:items-start"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 cursor-default"
          >
            {/* SEO FIX: Replaced 'Serving Punjab' with remote-first positioning */}
            {t("local.badge", "Remote-First Excellence")}
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-5 max-w-2xl">
            {/* SEO FIX: Uses Location H2 Strategy */}
            {t(
              "local.title",
              "Your Digital Growth Partner in Mohali, Chandigarh & Beyond"
            )}
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 max-w-xl leading-relaxed">
            {/* SEO FIX: Updated to match company positioning */}
            {t(
              "local.sub",
              "Operating as a remote-first company from Mohali, we deliver premium software development service and Digital Marketing Services solutions for businesses in India and worldwide."
            )}
          </p>
        </motion.div>
      </div>

      {/* Infinite Rectangular Moving Marquee */}
      <div className="w-full overflow-hidden relative mb-16 py-2">
        {/* Soft fading edges syncing seamlessly with both light and dark themes */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white dark:from-[#04050a] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white dark:from-[#04050a] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4 w-max px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
        >
          {doubledMarqueeItems.map((item, i) => (
            <motion.div
              key={`${item}-${i}`}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#080c15] text-sm font-semibold text-slate-700 dark:text-gray-300 shadow-sm hover:border-blue-500 dark:hover:border-blue-500 transition-colors duration-200 cursor-default whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(59,123,255,0.5)]" />
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Cards Grid Section */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LOCAL_CARDS.map((card, i) => (
            <Card key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

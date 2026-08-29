"use client";

import { MouseEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  Globe2,
  MapPin,
  BriefcaseBusiness,
  Code2,
  Rocket,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

import { useLang } from "@/lib/providers";

type Language = "en" | "hi" | "pa";

type CardData = {
  icon: typeof Globe2;
  color: string;
  title: string;
  desc: string;
  cta: string;
};

/* =========================================================
   GROWTH CARD
========================================================= */

function GrowthCard({
  card,
  index,
}: {
  card: CardData;
  index: number;
}) {
  const Icon = card.icon;

  const [coords, setCoords] = useState({
    x: 50,
    y: 50,
  });

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent<HTMLDivElement>) {
    const rect = currentTarget.getBoundingClientRect();

    setCoords({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: "-40px",
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
      }}
      onMouseMove={handleMouseMove}
      className="
        group relative overflow-hidden
        rounded-3xl
        border border-slate-200/80
        bg-white
        p-6
        shadow-[0_10px_35px_rgba(15,23,42,0.06)]
        transition-all duration-500

        hover:border-slate-300
        hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]

        dark:border-white/10
        dark:bg-white/[0.045]
        dark:hover:bg-white/[0.07]

        md:p-7
      "
    >
      {/* Dynamic Mouse Spotlight */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
        "
        style={{
          background: `radial-gradient(
            350px circle at ${coords.x}px ${coords.y}px,
            ${card.color}18,
            transparent 65%
          )`,
        }}
      />

      {/* Top Accent */}
      <div
        className="
          absolute left-0 top-0
          h-1 w-0
          transition-all duration-500
          group-hover:w-full
        "
        style={{
          backgroundColor: card.color,
        }}
      />

      {/* Icon */}
      <div
        className="
          relative z-10
          mb-6
          flex h-12 w-12
          items-center justify-center
          rounded-2xl
          border
          transition-transform duration-300
          group-hover:scale-110
          group-hover:rotate-3
        "
        style={{
          backgroundColor: `${card.color}12`,
          borderColor: `${card.color}28`,
        }}
      >
        <Icon
          size={22}
          style={{
            color: card.color,
          }}
        />
      </div>

      {/* Title */}
      <h3
        className="
          relative z-10
          text-xl font-bold
          tracking-tight
          text-slate-900
          dark:text-z-text
        "
      >
        {card.title}
      </h3>

      {/* Description */}
      <p
        className="
          relative z-10
          mt-3
          text-sm
          leading-relaxed
          text-slate-600
          dark:text-z-muted
        "
      >
        {card.desc}
      </p>

      {/* CTA */}
      <div
        className="
          relative z-10
          mt-6
          flex items-center gap-2
          text-sm font-semibold
        "
        style={{
          color: card.color,
        }}
      >
        <span>{card.cta}</span>

        <ArrowUpRight
          size={16}
          className="
            transition-transform duration-300
            group-hover:-translate-y-1
            group-hover:translate-x-1
          "
        />
      </div>
    </motion.article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function LocalSection() {
  const { t, lang } = useLang();

  const currentLang = lang as Language;

  /* =======================================================
     LOCATIONS
  ======================================================= */

  const LOCATIONS_EN = [
    "Mohali",
    "Chandigarh",
    "Punjab",
    "Haryana",
    "Himachal Pradesh",
    "Delhi NCR",
    "India",
    "United States",
    "United Kingdom",
    "Australia",
    "Canada",
    "Worldwide",
  ];

  const LOCATIONS_HI = [
    "मोहाली",
    "चंडीगढ़",
    "पंजाब",
    "हरियाणा",
    "हिमाचल प्रदेश",
    "दिल्ली एनसीआर",
    "भारत",
    "संयुक्त राज्य",
    "यूनाइटेड किंगडम",
    "ऑस्ट्रेलिया",
    "कनाडा",
    "विश्वभर",
  ];

  const LOCATIONS_PA = [
    "ਮੋਹਾਲੀ",
    "ਚੰਡੀਗੜ੍ਹ",
    "ਪੰਜਾਬ",
    "ਹਰਿਆਣਾ",
    "ਹਿਮਾਚਲ ਪ੍ਰਦੇਸ਼",
    "ਦਿੱਲੀ ਐਨਸੀਆਰ",
    "ਭਾਰਤ",
    "ਸੰਯੁਕਤ ਰਾਜ",
    "ਯੂਨਾਈਟਿਡ ਕਿੰਗਡਮ",
    "ਆਸਟ੍ਰੇਲੀਆ",
    "ਕੈਨੇਡਾ",
    "ਦੁਨੀਆ ਭਰ",
  ];

  /* =======================================================
     INDUSTRIES
  ======================================================= */

  const INDUSTRIES_EN = [
    "Startups",
    "Healthcare",
    "Real Estate",
    "E-commerce",
    "Education",
    "Manufacturing",
    "Professional Services",
    "Growing Businesses",
  ];

  const INDUSTRIES_HI = [
    "स्टार्टअप",
    "स्वास्थ्य सेवा",
    "रियल एस्टेट",
    "ई-कॉमर्स",
    "शिक्षा",
    "विनिर्माण",
    "प्रोफेशनल सर्विसेज",
    "बढ़ते व्यवसाय",
  ];

  const INDUSTRIES_PA = [
    "ਸਟਾਰਟਅੱਪ",
    "ਸਿਹਤ ਸੰਭਾਲ",
    "ਰੀਅਲ ਅਸਟੇਟ",
    "ਈ-ਕਾਮਰਸ",
    "ਸਿੱਖਿਆ",
    "ਨਿਰਮਾਣ",
    "ਪ੍ਰੋਫੈਸ਼ਨਲ ਸਰਵਿਸਿਜ਼",
    "ਵਧ ਰਹੇ ਬਿਜ਼ਨਸ",
  ];

  /* =======================================================
     LANGUAGE DATA
  ======================================================= */

  const locations =
    currentLang === "hi"
      ? LOCATIONS_HI
      : currentLang === "pa"
        ? LOCATIONS_PA
        : LOCATIONS_EN;

  const industries =
    currentLang === "hi"
      ? INDUSTRIES_HI
      : currentLang === "pa"
        ? INDUSTRIES_PA
        : INDUSTRIES_EN;

  const marqueeItems = [
    ...locations,
    ...industries,
  ];

  const loopItems = [
    ...marqueeItems,
    ...marqueeItems,
  ];

  /* =======================================================
     CARDS
  ======================================================= */

  const cards: CardData[] = [
    {
      icon: Globe2,
      color: "#2563eb",

      title: t(
        "global.card1.title",
        "India & Global Digital Delivery"
      ),

      desc: t(
        "global.card1.desc",
        "From businesses across India to international companies, we build scalable digital solutions designed for modern markets and long-term growth."
      ),

      cta: t(
        "global.card1.cta",
        "Built for modern businesses"
      ),
    },

    {
      icon: Code2,
      color: "#7c3aed",

      title: t(
        "global.card2.title",
        "Custom Technology Solutions"
      ),

      desc: t(
        "global.card2.desc",
        "Websites, custom software, mobile apps, SaaS platforms and AI-powered workflows tailored around your exact business requirements."
      ),

      cta: t(
        "global.card2.cta",
        "Built around your goals"
      ),
    },

    {
      icon: Rocket,
      color: "#ea580c",

      title: t(
        "global.card3.title",
        "Affordable Growth-Focused Services"
      ),

      desc: t(
        "global.card3.desc",
        "Professional technology and digital marketing services designed to deliver strong value, better visibility and more opportunities for growing businesses."
      ),

      cta: t(
        "global.card3.cta",
        "Designed for growth"
      ),
    },
  ];

  /* =======================================================
     TRUST ITEMS
  ======================================================= */

  const trustItems = [
    {
      icon: MapPin,
      text: t(
        "global.trust.location",
        "India & Worldwide"
      ),
    },

    {
      icon: BriefcaseBusiness,
      text: t(
        "global.trust.business",
        "Business-Focused"
      ),
    },

    {
      icon: ShieldCheck,
      text: t(
        "global.trust.delivery",
        "Reliable Delivery"
      ),
    },
  ];

  return (
    <section
      aria-label="Zentrox Technologies global digital services"
      className="
        relative overflow-hidden
        px-4 py-20
        md:px-6 md:py-28
      "
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="
            absolute -left-32 top-1/4
            h-96 w-96
            rounded-full
            bg-blue-500/[0.05]
            blur-[130px]
          "
        />

        <div
          className="
            absolute -right-32 bottom-1/4
            h-96 w-96
            rounded-full
            bg-orange-400/[0.05]
            blur-[130px]
          "
        />
      </div>

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto mb-14
            max-w-3xl
            text-center
          "
        >
          <div className="z-badge mx-auto mb-5 w-fit">
            <Globe2 size={14} />

            <span>
              {t(
                "global.badge",
                "India to Worldwide Digital Delivery"
              )}
            </span>
          </div>

          <h2
            className="
              text-4xl
              font-extrabold
              tracking-tight
              text-slate-900
              md:text-6xl
              dark:text-z-text
            "
          >
            {t(
              "global.title",
              "Built in India. Designed for Businesses Everywhere."
            )}
          </h2>

          <p
            className="
              mx-auto mt-6
              max-w-2xl
              text-base
              leading-relaxed
              text-slate-600
              md:text-lg
              dark:text-z-muted
            "
          >
            {t(
              "global.sub",
              "Zentrox Technologies helps startups and established businesses across Mohali, Chandigarh, Punjab, Haryana, Himachal Pradesh, India and worldwide build stronger digital products and grow online."
            )}
          </p>

          {/* Trust Indicators */}

          <div
            className="
              mt-8
              flex flex-wrap
              justify-center
              gap-3
            "
          >
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.text}
                  className="
                    flex items-center gap-2
                    rounded-full
                    border border-slate-200
                    bg-white
                    px-4 py-2
                    text-xs font-semibold
                    text-slate-600
                    shadow-sm

                    dark:border-white/10
                    dark:bg-white/[0.04]
                    dark:text-z-muted
                  "
                >
                  <Icon
                    size={14}
                    className="text-blue-600"
                  />

                  {item.text}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ===================================================
          MARQUEE
      =================================================== */}

      <div
        className="
          relative mb-16
          w-full overflow-hidden
        "
      >
        {/* Left Fade */}

        <div
          className="
            pointer-events-none
            absolute left-0 top-0
            z-10 h-full w-16

            bg-gradient-to-r
            from-white
            to-transparent

            dark:from-[#0b0f19]

            md:w-40
          "
        />

        {/* Right Fade */}

        <div
          className="
            pointer-events-none
            absolute right-0 top-0
            z-10 h-full w-16

            bg-gradient-to-l
            from-white
            to-transparent

            dark:from-[#0b0f19]

            md:w-40
          "
        />

        <motion.div
          className="
            flex w-max
            gap-4
            px-4
          "
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 38,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {loopItems.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="
                flex items-center gap-2.5
                whitespace-nowrap
                rounded-2xl
                border border-slate-200
                bg-white
                px-5 py-3
                text-sm font-semibold
                text-slate-700
                shadow-sm

                dark:border-white/10
                dark:bg-white/[0.045]
                dark:text-z-muted
              "
            >
              <span className="h-2 w-2 rounded-full bg-blue-500" />

              {item}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ===================================================
          GROWTH CARDS
      =================================================== */}

      <div
        className="
          relative mx-auto
          max-w-7xl
        "
      >
        <div
          className="
            grid grid-cols-1
            gap-5
            md:grid-cols-3
          "
        >
          {cards.map((card, index) => (
            <GrowthCard
              key={`${card.title}-${index}`}
              card={card}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

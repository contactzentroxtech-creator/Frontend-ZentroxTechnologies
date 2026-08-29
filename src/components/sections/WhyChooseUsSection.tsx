"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Headphones,
  IndianRupee,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { useLang } from "@/lib/providers";

/* =========================================================
   WHY CHOOSE US DATA
========================================================= */

const REASONS = [
  {
    icon: Lightbulb,
    titleKey: "why.idea.title",
    descKey: "why.idea.desc",
    titleFB: "Solutions Built Around Your Business",
    descFB:
      "We take time to understand your goals, challenges, audience, and requirements before building the right digital solution.",
    iconClass:
      "bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300",
  },
  {
    icon: IndianRupee,
    titleKey: "why.value.title",
    descKey: "why.value.desc",
    titleFB: "Professional Quality, Practical Value",
    descFB:
      "Get modern technology, thoughtful design, and growth-focused digital services with solutions designed to deliver strong value for your investment.",
    iconClass:
      "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300",
  },
  {
    icon: Rocket,
    titleKey: "why.growth.title",
    descKey: "why.growth.desc",
    titleFB: "Built for Growth and Scalability",
    descFB:
      "From your first launch to future expansion, we build flexible digital foundations that can evolve with your business.",
    iconClass:
      "bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-300",
  },
  {
    icon: Users,
    titleKey: "why.team.title",
    descKey: "why.team.desc",
    titleFB: "One Team for Your Digital Growth",
    descFB:
      "Strategy, design, development, AI, SEO, and digital marketing can work together under one technology partner.",
    iconClass:
      "bg-violet-500/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300",
  },
  {
    icon: ShieldCheck,
    titleKey: "why.quality.title",
    descKey: "why.quality.desc",
    titleFB: "Quality-Focused Development",
    descFB:
      "We focus on clean experiences, responsive design, performance, usability, and reliable implementation across every project.",
    iconClass:
      "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300",
  },
  {
    icon: Headphones,
    titleKey: "why.support.title",
    descKey: "why.support.desc",
    titleFB: "Clear Communication and Support",
    descFB:
      "Stay informed throughout the project with straightforward communication, practical guidance, and ongoing support when needed.",
    iconClass:
      "bg-pink-500/10 text-pink-600 dark:bg-pink-400/10 dark:text-pink-300",
  },
];

/* =========================================================
   REASON CARD
========================================================= */

function ReasonCard({
  reason,
  index,
}: {
  reason: (typeof REASONS)[number];
  index: number;
}) {
  const { t } = useLang();

  const Icon = reason.icon;

  const title = t(reason.titleKey, reason.titleFB);
  const description = t(reason.descKey, reason.descFB);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-50px",
      }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.08, 0.4),
      }}
      whileHover={{
        y: -6,
      }}
      className="
        group relative
        h-full overflow-hidden
        rounded-3xl
        border border-slate-200/80
        bg-white
        p-6
        shadow-[0_10px_35px_rgba(15,23,42,0.06)]
        transition-all duration-300

        hover:border-slate-300
        hover:shadow-[0_22px_55px_rgba(15,23,42,0.10)]

        dark:border-white/10
        dark:bg-white/[0.045]
        dark:hover:border-white/15
        dark:hover:bg-white/[0.065]
      "
    >
      {/* Hover glow */}
      <div
        className="
          pointer-events-none
          absolute -right-16 -top-16
          h-40 w-40
          rounded-full
          bg-blue-500/10
          opacity-0
          blur-3xl
          transition-opacity duration-500
          group-hover:opacity-100
        "
        aria-hidden="true"
      />

      {/* Number */}
      <span
        className="
          absolute right-5 top-5
          text-xs font-bold
          text-slate-200
          dark:text-white/10
        "
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon */}
      <div
        className={`
          relative mb-6
          flex h-12 w-12
          items-center justify-center
          rounded-2xl
          transition-all duration-300
          group-hover:scale-110
          group-hover:rotate-3
          ${reason.iconClass}
        `}
      >
        <Icon size={22} aria-hidden="true" />
      </div>

      {/* Content */}
      <h3
        className="
          relative
          text-lg font-bold
          tracking-tight
          text-slate-900
          dark:text-z-text
        "
      >
        {title}
      </h3>

      <p
        className="
          relative mt-3
          text-sm leading-relaxed
          text-slate-600
          dark:text-z-muted
        "
      >
        {description}
      </p>

      {/* Bottom accent */}
      <div
        className="
          absolute bottom-0 left-0
          h-1 w-0
          bg-gradient-to-r
          from-z-accent
          via-blue-400
          to-transparent
          transition-all duration-500
          group-hover:w-full
        "
        aria-hidden="true"
      />
    </motion.article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WhyChooseUsSection() {
  const { t } = useLang();

  const trustPoints = [
    t("why.trust1", "Business-Focused Approach"),
    t("why.trust2", "Modern Technology"),
    t("why.trust3", "Transparent Communication"),
    t("why.trust4", "Long-Term Support"),
  ];

  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className="
        relative overflow-hidden
        bg-slate-50
        px-4 py-24
        transition-colors duration-300

        dark:bg-z-dark2

        md:px-6 md:py-32
      "
    >
      {/* ===================================================
          BACKGROUND DECORATION
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute inset-0
          overflow-hidden
        "
        aria-hidden="true"
      >
        <div
          className="
            absolute -left-32 top-20
            h-96 w-96
            rounded-full
            bg-blue-500/[0.06]
            blur-[130px]
          "
        />

        <div
          className="
            absolute -right-32 bottom-10
            h-96 w-96
            rounded-full
            bg-violet-500/[0.05]
            blur-[130px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mx-auto mb-14
            max-w-3xl
            text-center
          "
        >
          <div className="z-badge mx-auto mb-5 w-fit">
            <Sparkles size={14} aria-hidden="true" />

            <span>
              {t(
                "why.badge",
                "Why Businesses Choose Zentrox"
              )}
            </span>
          </div>

          <h2
            id="why-choose-us-heading"
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
              "why.title",
              "More Than a Service Provider."
            )}

            <br />

            <span className="gradient-text">
              {t(
                "why.title2",
                "Your Digital Growth Partner."
              )}
            </span>
          </h2>

          <p
            className="
              mx-auto mt-6
              max-w-2xl
              text-base leading-relaxed
              text-slate-600

              md:text-lg

              dark:text-z-muted
            "
          >
            {t(
              "why.sub",
              "Zentrox Technologies combines technology, strategy, design, and digital growth expertise to help businesses build stronger products, improve their online presence, and move forward with confidence."
            )}
          </p>
        </motion.div>

        {/* =================================================
            REASONS GRID
        ================================================= */}

        <div
          className="
            grid grid-cols-1
            gap-5

            sm:grid-cols-2

            lg:grid-cols-3
          "
        >
          {REASONS.map((reason, index) => (
            <ReasonCard
              key={reason.titleKey}
              reason={reason}
              index={index}
            />
          ))}
        </div>

        {/* =================================================
            TRUST BAR
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          className="
            mt-10
            rounded-3xl
            border border-slate-200/80
            bg-white
            p-5
            shadow-[0_10px_35px_rgba(15,23,42,0.05)]

            dark:border-white/10
            dark:bg-white/[0.04]

            md:mt-14 md:p-6
          "
        >
          <div
            className="
              flex flex-col
              items-center
              justify-between
              gap-5

              lg:flex-row
            "
          >
            <div
              className="
                flex items-center
                gap-3
                text-center

                lg:text-left
              "
            >
              <div
                className="
                  flex h-11 w-11
                  shrink-0
                  items-center justify-center
                  rounded-2xl
                  bg-z-accent/10
                  text-z-accent
                "
              >
                <BadgeCheck size={21} />
              </div>

              <div>
                <h3
                  className="
                    text-sm font-bold
                    text-slate-900
                    dark:text-z-text
                  "
                >
                  {t(
                    "why.trustTitle",
                    "Focused on building solutions that support real business goals."
                  )}
                </h3>

                <p
                  className="
                    mt-1 text-xs
                    text-slate-500
                    dark:text-z-muted
                  "
                >
                  {t(
                    "why.trustSub",
                    "From the first conversation to delivery and beyond."
                  )}
                </p>
              </div>
            </div>

            <div
              className="
                flex flex-wrap
                justify-center
                gap-x-5 gap-y-3
              "
            >
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="
                    flex items-center
                    gap-2
                    text-xs font-semibold
                    text-slate-600
                    dark:text-z-muted
                  "
                >
                  <CheckCircle2
                    size={15}
                    className="text-z-accent"
                    aria-hidden="true"
                  />

                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* =================================================
            CTA
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mt-12
            text-center
          "
        >
          <Link
            href="/contact"
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-full
              bg-z-accent
              px-8 py-4
              text-sm font-semibold
              text-white
              shadow-lg
              shadow-z-accent/20
              transition-all duration-300

              hover:-translate-y-1
              hover:opacity-90
              hover:shadow-xl

              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-z-accent
              focus-visible:ring-offset-2
              dark:focus-visible:ring-offset-slate-950
            "
          >
            {t(
              "why.cta",
              "Let's Discuss Your Project"
            )}

            <ArrowRight
              size={17}
              className="
                transition-transform duration-300
                group-hover:translate-x-1
              "
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

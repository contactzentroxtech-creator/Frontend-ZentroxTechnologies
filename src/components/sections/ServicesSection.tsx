"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  Smartphone,
  Bot,
  BarChart3,
  Cloud,
  Palette,
  Code2,
  Users,
  Cable,
  Sparkles,
  Megaphone,
  CheckCircle2,
} from "lucide-react";
import { useLang } from "@/lib/providers";

/* =========================================================
   SERVICES DATA
========================================================= */

const SERVICES = [
  {
    id: "software",
    icon: Code2,
    color: "#2563eb",
    href: "/services#software",
    titleKey: "service.software.title",
    descKey: "service.software.desc",
    titleFB: "Custom Software Development",
    descFB:
      "Tailored software solutions designed around your business processes, challenges, and long-term growth.",
  },
  {
    id: "web",
    icon: Globe,
    color: "#4f46e5",
    href: "/services#web",
    titleKey: "service.web.title",
    descKey: "service.web.desc",
    titleFB: "Web Application Development",
    descFB:
      "Fast, modern, scalable web applications built for excellent user experience and measurable business results.",
  },
  {
    id: "saas",
    icon: Cloud,
    color: "#0f766e",
    href: "/services#saas",
    titleKey: "service.saas.title",
    descKey: "service.saas.desc",
    titleFB: "SaaS Development",
    descFB:
      "From MVP to scalable SaaS platforms, we help turn your product ideas into reliable digital businesses.",
  },
  {
    id: "android",
    icon: Smartphone,
    color: "#c7771a",
    href: "/services#android",
    titleKey: "service.android.title",
    descKey: "service.android.desc",
    titleFB: "Mobile App Development",
    descFB:
      "High-performance mobile applications with intuitive interfaces and smooth experiences across devices.",
  },
  {
    id: "design",
    icon: Palette,
    color: "#9333ea",
    href: "/services#design",
    titleKey: "service.design.title",
    descKey: "service.design.desc",
    titleFB: "UI/UX Design",
    descFB:
      "Human-centered digital experiences that look professional, feel intuitive, and help users take action.",
  },
  {
    id: "seo",
    icon: BarChart3,
    color: "#2563eb",
    href: "/services#seo",
    titleKey: "service.seo.title",
    descKey: "service.seo.desc",
    titleFB: "SEO & Local SEO",
    descFB:
      "Data-driven SEO strategies that improve visibility, attract qualified traffic, and generate more leads.",
  },
  {
    id: "marketing",
    icon: Megaphone,
    color: "#7c3aed",
    href: "/services#marketing",
    titleKey: "service.marketing.title",
    descKey: "service.marketing.desc",
    titleFB: "Digital Marketing",
    descFB:
      "Smart digital campaigns that strengthen your brand, generate leads, and support sustainable business growth.",
  },
  {
    id: "ai",
    icon: Bot,
    color: "#0f766e",
    href: "/services#ai",
    titleKey: "service.ai.title",
    descKey: "service.ai.desc",
    titleFB: "AI Integration & Automation",
    descFB:
      "Intelligent AI integration and automation workflows that reduce repetitive work and improve business efficiency.",
  },
  {
    id: "crm",
    icon: Users,
    color: "#c2410c",
    href: "/services#crm",
    titleKey: "service.crm.title",
    descKey: "service.crm.desc",
    titleFB: "CRM Development",
    descFB:
      "Custom CRM systems that organize customer data, streamline sales, and improve business relationships.",
  },
  {
    id: "api",
    icon: Cable,
    color: "#7e22ce",
    href: "/services#api",
    titleKey: "service.api.title",
    descKey: "service.api.desc",
    titleFB: "API Integration",
    descFB:
      "Connect your software, platforms, and workflows with reliable integrations built for efficiency.",
  },
];

/* =========================================================
   SERVICE CARD
========================================================= */

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const { t } = useLang();
  const Icon = service.icon;

  const title = t(service.titleKey, service.titleFB);
  const description = t(service.descKey, service.descFB);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: "-60px",
      }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.05, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -7 }}
      className="group relative h-full"
    >
      <Link
        href={service.href}
        aria-label={`Explore ${title}`}
        className="
          block
          h-full
          rounded-[22px]
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500
          focus-visible:ring-offset-4
        "
      >
        <div
          className="
            relative
            flex
            h-full
            min-h-[285px]
            flex-col
            overflow-hidden
            rounded-[22px]
            border
            border-slate-200/90
            bg-white/[0.92]
            p-6
            shadow-[0_10px_35px_rgba(15,23,42,0.055)]
            backdrop-blur-xl
            transition-all
            duration-500

            group-hover:border-blue-200
            group-hover:shadow-[0_24px_60px_rgba(15,23,42,0.11)]

            dark:border-white/[0.10]
            dark:bg-[#1c293b]/80
            dark:group-hover:border-blue-400/30
            dark:group-hover:bg-[#203047]/90
          "
        >
          {/* Soft accent glow */}
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-48
              w-48
              rounded-full
              opacity-0
              blur-[70px]
              transition-opacity
              duration-500
              group-hover:opacity-[0.13]
            "
            style={{ backgroundColor: service.color }}
          />

          {/* subtle gradient */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-br
              from-white/30
              via-transparent
              to-transparent
              dark:from-white/[0.025]
            "
          />

          {/* Number */}
          <span
            className="
              absolute
              right-6
              top-6
              text-[11px]
              font-bold
              tracking-[0.12em]
              text-slate-300
              dark:text-white/15
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              whileHover={{
                rotate: 4,
                scale: 1.08,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 16,
              }}
              className="
                mb-6
                flex
                h-13
                w-13
                items-center
                justify-center
                rounded-2xl
                border
              "
              style={{
                backgroundColor: `${service.color}12`,
                borderColor: `${service.color}28`,
              }}
            >
              <Icon
                size={24}
                style={{ color: service.color }}
                aria-hidden="true"
              />
            </motion.div>

            {/* Title */}
            <h3
              className="
                max-w-[88%]
                text-[19px]
                font-bold
                leading-snug
                tracking-[-0.02em]
                text-slate-900
                dark:text-white
              "
            >
              {title}
            </h3>

            {/* Description */}
            <p
              className="
                mt-3
                text-sm
                leading-6
                text-slate-600
                dark:text-slate-300
              "
            >
              {description}
            </p>
          </div>

          <div className="flex-1" />

          {/* Footer */}
          <div
            className="
              relative
              z-10
              mt-7
              flex
              items-center
              justify-between
              border-t
              border-slate-100
              pt-5
              dark:border-white/[0.08]
            "
          >
            <span
              className="
                text-sm
                font-semibold
                text-slate-700
                transition-colors
                group-hover:text-blue-600
                dark:text-slate-200
                dark:group-hover:text-blue-300
              "
            >
              {t("services.explore", "Explore Service")}
            </span>

            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:rotate-45
              "
              style={{
                color: service.color,
                backgroundColor: `${service.color}12`,
              }}
            >
              <ArrowUpRight size={17} />
            </span>
          </div>

          {/* Bottom accent */}
          <div
            className="
              absolute
              bottom-0
              left-0
              h-[3px]
              w-0
              transition-all
              duration-500
              group-hover:w-full
            "
            style={{ backgroundColor: service.color }}
          />
        </div>
      </Link>
    </motion.article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const { t } = useLang();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="
        relative
        overflow-hidden
        px-4
        py-20
        sm:py-24
        md:px-6
        md:py-28
        lg:py-32
      "
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="
            absolute
            left-[-150px]
            top-[10%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-blue-500/[0.045]
            blur-[130px]
            dark:bg-blue-500/[0.07]
          "
        />

        <div
          className="
            absolute
            right-[-150px]
            bottom-[5%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-orange-400/[0.035]
            blur-[130px]
            dark:bg-blue-400/[0.05]
          "
        />
      </div>

      <div
        ref={ref}
        className="relative mx-auto max-w-[1280px]"
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : undefined
          }
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            mb-12
            max-w-4xl
            text-center
            sm:mb-14
            md:mb-16
          "
        >
          <div className="z-badge mx-auto mb-5 w-fit">
            <Sparkles size={13} />

            <span>
              {t(
                "services.badge",
                "Everything You Need To Grow"
              )}
            </span>
          </div>

          <h2
            id="services-heading"
            className="
              mx-auto
              max-w-4xl
              text-3xl
              font-extrabold
              leading-[1.08]
              tracking-[-0.035em]
              text-slate-900
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              dark:text-white
            "
          >
            {t(
              "services.title",
              "Technology That Moves Your Business Forward"
            )}
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-sm
              leading-relaxed
              text-slate-600
              sm:text-base
              md:text-lg
              dark:text-slate-300
            "
          >
            {t(
              "services.sub",
              "From building powerful digital products to helping your business attract more customers, Zentrox Technologies brings strategy, design, development, AI, and digital growth together under one team."
            )}
          </p>
        </motion.div>

        {/* =================================================
            SERVICES GRID
        ================================================= */}

        <div
          className="
            grid
            auto-rows-fr
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* =================================================
            CTA AREA
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            mt-14
            max-w-3xl
            rounded-[24px]
            border
            border-slate-200/80
            bg-white/[0.75]
            px-6
            py-9
            text-center
            shadow-[0_15px_50px_rgba(15,23,42,0.06)]
            backdrop-blur-xl
            sm:px-10
            dark:border-white/10
            dark:bg-[#1c293b]/70
          "
        >
          <div
            className="
              mb-4
              flex
              justify-center
            "
          >
            <CheckCircle2
              size={24}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>

          <h3
            className="
              text-xl
              font-bold
              tracking-tight
              text-slate-900
              sm:text-2xl
              dark:text-white
            "
          >
            {t(
              "services.cta_title",
              "Not Sure Which Service You Need?"
            )}
          </h3>

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              text-sm
              leading-relaxed
              text-slate-600
              dark:text-slate-300
            "
          >
            {t(
              "services.cta_sub",
              "Tell us about your business goals and our team will help you find the right digital solution."
            )}
          </p>

          <Link
            href="/services"
            className="
              group
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-blue-700
              px-7
              py-3.5
              text-sm
              font-bold
              text-white
              shadow-[0_10px_28px_rgba(37,99,235,0.22)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_16px_36px_rgba(37,99,235,0.30)]
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              focus-visible:ring-offset-4
            "
          >
            {t(
              "services.view_all",
              "Explore All Services"
            )}

            <ArrowRight
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

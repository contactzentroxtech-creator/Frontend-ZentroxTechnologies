"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
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
} from "lucide-react";

import { useLang } from "@/lib/providers";

/* =========================================================
   SERVICES DATA
========================================================= */

const SERVICES = [
  {
    id: "software",
    icon: Code2,
    color: "#3b7bff",
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
    color: "#6d5dfc",
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
    color: "#14b8a6",
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
    color: "#f59e0b",
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
    color: "#ec4899",
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
    color: "#3b7bff",
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
    color: "#8b5cf6",
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
    color: "#14b8a6",
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
    color: "#f97316",
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
    color: "#d946ef",
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

  const title = t(
    service.titleKey,
    service.titleFB
  );

  const description = t(
    service.descKey,
    service.descFB
  );

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
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
        delay: Math.min(index * 0.05, 0.35),
      }}
      whileHover={{
        y: -6,
      }}
      className="group relative h-full"
    >
      <Link
        href={service.href}
        aria-label={`Explore ${title}`}
        className="
          block h-full
          rounded-3xl
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500
          focus-visible:ring-offset-2
          dark:focus-visible:ring-offset-slate-950
        "
      >
        <div
          className="
            relative
            flex h-full
            min-h-[270px]
            flex-col
            overflow-hidden
            rounded-3xl
            border border-slate-200/80
            bg-white
            p-6
            shadow-[0_8px_30px_rgba(15,23,42,0.05)]
            transition-all
            duration-500

            group-hover:border-slate-300
            group-hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]

            dark:border-white/10
            dark:bg-white/[0.04]
            dark:group-hover:bg-white/[0.07]
          "
        >
          {/* Soft background glow */}
          <div
            className="
              pointer-events-none
              absolute -right-16 -top-16
              h-40 w-40
              rounded-full
              opacity-0
              blur-3xl
              transition-opacity
              duration-500
              group-hover:opacity-20
            "
            style={{
              backgroundColor: service.color,
            }}
            aria-hidden="true"
          />

          {/* Service Number */}
          <span
            className="
              absolute right-5 top-5
              text-xs font-bold
              text-slate-300
              dark:text-white/10
            "
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Icon */}
          <div
            className="
              relative mb-6
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              border
              transition-all
              duration-500
              group-hover:scale-110
              group-hover:rotate-3
            "
            style={{
              backgroundColor: `${service.color}12`,
              borderColor: `${service.color}25`,
            }}
          >
            <Icon
              size={22}
              style={{
                color: service.color,
              }}
              aria-hidden="true"
            />
          </div>

          {/* Content */}
          <h3
            className="
              relative mb-3
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
              relative
              text-sm leading-relaxed
              text-slate-600
              dark:text-z-muted
            "
          >
            {description}
          </p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Explore Service */}
          <div
            className="
              relative mt-6
              flex items-center gap-2
              text-sm font-semibold
              transition-all duration-300
              group-hover:gap-3
            "
            style={{
              color: service.color,
            }}
          >
            <span>
              {t(
                "services.explore",
                "Explore Service"
              )}
            </span>

            <span
              className="
                flex h-7 w-7
                items-center justify-center
                rounded-full
                transition-transform
                duration-300
                group-hover:rotate-45
              "
              style={{
                backgroundColor: `${service.color}12`,
              }}
              aria-hidden="true"
            >
              <ArrowUpRight size={14} />
            </span>
          </div>

          {/* Bottom Accent */}
          <div
            className="
              absolute bottom-0 left-0
              h-1 w-0
              transition-all
              duration-500
              group-hover:w-full
            "
            style={{
              backgroundColor: service.color,
            }}
            aria-hidden="true"
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
        relative overflow-hidden
        px-4 py-24
        md:px-6 md:py-32
      "
    >
      {/* Background Decoration */}
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
            absolute left-[5%] top-[20%]
            h-[350px] w-[350px]
            rounded-full
            bg-blue-400/[0.06]
            blur-[120px]
          "
        />

        <div
          className="
            absolute right-[5%] bottom-[10%]
            h-[350px] w-[350px]
            rounded-full
            bg-purple-400/[0.05]
            blur-[120px]
          "
        />
      </div>

      <div
        ref={ref}
        className="
          relative
          mx-auto
          max-w-7xl
        "
      >
        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : undefined
          }
          transition={{
            duration: 0.6,
          }}
          className="
            mx-auto mb-16
            max-w-3xl
            text-center
          "
        >
          {/* Badge */}
          <div className="z-badge mx-auto mb-5 w-fit">
            <Sparkles
              size={13}
              aria-hidden="true"
            />

            <span>
              {t(
                "services.badge",
                "Everything You Need To Grow"
              )}
            </span>
          </div>

          {/* Heading */}
          <h2
            id="services-heading"
            className="
              mb-5
              text-4xl
              font-extrabold
              tracking-tight
              text-slate-900

              md:text-6xl

              dark:text-z-text
            "
          >
            {t(
              "services.title",
              "Technology That Moves Your Business Forward"
            )}
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              max-w-2xl
              text-base
              leading-relaxed
              text-slate-600

              md:text-lg

              dark:text-z-muted
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
            grid-cols-1
            gap-5

            sm:grid-cols-2

            lg:grid-cols-3
          "
        >
          {SERVICES.map(
            (service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
              />
            )
          )}
        </div>

        {/* =================================================
            CTA
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
            duration: 0.5,
          }}
          className="
            mt-14
            text-center
          "
        >
          <Link
            href="/services"
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-slate-900
              px-7 py-3.5
              text-sm font-semibold
              text-white
              shadow-lg
              shadow-slate-900/10
              transition-all
              duration-300

              hover:-translate-y-1
              hover:shadow-xl

              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              focus-visible:ring-offset-2

              dark:bg-white
              dark:text-slate-900
              dark:focus-visible:ring-offset-slate-950
            "
          >
            {t(
              "services.view_all",
              "Explore All Services"
            )}

            <ArrowUpRight
              size={17}
              className="
                transition-transform
                duration-300

                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

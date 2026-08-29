"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Trophy,
  Monitor,
  Megaphone,
  CheckSquare,
  MapPin,
  Mail,
  Clock,
  Building2,
} from "lucide-react";

/* =========================================
   DATA
========================================= */

const stats = [
  {
    label: "Founded",
    value: "2023",
    desc: "Built with a mission to help businesses grow through modern technology and digital solutions.",
  },
  {
    label: "Core Focus",
    value: "10+",
    desc: "Technology and digital service areas designed to support businesses at different stages of growth.",
  },
  {
    label: "Base",
    value: "India",
    desc: "Remote-first operations with a strong focus on businesses in Punjab, Chandigarh and beyond.",
  },
  {
    label: "Ambition",
    value: "∞",
    desc: "Continuously learning, improving and building for the future.",
  },
];

const journeySteps = [
  {
    year: "2023",
    title: "Zentrox Technologies Begins",
    desc: "Zentrox Technologies was founded with the goal of making modern technology and digital solutions more accessible to growing businesses.",
    bullets: [
      "Focus on custom digital solutions",
      "Started serving growing businesses",
    ],
  },
  {
    year: "2024",
    title: "Expanding Digital Services",
    desc: "The company expanded its capabilities across websites, software, mobile applications, SEO and digital growth services.",
    bullets: [
      "Broader service portfolio",
      "Focus on scalable digital solutions",
    ],
  },
  {
    year: "2025",
    title: "Technology & Growth Focus",
    desc: "Zentrox continued building stronger capabilities in modern web technology, software development, AI integration and digital growth.",
    bullets: [
      "Modern development workflows",
      "AI and automation exploration",
    ],
  },
  {
    year: "2026",
    title: "Building for the Future",
    desc: "The focus continues on creating practical technology solutions, improving digital experiences and helping businesses grow online.",
    bullets: [
      "Future-ready technology",
      "Long-term business partnerships",
    ],
  },
];

const coreValues = [
  {
    num: "01",
    title: "Build Real Solutions",
    desc: "We focus on practical technology that solves real business problems and creates measurable value.",
  },
  {
    num: "02",
    title: "Honest Communication",
    desc: "Clear communication, transparent expectations and straightforward collaboration are central to how we work.",
  },
  {
    num: "03",
    title: "Long-Term Thinking",
    desc: "We aim to build technology and relationships that can continue supporting businesses as they grow.",
  },
  {
    num: "04",
    title: "Continuous Learning",
    desc: "Technology evolves quickly, so we continuously explore new tools, frameworks and better ways to build.",
  },
  {
    num: "05",
    title: "Take Ownership",
    desc: "We believe in responsibility, attention to detail and taking pride in the quality of the work we deliver.",
  },
  {
    num: "06",
    title: "Growth Through Technology",
    desc: "Our mission is to help businesses use technology, design and digital marketing to create stronger opportunities.",
  },
];

const teamDepartments = [
  {
    category: "Leadership",
    icon: <Trophy size={18} className="text-amber-500" />,
    members: [
      {
        name: "Zentrox Leadership",
        role: "Business & Technology Strategy",
        initials: "ZT",
        badge: "LEADERSHIP",
        isPrimary: true,
      },
    ],
  },
  {
    category: "Development",
    icon: <Monitor size={18} className="text-blue-500" />,
    members: [
      {
        name: "Development Team",
        role: "Web, Software & Applications",
        initials: "DT",
      },
    ],
  },
  {
    category: "Marketing & Design",
    icon: <Megaphone size={18} className="text-orange-500" />,
    members: [
      {
        name: "Creative Team",
        role: "SEO, Marketing & UI/UX",
        initials: "CT",
      },
    ],
  },
  {
    category: "Quality & Support",
    icon: <CheckSquare size={18} className="text-emerald-500" />,
    members: [
      {
        name: "Support Team",
        role: "Quality & Client Support",
        initials: "ST",
      },
    ],
  },
];

const offices = [
  {
    city: "Mohali & Chandigarh",
    badge: "PRIMARY SERVICE REGION",
    title: "Punjab Region",
    address: "Mohali & Chandigarh, Punjab, India",
    email: "contact.zentroxtech@gmail.com",
    hours: "Mon–Fri: 9:00 AM – 6:30 PM IST",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Mohali%20Punjab%20India",
  },
  {
    city: "Remote-First",
    badge: "REMOTE OPERATIONS",
    title: "Serving Clients Worldwide",
    address:
      "Remote-first team serving businesses across India and international markets",
    email: "contact.zentroxtech@gmail.com",
    hours: "Online support based on project requirements",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Chandigarh%20Punjab%20India",
  },
];

/* =========================================
   COMPONENT
========================================= */

export default function AboutClient() {
  const [activeYear, setActiveYear] = useState(journeySteps[0].year);

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const year = entry.target.getAttribute("data-year");

            if (year) {
              setActiveYear(year);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-zinc-900 transition-colors duration-300 dark:bg-[#080c15] dark:text-white">
      {/* HERO */}

      <section className="relative overflow-hidden px-4 pb-10 pt-12 text-center md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-4xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            ABOUT ZENTROX TECHNOLOGIES
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-white">
            Building Digital
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Solutions for Growth
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
            Zentrox Technologies is a technology and digital solutions company
            helping businesses build stronger digital experiences through
            websites, software, mobile apps, AI integration, SEO and digital
            marketing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <span className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
              MSME Registered
            </span>

            <span className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              Remote-First
            </span>

            <span className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              Innovation-Driven
            </span>
          </div>
        </motion.div>
      </section>

      {/* STORY + STATS */}

      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-6"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <span>—</span>
              Our Story
            </div>

            <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
              More Than a Service Provider.
              <span className="block text-blue-600 dark:text-blue-500">
                A Technology Partner.
              </span>
            </h2>

            <p className="text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
              Zentrox Technologies began in 2023 with a clear goal: help
              businesses access modern technology and digital solutions without
              unnecessary complexity.
            </p>

            <p className="text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
              Our remote-first approach allows us to collaborate flexibly with
              businesses across Punjab, Chandigarh, India and international
              markets.
            </p>

            <div className="pt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-blue-500/25"
              >
                Work With Us
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
            {stats.map((st, idx) => (
              <motion.div
                key={st.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="cursor-pointer rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 dark:border-white/10 dark:bg-white/5"
              >
                <div className="mb-2 text-4xl font-extrabold text-blue-600 dark:text-blue-500">
                  {st.value}
                </div>

                <div className="mb-2 text-sm font-bold">{st.label}</div>

                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {st.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER / LEADERSHIP */}

      <section className="mx-auto max-w-7xl overflow-hidden px-4 py-8 md:px-8">
        <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-[#0c1633] via-[#111f48] to-[#182b63] p-8 text-white shadow-2xl sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center lg:col-span-4"
            >
              <div className="flex aspect-[4/5] w-full max-w-[300px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-blue-600/30 to-indigo-900/40 p-8 text-center shadow-2xl">
                <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-extrabold">
                  ZT
                </div>

                <h4 className="text-lg font-bold text-white">
                  Zentrox Technologies
                </h4>

                <p className="mt-1 text-sm font-medium text-blue-300">
                  Technology & Digital Growth Team
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-6 lg:col-span-8"
            >
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                Technology should help businesses move forward — not make things
                more complicated.
              </h2>

              <div className="border-l-2 border-blue-400 pl-5 text-sm italic leading-relaxed text-blue-100 sm:text-base">
                Our focus is simple: understand the business challenge, choose
                the right technology and build solutions that create practical
                value.
              </div>

              <div className="space-y-4 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                <p>
                  Zentrox Technologies brings together technology, design and
                  digital growth to help businesses strengthen their online
                  presence and build better digital systems.
                </p>

                <p>
                  As a remote-first technology company, we collaborate
                  flexibly, use modern tools and focus on delivering solutions
                  aligned with each project&apos;s real requirements.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* JOURNEY */}

      <section className="mx-auto max-w-7xl border-b border-zinc-200 px-4 py-20 md:px-8 dark:border-white/10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <span>—</span>
                Our Journey
              </div>

              <h2 className="text-4xl font-extrabold leading-tight">
                Building, Learning & Growing
              </h2>

              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Our journey is focused on continuous improvement, better
                technology and stronger digital solutions for growing
                businesses.
              </p>

              <div className="pt-12">
                <motion.div
                  key={activeYear}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="select-none bg-gradient-to-br from-blue-600/20 to-indigo-600/10 bg-clip-text text-7xl font-black text-transparent xl:text-8xl dark:from-blue-500/40 dark:to-indigo-500/10"
                >
                  {activeYear}
                </motion.div>
              </div>
            </div>
          </div>

          <div className="relative space-y-12 border-l-2 border-zinc-200 pl-6 sm:pl-10 lg:col-span-7 dark:border-white/10">
            <div className="mb-12 space-y-4 lg:hidden">
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                — OUR JOURNEY
              </div>

              <h2 className="text-3xl font-extrabold">
                Building, Learning & Growing
              </h2>
            </div>

            {journeySteps.map((step, idx) => (
              <motion.div
                key={step.year}
                ref={(el) => {
                  stepRefs.current[idx] = el;
                }}
                data-year={step.year}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative"
              >
                <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-4 border-slate-50 bg-blue-600 transition-transform group-hover:scale-125 sm:-left-[47px] sm:h-5 sm:w-5 dark:border-[#080c15]" />

                <div className="mb-1 text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400">
                  {step.year}
                </div>

                <h3 className="mb-2 text-lg font-bold sm:text-xl">
                  {step.title}
                </h3>

                <p className="mb-4 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                  {step.desc}
                </p>

                <div className="space-y-2 rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-blue-500 hover:shadow-md dark:border-white/10 dark:bg-white/5">
                  {step.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}

      <section className="mx-auto max-w-7xl border-b border-zinc-200 px-4 py-20 md:px-8 dark:border-white/10">
        <div className="mx-auto mb-16 max-w-3xl space-y-3 text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            — OUR CULTURE
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            The Values That Drive{" "}
            <span className="text-blue-600 dark:text-blue-500">
              Everything We Do
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value, idx) => (
            <motion.div
              key={value.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="cursor-pointer rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 dark:border-white/10 dark:bg-white/5"
            >
              <div className="mb-4 text-3xl font-extrabold text-blue-600">
                {value.num}
              </div>

              <h3 className="mb-2 text-base font-bold">{value.title}</h3>

              <p className="text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TEAM */}

      <section className="mx-auto max-w-7xl border-b border-zinc-200 px-4 py-20 md:px-8 dark:border-white/10">
        <div className="mb-16 max-w-3xl space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            — OUR TEAM
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            The People Behind{" "}
            <span className="text-blue-600 dark:text-blue-500">Zentrox</span>
          </h2>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Technology, creativity and problem-solving working together.
          </p>
        </div>

        <div className="space-y-12">
          {teamDepartments.map((dept) => (
            <div key={dept.category} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 dark:border-white/10">
                {dept.icon}

                <h3 className="text-sm font-bold sm:text-base">
                  {dept.category}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {dept.members.map((member) => (
                  <motion.div
                    key={member.name}
                    whileHover={{ y: -8 }}
                    className={`cursor-pointer rounded-2xl border p-5 text-center transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 ${
                      member.isPrimary
                        ? "border-blue-300 bg-blue-50/50 dark:border-blue-500/40 dark:bg-blue-950/20"
                        : "border-zinc-200 bg-white dark:border-white/10 dark:bg-white/5"
                    }`}
                  >
                    {member.badge && (
                      <div className="mb-3">
                        <span className="rounded-full border border-blue-200 bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-blue-700 dark:border-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                          {member.badge}
                        </span>
                      </div>
                    )}

                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md">
                      {member.initials}
                    </div>

                    <h4 className="text-sm font-bold">{member.name}</h4>

                    <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                      {member.role}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATIONS */}

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mx-auto mb-16 max-w-3xl space-y-3 text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            — WHERE WE WORK
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Local Focus,{" "}
            <span className="text-blue-600 dark:text-blue-500">
              Global Reach
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {offices.map((office) => (
            <div
              key={office.city}
              className="flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 dark:border-white/10 dark:bg-white/5"
            >
              <div className="border-b border-zinc-200 bg-[#14234b] p-8 text-center dark:border-white/10">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-600/20 text-blue-400">
                  <Building2 size={24} />
                </div>

                <span className="inline-block rounded-full bg-white px-4 py-1 text-xs font-bold text-zinc-900 shadow-sm">
                  {office.city}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between space-y-5 p-8">
                <div className="space-y-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    {office.badge}
                  </div>

                  <h3 className="text-xl font-extrabold">{office.title}</h3>

                  <p className="flex items-start gap-2.5 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-blue-500"
                    />
                    <span>{office.address}</span>
                  </p>

                  <p className="flex items-center gap-2.5 text-xs text-zinc-600 sm:text-sm dark:text-zinc-400">
                    <Mail size={16} className="shrink-0 text-blue-500" />
                    <span>{office.email}</span>
                  </p>

                  <p className="flex items-center gap-2.5 text-xs text-zinc-600 sm:text-sm dark:text-zinc-400">
                    <Clock size={16} className="shrink-0 text-blue-500" />
                    <span>{office.hours}</span>
                  </p>
                </div>

                <div className="pt-4">
                  <a
                    href={office.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-2.5 text-xs font-semibold transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white dark:border-white/20"
                  >
                    View Service Region
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 px-4 py-20 text-center text-white md:px-8">
        <div className="relative z-10 mx-auto max-w-4xl space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Ready to Build Something Better?
          </h2>

          <p className="mx-auto max-w-xl text-sm leading-relaxed text-blue-100 sm:text-base">
            Whether you need a website, software, mobile application, AI
            integration or digital growth support, let&apos;s discuss your next
            project.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-xs font-bold text-zinc-900 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-50 hover:shadow-xl sm:text-sm"
            >
              Start Your Project
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/contact"
              className="rounded-full border-2 border-white/40 px-8 py-3.5 text-xs font-bold text-white transition-all duration-200 hover:border-white hover:bg-white/10 sm:text-sm"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

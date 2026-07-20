"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Trophy,
  Monitor,
  Megaphone,
  CheckSquare,
  Sparkles,
  MapPin,
  Mail,
  Clock,
  Building2,
} from "lucide-react";

// --- DATA DEFINITIONS ---

const stats = [
  {
    label: "Years Old",
    value: "3+",
    desc: "Founded in 2023, we’ve built depth of experience across multiple tech verticals.",
  },
  {
    label: "Own Products",
    value: "8+",
    desc: "We don’t just build for clients; we own and operate software used daily by thousands.",
  },
  {
    label: "Offices",
    value: "2",
    desc: "Headquarters in Mohali and a branch office in Barnala, serving all of Punjab.",
  },
  {
    label: "Ambition",
    value: "∞",
    desc: "We’re not done growing. New products, new divisions, new markets every year.",
  },
];

const journeySteps = [
  {
    year: "2018",
    title: "Zentrox is Founded",
    desc: "Registered in Mohali, Punjab. Initial focus on website development and basic mobile apps for local businesses.",
    bullets: ["Company registered in Punjab", "First office in Mohali"],
  },
  {
    year: "2019",
    title: "First Enterprise Clients",
    desc: "First major client engagements secured. Builds first POS system and begins developing expertise in retail software.",
    bullets: ["First POS system delivered", "10+ clients served"],
  },
  {
    year: "2020",
    title: "Team Grows to 8 People",
    desc: "Doubled down growing the team and launching custom inventory software, serving businesses across Punjab.",
    bullets: ["Cloud platforms launched", "Team of 8 engineers & designers"],
  },
  {
    year: "2023",
    title: "Barnala Office Opened",
    desc: "Second office opened in Barnala to better serve clients in south Punjab. Team crosses 16 people.",
    bullets: [
      "2nd office opened — Barnala",
      "Advanced AI integrations launched",
    ],
  },
  {
    year: "2024-26",
    title: "SaaS Division & Beyond",
    desc: "Enters the enterprise SaaS space designing and deploying high-scale platforms. Team crosses 20 people.",
    bullets: [
      "Enterprise SaaS in production",
      "20+ team members across 2 offices",
      "8+ products live and growing",
    ],
  },
];

const coreValues = [
  {
    num: "01",
    title: "Build Real Things",
    desc: "We care about products that work in the real world not demos, not prototypes, not excuses. Shipping working software is the only metric that matters.",
  },
  {
    num: "02",
    title: "Honest Communication",
    desc: "We say what we mean, deliver what we promise, and flag problems early. No surprises, no hidden costs, no corporate doublespeak.",
  },
  {
    num: "03",
    title: "Long-Term Thinking",
    desc: "We build products and relationships designed to last decades. Every decision is made with the long game in mind for our clients and for ourselves.",
  },
  {
    num: "04",
    title: "Continuous Learning",
    desc: "Technology changes fast. We invest in our team’s growth new tools, new languages, new frameworks. Zentrox is a place where engineers love to learn.",
  },
  {
    num: "05",
    title: "Own Your Work",
    desc: "Every team member owns their domain. Engineers aren’t just code writers they’re product thinkers who take pride in what they ship.",
  },
  {
    num: "06",
    title: "Punjab First",
    desc: "We’re proud of where we come from. Our mission is to help build Punjab’s digital economy and prove that world-class technology can come from anywhere.",
  },
];

const teamDepartments = [
  {
    category: "Leadership",
    icon: <Trophy size={18} className="text-amber-500" />,
    members: [
      {
        name: "Prince Paul Singh",
        role: "Founder & Director",
        badge: "DIRECTOR",
        initials: "PS",
        isPrimary: true,
      },
      { name: "Ritika Sharma", role: "HR Manager", initials: "RS" },
    ],
  },
  {
    category: "Development",
    icon: <Monitor size={18} className="text-blue-500" />,
    members: [
      { name: "Prince Singh", role: "Full Stack Developer", initials: "PS" },
      { name: "Harman Singh", role: "MERN Stack Developer", initials: "HS" },
      {
        name: "Rishav Rana",
        role: "Front End Developer & Designer",
        initials: "RR",
      },
      { name: "Rishi Thakur", role: "Mobile App Developer", initials: "RT" },
      { name: "Yogesh", role: "Backend Engineer", initials: "YO" },
      { name: "Manpreet Kaur", role: "DevOps Engineer", initials: "MK" },
    ],
  },
  {
    category: "Marketing & Design",
    icon: <Megaphone size={18} className="text-orange-500" />,
    members: [
      { name: "Rajiv Kashyap", role: "Marketing Manager", initials: "RK" },
      { name: "Susmita Tiwari", role: "SEO Team Lead", initials: "ST" },
      { name: "Raj Kaur", role: "UI/UX Designer", initials: "RK" },
      { name: "Rajat Sharma", role: "Graphic Designer", initials: "RS" },
      { name: "Meenakshi Sharma", role: "Content Strategist", initials: "MS" },
    ],
  },
  {
    category: "Quality & Customer Support",
    icon: <CheckSquare size={18} className="text-emerald-500" />,
    members: [
      { name: "Rakshit Atwal", role: "QA Lead", initials: "RA" },
      { name: "Gourav Sharma", role: "Technical Support", initials: "GS" },
      { name: "Kiran Deep", role: "Client Success", initials: "KD" },
      { name: "Rohan Sharma", role: "Support Specialist", initials: "RS" },
    ],
  },
];

const offices = [
  {
    city: "Hamirpur, Himachal Pradesh",
    badge: "HEADQUARTERS · HQ",
    title: "Himachal Pradesh",
    address: "Hamirpur, Himachal Pradesh",
    email: "contact.zentroxtech@gmail.com",
    hours: "Mon–Fri: 9:00 AM – 6:30 PM IST",
    mapLink: "https://maps.google.com",
  },
  {
    city: "Mohali, Punjab",
    badge: "BRANCH OFFICE",
    title: "SAS Nagar (Mohali)",
    address: "Mohali, Punjab",
    email: "contact.zentroxtech@gmail.com",
    hours: "Mon–Fri: 9:00 AM – 6:30 PM IST",
    mapLink: "https://maps.google.com",
  },
];

// --- COMPONENT IMPLEMENTATION ---

export default function AboutPageTemplate() {
  const [activeYear, setActiveYear] = useState(journeySteps[0].year);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer to track active year on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const year = entry.target.getAttribute("data-year");
          if (year) setActiveYear(year);
        }
      });
    }, observerOptions);

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#080c15] text-zinc-900 dark:text-white transition-colors duration-300">
      {/* 1. TOP HERO BANNER */}
      <section className="relative pt-12 pb-6 px-4 md:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-6 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase border border-blue-200 dark:border-blue-800">
            ABOUT ZENTROX TECHNOLOGIES
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-zinc-900 dark:text-white">
            Building the Digital <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Future of Punjab
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Zentrox Technologies is an MSME-registered, remote-first technology
            company headquartered in Mohali & Barnala. We craft premium web,
            mobile, AI, and SaaS solutions for businesses across India.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />{" "}
              MSME Registered
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />{" "}
              Remote-First
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-purple-500" />{" "}
              Innovation-Driven
            </span>
          </div>
        </motion.div>
      </section>

      {/* 2. WHO WE ARE & STATS SECTION */}
      <section className="relative pt-4 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
              <span>—</span> Our Story
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-zinc-900 dark:text-white">
              More Than a Software Company. A{" "}
              <span className="text-blue-600 dark:text-blue-500">
                Technology Partner.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Zentrox Technologies was founded in 2023 by Prince Paul Singh with
              a clear vision: to build a premium software development and
              digital growth company that embraces the future of
              work—remote-first
            </p>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Operating fully remote from Mohali, Punjab, we serve clients
              across India (Chandigarh, Delhi NCR, Himachal Pradesh) and
              international markets including the United States, United Kingdom,
              Canada, Australia, UAE, Singapore, and Europe.
            </p>

            <div className="pt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25"
              >
                Work With Us{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </motion.div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((st, idx) => (
              <motion.div
                key={st.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
              >
                <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-500 mb-2">
                  {st.value}
                </div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white mb-2">
                  {st.label}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {st.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FOUNDER PROFILE SECTION (THIRD PLACE) */}
      {/* Enclosed in a sleek high-contrast dark indigo banner box that looks perfect in both Light and Dark themes */}
      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="bg-gradient-to-br from-[#0c1633] via-[#111f48] to-[#182b63] border border-blue-500/20 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Image from Left - Sleek proportioned card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-4 flex justify-center lg:justify-start"
            >
              <div className="relative aspect-[4/5] w-full max-w-[270px] sm:max-w-[300px] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl group">
                <img
                  src="/princepaulphoto.jpeg"
                  alt="Founder & Director"
                  className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <h4 className="font-bold text-base !text-white">
                    Prince Paul Singh
                  </h4>
                  <p className="text-xs text-blue-300 font-medium">
                    Founder & Director
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Content from Right - Explicit high-contrast white/blue text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="lg:col-span-8 space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight !text-white tracking-tight">
                "Technology is the great equalizer — it gives every business,
                big or small, the tools to compete."
              </h2>

              <div className="border-l-2 border-blue-400 pl-5 !text-blue-100 text-sm sm:text-base italic leading-relaxed font-normal">
                "I started Zentrox Technologies in 2023 with a simple belief:
                that businesses in Punjab and across India deserve access to the
                same quality of technology that the world's best companies have.
                Three years later, that mission drives every line of code we
                write."
              </div>

              <div className="space-y-4 text-xs sm:text-sm !text-zinc-300 leading-relaxed">
                <p>
                  Prince Paul Singh founded Zentrox Technologies in 2023 with a
                  vision to bridge the gap between premium software development
                  and accessible, transparent delivery. With deep expertise in
                  technology and business strategy, Prince leads the company
                  with a hands-on approach, ensuring every client receives
                  premium quality and transparent communication. He believes in
                  building technology that genuinely solves problems.
                </p>
                <p>
                  We don't need an office to deliver excellence. Our
                  remote-first model gives us access to the best talent,
                  flexibility for 24/7 availability, competitive pricing, and a
                  global perspective. Our team works from Mohali, Punjab,
                  serving businesses worldwide.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. OUR JOURNEY (TIMELINE) */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-zinc-200 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 hidden lg:block">
            <div className="sticky top-32 space-y-6">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
                <span>—</span> OUR JOURNEY
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                Seven Years of Building & Growing
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                From a small office in Mohali to a full-stack technology company
                operating across Punjab here&apos;s how we grew year by year.
              </p>

              {/* Dynamic Animated Year Indicator */}
              <div className="pt-12">
                <motion.div
                  key={activeYear}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600/20 to-indigo-600/10 dark:from-blue-500/40 dark:to-indigo-500/10 select-none"
                >
                  {activeYear}
                </motion.div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative pl-6 sm:pl-10 border-l-2 border-zinc-200 dark:border-white/10 space-y-12">
            <div className="lg:hidden mb-12 space-y-4">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
                <span>—</span> OUR JOURNEY
              </div>
              <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                Seven Years of Building & Growing
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
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative group"
              >
                <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 sm:w-5 h-4 sm:h-5 rounded-full border-4 border-slate-50 dark:border-[#080c15] bg-blue-600 dark:bg-blue-500 group-hover:scale-125 transition-transform" />
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider mb-1">
                  {step.year}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  {step.desc}
                </p>

                <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-4 space-y-2 transition-all duration-300 hover:border-blue-500 hover:shadow-md">
                  {step.bullets.map((b, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CORE VALUES SECTION */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-zinc-200 dark:border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
            — OUR CULTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            The Values That Drive{" "}
            <span className="text-blue-600 dark:text-blue-500">
              Everything We Do
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => (
            <motion.div
              key={val.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
            >
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-500 mb-4">
                {val.num}
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                {val.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. TEAM DIRECTORY WITH HOVER UPLIFT & BLUE BORDER */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-zinc-200 dark:border-white/10">
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
            — OUR PEOPLE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            The Team Powering{" "}
            <span className="text-blue-600 dark:text-blue-500">Zentrox</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Dedicated engineers, designers, and web strategists building
            futuristic solutions together.
          </p>
        </div>

        <div className="space-y-12">
          {teamDepartments.map((dept) => (
            <div key={dept.category} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-white/10 pb-3">
                {dept.icon}
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
                  {dept.category}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dept.members.map((member) => (
                  <motion.div
                    key={member.name}
                    className={`p-5 rounded-2xl border text-center transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer ${
                      member.isPrimary
                        ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-500/40"
                        : "bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10"
                    }`}
                  >
                    {member.badge && (
                      <div className="mb-3">
                        <span className="text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                          {member.badge}
                        </span>
                      </div>
                    )}
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mx-auto mb-3 shadow-md">
                      {member.initials}
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">
                      {member.name}
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {member.role}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TWO OFFICES, ONE MISSION SECTION */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
            — WHERE WE ARE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Two Offices,{" "}
            <span className="text-blue-600 dark:text-blue-500">
              One Mission
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offices.map((office) => (
            <div
              key={office.city}
              className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between"
            >
              <div className="bg-[#14234b] dark:bg-[#0c1633] p-8 text-center relative border-b border-zinc-200 dark:border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center mx-auto mb-4 text-blue-400">
                  <Building2 size={24} />
                </div>
                <span className="inline-block px-4 py-1 rounded-full bg-white text-zinc-900 font-bold text-xs shadow-sm">
                  {office.city}
                </span>
              </div>

              <div className="p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-[10px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                    {office.badge}
                  </div>
                  <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                    {office.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex items-start gap-2.5">
                    <MapPin
                      size={16}
                      className="text-blue-500 flex-shrink-0 mt-0.5"
                    />
                    <span>{office.address}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2.5">
                    <Mail size={16} className="text-blue-500 flex-shrink-0" />
                    <span>{office.email}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2.5">
                    <Clock size={16} className="text-blue-500 flex-shrink-0" />
                    <span>{office.hours}</span>
                  </p>
                </div>

                <div className="pt-4">
                  <a
                    href={office.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-zinc-300 dark:border-white/20 text-xs font-semibold text-zinc-900 dark:text-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                  >
                    View on Maps <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. BOTTOM CTA BANNER */}
      <section className="relative py-20 px-4 md:px-8 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white text-center overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Want to Work with Us?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re a client, potential partner, or looking to join
            our growing team let&apos;s connect.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-white text-zinc-900 font-bold text-xs sm:text-sm hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform duration-200 inline-flex items-center gap-2"
            >
              Start Your Project Today <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full border-2 border-white/40 text-white font-bold text-xs sm:text-sm hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              Join the Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

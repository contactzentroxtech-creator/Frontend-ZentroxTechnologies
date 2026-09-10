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
  Sparkles,
  Target,
  Shield,
  Award,
  Layers,
  Zap,
  Users,
} from "lucide-react";

const stats = [
  { label: "Founded", value: "2023", desc: "Built with a mission to help businesses grow through modern technology and digital solutions.", icon: Sparkles },
  { label: "Core Focus", value: "10+", desc: "Technology and digital service areas designed to support businesses at different stages of growth.", icon: Layers },
  { label: "Base", value: "India", desc: "Remote-first operations with a strong focus on businesses in Punjab, Chandigarh and beyond.", icon: MapPin },
  { label: "Ambition", value: "∞", desc: "Continuously learning, improving and building for the future.", icon: Target },
];

const journeySteps = [
  { year: "2023", title: "Zentrox Technologies Begins", desc: "Zentrox Technologies was founded with the goal of making modern technology and digital solutions more accessible to growing businesses.", bullets: ["Focus on custom digital solutions", "Started serving growing businesses"] },
  { year: "2024", title: "Expanding Digital Services", desc: "The company expanded its capabilities across websites, software, mobile applications, SEO and digital growth services.", bullets: ["Broader service portfolio", "Focus on scalable digital solutions"] },
  { year: "2025", title: "Technology & Growth Focus", desc: "Zentrox continued building stronger capabilities in modern web technology, software development, AI integration and digital growth.", bullets: ["Modern development workflows", "AI and automation exploration"] },
  { year: "2026", title: "Building for the Future", desc: "The focus continues on creating practical technology solutions, improving digital experiences and helping businesses grow online.", bullets: ["Future-ready technology", "Long-term business partnerships"] },
];

const coreValues = [
  { num: "01", title: "Build Real Solutions", desc: "We focus on practical technology that solves real business problems and creates measurable value.", icon: Shield },
  { num: "02", title: "Honest Communication", desc: "Clear communication, transparent expectations and straightforward collaboration are central to how we work.", icon: Users },
  { num: "03", title: "Long-Term Thinking", desc: "We aim to build technology and relationships that can continue supporting businesses as they grow.", icon: Award },
  { num: "04", title: "Continuous Learning", desc: "Technology evolves quickly, so we continuously explore new tools, frameworks and better ways to build.", icon: Zap },
  { num: "05", title: "Take Ownership", desc: "We believe in responsibility, attention to detail and taking pride in the quality of the work we deliver.", icon: CheckSquare },
  { num: "06", title: "Growth Through Technology", desc: "Our mission is to help businesses use technology, design and digital marketing to create stronger opportunities.", icon: Target },
];

const teamDepartments = [
  { category: "Leadership", icon: Trophy, color: "#f59e0b", members: [{ name: "Zentrox Leadership", role: "Business & Technology Strategy", initials: "ZT", badge: "LEADERSHIP", isPrimary: true }] },
  { category: "Development", icon: Monitor, color: "#3b82f6", members: [{ name: "Development Team", role: "Web, Software & Applications", initials: "DT", badge: "", isPrimary: false }] },
  { category: "Marketing & Design", icon: Megaphone, color: "#f97316", members: [{ name: "Creative Team", role: "SEO, Marketing & UI/UX", initials: "CT", badge: "", isPrimary: false }] },
  { category: "Quality & Support", icon: CheckSquare, color: "#10b981", members: [{ name: "Support Team", role: "Quality & Client Support", initials: "ST", badge: "", isPrimary: false }] },
];

const offices = [
  { city: "Mohali & Chandigarh", badge: "PRIMARY SERVICE REGION", title: "Punjab Region", address: "Mohali & Chandigarh, Punjab, India", email: "contact.zentroxtech@gmail.com", hours: "Mon–Fri: 9:00 AM – 6:30 PM IST", mapLink: "https://www.google.com/maps/search/?api=1&query=Mohali%20Punjab%20India" },
  { city: "Remote-First", badge: "REMOTE OPERATIONS", title: "Serving Clients Worldwide", address: "Remote-first team serving businesses across India and international markets", email: "contact.zentroxtech@gmail.com", hours: "Online support based on project requirements", mapLink: "https://www.google.com/maps/search/?api=1&query=Chandigarh%20Punjab%20India" },
];

export default function AboutClient() {
  const [activeYear, setActiveYear] = useState(journeySteps[0].year);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const year = entry.target.getAttribute("data-year");
            if (year) setActiveYear(year);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    stepRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#FDF8F3]">
      {/* HERO */}
      <section className="relative overflow-hidden px-4 pt-16 pb-10 text-center md:pt-20 lg:pt-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-4xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-700 shadow-sm">
            ABOUT ZENTROX TECHNOLOGIES
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl">
            Building Digital
            <br />
            <span className="text-blue-600">Solutions for Growth</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Zentrox Technologies is a technology and digital solutions company helping businesses build stronger digital experiences through websites, software, mobile apps, AI integration, SEO and digital marketing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="flex items-center gap-2 rounded-full border border-[#F0E6D8] bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              MSME Registered
            </span>
            <span className="flex items-center gap-2 rounded-full border border-[#F0E6D8] bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              Remote-First
            </span>
            <span className="flex items-center gap-2 rounded-full border border-[#F0E6D8] bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm">
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
            transition={{ duration: 0.6 }}
            className="space-y-6 lg:col-span-6"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
              <span className="h-px w-6 bg-blue-600" />
              Our Story
            </div>

            <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              More Than a Service Provider.
              <span className="block text-blue-600">A Technology Partner.</span>
            </h2>

            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Zentrox Technologies began in 2023 with a clear goal: help businesses access modern technology and digital solutions without unnecessary complexity.
            </p>

            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Our remote-first approach allows us to collaborate flexibly with businesses across Punjab, Chandigarh, India and international markets.
            </p>

            <div className="pt-2">
              <Link href="/contact" className="btn-primary">
                Work With Us
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="card-cream p-6"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={18} />
                  </div>
                  <div className="mb-1 text-3xl font-extrabold text-slate-900 md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mb-2 text-sm font-bold text-slate-700">
                    {stat.label}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-500">
                    {stat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="mx-auto max-w-7xl border-t border-[#F0E6D8] px-4 py-20 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
                <span className="h-px w-6 bg-blue-600" />
                Our Journey
              </div>
              <h2 className="text-4xl font-extrabold leading-tight text-slate-900">
                Building, Learning & Growing
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">
                Our journey is focused on continuous improvement, better technology and stronger digital solutions for growing businesses.
              </p>
              <div className="pt-8">
                <motion.div
                  key={activeYear}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-7xl font-black text-blue-600 xl:text-8xl"
                >
                  {activeYear}
                </motion.div>
              </div>
            </div>
          </div>

          <div className="relative space-y-12 border-l-2 border-[#F0E6D8] pl-6 sm:pl-10 lg:col-span-7">
            {journeySteps.map((step, idx) => (
              <motion.div
                key={step.year}
                ref={(el) => { stepRefs.current[idx] = el; }}
                data-year={step.year}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative"
              >
                <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-4 border-[#FDF8F3] bg-blue-600 transition-transform group-hover:scale-125 sm:-left-[47px] sm:h-5 sm:w-5" />
                <div className="mb-1 text-xs font-bold tracking-wider text-blue-600">
                  {step.year}
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 sm:text-xl">
                  {step.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  {step.desc}
                </p>
                <div className="space-y-2 rounded-xl border border-[#F0E6D8] bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md">
                  {step.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-center gap-2 text-sm text-slate-700">
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
      <section className="mx-auto max-w-7xl border-t border-[#F0E6D8] px-4 py-20 md:px-8">
        <div className="mx-auto mb-16 max-w-3xl space-y-3 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
            <span className="h-px w-6 bg-blue-600" />
            Our Culture
            <span className="h-px w-6 bg-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            The Values That Drive{" "}
            <span className="text-blue-600">Everything We Do</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="card-cream p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={20} />
                </div>
                <div className="mb-2 text-3xl font-extrabold text-blue-600">
                  {value.num}
                </div>
                <h3 className="mb-2 text-base font-bold text-slate-900">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {value.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-7xl border-t border-[#F0E6D8] px-4 py-20 md:px-8">
        <div className="mb-16 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
            <span className="h-px w-6 bg-blue-600" />
            Our Team
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            The People Behind <span className="text-blue-600">Zentrox</span>
          </h2>
          <p className="text-sm text-slate-600">
            Technology, creativity and problem-solving working together.
          </p>
        </div>

        <div className="space-y-12">
          {teamDepartments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div key={dept.category} className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-[#F0E6D8] pb-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${dept.color}15`, color: dept.color }}
                  >
                    <Icon size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                    {dept.category}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {dept.members.map((member) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -6 }}
                      className={`card-cream p-5 text-center ${member.isPrimary ? "border-blue-200 bg-blue-50/50" : ""}`}
                    >
                      {member.badge && (
                        <div className="mb-3">
                          <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-blue-700">
                            {member.badge}
                          </span>
                        </div>
                      )}
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md shadow-blue-600/20">
                        {member.initials}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {member.name}
                      </h4>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {member.role}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="mx-auto max-w-7xl border-t border-[#F0E6D8] px-4 py-20 md:px-8">
        <div className="mx-auto mb-16 max-w-3xl space-y-3 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
            <span className="h-px w-6 bg-blue-600" />
            Where We Work
            <span className="h-px w-6 bg-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Local Focus, <span className="text-blue-600">Global Reach</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {offices.map((office) => (
            <div
              key={office.city}
              className="card-cream flex flex-col overflow-hidden"
            >
              <div className="border-b border-[#F0E6D8] bg-blue-50/50 p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200/60 bg-blue-50 text-blue-600">
                  <Building2 size={22} />
                </div>
                <span className="inline-block rounded-full bg-white px-4 py-1 text-xs font-bold text-slate-800 shadow-sm">
                  {office.city}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between space-y-5 p-8">
                <div className="space-y-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600">
                    {office.badge}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {office.title}
                  </h3>
                  <p className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-blue-500" />
                    <span>{office.address}</span>
                  </p>
                  <p className="flex items-center gap-2.5 text-sm text-slate-600">
                    <Mail size={16} className="shrink-0 text-blue-500" />
                    <span>{office.email}</span>
                  </p>
                  <p className="flex items-center gap-2.5 text-sm text-slate-600">
                    <Clock size={16} className="shrink-0 text-blue-500" />
                    <span>{office.hours}</span>
                  </p>
                </div>

                <div className="pt-4">
                  <a
                    href={office.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#F0E6D8] px-6 py-2.5 text-xs font-semibold text-slate-700 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
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

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-blue-600 px-4 py-20 text-center text-white md:px-8">
        <div className="relative z-10 mx-auto max-w-4xl space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Ready to Build Something Better?
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-blue-100 sm:text-base">
            Whether you need a website, software, mobile application, AI integration or digital growth support, let's discuss your next project.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-slate-900 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Start Your Project
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="rounded-full border-2 border-white/40 px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

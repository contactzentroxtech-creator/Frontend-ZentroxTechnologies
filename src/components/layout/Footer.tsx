"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useLang } from "@/lib/providers";

const services = [
  "Website Development",
  "Mobile Apps",
  "SaaS Development",
  "AI Integration",
  "SEO Services",
  "Digital Marketing Services",
  "UI/UX Design",
  "Software Development",
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const learning = [
  { label: "All Courses", href: "/courses" },
  { label: "View Our Work", href: "/#classes" },
  { label: "Remote Internship", href: "/internship" },
  { label: "Student Dashboard", href: "/dashboard" },
  { label: "Verify Certificate", href: "/verify" },
];

const locations = [
  {
    label: "Web Development — Mohali",
    href: "/locations/web-development-mohali",
  },
  { label: "SEO — Chandigarh", href: "/locations/seo-chandigarh" },
  {
    label: "Software — Himachal Pradesh",
    href: "/locations/software-himachal",
  },
  {
    label: "Digital Marketing — Haryana",
    href: "/locations/digital-marketing-haryana",
  },
  {
    label: "App Development — Noida",
    href: "/locations/app-development-noida",
  },
];

const socialLinks = [
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "YouTube", icon: Youtube, href: "#" },
  { label: "Twitter / X", icon: Twitter, href: "#" },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative z-10 border-t border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-white/5 dark:bg-[#0b0f19]/90 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/Zentrox-Logo1.png"
                  alt="Zentrox Technologies Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                Zentrox
                <span className="text-blue-600 dark:text-blue-400">
                  Technologies
                </span>
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              MSME-registered technology company building futuristic digital
              solutions for growing businesses in India and worldwide.
            </p>

            <div className="flex flex-col gap-2 mb-6">
              <a
                href="mailto:contact.zentroxtech@gmail.com"
                className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
              >
                <Mail
                  size={15}
                  className="text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110"
                />
                contact.zentroxtech@gmail.com
              </a>
              <a
                href="tel:+918988183513"
                className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
              >
                <Phone
                  size={15}
                  className="text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110"
                />
                +91 89881 83513
              </a>
              <span className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                <MapPin size={15} className="text-blue-600 dark:text-blue-400" />
                Mohali & Chandigarh, Punjab
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full border border-slate-200/60 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-400/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md bg-white/60 dark:bg-white/5"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-4">
              {t("nav.services", "Services")}
            </h4>
            <ul className="flex flex-col gap-1.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-1.5">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-4">
              Learning
            </h4>
            <ul className="flex flex-col gap-1.5">
              {learning.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-4">
              Locations
            </h4>
            <ul className="flex flex-col gap-1.5">
              {locations.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-start gap-1.5 group"
                  >
                    <ArrowUpRight
                      size={13}
                      className="mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200/60 dark:border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center md:text-left">
            © {new Date().getFullYear()} Zentrox Technologies.{" "}
            {t("footer.copy", "All rights reserved. MSME Registered — India.")}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles size={12} className="text-blue-500" />
              {t("footer.msme", "Remote-first · Innovation-driven · MSME Registered")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

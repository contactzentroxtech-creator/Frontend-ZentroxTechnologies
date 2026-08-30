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
} from "lucide-react";
import { useLang } from "@/lib/providers";

const services = [
  "Website Development",
  "Mobile Apps",
  "SaaS Development",
  "AI Integration",
  "SEO Services",
  "Digital Marketing",
  "UI/UX Design",
  "Software Development",
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const learning = [
  { label: "All Courses", href: "/courses" },
  { label: "View Our Work", href: "/#work" },
  { label: "Student Dashboard", href: "/dashboard" },
  { label: "Verify Certificate", href: "/verify" },
];

const locations = [
  { label: "Web Development — Mohali", href: "/locations/web-development-mohali" },
  { label: "SEO — Chandigarh", href: "/locations/seo-chandigarh" },
  { label: "Software — Himachal Pradesh", href: "/locations/software-himachal" },
  { label: "Digital Marketing — Haryana", href: "/locations/digital-marketing-haryana" },
  { label: "App Development — Noida", href: "/locations/app-development-noida" },
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
    <footer className="border-t border-gray-200/80 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-6 md:px-6">
        {/* Main Grid */}
        <div className="mb-10 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5 lg:gap-10">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <Image
                src="/Zentrox-Logo1.png"
                alt="Zentrox Technologies Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
              <span className="text-lg font-semibold text-slate-900">
                Zentrox
                <span className="font-light text-slate-500">Technologies</span>
                <span className="ml-1 inline-block h-2 w-2 rounded-full bg-amber-600" />
              </span>
            </div>

            <p className="mb-4 text-sm leading-relaxed text-slate-500">
              MSME-registered technology company building digital solutions for growing businesses.
            </p>

            <div className="mb-6 flex flex-col gap-1.5 text-sm text-slate-500">
              <a
                href="mailto:contact.zentroxtech@gmail.com"
                className="flex items-center gap-2.5 transition-colors hover:text-slate-900"
              >
                <Mail size={15} className="text-amber-600" />
                contact.zentroxtech@gmail.com
              </a>
              <a
                href="tel:+918988183513"
                className="flex items-center gap-2.5 transition-colors hover:text-slate-900"
              >
                <Phone size={15} className="text-amber-600" />
                +91 89881 83513
              </a>
              <span className="flex items-center gap-2.5">
                <MapPin size={15} className="text-amber-600" />
                Mohali & Chandigarh, Punjab
              </span>
            </div>

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
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-slate-400 transition-all hover:border-gray-300 hover:text-slate-900"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
              {t("nav.services")}
            </h4>
            <ul className="flex flex-col gap-1.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
              Company
            </h4>
            <ul className="flex flex-col gap-1.5">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning */}
          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
              Learning
            </h4>
            <ul className="flex flex-col gap-1.5">
              {learning.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
              Locations
            </h4>
            <ul className="flex flex-col gap-1.5">
              {locations.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-start gap-1 text-sm text-slate-500 transition-colors hover:text-slate-900"
                  >
                    <ArrowUpRight
                      size={12}
                      className="mt-0.5 flex-shrink-0 text-amber-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200/60 pt-6 md:flex-row">
          <p className="text-center text-xs text-slate-400 md:text-left">
            &copy; {new Date().getFullYear()} Zentrox Technologies.{" "}
            {t("footer.copy")}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
              {t("footer.msme")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image"; // 1. Imported Next.js Image component
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
  "website development",
  "Mobile Apps",
  "SaaS Development",
  "AI Integration",
  "SEO Services",
  "Digital Marketing Services",
  "UI/UX Design",
  "software development service",
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
  { label: "Saturday Live Classes", href: "/#classes" },
  { label: "Remote Internship", href: "/internship" },
  { label: "Student Dashboard", href: "/dashboard" },
  { label: "Verify Certificate", href: "/verify" },
];

const locations = [
  {
    label: "website development — Mohali",
    href: "/locations/web-development-mohali",
  },
  { label: "SEO Company — Chandigarh", href: "/locations/seo-chandigarh" },
  {
    label: "Software — Himachal Pradesh",
    href: "/locations/software-himachal",
  },
  {
    label: "Digital Marketing Services — Haryana",
    href: "/locations/digital-marketing-haryana",
  },
  {
    label: "App Development — Noida",
    href: "/locations/app-development-noida",
  },
];

// Added social media links array (Replace # with your actual URLs)
const socialLinks = [
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "YouTube", icon: Youtube, href: "#" },
  { label: "Twitter / Discord", icon: Twitter, href: "#" },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative z-10 border-t border-z-border bg-[rgba(4,5,10,0.95)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              {/* 2. Swapped the ZT box for the Image component */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                <Image
                  src="/Zentrox-Logo1.png" // Path to your file in the public folder
                  alt="Zentrox Technologies Logo"
                  width={52}
                  height={52}
                  className="object-contain"
                  priority // Ensures logo loads immediately without layout shifts
                />
              </div>
              <span className="font-extrabold text-md text-z-text">
                Zentrox<span className="text-z-accent"> Technologies</span>
              </span>
            </div>

            <p className="text-sm text-z-muted leading-relaxed mb-4">
              MSME-registered technology company building futuristic digital
              solutions for growing businesses.
            </p>

            <div className="flex flex-col gap-2 mb-6">
              <a
                href="mailto:contact.zentroxtech@gmail.com"
                className="flex items-center gap-2 text-xs text-z-muted hover:text-z-text transition-colors"
              >
                <Mail size={13} className="text-z-accent" />
                contact.zentroxtech@gmail.com
              </a>
              <a
                href="tel:+918988183513"
                className="flex items-center gap-2 text-xs text-z-muted hover:text-z-text transition-colors"
              >
                <Phone size={13} className="text-z-accent" />
                +91 89881 83513
              </a>
              <span className="flex items-center gap-2 text-xs text-z-muted">
                <MapPin size={13} className="text-z-accent" />
                Mohali & Chandigarh, Punjab
              </span>
            </div>

            {/* Added Social Media Section */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-8 h-8 rounded-full border border-z-border flex items-center justify-center text-z-muted hover:text-z-accent hover:border-z-accent transition-all duration-300"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-z-muted mb-4">
              {t("nav.services", "Services")}
            </h4>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-sm text-z-muted hover:text-z-text transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-z-muted mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-sm text-z-muted hover:text-z-text transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-z-muted mb-4">
              Learning
            </h4>
            <ul className="flex flex-col gap-2">
              {learning.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-z-muted hover:text-z-text transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-z-muted mb-4">
              Locations
            </h4>
            <ul className="flex flex-col gap-2">
              {locations.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-xs text-z-muted hover:text-z-text transition-colors flex items-start gap-1"
                  >
                    <ArrowUpRight
                      size={11}
                      className="mt-0.5 flex-shrink-0 text-z-accent"
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-z-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-z-muted text-center md:text-left">
            © {new Date().getFullYear()} Zentrox Technologies.{" "}
            {t("footer.copy", "All rights reserved. MSME Registered — India.")}
          </p>
          <div className="flex items-center gap-1 text-xs text-z-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-z-accent3 animate-pulse-glow" />
            {t(
              "footer.msme",
              "Remote-first · Innovation-driven · MSME Registered"
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

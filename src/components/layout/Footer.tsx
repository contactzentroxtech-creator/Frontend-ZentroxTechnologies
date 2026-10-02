"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
} from "lucide-react";

const services = [
  { label: "Website Development", href: "/services#web" },
  { label: "Mobile App Development", href: "/services#android" },
  { label: "Custom Software", href: "/services#software" },
  { label: "UI/UX Design", href: "/services#design" },
  { label: "SEO & Digital Marketing", href: "/services#seo" },
  { label: "AI Integration", href: "/services#ai" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "YouTube", icon: Youtube, href: "#" },
  { label: "Twitter", icon: Twitter, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 md:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-10">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="mb-5 flex items-center gap-2.5">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-md shadow-blue-500/30">
                <span className="text-lg font-black text-white">Z</span>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0f172a] bg-gradient-to-br from-blue-300 to-purple-300" />
              </div>
              <span className="flex flex-col leading-none">
                <span className="text-base font-extrabold text-white">
                  ZENTROX
                </span>
                <span className="text-[9px] font-semibold tracking-[0.15em] text-slate-400">
                  TECHNOLOGIES
                </span>
              </span>
            </Link>

            <p className="mb-2 text-sm font-medium text-blue-400">
              Software &amp; Digital Growth Partner
            </p>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-400">
              Zentrox Technologies is an MSME-registered technology company
              building custom software, websites, mobile apps and digital
              growth solutions for businesses in India and worldwide.
            </p>

            {/* Contact Info */}
            <div className="mb-6 flex flex-col gap-2.5 text-sm">
              <a
                href="mailto:contact.zentroxtech@gmail.com"
                className="flex items-center gap-3 text-slate-400 transition-colors hover:text-white"
              >
                <Mail size={15} className="text-blue-400" />
                contact.zentroxtech@gmail.com
              </a>
              <a
                href="tel:+918988183513"
                className="flex items-center gap-3 text-slate-400 transition-colors hover:text-white"
              >
                <Phone size={15} className="text-blue-400" />
                +91 89881 83513
              </a>
              <span className="flex items-center gap-3 text-slate-400">
                <MapPin size={15} className="text-blue-400" />
                Mohali &amp; Chandigarh, Punjab
              </span>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:text-white"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-white">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-400 transition-colors hover:text-blue-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-white">
              Our Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-slate-400 transition-colors hover:text-blue-400"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-white">
              Locations
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
              <li>Mohali, Punjab</li>
              <li>Chandigarh, India</li>
              <li>Punjab &amp; Haryana</li>
              <li>Delhi NCR</li>
              <li>India &amp; Worldwide</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-center text-xs text-slate-500 md:text-left">
            &copy; {new Date().getFullYear()} Zentrox Technologies. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <Link
              href="/privacy"
              className="transition-colors hover:text-blue-400"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-700">|</span>
            <Link
              href="/terms"
              className="transition-colors hover:text-blue-400"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              MSME Registered
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

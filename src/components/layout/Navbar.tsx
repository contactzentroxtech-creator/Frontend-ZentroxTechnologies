"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-300 md:px-6 lg:px-8">
      <nav
        className={`mx-auto flex h-[68px] max-w-7xl items-center justify-between rounded-full border border-slate-200/70 bg-white px-3 transition-all duration-300 sm:px-4 md:px-6 ${
          scrolled
            ? "shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
            : "shadow-[0_4px_20px_rgba(15,23,42,0.05)]"
        }`}
      >
        {/* ═══════ LOGO — ORIGINAL IMAGE + FULL NAME ═══════ */}
        <Link href="/" className="flex flex-shrink-0 items-center gap-2.5">
          <Image
            src="/Zentrox-Logo1.png"
            alt="Zentrox Technologies Logo"
            width={40}
            height={40}
            priority
            className="h-9 w-auto object-contain md:h-10"
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-[14px] font-extrabold tracking-tight text-slate-900">
              ZENTROX
            </span>
            <span className="text-[9px] font-semibold tracking-[0.15em] text-slate-500">
              TECHNOLOGIES
            </span>
          </span>
        </Link>

        {/* ═══════ DESKTOP NAV ═══════ */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${
                isActive(link.href)
                  ? "text-blue-600"
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="navbar-active"
                  className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-blue-600"
                />
              )}
            </Link>
          ))}
        </div>

        {/* ═══════ CTA BUTTON ═══════ */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
          >
            Get Started
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* ═══════ MOBILE MENU BUTTON ═══════ */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* ═══════ MOBILE MENU ═══════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-xl lg:hidden"
          >
            <div className="px-5 py-5">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-5 border-t border-slate-100 pt-5">
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20"
                >
                  Get Started <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

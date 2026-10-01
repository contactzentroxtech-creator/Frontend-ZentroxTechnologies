"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useLang } from "@/lib/providers";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();
  const { t } = useLang();
  const { user, logout, fetchMe, initialized } = useAuthStore();

  useEffect(() => {
    if (!initialized) {
      fetchMe();
    }
  }, [initialized, fetchMe]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: t("nav.home", "Home"), href: "/" },
    { label: t("nav.about", "About"), href: "/about" },
    { label: t("nav.services", "Services"), href: "/services" },
    { label: t("nav.portfolio", "Portfolio"), href: "/portfolio" },
    { label: t("nav.pricing", "Pricing"), href: "/pricing" },
    { label: t("nav.blog", "Blog"), href: "/blog" },
    { label: t("nav.contact", "Contact"), href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-4 px-4 md:px-6 lg:px-8 transition-all duration-300">
      <nav
        className={`
          mx-auto flex h-[68px] max-w-7xl items-center justify-between
          rounded-full
          border border-slate-200/70
          bg-white
          px-3 sm:px-4 md:px-6
          transition-all duration-300
          ${
            scrolled
              ? "shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
              : "shadow-[0_4px_20px_rgba(15,23,42,0.05)]"
          }
        `}
      >
        {/* ─── LOGO ───────────────────────────────────────── */}
        <Link
          href="/"
          className="flex flex-shrink-0 items-center gap-2"
          aria-label="Zentrox Technologies Home"
        >
          <Image
            src="/Zentrox-Logo1.png"
            alt="Zentrox Technologies Logo"
            width={38}
            height={38}
            priority
            className="h-8 w-auto object-contain md:h-9"
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-[15px] font-extrabold tracking-tight text-slate-900">
              ZENTROX
            </span>
            <span className="text-[9px] font-semibold tracking-[0.15em] text-slate-500">
              TECHNOLOGIES
            </span>
          </span>
        </Link>

        {/* ─── DESKTOP NAV ────────────────────────────────── */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ${
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
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* ─── DESKTOP ACTIONS ────────────────────────────── */}
        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">
                {user.name?.split(" ")[0]}
              </span>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={async () => {
                  await logout();
                  window.location.href = "/";
                }}
                className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/contact"
              className="
                group inline-flex items-center gap-1.5
                rounded-full bg-blue-600
                px-5 py-2.5
                text-[13px] font-semibold text-white
                shadow-md shadow-blue-600/20
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-blue-700
                hover:shadow-lg hover:shadow-blue-600/30
              "
            >
              {t("nav.get_started", "Get Started")}
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </div>

        {/* ─── MOBILE MENU BUTTON ─────────────────────────── */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* ─── MOBILE MENU ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="
              mx-auto mt-3 max-w-7xl overflow-hidden
              rounded-3xl border border-slate-200/70
              bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)]
              lg:hidden
            "
          >
            <div className="px-5 py-5">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {user?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="rounded-xl px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50"
                  >
                    Admin Panel
                  </Link>
                )}
              </div>

              <div className="mt-5 border-t border-slate-200 pt-5">
                {user ? (
                  <button
                    onClick={async () => {
                      await logout();
                      window.location.href = "/";
                    }}
                    className="w-full rounded-full border border-slate-200 py-3 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/contact"
                    className="
                      flex w-full items-center justify-center gap-2
                      rounded-full bg-blue-600
                      py-3 text-center text-sm font-semibold text-white
                      shadow-md shadow-blue-600/20
                    "
                  >
                    {t("nav.get_started", "Get Started")}
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

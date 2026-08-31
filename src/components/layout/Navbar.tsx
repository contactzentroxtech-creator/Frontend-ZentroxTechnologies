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
    { label: "Home", href: "/" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-sm backdrop-blur-md border-b border-gray-100"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group relative z-10 flex flex-shrink-0 items-center gap-2"
        >
          <Image
            src="/Zentrox-Logo1.png"
            alt="Zentrox Technologies"
            width={36}
            height={36}
            priority
            className="relative"
          />
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            Zentrox<span className="font-light text-slate-500">Technologies</span>
            <span className="ml-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors relative ${
                isActive(link.href) ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-600 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">
                {user.name?.split(" ")[0]}
              </span>
              <button
                onClick={async () => {
                  await logout();
                  window.location.href = "/";
                }}
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-md"
              >
                {t("nav.get_started")}
                <ArrowRight size={15} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/80 text-slate-700 transition-all hover:border-gray-300 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-gray-100 bg-white lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-6">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive(link.href) ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-gray-50 hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 border-t border-gray-100 pt-6">
                {user ? (
                  <button
                    onClick={async () => {
                      await logout();
                      window.location.href = "/";
                    }}
                    className="w-full rounded-lg border border-gray-200 py-3 text-center text-sm font-medium text-slate-700 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/auth/login"
                      className="rounded-lg border border-gray-200 py-3 text-center text-sm font-medium text-slate-700 hover:bg-gray-50"
                    >
                      Login
                    </Link>
                    <Link
                      href="/contact"
                      className="rounded-lg bg-blue-600 py-3 text-center text-sm font-medium text-white hover:bg-blue-700"
                    >
                      {t("nav.get_started")}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

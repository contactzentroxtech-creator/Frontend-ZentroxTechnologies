"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useLang } from "@/lib/providers";
import { useAuthStore } from "@/store/authStore";

type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLang();
  const { user, logout, fetchMe, initialized } = useAuthStore();

  useEffect(() => {
    if (!initialized) fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const isAdmin = user?.role === "admin";

  // ENGLISH ONLY + INTERNSHIP REMOVED
  const navLinks = useMemo<NavLink[]>(
    () => [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Courses", href: "/courses" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    []
  );

  const isActive = (href: string) =>
    href === "/"
      ? pathname === href
      : pathname.startsWith(href.split("#")[0]) &&
        href.split("#")[0].length > 1;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/92 dark:bg-z-dark2/92 backdrop-blur-2xl border-b border-slate-200/80 dark:border-z-border shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
          : "bg-white/60 dark:bg-z-dark/40 backdrop-blur-md"
      }`}
    >
      {/* Premium subtle gradient line */}
      <div
        className={`absolute bottom-0 left-0 h-[1px] w-full transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        } bg-gradient-to-r from-transparent via-blue-400/50 to-transparent`}
      />

      <nav className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-[72px]">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group flex-shrink-0"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <Image
              src="/Zentrox-Logo1.png"
              alt="Zentrox Technologies"
              width={42}
              height={42}
              priority
              className="relative drop-shadow-[0_4px_10px_rgba(37,99,235,0.22)] group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <span className="font-extrabold text-[17px] tracking-tight whitespace-nowrap">
            <span className="text-slate-900 dark:text-z-text">
              Zentrox
            </span>{" "}
            <span className="text-z-accent">Technologies</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/5">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(link.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-z-muted hover:text-slate-900 dark:hover:text-z-text transition-colors">
                  {link.label}

                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      dropdownOpen === link.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute top-full left-0 mt-3 w-52 bg-white/95 dark:bg-z-dark3/95 backdrop-blur-xl border border-slate-200 dark:border-z-border py-2 rounded-2xl shadow-2xl overflow-hidden"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-3 text-sm font-medium text-slate-600 dark:text-z-muted hover:text-blue-600 dark:hover:text-z-text hover:bg-blue-50 dark:hover:bg-white/5 transition-all"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-blue-700 dark:text-white bg-white dark:bg-white/10 shadow-sm"
                    : "text-slate-600 dark:text-z-muted hover:text-blue-700 dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/5"
                }`}
              >
                {link.label}

                {isActive(link.href) && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-z-accent"
                  />
                )}
              </Link>
            )
          )}
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle compact />

          {user ? (
            <div
              className="relative"
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <button
                onMouseEnter={() => setUserMenuOpen(true)}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-2 py-1.5 pr-3 rounded-full border border-slate-200 dark:border-z-border bg-white/80 dark:bg-white/5 hover:border-blue-300 dark:hover:border-z-accent/40 hover:shadow-sm transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-z-accent to-z-accent2 flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
                  {user.name?.[0]?.toUpperCase()}
                </div>

                <span className="text-sm font-semibold text-slate-800 dark:text-z-text max-w-[100px] truncate">
                  {user.name.split(" ")[0]}
                </span>

                <ChevronDown
                  size={13}
                  className="text-slate-400 dark:text-z-muted"
                />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-3 w-56 bg-white/98 dark:bg-z-dark3/98 backdrop-blur-xl border border-slate-200 dark:border-z-border py-2 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-z-border mb-1">
                      <div className="text-sm font-bold text-slate-900 dark:text-z-text truncate">
                        {user.name}
                      </div>

                      <div className="text-[11px] text-z-accent capitalize font-semibold mt-0.5">
                        {user.role}
                      </div>
                    </div>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-slate-600 dark:text-z-muted hover:text-blue-700 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-white/5 transition-all"
                      >
                        <ShieldCheck size={16} className="text-z-accent" />
                        Admin Panel
                      </Link>
                    )}

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-slate-600 dark:text-z-muted hover:text-blue-700 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-white/5 transition-all"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-slate-600 dark:text-z-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 transition-all"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-3 py-2 text-sm font-semibold text-slate-600 dark:text-z-muted hover:text-blue-700 dark:hover:text-z-text transition-colors"
              >
                Login
              </Link>

              <Link
                href="/contact"
                className="group flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-full bg-gradient-to-r from-z-accent to-blue-500 text-white hover:shadow-[0_8px_25px_rgba(37,99,235,0.28)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <Sparkles
                  size={15}
                  className="group-hover:rotate-12 transition-transform"
                />
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-z-border bg-white/80 dark:bg-white/5 text-slate-700 dark:text-z-muted hover:border-blue-300 transition-all"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-3 right-3 mt-2 overflow-hidden rounded-2xl bg-white/98 dark:bg-z-dark3/98 backdrop-blur-2xl border border-slate-200 dark:border-z-border shadow-2xl"
          >
            <div className="p-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive(link.href)
                        ? "bg-blue-50 dark:bg-white/10 text-blue-700 dark:text-white"
                        : "text-slate-700 dark:text-z-muted hover:bg-slate-50 dark:hover:bg-white/5 hover:text-blue-700 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>

                  {link.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-6 py-2 text-sm text-slate-500 dark:text-z-muted hover:text-blue-700"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-z-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Appearance
                  </span>
                  <ThemeToggle compact />
                </div>

                {user ? (
                  <div className="flex flex-col gap-2">
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center justify-center gap-2 py-3 text-sm font-bold border border-z-accent/30 text-z-accent rounded-xl"
                      >
                        <ShieldCheck size={16} />
                        Admin Panel
                      </Link>
                    )}

                    <Link
                      href="/dashboard"
                      className="text-center py-3 text-sm font-bold border border-slate-200 dark:border-z-border rounded-xl text-slate-700 dark:text-z-muted"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="text-center py-3 text-sm font-bold text-red-500 border border-red-200 dark:border-red-500/20 rounded-xl"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/auth/login"
                      className="text-center py-3 text-sm font-bold border border-slate-200 dark:border-z-border rounded-xl text-slate-700 dark:text-z-muted"
                    >
                      Login
                    </Link>

                    <Link
                      href="/contact"
                      className="text-center py-3 text-sm font-bold bg-z-accent text-white rounded-xl shadow-sm"
                    >
                      Get Started
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

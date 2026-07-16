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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle, LangSwitcher } from "@/components/ui/ThemeToggle";
import { useLang } from "@/lib/providers";
import { useAuthStore } from "@/store/authStore";

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

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const isAdmin = user?.role === "admin";

  const navLinks = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: t("nav.services"), href: "/services" },
      // {
      //   label: t("nav.courses"),
      //   href: "/courses",
      //   children: [
      //     { label: t("nav.courses"), href: "/courses" },
      //     { label: t("classes.title").split("—")[0].trim(), href: "/#classes" },
      //     { label: "Student Dashboard", href: "/dashboard" },
      //   ],
      // },
      { label: t("nav.internship"), href: "/internship" },
      { label: t("nav.blog"), href: "/blog" },
      { label: t("nav.about"), href: "/about" },
      { label: t("nav.contact"), href: "/contact" },
    ],
    [t]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === href
      : pathname.startsWith(href.split("#")[0]) &&
        href.split("#")[0].length > 1;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-z-dark3/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-z-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-[68px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <Image
            src="/Zentrox-Logo1.png"
            alt="Zentrox Logo"
            width={42}
            height={42}
            className="filter drop-shadow-[0_0_8px_rgba(59,123,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(59,123,255,0.6)] transition-all duration-300"
          />
          <span className="font-extrabold text-lg tracking-tight">
            {/* Added fallback text colors for light modes */}
            <span className="text-slate-900 dark:text-z-text">Zentrox </span>
            <span className="text-z-accent">Technologies</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(link.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-z-muted hover:text-slate-900 dark:hover:text-z-text transition-colors">
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
                      className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-z-dark3 border border-slate-200 dark:border-z-border py-2 rounded-xl shadow-xl overflow-hidden"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-slate-600 dark:text-z-muted hover:text-slate-900 dark:hover:text-z-text hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
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
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-slate-900 dark:text-z-text font-semibold"
                    : "text-slate-600 dark:text-z-muted hover:text-slate-900 dark:hover:text-z-text"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Right Action Items */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle compact />
          <LangSwitcher />

          {user ? (
            <div
              className="relative"
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <button
                onMouseEnter={() => setUserMenuOpen(true)}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-z-border bg-white dark:bg-transparent hover:border-z-accent/40 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-z-accent to-z-accent2 flex items-center justify-center text-white text-[10px] font-bold">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm font-medium text-slate-800 dark:text-z-text max-w-[100px] truncate">
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDown
                  size={12}
                  className="text-slate-400 dark:text-z-muted"
                />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-z-dark3 border border-slate-200 dark:border-z-border py-2 rounded-xl shadow-xl overflow-hidden"
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-z-border mb-1">
                      <div className="text-sm font-semibold text-slate-900 dark:text-z-text truncate">
                        {user.name}
                      </div>
                      <div className="text-[11px] text-z-accent capitalize">
                        {user.role}
                      </div>
                    </div>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 dark:text-z-muted hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                      >
                        <ShieldCheck size={15} className="text-z-accent" />{" "}
                        Admin Panel
                      </Link>
                    )}
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 dark:text-z-muted hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 dark:text-z-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 transition-colors"
                    >
                      <LogOut size={15} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-slate-600 dark:text-z-muted hover:text-slate-900 dark:hover:text-z-text transition-colors"
              >
                {t("nav.login")}
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2 text-sm font-semibold rounded-full bg-z-accent text-white hover:bg-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {t("nav.get_started")}
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-slate-600 dark:text-z-muted hover:text-slate-900 dark:hover:text-z-text transition-colors p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Sidebar/Dropdown Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-white dark:bg-z-dark3 border-b border-slate-200 dark:border-z-border shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className="block py-3 text-sm font-medium text-slate-700 dark:text-z-muted hover:text-slate-900 dark:hover:text-z-text transition-colors border-b border-slate-100 dark:border-z-border"
                  >
                    {link.label}
                  </Link>
                  {link.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-2 pl-4 text-sm text-slate-500 dark:text-z-muted hover:text-slate-900 dark:hover:text-z-text transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="flex items-center gap-3 mt-4">
                <LangSwitcher />
                <ThemeToggle />
              </div>

              {user ? (
                <div className="flex flex-col gap-2 mt-4">
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 py-2.5 px-4 text-sm font-semibold border border-z-accent/30 text-z-accent rounded-full justify-center"
                    >
                      <ShieldCheck size={15} /> Admin Panel
                    </Link>
                  )}
                  <Link
                    href="/dashboard"
                    className="flex-1 text-center py-2.5 text-sm font-semibold border border-slate-200 dark:border-z-border rounded-full text-slate-600 dark:text-z-muted hover:text-z-text transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex-1 text-center py-2.5 text-sm font-semibold text-red-500 border border-red-200 dark:border-red-500/20 rounded-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 mt-4">
                  <Link
                    href="/auth/login"
                    className="flex-1 text-center py-2.5 text-sm font-semibold border border-slate-200 dark:border-z-border rounded-full text-slate-600 dark:text-z-muted transition-colors"
                  >
                    {t("nav.login")}
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 text-center py-2.5 text-sm font-semibold bg-z-accent text-white rounded-full"
                  >
                    {t("nav.get_started")}
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

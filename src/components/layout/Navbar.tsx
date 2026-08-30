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
  ArrowRight,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useLang } from "@/lib/providers";
import { useAuthStore } from "@/store/authStore";

type NavLink = {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
  }[];
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

  // Fetch logged-in user
  useEffect(() => {
    if (!initialized) {
      fetchMe();
    }
  }, [initialized, fetchMe]);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setDropdownOpen(null);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const isAdmin = user?.role === "admin";

  // Navigation links - INTERNSHIP REMOVED
  const navLinks = useMemo<NavLink[]>(
    () => [
      {
        label: "Home",
        href: "/",
      },
      {
        label: t("nav.services"),
        href: "/services",
      },
      {
        label: t("nav.blog"),
        href: "/blog",
      },
      {
        label: t("nav.about"),
        href: "/about",
      },
      {
        label: t("nav.contact"),
        href: "/contact",
      },
    ],
    [t]
  );

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href.split("#")[0]);
  };

  // Variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -6 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50 transition-all duration-500
        ${
          scrolled
            ? `
              border-b border-slate-200/60
              bg-white/75 shadow-[0_4px_30px_rgba(0,0,0,0.04)]
              backdrop-blur-xl supports-backdrop-blur:bg-white/70
              dark:border-white/8
              dark:bg-[#14161b]/80
              dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)]
            `
            : "bg-transparent"
        }
      `}
    >
      {/* Accent glow line - subtle decorative element */}
      {scrolled && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
        />
      )}

      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 md:px-6">
        {/* ================= LOGO ================= */}
        <Link
          href="/"
          className="group relative z-10 flex flex-shrink-0 items-center gap-2.5"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative"
          >
            <div className="absolute inset-0 scale-110 rounded-full bg-blue-500/15 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <Image
              src="/Zentrox-Logo1.png"
              alt="Zentrox Technologies"
              width={44}
              height={44}
              priority
              className="relative"
            />
          </motion.div>

          <span className="hidden text-[18px] font-extrabold tracking-tight sm:block">
            <span className="text-slate-900 dark:text-white">Zentrox</span>
            <span className="text-blue-600 dark:text-blue-400">
              Technologies
            </span>
          </span>
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="hidden items-center gap-0.5 lg:flex"
        >
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(link.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <motion.button
                  variants={itemVariants}
                  className={`
                    flex items-center gap-1 rounded-full px-4 py-2
                    text-sm font-medium text-slate-600
                    transition-all duration-300
                    hover:bg-slate-100/70 hover:text-slate-950
                    dark:text-slate-400
                    dark:hover:bg-white/[0.06] dark:hover:text-white
                  `}
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      dropdownOpen === link.label ? "rotate-180" : ""
                    }`}
                  />
                </motion.button>

                <AnimatePresence>
                  {dropdownOpen === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="
                        absolute left-0 top-full mt-2 w-52
                        overflow-hidden rounded-2xl
                        border border-slate-200/60
                        bg-white/90 p-1.5 shadow-xl
                        backdrop-blur-xl
                        dark:border-white/8
                        dark:bg-[#1b1e24]/95
                      "
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="
                            block rounded-xl px-4 py-2.5
                            text-sm text-slate-600
                            transition-all
                            hover:bg-blue-50/70 hover:text-blue-600
                            dark:text-slate-400
                            dark:hover:bg-white/[0.05] dark:hover:text-blue-300
                          "
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div key={link.label} variants={itemVariants}>
                <Link
                  href={link.href}
                  className={`
                    relative rounded-full px-4 py-2
                    text-sm font-medium transition-all duration-300
                    ${
                      isActive(link.href)
                        ? `
                          bg-blue-50/80 text-blue-700
                          shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]
                          dark:bg-blue-500/10 dark:text-blue-300
                        `
                        : `
                          text-slate-600 hover:bg-slate-100/70
                          hover:text-slate-950
                          dark:text-slate-400 dark:hover:bg-white/[0.06]
                          dark:hover:text-white
                        `
                    }
                  `}
                >
                  {link.label}
                  {/* Active indicator dot instead of line */}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="navbar-active-dot"
                      className="absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-blue-600 dark:bg-blue-400"
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                </Link>
              </motion.div>
            )
          )}
        </motion.div>

        {/* ================= DESKTOP ACTIONS ================= */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle compact />

          {user ? (
            <div
              className="relative"
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={() => setUserMenuOpen(true)}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="
                  flex items-center gap-2 rounded-full
                  border border-slate-200/60 bg-white/60
                  py-1.5 pl-1.5 pr-3
                  shadow-sm backdrop-blur-md
                  transition-all duration-300
                  hover:border-blue-300/60 hover:shadow-md
                  dark:border-white/8 dark:bg-white/[0.04]
                "
              >
                <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-[10px] font-bold text-white shadow-sm shadow-blue-500/20">
                  {user.name?.[0]?.toUpperCase()}
                  <span className="absolute inset-0 rounded-full ring-2 ring-white/30" />
                </div>
                <span className="max-w-[90px] truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {user.name?.split(" ")[0]}
                </span>
                <ChevronDown size={13} className="text-slate-400" />
              </motion.button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="
                      absolute right-0 top-full mt-3 w-56
                      overflow-hidden rounded-2xl
                      border border-slate-200/60
                      bg-white/90 p-1.5 shadow-xl
                      backdrop-blur-xl
                      dark:border-white/8
                      dark:bg-[#1b1e24]/95
                    "
                  >
                    {/* User Info */}
                    <div className="mb-1 border-b border-slate-100 px-3 py-2.5 dark:border-white/8">
                      <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium capitalize text-blue-600 dark:text-blue-400">
                        {user.role}
                      </p>
                    </div>

                    {/* Admin */}
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="
                          flex items-center gap-2.5 rounded-xl px-3 py-2.5
                          text-sm text-slate-600 transition-colors
                          hover:bg-blue-50/70 hover:text-blue-600
                          dark:text-slate-400
                          dark:hover:bg-white/[0.05] dark:hover:text-blue-300
                        "
                      >
                        <ShieldCheck size={16} className="text-blue-600" />
                        Admin Panel
                      </Link>
                    )}

                    {/* Dashboard */}
                    <Link
                      href="/dashboard"
                      className="
                        flex items-center gap-2.5 rounded-xl px-3 py-2.5
                        text-sm text-slate-600 transition-colors
                        hover:bg-slate-50/70 hover:text-slate-900
                        dark:text-slate-400
                        dark:hover:bg-white/[0.05] dark:hover:text-white
                      "
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="
                        flex w-full items-center gap-2.5 rounded-xl
                        px-3 py-2.5 text-sm text-slate-600
                        transition-colors
                        hover:bg-red-50/70 hover:text-red-600
                        dark:text-slate-400
                        dark:hover:bg-red-500/10
                      "
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
                className="
                  px-3 py-2 text-sm font-medium text-slate-600
                  transition-colors hover:text-slate-950
                  dark:text-slate-400 dark:hover:text-white
                "
              >
                Login
              </Link>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="
                    group flex items-center gap-2 rounded-full
                    bg-blue-600 px-5 py-2.5
                    text-sm font-semibold text-white
                    shadow-lg shadow-blue-500/25
                    transition-all duration-300
                    hover:-translate-y-0.5 hover:bg-blue-700
                    hover:shadow-xl hover:shadow-blue-500/30
                  "
                >
                  {t("nav.get_started")}
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-full border border-slate-200/60
            bg-white/60 text-slate-700
            shadow-sm backdrop-blur-md
            transition-all hover:border-blue-300/60
            dark:border-white/8 dark:bg-white/[0.04]
            dark:text-slate-200
            lg:hidden
          "
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="
              overflow-hidden border-t border-slate-200/60
              bg-white/90 shadow-xl backdrop-blur-xl
              dark:border-white/8 dark:bg-[#14161b]/95
              lg:hidden
            "
          >
            <div className="mx-auto max-w-7xl px-4 py-5">
              {/* Mobile Navigation */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex flex-col gap-1"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    variants={itemVariants}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className={`
                        flex items-center justify-between rounded-xl
                        px-4 py-3 text-sm font-semibold
                        transition-all
                        ${
                          isActive(link.href)
                            ? "bg-blue-50/80 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                            : "text-slate-600 hover:bg-slate-50/70 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-white"
                        }
                      `}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                      )}
                    </Link>

                    {link.children?.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="
                          ml-4 mt-1 block rounded-lg
                          px-4 py-2 text-sm
                          text-slate-500
                          hover:bg-slate-50/70 hover:text-blue-600
                          dark:text-slate-400 dark:hover:bg-white/[0.05]
                        "
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                ))}
              </motion.div>

              {/* Theme */}
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-white/8">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Appearance
                </span>
                <ThemeToggle />
              </div>

              {/* Logged In User */}
              {user ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-5 flex flex-col gap-2"
                >
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="
                        flex items-center justify-center gap-2
                        rounded-full border border-blue-200/60
                        py-3 text-sm font-semibold text-blue-600
                        dark:border-blue-500/20 dark:text-blue-300
                      "
                    >
                      <ShieldCheck size={16} />
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    href="/dashboard"
                    className="
                      flex items-center justify-center gap-2
                      rounded-full border border-slate-200/60
                      py-3 text-sm font-semibold text-slate-700
                      dark:border-white/10 dark:text-slate-300
                    "
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="
                      flex items-center justify-center gap-2
                      rounded-full border border-red-200/60
                      py-3 text-sm font-semibold text-red-600
                      dark:border-red-500/20
                    "
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-5 grid grid-cols-2 gap-3"
                >
                  <Link
                    href="/auth/login"
                    className="
                      rounded-full border border-slate-200/60
                      py-3 text-center text-sm font-semibold
                      text-slate-700
                      dark:border-white/10 dark:text-slate-300
                    "
                  >
                    Login
                  </Link>
                  <Link
                    href="/contact"
                    className="
                      flex items-center justify-center gap-2
                      rounded-full bg-blue-600 py-3
                      text-sm font-semibold text-white
                      shadow-lg shadow-blue-500/20
                    "
                  >
                    Get Started
                    <ArrowRight size={15} />
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

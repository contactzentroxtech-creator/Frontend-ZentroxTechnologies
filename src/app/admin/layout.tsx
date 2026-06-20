"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Briefcase,
  Award,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  MessageSquare,
  Layers,
  Image,
  ChevronRight,
  Megaphone,
  Globe,
  Languages,
  Calculator,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads / CRM", icon: MessageSquare },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/internship", label: "Internship", icon: Briefcase },
  {
    href: "/admin/certificate-portal",
    label: "Certificate Portal",
    icon: Award,
  },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/cms", label: "CMS / Content", icon: Layers },
  { href: "/admin/translations", label: "Translations", icon: Languages },
  { href: "/admin/pricing", label: "Pricing Manager", icon: Calculator },
  { href: "/admin/popups", label: "Popups & Offers", icon: Megaphone },
  { href: "/admin/media", label: "Media Manager", icon: Image },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, fetchMe, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    // FIX: Wrap in try/catch, show meaningful error if backend is unreachable
    (async () => {
      try {
        await fetchMe();
        const u = useAuthStore.getState().user;
        if (!u) {
          router.push("/auth/login?redirect=/admin");
          return;
        }
        if (u.role !== "admin") {
          router.push("/dashboard");
          return;
        }
        setAuthChecked(true);
      } catch {
        setAuthError(
          "Could not connect to server. Is the backend running on port 5000?"
        );
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const isActive = (item: (typeof NAV_ITEMS)[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  // Show error state if backend unreachable
  if (authError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-z-dark gap-4 px-4 text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-xl">
          !
        </div>
        <h2 className="text-lg font-bold text-z-text">Backend Unreachable</h2>
        <p className="text-sm text-z-muted max-w-sm">{authError}</p>
        <code className="text-xs bg-z-dark3 px-3 py-1.5 rounded-lg text-z-accent border border-z-border">
          cd zentrox/backend && npm run dev
        </code>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-5 py-2 rounded-full bg-z-accent text-white text-sm font-semibold hover:bg-blue-500 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-z-dark">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-z-accent/30 border-t-z-accent rounded-full animate-spin" />
          <p className="text-xs text-z-muted">Verifying access…</p>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-z-border">
        <div className="w-8 h-8 rounded-lg bg-z-accent flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          ZT
        </div>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <div className="font-extrabold text-sm text-z-text whitespace-nowrap">
                Admin Panel
              </div>
              <div className="text-[10px] text-z-muted whitespace-nowrap">
                Zentrox Technologies
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-z-accent/15 border border-z-accent/30 text-z-text"
                    : "text-z-muted hover:text-z-text hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon
                  size={17}
                  className={
                    active
                      ? "text-z-accent"
                      : "text-z-muted group-hover:text-z-text"
                  }
                />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {active && sidebarOpen && (
                  <ChevronRight size={13} className="ml-auto text-z-accent" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User + Logout */}
      <div className="border-t border-z-border p-3">
        <div
          className={`flex items-center gap-3 px-2 py-2 mb-1 ${
            !sidebarOpen ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-z-accent to-z-accent2 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.name?.[0]?.toUpperCase() || "A"}
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden flex-1 min-w-0"
              >
                <div className="text-sm font-semibold text-z-text truncate">
                  {user?.name}
                </div>
                <div className="text-[10px] text-z-accent capitalize">
                  {user?.role}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-z-muted hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 ${
            !sidebarOpen ? "justify-center" : ""
          }`}
        >
          <LogOut size={16} />
          {sidebarOpen && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-z-dark overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="hidden md:flex flex-col border-r border-z-border bg-z-dark2 flex-shrink-0 overflow-hidden"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-z-dark2 border-r border-z-border z-50 md:hidden flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="flex items-center justify-between px-4 md:px-6 h-14 border-b border-z-border bg-z-dark2 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-z-muted hover:text-z-text"
            >
              <Menu size={20} />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:block text-z-muted hover:text-z-text transition-colors"
            >
              <Menu size={18} />
            </button>
            <div className="text-sm font-semibold text-z-text">
              {NAV_ITEMS.find((i) => isActive(i))?.label || "Admin"}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-z-muted hover:text-z-text transition-colors"
            >
              <Globe size={14} /> View Site
            </Link>
            <div className="text-xs font-medium px-2.5 py-1 rounded-full bg-z-accent/15 text-z-accent border border-z-accent/25">
              {user?.role === "admin" ? "Super Admin" : "Admin"}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

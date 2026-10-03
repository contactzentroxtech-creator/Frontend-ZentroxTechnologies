"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  MessageSquare,
  Layers,
  Image as ImageIcon,
  ChevronRight,
  Megaphone,
  Globe,
  Calculator,
  UserCheck,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

/* ═══════════════════════════════════════════════════════════════
   ADMIN NAV ITEMS — Final List (11 items)
   ❌ Removed: Users, Internship, Certificate Portal, Translations
   ✅ Added: Referral Codes
═══════════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads / CRM", icon: MessageSquare },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/portfolio", label: "Portfolio", icon: Layers },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/cms", label: "CMS / Content", icon: BookOpen },
  { href: "/admin/pricing", label: "Pricing Manager", icon: Calculator },
  { href: "/admin/popups", label: "Popups & Offers", icon: Megaphone },
  { href: "/admin/media", label: "Media Manager", icon: ImageIcon },
  { href: "/admin/referrals", label: "Referral Codes", icon: UserCheck },
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
          "Could not connect to server. Please check your connection."
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

  /* ─── Auth Error Screen ─── */
  if (authError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 text-xl font-bold">
          !
        </div>
        <h2 className="text-lg font-bold text-slate-900">Connection Error</h2>
        <p className="text-sm text-slate-600 max-w-sm">{authError}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  /* ─── Loading Screen ─── */
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-xs text-slate-500">Verifying access…</p>
        </div>
      </div>
    );
  }

  /* ─── Sidebar Content (Desktop + Mobile shared) ─── */
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-200">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white p-1 flex-shrink-0">
          <Image
            src="/Zentrox-Logo1.png"
            alt="Zentrox Technologies"
            width={32}
            height={32}
            className="h-7 w-7 object-contain"
          />
        </div>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <div className="font-extrabold text-sm text-slate-900 whitespace-nowrap">
                Admin Panel
              </div>
              <div className="text-[10px] text-slate-500 whitespace-nowrap">
                Zentrox Technologies
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
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
                    ? "bg-blue-50 border border-blue-200 text-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
                }`}
              >
                <Icon
                  size={17}
                  className={
                    active
                      ? "text-blue-600"
                      : "text-slate-500 group-hover:text-slate-900"
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
                  <ChevronRight size={13} className="ml-auto text-blue-600" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User + Logout */}
      <div className="border-t border-slate-200 p-3">
        <div
          className={`flex items-center gap-3 px-2 py-2 mb-1 ${
            !sidebarOpen ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
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
                <div className="text-sm font-semibold text-slate-900 truncate">
                  {user?.name}
                </div>
                <div className="text-[10px] text-blue-600 capitalize">
                  {user?.role}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 ${
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
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* ─── Desktop Sidebar ─── */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="hidden md:flex flex-col border-r border-slate-200 bg-white flex-shrink-0 overflow-hidden"
      >
        <SidebarContent />
      </motion.aside>

      {/* ─── Mobile Sidebar ─── */}
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
              className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 z-50 md:hidden flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ─── Main Content ─── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="flex items-center justify-between px-4 md:px-6 h-14 border-b border-slate-200 bg-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-slate-500 hover:text-slate-900"
            >
              <Menu size={20} />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:block text-slate-500 hover:text-slate-900 transition-colors"
            >
              <Menu size={18} />
            </button>
            <div className="text-sm font-semibold text-slate-900">
              {NAV_ITEMS.find((i) => isActive(i))?.label || "Admin"}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors"
            >
              <Globe size={14} /> View Site
            </Link>
            <div className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {user?.role === "admin" ? "Super Admin" : "Admin"}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="text-slate-900">{children}</div>
        </main>
      </div>
    </div>
  );
}

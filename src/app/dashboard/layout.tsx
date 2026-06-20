"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Navbar from "@/components/layout/Navbar";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/courses", label: "My Courses", icon: BookOpen },
  { href: "/dashboard/internship", label: "Internship", icon: Briefcase },
  { href: "/dashboard/certificates", label: "Certificates", icon: Award },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, fetchMe, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    fetchMe().then(() => {
      const u = useAuthStore.getState().user;
      if (!u) {
        router.push("/auth/login");
        return;
      }
      if (u.role === "admin") {
        router.push("/admin");
        return;
      }
      setAuthChecked(true);
    });
  }, []);

  if (!authChecked)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-z-accent/30 border-t-z-accent rounded-full animate-spin" />
      </div>
    );

  const isActive = (item: (typeof NAV)[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const SidebarLinks = () => (
    <div className="flex flex-col gap-0.5 p-3">
      {NAV.map((item) => {
        const Icon = item.icon;
        const active = isActive(item);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              active
                ? "bg-z-accent/15 border border-z-accent/30 text-white"
                : "text-z-muted hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <Icon size={16} className={active ? "text-z-accent" : ""} />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16 md:pt-[68px] flex min-h-[calc(100vh-68px)]">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col w-56 border-r border-z-border bg-z-dark2 flex-shrink-0">
          <div className="p-4 border-b border-z-border">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-z-accent to-z-accent2 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white truncate">
                  {user?.name}
                </div>
                <div className="text-xs text-z-muted capitalize">
                  {user?.role}
                </div>
              </div>
            </div>
          </div>
          <SidebarLinks />
          <div className="mt-auto p-3 border-t border-z-border">
            <button
              onClick={async () => {
                await logout();
                router.push("/");
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-z-muted hover:text-red-400 hover:bg-red-500/5 transition-all text-sm"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="md:hidden fixed top-16 left-0 right-0 z-30 flex items-center justify-between px-4 py-2 bg-z-dark2 border-b border-z-border">
          <span className="text-sm font-semibold text-white">
            {NAV.find((n) => isActive(n))?.label || "Dashboard"}
          </span>
          <button onClick={() => setMobileOpen(true)} className="text-z-muted">
            <Menu size={20} />
          </button>
        </div>

        {/* Mobile sidebar */}
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
              <motion.div
                initial={{ x: -240 }}
                animate={{ x: 0 }}
                exit={{ x: -240 }}
                className="fixed left-0 top-0 bottom-0 w-60 bg-z-dark2 border-r border-z-border z-50 flex flex-col md:hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-z-border">
                  <span className="font-bold text-white">Dashboard</span>
                  <button onClick={() => setMobileOpen(false)}>
                    <X size={18} className="text-z-muted" />
                  </button>
                </div>
                <SidebarLinks />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 overflow-auto pt-10 md:pt-0">{children}</main>
      </div>
    </div>
  );
}

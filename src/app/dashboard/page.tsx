"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Award,
  Briefcase,
  TrendingUp,
  LogOut,
  User,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface DashboardData {
  stats: {
    coursesEnrolled: number;
    coursesCompleted: number;
    internshipsApplied: number;
    internshipsActive: number;
    certificatesEarned: number;
  };
  enrollments: any[];
  applications: any[];
  certificates: any[];
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending Review", color: "text-z-gold" },
  "test-pending": { label: "Test Pending", color: "text-z-accent" },
  "test-passed": { label: "Test Passed", color: "text-z-accent3" },
  "test-failed": { label: "Test Failed", color: "text-red-400" },
  accepted: { label: "Accepted", color: "text-z-accent3" },
  active: { label: "Active", color: "text-z-accent3" },
  completed: { label: "Completed", color: "text-z-accent3" },
  rejected: { label: "Rejected", color: "text-red-400" },
};

export default function DashboardPage() {
  const { user, logout, fetchMe } = useAuthStore();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    });
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data: res } = await api.get("/users/dashboard");
        setData(res.data);
      } catch {
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchDashboard();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-z-accent/30 border-t-z-accent rounded-full animate-spin" />
      </div>
    );

  const STAT_CARDS = [
    {
      label: "Courses Enrolled",
      value: data?.stats.coursesEnrolled || 0,
      icon: BookOpen,
      color: "#3b7bff",
    },
    {
      label: "Completed",
      value: data?.stats.coursesCompleted || 0,
      icon: CheckCircle2,
      color: "#06d6a0",
    },
    {
      label: "Internships",
      value: data?.stats.internshipsApplied || 0,
      icon: Briefcase,
      color: "#7c3aed",
    },
    {
      label: "Certificates",
      value: data?.stats.certificatesEarned || 0,
      icon: Award,
      color: "#f59e0b",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-24 pb-20 px-4 md:px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="z-badge mb-2">Dashboard</div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Welcome back, {user?.name?.split(" ")[0]}
              </h1>
              <p className="text-z-muted text-sm mt-1">{user?.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/settings"
                className="p-2.5 glass-card rounded-xl text-z-muted hover:text-white transition-colors"
              >
                <User size={18} />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2.5 glass-card rounded-xl text-z-muted hover:text-red-400 transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {STAT_CARDS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card p-5"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      background: `${s.color}18`,
                      border: `1px solid ${s.color}30`,
                    }}
                  >
                    <Icon size={20} style={{ color: s.color }} />
                  </div>
                  <div className="text-3xl font-extrabold text-white">
                    {s.value}
                  </div>
                  <div className="text-xs text-z-muted mt-1">{s.label}</div>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enrolled Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white">My Courses</h2>
                <Link
                  href="/courses"
                  className="text-xs text-z-accent hover:underline flex items-center gap-1"
                >
                  Browse more <ArrowRight size={11} />
                </Link>
              </div>
              {data?.enrollments.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen size={32} className="text-z-muted mx-auto mb-3" />
                  <p className="text-z-muted text-sm">
                    No courses enrolled yet.
                  </p>
                  <Link
                    href="/courses"
                    className="mt-3 inline-block text-xs text-z-accent hover:underline"
                  >
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {data?.enrollments.slice(0, 4).map((e: any) => (
                    <div
                      key={e._id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-z-border"
                    >
                      <div className="w-9 h-9 rounded-lg bg-z-accent/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen size={16} className="text-z-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">
                          {e.course?.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-z-accent rounded-full"
                              style={{ width: `${e.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-z-muted whitespace-nowrap">
                            {e.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Internship Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white">
                  Internship Applications
                </h2>
                <Link
                  href="/internship"
                  className="text-xs text-z-accent hover:underline flex items-center gap-1"
                >
                  Apply <ArrowRight size={11} />
                </Link>
              </div>
              {data?.applications.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase size={32} className="text-z-muted mx-auto mb-3" />
                  <p className="text-z-muted text-sm">
                    No internship applications yet.
                  </p>
                  <Link
                    href="/internship"
                    className="mt-3 inline-block text-xs text-z-accent hover:underline"
                  >
                    View Internships
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {data?.applications.slice(0, 4).map((app: any) => {
                    const sc = STATUS_CONFIG[app.status] || {
                      label: app.status,
                      color: "text-z-muted",
                    };
                    return (
                      <div
                        key={app._id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-z-border"
                      >
                        <div className="w-9 h-9 rounded-lg bg-z-accent2/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase size={16} className="text-z-accent2" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white truncate">
                            {app.internship?.title}
                          </div>
                          <div
                            className={`text-xs font-medium mt-0.5 ${sc.color}`}
                          >
                            {sc.label}
                          </div>
                        </div>
                        {app.aptitudeScore !== undefined && (
                          <div className="text-right">
                            <div className="text-xs text-z-muted">Score</div>
                            <div className="text-sm font-bold text-white">
                              {app.aptitudeScore}%
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* Certificates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6 lg:col-span-2"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white">My Certificates</h2>
                <Link
                  href="/verify"
                  className="text-xs text-z-accent hover:underline"
                >
                  Verify Certificate
                </Link>
              </div>
              {data?.certificates.length === 0 ? (
                <div className="text-center py-8">
                  <Award size={32} className="text-z-muted mx-auto mb-3" />
                  <p className="text-z-muted text-sm">
                    Complete a course or internship to earn certificates.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data?.certificates.map((cert: any) => (
                    <div
                      key={cert._id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-z-gold/20 bg-z-gold/5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-z-gold/15 border border-z-gold/30 flex items-center justify-center flex-shrink-0">
                        <Award size={20} className="text-z-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">
                          {cert.courseName || cert.internshipRole}
                        </div>
                        <div className="text-xs text-z-muted mt-0.5">
                          {cert.type} ·{" "}
                          {new Date(cert.issuedAt).toLocaleDateString("en-IN")}
                        </div>
                      </div>
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-z-accent hover:underline flex-shrink-0"
                      >
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Clock,
  MapPin,
  Users,
  Award,
  FileText,
  Check,
  ChevronRight,
} from "lucide-react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

const DOMAIN_COLORS: Record<string, string> = {
  "web-dev": "#3b7bff",
  fullstack: "#3b7bff",
  mobile: "#7c3aed",
  "ai-ml": "#06d6a0",
  seo: "#f59e0b",
  design: "#ec4899",
  "digital-marketing": "#f59e0b",
};

interface Internship {
  _id: string;
  title: string;
  slug: string;
  description: string;
  domain: string;
  duration: string;
  type: string;
  stipend: number;
  isPaid: boolean;
  requirements: string[];
  tasks: { title: string; description: string; order: number }[];
  maxSlots: number;
  filledSlots: number;
  skillsRequired: string[];
  aptitudeTestRequired: boolean;
  minAptitudeScore: number;
  certificate: boolean;
  offerLetter: boolean;
  startDate?: string;
}

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Apply Online",
    desc: "Fill out the application form for your chosen domain.",
  },
  {
    step: "02",
    title: "Aptitude Test",
    desc: "Complete a 30-minute online test to assess your skills.",
  },
  {
    step: "03",
    title: "Get Selected",
    desc: "Top scorers receive an offer letter within 48 hours.",
  },
  {
    step: "04",
    title: "Complete Tasks",
    desc: "Work on real projects under mentor guidance (remote).",
  },
  {
    step: "05",
    title: "Earn Certificates",
    desc: "Get completion certificate + recommendation letter.",
  },
];

function InternshipCard({ internship }: { internship: Internship }) {
  const [applying, setApplying] = useState(false);
  const { user } = useAuthStore();
  const color = DOMAIN_COLORS[internship.domain] || "#3b7bff";
  const spotsLeft = internship.maxSlots - internship.filledSlots;

  const isPaidInternship =
    internship.stipend && String(internship.stipend).toLowerCase() !== "unpaid";

  const handleApply = async () => {
    if (!user) {
      toast.error("Please login to apply.");
      return;
    }
    setApplying(true);
    try {
      const res = await api.post(`/internship/${internship._id}/apply`);
      if (res.data?.success) {
        toast.success(
          res.data.message || "Application submitted successfully!"
        );
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Application failed.");
    } finally {
      setApplying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6 flex flex-col hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        >
          <Briefcase size={22} style={{ color }} />
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
              isPaidInternship
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                : "bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-z-muted border border-zinc-200 dark:border-z-border"
            }`}
          >
            {isPaidInternship ? internship.stipend : "Unpaid"}
          </span>
          {spotsLeft <= 5 && spotsLeft > 0 && (
            <span className="text-[10px] text-red-500 dark:text-red-400 font-medium">
              {spotsLeft} spots left
            </span>
          )}
          {spotsLeft <= 0 && (
            <span className="text-[10px] text-zinc-400 dark:text-z-muted font-medium">
              Slots full
            </span>
          )}
        </div>
      </div>

      <h3 className="font-bold text-zinc-900 dark:text-white mb-1">
        {internship.title}
      </h3>
      <div className="flex flex-wrap gap-3 mb-3">
        <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-z-muted">
          <Clock size={11} /> {internship.duration}
        </span>
        <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-z-muted">
          <MapPin size={11} /> {internship.type}
        </span>
        <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-z-muted">
          <Users size={11} /> {internship.maxSlots} slots
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5 mt-2">
        {(internship.skillsRequired || []).slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-z-border text-zinc-600 dark:text-z-muted"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-auto mb-4 border-t border-zinc-100 dark:border-white/5 pt-3">
        <div className="flex items-center gap-1 text-[10px] text-zinc-600 dark:text-z-muted">
          <Award size={10} className="text-amber-500 dark:text-z-gold" />{" "}
          Verifiable Certificate
        </div>
        <div className="flex items-center gap-1 text-[10px] text-zinc-600 dark:text-z-muted">
          <FileText size={10} className="text-blue-500 dark:text-z-accent" />{" "}
          Offer Letter
        </div>
        {internship.aptitudeTestRequired && (
          <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
            <Check size={10} /> Requires Screening Test
          </div>
        )}
      </div>

      <button
        onClick={handleApply}
        disabled={applying || spotsLeft <= 0}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed shadow-md hover:brightness-110 text-white"
        style={{
          backgroundColor: spotsLeft <= 0 ? "rgba(120,120,120,0.2)" : color,
          color: spotsLeft <= 0 ? "#71717a" : "#fff",
        }}
      >
        {applying ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : spotsLeft <= 0 ? (
          "Slots Full"
        ) : (
          <>
            <Briefcase size={14} /> Apply Now
          </>
        )}
      </button>
    </motion.div>
  );
}

export default function InternshipClient() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/internship")
      .then((res) => {
        if (res.data && res.data.success) {
          setInternships(res.data.data || []);
        }
      })
      .catch((err) => {
        console.error("Failed downloading operational catalog details:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative z-10 bg-zinc-50 dark:bg-transparent min-h-screen text-zinc-900 dark:text-zinc-100">
      {/* Hero */}
      <section className="py-24 px-4 md:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-blue-500/10 dark:bg-z-accent2 opacity-[0.06] blur-[120px]" />
        </div>
        <div className="max-w-3xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="z-badge mx-auto mb-5 bg-blue-50 dark:bg-zinc-800 text-blue-600 dark:text-zinc-300 border border-blue-100 dark:border-zinc-700">
              Remote Internship Program
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight mb-5">
              Build Real Experience.
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Earn Real Certificates.
              </span>
            </h1>
            <p className="text-base text-zinc-600 dark:text-z-muted max-w-xl mx-auto leading-relaxed mb-8">
              Zentrox Technologies remote internship program gives you
              real-world project experience, mentorship, aptitude assessment,
              and verifiable certificates to kickstart your career.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "100% Remote",
                "Certificate + Offer Letter",
                "Mentor Guidance",
                "Real Projects",
              ].map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900/50 text-sm text-zinc-600 dark:text-z-muted border border-zinc-200 dark:border-zinc-800 shadow-sm"
                >
                  <Check size={13} className="text-emerald-500" /> {f}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 md:px-6 bg-zinc-100 dark:bg-[#080c15]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white">
              How It Works
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center relative"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-z-accent/10 border border-blue-500/20 dark:border-z-accent/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-sm font-extrabold text-blue-600 dark:text-z-accent">
                    {s.step}
                  </span>
                </div>
                {i < PROCESS_STEPS.length - 1 && (
                  <ChevronRight
                    size={16}
                    className="absolute right-0 top-3 text-zinc-300 dark:text-z-border hidden md:block"
                  />
                )}
                <div className="text-xs font-bold text-zinc-900 dark:text-white mb-1">
                  {s.title}
                </div>
                <div className="text-[11px] text-zinc-500 dark:text-z-muted leading-relaxed">
                  {s.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship listings */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="z-badge mb-3 bg-blue-50 dark:bg-zinc-800 text-blue-600 dark:text-zinc-300 border border-blue-100 dark:border-zinc-700 inline-block">
              Open Positions
            </div>
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
              Current Internship Openings
            </h2>
          </motion.div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-zinc-900/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 animate-pulse space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-zinc-200 dark:bg-white/5" />
                  <div className="h-4 bg-zinc-200 dark:bg-white/5 rounded" />
                  <div className="h-3 bg-zinc-200 dark:bg-white/5 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : internships.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
              <Briefcase
                size={48}
                className="text-zinc-300 dark:text-z-muted mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                No open positions currently
              </h3>
              <p className="text-zinc-500 dark:text-z-muted text-sm mb-5">
                Check back soon or contact us to express interest.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all"
              >
                Express Interest <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {internships.map((i) => (
                <InternshipCard key={i._id} internship={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dashboard CTA */}
      <section className="py-16 px-4 md:px-6 bg-zinc-100 dark:bg-[#080c15] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-3">
            Already Applied?
          </h2>
          <p className="text-zinc-600 dark:text-z-muted text-sm mb-6">
            Track your application status, complete tasks, and download your
            certificates from your dashboard.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-md"
          >
            View Dashboard <ArrowRight size={15} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

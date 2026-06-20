'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Briefcase, CheckCircle2, Clock, AlertCircle, ArrowRight, FileText, Award } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface Application {
  _id: string;
  status: string;
  aptitudeScore?: number;
  aptitudeAttempted: boolean;
  progress: number;
  completedAt?: string;
  startedAt?: string;
  createdAt: string;
  offerLetterSent: boolean;
  completionCertSent: boolean;
  internship: {
    _id: string;
    title: string;
    domain: string;
    duration: string;
    slug: string;
  };
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  pending: { label: 'Pending Review', color: 'text-z-muted', bg: 'bg-slate-500/15', icon: Clock },
  'test-pending': { label: 'Test Required', color: 'text-z-accent', bg: 'bg-z-accent/15', icon: AlertCircle },
  'test-passed': { label: 'Test Passed', color: 'text-z-accent3', bg: 'bg-z-accent3/15', icon: CheckCircle2 },
  'test-failed': { label: 'Test Not Passed', color: 'text-red-400', bg: 'bg-red-500/15', icon: AlertCircle },
  accepted: { label: 'Accepted', color: 'text-purple-400', bg: 'bg-purple-500/15', icon: CheckCircle2 },
  active: { label: 'Active', color: 'text-green-400', bg: 'bg-green-500/15', icon: CheckCircle2 },
  completed: { label: 'Completed', color: 'text-z-accent3', bg: 'bg-z-accent3/15', icon: Award },
  rejected: { label: 'Rejected', color: 'text-red-400', bg: 'bg-red-500/15', icon: AlertCircle },
};

export default function DashboardInternshipPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/internship/my/applications')
      .then(({ data }) => setApplications(data.data))
      .catch(() => toast.error('Failed to load applications'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-white">My Internship Applications</h1>
          <p className="text-sm text-z-muted">{applications.length} applications</p>
        </div>
        <Link href="/internship"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-z-accent text-white text-sm font-semibold">
          Browse Internships <ArrowRight size={14} />
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-z-accent/30 border-t-z-accent rounded-full animate-spin" />
        </div>
      ) : applications.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <Briefcase size={40} className="text-z-muted mx-auto mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">No applications yet</h2>
          <p className="text-z-muted text-sm mb-6">Apply for a remote internship to build real-world experience.</p>
          <Link href="/internship" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-z-accent text-white text-sm font-semibold">
            View Internships
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((app, i) => {
            const sc = STATUS_CONFIG[app.status] || STATUS_CONFIG.pending;
            const StatusIcon = sc.icon;
            return (
              <motion.div key={app._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-5">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-z-accent2/15 border border-z-accent2/25 flex items-center justify-center flex-shrink-0">
                      <Briefcase size={22} className="text-z-accent2" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white">{app.internship?.title}</h3>
                      <p className="text-sm text-z-muted mt-0.5">
                        {app.internship?.domain} · {app.internship?.duration} · Remote
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${sc.bg} ${sc.color}`}>
                          <StatusIcon size={11} /> {sc.label}
                        </span>
                        {app.aptitudeScore !== undefined && (
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${app.aptitudeScore >= 60 ? 'bg-z-accent3/15 text-z-accent3' : 'bg-red-500/15 text-red-400'}`}>
                            Test: {app.aptitudeScore}%
                          </span>
                        )}
                        {app.offerLetterSent && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-z-gold/15 text-z-gold flex items-center gap-1">
                            <FileText size={10} /> Offer Sent
                          </span>
                        )}
                        {app.completionCertSent && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-z-accent3/15 text-z-accent3 flex items-center gap-1">
                            <Award size={10} /> Certificate Issued
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 text-right">
                    <span className="text-xs text-z-muted">
                      Applied: {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                    </span>
                    {app.status === 'test-pending' && (
                      <Link href={`/internship/${app.internship?.slug}`}
                        className="text-xs px-4 py-2 rounded-xl bg-z-accent text-white font-semibold hover:bg-blue-500 transition-colors">
                        Take Test
                      </Link>
                    )}
                    {app.status === 'active' && (
                      <div className="flex flex-col items-end gap-1">
                        <div className="text-xs text-z-muted">Progress</div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-z-accent3 rounded-full" style={{ width: `${app.progress}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-z-accent3">{app.progress}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Info box */}
      <div className="glass-card p-5 mt-6">
        <h3 className="text-sm font-bold text-white mb-2">Internship Process</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { step: '1', label: 'Apply', desc: 'Submit your application' },
            { step: '2', label: 'Test', desc: 'Complete aptitude test' },
            { step: '3', label: 'Active', desc: 'Complete assigned tasks' },
            { step: '4', label: 'Certificate', desc: 'Receive your certificate' },
          ].map(s => (
            <div key={s.step} className="p-3 rounded-xl bg-white/5 border border-z-border text-center">
              <div className="w-7 h-7 rounded-full bg-z-accent/20 text-z-accent text-xs font-bold flex items-center justify-center mx-auto mb-1.5">{s.step}</div>
              <div className="text-xs font-semibold text-white">{s.label}</div>
              <div className="text-[10px] text-z-muted mt-0.5">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

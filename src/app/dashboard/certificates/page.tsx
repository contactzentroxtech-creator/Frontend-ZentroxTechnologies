'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Award, Download, ExternalLink, Shield, Calendar, Search } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface Certificate {
  _id: string;
  certificateId: string;
  type: string;
  courseName?: string;
  internshipRole?: string;
  issuedBy: string;
  issuedAt: string;
  pdfUrl?: string;
  qrCodeUrl?: string;
  verifyUrl?: string;
  isValid: boolean;
}

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  course: { label: 'Course Completion', color: 'text-z-accent', bg: 'bg-z-accent/10' },
  internship: { label: 'Internship', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  'offer-letter': { label: 'Offer Letter', color: 'text-z-gold', bg: 'bg-z-gold/10' },
  completion: { label: 'Completion', color: 'text-z-accent3', bg: 'bg-z-accent3/10' },
  recommendation: { label: 'Recommendation', color: 'text-green-400', bg: 'bg-green-500/10' },
};

export default function DashboardCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/certificates/my')
      .then(({ data }) => setCertificates(data.data))
      .catch(() => toast.error('Failed to load certificates'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = certificates.filter(c =>
    (c.courseName || c.internshipRole || '')
      .toLowerCase().includes(search.toLowerCase()) ||
    c.certificateId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-white">My Certificates</h1>
          <p className="text-sm text-z-muted">{certificates.length} certificates earned</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-z-muted" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search..." className="z-input pl-9 text-sm w-44" />
          </div>
          <Link href="/verify"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-z-border text-z-muted text-sm hover:text-white transition-colors">
            <Shield size={14} /> Verify
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-z-accent/30 border-t-z-accent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <Award size={40} className="text-z-muted mx-auto mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">No certificates yet</h2>
          <p className="text-z-muted text-sm mb-6">Complete a course or internship to earn your first certificate.</p>
          <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-z-accent text-white text-sm font-semibold">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((cert, i) => {
            const tc = TYPE_CONFIG[cert.type] || TYPE_CONFIG.course;
            return (
              <motion.div key={cert._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-5 flex flex-col gap-4 border-z-gold/20 hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-z-gold/15 border border-z-gold/30 flex items-center justify-center flex-shrink-0">
                    <Award size={24} className="text-z-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${tc.bg} ${tc.color}`}>
                      {tc.label}
                    </span>
                    <h3 className="font-bold text-white mt-1.5 leading-snug">
                      {cert.courseName || cert.internshipRole || 'Zentrox Technologies'}
                    </h3>
                    <p className="text-xs text-z-muted mt-0.5">{cert.issuedBy}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-z-muted">
                    <Calendar size={12} />
                    {new Date(cert.issuedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1.5 text-z-muted font-mono">
                    <Shield size={12} className="text-z-accent" />
                    <span className="text-z-accent truncate">{cert.certificateId}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-z-border">
                  {cert.pdfUrl && (
                    <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-z-accent text-white text-xs font-semibold hover:bg-blue-500 transition-colors">
                      <Download size={12} /> Download PDF
                    </a>
                  )}
                  <Link href={`/verify/${cert.certificateId}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-z-border text-z-muted text-xs font-semibold hover:text-white hover:border-z-accent transition-colors">
                    <ExternalLink size={12} /> Verify
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {certificates.length > 0 && (
        <div className="glass-card p-4 mt-4 flex items-start gap-3">
          <Shield size={15} className="text-z-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs text-z-muted leading-relaxed">
            All certificates are digitally verified with a unique QR code. Share your certificate ID or verification URL with employers to validate authenticity.
            Verified at: <span className="text-z-accent">zentroxtech.com/verify/[certificate-id]</span>
          </p>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, XCircle, Download, Shield, Calendar, User, Building2, ExternalLink } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

interface CertData {
  certificateId: string;
  type: string;
  recipientName: string;
  courseName?: string;
  internshipRole?: string;
  issuedBy: string;
  issuedAt: string;
  pdfUrl?: string;
  qrCodeUrl?: string;
}

const TYPE_LABELS: Record<string, string> = {
  course: 'Certificate of Completion',
  internship: 'Internship Completion Certificate',
  'offer-letter': 'Offer Letter',
  completion: 'Certificate of Completion',
  recommendation: 'Letter of Recommendation',
};

export default function VerifyClient({ certId }: { certId: string }) {
  const [data, setData] = useState<{ valid: boolean; data: CertData } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const verify = async () => {
      try {
        const { data: res } = await api.get(`/certificates/verify/${certId}`);
        setData(res);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Certificate not found or invalid.');
      }
      setLoading(false);
    };
    if (certId) verify();
  }, [certId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-z-accent/30 border-t-z-accent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-z-muted text-sm">Verifying certificate...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative z-10 py-20 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="z-badge mx-auto mb-4">Certificate Verification</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Verify Authenticity</h1>
          <p className="text-z-muted text-sm">Zentrox Technologies — Official Certificate Registry</p>
        </div>

        {error ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 text-center border-red-500/20">
            <div className="w-16 h-16 rounded-full bg-red-500/15 border border-red-500/25 flex items-center justify-center mx-auto mb-5">
              <XCircle size={32} className="text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Certificate Not Found</h2>
            <p className="text-z-muted text-sm mb-6">{error}</p>
            <div className="p-3 rounded-xl bg-white/5 border border-z-border text-xs font-mono text-z-muted mb-6 break-all">
              ID: {certId}
            </div>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-z-accent text-white text-sm font-semibold hover:bg-blue-500 transition-colors">
              Contact Zentrox Technologies
            </Link>
          </motion.div>
        ) : data ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className={`glass-card p-8 ${data.valid ? 'border-z-accent3/30' : 'border-red-500/20'}`}>
            {/* Status */}
            <div className={`flex items-center gap-3 p-4 rounded-xl mb-6 ${
              data.valid ? 'bg-z-accent3/10 border border-z-accent3/20' : 'bg-red-500/10 border border-red-500/20'
            }`}>
              {data.valid ? (
                <CheckCircle2 size={24} className="text-z-accent3 flex-shrink-0" />
              ) : (
                <XCircle size={24} className="text-red-400 flex-shrink-0" />
              )}
              <div>
                <div className={`font-bold text-sm ${data.valid ? 'text-z-accent3' : 'text-red-400'}`}>
                  {data.valid ? 'CERTIFICATE VERIFIED' : 'CERTIFICATE REVOKED'}
                </div>
                <div className="text-xs text-z-muted mt-0.5">
                  {data.valid ? 'This certificate is authentic and issued by Zentrox Technologies' : 'This certificate has been revoked'}
                </div>
              </div>
              <Shield size={20} className={`ml-auto flex-shrink-0 ${data.valid ? 'text-z-accent3' : 'text-red-400'}`} />
            </div>

            {/* Cert details */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-z-gold/15 border border-z-gold/30 flex items-center justify-center flex-shrink-0">
                <Award size={28} className="text-z-gold" />
              </div>
              <div>
                <div className="text-xs text-z-muted uppercase tracking-widest mb-0.5">{TYPE_LABELS[data.data.type] || 'Certificate'}</div>
                <div className="text-xl font-extrabold text-white">{data.data.courseName || data.data.internshipRole || 'Zentrox Technologies'}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {[
                { icon: User, label: 'Recipient', value: data.data.recipientName },
                { icon: Building2, label: 'Issued By', value: data.data.issuedBy },
                { icon: Calendar, label: 'Issue Date', value: new Date(data.data.issuedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
                { icon: Shield, label: 'Certificate ID', value: data.data.certificateId, mono: true },
              ].map(({ icon: Icon, label, value, mono }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-z-border">
                  <Icon size={15} className="text-z-accent flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] text-z-muted uppercase tracking-widest">{label}</div>
                    <div className={`text-sm font-medium text-white mt-0.5 truncate ${mono ? 'font-mono text-xs text-z-accent' : ''}`}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              {data.data.pdfUrl && (
                <a href={data.data.pdfUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-z-accent text-white text-sm font-semibold hover:bg-blue-500 transition-colors">
                  <Download size={15} /> Download Certificate
                </a>
              )}
              <Link href="/"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-z-border text-z-muted text-sm font-semibold hover:text-white transition-colors">
                <ExternalLink size={15} /> Zentrox Technologies
              </Link>
            </div>
          </motion.div>
        ) : null}

        {/* Manual verify form */}
        <div className="glass-card p-5 mt-6">
          <p className="text-xs font-semibold text-white mb-3">Verify Another Certificate</p>
          <div className="flex gap-3">
            <input
              placeholder="Enter Certificate ID (e.g. ZT-ABC123-DEF456)"
              className="z-input flex-1 text-sm"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  const val = (e.target as HTMLInputElement).value.trim();
                  if (val) window.location.href = `/verify/${val}`;
                }
              }}
            />
            <button
              className="px-4 py-2.5 rounded-xl bg-z-accent text-white text-sm font-semibold whitespace-nowrap"
              onClick={e => {
                const input = (e.currentTarget.previousSibling as HTMLInputElement).value.trim();
                if (input) window.location.href = `/verify/${input}`;
              }}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

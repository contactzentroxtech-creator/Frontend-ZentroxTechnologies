'use client';

import { ExternalLink } from 'lucide-react';
import { AdminTable } from '@/components/admin/AdminTable';

const TYPE_STYLES: Record<string, string> = {
  course: 'bg-blue-500/15 text-blue-400',
  internship: 'bg-purple-500/15 text-purple-400',
  'offer-letter': 'bg-amber-500/15 text-amber-400',
  completion: 'bg-teal-500/15 text-teal-400',
  recommendation: 'bg-green-500/15 text-green-400',
};

export default function AdminCertificatesPage() {
  const COLUMNS = [
    { key: 'certificateId', label: 'Certificate ID', render: (r: any) => (
      <span className="font-mono text-xs text-z-accent">{r.certificateId}</span>
    )},
    { key: 'recipientName', label: 'Recipient', render: (r: any) => (
      <div>
        <div className="font-medium text-white text-sm">{r.recipientName || r.issuedTo?.name}</div>
        <div className="text-xs text-z-muted">{r.recipientEmail || r.issuedTo?.email}</div>
      </div>
    )},
    { key: 'type', label: 'Type', render: (r: any) => (
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${TYPE_STYLES[r.type] || 'bg-slate-500/15 text-slate-400'}`}>{r.type}</span>
    )},
    { key: 'courseName', label: 'Course / Role', render: (r: any) => (
      <span className="text-sm text-z-muted">{r.courseName || r.internshipRole || '—'}</span>
    )},
    { key: 'issuedAt', label: 'Issued', render: (r: any) => (
      <span className="text-xs text-z-muted">{new Date(r.issuedAt).toLocaleDateString('en-IN')}</span>
    )},
    { key: 'isValid', label: 'Valid', render: (r: any) => (
      <span className={`text-xs font-semibold ${r.isValid ? 'text-green-400' : 'text-red-400'}`}>
        {r.isValid ? '✓ Valid' : '✗ Revoked'}
      </span>
    )},
  ];

  return (
    <AdminTable
      title="Certificates"
      endpoint="/certificates"
      searchable={false}
      filters={[{ key: 'type', label: 'All Types', options: ['course', 'internship', 'offer-letter', 'completion', 'recommendation'] }]}
      columns={COLUMNS}
      actions={(cert) => (
        <div className="flex gap-2">
          {cert.pdfUrl && (
            <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer"
              className="text-z-muted hover:text-z-accent transition-colors p-1.5">
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      )}
    />
  );
}

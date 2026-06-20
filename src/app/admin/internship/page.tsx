'use client';

import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Check, X } from 'lucide-react';
import { AdminTable } from '@/components/admin/AdminTable';

const APP_STATUSES = ['pending', 'test-pending', 'test-passed', 'test-failed', 'accepted', 'active', 'completed', 'rejected'];
const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-slate-500/15 text-slate-400', 'test-pending': 'bg-blue-500/15 text-blue-400',
  'test-passed': 'bg-teal-500/15 text-teal-400', 'test-failed': 'bg-red-500/15 text-red-400',
  accepted: 'bg-purple-500/15 text-purple-400', active: 'bg-green-500/15 text-green-400',
  completed: 'bg-teal-500/15 text-teal-400', rejected: 'bg-red-500/15 text-red-400',
};

export default function AdminInternshipPage() {
  const COLUMNS = [
    { key: 'user', label: 'Applicant', render: (r: any) => (
      <div>
        <div className="font-medium text-white text-sm">{r.user?.name}</div>
        <div className="text-xs text-z-muted">{r.user?.email}</div>
      </div>
    )},
    { key: 'internship', label: 'Role', render: (r: any) => (
      <div className="text-sm text-white">{r.internship?.title || '—'}</div>
    )},
    { key: 'aptitudeScore', label: 'Test Score', render: (r: any) => (
      <span className={r.aptitudeScore !== undefined ? (r.aptitudeScore >= 60 ? 'text-green-400' : 'text-red-400') : 'text-z-muted'}>
        {r.aptitudeScore !== undefined ? `${r.aptitudeScore}%` : r.aptitudeAttempted ? 'Attempted' : '—'}
      </span>
    )},
    { key: 'status', label: 'Status', render: (r: any) => (
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${STATUS_STYLES[r.status] || ''}`}>{r.status}</span>
    )},
    { key: 'createdAt', label: 'Applied', render: (r: any) => <span className="text-xs text-z-muted">{new Date(r.createdAt).toLocaleDateString('en-IN')}</span> },
  ];

  return (
    <AdminTable
      title="Internship Applications"
      endpoint="/internship/admin/applications"
      columns={COLUMNS}
      filters={[{ key: 'status', label: 'All Status', options: APP_STATUSES }]}
      actions={(app, refetch) => (
        <div className="flex gap-2">
          {app.status === 'test-passed' && (
            <button onClick={async () => {
              try { await api.patch(`/internship/applications/${app._id}`, { status: 'active' }); toast.success('Internship activated & offer letter sent'); refetch(); }
              catch { toast.error('Failed'); }
            }} className="text-xs px-2.5 py-1 rounded-lg bg-green-500/15 text-green-400 font-semibold hover:bg-green-500/25 transition-colors">
              Activate
            </button>
          )}
          {app.status === 'active' && (
            <button onClick={async () => {
              try { await api.patch(`/internship/applications/${app._id}`, { status: 'completed' }); toast.success('Marked complete & certificate issued'); refetch(); }
              catch { toast.error('Failed'); }
            }} className="text-xs px-2.5 py-1 rounded-lg bg-teal-500/15 text-teal-400 font-semibold hover:bg-teal-500/25 transition-colors">
              Complete
            </button>
          )}
          {['pending', 'test-passed'].includes(app.status) && (
            <button onClick={async () => {
              try { await api.patch(`/internship/applications/${app._id}`, { status: 'rejected' }); toast.success('Application rejected'); refetch(); }
              catch { toast.error('Failed'); }
            }} className="text-z-muted hover:text-red-400 transition-colors p-1.5">
              <X size={14} />
            </button>
          )}
        </div>
      )}
    />
  );
}

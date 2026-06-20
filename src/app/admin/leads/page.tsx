'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Eye, Edit2, Trash2, Phone, Mail, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

const STATUSES = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];
const PRIORITIES = ['low', 'medium', 'high'];

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  contacted: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  qualified: 'bg-teal-500/15 text-teal-400 border-teal-500/25',
  proposal: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  won: 'bg-green-500/15 text-green-400 border-green-500/25',
  lost: 'bg-red-500/15 text-red-400 border-red-500/25',
};
const PRIORITY_STYLES: Record<string, string> = {
  low: 'bg-slate-500/15 text-slate-400',
  medium: 'bg-amber-500/15 text-amber-400',
  high: 'bg-red-500/15 text-red-400',
};

function LeadDetailModal({ lead, onClose, onUpdate }: { lead: any; onClose: () => void; onUpdate: (l: any) => void }) {
  const [status, setStatus] = useState(lead.status);
  const [priority, setPriority] = useState(lead.priority);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const { data } = await api.patch(`/leads/${lead._id}`, { status, priority, note: note || undefined });
      toast.success('Lead updated');
      onUpdate(data.data);
      setNote('');
    } catch { toast.error('Update failed'); }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-lg p-6 relative z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-lg font-bold text-white">{lead.name}</h2>
            <p className="text-xs text-z-muted mt-0.5">{new Date(lead.createdAt).toLocaleString('en-IN')}</p>
          </div>
          <button onClick={onClose} className="text-z-muted hover:text-white"><X size={18} /></button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            ['Phone', lead.phone], ['Email', lead.email || '—'],
            ['Service', lead.service || '—'], ['Budget', lead.budget || '—'],
            ['City', lead.city || '—'], ['Business Type', lead.businessType || '—'],
            ['Timeline', lead.timeline || '—'], ['Source', lead.source || 'Website'],
          ].map(([k, v]) => (
            <div key={k} className="p-3 rounded-xl bg-white/5 border border-z-border">
              <div className="text-[10px] text-z-muted uppercase tracking-widest">{k}</div>
              <div className="text-sm text-white mt-0.5 break-words">{v}</div>
            </div>
          ))}
        </div>

        {lead.message && (
          <div className="p-3 rounded-xl bg-white/5 border border-z-border mb-5">
            <div className="text-[10px] text-z-muted uppercase tracking-widest mb-1">Message</div>
            <p className="text-sm text-white leading-relaxed">{lead.message}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-xs text-z-muted mb-1.5 block">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="z-input text-sm">
              {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-z-muted mb-1.5 block">Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} className="z-input text-sm">
              {PRIORITIES.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs text-z-muted mb-1.5 block">Add Note</label>
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
            placeholder="Add a note about this lead..." className="z-input resize-none text-sm" />
        </div>

        {lead.notes?.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-z-muted mb-2">Previous Notes</div>
            <div className="flex flex-col gap-2 max-h-32 overflow-y-auto">
              {lead.notes.map((n: any, i: number) => (
                <div key={i} className="p-2.5 rounded-lg bg-white/5 border border-z-border text-xs">
                  <div className="text-white">{n.text}</div>
                  <div className="text-z-muted mt-0.5">{n.addedBy} · {new Date(n.addedAt).toLocaleDateString('en-IN')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <a href={`https://wa.me/91${lead.phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25d366] text-white text-sm font-semibold">
            <Phone size={14} /> WhatsApp
          </a>
          {lead.email && (
            <a href={`mailto:${lead.email}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-z-border text-z-muted hover:text-white text-sm font-semibold transition-colors">
              <Mail size={14} /> Email
            </a>
          )}
          <button onClick={save} disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-z-accent text-white text-sm font-semibold disabled:opacity-50">
            {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Check size={14} /> Save</>}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '15' });
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      const { data } = await api.get(`/leads?${params}`);
      setLeads(data.data);
      setTotal(data.total);
      setPages(data.pages);
    } catch { toast.error('Failed to load leads'); }
    setLoading(false);
  }, [page, search, statusFilter]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const updateLead = (updated: any) => {
    setLeads(prev => prev.map(l => l._id === updated._id ? updated : l));
    setSelected(updated);
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this lead?')) return;
    try {
      await api.delete(`/leads/${id}`);
      setLeads(prev => prev.filter(l => l._id !== id));
      toast.success('Lead deleted');
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-white">Leads & CRM</h1>
          <p className="text-sm text-z-muted">{total} total leads</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-z-muted" />
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search leads..." className="z-input pl-9 text-sm w-48" />
          </div>
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="z-input text-sm w-36">
            <option value="">All Status</option>
            {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-z-border">
                {['Name', 'Phone', 'Service', 'Status', 'Priority', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-z-muted uppercase tracking-widest px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-12 text-z-muted text-sm">Loading...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-z-muted text-sm">No leads found.</td></tr>
              ) : leads.map((lead, i) => (
                <motion.tr key={lead._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-z-border/50 hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-white">{lead.name}</div>
                    <div className="text-xs text-z-muted">{lead.email || '—'}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-z-muted">{lead.phone}</td>
                  <td className="px-4 py-3 text-sm text-z-muted max-w-[140px] truncate">{lead.service || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLES[lead.status] || ''}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${PRIORITY_STYLES[lead.priority] || ''}`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-z-muted whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelected(lead)} className="text-z-muted hover:text-white transition-colors">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => deleteLead(lead._id)} className="text-z-muted hover:text-red-400 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-z-border">
            <span className="text-xs text-z-muted">Page {page} of {pages}</span>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
                className="p-1.5 rounded-lg border border-z-border text-z-muted hover:text-white disabled:opacity-30 transition-colors">
                <ChevronLeft size={14} />
              </button>
              <button disabled={page >= pages} onClick={() => setPage(p => p + 1)}
                className="p-1.5 rounded-lg border border-z-border text-z-muted hover:text-white disabled:opacity-30 transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <LeadDetailModal lead={selected} onClose={() => setSelected(null)} onUpdate={updateLead} />}
      </AnimatePresence>
    </div>
  );
}

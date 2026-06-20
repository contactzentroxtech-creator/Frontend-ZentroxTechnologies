'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Check, Power } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

const POPUP_TYPES = ['exit-intent', 'lead', 'newsletter', 'discount', 'whatsapp', 'internship', 'announcement'];
const TRIGGERS = ['time', 'scroll', 'exit', 'click'];

function PopupModal({ popup, onClose, onSaved }: { popup?: any; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    name: popup?.name || '', type: popup?.type || 'lead', title: popup?.title || '',
    content: popup?.content || '', ctaText: popup?.ctaText || '', ctaLink: popup?.ctaLink || '',
    trigger: popup?.trigger || 'scroll', triggerValue: popup?.triggerValue || 30,
    isActive: popup?.isActive ?? false, showOnce: popup?.showOnce ?? true,
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      if (popup?._id) { await api.patch(`/cms/popups/${popup._id}`, form); toast.success('Popup updated'); }
      else { await api.post('/cms/popups', form); toast.success('Popup created'); }
      onSaved(); onClose();
    } catch { toast.error('Save failed'); }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-lg p-6 relative z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-5">
          <h2 className="text-lg font-bold text-white">{popup ? 'Edit Popup' : 'New Popup'}</h2>
          <button onClick={onClose}><X size={18} className="text-z-muted" /></button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-z-muted mb-1 block">Internal Name</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="z-input text-sm" />
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">Popup Type</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="z-input text-sm">
                {POPUP_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-z-muted mb-1 block">Title</label>
            <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="z-input text-sm" />
          </div>
          <div>
            <label className="text-xs text-z-muted mb-1 block">Content</label>
            <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} rows={3} className="z-input resize-none text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-z-muted mb-1 block">CTA Button Text</label>
              <input value={form.ctaText} onChange={e => setForm(p => ({ ...p, ctaText: e.target.value }))} className="z-input text-sm" />
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">CTA Link</label>
              <input value={form.ctaLink} onChange={e => setForm(p => ({ ...p, ctaLink: e.target.value }))} className="z-input text-sm" placeholder="/contact" />
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">Trigger</label>
              <select value={form.trigger} onChange={e => setForm(p => ({ ...p, trigger: e.target.value }))} className="z-input text-sm">
                {TRIGGERS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">Trigger Value (s or %)</label>
              <input type="number" value={form.triggerValue} onChange={e => setForm(p => ({ ...p, triggerValue: Number(e.target.value) }))} className="z-input text-sm" />
            </div>
          </div>
          <div className="flex gap-5">
            {[['isActive', 'Active'], ['showOnce', 'Show Once per Session']].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={(form as any)[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.checked }))} className="accent-z-accent w-4 h-4" />
                <span className="text-sm text-z-muted">{label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-z-border text-z-muted text-sm">Cancel</button>
          <button onClick={save} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-z-accent text-white text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Check size={14} /> Save</>}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminPopupsPage() {
  const [popups, setPopups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; popup?: any }>({ open: false });

  const fetch = async () => {
    setLoading(true);
    try { const { data } = await api.get('/cms/popups'); setPopups(data.data); } catch {}
    setLoading(false);
  };
  useEffect(() => { fetch(); }, []);

  const toggle = async (popup: any) => {
    try {
      await api.patch(`/cms/popups/${popup._id}`, { isActive: !popup.isActive });
      toast.success(popup.isActive ? 'Popup deactivated' : 'Popup activated');
      fetch();
    } catch { toast.error('Failed'); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete this popup?')) return;
    try { await api.delete(`/cms/popups/${id}`); toast.success('Deleted'); fetch(); } catch { toast.error('Failed'); }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white">Popups & Offers</h1>
          <p className="text-sm text-z-muted">Manage dynamic popup campaigns</p>
        </div>
        <button onClick={() => setModal({ open: true })}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-z-accent text-white text-sm font-semibold">
          <Plus size={14} /> New Popup
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><div className="w-8 h-8 border-2 border-z-accent/30 border-t-z-accent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popups.length === 0 && <p className="text-z-muted text-sm col-span-3">No popups yet. Create your first one.</p>}
          {popups.map(popup => (
            <motion.div key={popup._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className={`glass-card p-5 ${popup.isActive ? 'border-z-accent/30' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm font-bold text-white">{popup.name || popup.title}</div>
                  <div className="text-xs text-z-muted mt-0.5">{popup.type} · {popup.trigger}</div>
                </div>
                <button onClick={() => toggle(popup)}
                  className={`p-1.5 rounded-lg transition-colors ${popup.isActive ? 'text-green-400 hover:text-red-400' : 'text-z-muted hover:text-green-400'}`}>
                  <Power size={15} />
                </button>
              </div>
              <p className="text-xs text-z-muted mb-4 line-clamp-2">{popup.content}</p>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${popup.isActive ? 'bg-green-500/15 text-green-400' : 'bg-slate-500/15 text-slate-400'}`}>
                  {popup.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="ml-auto flex gap-2">
                  <button onClick={() => setModal({ open: true, popup })} className="text-z-muted hover:text-white transition-colors"><Edit2 size={14} /></button>
                  <button onClick={() => del(popup._id)} className="text-z-muted hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal.open && <PopupModal popup={modal.popup} onClose={() => setModal({ open: false })} onSaved={fetch} />}
      </AnimatePresence>
    </div>
  );
}

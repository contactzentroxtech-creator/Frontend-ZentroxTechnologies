'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, Plus, RefreshCw } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface AdminTableProps {
  title: string;
  endpoint: string;
  columns: { key: string; label: string; render?: (row: any) => React.ReactNode }[];
  searchable?: boolean;
  filters?: { key: string; label: string; options: string[] }[];
  actions?: (row: any, refetch: () => void) => React.ReactNode;
  headerActions?: React.ReactNode;
  limit?: number;
}

export function AdminTable({
  title, endpoint, columns, searchable = true,
  filters = [], actions, headerActions, limit = 15,
}: AdminTableProps) {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (search) params.set('search', search);
      Object.entries(filterValues).forEach(([k, v]) => { if (v) params.set(k, v); });
      const { data: res } = await api.get(`${endpoint}?${params}`);
      setData(res.data);
      setTotal(res.total ?? res.data.length);
      setPages(res.pages ?? 1);
    } catch { toast.error('Failed to load data'); }
    setLoading(false);
  }, [endpoint, page, search, filterValues, limit]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-white">{title}</h1>
          <p className="text-sm text-z-muted">{total} total records</p>
        </div>
        <div className="flex gap-3 flex-wrap items-center">
          {searchable && (
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-z-muted" />
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search..." className="z-input pl-9 text-sm w-44" />
            </div>
          )}
          {filters.map(f => (
            <select key={f.key} value={filterValues[f.key] || ''} onChange={e => { setFilterValues(prev => ({ ...prev, [f.key]: e.target.value })); setPage(1); }}
              className="z-input text-sm w-36">
              <option value="">{f.label}</option>
              {f.options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ))}
          <button onClick={fetchData} className="p-2 rounded-xl border border-z-border text-z-muted hover:text-white transition-colors">
            <RefreshCw size={14} />
          </button>
          {headerActions}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-z-border">
                {columns.map(col => (
                  <th key={col.key} className="text-left text-xs font-semibold text-z-muted uppercase tracking-widest px-4 py-3">
                    {col.label}
                  </th>
                ))}
                {actions && <th className="text-left text-xs font-semibold text-z-muted uppercase tracking-widest px-4 py-3">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={columns.length + 1} className="text-center py-12"><div className="w-6 h-6 border-2 border-z-accent/30 border-t-z-accent rounded-full animate-spin mx-auto" /></td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={columns.length + 1} className="text-center py-12 text-z-muted text-sm">No records found.</td></tr>
              ) : data.map((row, i) => (
                <motion.tr key={row._id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-z-border/50 hover:bg-white/3 transition-colors">
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3 text-sm text-white">
                      {col.render ? col.render(row) : row[col.key] ?? '—'}
                    </td>
                  ))}
                  {actions && <td className="px-4 py-3">{actions(row, fetchData)}</td>}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-z-border">
            <span className="text-xs text-z-muted">Page {page} of {pages}</span>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
                className="p-1.5 rounded-lg border border-z-border text-z-muted hover:text-white disabled:opacity-30">
                <ChevronLeft size={14} />
              </button>
              <button disabled={page >= pages} onClick={() => setPage(p => p + 1)}
                className="p-1.5 rounded-lg border border-z-border text-z-muted hover:text-white disabled:opacity-30">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminTable;

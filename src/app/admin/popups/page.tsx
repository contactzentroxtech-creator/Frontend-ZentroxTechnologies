"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  AlertCircle,
  Check,
  X,
  Megaphone,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import api from "@/lib/api";

interface Popup {
  _id: string;
  title: string;
  message: string;
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
  createdAt: string;
}

export default function PopupsPage() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Popup | null>(null);
  const [form, setForm] = useState({
    title: "",
    message: "",
    ctaText: "",
    ctaLink: "",
    isActive: true,
  });
  const [saving, setSaving] = useState(false);

  const fetchPopups = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/popups");
      if (data?.success && Array.isArray(data.data)) setPopups(data.data);
      else if (Array.isArray(data)) setPopups(data);
      else setPopups([]);
    } catch (err: any) {
      // 404 → backend popups route nahi hai, empty list dikhao
      if (err?.response?.status === 404) {
        setPopups([]);
      } else {
        setError(err?.response?.data?.message || "Failed to load popups");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPopups();
  }, [fetchPopups]);

  const handleSave = async () => {
    if (!form.title.trim() || !form.message.trim()) {
      setError("Title aur message required hai");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (editing) {
        await api.patch(`/popups/${editing._id}`, form);
        setSuccess("Popup updated");
      } else {
        await api.post("/popups", form);
        setSuccess("Popup created");
      }
      setShowForm(false);
      setEditing(null);
      setForm({ title: "", message: "", ctaText: "", ctaLink: "", isActive: true });
      await fetchPopups();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this popup?")) return;
    try {
      await api.delete(`/popups/${id}`);
      setPopups((prev) => prev.filter((p) => p._id !== id));
      setSuccess("Popup deleted");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Delete failed");
    }
  };

  const handleEdit = (popup: Popup) => {
    setEditing(popup);
    setForm({
      title: popup.title,
      message: popup.message,
      ctaText: popup.ctaText || "",
      ctaLink: popup.ctaLink || "",
      isActive: popup.isActive,
    });
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm({ title: "", message: "", ctaText: "", ctaLink: "", isActive: true });
  };

  return (
    <div className="admin-content p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">
            Popups & Offers
          </h1>
          <p className="text-sm text-slate-600">
            Manage promotional popups shown to website visitors.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchPopups}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-md"
          >
            <Plus size={14} /> New Popup
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} className="mt-0.5" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError("")}>
            <X size={14} />
          </button>
        </div>
      )}
      {success && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
          <Check size={16} /> <span>{success}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={32} className="text-blue-600 animate-spin" />
          <p className="text-xs text-slate-500 mt-3">Loading popups...</p>
        </div>
      ) : popups.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed border-slate-300 bg-white">
          <Megaphone size={40} className="text-slate-300 mb-3" />
          <p className="text-sm font-semibold text-slate-900">No popups yet</p>
          <p className="text-xs text-slate-500 mt-1">
            Create your first promotional popup
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700"
          >
            <Plus size={13} /> Create Popup
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popups.map((popup) => (
            <div
              key={popup._id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-1">
                    {popup.title}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                      popup.isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {popup.isActive ? <Eye size={10} /> : <EyeOff size={10} />}
                    {popup.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                {popup.message}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(popup)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100"
                >
                  <Edit size={12} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(popup._id)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={cancelForm}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-extrabold text-slate-900 mb-4">
              {editing ? "Edit Popup" : "Create Popup"}
            </h3>

            <div className="space-y-3 mb-5">
              <input
                type="text"
                placeholder="Title *"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
              <textarea
                placeholder="Message *"
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none resize-y"
              />
              <input
                type="text"
                placeholder="Button text (optional)"
                value={form.ctaText}
                onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Button link (optional)"
                value={form.ctaLink}
                onChange={(e) => setForm({ ...form, ctaLink: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                />
                Active (show to visitors)
              </label>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={cancelForm}
                disabled={saving}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Check size={14} /> {editing ? "Update" : "Create"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

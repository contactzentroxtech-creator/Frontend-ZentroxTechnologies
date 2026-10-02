"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ExternalLink,
  Star,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import api from "@/lib/api";

/* ═══════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════ */
interface Project {
  _id?: string;
  title: string;
  category: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  results: string[];
  tags: string[];
  real: boolean;
  isActive?: boolean;
  order?: number;
}

interface Review {
  _id?: string;
  name: string;
  role: string;
  company?: string;
  message: string;
  rating: number;
  color: string;
  date: string;
  isActive?: boolean;
}

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════════ */
const ICON_OPTIONS = [
  "Wine",
  "Car",
  "Globe",
  "Smartphone",
  "Code2",
  "Palette",
  "ShoppingBag",
  "Utensils",
  "Dumbbell",
  "Star",
];

const COLOR_OPTIONS = [
  "#7c3aed",
  "#0891b2",
  "#be185d",
  "#0f766e",
  "#ea580c",
  "#dc2626",
  "#059669",
  "#2563eb",
];

const EMPTY_PROJECT: Project = {
  title: "",
  category: "",
  description: "",
  url: "",
  icon: "Globe",
  color: "#7c3aed",
  results: [],
  tags: [],
  real: false,
  isActive: true,
  order: 0,
};

const EMPTY_REVIEW: Review = {
  name: "",
  role: "",
  company: "",
  message: "",
  rating: 5,
  color: "#7c3aed",
  date: new Date().toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  }),
  isActive: true,
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "reviews">(
    "projects"
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  /* ─── LOAD DATA ─────────────────────────────── */
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pRes, rRes] = await Promise.allSettled([
        api.get("/portfolio"),
        api.get("/reviews"),
      ]);

      if (pRes.status === "fulfilled") {
        const data = pRes.value.data?.data || pRes.value.data || [];
        setProjects(Array.isArray(data) ? data : []);
      }
      if (rRes.status === "fulfilled") {
        const data = rRes.value.data?.data || rRes.value.data || [];
        setReviews(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  /* ─── SAVE PROJECT ──────────────────────────── */
  const saveProject = async () => {
    if (!editingProject) return;
    if (!editingProject.title || !editingProject.category) {
      showMessage("error", "Title and Category are required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...editingProject,
        desc: editingProject.description,
      };

      if (editingProject._id) {
        await api.put(`/portfolio/${editingProject._id}`, payload);
        showMessage("success", "Project updated successfully");
      } else {
        await api.post("/portfolio", payload);
        showMessage("success", "Project created successfully");
      }
      setEditingProject(null);
      loadData();
    } catch (err: any) {
      showMessage(
        "error",
        err?.response?.data?.message || "Failed to save project"
      );
    } finally {
      setSaving(false);
    }
  };

  /* ─── DELETE PROJECT ────────────────────────── */
  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    try {
      await api.delete(`/portfolio/${id}`);
      showMessage("success", "Project deleted");
      loadData();
    } catch {
      showMessage("error", "Failed to delete project");
    }
  };

  /* ─── SAVE REVIEW ───────────────────────────── */
  const saveReview = async () => {
    if (!editingReview) return;
    if (!editingReview.name || !editingReview.message) {
      showMessage("error", "Name and Message are required");
      return;
    }

    setSaving(true);
    try {
      if (editingReview._id) {
        await api.put(`/reviews/${editingReview._id}`, editingReview);
        showMessage("success", "Review updated successfully");
      } else {
        await api.post("/reviews", editingReview);
        showMessage("success", "Review created successfully");
      }
      setEditingReview(null);
      loadData();
    } catch (err: any) {
      showMessage(
        "error",
        err?.response?.data?.message || "Failed to save review"
      );
    } finally {
      setSaving(false);
    }
  };

  /* ─── DELETE REVIEW ─────────────────────────── */
  const deleteReview = async (id: string) => {
    if (!confirm("Delete this review? This cannot be undone.")) return;
    try {
      await api.delete(`/reviews/${id}`);
      showMessage("success", "Review deleted");
      loadData();
    } catch {
      showMessage("error", "Failed to delete review");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ═══════════ HEADER ═══════════ */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Portfolio &amp; Reviews
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage projects and client reviews shown on your website
            </p>
          </div>

          <button
            onClick={() => {
              if (activeTab === "projects") {
                setEditingProject({ ...EMPTY_PROJECT });
              } else {
                setEditingReview({ ...EMPTY_REVIEW });
              }
            }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
          >
            <Plus size={16} />
            Add New
          </button>
        </div>

        {/* ═══════════ MESSAGE ═══════════ */}
        {message && (
          <div
            className={`mb-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            {message.text}
          </div>
        )}

        {/* ═══════════ TABS ═══════════ */}
        <div className="mb-6 flex gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-5 py-3 text-sm font-semibold transition-colors ${
              activeTab === "projects"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-5 py-3 text-sm font-semibold transition-colors ${
              activeTab === "reviews"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {/* ═══════════ CONTENT ═══════════ */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : activeTab === "projects" ? (
          /* ─── PROJECTS GRID ─── */
          projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
              <p className="text-sm text-slate-500">
                No projects yet. Click "Add New" to create one.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <div
                  key={p._id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-lg"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {p.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {p.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {p.real && (
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-600">
                          Live
                        </span>
                      )}
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: p.color }}
                      />
                    </div>
                  </div>

                  <p className="mb-3 line-clamp-2 text-sm text-slate-600">
                    {p.description}
                  </p>

                  {p.url && p.real && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-3 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                    >
                      <ExternalLink size={11} />
                      {p.url.replace("https://", "").substring(0, 30)}
                    </a>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProject({ ...p })}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-100"
                    >
                      <Edit size={12} /> Edit
                    </button>
                    <button
                      onClick={() => deleteProject(p._id!)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : /* ─── REVIEWS GRID ─── */
        reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="text-sm text-slate-500">
              No reviews yet. Click "Add New" to create one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-lg"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={
                          i < r.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-200 text-slate-200"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400">{r.date}</span>
                </div>

                <p className="mb-4 line-clamp-3 text-sm text-slate-600">
                  "{r.message}"
                </p>

                <div className="mb-4 flex items-center gap-2 border-t border-slate-100 pt-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: r.color }}
                  >
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{r.name}</p>
                    <p className="text-[10px] text-slate-500">{r.role}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingReview({ ...r })}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-100"
                  >
                    <Edit size={12} /> Edit
                  </button>
                  <button
                    onClick={() => deleteReview(r._id!)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ═══════════ PROJECT MODAL ═══════════ */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                {editingProject._id ? "Edit" : "Add"} Project
              </h2>
              <button
                onClick={() => setEditingProject(null)}
                className="text-slate-400 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        title: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="The Tipsy Bar"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="Website Development"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Description *
                </label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Brief description about the project..."
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Live URL (optional)
                </label>
                <input
                  type="text"
                  value={editingProject.url}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      url: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="https://thetipsybar.in/"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Icon
                  </label>
                  <select
                    value={editingProject.icon}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        icon: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  >
                    {ICON_OPTIONS.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Color
                  </label>
                  <select
                    value={editingProject.color}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        color: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  >
                    {COLOR_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Results (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProject.results.join(", ")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      results: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="+140% bookings, Mobile-first design"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProject.tags.join(", ")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      tags: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Next.js, Responsive, SEO"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <input
                  type="checkbox"
                  checked={editingProject.real}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      real: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  This is a{" "}
                  <span className="font-bold text-emerald-600">
                    live client project
                  </span>{" "}
                  (shows Live badge + Visit Website link)
                </span>
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setEditingProject(null)}
                  className="flex-1 rounded-full border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProject}
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save size={14} /> Save Project
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ REVIEW MODAL ═══════════ */}
      {editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                {editingReview._id ? "Edit" : "Add"} Review
              </h2>
              <button
                onClick={() => setEditingReview(null)}
                className="text-slate-400 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={editingReview.name}
                    onChange={(e) =>
                      setEditingReview({
                        ...editingReview,
                        name: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="Rohit Sharma"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Role / Company
                  </label>
                  <input
                    type="text"
                    value={editingReview.role}
                    onChange={(e) =>
                      setEditingReview({
                        ...editingReview,
                        role: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="Founder, The Tipsy Bar"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Message *
                </label>
                <textarea
                  value={editingReview.message}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview,
                      message: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="What did the client say?"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Rating
                  </label>
                  <select
                    value={editingReview.rating}
                    onChange={(e) =>
                      setEditingReview({
                        ...editingReview,
                        rating: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} star
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Color
                  </label>
                  <select
                    value={editingReview.color}
                    onChange={(e) =>
                      setEditingReview({
                        ...editingReview,
                        color: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  >
                    {COLOR_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Date
                  </label>
                  <input
                    type="text"
                    value={editingReview.date}
                    onChange={(e) =>
                      setEditingReview({
                        ...editingReview,
                        date: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="Apr 2026"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setEditingReview(null)}
                  className="flex-1 rounded-full border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveReview}
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save size={14} /> Save Review
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

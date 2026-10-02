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
  TrendingUp,
} from "lucide-react";
import api from "@/lib/api";

interface Project {
  _id?: string;
  title: string;
  category: string;
  desc: string;
  url: string;
  icon: string;
  color: string;
  results: string[];
  tags: string[];
  real: boolean;
  order?: number;
}

interface Review {
  _id?: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  color: string;
  date: string;
}

const ICON_OPTIONS = [
  "Wine", "Car", "Globe", "Smartphone", "Code2", "Palette",
  "ShoppingBag", "Utensils", "Dumbbell", "Star",
];

const COLOR_OPTIONS = [
  "#7c3aed", "#0891b2", "#be185d", "#0f766e", "#ea580c",
  "#dc2626", "#059669", "#2563eb",
];

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "reviews">("projects");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Load data
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
        setProjects(pRes.value.data?.data || pRes.value.data || []);
      }
      if (rRes.status === "fulfilled") {
        setReviews(rRes.value.data?.data || rRes.value.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async () => {
    if (!editingProject) return;
    setSaving(true);
    try {
      if (editingProject._id) {
        await api.put(`/portfolio/${editingProject._id}`, editingProject);
      } else {
        await api.post("/portfolio", editingProject);
      }
      setMessage("Project saved successfully");
      setEditingProject(null);
      loadData();
    } catch {
      setMessage("Failed to save project");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await api.delete(`/portfolio/${id}`);
      loadData();
    } catch {
      setMessage("Failed to delete");
    }
  };

  const saveReview = async () => {
    if (!editingReview) return;
    setSaving(true);
    try {
      if (editingReview._id) {
        await api.put(`/reviews/${editingReview._id}`, editingReview);
      } else {
        await api.post("/reviews", editingReview);
      }
      setMessage("Review saved");
      setEditingReview(null);
      loadData();
    } catch {
      setMessage("Failed to save review");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    try {
      await api.delete(`/reviews/${id}`);
      loadData();
    } catch {
      setMessage("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Portfolio & Reviews Management
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Add, edit or delete projects and client reviews
            </p>
          </div>
          <button
            onClick={() => {
              if (activeTab === "projects") {
                setEditingProject({
                  title: "",
                  category: "",
                  desc: "",
                  url: "",
                  icon: "Globe",
                  color: "#7c3aed",
                  results: [],
                  tags: [],
                  real: false,
                });
              } else {
                setEditingReview({
                  name: "",
                  role: "",
                  message: "",
                  rating: 5,
                  color: "#7c3aed",
                  date: new Date().toLocaleDateString("en-IN", {
                    month: "short",
                    year: "numeric",
                  }),
                });
              }
            }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700"
          >
            <Plus size={16} />
            Add New
          </button>
        </div>

        {/* Tabs */}
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

        {/* Message */}
        {message && (
          <div className="mb-4 rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
            {message}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading...</div>
        ) : activeTab === "projects" ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <div
                key={p._id}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{p.category}</p>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                  {p.desc}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setEditingProject(p)}
                    className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-100"
                  >
                    <Edit size={12} className="inline" /> Edit
                  </button>
                  <button
                    onClick={() => deleteProject(p._id!)}
                    className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={12} className="inline" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r._id}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-slate-600">
                  "{r.message}"
                </p>
                <p className="mt-3 text-xs font-bold text-slate-900">
                  {r.name}
                </p>
                <p className="text-xs text-slate-500">{r.role}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setEditingReview(r)}
                    className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600"
                  >
                    <Edit size={12} className="inline" /> Edit
                  </button>
                  <button
                    onClick={() => deleteReview(r._id!)}
                    className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600"
                  >
                    <Trash2 size={12} className="inline" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal - Project */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editingProject._id ? "Edit" : "Add"} Project
              </h2>
              <button onClick={() => setEditingProject(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold">Title</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      title: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-bold">Category</label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold">URL (if live)</label>
                  <input
                    type="text"
                    value={editingProject.url}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        url: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold">Description</label>
                <textarea
                  value={editingProject.desc}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      desc: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-bold">Icon</label>
                  <select
                    value={editingProject.icon}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        icon: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  >
                    {ICON_OPTIONS.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold">Color</label>
                  <select
                    value={editingProject.color}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        color: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
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
                <label className="mb-1 block text-xs font-bold">
                  Results (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProject.results.join(", ")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      results: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProject.tags.join(", ")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      tags: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingProject.real}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      real: e.target.checked,
                    })
                  }
                />
                <span className="text-sm">This is a real client project (shows Live badge)</span>
              </label>

              <button
                onClick={saveProject}
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 py-3 text-sm font-semibold text-white"
              >
                <Save size={14} /> {saving ? "Saving..." : "Save Project"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - Review */}
      {editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editingReview._id ? "Edit" : "Add"} Review
              </h2>
              <button onClick={() => setEditingReview(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={editingReview.name}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, name: e.target.value })
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Role/Company"
                  value={editingReview.role}
                  onChange={(e) =>
                    setEditingReview({ ...editingReview, role: e.target.value })
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              <textarea
                placeholder="Review message"
                value={editingReview.message}
                onChange={(e) =>
                  setEditingReview({ ...editingReview, message: e.target.value })
                }
                rows={4}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-bold">Rating</label>
                  <select
                    value={editingReview.rating}
                    onChange={(e) =>
                      setEditingReview({
                        ...editingReview,
                        rating: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} star
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold">Color</label>
                  <select
                    value={editingReview.color}
                    onChange={(e) =>
                      setEditingReview({ ...editingReview, color: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  >
                    {COLOR_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold">Date</label>
                  <input
                    type="text"
                    value={editingReview.date}
                    onChange={(e) =>
                      setEditingReview({ ...editingReview, date: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <button
                onClick={saveReview}
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 py-3 text-sm font-semibold text-white"
              >
                <Save size={14} /> {saving ? "Saving..." : "Save Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

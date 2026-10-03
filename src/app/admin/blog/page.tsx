"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Loader2,
  AlertCircle,
  Check,
  X,
  FileText,
  RefreshCw,
  Calendar,
  User,
  Tag,
} from "lucide-react";
import api from "@/lib/api";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  author?: string;
  category?: string;
  tags?: string[];
  image?: string;
  status: "draft" | "published";
  views?: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">(
    "all"
  );
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<BlogPost | null>(null);

  /* ─── Fetch Posts ─── */
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/blog?admin=true");
      if (data?.success && Array.isArray(data.data)) {
        setPosts(data.data);
      } else if (Array.isArray(data)) {
        setPosts(data);
      } else {
        setPosts([]);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to load blog posts. Please check backend."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  /* ─── Delete Post ─── */
  const handleDelete = async (post: BlogPost) => {
    setDeleting(post._id);
    try {
      await api.delete(`/blog/${post._id}`);
      setPosts((prev) => prev.filter((p) => p._id !== post._id));
      setSuccess(`"${post.title}" deleted successfully`);
      setTimeout(() => setSuccess(""), 3000);
      setConfirmDelete(null);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  /* ─── Filtered Posts ─── */
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* ─── Format Date ─── */
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* ─── Stats ─── */
  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    drafts: posts.filter((p) => p.status === "draft").length,
    totalViews: posts.reduce((sum, p) => sum + (p.views || 0), 0),
  };

  return (
    <div className="admin-content p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* ═══ Header ═══ */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">
            Blog Posts
          </h1>
          <p className="text-sm text-slate-600">
            Create, edit, and manage all your blog articles.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchPosts}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all"
          >
            <Plus size={14} /> New Post
          </Link>
        </div>
      </div>

      {/* ═══ Stats ═══ */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Posts
          </p>
          <p className="mt-1 text-2xl font-extrabold text-slate-900">
            {stats.total}
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Published
          </p>
          <p className="mt-1 text-2xl font-extrabold text-emerald-700">
            {stats.published}
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
            Drafts
          </p>
          <p className="mt-1 text-2xl font-extrabold text-amber-700">
            {stats.drafts}
          </p>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
            Total Views
          </p>
          <p className="mt-1 text-2xl font-extrabold text-blue-700">
            {stats.totalViews.toLocaleString()}
          </p>
        </div>
      </div>

      {/* ═══ Alerts ═══ */}
      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError("")} className="text-red-400">
            <X size={14} />
          </button>
        </div>
      )}

      {success && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
          <Check size={16} className="flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* ═══ Toolbar ═══ */}
      <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by title, category, author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="flex items-center gap-2">
          {(["all", "published", "draft"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                statusFilter === status
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ Posts List ═══ */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={32} className="text-blue-600 animate-spin" />
          <p className="text-xs text-slate-500 mt-3">Loading posts...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed border-slate-300 bg-white">
          <FileText size={40} className="text-slate-300 mb-3" />
          <p className="text-sm font-semibold text-slate-700">
            {searchQuery || statusFilter !== "all"
              ? "No posts match your filters"
              : "No blog posts yet"}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {searchQuery || statusFilter !== "all"
              ? "Try different search or filter"
              : "Create your first blog post to get started"}
          </p>
          {!searchQuery && statusFilter === "all" && (
            <Link
              href="/admin/blog/new"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700"
            >
              <Plus size={13} /> Create First Post
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Thumbnail */}
                {post.image && (
                  <div className="flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-24 w-full md:w-32 object-cover rounded-xl border border-slate-200"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Status + Category */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        post.status === "published"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-amber-100 text-amber-700 border border-amber-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          post.status === "published"
                            ? "bg-emerald-500"
                            : "bg-amber-500"
                        }`}
                      />
                      {post.status}
                    </span>

                    {post.category && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        <Tag size={9} />
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* TITLE — force visible */}
                  <h3 className="text-base md:text-lg font-extrabold text-slate-900 mb-1.5 line-clamp-2 leading-snug">
                    {post.title || "Untitled Post"}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <User size={11} />
                      {post.author || "Admin"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {formatDate(post.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={11} />
                      {post.views || 0} views
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    title="View on site"
                  >
                    <Eye size={13} />
                    <span className="hidden md:inline">View</span>
                  </Link>
                  <Link
                    href={`/admin/blog/edit/${post._id}`}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors"
                    title="Edit post"
                  >
                    <Edit size={13} />
                    <span className="hidden md:inline">Edit</span>
                  </Link>
                  <button
                    onClick={() => setConfirmDelete(post)}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition-colors"
                    title="Delete post"
                  >
                    <Trash2 size={13} />
                    <span className="hidden md:inline">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ Delete Confirmation Modal ═══ */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => !deleting && setConfirmDelete(null)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 mb-4">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                Delete Blog Post?
              </h3>
              <p className="text-sm text-slate-600 mb-1">
                You are about to delete:
              </p>
              <p className="text-sm font-bold text-slate-900 mb-4 line-clamp-2">
                &ldquo;{confirmDelete.title}&rdquo;
              </p>
              <p className="text-xs text-red-600 mb-6">
                This action cannot be undone.
              </p>

              <div className="flex w-full gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  disabled={!!deleting}
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete)}
                  disabled={!!deleting}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {deleting === confirmDelete._id ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={14} />
                      Delete
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

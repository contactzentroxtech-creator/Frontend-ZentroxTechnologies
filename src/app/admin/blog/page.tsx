"use client";

import { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  Link,
  FileText,
  Image,
  Video,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { AdminTable } from "@/components/admin/AdminTable";

// Interface for media structure
interface MediaItem {
  url: string;
  type: "image" | "video" | "document" | "other";
  caption?: string;
}

function BlogModal({
  post,
  onClose,
  onSaved,
}: {
  post?: any;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    category: post?.category || "",
    tags: (post?.tags || []).join(", "),
    thumbnail: post?.thumbnail || "",
    authorName: post?.authorName || "",
    isPublished: post?.isPublished ?? false,
    featured: post?.featured ?? false,
    metaTitle: post?.metaTitle || "",
    metaDesc: post?.metaDesc || "",
    media: (post?.media || []) as MediaItem[], // Array to hold multiple types of media
  });

  const [saving, setSaving] = useState(false);

  // Temporary state for adding a new media item to the array
  const [newMedia, setNewMedia] = useState<MediaItem>({
    url: "",
    type: "image",
    caption: "",
  });

  const addMediaItem = () => {
    if (!newMedia.url.trim()) return toast.error("Media URL cannot be empty");
    setForm((p) => ({ ...p, media: [...p.media, newMedia] }));
    setNewMedia({ url: "", type: "image", caption: "" }); // Reset media inputs
  };

  const removeMediaItem = (index: number) => {
    setForm((p) => ({ ...p, media: p.media.filter((_, i) => i !== index) }));
  };

  const save = async () => {
    setSaving(true);
    try {
      // Safely handles splitting even if form.tags is empty, undefined, or not a string
      const parsedTags =
        typeof form.tags === "string"
          ? form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [];

      const payload = {
        ...form,
        tags: parsedTags,
      };

      if (post?._id) {
        await api.patch(`/blog/${post._id}`, payload);
        toast.success("Post updated");
      } else {
        await api.post("/blog", payload);
        toast.success("Post created");
      }
      onSaved();
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Save failed");
    }
    setSaving(false);
  };

  // Helper to render distinct icons based on media type selection
  const getMediaIcon = (type: string) => {
    if (type === "image") return <Image size={14} className="text-blue-400" />;
    if (type === "video") return <Video size={14} className="text-red-400" />;
    return <FileText size={14} className="text-amber-400" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-2xl p-6 relative z-10 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between mb-5">
          <h2 className="text-lg font-bold text-white">
            {post ? "Edit Post" : "New Blog Post"}
          </h2>
          <button onClick={onClose}>
            <X size={18} className="text-z-muted" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-z-muted mb-1 block">Title *</label>
            <input
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
              className="z-input"
            />
          </div>
          <div>
            <label className="text-xs text-z-muted mb-1 block">Excerpt</label>
            <input
              value={form.excerpt}
              onChange={(e) =>
                setForm((p) => ({ ...p, excerpt: e.target.value }))
              }
              className="z-input"
            />
          </div>
          <div>
            <label className="text-xs text-z-muted mb-1 block">
              Content (Markdown/HTML) *
            </label>
            <textarea
              value={form.content}
              onChange={(e) =>
                setForm((p) => ({ ...p, content: e.target.value }))
              }
              rows={6}
              className="z-input resize-none text-xs font-mono"
            />
          </div>

          {/* --- MULTIPLE MEDIA MANAGEMENT SECTION --- */}
          <div className="border border-z-border p-4 rounded-xl bg-black/20">
            <label className="text-xs font-semibold text-white mb-2 block">
              Blog Media Gallery
            </label>

            {/* List of currently added media items */}
            {form.media.length > 0 && (
              <div className="flex flex-col gap-2 mb-3 max-h-40 overflow-y-auto pr-1">
                {form.media.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-white/5 p-2 rounded-lg border border-z-border text-xs text-white"
                  >
                    <div className="flex items-center gap-2 truncate max-w-[85%]">
                      {getMediaIcon(item.type)}
                      <span className="truncate text-z-muted font-mono">
                        {item.url}
                      </span>
                      {item.caption && (
                        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white">
                          ({item.caption})
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMediaItem(idx)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Form controls to insert a new media asset */}
            <div className="flex flex-col md:flex-row gap-2 items-end">
              <div className="flex-1 w-full">
                <input
                  placeholder="Media file URL (e.g. AWS S3, Cloudinary links)"
                  value={newMedia.url}
                  onChange={(e) =>
                    setNewMedia((p) => ({ ...p, url: e.target.value }))
                  }
                  className="z-input text-xs"
                />
              </div>
              <div className="w-full md:w-32">
                <select
                  value={newMedia.type}
                  onChange={(e) =>
                    setNewMedia((p) => ({ ...p, type: e.target.value as any }))
                  }
                  className="z-input text-xs bg-transparent text-white"
                >
                  <option value="image" className="bg-neutral-900 text-white">
                    Image
                  </option>
                  <option value="video" className="bg-neutral-900 text-white">
                    Video
                  </option>
                  <option
                    value="document"
                    className="bg-neutral-900 text-white"
                  >
                    Document
                  </option>
                  <option value="other" className="bg-neutral-900 text-white">
                    Other
                  </option>
                </select>
              </div>
              <div className="w-full md:w-32">
                <input
                  placeholder="Caption"
                  value={newMedia.caption}
                  onChange={(e) =>
                    setNewMedia((p) => ({ ...p, caption: e.target.value }))
                  }
                  className="z-input text-xs"
                />
              </div>
              <button
                type="button"
                onClick={addMediaItem}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-xs h-[38px] flex items-center justify-center gap-1 border border-z-border shrink-0 w-full md:w-auto"
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
          {/* --- END OF MEDIA SECTION --- */}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-z-muted mb-1 block">
                Category
              </label>
              <input
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({ ...p, category: e.target.value }))
                }
                className="z-input"
                placeholder="e.g. website development"
              />
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">
                Author Name
              </label>
              <input
                value={form.authorName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, authorName: e.target.value }))
                }
                className="z-input"
              />
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">
                Tags (comma separated)
              </label>
              <input
                value={form.tags}
                onChange={(e) =>
                  setForm((p) => ({ ...p, tags: e.target.value }))
                }
                className="z-input"
              />
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">
                Thumbnail URL
              </label>
              <input
                value={form.thumbnail}
                onChange={(e) =>
                  setForm((p) => ({ ...p, thumbnail: e.target.value }))
                }
                className="z-input"
              />
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">
                Meta Title
              </label>
              <input
                value={form.metaTitle}
                onChange={(e) =>
                  setForm((p) => ({ ...p, metaTitle: e.target.value }))
                }
                className="z-input"
              />
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">
                Meta Description
              </label>
              <input
                value={form.metaDesc}
                onChange={(e) =>
                  setForm((p) => ({ ...p, metaDesc: e.target.value }))
                }
                className="z-input"
              />
            </div>
          </div>

          <div className="flex gap-4">
            {[
              ["isPublished", "Published"],
              ["featured", "Featured"],
            ].map(([key, label]) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={(form as any)[key]}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [key]: e.target.checked }))
                  }
                  className="accent-z-accent w-4 h-4"
                />
                <span className="text-sm text-z-muted">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-z-border text-z-muted text-sm"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-z-accent text-white text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Check size={14} /> Save
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminBlogPage() {
  const [modal, setModal] = useState<{ open: boolean; post?: any }>({
    open: false,
  });
  const [refetchKey, setRefetchKey] = useState(0);

  const COLUMNS = [
    {
      key: "title",
      label: "Title",
      render: (r: any) => (
        <div>
          <div className="font-medium text-white text-sm">{r.title}</div>
          <div className="text-xs text-z-muted">
            {r.category} · {r.readTime || 0} min read
          </div>
        </div>
      ),
    },
    {
      key: "viewCount",
      label: "Views",
      render: (r: any) => (
        <span className="text-z-muted text-sm">{r.viewCount || 0}</span>
      ),
    },
    {
      key: "isPublished",
      label: "Status",
      render: (r: any) => (
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
            r.isPublished
              ? "bg-green-500/15 text-green-400"
              : "bg-amber-500/15 text-amber-400"
          }`}
        >
          {r.isPublished ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      key: "featured",
      label: "Featured",
      render: (r: any) =>
        r.featured ? (
          <span className="text-xs text-z-gold font-semibold">Featured</span>
        ) : null,
    },
    {
      key: "createdAt",
      label: "Date",
      render: (r: any) => (
        <span className="text-xs text-z-muted">
          {new Date(r.createdAt).toLocaleDateString("en-IN")}
        </span>
      ),
    },
  ];

  return (
    <>
      <AdminTable
        key={refetchKey}
        title="Blog Posts"
        endpoint="/blog/admin/all"
        searchable={false}
        columns={COLUMNS}
        headerActions={
          <button
            onClick={() => setModal({ open: true })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-z-accent text-white text-sm font-semibold"
          >
            <Plus size={14} /> New Post
          </button>
        }
        actions={(post, refetch) => (
          <div className="flex gap-2">
            <button
              onClick={() => setModal({ open: true, post })}
              className="text-z-muted hover:text-white transition-colors"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={async () => {
                if (!confirm("Delete post?")) return;
                try {
                  await api.delete(`/blog/${post._id}`);
                  toast.success("Deleted");
                  refetch();
                } catch {
                  toast.error("Delete failed");
                }
              }}
              className="text-z-muted hover:text-red-400 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      />
      <AnimatePresence>
        {modal.open && (
          <BlogModal
            post={modal.post}
            onClose={() => setModal({ open: false })}
            onSaved={() => setRefetchKey((k) => k + 1)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

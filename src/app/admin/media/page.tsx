"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Upload,
  Image as ImageIcon,
  Copy,
  Check,
  Trash2,
  Loader2,
  AlertCircle,
  Search,
  RefreshCw,
  X,
  ExternalLink,
} from "lucide-react";
import api from "@/lib/api";

interface MediaItem {
  _id?: string;
  url: string;
  publicId: string;
  originalName: string;
  size: number;
  format: string;
  width?: number;
  height?: number;
  createdAt: string;
}

export default function MediaManagerPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ─── Fetch Media List ─── */
  const fetchMedia = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/upload");
      if (data?.success && Array.isArray(data.data)) {
        setItems(data.data);
      } else if (Array.isArray(data)) {
        setItems(data);
      } else {
        setItems([]);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to load media. Please check backend connection."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  /* ─── Upload Handler ─── */
  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const uploaded: MediaItem[] = [];

      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          setError(`"${file.name}" is not an image. Skipping.`);
          continue;
        }

        // Validate size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          setError(`"${file.name}" is larger than 5MB. Skipping.`);
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);

        const { data } = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (data?.success && data.data) {
          uploaded.push(data.data);
        } else if (data?.url) {
          uploaded.push(data);
        }
      }

      if (uploaded.length > 0) {
        setItems((prev) => [...uploaded, ...prev]);
        setSuccess(
          `${uploaded.length} image${uploaded.length > 1 ? "s" : ""} uploaded successfully!`
        );
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Upload failed. Please check Cloudinary configuration."
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  /* ─── Copy URL ─── */
  const handleCopy = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setError("Failed to copy URL");
    }
  };

  /* ─── Delete Handler ─── */
  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Delete "${item.originalName}"?`)) return;

    try {
      await api.delete(`/upload/${item.publicId}`);
      setItems((prev) =>
        prev.filter((i) => i.publicId !== item.publicId)
      );
      setSuccess("Image deleted successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Delete failed");
    }
  };

  /* ─── Format File Size ─── */
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  /* ─── Filter Items ─── */
  const filteredItems = items.filter((item) =>
    item.originalName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-content p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* ═══ Header ═══ */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-1">
          Media Manager
        </h1>
        <p className="text-sm text-slate-600">
          Upload images to Cloudinary, copy URLs, and use them anywhere on your
          website — Home, About, Services, Blog, Portfolio.
        </p>
      </div>

      {/* ═══ Info Banner ═══ */}
      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <ImageIcon size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-blue-900 leading-relaxed">
            <strong className="block mb-1">How it works:</strong>
            Images upload directly to your Cloudinary account. After upload,
            copy the URL and paste it in CMS settings, blog thumbnails,
            portfolio images, or any content field. Make sure{" "}
            <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[11px]">
              CLOUDINARY_CLOUD_NAME
            </code>
            ,{" "}
            <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[11px]">
              CLOUDINARY_API_KEY
            </code>
            , and{" "}
            <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[11px]">
              CLOUDINARY_API_SECRET
            </code>{" "}
            are configured in your backend environment.
          </div>
        </div>
      </div>

      {/* ═══ Upload Zone ═══ */}
      <div className="mb-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleUpload(e.target.files)}
          className="hidden"
          id="media-upload"
        />

        <label
          htmlFor="media-upload"
          className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 cursor-pointer transition-all ${
            uploading
              ? "border-blue-400 bg-blue-50 cursor-wait"
              : "border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/50"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 size={32} className="text-blue-600 animate-spin" />
              <p className="text-sm font-semibold text-blue-700">
                Uploading...
              </p>
            </>
          ) : (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                <Upload size={24} className="text-blue-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-900">
                  Click to upload images
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  PNG, JPG, WEBP, GIF, SVG — Max 5MB each
                </p>
              </div>
            </>
          )}
        </label>
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
            placeholder="Search by filename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <button
          onClick={fetchMedia}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* ═══ Media Grid ═══ */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={32} className="text-blue-600 animate-spin" />
          <p className="text-xs text-slate-500 mt-3">Loading media...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed border-slate-300 bg-white">
          <ImageIcon size={40} className="text-slate-300 mb-3" />
          <p className="text-sm font-semibold text-slate-700">
            {searchQuery ? "No images match your search" : "No images yet"}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {searchQuery
              ? "Try a different search term"
              : "Upload your first image using the button above"}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-xs text-slate-500">
            {filteredItems.length} image{filteredItems.length !== 1 ? "s" : ""}{" "}
            {searchQuery && `matching "${searchQuery}"`}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.publicId || item.url}
                className="group relative rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                {/* Preview */}
                <div
                  className="aspect-square bg-slate-50 relative overflow-hidden cursor-pointer"
                  onClick={() => setPreviewItem(item)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.originalName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ExternalLink size={20} className="text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="p-2.5">
                  <p
                    className="text-[11px] font-semibold text-slate-900 truncate"
                    title={item.originalName}
                  >
                    {item.originalName}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {formatSize(item.size)}
                    {item.format && ` • ${item.format.toUpperCase()}`}
                  </p>

                  {/* Actions */}
                  <div className="mt-2 flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(item.url, item.publicId)}
                      className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-blue-50 hover:bg-blue-100 px-2 py-1.5 text-[10px] font-bold text-blue-700 transition-colors"
                      title="Copy URL"
                    >
                      {copiedId === item.publicId ? (
                        <>
                          <Check size={11} /> Copied
                        </>
                      ) : (
                        <>
                          <Copy size={11} /> Copy URL
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 p-1.5 text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ═══ Preview Modal ═══ */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            >
              <X size={16} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewItem.url}
              alt={previewItem.originalName}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
            <div className="mt-4 rounded-xl bg-white/95 p-4">
              <p className="text-sm font-bold text-slate-900 mb-2">
                {previewItem.originalName}
              </p>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={previewItem.url}
                  className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-700"
                />
                <button
                  onClick={() =>
                    handleCopy(previewItem.url, previewItem.publicId)
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white transition-colors"
                >
                  {copiedId === previewItem.publicId ? (
                    <>
                      <Check size={12} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
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

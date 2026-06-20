"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Copy,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface UploadedFile {
  url: string;
  public_id: string;
  name: string;
  uploadedAt: string;
}

export default function AdminMediaPage() {
  // Initialize state directly from localStorage if it exists to persist data on refresh
  const [uploads, setUploads] = useState<UploadedFile[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("zentrox_media_uploads");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || !files.length) return;
    setUploading(true);
    const results: UploadedFile[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB limit`);
        continue;
      }
      try {
        const fd = new FormData();
        fd.append("image", file);
        const { data } = await api.post("/upload/image", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        results.push({
          url: data.url,
          public_id: data.public_id,
          name: file.name,
          uploadedAt: new Date().toISOString(),
        });
        toast.success(`${file.name} uploaded`);
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    // Update state and save the updated list to localStorage
    setUploads((prev) => {
      const updatedList = [...results, ...prev];
      localStorage.setItem(
        "zentrox_media_uploads",
        JSON.stringify(updatedList)
      );
      return updatedList;
    });
    setUploading(false);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    toast.success("URL copied to clipboard");
    setTimeout(() => setCopied(null), 2000);
  };

  // Function to remove item from state and localStorage
  const handleDelete = (publicId: string) => {
    setUploads((prev) => {
      const updatedList = prev.filter((file) => file.public_id !== publicId);
      localStorage.setItem(
        "zentrox_media_uploads",
        JSON.stringify(updatedList)
      );
      return updatedList;
    });
    toast.success("Image removed from dashboard");
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-white">Media Manager</h1>
        <p className="text-sm text-z-muted">
          Upload and manage images for courses, blog posts, and site content
        </p>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleUpload(e.dataTransfer.files);
        }}
        onClick={() => fileRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 ${
          dragOver
            ? "border-z-accent bg-z-accent/5 scale-[1.01]"
            : "border-z-border hover:border-z-accent/50 hover:bg-white/2"
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-z-accent/30 border-t-z-accent rounded-full animate-spin" />
            <p className="text-sm text-z-muted">Uploading to Cloudinary...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-z-accent/10 border border-z-accent/20 flex items-center justify-center">
              <Upload size={24} className="text-z-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Drop images here or click to upload
              </p>
              <p className="text-xs text-z-muted mt-1">
                PNG, JPG, WEBP — max 5MB per file — multiple files supported
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Uploaded files */}
      {uploads.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <ImageIcon size={32} className="text-z-muted mx-auto mb-3" />
          <p className="text-sm text-z-muted">
            No files uploaded in this session.
          </p>
          <p className="text-xs text-z-muted mt-1">
            Uploaded files are stored in Cloudinary. Refresh to start fresh.
          </p>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-white">
              {uploads.length} files uploaded this session
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {uploads.map((file, i) => (
              <motion.div
                key={file.public_id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden group"
              >
                <div className="aspect-square relative bg-z-dark3 overflow-hidden">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Hover action overlay wrapper */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                    {/* Top Action Row: Delete Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(file.public_id);
                        }}
                        className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                        title="Remove image from view"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Center Action Row: Copy Button */}
                    <div className="flex items-center justify-center mb-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyUrl(file.url);
                        }}
                        className="p-2 rounded-lg bg-z-accent text-white hover:bg-blue-500 transition-colors"
                      >
                        {copied === file.url ? (
                          <Check size={14} />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-2.5">
                  <p className="text-xs text-white truncate">{file.name}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyUrl(file.url);
                    }}
                    className="text-[10px] text-z-accent hover:underline mt-0.5 block truncate"
                  >
                    Copy URL
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Info box */}
      <div className="glass-card p-4 flex items-start gap-3">
        <AlertCircle size={16} className="text-z-gold flex-shrink-0 mt-0.5" />
        <div className="text-xs text-z-muted leading-relaxed">
          <span className="text-white font-medium">
            Cloudinary Integration:
          </span>{" "}
          Images are uploaded directly to your Cloudinary account. Copy the URL
          and use it in course thumbnails, blog post images, CMS settings, or
          any content field. Ensure{" "}
          <code className="text-z-accent">CLOUDINARY_*</code> environment
          variables are configured in your backend.
        </div>
      </div>
    </div>
  );
}

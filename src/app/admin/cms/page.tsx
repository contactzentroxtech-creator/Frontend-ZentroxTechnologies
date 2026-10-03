"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Save,
  Loader2,
  AlertCircle,
  Check,
  Image as ImageIcon,
  Upload,
  X,
  Plus,
  Trash2,
  RefreshCw,
} from "lucide-react";
import api from "@/lib/api";

/* ═══════════════════════════════════════════════════════════════
   CMS FIELD GROUPS — Website sections
═══════════════════════════════════════════════════════════════ */
const CMS_GROUPS = [
  {
    id: "hero",
    label: "Hero Section",
    fields: [
      { key: "hero_title", label: "Hero Title", type: "text" },
      { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
      { key: "hero_image", label: "Hero Image", type: "image" },
      { key: "hero_cta_text", label: "CTA Button Text", type: "text" },
    ],
  },
  {
    id: "about",
    label: "About Section",
    fields: [
      { key: "about_title", label: "About Title", type: "text" },
      { key: "about_description", label: "About Description", type: "textarea" },
      { key: "about_image", label: "About Image", type: "image" },
    ],
  },
  {
    id: "services",
    label: "Services Section",
    fields: [
      { key: "services_title", label: "Services Title", type: "text" },
      { key: "services_subtitle", label: "Services Subtitle", type: "textarea" },
      { key: "services_image", label: "Services Image", type: "image" },
    ],
  },
  {
    id: "contact",
    label: "Contact Section",
    fields: [
      { key: "contact_phone", label: "Phone", type: "text" },
      { key: "contact_email", label: "Email", type: "text" },
      { key: "contact_address", label: "Address", type: "textarea" },
    ],
  },
  {
    id: "social",
    label: "Social Links",
    fields: [
      { key: "social_facebook", label: "Facebook URL", type: "text" },
      { key: "social_instagram", label: "Instagram URL", type: "text" },
      { key: "social_linkedin", label: "LinkedIn URL", type: "text" },
      { key: "social_twitter", label: "Twitter/X URL", type: "text" },
      { key: "social_youtube", label: "YouTube URL", type: "text" },
    ],
  },
];

interface MediaItem {
  url: string;
  publicId: string;
  originalName: string;
}

export default function CMSPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeGroup, setActiveGroup] = useState("hero");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<string | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);

  /* ─── Fetch CMS Values ─── */
  const fetchCMS = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/cms");
      if (data?.success && data.data) {
        setValues(data.data);
      } else if (data && typeof data === "object") {
        setValues(data);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to load CMS settings. Please check backend."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCMS();
  }, [fetchCMS]);

  /* ─── Save CMS Values ─── */
  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await api.put("/cms", values);
      setSuccess("CMS settings saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  /* ─── Field Change ─── */
  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  /* ─── Open Image Picker ─── */
  const openImagePicker = async (key: string) => {
    setPickerTarget(key);
    setPickerOpen(true);
    setMediaLoading(true);
    try {
      const { data } = await api.get("/upload");
      if (data?.success && Array.isArray(data.data)) {
        setMediaItems(data.data);
      } else if (Array.isArray(data)) {
        setMediaItems(data);
      } else {
        setMediaItems([]);
      }
    } catch {
      setMediaItems([]);
    } finally {
      setMediaLoading(false);
    }
  };

  /* ─── Select Image ─── */
  const selectImage = (url: string) => {
    if (pickerTarget) {
      handleChange(pickerTarget, url);
    }
    setPickerOpen(false);
    setPickerTarget(null);
  };

  const currentGroup = CMS_GROUPS.find((g) => g.id === activeGroup);

  return (
    <div className="admin-content p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* ═══ Header ═══ */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">
            CMS / Content Manager
          </h1>
          <p className="text-sm text-slate-600">
            Edit website content — text, images, social links. Changes reflect
            on the live site instantly.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchCMS}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Reload
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:shadow-lg disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save size={14} /> Save Changes
              </>
            )}
          </button>
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

      {/* ═══ Group Tabs ═══ */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {CMS_GROUPS.map((group) => (
          <button
            key={group.id}
            onClick={() => setActiveGroup(group.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeGroup === group.id
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300"
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* ═══ Loading ═══ */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={32} className="text-blue-600 animate-spin" />
          <p className="text-xs text-slate-500 mt-3">Loading CMS...</p>
        </div>
      ) : (
        currentGroup && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-5">
              {currentGroup.label}
            </h2>

            <div className="space-y-5">
              {currentGroup.fields.map((field) => (
                <div key={field.key}>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    {field.label}
                  </label>

                  {/* Text Input */}
                  {field.type === "text" && (
                    <input
                      type="text"
                      value={values[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  )}

                  {/* Textarea */}
                  {field.type === "textarea" && (
                    <textarea
                      value={values[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      rows={3}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-y"
                    />
                  )}

                  {/* Image Picker */}
                  {field.type === "image" && (
                    <div>
                      {values[field.key] ? (
                        <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-3">
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={values[field.key]}
                              alt={field.label}
                              className="h-20 w-20 object-cover rounded-lg border border-slate-200 bg-white"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-slate-700 mb-1">
                                Current image
                              </p>
                              <p className="text-[10px] text-slate-500 font-mono truncate">
                                {values[field.key]}
                              </p>
                            </div>
                            <button
                              onClick={() => openImagePicker(field.key)}
                              className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100"
                            >
                              Change
                            </button>
                            <button
                              onClick={() => handleChange(field.key, "")}
                              className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-red-600 hover:bg-red-100"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => openImagePicker(field.key)}
                          className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-white p-6 hover:border-blue-400 hover:bg-blue-50/50 transition-all"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                            <ImageIcon size={20} className="text-blue-600" />
                          </div>
                          <p className="text-sm font-semibold text-slate-700">
                            Choose image from Media Manager
                          </p>
                          <p className="text-[10px] text-slate-500">
                            Or{" "}
                            <span className="text-blue-600 font-semibold">
                              upload new
                            </span>
                          </p>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      )}

      {/* ═══ Image Picker Modal ═══ */}
      {pickerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPickerOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl bg-white overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Select Image
                </h3>
                <p className="text-xs text-slate-500">
                  Pick from your uploaded media
                </p>
              </div>
              <button
                onClick={() => setPickerOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5">
              {mediaLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 size={28} className="text-blue-600 animate-spin" />
                  <p className="text-xs text-slate-500 mt-2">
                    Loading media...
                  </p>
                </div>
              ) : mediaItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <ImageIcon size={40} className="text-slate-300 mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    No images uploaded
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Go to Media Manager to upload images first
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {mediaItems.map((item) => (
                    <button
                      key={item.publicId || item.url}
                      onClick={() => selectImage(item.url)}
                      className="group relative aspect-square rounded-xl border border-slate-200 bg-slate-50 overflow-hidden hover:border-blue-500 hover:ring-2 hover:ring-blue-200 transition-all"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.url}
                        alt={item.originalName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="rounded-full bg-white px-3 py-1 text-[10px] font-bold text-slate-900">
                          Select
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

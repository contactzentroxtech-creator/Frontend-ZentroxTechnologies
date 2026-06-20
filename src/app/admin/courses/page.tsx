"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Check, Film, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { AdminTable } from "@/components/admin/AdminTable";

const CATEGORIES = [
  "web-dev",
  "mobile",
  "ai-ml",
  "seo",
  "design",
  "devops",
  "fullstack",
];
const LEVELS = ["beginner", "intermediate", "advanced"];

interface Lesson {
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  order: number;
  isPreview: boolean;
}

interface Module {
  title: string;
  order: number;
  lessons: Lesson[];
}

function CourseModal({
  course,
  onClose,
  onSaved,
}: {
  course?: any;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title: course?.title || "",
    description: course?.description || "",
    shortDesc: course?.shortDesc || "",
    category: course?.category || "web-dev",
    level: course?.level || "beginner",
    price: course?.price || 0,
    discountPrice: course?.discountPrice || "",
    isFree: course?.isFree ?? false,
    isFeatured: course?.isFeatured ?? false,
    isLive: course?.isLive ?? false,
    isPublished: course?.isPublished ?? false,
    liveSchedule: course?.liveSchedule || "",
    language: course?.language || "Hindi/English",
    outcomes: (course?.outcomes || []).join("\n"),
    requirements: (course?.requirements || []).join("\n"),
    tags: (course?.tags || []).join(", "),
    instructorName: course?.instructorName || "",
    thumbnail: course?.thumbnail || "",
    certificate: course?.certificate ?? true,
  });

  // Dynamic Array State for handling complex nested Modules and Video Lectures
  const [modules, setModules] = useState<Module[]>(course?.modules || []);
  const [saving, setSaving] = useState(false);

  // Helper Methods to dynamically manage UI lecture state arrays
  const addModule = () => {
    setModules([
      ...modules,
      { title: "", order: modules.length + 1, lessons: [] },
    ]);
  };

  const removeModule = (mIdx: number) => {
    setModules(modules.filter((_, idx) => idx !== mIdx));
  };

  const updateModuleTitle = (mIdx: number, val: string) => {
    const updated = [...modules];
    updated[mIdx].title = val;
    setModules(updated);
  };

  const addLesson = (mIdx: number) => {
    const updated = [...modules];
    updated[mIdx].lessons.push({
      title: "",
      description: "",
      videoUrl: "",
      duration: 0,
      order: updated[mIdx].lessons.length + 1,
      isPreview: false,
    });
    setModules(updated);
  };

  const updateLessonField = (
    mIdx: number,
    lIdx: number,
    field: keyof Lesson,
    value: any
  ) => {
    const updated = [...modules];
    updated[mIdx].lessons[lIdx] = {
      ...updated[mIdx].lessons[lIdx],
      [field]: value,
    };
    setModules(updated);
  };

  const removeLesson = (mIdx: number, lIdx: number) => {
    const updated = [...modules];
    updated[mIdx].lessons = updated[mIdx].lessons.filter(
      (_, idx) => idx !== lIdx
    );
    setModules(updated);
  };

  const save = async () => {
    if (!form.title || !form.description)
      return toast.error("Title and description required");
    setSaving(true);
    try {
      // Robust, safe array parsing logic to protect the build process
      const parsedOutcomes =
        typeof form.outcomes === "string"
          ? form.outcomes.split("\n").filter(Boolean)
          : Array.isArray(form.outcomes)
          ? form.outcomes
          : [];

      const parsedRequirements =
        typeof form.requirements === "string"
          ? form.requirements.split("\n").filter(Boolean)
          : Array.isArray(form.requirements)
          ? form.requirements
          : [];

      const parsedTags =
        typeof form.tags === "string"
          ? form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : Array.isArray(form.tags)
          ? form.tags
          : [];

      const payload = {
        ...form,
        price: Number(form.price) || 0, // Fallback to 0 if NaN
        discountPrice: form.discountPrice
          ? Number(form.discountPrice)
          : undefined,
        outcomes: parsedOutcomes,
        requirements: parsedRequirements,
        tags: parsedTags,
        modules: modules, // Submits valid schema array directly to database
      };

      if (course?._id) {
        await api.patch(`/courses/${course._id}`, payload);
        toast.success("Course updated successfully");
      } else {
        await api.post("/courses", payload);
        toast.success("Course and Lectures created");
      }
      onSaved();
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Save failed");
    }
    setSaving(false);
  };

  const f = (key: string) => ({
    value: (form as any)[key],
    onChange: (e: any) =>
      setForm((p) => ({
        ...p,
        [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      })),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-3xl p-6 relative z-10 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between mb-5 border-b border-z-border pb-3">
          <h2 className="text-lg font-bold text-white">
            {course ? "Edit Course Meta & Lectures" : "Create New Course"}
          </h2>
          <button onClick={onClose}>
            <X size={18} className="text-z-muted" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Metadata Section */}
          <div className="col-span-2">
            <label className="text-xs text-z-muted mb-1 block">Title *</label>
            <input
              {...f("title")}
              className="z-input"
              placeholder="Course title"
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs text-z-muted mb-1 block">
              Short Description
            </label>
            <input
              {...f("shortDesc")}
              className="z-input"
              placeholder="One-line tagline"
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs text-z-muted mb-1 block">
              Description *
            </label>
            <textarea
              {...f("description")}
              rows={3}
              className="z-input resize-none"
              placeholder="Full course description"
            />
          </div>
          <div>
            <label className="text-xs text-z-muted mb-1 block">Category</label>
            <select {...f("category")} className="z-input">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-z-muted mb-1 block">Level</label>
            <select {...f("level")} className="z-input">
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-z-muted mb-1 block">Price (₹)</label>
            <input {...f("price")} type="number" className="z-input" />
          </div>
          <div>
            <label className="text-xs text-z-muted mb-1 block">
              Discount Price (₹)
            </label>
            <input
              {...f("discountPrice")}
              type="number"
              className="z-input"
              placeholder="Optional"
            />
          </div>

          <div className="col-span-2 border-t border-z-border pt-4 mt-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Film size={16} className="text-z-accent" /> Course Curriculum &
                Lectures
              </h3>
              <button
                type="button"
                onClick={addModule}
                className="text-xs bg-z-accent/20 border border-z-accent/40 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-z-accent/40 transition"
              >
                <Plus size={12} /> Add Module
              </button>
            </div>

            {/* Dynamic Modules Map Loop */}
            <div className="flex flex-col gap-4">
              {modules.map((mod, mIdx) => (
                <div
                  key={mIdx}
                  className="p-4 bg-white/[0.02] border border-z-border rounded-xl"
                >
                  <div className="flex gap-2 items-center mb-3">
                    <span className="text-xs font-bold text-z-muted">
                      M{mIdx + 1}
                    </span>
                    <input
                      type="text"
                      value={mod.title}
                      onChange={(e) => updateModuleTitle(mIdx, e.target.value)}
                      placeholder="Module Title (e.g. Getting Started)"
                      className="z-input text-sm py-1.5"
                    />
                    <button
                      type="button"
                      onClick={() => removeModule(mIdx)}
                      className="p-2 text-z-muted hover:text-red-400"
                    >
                      <Trash size={14} />
                    </button>
                  </div>

                  {/* Dynamic Lessons Inside Module Mapping */}
                  <div className="pl-6 flex flex-col gap-2 border-l border-z-border/40">
                    {mod.lessons.map((lesson, lIdx) => (
                      <div
                        key={lIdx}
                        className="grid grid-cols-12 gap-2 bg-black/20 p-2 rounded-lg items-center"
                      >
                        <div className="col-span-4">
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) =>
                              updateLessonField(
                                mIdx,
                                lIdx,
                                "title",
                                e.target.value
                              )
                            }
                            placeholder="Lecture Title"
                            className="z-input text-xs bg-transparent py-1"
                          />
                        </div>
                        <div className="col-span-5">
                          <input
                            type="text"
                            value={lesson.videoUrl}
                            onChange={(e) =>
                              updateLessonField(
                                mIdx,
                                lIdx,
                                "videoUrl",
                                e.target.value
                              )
                            }
                            placeholder="Video Link (e.g. YouTube/Vimeo/S3)"
                            className="z-input text-xs bg-transparent py-1"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="number"
                            value={lesson.duration || ""}
                            onChange={(e) =>
                              updateLessonField(
                                mIdx,
                                lIdx,
                                "duration",
                                Number(e.target.value)
                              )
                            }
                            placeholder="Min"
                            className="z-input text-xs bg-transparent py-1"
                          />
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <button
                            type="button"
                            onClick={() => removeLesson(mIdx, lIdx)}
                            className="text-z-muted hover:text-red-400"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addLesson(mIdx)}
                      className="text-[11px] text-z-muted hover:text-white flex items-center gap-1 self-start mt-1"
                    >
                      <Plus size={10} /> Add Lecture Link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Standard Meta Strings Continuation */}
          <div className="col-span-2 border-t border-z-border pt-4 mt-2 grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-z-muted mb-1 block">
                Instructor Name
              </label>
              <input {...f("instructorName")} className="z-input" />
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">
                Language
              </label>
              <input {...f("language")} className="z-input" />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-z-muted mb-1 block">
                Thumbnail URL
              </label>
              <input
                {...f("thumbnail")}
                className="z-input"
                placeholder="https://..."
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-z-muted mb-1 block">
                Live Schedule
              </label>
              <input
                {...f("liveSchedule")}
                className="z-input"
                placeholder="e.g. Every Saturday 10:00 AM IST"
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-z-muted mb-1 block">
                Tags (comma separated)
              </label>
              <input
                {...f("tags")}
                className="z-input"
                placeholder="react, nextjs, typescript"
              />
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">
                Learning Outcomes (one per line)
              </label>
              <textarea
                {...f("outcomes")}
                rows={3}
                className="z-input resize-none text-xs"
              />
            </div>
            <div>
              <label className="text-xs text-z-muted mb-1 block">
                Requirements (one per line)
              </label>
              <textarea
                {...f("requirements")}
                rows={3}
                className="z-input resize-none text-xs"
              />
            </div>
          </div>

          <div className="col-span-2 flex flex-wrap gap-4 mt-2">
            {[
              ["isFree", "Free Course"],
              ["isFeatured", "Featured"],
              ["isLive", "Live Classes"],
              ["isPublished", "Published"],
              ["certificate", "Certificate"],
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

        <div className="flex gap-3 mt-6 border-t border-z-border pt-4">
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
                <Check size={14} /> {course ? "Update Data" : "Create Data"}
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminCoursesPage() {
  const [modal, setModal] = useState<{ open: boolean; course?: any }>({
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
            {r.category} · {r.level}
          </div>
        </div>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (r: any) => (
        <span className="text-sm">
          {r.isFree ? "Free" : `₹${r.discountPrice || r.price}`}
        </span>
      ),
    },
    { key: "enrolledCount", label: "Enrolled" },
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
      key: "isLive",
      label: "Live",
      render: (r: any) =>
        r.isLive ? (
          <span className="text-xs text-z-accent3 font-semibold">Live</span>
        ) : null,
    },
  ];

  return (
    <>
      <AdminTable
        key={refetchKey}
        title="Courses"
        endpoint="/courses/admin/all"
        searchable={false}
        columns={COLUMNS}
        headerActions={
          <button
            onClick={() => setModal({ open: true })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-z-accent text-white text-sm font-semibold"
          >
            <Plus size={14} /> New Course
          </button>
        }
        actions={(course, refetch) => (
          <div className="flex gap-2">
            <button
              onClick={() => setModal({ open: true, course })}
              className="text-z-muted hover:text-white transition-colors"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={async () => {
                if (!confirm("Delete course?")) return;
                try {
                  await api.delete(`/courses/${course._id}`);
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
          <CourseModal
            course={modal.course}
            onClose={() => setModal({ open: false })}
            onSaved={() => setRefetchKey((k) => k + 1)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

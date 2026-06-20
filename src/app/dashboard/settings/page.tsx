"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  RefreshCw,
  User,
  Phone,
  BookOpen,
  Github,
  Linkedin,
  Globe,
  MapPin,
  GraduationCap,
} from "lucide-react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

export default function DashboardSettingsPage() {
  const { user, fetchMe } = useAuthStore();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
    portfolio: "",
    college: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        bio: user.profileData?.bio || "",
        skills: (user.profileData?.skills || []).join(", "),
        github: user.profileData?.github || "",
        linkedin: user.profileData?.linkedin || "",
        portfolio: user.profileData?.portfolio || "",
        college: user.profileData?.college || "",
        city: user.profileData?.city || "",
        state: user.profileData?.state || "",
      });
    }
  }, [user]);

  const save = async () => {
    setSaving(true);
    try {
      await api.patch("/users/profile", {
        name: form.name,
        phone: form.phone,
        profileData: {
          bio: form.bio,
          skills: form.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          github: form.github,
          linkedin: form.linkedin,
          portfolio: form.portfolio,
          college: form.college,
          city: form.city,
          state: form.state,
        },
      });
      await fetchMe();
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    }
    setSaving(false);
  };

  const f = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value })),
  });

  const SECTIONS = [
    {
      title: "Basic Information",
      fields: [
        {
          key: "name",
          label: "Full Name",
          icon: User,
          placeholder: "Your full name",
          required: true,
        },
        {
          key: "phone",
          label: "Phone / WhatsApp",
          icon: Phone,
          placeholder: "+91 XXXXX XXXXX",
        },
      ],
    },
    {
      title: "About You",
      textarea: {
        key: "bio",
        label: "Bio",
        placeholder:
          "Tell us about yourself, your goals, and what you're learning...",
      },
      fields: [
        {
          key: "skills",
          label: "Skills (comma separated)",
          icon: BookOpen,
          placeholder: "React, Node.js, UI/UX, Python...",
        },
        {
          key: "college",
          label: "College / University",
          icon: GraduationCap,
          placeholder: "Your institution",
        },
        { key: "city", label: "City", icon: MapPin, placeholder: "Mohali" },
        { key: "state", label: "State", icon: MapPin, placeholder: "Punjab" },
      ],
    },
    {
      title: "Social & Portfolio",
      fields: [
        {
          key: "github",
          label: "GitHub URL",
          icon: Github,
          placeholder: "https://github.com/username",
        },
        {
          key: "linkedin",
          label: "LinkedIn URL",
          icon: Linkedin,
          placeholder: "https://linkedin.com/in/username",
        },
        {
          key: "portfolio",
          label: "Portfolio URL",
          icon: Globe,
          placeholder: "https://yourportfolio.com",
        },
      ],
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white">
            Profile Settings
          </h1>
          <p className="text-sm text-z-muted">
            Update your account information
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-z-accent text-white text-sm font-semibold disabled:opacity-50"
        >
          {saving ? (
            <RefreshCw size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          Save Changes
        </button>
      </div>

      {/* Avatar */}
      <div className="glass-card p-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-z-accent to-z-accent2 flex items-center justify-center text-white text-2xl font-extrabold flex-shrink-0">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <div className="font-bold text-white">{user?.name}</div>
          <div className="text-sm text-z-muted">{user?.email}</div>
          <div className="text-xs text-z-accent mt-0.5 capitalize">
            {user?.role}
          </div>
        </div>
      </div>

      {SECTIONS.map((section) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5"
        >
          <h2 className="text-sm font-bold text-white mb-4 pb-3 border-b border-z-border">
            {section.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(section as any).textarea && (
              <div className="md:col-span-2">
                <label className="text-xs text-z-muted uppercase tracking-widest mb-1.5 block">
                  {(section as any).textarea.label}
                </label>
                <textarea
                  {...f((section as any).textarea.key)}
                  rows={3}
                  placeholder={(section as any).textarea.placeholder}
                  className="z-input resize-none text-sm"
                />
              </div>
            )}
            {section.fields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.key}>
                  <label className="text-xs text-z-muted uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <Icon size={11} /> {field.label}{" "}
                    {(field as any).required && (
                      <span className="text-red-400">*</span>
                    )}
                  </label>
                  <input
                    {...f(field.key as keyof typeof form)}
                    placeholder={field.placeholder}
                    className="z-input text-sm"
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* Account info */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-bold text-white mb-3">
          Account Information
        </h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            ["Email", user?.email || "—"],
            [
              "Account Type",
              user?.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                : "—",
            ],
            ["Internship Status", user?.internshipStatus || "none"],
            ["Courses Enrolled", String(user?.enrolledCourses?.length || 0)],
          ].map(([k, v]) => (
            <div
              key={k}
              className="p-3 rounded-xl bg-white/5 border border-z-border"
            >
              <div className="text-[10px] text-z-muted uppercase tracking-widest">
                {k}
              </div>
              <div className="text-white text-sm font-medium mt-0.5">{v}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-z-muted mt-3">
          To change your email or password, contact{" "}
          <span className="text-z-accent">contact.zentroxtech@gmail.com</span>
        </p>
      </div>
    </div>
  );
}

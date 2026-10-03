"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Search,
  Copy,
  Users,
  TrendingUp,
  Ban,
  RefreshCw,
  Download,
  Phone,
  Mail,
  Calendar,
  Percent,
} from "lucide-react";
import api from "@/lib/api";

/* ═══════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════ */
interface UsedBy {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  baseEstimate: number;
  finalEstimate: number;
  usedAt: string;
}

interface ReferralCode {
  _id?: string;
  code: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerRole: "sales" | "partner" | "affiliate" | "employee" | "other";
  discountPercent: number;
  maxUses: number;
  usedCount: number;
  usedBy: UsedBy[];
  isActive: boolean;
  expiresAt?: string;
  notes?: string;
  createdAt?: string;
}

const EMPTY_REFERRAL: ReferralCode = {
  code: "",
  ownerName: "",
  ownerPhone: "",
  ownerEmail: "",
  ownerRole: "sales",
  discountPercent: 20,
  maxUses: 1,
  usedCount: 0,
  usedBy: [],
  isActive: true,
  expiresAt: "",
  notes: "",
};

const ROLE_OPTIONS = [
  { value: "sales", label: "Sales Person" },
  { value: "partner", label: "Business Partner" },
  { value: "affiliate", label: "Affiliate" },
  { value: "employee", label: "Employee" },
  { value: "other", label: "Other" },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function AdminReferralsPage() {
  const [codes, setCodes] = useState<ReferralCode[]>([]);
  const [editing, setEditing] = useState<ReferralCode | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive" | "used"
  >("all");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [viewUsage, setViewUsage] = useState<ReferralCode | null>(null);

  /* ─── LOAD DATA ───────────────────────────────── */
  useEffect(() => {
    loadCodes();
  }, [search, statusFilter]);

  const loadCodes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter !== "all") params.append("status", statusFilter);

      const { data } = await api.get(`/referrals?${params.toString()}`);
      setCodes(data?.data || []);
    } catch (err) {
      console.error(err);
      setCodes([]);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };

  /* ─── SAVE ────────────────────────────────────── */
  const saveReferral = async () => {
    if (!editing) return;

    // Validation
    if (!editing.code.trim()) {
      showMessage("error", "Code is required");
      return;
    }
    if (!/^[A-Z0-9]+$/.test(editing.code.trim().toUpperCase())) {
      showMessage("error", "Code should only contain letters and numbers");
      return;
    }
    if (!editing.ownerName.trim()) {
      showMessage("error", "Owner name is required");
      return;
    }
    if (
      editing.discountPercent < 0 ||
      editing.discountPercent > 50
    ) {
      showMessage("error", "Discount should be between 0 and 50%");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        code: editing.code.trim().toUpperCase(),
        ownerName: editing.ownerName.trim(),
        ownerPhone: editing.ownerPhone || "",
        ownerEmail: editing.ownerEmail || "",
        ownerRole: editing.ownerRole,
        discountPercent: editing.discountPercent,
        maxUses: editing.maxUses,
        isActive: editing.isActive,
        expiresAt: editing.expiresAt || null,
        notes: editing.notes || "",
      };

      if (editing._id) {
        await api.put(`/referrals/${editing._id}`, payload);
        showMessage("success", "Referral code updated");
      } else {
        await api.post("/referrals", payload);
        showMessage("success", "Referral code created successfully");
      }
      setEditing(null);
      loadCodes();
    } catch (err: any) {
      showMessage(
        "error",
        err?.response?.data?.message || "Failed to save referral code"
      );
    } finally {
      setSaving(false);
    }
  };

  /* ─── DELETE ──────────────────────────────────── */
  const deleteReferral = async (id: string) => {
    if (
      !confirm(
        "Delete this referral code? This cannot be undone. Used codes should not be deleted."
      )
    )
      return;
    try {
      await api.delete(`/referrals/${id}`);
      showMessage("success", "Referral code deleted");
      loadCodes();
    } catch {
      showMessage("error", "Failed to delete");
    }
  };

  /* ─── TOGGLE ACTIVE ───────────────────────────── */
  const toggleActive = async (code: ReferralCode) => {
    if (!code._id) return;
    try {
      await api.put(`/referrals/${code._id}`, {
        isActive: !code.isActive,
      });
      showMessage(
        "success",
        `Code ${!code.isActive ? "activated" : "deactivated"}`
      );
      loadCodes();
    } catch {
      showMessage("error", "Failed to toggle status");
    }
  };

  /* ─── COPY CODE ───────────────────────────────── */
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  /* ─── DOWNLOAD CSV ────────────────────────────── */
  const downloadCSV = () => {
    const headers = [
      "Code",
      "Owner",
      "Phone",
      "Email",
      "Role",
      "Discount %",
      "Max Uses",
      "Used",
      "Status",
      "Created",
    ];
    const rows = codes.map((c) => [
      c.code,
      c.ownerName,
      c.ownerPhone || "-",
      c.ownerEmail || "-",
      c.ownerRole,
      c.discountPercent,
      c.maxUses,
      c.usedCount,
      c.isActive ? "Active" : "Inactive",
      c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-IN") : "-",
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((r) => r.map((v) => `"${v}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `referral-codes-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ─── STATS ───────────────────────────────────── */
  const totalCodes = codes.length;
  const activeCodes = codes.filter((c) => c.isActive).length;
  const usedCodes = codes.filter((c) => c.usedCount >= c.maxUses).length;
  const totalUses = codes.reduce((sum, c) => sum + c.usedCount, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* ═══════ HEADER ═══════ */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Referral Codes
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage referral codes for sales team, partners and affiliates
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadCSV}
              disabled={codes.length === 0}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-blue-300 hover:text-blue-600 disabled:opacity-50"
            >
              <Download size={15} />
              Export CSV
            </button>
            <button
              onClick={() => setEditing({ ...EMPTY_REFERRAL })}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
            >
              <Plus size={16} />
              New Code
            </button>
          </div>
        </div>

        {/* ═══════ STATS ═══════ */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              label: "Total Codes",
              value: totalCodes,
              icon: Users,
              color: "#2563eb",
            },
            {
              label: "Active",
              value: activeCodes,
              icon: CheckCircle2,
              color: "#059669",
            },
            {
              label: "Fully Used",
              value: usedCodes,
              icon: TrendingUp,
              color: "#ea580c",
            },
            {
              label: "Total Uses",
              value: totalUses,
              icon: Percent,
              color: "#7c3aed",
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <div
                  className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${stat.color}12`,
                    color: stat.color,
                  }}
                >
                  <Icon size={16} />
                </div>
                <p className="text-2xl font-extrabold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* ═══════ MESSAGE ═══════ */}
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

        {/* ═══════ FILTERS ═══════ */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by code, owner name, phone..."
              className="w-full rounded-xl border border-slate-200 bg-white px-11 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            {(
              [
                { value: "all", label: "All" },
                { value: "active", label: "Active" },
                { value: "used", label: "Used" },
                { value: "inactive", label: "Inactive" },
              ] as const
            ).map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                  statusFilter === f.value
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                }`}
              >
                {f.label}
              </button>
            ))}
            <button
              onClick={loadCodes}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
              title="Refresh"
            >
              <RefreshCw size={15} />
            </button>
          </div>
        </div>

        {/* ═══════ LIST ═══════ */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : codes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <Users size={40} className="mx-auto mb-3 text-slate-300" />
            <p className="text-sm font-medium text-slate-700">
              No referral codes yet
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Click "New Code" to create your first referral code
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {codes.map((c) => {
              const isUsed = c.usedCount >= c.maxUses;
              const isExpired =
                c.expiresAt && new Date(c.expiresAt) < new Date();

              return (
                <div
                  key={c._id}
                  className={`rounded-2xl border bg-white p-5 transition-all hover:shadow-lg ${
                    !c.isActive || isUsed || isExpired
                      ? "border-slate-200 opacity-75"
                      : "border-slate-200"
                  }`}
                >
                  {/* Header */}
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyCode(c.code)}
                          className="group flex items-center gap-1.5"
                          title="Copy code"
                        >
                          <code className="rounded-lg bg-blue-50 px-3 py-1 text-base font-black tracking-wider text-blue-700">
                            {c.code}
                          </code>
                          <Copy
                            size={12}
                            className="text-slate-400 group-hover:text-blue-600"
                          />
                        </button>
                        {copiedCode === c.code && (
                          <span className="text-[10px] font-bold text-emerald-600">
                            Copied!
                          </span>
                        )}
                      </div>
                    </div>

                    {!c.isActive ? (
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase text-slate-500">
                        Inactive
                      </span>
                    ) : isUsed ? (
                      <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase text-orange-600">
                        Used
                      </span>
                    ) : isExpired ? (
                      <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase text-red-600">
                        Expired
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase text-emerald-600">
                        Active
                      </span>
                    )}
                  </div>

                  {/* Owner */}
                  <div className="mb-3 border-b border-slate-100 pb-3">
                    <p className="text-sm font-bold text-slate-900">
                      {c.ownerName}
                    </p>
                    <p className="text-xs capitalize text-slate-500">
                      {c.ownerRole}
                    </p>
                    {c.ownerPhone && (
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                        <Phone size={11} />
                        {c.ownerPhone}
                      </p>
                    )}
                    {c.ownerEmail && (
                      <p className="mt-1 flex items-center gap-1.5 break-all text-xs text-slate-600">
                        <Mail size={11} className="flex-shrink-0" />
                        {c.ownerEmail}
                      </p>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="mb-3 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-extrabold text-blue-600">
                        {c.discountPercent}%
                      </p>
                      <p className="text-[10px] text-slate-500">Discount</p>
                    </div>
                    <div>
                      <p className="text-lg font-extrabold text-slate-900">
                        {c.usedCount}/{c.maxUses}
                      </p>
                      <p className="text-[10px] text-slate-500">Used</p>
                    </div>
                    <div>
                      <p className="text-lg font-extrabold text-slate-900">
                        {c.usedBy?.length || 0}
                      </p>
                      <p className="text-[10px] text-slate-500">Customers</p>
                    </div>
                  </div>

                  {/* Expiry */}
                  {c.expiresAt && (
                    <p className="mb-3 flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar size={11} />
                      Expires:{" "}
                      {new Date(c.expiresAt).toLocaleDateString("en-IN")}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setEditing({ ...c })}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-50 px-2 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-100"
                      title="Edit"
                    >
                      <Edit size={12} /> Edit
                    </button>
                    <button
                      onClick={() => toggleActive(c)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-amber-50 px-2 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-100"
                      title="Toggle active"
                    >
                      {c.isActive ? <Ban size={12} /> : <CheckCircle2 size={12} />}
                      {c.isActive ? "Disable" : "Enable"}
                    </button>
                    <button
                      onClick={() => setViewUsage(c)}
                      disabled={!c.usedBy?.length}
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-purple-50 px-2 py-2 text-xs font-semibold text-purple-600 hover:bg-purple-100 disabled:opacity-40"
                      title="View usage"
                    >
                      <Users size={12} />
                    </button>
                    <button
                      onClick={() => deleteReferral(c._id!)}
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-red-50 px-2 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ═══════ EDIT MODAL ═══════ */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                {editing._id ? "Edit Referral Code" : "Create New Referral Code"}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="text-slate-400 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Code */}
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Referral Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editing.code}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      code: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""),
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-sm uppercase focus:border-blue-500 focus:outline-none"
                  placeholder="RAJ2026"
                  maxLength={20}
                  disabled={!!editing._id}
                />
                <p className="mt-1 text-[10px] text-slate-500">
                  Letters and numbers only — e.g. RAJ2026, PRIYA50
                </p>
              </div>

              {/* Owner Name + Phone */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Owner Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editing.ownerName}
                    onChange={(e) =>
                      setEditing({ ...editing, ownerName: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="Rajesh Kumar"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editing.ownerPhone}
                    onChange={(e) =>
                      setEditing({ ...editing, ownerPhone: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Email + Role */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editing.ownerEmail}
                    onChange={(e) =>
                      setEditing({ ...editing, ownerEmail: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="rajesh@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Role
                  </label>
                  <select
                    value={editing.ownerRole}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        ownerRole: e.target.value as any,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  >
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Discount + Max Uses */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Discount (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={editing.discountPercent}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        discountPercent: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <p className="mt-1 text-[10px] text-slate-500">
                    0-50% (default 20%)
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Max Uses
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editing.maxUses}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        maxUses: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <p className="mt-1 text-[10px] text-slate-500">
                    Default 1 (one-time use)
                  </p>
                </div>
              </div>

              {/* Expires */}
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Expiry Date (optional)
                </label>
                <input
                  type="date"
                  value={
                    editing.expiresAt
                      ? new Date(editing.expiresAt).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      expiresAt: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Notes (internal)
                </label>
                <textarea
                  value={editing.notes}
                  onChange={(e) =>
                    setEditing({ ...editing, notes: e.target.value })
                  }
                  rows={2}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Any internal notes about this code..."
                />
              </div>

              {/* Active */}
              <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <input
                  type="checkbox"
                  checked={editing.isActive}
                  onChange={(e) =>
                    setEditing({ ...editing, isActive: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                />
                <span className="text-sm font-medium text-slate-700">
                  Code is active (customers can use it)
                </span>
              </label>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setEditing(null)}
                  className="flex-1 rounded-full border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveReferral}
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save size={14} /> Save Code
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════ USAGE MODAL ═══════ */}
      {viewUsage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Usage Report — {viewUsage.code}
                </h2>
                <p className="text-xs text-slate-500">
                  {viewUsage.usedBy?.length || 0} customers used this code
                </p>
              </div>
              <button
                onClick={() => setViewUsage(null)}
                className="text-slate-400 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            {viewUsage.usedBy?.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">
                No usage yet
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 px-3 text-xs font-bold text-slate-700">
                        Customer
                      </th>
                      <th className="py-2 px-3 text-xs font-bold text-slate-700">
                        Contact
                      </th>
                      <th className="py-2 px-3 text-xs font-bold text-slate-700">
                        Project
                      </th>
                      <th className="py-2 px-3 text-xs font-bold text-slate-700">
                        Estimate
                      </th>
                      <th className="py-2 px-3 text-xs font-bold text-slate-700">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewUsage.usedBy.map((u, i) => (
                      <tr key={i} className="border-b border-slate-100">
                        <td className="py-2 px-3 text-slate-900">{u.name}</td>
                        <td className="py-2 px-3 text-xs text-slate-600">
                          {u.phone}
                          <br />
                          {u.email}
                        </td>
                        <td className="py-2 px-3 text-xs text-slate-600">
                          {u.projectType || "-"}
                        </td>
                        <td className="py-2 px-3 text-xs text-slate-600">
                          ₹{u.finalEstimate?.toLocaleString("en-IN") || "-"}
                        </td>
                        <td className="py-2 px-3 text-xs text-slate-600">
                          {u.usedAt
                            ? new Date(u.usedAt).toLocaleDateString("en-IN")
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

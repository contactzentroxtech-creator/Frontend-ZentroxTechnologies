"use client";
import { useState } from "react";
import { Eye, Shield, ShieldOff, Trash2 } from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { AdminTable } from "@/components/admin/AdminTable";

const ROLE_STYLES: Record<string, string> = {
  student: "bg-blue-500/15 text-blue-400",
  admin: "bg-purple-500/15 text-purple-400",
  mentor: "bg-teal-500/15 text-teal-400",
};

export default function AdminUsersPage() {
  const [updating, setUpdating] = useState<string | null>(null);

  const toggleActive = async (user: any, refetch: () => void) => {
    setUpdating(user._id);
    try {
      await api.patch(`/admin/users/${user._id}`, { isActive: !user.isActive });
      toast.success(`User ${user.isActive ? "deactivated" : "activated"}`);
      refetch();
    } catch {
      toast.error("Failed to update user");
    }
    setUpdating(null);
  };

  const changeRole = async (user: any, role: string, refetch: () => void) => {
    try {
      await api.patch(`/admin/users/${user._id}`, { role });
      toast.success("Role updated");
      refetch();
    } catch {
      toast.error("Failed to update role");
    }
  };

  const COLUMNS = [
    {
      key: "name",
      label: "Name",
      render: (r: any) => (
        <div>
          <div className="font-medium text-white">{r.name}</div>
          <div className="text-xs text-z-muted">{r.email}</div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (r: any) => (
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
            ROLE_STYLES[r.role] || ""
          }`}
        >
          {r.role}
        </span>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      render: (r: any) => (
        <span className="text-z-muted">{r.phone || "—"}</span>
      ),
    },
    {
      key: "internshipStatus",
      label: "Internship",
      render: (r: any) => (
        <span className="text-z-muted text-xs">{r.internshipStatus}</span>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (r: any) => (
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
            r.isActive
              ? "bg-green-500/15 text-green-400"
              : "bg-red-500/15 text-red-400"
          }`}
        >
          {r.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Joined",
      render: (r: any) => (
        <span className="text-xs text-z-muted">
          {new Date(r.createdAt).toLocaleDateString("en-IN")}
        </span>
      ),
    },
  ];

  return (
    <AdminTable
      title="Users"
      endpoint="/admin/users"
      columns={COLUMNS}
      filters={[
        {
          key: "role",
          label: "All Roles",
          options: ["student", "admin", "admin", "mentor"],
        },
      ]}
      actions={(user, refetch) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleActive(user, refetch)}
            disabled={updating === user._id}
            className={`p-1.5 rounded-lg transition-colors ${
              user.isActive
                ? "text-green-400 hover:text-red-400"
                : "text-red-400 hover:text-green-400"
            }`}
          >
            {user.isActive ? <ShieldOff size={14} /> : <Shield size={14} />}
          </button>
        </div>
      )}
    />
  );
}

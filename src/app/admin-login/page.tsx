"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Shield } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

// Define or update this to your correct admin email string
const ADMIN_EMAIL = "admin@zentroxtechnologies.com";

export default function AdminLoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  // Component states
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(ADMIN_EMAIL, password);
      const user = useAuthStore.getState().user;

      // Cleaned up the duplicate condition check here
      if (user?.role === "admin") {
        toast.success("Welcome back, Admin!");
        router.push("/admin");
      } else {
        toast.error("Access denied. Admin only.");
        await useAuthStore.getState().logout();
      }
    } catch (err: any) {
      toast.error(err.message || "Login failed. Check your password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-z-dark">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-z-accent2 opacity-[0.04] blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm glass-card p-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-z-accent2/15 border border-z-accent2/30 flex items-center justify-center mx-auto mb-4">
            <Shield size={28} className="text-z-accent2" />
          </div>
          <h1 className="text-xl font-extrabold text-white">Admin Access</h1>
          <p className="text-xs text-z-muted mt-1">
            Zentrox Technologies — Owner Portal
          </p>
        </div>

        {/* Email display (read-only) */}
        <div className="mb-4">
          <label className="text-xs font-medium text-z-muted uppercase tracking-widest mb-1.5 block">
            Admin Email
          </label>
          <div className="z-input flex items-center gap-2 opacity-60 cursor-not-allowed select-none">
            <span className="text-sm text-z-text">{ADMIN_EMAIL}</span>
          </div>
        </div>

        {/* Password */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-z-muted uppercase tracking-widest mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="z-input pr-10 w-full"
                autoComplete="current-password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-z-muted hover:text-z-text transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3.5 rounded-xl bg-z-accent2 text-white font-semibold text-sm hover:bg-purple-500 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Shield size={15} /> Enter Admin Panel
              </>
            )}
          </button>
        </form>

        {/* Hint */}
        <p className="text-center text-[11px] text-z-muted mt-6 opacity-50">
          This page is not publicly linked. Keep URL private.
        </p>
      </motion.div>
    </div>
  );
}

"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

const schema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof schema>;

// Inner component that uses useSearchParams (must be inside Suspense)
function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const { login, loading } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  // FIX: Read ?redirect= param so /admin → login → /admin works correctly
  const redirectTo = searchParams.get("redirect") || null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      toast.success("Welcome back!");
      const user = useAuthStore.getState().user;

      // FIX: Explicit redirect param takes priority, then role-based routing
      if (redirectTo) {
        router.push(redirectTo);
      } else if (user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.message || "Login failed. Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-z-accent opacity-[0.05] blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card p-8 md:p-10 relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            {/* Replaced ZT box with Logo Image */}
            <img
              src="/Zentrox-Logo1.png " /* Replace with your actual image path */
              alt="Zentrox Technologies Logo"
              className="w-11 h-11 object-contain rounded-xl"
            />
            <span className="font-extrabold text-lg text-z-text">
              Zentrox<span className="text-z-accent"> Technologies</span>
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-z-text mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-z-muted">
            Sign in to your Zentrox Technologies account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-z-muted uppercase tracking-widest mb-1.5 block">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="z-input"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-xs font-medium text-z-muted uppercase tracking-widest">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-z-accent hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                {...register("password")}
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className="z-input pr-10"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-z-muted hover:text-z-text transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-z-accent text-white font-semibold text-sm hover:bg-blue-500 disabled:opacity-50 transition-all duration-300 shadow-glow-sm flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-z-muted mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-z-accent hover:underline font-medium"
          >
            Create one free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

// FIX: useSearchParams requires Suspense boundary in Next.js 14 App Router
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-z-accent/30 border-t-z-accent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

const schema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
type FormData = z.infer<typeof schema>;

function ResetPasswordForm() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!token) {
      toast.error('Invalid or missing reset token. Please request a new link.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { token, password: data.password });
      setDone(true);
      toast.success('Password reset successfully!');
      setTimeout(() => router.push('/auth/login'), 2000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Reset failed. Token may have expired.');
    } finally {
      setLoading(false);
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
            <div className="w-9 h-9 rounded-xl bg-z-accent flex items-center justify-center text-white font-bold text-sm">ZT</div>
            <span className="font-extrabold text-lg text-z-text">Zentrox<span className="text-z-accent">.</span></span>
          </Link>
          <div className="w-14 h-14 rounded-2xl bg-z-accent/15 border border-z-accent/25 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-z-accent" />
          </div>
          <h1 className="text-2xl font-extrabold text-z-text mb-1">Reset Password</h1>
          <p className="text-sm text-z-muted">Choose a new password for your account.</p>
        </div>

        {done ? (
          <div className="text-center space-y-4">
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/25 text-green-400 text-sm">
              ✅ Password reset! Redirecting to login…
            </div>
          </div>
        ) : !token ? (
          <div className="text-center space-y-4">
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
              ❌ Invalid reset link. Please request a new one.
            </div>
            <Link href="/auth/forgot-password" className="text-sm text-z-accent hover:underline">
              Request new reset link
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium text-z-muted uppercase tracking-widest mb-1.5 block">
                New Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="z-input pr-10"
                  autoComplete="new-password"
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
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-z-muted uppercase tracking-widest mb-1.5 block">
                Confirm Password
              </label>
              <input
                {...register('confirmPassword')}
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                className="z-input"
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-z-accent text-white font-semibold text-sm hover:bg-blue-500 disabled:opacity-50 transition-all duration-300 shadow-glow-sm flex items-center justify-center gap-2 mt-2"
            >
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <>Reset Password <ArrowRight size={15} /></>
              }
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-z-accent/30 border-t-z-accent rounded-full animate-spin" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}

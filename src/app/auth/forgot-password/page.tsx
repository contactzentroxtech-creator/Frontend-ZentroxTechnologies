'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

const schema = z.object({
  email: z.string().email('Valid email required'),
});
type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', data);
      setSent(true);
      toast.success('Reset link sent! Check your email.');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to send reset email.');
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
            <Mail size={24} className="text-z-accent" />
          </div>
          <h1 className="text-2xl font-extrabold text-z-text mb-1">Forgot Password</h1>
          <p className="text-sm text-z-muted">
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        {sent ? (
          <div className="text-center space-y-4">
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/25 text-green-400 text-sm">
              ✅ Reset link sent! Check your inbox (and spam folder).
            </div>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-sm text-z-accent hover:underline"
            >
              <ArrowLeft size={14} /> Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium text-z-muted uppercase tracking-widest mb-1.5 block">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="you@example.com"
                className="z-input"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-z-accent text-white font-semibold text-sm hover:bg-blue-500 disabled:opacity-50 transition-all duration-300 shadow-glow-sm flex items-center justify-center gap-2 mt-2"
            >
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <>Send Reset Link <ArrowRight size={15} /></>
              }
            </button>

            <Link
              href="/auth/login"
              className="flex items-center justify-center gap-1.5 text-sm text-z-muted hover:text-z-text transition-colors"
            >
              <ArrowLeft size={14} /> Back to Login
            </Link>
          </form>
        )}
      </motion.div>
    </div>
  );
}

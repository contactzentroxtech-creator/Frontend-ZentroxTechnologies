'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required').optional().or(z.literal('')),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });

type FormData = z.infer<typeof schema>;

const PERKS = ['Free course enrollment access', 'Saturday live class updates', 'Internship application portal', 'Certificate management'];

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const { register: regStore, loading } = useAuthStore();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // 1. Fire registration
      await regStore({ 
        name: data.name, 
        email: data.email, 
        password: data.password, 
        phone: data.phone || undefined 
      });
      
      toast.success('Account created! Welcome to Zentrox Technologies.');
      
      // 2. Use refresh or replace to guarantee clean state transition
      router.refresh();
      router.replace('/dashboard');
      
    } catch (err: any) {
      // If the database successfully stored it, check if your backend is returning 
      // an unexpected HTML string response (like a 302 redirect) instead of standard JSON.
      console.error("Registration error details:", err);
      toast.error(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full bg-z-accent2 opacity-[0.05] blur-[120px]" />
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Left info */}
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex flex-col justify-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-z-accent flex items-center justify-center text-white font-bold text-sm">ZT</div>
            <span className="font-extrabold text-lg text-white">Zentrox<span className="text-z-accent">.</span></span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white mb-3 leading-tight">Join Zentrox Technologies</h1>
          <p className="text-z-muted text-sm leading-relaxed mb-8">
            Create your free account and access courses, live Saturday classes, and the internship program.
          </p>
          <div className="flex flex-col gap-3">
            {PERKS.map(p => (
              <div key={p} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-z-accent3/20 border border-z-accent3/40 flex items-center justify-center flex-shrink-0">
                  <Check size={11} className="text-z-accent3" />
                </div>
                <span className="text-sm text-z-muted">{p}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-8">
          <h2 className="text-xl font-bold text-white mb-6">Create Free Account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <input {...register('name')} placeholder="Full Name *" className="z-input" />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input {...register('email')} type="email" placeholder="Email Address *" className="z-input" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <input {...register('phone')} placeholder="Phone / WhatsApp (optional)" className="z-input" />
            </div>
            <div className="relative">
              <input {...register('password')} type={showPass ? 'text' : 'password'} placeholder="Password *" className="z-input pr-10" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-z-muted hover:text-white">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <input {...register('confirmPassword')} type="password" placeholder="Confirm Password *" className="z-input" />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl bg-z-accent text-white font-semibold text-sm hover:bg-blue-500 disabled:opacity-50 transition-all duration-300 shadow-glow-sm flex items-center justify-center gap-2 mt-1">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account <ArrowRight size={15} /></>}
            </button>
          </form>
          <p className="text-center text-sm text-z-muted mt-4">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-z-accent hover:underline font-medium">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

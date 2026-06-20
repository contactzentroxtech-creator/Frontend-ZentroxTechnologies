/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        z: {
          dark: '#04050a',
          dark2: '#080c15',
          dark3: '#0d1220',
          dark4: '#111827',
          accent: '#3b7bff',
          accent2: '#7c3aed',
          accent3: '#06d6a0',
          gold: '#f59e0b',
          text: '#e8eaf6',
          muted: '#8892b0',
          border: 'rgba(59,123,255,0.15)',
          glow: 'rgba(59,123,255,0.25)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 4s linear infinite',
        'slide-up': 'slideUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marqueeReverse 25s linear infinite',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseGlow: { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '0.5', transform: 'scale(1.2)' } },
        gradientShift: { '0%': { backgroundPosition: '0%' }, '100%': { backgroundPosition: '200%' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        bounceSoft: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        marqueeReverse: { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(59,123,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,123,255,0.04) 1px,transparent 1px)",
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(59,123,255,0.12) 0%,transparent 70%)',
        'card-glow': 'radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(59,123,255,0.08) 0%,transparent 60%)',
        'accent-gradient': 'linear-gradient(135deg,#3b7bff 0%,#7c3aed 50%,#06d6a0 100%)',
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'glow-accent': '0 0 24px rgba(59,123,255,0.3)',
        'glow-sm': '0 0 12px rgba(59,123,255,0.2)',
        'card': '0 8px 40px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.05)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
};

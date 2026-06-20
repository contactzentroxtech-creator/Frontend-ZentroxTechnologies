'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme, useLang } from '@/lib/providers';

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
      {!compact && <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>}
    </button>
  );
}

export function LangSwitcher() {
  const { lang, setLang } = useLang();
  const langs = [
    { code: 'en' as const, label: 'EN', full: 'English' },
    { code: 'hi' as const, label: 'HI', full: 'हिंदी' },
    { code: 'pa' as const, label: 'PA', full: 'ਪੰਜਾਬੀ' },
  ];

  return (
    <div className="flex gap-0.5 bg-white/5 border border-z-border rounded-full p-1">
      {langs.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          title={l.full}
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all duration-200 ${
            lang === l.code
              ? 'bg-z-accent text-white'
              : 'text-z-muted hover:text-white'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

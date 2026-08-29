"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme, useLang } from "@/lib/providers";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="
        inline-flex items-center justify-center gap-2
        rounded-full border border-slate-200/80
        bg-white/70 px-3 py-2
        text-slate-700 shadow-sm
        backdrop-blur-md
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-blue-300
        hover:shadow-md
        dark:border-white/10
        dark:bg-white/[0.05]
        dark:text-slate-200
        dark:hover:border-blue-400/40
      "
      aria-label={
        isDark ? "Switch to light mode" : "Switch to dark mode"
      }
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span
        className="
          flex h-5 w-5 items-center justify-center
          rounded-full bg-blue-500/10
          text-blue-600
          dark:bg-blue-400/10 dark:text-blue-300
        "
      >
        {isDark ? <Sun size={13} /> : <Moon size={13} />}
      </span>

      {!compact && (
        <span className="text-xs font-semibold">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}

export function LangSwitcher() {
  const { lang, setLang } = useLang();

  const langs = [
    { code: "en" as const, label: "EN", full: "English" },
    { code: "hi" as const, label: "HI", full: "हिंदी" },
    { code: "pa" as const, label: "PA", full: "ਪੰਜਾਬੀ" },
  ];

  return (
    <div
      className="
        flex items-center gap-0.5
        rounded-full border border-slate-200/80
        bg-slate-50/80 p-1
        shadow-sm backdrop-blur-md
        dark:border-white/10
        dark:bg-white/[0.04]
      "
    >
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          title={l.full}
          className={`
            rounded-full px-2.5 py-1.5
            text-[10px] font-bold tracking-wide
            transition-all duration-300
            ${
              lang === l.code
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:bg-white hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
            }
          `}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

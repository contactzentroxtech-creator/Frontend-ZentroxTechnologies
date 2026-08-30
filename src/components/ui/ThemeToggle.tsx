"use client";

import { useTheme } from "@/lib/providers";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  compact?: boolean;
}

export default function ThemeToggle({ compact }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        rounded-full
        border border-slate-200/60
        bg-white/60
        backdrop-blur-md
        transition-all duration-300
        hover:border-blue-300/60 hover:shadow-md
        dark:border-white/8 dark:bg-white/[0.04]
        ${compact ? "h-8 w-8" : "h-9 w-9"}
        flex items-center justify-center
        text-slate-700 dark:text-slate-200
      `}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun size={compact ? 16 : 18} />
      ) : (
        <Moon size={compact ? 16 : 18} />
      )}
    </button>
  );
}

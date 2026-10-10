"use client";

import React from "react";
import { useLanguage } from "../LanguageProvider";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile";
}

export function LanguageSwitcher({ variant = "desktop" }: LanguageSwitcherProps) {
  const { language, setLanguage, d } = useLanguage();

  if (variant === "mobile") {
    return (
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]/60 text-sm">
        <div className="flex items-center gap-2 text-[var(--muted-foreground)] font-medium">
          <Globe className="w-4 h-4" />
          <span>{d.nav.languageLabel}</span>
        </div>
        <div className="flex items-center p-0.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-xs font-semibold">
          <button
            type="button"
            onClick={() => setLanguage("id")}
            className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
              language === "id"
                ? "bg-[var(--foreground)] text-[var(--background)] shadow-xs font-bold"
                : "text-[var(--muted-foreground)]"
            }`}
          >
            <span>🇮🇩</span>
            <span>ID</span>
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
              language === "en"
                ? "bg-[var(--foreground)] text-[var(--background)] shadow-xs font-bold"
                : "text-[var(--muted-foreground)]"
            }`}
          >
            <span>🇬🇧</span>
            <span>EN</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={d.nav.languageLabel}
      className="flex items-center p-0.5 rounded-full border border-[var(--border)] bg-[var(--card)] backdrop-blur-xs text-xs font-semibold select-none shadow-xs"
    >
      <button
        type="button"
        onClick={() => setLanguage("id")}
        className={`px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
          language === "id"
            ? "bg-[var(--foreground)] text-[var(--background)] shadow-xs font-bold"
            : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        }`}
        title="Bahasa Indonesia"
        aria-pressed={language === "id"}
      >
        <span className="text-[12px] leading-none">🇮🇩</span>
        <span>ID</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
          language === "en"
            ? "bg-[var(--foreground)] text-[var(--background)] shadow-xs font-bold"
            : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        }`}
        title="English (Default)"
        aria-pressed={language === "en"}
      >
        <span className="text-[12px] leading-none">🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
}

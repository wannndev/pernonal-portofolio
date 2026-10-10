"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { translations, type Language, type TranslationsType } from "@/locales";

export type { Language, TranslationsType };
export { translations };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  d: TranslationsType;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en", // Default English
  setLanguage: () => { },
  toggleLanguage: () => { },
  d: translations.en,
  t: () => "",
});

const STORAGE_KEY = "portfolio_language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // English is default
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved === "en" || saved === "id") {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      } else {
        setLanguageState("en");
        document.documentElement.lang = "en";
      }
    } catch {
      // Ignore localStorage read errors in private browsing
    }
    setMounted(true);
  }, []);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {
      // Ignore write errors
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "id" : "en");
  };

  const d = useMemo(() => {
    return translations[language] || translations.en;
  }, [language]);

  // Dot notation string resolver helper
  const t = (path: string): string => {
    const keys = path.split(".");
    let current: any = d;
    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return path;
      }
    }
    return typeof current === "string" ? current : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, d, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

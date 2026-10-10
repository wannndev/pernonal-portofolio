"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MotionPreset } from "./MotionPreset";
import { BrandLogo } from "./BrandLogo";
import { useLanguage } from "./LanguageProvider";

export function Footer() {
  const { d } = useLanguage();

  const footerLinks = useMemo(
    () => [
      { label: d.nav.portfolio, href: "/portfolio" },
      { label: d.nav.services, href: "/#services" },
      { label: d.nav.about, href: "/#about" },
      { label: d.nav.projects, href: "/#projects" },
      { label: d.nav.certificates, href: "/certificates" },
      { label: d.footer.contact, href: "/contact-me" },
    ],
    [d]
  );

  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border)] relative overflow-hidden">
      
      {/* Top CTA Banner */}
      <div className="border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 lg:border-x border-[var(--border)] bg-[var(--background)] py-20 sm:py-24">
          <MotionPreset
            fade
            blur
            slide={{ direction: "up", offset: 35 }}
            className="relative rounded-3xl p-8 sm:p-16 border border-[var(--border)] bg-gradient-to-b from-[var(--card)] to-[var(--secondary)]/30 overflow-hidden text-center max-w-4xl mx-auto space-y-6 shadow-sm"
          >
            {/* Subtle background glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] bg-[var(--background)]">
              {d.footer.connectBadge}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
              {d.footer.connectTitle1} <br className="hidden sm:inline" />
              {d.footer.connectTitle2}
            </h2>

            <p className="text-base sm:text-lg text-[var(--muted-foreground)] max-w-xl mx-auto">
              {d.footer.connectDesc}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact-me"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold text-sm shadow-md hover:scale-105 transition-all"
              >
                <span>{d.footer.startProject}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href="mailto:ridwanprakoso@example.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[var(--border)] text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
              >
                <span>ridwanprakoso@example.com</span>
              </a>
            </div>
          </MotionPreset>
        </div>
      </div>

      {/* Main Footer Links & Bottom Bar */}
      <MotionPreset
        fade
        blur
        slide={{ direction: "up", offset: 20 }}
        delay={0.1}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 lg:border-x border-[var(--border)] bg-[var(--background)] py-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <BrandLogo size="md" />
            <span className="text-xs text-[var(--muted-foreground)] ml-1 border-l border-[var(--border)] pl-3 hidden sm:inline">
              {d.footer.creativePortfolio}
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--muted-foreground)]">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[var(--foreground)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
              aria-label="Dribbble"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.14 8.76c-.95-.12-2.58-.19-4.39.29-.25-.56-.52-1.13-.81-1.69 2.53-1.07 3.99-2.34 4.15-2.48 1.25 1.05 2.05 2.56 2.05 4.25 0 .28-.02.55-.05.82-.31-.58-.64-1.02-.95-1.19zm-3.69-5.46c-.16.14-1.57 1.37-4.04 2.42-1.19-2.18-2.31-3.79-2.43-3.95 1.54-.5 3.19-.63 4.8-.36.63.55 1.22 1.18 1.67 1.89zm-8.31.27c.12.16 1.23 1.74 2.43 3.9-2.88.94-5.63.97-6.04.97.43-1.97 1.68-3.65 3.61-4.87zm-4.14 7.23c.37 0 2.82-.02 5.61-.92.27.56.53 1.12.77 1.67-3.83 1.15-5.28 3.51-5.38 3.69-.64-1.27-1-2.71-1-4.24 0-.07 0-.14 0-.2zm3.32 6.07c.15-.22 1.44-2.18 5.16-3.32 1.03 2.68 1.48 4.88 1.53 5.14-2.52 1.05-5.35.48-6.69-1.82zm8.56 1.28c-.06-.29-.51-2.44-1.52-5.07 1.7-.5 3.22-.45 4.15-.34-.41 2.37-2.07 4.34-4.28 5.25.56-.73 1.12-1.5 1.65-2.34z" />
              </svg>
            </a>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="mt-10 pt-6 border-t border-[var(--border)] flex items-center justify-center text-center text-xs text-[var(--muted-foreground)]">
          <p>© 2026 WannDev. {d.footer.allRightsReserved}</p>
        </div>
      </MotionPreset>
    </footer>
  );
}

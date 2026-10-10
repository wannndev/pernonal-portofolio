"use client";

import React from "react";
import Image from "next/image";
import type { TranslationsType } from "@/locales";

interface HeroHeadlineProps {
  d: TranslationsType;
}

export function HeroHeadline({ d }: HeroHeadlineProps) {
  return (
    <h1 className="flex flex-col gap-2.5 sm:gap-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
      {/* Row 1: Menciptakan [VSCode + Flutter] Desain */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <span className="text-[var(--muted-foreground)]">{d.hero.crafting}</span>

        {/* Tech Badges */}
        <span className="inline-flex items-center -space-x-1.5 align-middle">
          <span className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 dark:bg-sky-400/15 border border-sky-300/40 shadow-xs">
            <Image
              src="/images/brand-logo/vscode.svg"
              alt="VS Code"
              width={18}
              height={18}
              className="object-contain"
            />
          </span>
          <span className="ring-2 ring-[var(--background)] flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 dark:bg-cyan-400/15 border border-cyan-300/40 shadow-xs">
            <Image
              src="/images/brand-logo/flutter.svg"
              alt="Flutter"
              width={18}
              height={18}
              className="object-contain"
            />
          </span>
        </span>

        <span>{d.hero.designs}</span>
      </div>

      {/* Row 2: Lebih Berdampak, */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <span>{d.hero.thatWork}</span>
        <span>{d.hero.harder}</span>
      </div>

      {/* Row 3: Berpikir [Rocket] Lebih Luas. */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <span>{d.hero.think}</span>

        {/* Rocket Badge */}
        <span className="inline-flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 dark:bg-rose-500/15 border border-rose-300/40 shadow-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fill-rose-500/30 text-rose-500 size-4 sm:size-4.5"
          >
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"></path>
            <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"></path>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"></path>
          </svg>
        </span>

        <span className="text-[var(--muted-foreground)]">{d.hero.bigger}</span>
      </div>
    </h1>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import type { TranslationsType } from "@/locales";

interface HeroHeadlineProps {
  d: TranslationsType;
}

export function HeroHeadline({ d }: HeroHeadlineProps) {
  return (
    <h1 className="flex flex-col gap-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
      {/* Row 1: Crafting [VSCode+Flutter] Designs */}
      <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
        <div style={{ opacity: 0.7, transform: "rotate(-5deg)" }}>
          <span className="text-[var(--muted-foreground)]">{d.hero.crafting}</span>
        </div>
        <div style={{ transform: "rotate(30deg)" }}>
          <div className="relative flex">
            <span className="flex size-9 sm:size-10 shrink-0 rotate-10 items-center justify-center rounded-[8px] bg-sky-500/15 dark:bg-sky-400/20 border border-sky-300/40">
              <Image
                src="/images/brand-logo/vscode.svg"
                alt="VS Code"
                width={20}
                height={20}
                className="object-contain"
              />
            </span>
            <span className="ring-[var(--background)] flex size-9 sm:size-10 shrink-0 rotate-[-6.2deg] items-center justify-center rounded-[8px] bg-cyan-500/15 dark:bg-cyan-400/20 ring-3 -ml-2 border border-cyan-300/40">
              <Image
                src="/images/brand-logo/flutter.svg"
                alt="Flutter"
                width={20}
                height={20}
                className="object-contain"
              />
            </span>
          </div>
        </div>
        <div style={{ transform: "rotate(3deg)" }}>
          <span>{d.hero.designs}</span>
        </div>
      </div>

      {/* Row 2: That Work Harder, */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        <div style={{ transform: "rotate(-2deg)" }}>
          <span>{d.hero.thatWork}</span>
        </div>
        <div style={{ transform: "rotate(8deg)" }}>
          <span className="inline-block">{d.hero.harder}</span>
        </div>
      </div>

      {/* Row 3: Think [Rocket] Bigger. */}
      <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
        <div style={{ transform: "rotate(4deg)" }}>
          <span>{d.hero.think}</span>
        </div>
        <div style={{ transform: "rotate(180deg)" }}>
          <span className="bg-rose-500/15 dark:bg-rose-500/20 flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-[8px] border border-rose-300/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="fill-rose-500 text-rose-500 stroke-0 size-5"
            >
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"></path>
              <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"></path>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"></path>
            </svg>
          </span>
        </div>
        <div style={{ opacity: 0.7, transform: "rotate(-5deg)" }}>
          <span className="text-[var(--muted-foreground)]">{d.hero.bigger}</span>
        </div>
      </div>
    </h1>
  );
}

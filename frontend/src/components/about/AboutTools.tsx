"use client";

import React from "react";
import type { DesignTool } from "@/lib/api";

interface AboutToolsProps {
  title: string;
  subtitle: string;
  tools: DesignTool[];
}

export function AboutTools({ title, subtitle, tools }: AboutToolsProps) {
  return (
    <div className="group/card bg-[var(--card)] text-[var(--card-foreground)] flex flex-col gap-6 py-6 text-sm border border-[var(--border)] relative z-1 overflow-hidden rounded-3xl shadow-none">
      <div className="px-6 group-data-[size=sm]/card:px-4 z-10">
        {/* Title with Lucide Biceps Flexed Icon */}
        <div className="text-[var(--foreground)] mb-4 flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5 shrink-0"
            aria-hidden="true"
          >
            <path d="M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1"></path>
            <path d="M15 14a5 5 0 0 0-7.584 2"></path>
            <path d="M9.964 6.825C8.019 7.977 9.5 13 8 15"></path>
          </svg>
          <h4 className="text-xl font-semibold">{title}</h4>
        </div>

        {/* Subtitle */}
        <p className="text-[var(--muted-foreground)] mb-6 text-base lg:text-lg max-w-3xl">
          {subtitle}
        </p>

        {/* Badges List */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {tools.map((t) => {
            const darkImg = (t as any).dark_icon || (t as any).darkIcon;
            const showTxt = t.show_name ?? (t as any).showName ?? true;
            return (
              <div
                key={t.id || t.name}
                className="transition-transform hover:scale-105 duration-200"
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={t.href || "#"}
                  className="inline-flex w-fit shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--background)]/60 backdrop-blur-xs px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-[var(--muted)] text-[var(--foreground)]"
                >
                  <img
                    src={t.icon}
                    alt={t.name}
                    className={`h-6 object-contain ${darkImg ? "dark:hidden" : ""}`}
                    aria-hidden="true"
                  />
                  {darkImg && (
                    <img
                      src={darkImg}
                      alt={t.name}
                      className="hidden h-6 object-contain dark:block"
                      aria-hidden="true"
                    />
                  )}
                  {showTxt && <span>{t.name}</span>}
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rotated Dots Pattern at Bottom-Right */}
      <div
        className="absolute right-[-11%] -bottom-[72px] -z-1 flex w-[70%] -rotate-8 flex-wrap gap-x-[15px] gap-y-[9px] max-lg:hidden xl:-bottom-[52px] pointer-events-none select-none opacity-40 dark:opacity-25"
        aria-hidden="true"
      >
        {Array.from({ length: 400 }).map((_, i) => (
          <div
            key={i}
            className="bg-[var(--foreground)] relative inline-flex w-[3px] h-[3px] rounded-full shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

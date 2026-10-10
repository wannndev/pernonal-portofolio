"use client";

import React from "react";
import { MotionPreset } from "@/components/MotionPreset";

interface SkillsMarqueeProps {
  skillsRow1: string[];
  skillsRow2: string[];
}

function getTrackItems(arr: string[]): string[] {
  if (!arr || arr.length === 0) return [];
  let res = [...arr];
  while (res.length < 12) {
    res = [...res, ...arr];
  }
  return res;
}

export function SkillsMarquee({ skillsRow1, skillsRow2 }: SkillsMarqueeProps) {
  const row1Items = getTrackItems(skillsRow1);
  const row2Items = getTrackItems(skillsRow2);

  return (
    <MotionPreset fade blur delay={0.2} className="relative pt-4">
      <style>{`
        @keyframes skillsScrollLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes skillsScrollRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .skills-marquee-left {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: skillsScrollLeft 45s linear infinite;
        }
        .skills-marquee-left:hover {
          animation-play-state: paused;
        }
        .skills-marquee-right {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: skillsScrollRight 45s linear infinite;
        }
        .skills-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--background)] to-transparent max-sm:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--background)] to-transparent max-sm:hidden" />

      {/* Row 1 Skills Marquee */}
      <div className="w-full overflow-hidden mb-3">
        <div className="skills-marquee-left">
          <div className="flex shrink-0 items-center gap-3 pr-3">
            {row1Items.map((skill, idx) => (
              <span
                key={`r1-t1-${idx}`}
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-sm font-medium text-[var(--foreground)] hover:border-zinc-400 transition-colors shadow-2xs"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden="true">
            {row1Items.map((skill, idx) => (
              <span
                key={`r1-t2-${idx}`}
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-sm font-medium text-[var(--foreground)] hover:border-zinc-400 transition-colors shadow-2xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 Skills Marquee (Reverse) */}
      <div className="w-full overflow-hidden">
        <div className="skills-marquee-right">
          <div className="flex shrink-0 items-center gap-3 pr-3">
            {row2Items.map((skill, idx) => (
              <span
                key={`r2-t1-${idx}`}
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:border-zinc-400 transition-colors shadow-2xs"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden="true">
            {row2Items.map((skill, idx) => (
              <span
                key={`r2-t2-${idx}`}
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:border-zinc-400 transition-colors shadow-2xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </MotionPreset>
  );
}

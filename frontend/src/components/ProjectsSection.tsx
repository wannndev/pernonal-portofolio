"use client";

import React, { useState } from "react";
import type { ProjectShowcase } from "@/lib/api";
import { MotionPreset } from "@/components/MotionPreset";
import { BlurText } from "@/components/BlurText";
import { useLanguage } from "./LanguageProvider";
import { fallbackProjects } from "./projects/fallbackProjects";
import { ProjectAccordionItem } from "./projects/ProjectAccordionItem";

interface ProjectsSectionProps {
  projects?: ProjectShowcase[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { d, language } = useLanguage();

  const getLocalizedPeriod = (str: string) => {
    if (language !== "id" || !str) return str;
    return str
      .replace(/Months/gi, "Bulan")
      .replace(/Month/gi, "Bulan")
      .replace(/Days/gi, "Hari")
      .replace(/Day/gi, "Hari")
      .replace(/Years/gi, "Tahun")
      .replace(/Year/gi, "Tahun")
      .replace(/Present/gi, "Sekarang")
      .replace(/January/gi, "Januari")
      .replace(/February/gi, "Februari")
      .replace(/March/gi, "Maret")
      .replace(/April/gi, "April")
      .replace(/May/gi, "Mei")
      .replace(/June/gi, "Juni")
      .replace(/July/gi, "Juli")
      .replace(/August/gi, "Agustus")
      .replace(/September/gi, "September")
      .replace(/October/gi, "Oktober")
      .replace(/November/gi, "November")
      .replace(/December/gi, "Desember")
      .replace(/Jan/gi, "Jan")
      .replace(/Feb/gi, "Feb")
      .replace(/Mar/gi, "Mar")
      .replace(/Apr/gi, "Apr")
      .replace(/Jun/gi, "Jun")
      .replace(/Jul/gi, "Jul")
      .replace(/Aug/gi, "Agu")
      .replace(/Sep/gi, "Sep")
      .replace(/Oct/gi, "Okt")
      .replace(/Nov/gi, "Nov")
      .replace(/Dec/gi, "Des");
  };

  const items = projects && projects.length > 0 ? projects : fallbackProjects;

  // Open the first item by default
  const [openIds, setOpenIds] = useState<Set<number>>(new Set([1]));

  const toggleItem = (id: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="projects" className="relative flex-1 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col min-[1147px]:border-x border-[var(--border)] bg-[var(--background)]">
        {/* Section Header */}
        <MotionPreset fade blur slide={{ direction: "up", offset: 30 }} className="space-y-2.5 px-4 py-16 md:px-6 lg:px-8">
          <div>
            <span className="inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border border-[var(--border)] text-[var(--foreground)] h-auto rounded-full px-2.5 py-0.5 text-xs font-medium bg-[var(--card)]">
              {d.projects.badge}
            </span>
          </div>

          <div className="flex justify-between gap-4 max-md:flex-col items-start lg:items-center">
            <div className="max-w-[420px]">
              <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-[var(--foreground)]">
                <BlurText
                  key={d.projects.title}
                  text={d.projects.title}
                  delay={100}
                  className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-[var(--foreground)]"
                />
              </h2>
            </div>
            <div>
              <p className="text-[var(--muted-foreground)] max-w-[620px] text-lg sm:text-xl leading-relaxed">
                {d.projects.description}
              </p>
            </div>
          </div>
        </MotionPreset>

        {/* Projects Accordion List */}
        <div className="flex flex-col w-full border-t border-[var(--border)]">
          {items.map((proj, idx) => (
            <MotionPreset
              key={proj.id}
              fade
              blur
              slide={{ direction: "up", offset: 30 }}
              delay={idx * 0.08}
              className="border-b border-[var(--border)] transition-colors"
            >
              <ProjectAccordionItem
                project={proj}
                isOpen={openIds.has(proj.id)}
                onToggle={() => toggleItem(proj.id)}
                getLocalizedPeriod={getLocalizedPeriod}
                language={language}
              />
            </MotionPreset>
          ))}
        </div>
      </div>
    </section>
  );
}

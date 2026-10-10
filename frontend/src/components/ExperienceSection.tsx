"use client";

import React, { useState } from "react";
import type { Experience } from "@/lib/api";
import { MotionPreset } from "@/components/MotionPreset";
import { BlurText } from "@/components/BlurText";
import { useLanguage } from "./LanguageProvider";
import { fallbackExperiences } from "./experience/fallbackExperiences";
import { ExperienceItem } from "./experience/ExperienceItem";
import type { GroupedExperience } from "./experience/types";

interface ExperienceSectionProps {
  experiences?: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const { d, language } = useLanguage();

  const groupedData: GroupedExperience[] = React.useMemo(() => {
    if (!experiences || experiences.length === 0) return fallbackExperiences;

    const map = new Map<string, GroupedExperience>();
    experiences.forEach((exp) => {
      const compName = exp.company || "UX studio";
      if (!map.has(compName)) {
        const isUXStudio = compName.toLowerCase().includes("ux studio");
        map.set(compName, {
          company: compName,
          logo: isUXStudio ? fallbackExperiences[0].logo : fallbackExperiences[1].logo,
          roles: [],
        });
      }
      map.get(compName)!.roles.push({
        id: exp.id,
        role: exp.role,
        employment_type: exp.employment_type || "Full-time",
        period: exp.period,
        bullets: exp.bullets,
        skills: exp.skills,
      });
    });

    return Array.from(map.values());
  }, [experiences]);

  // Open Jr. UX Designer (id 2) by default
  const [openIds, setOpenIds] = useState<Set<number | string>>(new Set([2]));

  const toggleItem = (id: number | string) => {
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
    <section id="experience" className="relative flex-1 border-y border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col min-[1147px]:border-x border-[var(--border)] bg-[var(--background)]">
        {/* Section Header */}
        <MotionPreset fade blur slide={{ direction: "up", offset: 30 }} className="space-y-2.5 px-4 py-16 md:px-6 lg:px-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border border-[var(--border)] text-[var(--foreground)] h-auto rounded-full px-2.5 py-0.5 text-xs font-medium bg-[var(--card)]">
              {d.experience.badge}
            </span>
          </div>

          <div className="flex justify-between gap-4 max-md:flex-col items-start lg:items-center">
            <div className="max-w-[420px]">
              <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-[var(--foreground)]">
                <BlurText
                  key={d.experience.title}
                  text={d.experience.title}
                  delay={100}
                  className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-[var(--foreground)]"
                />
              </h2>
            </div>
            <div>
              <p className="text-[var(--muted-foreground)] max-w-[620px] text-lg sm:text-xl leading-relaxed">
                {d.experience.description}
              </p>
            </div>
          </div>
        </MotionPreset>

        {/* Grouped Companies Accordion List */}
        <div className="border-t border-[var(--border)]">
          {groupedData.map((group, gIdx) => (
            <MotionPreset
              key={group.company + gIdx}
              fade
              blur
              slide={{ direction: "up", offset: 35 }}
              delay={gIdx * 0.1}
              className="border-b border-[var(--border)] px-4 sm:px-8 py-6 sm:py-8 last:border-b-0"
            >
              {/* Company Logo & Name Header */}
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-[var(--foreground)]/10 text-[var(--foreground)] flex size-8 items-center justify-center rounded-md shrink-0">
                  {group.logo}
                </div>
                <p className="text-xl font-semibold text-[var(--foreground)]">{group.company}</p>
              </div>

              {/* Roles Timeline Accordion */}
              <div className="flex flex-col relative w-full space-y-3.5">
                {group.roles.map((item, rIdx) => (
                  <ExperienceItem
                    key={item.id}
                    item={item}
                    isExpanded={openIds.has(item.id)}
                    isLastRole={rIdx === group.roles.length - 1}
                    language={language}
                    onToggle={() => toggleItem(item.id)}
                  />
                ))}
              </div>
            </MotionPreset>
          ))}
        </div>
      </div>
    </section>
  );
}

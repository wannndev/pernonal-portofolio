"use client";

import React from "react";
import type { ProfileInfo, DesignTool } from "@/lib/api";
import { MotionPreset } from "@/components/MotionPreset";
import { BlurText } from "@/components/BlurText";
import { useLanguage } from "./LanguageProvider";
import { AboutBio } from "./about/AboutBio";
import { AboutTools } from "./about/AboutTools";
import { defaultTools } from "./about/defaultTools";

interface AboutSectionProps {
  profile?: ProfileInfo;
  tools?: DesignTool[];
}

export function AboutSection({ profile, tools: toolsProp }: AboutSectionProps) {
  const { d, language } = useLanguage();

  const aboutParagraphs =
    language === "en"
      ? d.about.paragraphs
      : profile?.about_paragraphs && profile.about_paragraphs.length > 0
      ? profile.about_paragraphs
      : d.about.paragraphs;

  const tools = toolsProp && toolsProp.length > 0 ? toolsProp : defaultTools;

  return (
    <section id="about" className="relative">
      <div className="mx-auto max-w-6xl flex-1 min-[1147px]:border-x border-[var(--border)] bg-[var(--background)]">
        {/* Section Header */}
        <MotionPreset
          fade
          blur
          slide={{ direction: "up", offset: 30 }}
          className="space-y-2.5 px-4 py-16 md:px-6 lg:px-8"
        >
          <div>
            <span className="inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border border-[var(--border)] text-[var(--foreground)] h-auto rounded-full px-2.5 py-0.5 text-xs font-medium bg-[var(--card)]">
              {d.about.badge}
            </span>
          </div>
          <div className="flex justify-between gap-4 max-lg:flex-col">
            <div className="max-w-[400px]">
              <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-[var(--foreground)]">
                <BlurText
                  key={d.about.title}
                  text={d.about.title}
                  delay={100}
                  className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-[var(--foreground)]"
                />
              </h2>
            </div>
            <div>
              <p className="text-[var(--muted-foreground)] max-w-[640px] text-lg sm:text-xl">
                {d.about.description}
              </p>
            </div>
          </div>
        </MotionPreset>

        <hr className="border-[var(--border)]" />

        {/* Top Grid: Photo, Name, Socials & Bio Paragraphs */}
        <MotionPreset
          fade
          blur
          slide={{ direction: "up", offset: 40 }}
          delay={0.1}
        >
          <AboutBio profile={profile} paragraphs={aboutParagraphs} />
        </MotionPreset>

        {/* Bottom Card: Tools That Power My Design Process */}
        <MotionPreset fade blur delay={0.15} className="px-4 pb-16 md:px-6 lg:px-8">
          <AboutTools
            title={language === "id" ? d.about.toolsTitle : (profile?.about_tools_title || d.about.toolsTitle)}
            subtitle={language === "id" ? d.about.toolsSubtitle : (profile?.about_tools_description || d.about.toolsSubtitle)}
            tools={tools}
          />
        </MotionPreset>
      </div>
    </section>
  );
}

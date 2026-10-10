"use client";

import React from "react";
import type { ProfileInfo } from "@/lib/api";
import { SocialLinks } from "./SocialLinks";

interface AboutParagraph {
  highlight?: string;
  text: string;
}

interface AboutBioProps {
  profile?: ProfileInfo;
  paragraphs: AboutParagraph[];
}

export function AboutBio({ profile, paragraphs }: AboutBioProps) {
  return (
    <div className="grid grid-cols-1 gap-8 px-4 py-16 md:px-6 lg:grid-cols-2 lg:gap-11 lg:px-8 items-center">
      {/* Left Column: Photo & Name & Socials */}
      <div className="space-y-7">
        <div className="relative mx-auto w-full max-w-[420px]">
          {/* Photo Card with Hover-to-Color Interaction */}
          <div className="group relative overflow-hidden rounded-xl lg:rounded-3xl select-none border border-[var(--border)] bg-[var(--card)] shadow-lg cursor-pointer">
            <img
              src={profile?.about_image || "/images/profile/image-01.webp"}
              alt={profile?.name || "John Doe - UI/UX Designer"}
              className="w-full aspect-[4/5] object-cover filter grayscale contrast-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
            />
          </div>
        </div>

        {/* Name, Title & Social Links */}
        <div className="flex items-center justify-between gap-3 max-sm:flex-col max-sm:items-start">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--foreground)]">
              {profile?.name || "John Doe"}
            </h3>
            <p className="text-[var(--muted-foreground)] text-base sm:text-lg">
              {profile?.title || "UI/UX Designer"}
            </p>
          </div>
          <SocialLinks />
        </div>
      </div>

      {/* Right Column: Bio Paragraphs */}
      <div className="space-y-6 lg:space-y-8">
        {paragraphs.map((para, idx) => (
          <p
            key={idx}
            className="text-[var(--muted-foreground)] text-base leading-relaxed md:text-lg"
          >
            {para.highlight && (
              <span className="text-[var(--foreground)] font-medium">
                {para.highlight}{" "}
              </span>
            )}
            {para.text}
          </p>
        ))}
      </div>
    </div>
  );
}

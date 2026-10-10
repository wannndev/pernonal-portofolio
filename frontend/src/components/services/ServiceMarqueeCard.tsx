"use client";

import React, { useState } from "react";
import { getServiceIcon } from "./ServiceIcons";

interface ServiceMarqueeCardProps {
  title: string;
  description: string;
  icon?: string;
  images?: string[];
}

const defaultPreviews = [
  { src: "/images/services/image-01.webp", alt: "Modern UI Design" },
  { src: "/images/services/image-02.webp", alt: "AI-Driven Success" },
  { src: "/images/services/image-03.webp", alt: "Intelligent Modern Interface" },
];

export function ServiceMarqueeCard({
  title,
  description,
  icon = "framer",
  images,
}: ServiceMarqueeCardProps) {
  const [, setIsHovered] = useState(false);

  const previewItems =
    images && images.length > 0
      ? images.map((src, idx) => ({ src, alt: `${title} ${idx + 1}` }))
      : defaultPreviews;

  return (
    <div className="group rounded-3xl bg-[var(--muted)]/50 border border-transparent hover:border-[var(--border)] transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-none ring-0 flex-1">
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2.5 text-xl font-semibold text-[var(--foreground)]">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[var(--background)] border border-[var(--border)] shadow-2xs">
            {getServiceIcon(icon, "framer")}
          </div>
          <span>{title}</span>
        </div>
        <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Mockups Marquee Preview */}
      <div
        className="relative w-full overflow-hidden rounded-2xl py-2 group/marquee"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <style>{`
          @keyframes serviceMarqueeLeft {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .service-marquee-anim {
            display: flex;
            width: max-content;
            will-change: transform;
            animation: serviceMarqueeLeft 40s linear infinite;
          }
          .service-marquee-anim:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="service-marquee-anim">
          <div className="flex shrink-0 items-center gap-4 pr-4">
            {previewItems.map((item, idx) => (
              <div
                key={`fp1-${idx}`}
                className="relative h-56 sm:h-60 w-64 sm:w-72 shrink-0 overflow-hidden rounded-xl border border-[var(--border)]/60 bg-[var(--card)] shadow-sm"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-4 pr-4" aria-hidden="true">
            {previewItems.map((item, idx) => (
              <div
                key={`fp2-${idx}`}
                className="relative h-56 sm:h-60 w-64 sm:w-72 shrink-0 overflow-hidden rounded-xl border border-[var(--border)]/60 bg-[var(--card)] shadow-sm"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

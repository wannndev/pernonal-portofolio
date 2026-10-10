"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import type { ProfileInfo, BrandLogo } from "@/lib/api";
import { MotionPreset } from "@/components/MotionPreset";
import { useLanguage } from "../LanguageProvider";

interface HeroBrandMarqueeProps {
  profile?: ProfileInfo;
  brandLogos: BrandLogo[];
}

export function HeroBrandMarquee({ profile, brandLogos }: HeroBrandMarqueeProps) {
  const { language } = useLanguage();
  const marqueeItems =
    brandLogos.length < 6
      ? [...brandLogos, ...brandLogos, ...brandLogos]
      : brandLogos;

  return (
    <MotionPreset
      fade
      blur
      delay={0.25}
      className="border-y border-[var(--border)] relative bg-dot-pattern w-full mt-auto"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 lg:border-x border-[var(--border)] bg-[var(--background)] py-3 sm:py-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: Designers rating */}
          <div className="md:col-span-4 flex items-center gap-4">
            <div className="flex -space-x-4">
              {[
                "/images/about/image-21.webp",
                "/images/about/image-22.webp",
                "/images/about/image-25.webp",
                "/images/about/image-26.webp",
              ].map((avatar, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 rounded-full ring-2 ring-[var(--background)] bg-zinc-200 dark:bg-zinc-700 overflow-hidden relative shadow-xs"
                >
                  <Image
                    src={avatar}
                    alt={`Designer ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
                <span className="text-sm font-bold text-[var(--foreground)] ml-1">
                  {profile?.rating_score ?? 4.5}
                </span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] whitespace-nowrap">
                {language === "id"
                  ? "Dipercaya oleh 1000+ desainer"
                  : profile?.rating_text || "Trusted by 1000+ designers"}
              </p>
            </div>
          </div>

          {/* Right: Continuous Brand Logos Marquee */}
          <div className="md:col-span-8 overflow-hidden relative">
            <style>{`
              @keyframes craftMarqueeLoop {
                0% { transform: translate3d(0, 0, 0); }
                100% { transform: translate3d(-50%, 0, 0); }
              }
              .craft-marquee-track {
                display: flex;
                width: max-content;
                will-change: transform;
                animation: craftMarqueeLoop 28s linear infinite;
              }
              .craft-marquee-track:hover {
                animation-play-state: paused;
              }
              .brand-logo-item {
                filter: grayscale(100%);
                opacity: 0.6;
                transition: filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
                cursor: pointer;
              }
              .brand-logo-item:hover {
                filter: grayscale(0%) !important;
                opacity: 1 !important;
                transform: scale(1.08);
              }
            `}</style>
            <div className="absolute left-0 inset-y-0 w-12 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

            {/* Infinite Continuous Seamless Marquee */}
            <div className="craft-marquee-track">
              {/* Track 1 */}
              <div className="flex shrink-0 items-center gap-12 pr-12">
                {marqueeItems.map((logo, index) => {
                  const logoSrc = (logo as any).logo || (logo as any).src;
                  const content = (
                    <div
                      className="h-9 sm:h-10 w-28 sm:w-32 relative brand-logo-item flex items-center justify-center shrink-0"
                      title={logo.name}
                    >
                      <img
                        src={logoSrc}
                        alt={logo.name}
                        className="max-h-full max-w-full object-contain pointer-events-none"
                      />
                    </div>
                  );

                  return (logo as any).url ? (
                    <a
                      key={`t1-${index}`}
                      href={(logo as any).url}
                      target="_blank"
                      rel="noreferrer"
                      className="cursor-pointer"
                    >
                      {content}
                    </a>
                  ) : (
                    <React.Fragment key={`t1-${index}`}>{content}</React.Fragment>
                  );
                })}
              </div>

              {/* Track 2 (Identical clone for seamless loop) */}
              <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden="true">
                {marqueeItems.map((logo, index) => {
                  const logoSrc = (logo as any).logo || (logo as any).src;
                  const content = (
                    <div
                      className="h-9 sm:h-10 w-28 sm:w-32 relative brand-logo-item flex items-center justify-center shrink-0"
                      title={logo.name}
                    >
                      <img
                        src={logoSrc}
                        alt={logo.name}
                        className="max-h-full max-w-full object-contain pointer-events-none"
                      />
                    </div>
                  );

                  return (logo as any).url ? (
                    <a
                      key={`t2-${index}`}
                      href={(logo as any).url}
                      target="_blank"
                      rel="noreferrer"
                      className="cursor-pointer"
                    >
                      {content}
                    </a>
                  ) : (
                    <React.Fragment key={`t2-${index}`}>{content}</React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionPreset>
  );
}

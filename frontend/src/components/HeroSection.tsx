"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProfileInfo, BrandLogo } from "@/lib/api";
import { MotionPreset } from "@/components/MotionPreset";
import { useLanguage } from "./LanguageProvider";
import { HeroHeadline } from "./hero/HeroHeadline";
import { HeroBrandMarquee } from "./hero/HeroBrandMarquee";
import { defaultBrandLogos } from "./hero/defaultBrandLogos";

interface HeroSectionProps {
  profile?: ProfileInfo;
  brandLogos?: BrandLogo[];
}

export function HeroSection({ profile, brandLogos }: HeroSectionProps = {}) {
  const { d } = useLanguage();
  const activeBrands =
    brandLogos && brandLogos.length > 0 ? brandLogos : defaultBrandLogos;

  return (
    <section
      id="home"
      className="relative flex-1 min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-visible"
    >
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 lg:border-x border-[var(--border)] bg-[var(--background)] flex-1 flex flex-col justify-center py-6 sm:py-8 lg:py-10">
        {/* Main 2-column Hero content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <MotionPreset
            fade
            blur
            slide={{ direction: "up", offset: 30 }}
            delay={0.05}
            className="space-y-4 sm:space-y-5 z-10"
          >
            <HeroHeadline d={d} />

            {/* Subheading */}
            <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-xl leading-relaxed">
              {d.hero.description1}
              <strong className="font-semibold text-[var(--foreground)]">
                {d.hero.descriptionHighlight1}
              </strong>
              {d.hero.description2}
              <strong className="font-semibold text-[var(--foreground)]">
                {d.hero.descriptionHighlight2}
              </strong>
              {d.hero.description3}
            </p>

            {/* Hire Me CTA Button */}
            <div className="pt-1">
              <Link
                href="/contact-me"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>{d.hero.hireMe}</span>
                <div className="w-6 h-6 rounded-full bg-zinc-700 text-white dark:bg-zinc-200 dark:text-zinc-900 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </MotionPreset>

          {/* Right Column: Mobile-only static preview */}
          <MotionPreset
            fade
            blur
            zoom={{ initialScale: 0.95, scale: 1 }}
            delay={0.15}
            className="relative min-h-[300px] sm:min-h-[340px] lg:min-h-[360px] w-full flex items-center justify-center"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/10 via-rose-500/10 to-indigo-500/10 rounded-3xl blur-2xl opacity-50 pointer-events-none" />

            <div className="block md:hidden w-full max-w-md rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 shadow-xl overflow-hidden">
              <div className="px-4 py-2.5 bg-zinc-100/80 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                </div>
                <div className="px-3 py-0.5 rounded-md bg-white dark:bg-zinc-800 text-[10px] font-mono text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                  shadcn/studio
                </div>
                <div className="w-8" />
              </div>
              <div className="relative aspect-[16/10] w-full bg-zinc-900">
                <Image
                  src="/images/portfolio/image-01.webp"
                  alt="Featured Project"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </MotionPreset>
        </div>
      </div>

      {/* Bottom Bar: Reviews + Brand Logos Marquee */}
      <HeroBrandMarquee profile={profile} brandLogos={activeBrands} />
    </section>
  );
}

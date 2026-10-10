"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageSquareMore } from "lucide-react";
import type { ServiceItem } from "@/lib/api";
import { MotionPreset } from "@/components/MotionPreset";
import { BlurText } from "@/components/BlurText";
import { useLanguage } from "./LanguageProvider";
import { CyclingStackPreview } from "./services/CyclingStackPreview";
import { ServiceMarqueeCard } from "./services/ServiceMarqueeCard";
import { SkillsMarquee } from "./services/SkillsMarquee";
import { getServiceIcon } from "./services/ServiceIcons";

interface ServicesSectionProps {
  services?: ServiceItem[];
  skillsRow1?: string[];
  skillsRow2?: string[];
}

const defaultSkillsRow1 = [
  "Figma",
  "UI Design",
  "UX Design",
  "Canva",
];

const defaultSkillsRow2 = [
  "Next.js",
  "Tailwind CSS",
  "React",
  "TypeScript",
  "Design Systems",
  "Responsive Web",
  "User Flows",
  "Landing Page Design",
];

export function ServicesSection({
  services,
  skillsRow1: propSkillsRow1,
  skillsRow2: propSkillsRow2,
}: ServicesSectionProps) {
  const { d, language } = useLanguage();

  const sortedServices =
    services && services.length > 0
      ? [...services].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      : [];

  const s1 = {
    title: language === "id" ? d.services.items.s1Title : (sortedServices[0]?.title || d.services.items.s1Title),
    description: language === "id" ? d.services.items.s1Desc : (sortedServices[0]?.description || d.services.items.s1Desc),
    icon: sortedServices[0]?.icon || "palette",
    images: sortedServices[0]?.images && sortedServices[0].images.length > 0 ? sortedServices[0].images : [
      "/uploads/1791629938_whatsapp-image-2026-10-10-at-55812-pm.webp",
      "/uploads/1791629952_whatsapp-image-2026-10-10-at-55831-pm.webp",
      "/uploads/1791630647_whatsapp-image-2026-10-10-at-61030-pm.webp",
    ],
  };

  const s2 = {
    title: language === "id" ? d.services.items.s2Title : (sortedServices[1]?.title || d.services.items.s2Title),
    description: language === "id" ? d.services.items.s2Desc : (sortedServices[1]?.description || d.services.items.s2Desc),
    icon: sortedServices[1]?.icon || "laptop",
  };

  const s3 = {
    title: language === "id" ? d.services.items.s3Title : (sortedServices[2]?.title || d.services.items.s3Title),
    description: language === "id" ? d.services.items.s3Desc : (sortedServices[2]?.description || d.services.items.s3Desc),
    icon: sortedServices[2]?.icon || "mobile",
  };

  const s4 = {
    title: language === "id" ? d.services.items.s4Title : (sortedServices[3]?.title || d.services.items.s4Title),
    description: language === "id" ? d.services.items.s4Desc : (sortedServices[3]?.description || d.services.items.s4Desc),
    icon: sortedServices[3]?.icon || "framer",
    images: sortedServices[3]?.images && sortedServices[3].images.length > 0 ? sortedServices[3].images : [
      "/uploads/1791630574_gemini-generated-image-qxboo0qxboo0qxbo.webp",
      "/uploads/1791629938_whatsapp-image-2026-10-10-at-55812-pm.webp",
      "/uploads/1791629952_whatsapp-image-2026-10-10-at-55831-pm.webp",
    ],
  };

  const skillsRow1 = propSkillsRow1 && propSkillsRow1.length > 0 ? propSkillsRow1 : defaultSkillsRow1;
  const skillsRow2 = propSkillsRow2 && propSkillsRow2.length > 0 ? propSkillsRow2 : defaultSkillsRow2;

  return (
    <section id="services" className="relative border-y border-[var(--border)] xl:flex overflow-hidden w-full min-w-0 max-w-full">
      {/* Left side dot pattern */}
      <div className="m-6 w-full shrink-2 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--primary)_15%,transparent)_2px,transparent_2px)] bg-size-[18px_18px] max-xl:hidden" />

      {/* Main architectural container */}
      <div className="mx-auto max-w-6xl w-full space-y-16 px-4 py-16 lg:border-x border-[var(--border)] bg-[var(--background)] sm:px-6 lg:px-8 min-w-0 max-w-full overflow-hidden">
        {/* Section Header */}
        <MotionPreset fade blur slide={{ direction: "up", offset: 30 }} className="space-y-4 w-full min-w-0">
          <div>
            <span className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] bg-[var(--card)]">
              {d.services.badge}
            </span>
          </div>
          <div className="flex justify-between gap-6 max-md:flex-col items-start md:items-end w-full min-w-0">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-[var(--foreground)]">
                <BlurText
                  key={d.services.title}
                  text={d.services.title}
                  delay={100}
                  className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-[var(--foreground)]"
                />
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
                {d.services.description}
              </p>
            </div>
          </div>
        </MotionPreset>

        {/* Horizontal Divider */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
          <div className="h-px w-full bg-[var(--border)]" />
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full min-w-0 max-w-full">
          {/* Left Column */}
          <MotionPreset fade blur slide={{ direction: "up", offset: 35 }} delay={0.1} className="flex flex-col gap-6 w-full min-w-0 max-w-full overflow-hidden">
            {/* Card 1: (Tall card with stacked preview) */}
            <div className="group rounded-3xl bg-[var(--muted)]/50 border border-transparent hover:border-[var(--border)] transition-all duration-300 p-5 sm:p-8 flex flex-col justify-between overflow-hidden shadow-none ring-0 w-full min-w-0 max-w-full">
              <div className="space-y-3 w-full min-w-0">
                <div className="flex items-center gap-2.5 text-xl font-semibold text-[var(--foreground)]">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[var(--background)] border border-[var(--border)] shadow-2xs shrink-0">
                    {getServiceIcon(s1.icon, "palette")}
                  </div>
                  <span>{s1.title}</span>
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-[var(--muted-foreground)] leading-relaxed break-words">
                  {s1.description}
                </p>
              </div>

              <CyclingStackPreview
                images={
                  s1.images && s1.images.length > 0
                    ? s1.images.map((src, idx) => ({ id: `s1-${idx}`, src, alt: s1.title }))
                    : [
                        { id: "img-01", src: "/uploads/1791629938_whatsapp-image-2026-10-10-at-55812-pm.webp", alt: "UmrohApps" },
                        { id: "img-02", src: "/uploads/1791629952_whatsapp-image-2026-10-10-at-55831-pm.webp", alt: "Billing WA" },
                        { id: "img-03", src: "/uploads/1791630647_whatsapp-image-2026-10-10-at-61030-pm.webp", alt: "Personal Portofolio" },
                      ]
                }
              />
            </div>

            {/* Card 2: (Compact card, text only) */}
            <div className="group rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 p-5 sm:p-8 shadow-2xs w-full min-w-0 max-w-full">
              <div className="space-y-3 w-full min-w-0">
                <div className="flex items-center gap-2.5 text-xl font-semibold text-[var(--foreground)]">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[var(--secondary)] border border-[var(--border)] shadow-2xs shrink-0">
                    {getServiceIcon(s2.icon, "laptop")}
                  </div>
                  <span>{s2.title}</span>
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-[var(--muted-foreground)] leading-relaxed break-words">
                  {s2.description}
                </p>
              </div>
            </div>
          </MotionPreset>

          {/* Right Column */}
          <MotionPreset fade blur slide={{ direction: "up", offset: 35 }} delay={0.18} className="flex flex-col gap-6 w-full min-w-0 max-w-full overflow-hidden">
            {/* Card 3: (Compact card, text only) */}
            <div className="group rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 p-5 sm:p-8 shadow-2xs w-full min-w-0 max-w-full">
              <div className="space-y-3 w-full min-w-0">
                <div className="flex items-center gap-2.5 text-xl font-semibold text-[var(--foreground)]">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[var(--secondary)] border border-[var(--border)] shadow-2xs shrink-0">
                    {getServiceIcon(s3.icon, "pen-tool")}
                  </div>
                  <span>{s3.title}</span>
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-[var(--muted-foreground)] leading-relaxed break-words">
                  {s3.description}
                </p>
              </div>
            </div>

            {/* Card 4: (Tall card with horizontal marquee) */}
            <ServiceMarqueeCard
              title={s4.title}
              description={s4.description}
              icon={s4.icon}
              images={s4.images}
            />
          </MotionPreset>
        </div>

        {/* Skills Ticker Marquee */}
        <SkillsMarquee skillsRow1={skillsRow1} skillsRow2={skillsRow2} />

        {/* Bottom Horizontal Divider */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
          <div className="h-px w-full bg-[var(--border)]" />
        </div>

        {/* CTA Buttons */}
        <MotionPreset fade blur delay={0.25} className="flex items-center justify-center gap-4">
          <Link
            href="/contact-me"
            className="group/button relative inline-flex h-11 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[var(--primary)] px-6 text-sm font-medium text-[var(--primary-foreground)] shadow-xs transition-all duration-300 hover:shadow-md hover:opacity-95 active:translate-y-px"
          >
            <span>{d.hero.hireMe}</span>
            <div className="flex size-5 items-center justify-center rounded-full bg-[var(--primary-foreground)] text-[var(--primary)] transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5">
              <ArrowUpRight className="size-3.5 stroke-[2.5]" />
            </div>
          </Link>

          <div className="h-9 w-px bg-[var(--border)]" />

          <Link
            href="/contact-me"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-6 text-sm font-medium text-[var(--foreground)] shadow-2xs transition-all duration-300 hover:bg-[var(--secondary)] hover:text-[var(--foreground)] active:translate-y-px"
          >
            <span>{d.nav.letsTalk}</span>
            <MessageSquareMore className="size-4 text-[var(--muted-foreground)]" />
          </Link>
        </MotionPreset>
      </div>

      {/* Right side dot pattern */}
      <div className="m-6 w-full shrink-2 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--primary)_15%,transparent)_2px,transparent_2px)] bg-size-[18px_18px] max-xl:hidden" />
    </section>
  );
}

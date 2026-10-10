"use client";

import React from "react";
import Link from "next/link";
import { motion, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { PortfolioProject } from "@/lib/api";

interface PortfolioCardProps {
  project: PortfolioProject;
  categoryLabel: string;
  isMobile?: boolean;
  isDesktop?: boolean;
  motionStyle?: any;
  zIndexClass: string;
  rotateHoverClass: string;
  textOpacity: MotionValue<number>;
  textTranslateY: MotionValue<string>;
  textScale: MotionValue<number>;
}

export function PortfolioCard({
  project,
  categoryLabel,
  isMobile = false,
  isDesktop = false,
  motionStyle,
  zIndexClass,
  rotateHoverClass,
  textOpacity,
  textTranslateY,
  textScale,
}: PortfolioCardProps) {
  const projectLink = project.slug ? `/portfolio/${project.slug}` : (project.project_url || "#");
  const isExternal = projectLink.startsWith("http://") || projectLink.startsWith("https://");
  const imgLight = project.image_light || "/uploads/1791629938_whatsapp-image-2026-10-10-at-55812-pm.webp";
  const imgDark = project.image_dark || imgLight;

  const innerContent = (
    <>
      <div
        className={`overflow-hidden rounded-2xl border border-[var(--border)] bg-zinc-100 dark:bg-zinc-900 shadow-md ${rotateHoverClass} transition-transform duration-300`}
      >
        <div className="relative aspect-[16/10] w-full">
          <img
            src={imgLight}
            alt={project.title}
            className={`w-full h-full object-cover object-top ${
              imgDark && imgDark !== imgLight ? "dark:hidden" : ""
            }`}
          />
          {imgDark && imgDark !== imgLight && (
            <img
              src={imgDark}
              alt={project.title}
              className="hidden w-full h-full object-cover object-top dark:block"
            />
          )}
        </div>
      </div>

      <motion.div
        style={
          isDesktop
            ? {
                opacity: textOpacity,
                translateY: textTranslateY,
                scale: textScale,
              }
            : {}
        }
        className="flex items-center justify-between gap-4 pt-1"
      >
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-xl sm:text-2xl font-bold text-[var(--foreground)] group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors truncate">
            {project.title}
          </span>
          <span className="text-sm sm:text-base text-[var(--muted-foreground)] truncate">
            {categoryLabel}
          </span>
        </div>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-foreground)] group-hover:border-transparent transition-all shadow-xs shrink-0">
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
        </div>
      </motion.div>
    </>
  );

  return (
    <motion.div
      style={isDesktop ? motionStyle : {}}
      className={`group relative ${
        isDesktop && zIndexClass
          ? `${zIndexClass} will-change-transform perspective-distant transform-3d`
          : ""
      }`}
    >
      {isExternal ? (
        <a
          href={projectLink}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col gap-5 cursor-pointer"
        >
          {innerContent}
        </a>
      ) : (
        <Link href={projectLink} className="flex flex-col gap-5">
          {innerContent}
        </Link>
      )}
    </motion.div>
  );
}

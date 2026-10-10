"use client";

import React, { useEffect, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";
import type { PortfolioProject } from "@/lib/api";
import { useLanguage } from "./LanguageProvider";
import { getScrollTransforms } from "./portfolio/scrollTransforms";
import { defaultProjects } from "./portfolio/defaultProjects";
import { PortfolioCard } from "./portfolio/PortfolioCard";

interface PortfolioSectionProps {
  projects?: PortfolioProject[];
}

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  const { d, language } = useLanguage();
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 0;
  });
  const [mounted, setMounted] = useState(false);
  const [scrollStart, setScrollStart] = useState(150);
  const [scrollEnd, setScrollEnd] = useState(650);

  const getCategoryLabel = (category: string) => {
    if (!category) return "";
    if (language === "id") {
      const lower = category.toLowerCase();
      if (lower.includes("e-commerce")) return "Situs E-Commerce";
      if (lower.includes("portfolio") || lower.includes("portofolio")) return "Situs Portofolio";
      if (lower.includes("ai")) return "Platform AI";
      if (lower.includes("saas")) return "Aplikasi SaaS";
      if (lower.includes("mobile")) return "Aplikasi Mobile";
    }
    return category;
  };

  // Directly track window scroll
  const { scrollY } = useScroll();

  // Smooth spring physics for silky, natural feeling
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 140,
    damping: 26,
    mass: 0.6,
  });

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setScrollStart(150);
      setScrollEnd(650);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = mounted && windowWidth >= 768;
  const isMobile = !isDesktop;
  const t = getScrollTransforms(isDesktop ? windowWidth : 0);

  // Active transforms driven by scroll position
  const card1Y = useTransform(smoothScrollY, [scrollStart, scrollEnd], [`${t.div1TranslateY}px`, "0px"]);
  const card1X = useTransform(smoothScrollY, [scrollStart, scrollEnd], [`${t.div1TranslateX}px`, "0px"]);

  const card2Y = useTransform(smoothScrollY, [scrollStart, scrollEnd], [`${t.div2TranslateY}px`, "0px"]);
  const card2X = useTransform(smoothScrollY, [scrollStart, scrollEnd], [`${t.div2TranslateX}px`, "0px"]);
  const card2Rotate = useTransform(smoothScrollY, [scrollStart, scrollEnd], [12, 0]);

  const card3Y = useTransform(smoothScrollY, [scrollStart, scrollEnd], [`${t.div3TranslateY}px`, "0px"]);
  const card3X = useTransform(smoothScrollY, [scrollStart, scrollEnd], [`${t.div3TranslateX}px`, "0px"]);
  const card3Rotate = useTransform(smoothScrollY, [scrollStart, scrollEnd], [-2, 0]);

  const card4Y = useTransform(smoothScrollY, [scrollStart, scrollEnd], [`${t.div4TranslateY}px`, "0px"]);
  const card4X = useTransform(smoothScrollY, [scrollStart, scrollEnd], [`${t.div4TranslateX}px`, "0px"]);
  const card4Rotate = useTransform(smoothScrollY, [scrollStart, scrollEnd], [8, 0]);

  const divScale = useTransform(smoothScrollY, [scrollStart, scrollEnd], [t.divScale, 1]);

  // Project label & button fade in as cards approach their final position in the grid
  const textRevealStart = scrollStart + (scrollEnd - scrollStart) * 0.6;
  const textOpacity = useTransform(smoothScrollY, [textRevealStart, scrollEnd], [0, 1]);
  const textTranslateY = useTransform(smoothScrollY, [textRevealStart, scrollEnd], ["-30px", "0px"]);
  const textScale = useTransform(smoothScrollY, [textRevealStart, scrollEnd], [0.85, 1]);

  const items = projects && projects.length > 0 ? projects : defaultProjects;

  return (
    <section
      id="portfolio"
      className="relative flex-1 py-12 sm:py-16 border-b border-[var(--border)] overflow-hidden md:overflow-visible z-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 lg:border-x border-[var(--border)] bg-[var(--background)]">
        {/* Section Header */}
        <div className="space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] bg-[var(--card)]">
            {d.portfolio.badge}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
              {d.portfolio.title}
            </h2>

            <p className="text-base sm:text-lg text-[var(--muted-foreground)] max-w-xl">
              {d.portfolio.description}
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-[var(--border)] mb-14" />

        {/* 2-Column Animated Portfolio Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 px-2 sm:px-4">
          {items[0] && (
            <PortfolioCard
              project={items[0]}
              categoryLabel={getCategoryLabel(items[0].category)}
              isMobile={isMobile}
              isDesktop={isDesktop}
              motionStyle={isDesktop ? { translateY: card1Y, translateX: card1X, scale: divScale } : {}}
              zIndexClass="z-40"
              rotateHoverClass="group-hover:rotate-2"
              textOpacity={textOpacity}
              textTranslateY={textTranslateY}
              textScale={textScale}
            />
          )}

          {items[1] && (
            <PortfolioCard
              project={items[1]}
              categoryLabel={getCategoryLabel(items[1].category)}
              isMobile={isMobile}
              isDesktop={isDesktop}
              motionStyle={
                isDesktop
                  ? {
                      translateY: card2Y,
                      translateX: card2X,
                      scale: divScale,
                      rotate: card2Rotate,
                    }
                  : {}
              }
              zIndexClass="z-30"
              rotateHoverClass="group-hover:-rotate-2"
              textOpacity={textOpacity}
              textTranslateY={textTranslateY}
              textScale={textScale}
            />
          )}

          {items[2] && (
            <PortfolioCard
              project={items[2]}
              categoryLabel={getCategoryLabel(items[2].category)}
              isMobile={isMobile}
              isDesktop={isDesktop}
              motionStyle={
                isDesktop
                  ? {
                      translateY: card3Y,
                      translateX: card3X,
                      scale: divScale,
                      rotate: card3Rotate,
                    }
                  : {}
              }
              zIndexClass="z-20"
              rotateHoverClass="group-hover:rotate-2"
              textOpacity={textOpacity}
              textTranslateY={textTranslateY}
              textScale={textScale}
            />
          )}

          {items[3] && (
            <PortfolioCard
              project={items[3]}
              categoryLabel={getCategoryLabel(items[3].category)}
              isMobile={isMobile}
              isDesktop={isDesktop}
              motionStyle={
                isDesktop
                  ? {
                      translateY: card4Y,
                      translateX: card4X,
                      scale: divScale,
                      rotate: card4Rotate,
                    }
                  : {}
              }
              zIndexClass="z-10"
              rotateHoverClass="group-hover:-rotate-2"
              textOpacity={textOpacity}
              textTranslateY={textTranslateY}
              textScale={textScale}
            />
          )}

          {/* Any additional projects dynamically rendered */}
          {items.slice(4).map((p, idx) => (
            <PortfolioCard
              key={p.id || `extra-${idx}`}
              project={p}
              categoryLabel={getCategoryLabel(p.category)}
              isMobile={isMobile}
              isDesktop={isDesktop}
              zIndexClass="z-0"
              rotateHoverClass={idx % 2 === 0 ? "group-hover:rotate-2" : "group-hover:-rotate-2"}
              textOpacity={textOpacity}
              textTranslateY={textTranslateY}
              textScale={textScale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

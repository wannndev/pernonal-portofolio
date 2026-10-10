"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServicesSection } from "@/components/ServicesSection";
import type { PortfolioProject, ServiceItem } from "@/lib/api";
import { MotionPreset } from "@/components/MotionPreset";
import { BlurText } from "@/components/BlurText";
import { useLanguage } from "@/components/LanguageProvider";

interface PortfolioPageClientProps {
  items: any[];
  services?: ServiceItem[];
}

export function PortfolioPageClient({ items, services }: PortfolioPageClientProps) {
  const { d, language } = useLanguage();

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

  return (
    <main className="relative flex flex-col overflow-x-clip *:scroll-mt-15.5">
      {/* Portfolio Showcase Grid Section */}
      <section id="portfolio-section" className="relative">
        <div className="relative overflow-hidden border-b border-border">
          <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 min-[1158px]:border-x border-border sm:px-6 lg:px-8">
            {/* Header with Blur and Slide Animation */}
            <MotionPreset
              fade
              blur
              slide={{ direction: "up", offset: 30 }}
              delay={0.05}
              className="space-y-2.5"
            >
              <div>
                <span className="inline-flex w-fit shrink-0 items-center justify-center border border-border text-foreground rounded-full px-2.5 py-0.5 text-xs font-medium bg-background">
                  {d.portfolio.badge}
                </span>
              </div>
              <div className="flex justify-between gap-4 max-md:flex-col">
                <div className="max-w-100">
                  <h1 className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-foreground">
                    <BlurText
                      key={d.portfolio.title}
                      text={d.portfolio.title}
                      delay={100}
                      className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-foreground"
                    />
                  </h1>
                </div>
                <div>
                  <p className="text-muted-foreground max-w-xl text-lg">
                    {d.portfolio.description}
                  </p>
                </div>
              </div>
            </MotionPreset>

            {/* Separator */}
            <div className="-mx-4 sm:-mx-6 lg:-mx-8">
              <div className="bg-border shrink-0 h-px w-full" />
            </div>

            {/* Projects Grid with Staggered Blur Reveal */}
            <div className="grid gap-x-12.5 gap-y-16 sm:grid-cols-2">
              {items.map((item: any, index: number) => {
                const projectLink =
                  item.slug ? `/portfolio/${item.slug}` : (item.project_url || "#");
                const isExternal =
                  projectLink.startsWith("http://") || projectLink.startsWith("https://");
                const imgLight =
                  item.image_light || item.image || "/images/portfolio/image-01.webp";
                const imgDark = item.image_dark || item.imageDark || imgLight;
                const tilt =
                  index % 2 === 0 ? "group-hover:rotate-3" : "group-hover:-rotate-3";

                const cardContent = (
                  <>
                    <div className="lg:h-93.5">
                      <div
                        className={`overflow-hidden rounded-[12px] border border-border shadow-xs ${tilt} transition-transform duration-300`}
                      >
                        <img
                          src={imgLight}
                          alt={item.title}
                          className={`w-full rounded-[11px] lg:h-93.5 lg:object-cover lg:object-center ${
                            imgDark && imgDark !== imgLight ? "dark:hidden" : ""
                          }`}
                        />
                        {imgDark && imgDark !== imgLight && (
                          <img
                            src={imgDark}
                            alt={item.title}
                            className="hidden w-full rounded-[11px] lg:h-93.5 lg:object-cover lg:object-center dark:block"
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 md:gap-6">
                      <div className="flex flex-col gap-2.5 min-w-0">
                        <span className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {item.title}
                        </span>
                        <span className="text-muted-foreground text-lg truncate">
                          {getCategoryLabel(item.category)}
                        </span>
                      </div>
                      <div className="inline-flex shrink-0 items-center justify-center border border-border bg-background group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground text-foreground size-9 rounded-full transition-all duration-300 shadow-xs">
                        <ArrowRight className="size-4 transition-transform duration-500 group-hover:-rotate-45" />
                      </div>
                    </div>
                  </>
                );

                return (
                  <MotionPreset
                    key={item.id || item.slug || index}
                    fade
                    blur
                    slide={{ direction: "up", offset: 40 }}
                    delay={index * 0.08}
                  >
                    {isExternal ? (
                      <a
                        href={projectLink}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative flex flex-col gap-6 **:transition-all **:duration-300 cursor-pointer"
                      >
                        {cardContent}
                      </a>
                    ) : (
                      <Link
                        href={projectLink}
                        className="group relative flex flex-col gap-6 **:transition-all **:duration-300"
                      >
                        {cardContent}
                      </Link>
                    )}
                  </MotionPreset>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection services={services} />
    </main>
  );
}

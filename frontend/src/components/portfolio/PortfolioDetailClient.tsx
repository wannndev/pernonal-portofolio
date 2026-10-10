"use client";

import React from "react";
import Link from "next/link";
import { Eye, ArrowRight, ArrowLeft } from "lucide-react";
import { MotionPreset } from "@/components/MotionPreset";
import { useLanguage } from "@/components/LanguageProvider";

interface PortfolioDetailClientProps {
  project: any;
  relatedProjects: any[];
}

export function PortfolioDetailClient({
  project,
  relatedProjects,
}: PortfolioDetailClientProps) {
  const { language, d } = useLanguage();
  const isEn = language === "en";

  const title = isEn && project.title_en ? project.title_en : (project.title_id || project.title);
  const description =
    isEn && project.description_en
      ? project.description_en
      : (project.description_id || project.description);
  const bodyHtml =
    isEn && project.bodyHtml_en
      ? project.bodyHtml_en
      : (project.bodyHtml_id || project.bodyHtml);

  return (
    <main className="relative flex flex-col overflow-x-clip *:scroll-mt-15.5">
      {/* Portfolio Content Section */}
      <section id="portfolio-content" className="relative flex-1">
        <MotionPreset
          fade
          blur
          slide={{ direction: "up", offset: 35 }}
          className="mx-auto flex w-full max-w-6xl flex-col min-[1147px]:border-x border-border"
        >
          {/* Header Row: Title, Subtitle, Live Preview */}
          <div className="mx-auto flex w-full flex-wrap items-center justify-between gap-6 px-4 py-16 md:px-6 lg:px-8">
            <div className="max-w-100">
              <div className="mb-4">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="size-3.5" />
                  <span>{d.portfolio.backToPortfolio}</span>
                </Link>
              </div>
              <h1 className="text-2xl font-bold text-pretty md:text-3xl lg:text-4xl text-foreground">
                {title}
              </h1>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground max-w-xl text-lg">
                {description}
              </p>

              {(project.liveUrl || project.project_url) && (
                <div className="flex gap-3">
                  <a
                    href={project.liveUrl || project.project_url}
                    target="_blank"
                    rel="noreferrer"
                    className="group/button relative inline-flex shrink-0 items-center justify-center bg-primary text-primary-foreground hover:bg-background hover:text-foreground border border-transparent hover:border-border h-9 px-4 rounded-full gap-2 text-sm font-medium transition-all duration-500 overflow-hidden shadow-xs cursor-pointer"
                  >
                    <span className="relative z-10 transition-colors duration-500 group-hover/button:text-foreground">
                      {d.portfolio.livePreview}
                    </span>
                    <span className="relative z-10 flex size-5 items-center justify-center rounded-full bg-background text-primary transition-all duration-500 group-hover/button:bg-primary group-hover/button:text-background">
                      <Eye className="size-3" />
                    </span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Separator */}
          <div className="bg-border shrink-0 h-px w-full" />

          {/* Hero Image & Case Study Content */}
          <div className="px-4 py-16 md:px-6 lg:px-8">
            <div className="w-full mb-12">
              <div className="overflow-hidden rounded-xl border border-border shadow-sm bg-muted/20">
                <img
                  src={project.image || project.image_light || "/uploads/1791629938_whatsapp-image-2026-10-10-at-55812-pm.webp"}
                  alt={title}
                  className={`w-full max-h-[580px] object-cover object-top ${
                    (project.imageDark || project.image_dark) &&
                    (project.imageDark || project.image_dark) !== (project.image || project.image_light)
                      ? "dark:hidden"
                      : ""
                  }`}
                />
                {(project.imageDark || project.image_dark) &&
                  (project.imageDark || project.image_dark) !== (project.image || project.image_light) && (
                    <img
                      src={project.imageDark || project.image_dark}
                      alt={title}
                      className="hidden w-full max-h-[580px] object-cover object-top dark:block"
                    />
                  )}
              </div>
            </div>

            {bodyHtml && (
              <div
                className="case-study-content text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            )}
          </div>
        </MotionPreset>
      </section>

      {/* Related / Recent Projects Section */}
      <section id="releated-portfolio-section" className="relative">
        <div className="relative overflow-hidden border-y border-border">
          <MotionPreset
            fade
            blur
            slide={{ direction: "up", offset: 35 }}
            className="mx-auto max-w-6xl space-y-16 px-4 py-16 min-[1158px]:border-x border-border sm:px-6 lg:px-8"
          >
            <div className="space-y-2.5">
              <div>
                <span className="inline-flex w-fit shrink-0 items-center justify-center border border-border text-foreground rounded-full px-2.5 py-0.5 text-xs font-medium bg-background">
                  {d.portfolio.highlights}
                </span>
              </div>
              <div className="flex justify-between gap-4 max-md:flex-col">
                <div className="max-w-100">
                  <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-foreground">
                    {d.portfolio.recentProjects}
                  </h2>
                </div>
                <div>
                  <p className="text-muted-foreground max-w-xl text-lg">
                    {d.portfolio.recentProjectsDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="-mx-4 sm:-mx-6 lg:-mx-8">
              <div className="bg-border shrink-0 h-px w-full" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {relatedProjects.map((rel, idx) => (
                <div key={rel.slug}>
                  <Link
                    href={`/portfolio/${rel.slug}`}
                    className="group relative flex flex-col gap-6 **:transition-all **:duration-300"
                  >
                    <div className="lg:h-93.5">
                      <div
                        className={`overflow-hidden rounded-[12px] border border-border shadow-xs ${
                          idx % 2 === 0 ? "group-hover:rotate-3" : "group-hover:-rotate-3"
                        } transition-transform duration-300`}
                      >
                        <img
                          src={rel.image || rel.image_light || "/uploads/1791629938_whatsapp-image-2026-10-10-at-55812-pm.webp"}
                          alt={rel.title}
                          className="w-full rounded-[11px] lg:h-93.5 lg:object-cover lg:object-center dark:hidden"
                        />
                        <img
                          src={rel.imageDark || rel.image_dark || rel.image || rel.image_light || "/uploads/1791629938_whatsapp-image-2026-10-10-at-55812-pm.webp"}
                          alt={rel.title}
                          className="hidden w-full rounded-[11px] lg:h-93.5 lg:object-cover lg:object-center dark:block"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 md:gap-6">
                      <div className="flex flex-col gap-2.5">
                        <span className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {isEn && rel.title_en ? rel.title_en : (rel.title_id || rel.title)}
                        </span>
                        <span className="text-muted-foreground text-lg">
                          {d.portfolio.caseStudy}
                        </span>
                      </div>
                      <div className="inline-flex shrink-0 items-center justify-center border border-border bg-background group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground text-foreground size-9 rounded-full transition-all duration-300 shadow-xs">
                        <ArrowRight className="size-4 transition-transform duration-500 group-hover:-rotate-45" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </MotionPreset>
        </div>
      </section>
    </main>
  );
}

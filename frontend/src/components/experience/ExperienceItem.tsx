"use client";

import React from "react";
import type { ExperienceRole } from "./types";

interface ExperienceItemProps {
  item: ExperienceRole;
  isExpanded: boolean;
  isLastRole: boolean;
  language: string;
  onToggle: () => void;
}

const bulletTranslationsId: Record<string, string> = {
  "Architected comprehensive design systems used across multi-tier enterprise web applications.":
    "Merancang arsitektur design system komprehensif yang digunakan di seluruh aplikasi web enterprise.",
  "Conducted extensive user testing and iterative prototyping resulting in 35% higher task completion rates.":
    "Melakukan riset pengujian pengguna mendalam dan prototipe berulang yang meningkatkan tingkat penyelesaian tugas hingga 35%.",
  "Collaborated directly with engineering leads for high-fidelity component handoffs in Next.js.":
    "Berkolaborasi langsung dengan pimpinan tim engineering untuk serah terima komponen presisi tinggi di Next.js.",
  "Lead end-to-end design strategy for scalable multi-platform digital products.":
    "Memimpin strategi desain menyeluruh untuk produk digital multi-platform yang skalabel.",
  "Architect unified design systems and collaborate across cross-functional engineering pods.":
    "Merancang design system terpadu dan berkolaborasi lintas tim engineering.",
  "Conduct data-informed UX research and usability validation with global audiences.":
    "Melakukan riset UX berbasis data dan validasi kegunaan bersama audiens global.",
  "Expert in creating user-centered and intuitive digital experiences.":
    "Berpengalaman dalam menciptakan pengalaman digital yang intuitif dan berpusat pada pengguna.",
  "Skilled in wireframing, prototyping, and interactive design.":
    "Terampil dalam wireframing, prototyping, dan desain interaktif.",
  "Strong eye for visual design, layout, and consistency.":
    "Fokus mendalam pada estetika visual, tata letak, dan konsistensi antarmuka.",
  "Collaborative problem-solver focused on seamless user journeys.":
    "Pemecah masalah kolaboratif yang berfokus pada alur pengguna yang mulus.",
  "Transformed complex technical requirements into user-friendly digital interfaces.":
    "Mengubah kebutuhan teknis kompleks menjadi antarmuka digital yang mudah digunakan.",
  "Created visual identity guidelines and responsive screen components.":
    "Menciptakan panduan identitas visual dan komponen layar responsif.",
  "Delivered 12+ client projects on schedule with stellar reviews.":
    "Menyelesaikan 12+ proyek klien tepat waktu dengan ulasan memuaskan.",
  "Focused on visual assets, graphic branding, and responsive layout styling.":
    "Berfokus pada aset visual, branding grafis, dan tata letak responsif.",
  "Crafted marketing website layouts and email campaign graphics.":
    "Merancang tata letak website pemasaran dan grafis kampanye email.",
  "Optimized digital assets for fast web delivery and responsive scaling.":
    "Mengoptimalkan aset digital untuk performa muat cepat dan tampilan responsif.",
  "Passionate about crafting clean, user-friendly interface designs.":
    "Berdedikasi dalam merancang antarmuka yang bersih dan ramah pengguna.",
  "Skilled in wireframing, prototyping, and basic usability testing.":
    "Terampil dalam wireframing, prototyping, dan pengujian kegunaan dasar.",
  "Familiar with design tools like Figma, Adobe XD, and Sketch.":
    "Terbiasa dengan alat desain seperti Figma, Adobe XD, dan Sketch.",
  "Eager to learn, collaborate, and grow in real-world design projects.":
    "Antusias belajar, berkolaborasi, dan berkembang dalam proyek desain nyata.",
};

export function ExperienceItem({
  item,
  isExpanded,
  isLastRole,
  language,
  onToggle,
}: ExperienceItemProps) {
  const getEmploymentTypeLabel = () => {
    if (!item.employment_type) {
      return language === "id" ? "Penuh Waktu" : "Full-time";
    }
    if (language === "id") {
      const lower = item.employment_type.toLowerCase();
      if (lower.includes("intern")) return "Magang";
      if (lower.includes("full-time") || lower.includes("full time")) return "Penuh Waktu";
      if (lower.includes("contract")) return "Kontrak";
      if (lower.includes("freelance")) return "Lepas Waktu / Freelance";
    }
    return item.employment_type;
  };

  const getLocalizedPeriod = (str: string) => {
    if (!str) return "";
    if (language !== "id") return str;
    return str
      .replace(/Present/gi, "Sekarang")
      .replace(/February/gi, "Februari")
      .replace(/March/gi, "Maret")
      .replace(/May/gi, "Mei")
      .replace(/June/gi, "Juni")
      .replace(/July/gi, "Juli")
      .replace(/August/gi, "Agustus")
      .replace(/October/gi, "Oktober")
      .replace(/December/gi, "Desember")
      .replace(/Feb/gi, "Feb")
      .replace(/Mar/gi, "Mar")
      .replace(/Jun/gi, "Jun")
      .replace(/Jul/gi, "Jul")
      .replace(/Aug/gi, "Agu")
      .replace(/Oct/gi, "Okt")
      .replace(/Dec/gi, "Des");
  };

  return (
    <div
      className={`relative border-0 before:bg-[var(--foreground)]/15 before:absolute before:top-9 before:left-[15px] before:w-px ${
        isLastRole ? "before:hidden" : ""
      } ${
        isExpanded ? "before:h-[calc(100%-14px)]" : "before:h-[calc(100%-8px)]"
      } transition-all duration-300`}
    >
      {/* Accordion Trigger Button */}
      <button
        type="button"
        onClick={onToggle}
        className="flex flex-1 cursor-pointer items-center justify-between gap-4 text-left w-full py-2 group select-none transition-colors"
      >
        <div className="flex grow flex-col gap-1.5">
          <div className="flex items-center gap-4 sm:gap-5 px-1 sm:px-2">
            {/* Diamond Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 shrink-0 fill-[var(--foreground)]/40 stroke-0 transition-transform group-hover:scale-110"
              aria-hidden="true"
            >
              <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"></path>
            </svg>
            <span className="text-lg font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
              {item.role}
            </span>
          </div>

          <div className="text-[var(--muted-foreground)] flex items-center gap-2 sm:gap-3 px-8 sm:px-11 text-xs sm:text-base font-normal flex-wrap">
            <span>{getEmploymentTypeLabel()}</span>
            <div className="shrink-0 bg-[var(--muted-foreground)]/60 self-center h-3 w-0.5"></div>
            <span>{getLocalizedPeriod(item.period)}</span>
          </div>
        </div>

        {/* Chevrons Up/Down Icon */}
        <div className="mr-3 sm:mr-10 shrink-0 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`size-5 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <path d="M7 15L12 20L17 15"></path>
            <path d="M7 9L12 4L17 9"></path>
          </svg>
        </div>
      </button>

      {/* Accordion Expanded Content */}
      {isExpanded && (
        <div className="overflow-hidden text-sm pt-2 pb-5 px-9 sm:px-11 space-y-4 animate-in fade-in-50 duration-200">
          {item.bullets && item.bullets.length > 0 && (
            <ul className="text-[var(--muted-foreground)] marker:text-[var(--muted-foreground)] list-inside list-disc space-y-2.5 text-base sm:text-lg">
              {item.bullets.map((b, bIdx) => {
                const trimmed = b.trim();
                const translated = language === "id" && bulletTranslationsId[trimmed]
                  ? bulletTranslationsId[trimmed]
                  : b;
                return (
                  <li key={bIdx} className="leading-relaxed">
                    {translated}
                  </li>
                );
              })}
            </ul>
          )}

          {item.skills && item.skills.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {item.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="inline-flex w-fit shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-medium text-[var(--foreground)] shadow-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

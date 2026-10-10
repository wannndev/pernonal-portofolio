"use client";

import React from "react";
import type { ProjectShowcase } from "@/lib/api";

const featureEmojis = ["🎨", "💼", "👨‍💻", "🤝", "⚡", "🚀", "📊"];

const projectTranslationsId: Record<
  string,
  { description: string; features?: Record<string, string> }
> = {
  UmrohApps: {
    description:
      "UmrohApps adalah sistem desain dan platform digital terpadu yang memadukan manajemen travel umroh dengan kemudahan interaksi pengguna. Menyediakan komponen UI siap pakai, desain Figma terstruktur, dan integrasi data real-time untuk membangun antarmuka yang konsisten dan skalabel.",
    features: {
      "Design System":
        "Rangkaian komponen UI dan pola desain yang kokoh untuk memastikan konsistensi di seluruh produk digital.",
      "Figma Kit":
        "Pustaka Figma lengkap dengan auto-layout, design tokens, dan varian komponen yang tersinkronisasi.",
      Customizable:
        "Mudah disesuaikan dengan kebutuhan alur operasional brand travel umroh melalui dukungan theming dan kustomisasi komponen.",
      "Real-Time Collaboration":
        "Memungkinkan tim bekerja sama secara efektif dengan menghubungkan alur desain dan implementasi kode.",
    },
  },
  "Billing WA": {
    description:
      "Billing WA adalah platform otomatisasi tagihan dan notifikasi WhatsApp yang dirancang untuk kecepatan integrasi, aksesibilitas tinggi, dan pelacakan status pembayaran pelanggan secara real-time.",
    features: {
      "Semantic Elements":
        "Dibangun mengikuti standar web modern dan aksesibilitas ramah pengguna untuk pengalaman terbaik.",
      "Speed Focused":
        "Performa sangat ringan tanpa beban latensi dan mendukung otomasi notifikasi secara instan.",
    },
  },
  "HRIS Outsourcing": {
    description:
      "HRIS Outsourcing adalah platform manajemen SDM dan alih daya tenaga kerja terpadu, mencakup modul penggajian, absensi, data kontrak kerja, dan analitik produktivitas karyawan.",
    features: {
      "Template Suite":
        "Koleksi lengkap tata letak dashboard interaktif untuk analitik karyawan, penggajian, dan laporan kehadiran.",
      "Design Consistency":
        "Bahasa visual yang konsisten dan profesional di seluruh tech stack dan antarmuka enterprise.",
    },
  },
  "Portofolio Website": {
    description:
      "Website portofolio profesional interaktif yang dirancang dengan estetika modern, animasi halus, performa tinggi, dan navigasi ramah pengguna.",
    features: {
      "Design System":
        "Pondasi visual yang terstruktur dengan warna yang harmonis, mode gelap/terang, dan micro-interactions.",
      "Figma Kit":
        "Eksplorasi visual dan prototyping presisi piksel tinggi sebelum diimplementasikan ke dalam kode.",
    },
  },
  "shadcn/studio": {
    description:
      "shadcn/studio adalah sistem desain dan toolkit lengkap yang memadukan desain dan pengembangan secara mulus. Menyediakan komponen UI siap pakai, kit Figma, dan alat kolaborasi real-time untuk membangun antarmuka pengguna yang konsisten dan skalabel.",
    features: {
      "Design System":
        "Rangkaian komponen UI dan pola desain yang kokoh untuk memastikan konsistensi di seluruh produk digital.",
      "Figma Kit":
        "Pustaka Figma lengkap dengan auto-layout, design tokens, dan varian komponen yang tersinkronisasi.",
      Customizable:
        "Mudah disesuaikan dengan identitas brand melalui dukungan theming, styling, dan kustomisasi komponen.",
      "Real-Time Collaboration":
        "Memungkinkan tim bekerja sama secara efektif dengan menghubungkan desain dan kode.",
    },
  },
  FlyonUI: {
    description:
      "FlyonUI adalah pustaka komponen Tailwind CSS open-source yang dirancang untuk aksesibilitas tinggi dan kecepatan pengembangan developer.",
    features: {
      "Semantic Elements":
        "Dibangun mengikuti panduan semantik HTML5 dan standar ARIA untuk aksesibilitas universal.",
      "Speed Focused":
        "Ukuran sangat ringan tanpa beban runtime dan mendukung pembuatan prototipe kilat.",
    },
  },
  Jetship: {
    description:
      "Jetship adalah boilerplate dan launchpad modern bagi founder untuk meluncurkan produk SaaS dalam hitungan hari dengan autentikasi, pembayaran, dan dashboard terintegrasi.",
    features: {
      "SaaS Architecture":
        "Arsitektur Next.js dan API tangguh dengan integrasi pembayaran bawaan.",
      "Dashboard UI":
        "Grafik analitik bersih, pengaturan pengguna, dan portal tagihan.",
    },
  },
  Themeselection: {
    description:
      "Koleksi UI kit premium, template admin, dan aset desain yang dipercaya oleh lebih dari 300.000+ developer di seluruh dunia.",
    features: {
      "Template Suite":
        "Koleksi lengkap tata letak dashboard, layar e-commerce, dan halaman CRM.",
      "Design Consistency":
        "Bahasa visual yang konsisten di berbagai tech stack dan framework UI.",
    },
  },
};

const featureTitleTranslationsId: Record<string, string> = {
  "Design System": "Sistem Desain",
  "Figma Kit": "Kit Desain Figma",
  Customizable: "Kustomisasi Fleksibel",
  "Real-Time Collaboration": "Kolaborasi Real-Time",
  "Semantic Elements": "Elemen Semantik",
  "Speed Focused": "Fokus Kecepatan",
  "Template Suite": "Paket Template",
  "Design Consistency": "Konsistensi Desain",
  "SaaS Architecture": "Arsitektur SaaS",
  "Dashboard UI": "Antarmuka Dashboard",
};

interface ProjectAccordionItemProps {
  project: ProjectShowcase;
  isOpen: boolean;
  onToggle: () => void;
  getLocalizedPeriod: (str: string) => string;
  language?: string;
}

export function ProjectAccordionItem({
  project,
  isOpen,
  onToggle,
  getLocalizedPeriod,
  language = "id",
}: ProjectAccordionItemProps) {
  const isId = language === "id";

  const getTranslation = () => {
    if (!isId) return null;
    const name = project.name?.trim();
    if (name && projectTranslationsId[name]) {
      return projectTranslationsId[name];
    }
    if (project.description?.includes("shadcn/studio")) return projectTranslationsId["UmrohApps"];
    if (project.description?.includes("FlyonUI")) return projectTranslationsId["Billing WA"];
    if (project.description?.includes("300,000+")) return projectTranslationsId["HRIS Outsourcing"];
    if (project.description?.toLowerCase().includes("personal portofolio")) return projectTranslationsId["Portofolio Website"];
    return null;
  };

  const tr = getTranslation();
  const description = tr ? tr.description : project.description;

  return (
    <div>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={onToggle}
        className={`flex flex-1 cursor-pointer items-center justify-between gap-4 text-left transition-all w-full select-none hover:bg-[var(--card)]/40 p-4 sm:p-6 ${
          isOpen ? "border-b border-[var(--border)]" : ""
        }`}
      >
        <span className="flex items-center min-w-0 flex-1">
          {project.logo && (
            <img
              src={project.logo}
              alt={project.name}
              className={`m-2 sm:m-6 size-8 sm:size-10 shrink-0 object-contain ${
                project.logo.startsWith("/images/project/") ? "dark:invert" : ""
              }`}
            />
          )}
          <div className="flex flex-col gap-1 sm:gap-1.5 border-l border-[var(--border)] px-3 sm:px-6 py-1.5 sm:py-4 text-base sm:text-xl min-w-0">
            <span className="font-semibold text-[var(--foreground)] truncate sm:whitespace-normal">
              {project.name}
            </span>
            <div className="text-[var(--muted-foreground)] flex items-center gap-2 sm:gap-3 font-normal text-xs sm:text-base">
              <span>{getLocalizedPeriod(project.duration)}</span>
              <div className="shrink-0 bg-[var(--muted-foreground)]/60 h-3 sm:h-4 w-0.5 max-sm:hidden"></div>
              <span className="max-sm:hidden">
                {getLocalizedPeriod(project.period)}
              </span>
            </div>
          </div>
        </span>

        {/* Chevrons Up/Down Icon */}
        <div className="mr-3 sm:mr-8 shrink-0 text-[var(--muted-foreground)] transition-colors">
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
              isOpen ? "rotate-180" : ""
            }`}
          >
            <path d="M7 15L12 20L17 15"></path>
            <path d="M7 9L12 4L17 9"></path>
          </svg>
        </div>
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div className="overflow-hidden text-sm px-6 sm:px-12 pb-8 pt-4 space-y-6 text-base text-[var(--muted-foreground)] leading-relaxed animate-in fade-in-50 duration-200">
          <p className="leading-relaxed text-base sm:text-lg">{description}</p>

          {/* Features List */}
          {project.features && project.features.length > 0 && (
            <div className="flex flex-col gap-4 text-sm sm:text-base">
              {project.features.map((f, fIdx) => {
                const title = isId && featureTitleTranslationsId[f.title]
                  ? featureTitleTranslationsId[f.title]
                  : f.title;
                const detail = tr?.features?.[f.title] || f.detail;
                if (!detail) return null;
                return (
                  <div key={f.title}>
                    <span className="text-[var(--foreground)] font-semibold">
                      {featureEmojis[fIdx % featureEmojis.length]} {title}:{" "}
                    </span>
                    <span>{detail}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tools Badges */}
          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.tools.map((t) => (
                <span
                  key={t.name}
                  className="inline-flex w-fit shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--foreground)] shadow-xs"
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-5 object-contain"
                  />
                  <span>{t.name}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

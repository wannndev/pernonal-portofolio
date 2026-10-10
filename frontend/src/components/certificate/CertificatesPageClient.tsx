"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { MotionPreset } from "@/components/MotionPreset";
import { BlurText } from "@/components/BlurText";
import { useLanguage } from "@/components/LanguageProvider";
import type { CertificateItem } from "@/lib/api";

const certDescriptionsId: Record<string, string> = {
  "google-ux-design":
    "Validasi siklus desain lengkap: riset pengguna, pemetaan empati, wireframing, prototipe interaktif, dan pengelolaan design system di Figma.",
  "fullstack-developer-expert":
    "Sertifikasi kompetensi rekayasa perangkat lunak mencakup arsitektur web full-stack, pemodelan database PostgreSQL & MySQL, dan pengembangan sistem terukur.",
  "advanced-react-expert":
    "Menunjukkan kompetensi teknis tingkat lanjut dalam manajemen jaringan, konfigurasi routing Mikrotik, keamanan sistem, dan optimasi performa jaringan.",
};

interface CertificatesPageClientProps {
  certs: CertificateItem[];
}

export function CertificatesPageClient({ certs }: CertificatesPageClientProps) {
  const { d, language } = useLanguage();

  return (
    <main className="relative flex flex-col overflow-x-clip *:scroll-mt-15.5 min-h-screen">
      <section id="certificates-section" className="relative flex-1">
        <div className="relative overflow-hidden border-b border-border">
          <div className="mx-auto max-w-6xl space-y-12 px-4 py-16 min-[1158px]:border-x border-border sm:px-6 lg:px-8">
            {/* Header Section */}
            <MotionPreset
              fade
              blur
              slide={{ direction: "up", offset: 30 }}
              delay={0.05}
              className="space-y-2.5"
            >
              <div>
                <span className="inline-flex w-fit shrink-0 items-center justify-center border border-border text-foreground rounded-full px-2.5 py-0.5 text-xs font-medium bg-background">
                  {d.certificates.badge}
                </span>
              </div>

              <div className="flex justify-between gap-4 max-md:flex-col">
                <div className="max-w-100">
                  <h1 className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-foreground">
                    <BlurText
                      key={d.certificates.title}
                      text={d.certificates.title}
                      delay={100}
                      className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-foreground"
                    />
                  </h1>
                </div>
                <div>
                  <p className="text-muted-foreground max-w-xl text-lg">
                    {d.certificates.description}
                  </p>
                </div>
              </div>
            </MotionPreset>

            {/* Separator */}
            <div className="-mx-4 sm:-mx-6 lg:-mx-8">
              <div className="bg-border shrink-0 h-px w-full" />
            </div>

            {/* 3-Column Certificate Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {certs.map((cert, index) => {
                const localizedDesc =
                  language === "id" && certDescriptionsId[cert.slug || cert.id]
                    ? certDescriptionsId[cert.slug || cert.id]
                    : cert.description;

                return (
                  <MotionPreset
                    key={cert.id}
                    fade
                    blur
                    slide={{ direction: "up", offset: 35 }}
                    delay={index * 0.08}
                    className="group"
                  >
                    <div className="h-full flex flex-col justify-between rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      {/* Top Cover Image */}
                      <Link
                        href={`/certificates/${cert.id}`}
                        className="relative h-56 sm:h-60 w-full overflow-hidden bg-muted/20 p-2 flex items-center justify-center block"
                      >
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* Clean Dividing Line */}
                      <div className="h-px w-full bg-border" />

                      {/* Card Content */}
                      <div className="p-6 sm:p-7 flex flex-col items-center text-center flex-1 justify-between">
                        <div>
                          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground block mb-2.5">
                            {cert.category}
                          </span>

                          <Link href={`/certificates/${cert.id}`}>
                            <h3 className="text-xl sm:text-2xl font-bold text-foreground font-serif tracking-tight leading-snug mb-3 hover:text-primary transition-colors">
                              {cert.title}
                            </h3>
                          </Link>

                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-5 max-w-xs mx-auto">
                            {localizedDesc}
                          </p>
                        </div>

                        {/* Read More Pill Button */}
                        <div className="pt-2 w-full flex flex-col items-center gap-3">
                          <Link
                            href={`/certificates/${cert.id}`}
                            className="inline-flex items-center justify-center px-7 py-2 rounded-full bg-foreground text-background hover:bg-foreground/80 dark:hover:bg-foreground/90 text-xs font-semibold tracking-wide transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
                          >
                            <span>{d.certificates.readMore}</span>
                          </Link>

                          <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                            <span>{cert.issuer}</span>
                            <span>•</span>
                            <span>{cert.issueDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MotionPreset>
                );
              })}
            </div>

            {/* Bottom Callout Banner */}
            <MotionPreset
              fade
              blur
              slide={{ direction: "up", offset: 25 }}
              delay={0.2}
              className="rounded-2xl border border-border bg-gradient-to-r from-card to-secondary/30 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Sparkles className="size-4 text-amber-500" />
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {d.certificates.ctaTitle}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-lg">
                  {d.certificates.ctaDesc}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
                >
                  <span>{d.certificates.seePortfolio}</span>
                  <ArrowRight className="size-3" />
                </Link>

                <Link
                  href="/contact-me"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-all shadow-xs"
                >
                  <span>{d.certificates.letsTalk}</span>
                </Link>
              </div>
            </MotionPreset>
          </div>
        </div>
      </section>
    </main>
  );
}

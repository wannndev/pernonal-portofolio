"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Award,
} from "lucide-react";
import { MotionPreset } from "@/components/MotionPreset";
import { CertificateImageViewer } from "@/components/CertificateImageViewer";
import { useLanguage } from "@/components/LanguageProvider";
import type { CertificateItem } from "@/lib/api";

interface CertificateDetailClientProps {
  cert: CertificateItem;
  otherCerts: CertificateItem[];
}

export function CertificateDetailClient({
  cert,
  otherCerts,
}: CertificateDetailClientProps) {
  const { d } = useLanguage();

  return (
    <main className="relative flex flex-col overflow-x-clip *:scroll-mt-15.5">
      {/* Certificate Content Section */}
      <section id="certificate-content" className="relative flex-1">
        <MotionPreset
          fade
          blur
          slide={{ direction: "up", offset: 35 }}
          className="mx-auto flex w-full max-w-6xl flex-col min-[1147px]:border-x border-border"
        >
          {/* Header Row */}
          <div className="mx-auto flex w-full flex-wrap items-center justify-between gap-6 px-4 py-16 md:px-6 lg:px-8">
            <div className="max-w-xl">
              <div className="mb-4">
                <Link
                  href="/certificates"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                  <span>{d.certificates.backToCertificates}</span>
                </Link>
              </div>

              <div className="flex items-center gap-2 mb-2">
                {cert.verifyUrl ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                    <ShieldCheck className="size-3" />
                    {d.certificates.verifiedCredential}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                    <Award className="size-3" />
                    {d.certificates.certificateBadge}
                  </span>
                )}
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                  {cert.category}
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-pretty md:text-3xl lg:text-4xl text-foreground font-serif">
                {cert.title}
              </h1>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground max-w-xl text-base sm:text-lg leading-relaxed">
                {cert.description}
              </p>

              {(cert.verifyUrl || cert.credentialId) && (
                <div className="flex flex-wrap items-center gap-3">
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex shrink-0 items-center justify-center bg-primary text-primary-foreground hover:bg-background hover:text-foreground border border-transparent hover:border-border h-9 px-5 rounded-full gap-2 text-sm font-semibold transition-all duration-300 shadow-xs cursor-pointer"
                    >
                      <span>{d.certificates.verifyOfficial}</span>
                      <ExternalLink className="size-3.5" />
                    </a>
                  )}

                  {cert.credentialId && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-background text-xs font-mono text-muted-foreground">
                      <span>ID:</span>
                      <span className="text-foreground font-semibold">
                        {cert.credentialId}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Separator */}
          <div className="bg-border shrink-0 h-px w-full" />

          {/* Certificate Hero Image Banner */}
          <div className="px-4 py-8 md:py-10 md:px-6 lg:px-8">
            <CertificateImageViewer
              image={cert.image}
              title={cert.title}
              issuer={cert.issuer}
              category={cert.category}
            />
          </div>

          {/* Metadata Cards Row */}
          <div className="px-4 pb-12 md:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl border border-border bg-gradient-to-b from-card to-secondary/30">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Building2 className="size-3" />
                  {d.certificates.issuingOrg}
                </span>
                <p className="text-sm font-bold text-foreground">
                  {cert.issuerOrg}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Calendar className="size-3" />
                  {d.certificates.issueDate}
                </span>
                <p className="text-sm font-bold text-foreground">
                  {cert.issueDate}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="size-3" />
                  {d.certificates.validity}
                </span>
                <p className="text-sm font-bold text-foreground">
                  {cert.expirationDate}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Award className="size-3" />
                  {d.certificates.status}
                </span>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {d.certificates.verifiedActive}
                </p>
              </div>
            </div>
          </div>

          {/* Overview & Detailed Scope */}
          <div className="px-4 pb-16 md:px-6 lg:px-8 space-y-10">
            {/* Overview */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground font-serif">
                {d.certificates.overviewTitle}
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-4xl">
                {cert.overview}
              </p>
            </div>

            {/* Curriculum Modules */}
            {cert.curriculum && cert.curriculum.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-foreground font-serif">
                  {d.certificates.curriculumTitle}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {cert.curriculum.map((mod: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl border border-border bg-card/60 space-y-2 hover:border-foreground/30 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="size-6 rounded-md bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                          0{idx + 1}
                        </span>
                        <h4 className="text-sm font-semibold text-foreground">
                          {mod.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            {cert.highlights && cert.highlights.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground font-serif">
                  {d.certificates.highlightsTitle}
                </h3>
                <div className="space-y-2">
                  {cert.highlights.map((hl: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Validated Skills */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {d.certificates.skillsValidated}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-3 py-1 rounded-full border border-border bg-secondary/60 text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </MotionPreset>
      </section>

      {/* Related Certifications Section */}
      <section id="related-certificates-section" className="relative">
        <div className="relative overflow-hidden border-y border-border">
          <MotionPreset
            fade
            blur
            slide={{ direction: "up", offset: 35 }}
            className="mx-auto max-w-6xl space-y-12 px-4 py-16 min-[1158px]:border-x border-border sm:px-6 lg:px-8"
          >
            <div className="flex justify-between gap-4 max-md:flex-col items-start sm:items-end">
              <div>
                <span className="inline-flex w-fit shrink-0 items-center justify-center border border-border text-foreground rounded-full px-2.5 py-0.5 text-xs font-medium bg-background mb-2">
                  {d.certificates.credentialsBadge}
                </span>
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl text-foreground font-serif">
                  {d.certificates.otherCertifications}
                </h2>
              </div>
              <Link
                href="/certificates"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>{d.certificates.viewAllCertifications}</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="-mx-4 sm:-mx-6 lg:-mx-8">
              <div className="bg-border shrink-0 h-px w-full" />
            </div>

            {/* 2-Column Cards for other certifications */}
            <div className="grid gap-6 sm:grid-cols-2">
              {otherCerts.map((other) => (
                <div key={other.id}>
                  <Link
                    href={`/certificates/${other.id}`}
                    className="group relative flex flex-col rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-muted/20 p-2 flex items-center justify-center">
                      <img
                        src={other.image}
                        alt={other.title}
                        className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="h-px w-full bg-border" />

                    <div className="p-6 flex flex-col items-center text-center">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                        {other.category}
                      </span>
                      <h3 className="text-xl font-bold text-foreground font-serif group-hover:text-primary transition-colors mb-2">
                        {other.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-4 max-w-sm">
                        {other.description}
                      </p>
                      <span className="inline-flex items-center justify-center px-6 py-1.5 rounded-full bg-foreground text-background hover:bg-foreground/80 dark:hover:bg-foreground/90 text-xs font-semibold tracking-wide transition-all duration-300 shadow-xs">
                        {d.certificates.readMore}
                      </span>
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

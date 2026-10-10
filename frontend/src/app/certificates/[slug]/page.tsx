import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Award,
  Sparkles,
} from "lucide-react";
import { fetchCertificateBySlug, fetchCertificates } from "@/lib/api";
import { MotionPreset } from "@/components/MotionPreset";
import { CertificateImageViewer } from "@/components/CertificateImageViewer";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const cert = await fetchCertificateBySlug(slug);
  if (!cert) return { title: "Certificate | WannDev Porto" };

  return {
    title: `${cert.title} | Verified Credential | WannDev Porto`,
    description: cert.description,
  };
}

import { CertificateDetailClient } from "@/components/certificate/CertificateDetailClient";

export default async function CertificateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [cert, allCerts] = await Promise.all([
    fetchCertificateBySlug(slug),
    fetchCertificates(),
  ]);

  if (!cert) {
    notFound();
  }

  // Get other certificates for "Related / Other Certifications"
  const otherCerts = allCerts.filter((c) => c.slug !== slug && c.id !== slug).slice(0, 2);

  return <CertificateDetailClient cert={cert} otherCerts={otherCerts} />;
}



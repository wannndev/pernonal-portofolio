import React from "react";
import { fetchCertificates } from "@/lib/api";
import { CertificatesPageClient } from "@/components/certificate/CertificatesPageClient";

export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  const certs = await fetchCertificates();

  return <CertificatesPageClient certs={certs} />;
}

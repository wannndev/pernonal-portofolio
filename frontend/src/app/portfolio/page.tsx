import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServicesSection } from "@/components/ServicesSection";
import { getServices, getPortfolioProjects, type PortfolioProject } from "@/lib/api";
import { MotionPreset } from "@/components/MotionPreset";
import { BlurText } from "@/components/BlurText";

const fallbackPortfolioList = [
  {
    slug: "umroh-saas",
    title: "UmrohApps",
    category: "SaaS",
    image: "/uploads/1791629938_whatsapp-image-2026-10-10-at-55812-pm.webp",
    imageDark: "/uploads/1791629938_whatsapp-image-2026-10-10-at-55812-pm.webp",
    alt: "UmrohApps - SaaS Platform",
    tilt: "group-hover:rotate-3",
  },
  {
    slug: "Billing-WA",
    title: "Billing WA",
    category: "SaaS",
    image: "/uploads/1791629952_whatsapp-image-2026-10-10-at-55831-pm.webp",
    imageDark: "/uploads/1791629952_whatsapp-image-2026-10-10-at-55831-pm.webp",
    alt: "Billing WA - WhatsApp Billing Automation",
    tilt: "group-hover:-rotate-3",
  },
  {
    slug: "web-porto",
    title: "Personal Portofolio",
    category: "Portofolio Website",
    image: "/uploads/1791630647_whatsapp-image-2026-10-10-at-61030-pm.webp",
    imageDark: "/uploads/1791630647_whatsapp-image-2026-10-10-at-61030-pm.webp",
    alt: "Personal Portofolio Website",
    tilt: "group-hover:rotate-3",
  },
  {
    slug: "hris-website",
    title: "HRIS Outsourcing",
    category: "Mobile Apps",
    image: "/uploads/1791630574_gemini-generated-image-qxboo0qxboo0qxbo.webp",
    imageDark: "/uploads/1791630574_gemini-generated-image-qxboo0qxboo0qxbo.webp",
    alt: "HRIS Outsourcing Management System",
    tilt: "group-hover:-rotate-3",
  },
];

export const metadata = {
  title: "Portfolio highlights collection | WannDev Porto",
  description:
    "A selection of projects highlighting my creativity and problem-solving approach. From concept to execution, each design balances beauty and function.",
};

import { PortfolioPageClient } from "@/components/portfolio/PortfolioPageClient";

export default async function PortfolioPage() {
  const [services, dbProjects] = await Promise.all([
    getServices(),
    getPortfolioProjects(),
  ]);

  const items = (dbProjects && dbProjects.length > 0) ? dbProjects : fallbackPortfolioList;

  return <PortfolioPageClient items={items} services={services} />;
}

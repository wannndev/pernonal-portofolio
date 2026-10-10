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
    slug: "lays-ecommerce-site",
    title: "Lay’s wafer",
    category: "E-Commerce Website",
    image: "/images/portfolio/image-01.webp",
    imageDark: "/images/portfolio/image-01-dark.webp",
    alt: "Lay’s wafer hero image",
    tilt: "group-hover:rotate-3",
  },
  {
    slug: "just-website",
    title: "Just Website",
    category: "E-Commerce Website",
    image: "/images/portfolio/image-02.webp",
    imageDark: "/images/portfolio/image-02-dark.webp",
    alt: "Just Website hero image",
    tilt: "group-hover:-rotate-3",
  },
  {
    slug: "astro-ai",
    title: "Astro AI",
    category: "AI Platform",
    image: "/images/portfolio/image-03.webp",
    imageDark: "/images/portfolio/image-03-dark.webp",
    alt: "AI-powered platform hero image",
    tilt: "group-hover:rotate-3",
  },
  {
    slug: "portfolio-website",
    title: "John Smith",
    category: "Portfolio Website",
    image: "/images/portfolio/image-04.webp",
    imageDark: "/images/portfolio/image-04-dark.webp",
    alt: "John Smith — UI/UX designer portrait",
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

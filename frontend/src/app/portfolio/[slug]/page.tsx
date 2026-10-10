import React from "react";
import { notFound } from "next/navigation";
import portfolioProjectsData from "@/data/fullPortfolioProjects.json";
import { fetchPortfolio } from "@/lib/api";
import { PortfolioDetailClient } from "@/components/portfolio/PortfolioDetailClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return Object.keys(portfolioProjectsData).map((slug) => ({
    slug,
  }));
}

async function findProject(slug: string) {
  const normalizedSlug = slug.toLowerCase();
  const data = portfolioProjectsData as Record<string, any>;

  // 1. Direct match
  if (data[slug]) {
    return data[slug];
  }

  // 2. Case-insensitive match in JSON
  const matchingKey = Object.keys(data).find(
    (k) => k.toLowerCase() === normalizedSlug
  );
  if (matchingKey && data[matchingKey]) {
    return data[matchingKey];
  }

  // 3. Fallback: check backend API
  try {
    const apiProjects = await fetchPortfolio();
    const matchedApi = apiProjects.find(
      (p) => p.slug && p.slug.toLowerCase() === normalizedSlug
    );
    if (matchedApi) {
      return {
        slug: matchedApi.slug,
        title: matchedApi.title,
        description: matchedApi.description,
        liveUrl: matchedApi.project_url,
        image: matchedApi.image_light || "/images/portfolio/image-01.webp",
        imageDark: matchedApi.image_dark || matchedApi.image_light || "/images/portfolio/image-01.webp",
        bodyHtml: `
          <h2 id="overview" class="text-2xl font-semibold not-first:mt-10">Overview</h2>
          <p class="text-muted-foreground mt-3 text-base">${matchedApi.description}</p>
          <h2 id="solution" class="text-2xl font-semibold not-first:mt-10">Solution</h2>
          <p class="text-muted-foreground mt-3 text-base">A purpose-built solution crafted with user-centric design and high performance in mind.</p>
        `,
      };
    }
  } catch (err) {
    console.error("Error finding project from API:", err);
  }

  return null;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await findProject(slug);
  if (!project) return { title: "Portfolio Project | WannDev Porto" };

  return {
    title: `${project.title} | Portfolio | WannDev Porto`,
    description: project.description,
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await findProject(slug);

  if (!project) {
    notFound();
  }

  // Filter distinct related projects (avoiding aliases like Billing-WA / billing-wa)
  const normalizedCurrent = slug.toLowerCase();
  const distinctKeys = [
    "umroh-saas",
    "Billing-WA",
    "web-porto",
    "hris-website",
    "lays-ecommerce-site",
    "just-website",
    "astro-ai",
  ];

  const candidateSlugs = distinctKeys.filter(
    (k) => k.toLowerCase() !== normalizedCurrent
  );

  const data = portfolioProjectsData as Record<string, any>;
  const relatedProjects = candidateSlugs
    .slice(0, 2)
    .map((s) => ({
      slug: s,
      ...(data[s] || {}),
    }))
    .filter((p) => p.title);

  return <PortfolioDetailClient project={project} relatedProjects={relatedProjects} />;
}

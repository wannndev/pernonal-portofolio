import type { PortfolioProject } from "@/lib/api";

export const defaultProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "Lay's wafer",
    category: "E-Commerce Website",
    slug: "lays-ecommerce-site",
    description:
      "A flavorful, modern e-commerce landing experience designed for Lay's crunch wafers with vibrant aesthetics and conversion-driven micro-interactions.",
    image_light: "/images/portfolio/image-01.webp",
    image_dark: "/images/portfolio/image-01-dark.webp",
    project_url: "/portfolio/lays-ecommerce-site",
    tags: ["E-Commerce", "UI/UX", "Next.js", "Tailwind"],
    is_featured: true,
    sort_order: 1,
  },
  {
    id: 2,
    title: "Just Website",
    category: "E-Commerce Website",
    slug: "just-website",
    description:
      "A clean and sleek SaaS product landing page focusing on user clarity, product features, and streamlined user onboarding.",
    image_light: "/images/portfolio/image-02.webp",
    image_dark: "/images/portfolio/image-02-dark.webp",
    project_url: "/portfolio/just-website",
    tags: ["SaaS", "Web Design", "Figma", "React"],
    is_featured: true,
    sort_order: 2,
  },
  {
    id: 3,
    title: "Astro AI",
    category: "AI Platform",
    slug: "astro-ai",
    description:
      "Cutting-edge AI dashboard and website experience built for intuitive workflow automation with dark mode brilliance.",
    image_light: "/images/portfolio/image-03.webp",
    image_dark: "/images/portfolio/image-03-dark.webp",
    project_url: "/portfolio/astro-ai",
    tags: ["Artificial Intelligence", "Product Design", "Next.js"],
    is_featured: true,
    sort_order: 3,
  },
  {
    id: 4,
    title: "John Smith",
    category: "Portfolio Website",
    slug: "portfolio-website",
    description:
      "Minimalist creative personal portfolio highlighting case studies, client feedback, and interactive craft design.",
    image_light: "/images/portfolio/image-04.webp",
    image_dark: "/images/portfolio/image-04-dark.webp",
    project_url: "/portfolio/portfolio-website",
    tags: ["Portfolio", "Brand Identity", "Creative Dev"],
    is_featured: true,
    sort_order: 4,
  },
];

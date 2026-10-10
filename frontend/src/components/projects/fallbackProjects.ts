import type { ProjectShowcase } from "@/lib/api";

export const fallbackProjects: ProjectShowcase[] = [
  {
    id: 1,
    name: "shadcn/studio",
    duration: "2 Months",
    period: "March 2025 - May 2025",
    logo: "/images/project/image-10.webp",
    description:
      "shadcn/studio is an all-in-one design system and toolkit that seamlessly blends design and development. It offers a comprehensive set of customizable UI components, Figma kits, and real-time collaboration tools, making it easier for teams to build scalable and consistent user interfaces. With integration support for popular frameworks like React, Next.js, and Tailwind CSS, shadcn/studio streamlines workflows, enhances productivity, and ensures design consistency from concept to deployment. It's the perfect solution for creating high-quality, user-centric products with ease and efficiency.",
    features: [
      {
        title: "Design System",
        detail:
          "A robust set of UI components and design patterns that ensure consistency and scalability across digital products.",
      },
      {
        title: "Figma Kit",
        detail:
          "A meticulously crafted Figma library with auto-layout, design tokens, and synchronized variant sets.",
      },
      {
        title: "Customizable",
        detail:
          "Easily adaptable to meet brand-specific needs with support for theming, styling, and component customization.",
      },
      {
        title: "Real-Time Collaboration",
        detail:
          "Enable teams to work together effectively by integrating design and code, ensuring alignment at every stage of the development process.",
      },
    ],
    tools: [
      { name: "Figma", image: "/images/project/image-13.webp" },
      { name: "Framer", image: "/images/project/image-12.webp" },
      { name: "Canva", image: "/images/project/image-11.webp" },
    ],
    sort_order: 1,
  },
  {
    id: 2,
    name: "FlyonUI",
    duration: "3 Months",
    period: "Jan 2025 - March 2025",
    logo: "/images/project/image-09.webp",
    description:
      "FlyonUI is an open-source Tailwind CSS component library designed for high accessibility and developer speed with pre-built components and semantic styling.",
    features: [
      {
        title: "Semantic Elements",
        detail:
          "Crafted with HTML5 semantic guidelines and ARIA compliance for universal accessibility.",
      },
      {
        title: "Speed Focused",
        detail:
          "Lightweight footprint with zero runtime overhead and rapid prototyping utilities.",
      },
    ],
    tools: [
      { name: "Figma", image: "/images/project/image-13.webp" },
      { name: "Framer", image: "/images/project/image-12.webp" },
    ],
    sort_order: 2,
  },
  {
    id: 3,
    name: "Jetship",
    duration: "4 Months",
    period: "Sep 2024 - Dec 2024",
    logo: "/images/project/image-08.webp",
    description:
      "Jetship is a modern boilerplate and launchpad for founders to ship SaaS products in days instead of months with integrated auth, billing, and dashboards.",
    features: [
      {
        title: "SaaS Architecture",
        detail:
          "Battle-tested Next.js and API architecture with out-of-the-box payment integration.",
      },
      {
        title: "Dashboard UI",
        detail: "Clean analytics charts, user settings, and billing portal.",
      },
    ],
    tools: [{ name: "Figma", image: "/images/project/image-13.webp" }],
    sort_order: 3,
  },
  {
    id: 4,
    name: "Themeselection",
    duration: "10 Months",
    period: "May 2024 - Dec 2024",
    logo: "/images/project/image-07.webp",
    description:
      "Premium UI kits, admin templates, and design resources trusted by over 300,000+ developers worldwide.",
    features: [
      {
        title: "Template Suite",
        detail:
          "Extensive collection of dashboard layouts, ecommerce screens, and CRM pages.",
      },
      {
        title: "Design Consistency",
        detail:
          "Unified visual language across multiple tech stacks and UI frameworks.",
      },
    ],
    tools: [
      { name: "Figma", image: "/images/project/image-13.webp" },
      { name: "Framer", image: "/images/project/image-12.webp" },
    ],
    sort_order: 4,
  },
];

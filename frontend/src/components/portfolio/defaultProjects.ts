import type { PortfolioProject } from "@/lib/api";

export const defaultProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "UmrohApps",
    category: "SaaS",
    slug: "umroh-saas",
    description:
      "Platform SaaS dan sistem manajemen terintegrasi untuk biro travel Umroh & Haji, mempermudah pengelolaan paket, penjadwalan jamaah, alokasi hotel Makkah & Madinah, hingga pembayaran otomatis.",
    image_light: "/uploads/1791629938_whatsapp-image-2026-10-10-at-55812-pm.webp",
    image_dark: "/uploads/1791629938_whatsapp-image-2026-10-10-at-55812-pm.webp",
    project_url: "https://demotenant.cloud/",
    tags: ["SaaS", "Next.js", "Laravel", "PostgreSQL"],
    is_featured: true,
    sort_order: 1,
  },
  {
    id: 2,
    title: "Billing WA",
    category: "SaaS",
    slug: "Billing-WA",
    description:
      "Platform otomasi tagihan dan invoice digital via WhatsApp untuk sekolah, bisnis, dan langganan. Tagihan dikirim otomatis, pembayaran tercatat otomatis tanpa rekap spreadsheet.",
    image_light: "/uploads/1791629952_whatsapp-image-2026-10-10-at-55831-pm.webp",
    image_dark: "/uploads/1791629952_whatsapp-image-2026-10-10-at-55831-pm.webp",
    project_url: "https://billingwa.jaritechnology.com/",
    tags: ["WhatsApp API", "Fintech", "Automation"],
    is_featured: true,
    sort_order: 2,
  },
  {
    id: 3,
    title: "Personal Portofolio",
    category: "Portofolio Website",
    slug: "web-porto",
    description:
      "Website portofolio profesional interaktif yang dirancang dengan estetika modern, animasi halus, performa tinggi, dan navigasi ramah pengguna.",
    image_light: "/uploads/1791630647_whatsapp-image-2026-10-10-at-61030-pm.webp",
    image_dark: "/uploads/1791630647_whatsapp-image-2026-10-10-at-61030-pm.webp",
    project_url: "https://wanndev.online",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    is_featured: true,
    sort_order: 3,
  },
  {
    id: 4,
    title: "HRIS Outsourcing",
    category: "Mobile Apps",
    slug: "hris-website",
    description:
      "Platform manajemen SDM dan alih daya tenaga kerja terpadu, mencakup modul penggajian, absensi, data kontrak kerja, dan analitik produktivitas karyawan.",
    image_light: "/uploads/1791630574_gemini-generated-image-qxboo0qxboo0qxbo.webp",
    image_dark: "/uploads/1791630574_gemini-generated-image-qxboo0qxboo0qxbo.webp",
    project_url: "/portfolio/hris-website",
    tags: ["HRIS", "Enterprise", "Dashboard"],
    is_featured: true,
    sort_order: 4,
  },
];

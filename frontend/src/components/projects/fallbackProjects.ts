import type { ProjectShowcase } from "@/lib/api";

export const fallbackProjects: ProjectShowcase[] = [
  {
    id: 1,
    name: "UmrohApps",
    duration: "3 Months",
    period: "Juni 2026 - September 2026",
    logo: "/uploads/1791602342_whatsapp-image-2026-10-10-at-101819-am.png",
    description:
      "UmrohApps adalah sistem desain dan platform digital terpadu yang memadukan manajemen travel umroh dengan kemudahan interaksi pengguna. Menyediakan komponen UI siap pakai, desain Figma terstruktur, dan integrasi data real-time untuk membangun antarmuka yang konsisten dan skalabel.",
    features: [
      {
        title: "Design System",
        detail:
          "Rangkaian komponen UI dan pola desain yang kokoh untuk memastikan konsistensi di seluruh produk digital.",
      },
      {
        title: "Figma Kit",
        detail:
          "Pustaka Figma lengkap dengan auto-layout, design tokens, dan varian komponen yang tersinkronisasi.",
      },
      {
        title: "Customizable",
        detail:
          "Mudah disesuaikan dengan kebutuhan alur operasional brand travel umroh melalui dukungan theming dan kustomisasi komponen.",
      },
      {
        title: "Real-Time Collaboration",
        detail:
          "Memungkinkan tim bekerja sama secara efektif dengan menghubungkan alur desain dan implementasi kode.",
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
    name: "Billing WA",
    duration: "1 Months",
    period: "Juni 2026 - Juli 2026",
    logo: "/uploads/1791602372_whatsapp-image-2026-10-10-at-101819-am-1.png",
    description:
      "Billing WA adalah platform otomatisasi tagihan dan notifikasi WhatsApp yang dirancang untuk kecepatan integrasi, aksesibilitas tinggi, dan pelacakan status pembayaran pelanggan secara real-time.",
    features: [
      {
        title: "Semantic Elements",
        detail:
          "Dibangun mengikuti standar web modern dan aksesibilitas ramah pengguna untuk pengalaman terbaik.",
      },
      {
        title: "Speed Focused",
        detail:
          "Performa sangat ringan tanpa beban latensi dan mendukung otomasi notifikasi secara instan.",
      },
    ],
    tools: [
      { name: "Figma", image: "/images/project/image-13.webp" },
      { name: "Framer", image: "/images/project/image-12.webp" },
    ],
    sort_order: 2,
  },
  {
    id: 4,
    name: "HRIS Outsourcing",
    duration: "2 Months",
    period: "Juli 2026 - September 2026",
    logo: "/images/project/image-07.webp",
    description:
      "HRIS Outsourcing adalah platform manajemen SDM dan alih daya tenaga kerja terpadu, mencakup modul penggajian, absensi, data kontrak kerja, dan analitik produktivitas karyawan.",
    features: [
      {
        title: "Template Suite",
        detail:
          "Koleksi lengkap tata letak dashboard interaktif untuk analitik karyawan, penggajian, dan laporan kehadiran.",
      },
      {
        title: "Design Consistency",
        detail:
          "Bahasa visual yang konsisten dan profesional di seluruh tech stack dan antarmuka enterprise.",
      },
    ],
    tools: [
      { name: "Figma", image: "/images/project/image-13.webp" },
      { name: "Framer", image: "/images/project/image-12.webp" },
    ],
    sort_order: 4,
  },
  {
    id: 5,
    name: "Portofolio Website",
    duration: "2 Days",
    period: "8 Oct - 10 Oct 2026",
    logo: "/images/logo.png",
    description:
      "Website portofolio profesional interaktif yang dirancang dengan estetika modern, animasi halus, performa tinggi, dan navigasi ramah pengguna.",
    features: [
      {
        title: "Design System",
        detail:
          "Pondasi visual yang terstruktur dengan warna yang harmonis, mode gelap/terang, dan micro-interactions.",
      },
      {
        title: "Figma Kit",
        detail:
          "Eksplorasi visual dan prototyping presisi piksel tinggi sebelum diimplementasikan ke dalam kode.",
      },
    ],
    tools: [
      { name: "Figma", image: "/images/project/image-13.webp" },
      { name: "Framer", image: "/images/project/image-12.webp" },
    ],
    sort_order: 5,
  },
];

import { cache } from 'react';
import certificatesData from '@/data/certificates.json';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export interface ProfileInfo {
  name: string;
  title: string;
  availability_badge: string;
  headline: string;
  bio: string;
  rating_score: number;
  rating_text: string;
  stats: { label: string; value: string }[];
  social_links: Record<string, string>;
  skills_row1?: string[];
  skills_row2?: string[];
  about_paragraphs?: { highlight?: string; text: string }[];
  about_image?: string;
  about_tools_title?: string;
  about_tools_description?: string;
}

export interface DesignTool {
  id: number;
  name: string;
  icon: string;
  dark_icon?: string | null;
  href?: string | null;
  show_name: boolean;
  sort_order: number;
}

export interface BrandLogo {
  id: number;
  name: string;
  logo: string;
  url?: string;
  sort_order: number;
}

export interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  slug: string;
  description: string;
  image_light: string;
  image_dark?: string;
  project_url?: string;
  tags: string[];
  is_featured: boolean;
  sort_order: number;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  images: string[];
  sort_order: number;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  employment_type: string;
  period: string;
  location?: string;
  description?: string;
  bullets?: string[];
  skills?: string[];
  sort_order: number;
}

export interface ProjectShowcase {
  id: number;
  name: string;
  duration: string;
  period: string;
  logo: string;
  description: string;
  features: { title: string; detail: string }[];
  tools: { name: string; image: string }[];
  sort_order: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  comment: string;
  sort_order: number;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  image: string;
  published_date: string;
  read_time: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  budget?: string;
  message: string;
  services?: string[];
}

export async function fetchProfile(): Promise<ProfileInfo> {
  try {
    const res = await fetch(`${API_BASE_URL}/profile`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend API unavailable, using fallback data', e);
  }

  return {
    name: 'Ridwan Prakoso',
    title: 'Software Developer',
    availability_badge: 'Available for next months | 2 slots free',
    headline: 'Crafting Designs That Work Harder, Think Bigger.',
    bio: 'From brand identity to web design, I create tailored solutions that engage audiences, elevate your brand, and drive growth.',
    rating_score: 4.5,
    rating_text: 'Trusted by 1000+ designers',
    stats: [
      { label: 'Happy Client', value: '250+' },
      { label: 'Revenue Added', value: '$50m' },
      { label: 'Average Rating', value: '4.9' },
    ],
    social_links: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      youtube: 'https://youtube.com',
      dribbble: 'https://dribbble.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
    skills_row1: ['Figma', 'UI Design', 'UX Design', 'Canva'],
    skills_row2: [
      'Next.js',
      'Tailwind CSS',
      'React',
      'TypeScript',
      'Design Systems',
      'Responsive Web',
      'User Flows',
      'Landing Page Design',
    ],
    about_paragraphs: [
      {
        text: 'Saat ini, saya menempuh pendidikan di Universitas Bina Sarana Informatika sekaligus berkarier aktif sebagai Software Developer, berfokus pada transformasi kebutuhan bisnis menjadi sistem digital yang terstruktur dan terukur.',
        highlight: 'Berdedikasi dalam merancang dan mengembangkan solusi perangkat lunak yang andal.',
      },
      {
        text: 'Pendekatan saya menitikberatkan pada efisiensi arsitektur dan pengalaman pengguna. Saya berfokus menghadirkan performa aplikasi yang optimal, mulai dari integrasi logika sisi server hingga implementasi antarmuka yang responsif dan intuitif.',
        highlight: '',
      },
      {
        text: 'Kualitas kode, skalabilitas, dan keandalan sistem adalah prioritas utama. Saya berkomitmen menerapkan standar rekayasa perangkat lunak yang tepat guna mendukung operasional serta memberikan nilai tambah nyata bagi organisasi maupun pengguna akhir.',
        highlight: '',
      },
    ],
    about_image: '/uploads/1791597988_whatsapp-image-2026-10-10-at-90533-am.jpeg',
    about_tools_title: 'Tools That Power My Design Process',
    about_tools_description:
      'My design process is powered by tools that encourage clarity, collaboration, and creativity — turning vision into user-centered experiences.',
  };
}

export async function fetchPortfolio(): Promise<PortfolioProject[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/portfolio`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend API unavailable, using fallback portfolio', e);
  }

  return [
    {
      id: 1,
      title: 'UmrohApps',
      category: 'SaaS',
      slug: 'umroh-saas',
      description:
        'Platform SaaS dan sistem manajemen terintegrasi untuk biro travel Umroh & Haji, mempermudah pengelolaan paket, penjadwalan jamaah, alokasi hotel Makkah & Madinah, hingga pembayaran otomatis.',
      image_light: '/uploads/1791629938_whatsapp-image-2026-10-10-at-55812-pm.webp',
      image_dark: '/uploads/1791629938_whatsapp-image-2026-10-10-at-55812-pm.webp',
      project_url: 'https://demotenant.cloud/',
      tags: ['SaaS', 'Next.js', 'Laravel', 'PostgreSQL'],
      is_featured: true,
      sort_order: 1,
    },
    {
      id: 2,
      title: 'Billing WA',
      category: 'SaaS',
      slug: 'Billing-WA',
      description:
        'Platform otomasi tagihan dan invoice digital via WhatsApp untuk sekolah, bisnis, dan langganan. Tagihan dikirim otomatis, pembayaran tercatat otomatis tanpa rekap spreadsheet.',
      image_light: '/uploads/1791629952_whatsapp-image-2026-10-10-at-55831-pm.webp',
      image_dark: '/uploads/1791629952_whatsapp-image-2026-10-10-at-55831-pm.webp',
      project_url: 'https://billingwa.jaritechnology.com/',
      tags: ['WhatsApp API', 'Fintech', 'Automation'],
      is_featured: true,
      sort_order: 2,
    },
    {
      id: 3,
      title: 'Personal Portofolio',
      category: 'Portofolio Website',
      slug: 'web-porto',
      description:
        'Website portofolio profesional interaktif yang dirancang dengan estetika modern, animasi halus, performa tinggi, dan navigasi ramah pengguna.',
      image_light: '/uploads/1791630647_whatsapp-image-2026-10-10-at-61030-pm.webp',
      image_dark: '/uploads/1791630647_whatsapp-image-2026-10-10-at-61030-pm.webp',
      project_url: 'https://wanndev.online',
      tags: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
      is_featured: true,
      sort_order: 3,
    },
    {
      id: 4,
      title: 'HRIS Outsourcing',
      category: 'Mobile Apps',
      slug: 'hris-website',
      description:
        'Platform manajemen SDM dan alih daya tenaga kerja terpadu, mencakup modul penggajian, absensi, data kontrak kerja, dan analitik produktivitas karyawan.',
      image_light: '/uploads/1791630574_gemini-generated-image-qxboo0qxboo0qxbo.webp',
      image_dark: '/uploads/1791630574_gemini-generated-image-qxboo0qxboo0qxbo.webp',
      project_url: '/portfolio/hris-website',
      tags: ['HRIS', 'Enterprise', 'Dashboard'],
      is_featured: true,
      sort_order: 4,
    },
  ];
}

export async function fetchServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/services`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend API unavailable, using fallback services', e);
  }

  return [
    {
      id: 1,
      title: 'UI/UX Design',
      description: 'I craft intuitive UIs and seamless UXs that solve real problems and deliver results with a user-centric approach.',
      icon: 'palette',
      images: [
        '/images/services/image-04.webp',
        '/images/services/image-05.webp',
        '/images/services/image-06.webp',
      ],
      sort_order: 1,
    },
    {
      id: 2,
      title: 'Web Design',
      description: 'I craft modern, responsive web designs that tell your brand\'s story. Optimized for performance, usability, and seamless navigation.',
      icon: 'laptop',
      images: [],
      sort_order: 2,
    },
    {
      id: 3,
      title: 'Mobile Apps',
      description: 'I craft intuitive, pixel-perfect mobile app experiences for iOS and Android, focusing on seamless navigation, user retention, and modern aesthetics.',
      icon: 'mobile',
      images: [],
      sort_order: 3,
    },
    {
      id: 4,
      title: 'Landing Page Design',
      description: 'I create high-converting, visually captivating landing pages designed to engage visitors, showcase your value proposition, and maximize conversion rates.',
      icon: 'framer',
      images: [
        '/images/services/image-01.webp',
        '/images/services/image-02.webp',
        '/images/services/image-03.webp',
      ],
      sort_order: 4,
    },
  ];
}

export async function fetchExperiences(): Promise<Experience[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/experiences`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend API unavailable, using fallback experiences', e);
  }

  return [
    {
      id: 1,
      company: 'Kalapa Technology',
      role: 'IT Development',
      employment_type: 'Intern',
      period: 'Feb 2026 - Mei 2026',
      description: 'Pengembangan dan implementasi modul sistem informasi berbasis web dengan performa tinggi.',
      bullets: [
        'Merancang dan membangun arsitektur antarmuka aplikasi web modern.',
        'Melakukan integrasi API dan optimalisasi pengalaman pengguna.',
        'Berkolaborasi erat bersama tim pengembang dalam siklus agile sprint.',
      ],
      skills: ['Next.js', 'React', 'Figma', 'REST API'],
      sort_order: 1,
    },
    {
      id: 2,
      company: 'Jaritechnology Inovation',
      role: 'Software Developer',
      employment_type: 'Full-time',
      period: 'Juni 2026 - Present',
      description: 'Pengembangan aplikasi skala enterprise, platform SaaS, dan otomasi backend.',
      bullets: [
        'Mengembangkan sistem manajemen SaaS terintegrasi dan sistem billing WhatsApp otomatis.',
        'Membangun API backend yang andal dan aman menggunakan arsitektur modern.',
        'Meningkatkan performa query database dan reliabilitas server produksi.',
      ],
      skills: ['Laravel', 'PostgreSQL', 'Docker', 'Automation'],
      sort_order: 2,
    },
  ];
}

export async function fetchProjectsShowcase(): Promise<ProjectShowcase[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects-showcase`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend API unavailable, using fallback projects showcase', e);
  }

  return [
    {
      id: 1,
      name: 'UmrohApps',
      duration: '3 Months',
      period: 'Juni 2026 - September 2026',
      logo: '/uploads/1791602342_whatsapp-image-2026-10-10-at-101819-am.png',
      description:
        'Sistem manajemen dan portal operasional travel Umroh terpadu dengan otomasi registrasi jamaah, alokasi manifes kamar & hotel, invoice digital, serta pelacakan paket ibadah secara real-time.',
      features: [
        {
          title: 'Manajemen Jamaah Terintegrasi',
          detail: 'Sistem pencatatan data jamaah, dokumen paspor, dan riwayat keberangkatan terpusat.',
        },
        {
          title: 'Alokasi Hotel & Manifes',
          detail: 'Distribusi kamar Makkah & Madinah dinamis dengan kontrol kuota transparan.',
        },
        {
          title: 'Invoice & Pembayaran Otomatis',
          detail: 'Penerbitan tagihan digital terintegrasi notifikasi WhatsApp otomatis.',
        },
      ],
      tools: [
        { name: 'Laravel', image: '/uploads/laravel.svg' },
        { name: 'PostgreSQL', image: '/uploads/postgresql.svg' },
        { name: 'React', image: '/uploads/react.svg' },
      ],
      sort_order: 1,
    },
    {
      id: 2,
      name: 'Billing WA',
      duration: '1 Month',
      period: 'Juni 2026 - Juli 2026',
      logo: '/uploads/1791602372_whatsapp-image-2026-10-10-at-101819-am-1.png',
      description:
        'Aplikasi otomasi penagihan dan pengingat tagihan otomatis via WhatsApp API gateway yang mempermudah pengelola langganan atau SPP sekolah memantau kas masuk secara efisien.',
      features: [
        {
          title: 'Blast & Scheduled Reminder',
          detail: 'Pengiriman pesan pengingat jatuh tempo otomatis tanpa campur tangan manual.',
        },
        {
          title: 'Rekonsiliasi Pembayaran',
          detail: 'Pencatatan mutasi dan status pembayaran langsung diperbarui seketika.',
        },
      ],
      tools: [
        { name: 'Laravel', image: '/uploads/laravel.svg' },
        { name: 'PostgreSQL', image: '/uploads/postgresql.svg' },
        { name: 'Next.js', image: '/uploads/nextjs.svg' },
      ],
      sort_order: 2,
    },
    {
      id: 3,
      name: 'HRIS Outsourcing',
      duration: '2 Months',
      period: 'Juli 2026 - September 2026',
      logo: '/images/project/image-07.webp',
      description:
        'Platform tata kelola SDM khusus perusahaan alih daya (outsourcing) untuk memonitor absensi geolokasi, penempatan staf di klien, kalkulasi payroll, dan perpanjangan kontrak.',
      features: [
        {
          title: 'Manajemen Penempatan Staf',
          detail: 'Pelacakan rotasi tenaga kerja di berbagai cabang mitra klien secara akurat.',
        },
        {
          title: 'Payroll & Absensi Terpadu',
          detail: 'Perhitungan gaji otomatis disesuaikan dengan rekap absensi shift dan lembur.',
        },
      ],
      tools: [
        { name: 'Next.js', image: '/uploads/nextjs.svg' },
        { name: 'Laravel', image: '/uploads/laravel.svg' },
      ],
      sort_order: 3,
    },
    {
      id: 4,
      name: 'Portofolio Website',
      duration: '2 Weeks',
      period: 'Oktober 2026',
      logo: '/images/project/image-08.webp',
      description:
        'Situs portofolio pribadi modern berbasis Next.js 15 App Router, Tailwind CSS, dan Framer Motion dengan integrasi API backend dinamis dan CMS administrasi.',
      features: [
        {
          title: 'Desain Interaktif & Modern',
          detail: 'Navigasi halus, dark/light theme, dan dukungan multi-bahasa terpadu.',
        },
        {
          title: 'Kinerja Cepat & SEO Friendly',
          detail: 'Performa SSR dan optimasi Lighthouse untuk pengalaman pengguna maksimal.',
        },
      ],
      tools: [
        { name: 'Next.js', image: '/uploads/nextjs.svg' },
        { name: 'React', image: '/uploads/react.svg' },
        { name: 'Docker', image: '/uploads/docker.svg' },
      ],
      sort_order: 4,
    },
  ];
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/testimonials`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend API unavailable, using fallback testimonials', e);
  }

  return [
    {
      id: 1,
      name: 'Marley Calzoni',
      role: 'CEO & Co Founder',
      company: 'Lemonsqueezy',
      avatar: 'MC',
      rating: 4.5,
      comment: 'Outstanding product—well-crafted, user-friendly, and exactly what I expected. The team went above and beyond to help. Their support was very responsive.',
      sort_order: 1,
    },
    {
      id: 2,
      name: 'Tony Stark',
      role: 'CEO & Co Founder',
      company: 'Stark Industries',
      avatar: 'TS',
      rating: 5.0,
      comment: 'Exceptional service—intuitive, reliable, and exceeded my expectations. The team was incredibly helpful and ensured a seamless integration process.',
      sort_order: 2,
    },
    {
      id: 3,
      name: 'Bruce Wayne',
      role: 'CEO & Co Founder',
      company: 'Wayne Enterprises',
      avatar: 'BW',
      rating: 4.8,
      comment: 'Exceptional quality—innovative, dependable, and surpassed all expectations. The team provided excellent guidance and ensured everything worked perfectly.',
      sort_order: 3,
    },
  ];
}

export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend API unavailable, using fallback blogs', e);
  }

  return [
    {
      id: 1,
      title: 'From High-Fidelity Screens to Real Experiences: The Future of Product Design',
      slug: 'from-high-fidelity-to-real-experiences',
      excerpt: 'How modern design workflows are moving closer to real user interactions, code, and measurable outcomes.',
      image: '/images/blog/image-05.webp',
      published_date: 'March 08, 2026',
      read_time: '4 min read',
    },
    {
      id: 2,
      title: 'Why Designers Who Can Build Will Always Have an Advantage in Their Careers',
      slug: 'designers-who-can-build-have-advantage',
      excerpt: 'Why designers with basic coding or no-code skills stand out in modern product teams.',
      image: '/images/blog/image-10.webp',
      published_date: 'March 06, 2026',
      read_time: '5 min read',
    },
    {
      id: 3,
      title: 'What Hiring Managers Actually Look for When Reviewing Designer Portfolios Today',
      slug: 'designer-portfolios-hiring-managers',
      excerpt: 'Reflections, processes, and lessons learned while designing and creating meaningful digital experiences.',
      image: '/images/blog/image-06.webp',
      published_date: 'March 04, 2026',
      read_time: '6 min read',
    },
    {
      id: 4,
      title: 'Design Trends That Improve User Experience Instead of Just Looking Good',
      slug: 'design-trends-that-improve-ux',
      excerpt: 'A look at design trends that genuinely improve usability rather than adding unnecessary visual complexity.',
      image: '/images/blog/image-07.webp',
      published_date: 'March 02, 2026',
      read_time: '4 min read',
    },
    {
      id: 5,
      title: 'How Product Thinking Helps Designers Create Work That Truly Makes an Impact',
      slug: 'product-thinking-for-meaningful-design',
      excerpt: 'How product thinking helps designers align user needs with business goals to create meaningful outcomes.',
      image: '/images/blog/image-08.webp',
      published_date: 'February 28, 2026',
      read_time: '5 min read',
    },
  ];
}

export async function submitContact(data: ContactPayload) {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function fetchBrandLogos(): Promise<BrandLogo[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/brand-logos`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend API unavailable, using fallback brand logos', e);
  }

  return [
    { id: 1, name: 'Product Hunt', logo: '/images/brand-logo/product-hunt-logo-bw.webp', sort_order: 1 },
    { id: 2, name: 'Reddit', logo: '/images/brand-logo/reddit-logo-bw.webp', sort_order: 2 },
    { id: 3, name: 'Medium', logo: '/images/brand-logo/medium-logo-bw.webp', sort_order: 3 },
    { id: 4, name: 'Dev.to', logo: '/images/brand-logo/devto-logo-bw.webp', sort_order: 4 },
    { id: 5, name: 'daily.dev', logo: '/images/brand-logo/dailydev-logo-bw.webp', sort_order: 5 },
    { id: 6, name: 'Best of JS', logo: '/images/brand-logo/bestofjs-logo-bw.webp', sort_order: 6 },
    { id: 7, name: 'Y Combinator', logo: '/images/brand-logo/ycombinator-logo-bw.webp', sort_order: 7 },
    { id: 8, name: 'Launchtory', logo: '/images/brand-logo/launchtory-logo-bw.webp', sort_order: 8 },
  ];
}

export async function fetchDesignTools(): Promise<DesignTool[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/design-tools`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend API unavailable, using fallback design tools', e);
  }

  return [
    { id: 1, name: "Figma", href: "https://figma.com", icon: "/images/about/image-19.webp", dark_icon: null, show_name: true, sort_order: 1 },
    { id: 2, name: "Framer", href: "https://framer.com", icon: "/images/about/image-20.webp", dark_icon: "/images/about/image-20-dark.webp", show_name: true, sort_order: 2 },
    { id: 3, name: "Blender", href: "https://blender.org", icon: "/images/about/image-21.webp", dark_icon: null, show_name: true, sort_order: 3 },
    { id: 4, name: "Webflow", href: "https://webflow.com", icon: "/images/about/image-22.webp", dark_icon: null, show_name: true, sort_order: 4 },
    { id: 5, name: "Notion", href: "https://notion.so", icon: "/images/about/image-23.webp", dark_icon: "/images/about/image-23-dark.webp", show_name: true, sort_order: 5 },
    { id: 6, name: "GitHub", href: "https://github.com", icon: "/images/about/image-24.webp", dark_icon: "/images/about/image-24-dark.webp", show_name: true, sort_order: 6 },
    { id: 7, name: "Adobe XD", href: "https://adobe.com/products/xd", icon: "/images/about/image-25.webp", dark_icon: null, show_name: true, sort_order: 7 },
    { id: 8, name: "Miro", href: "https://miro.com", icon: "/images/about/image-26.webp", dark_icon: null, show_name: true, sort_order: 8 },
    { id: 9, name: "Canva", href: "https://canva.com", icon: "/images/about/image-27.webp", dark_icon: null, show_name: false, sort_order: 9 },
  ];
}

export interface CertificateItem {
  id: string | number;
  slug: string;
  title: string;
  issuer: string;
  issuer_org?: string;
  issuerOrg?: string;
  category: string;
  image: string;
  accent_color?: string;
  accentColor?: string;
  issue_date?: string;
  issueDate?: string;
  expiration_date?: string;
  expirationDate?: string;
  credential_id?: string;
  credentialId?: string;
  verify_url?: string;
  verifyUrl?: string;
  description: string;
  overview?: string;
  skills: string[];
  curriculum: { title: string; desc: string }[];
  highlights: string[];
  sort_order?: number;
}

function normalizeCertificate(raw: any): CertificateItem {
  const issuerOrg = raw.issuer_org || raw.issuerOrg || raw.issuer || "";
  const issueDate = raw.issue_date || raw.issueDate || "";
  const expirationDate = raw.expiration_date || raw.expirationDate || "No Expiration";
  const credentialId = raw.credential_id || raw.credentialId || "";
  const verifyUrl = raw.verify_url || raw.verifyUrl || "";
  const accentColor = raw.accent_color || raw.accentColor || "#4285F4";
  const slug = raw.slug || String(raw.id);

  return {
    ...raw,
    id: slug,
    slug,
    title: raw.title || "",
    issuer: raw.issuer || "",
    category: raw.category || "CERTIFICATE",
    image: raw.image || "/images/certificates/google-ux.jpg",
    description: raw.description || "",
    overview: raw.overview || raw.description || "",
    issuerOrg,
    issuer_org: issuerOrg,
    issueDate,
    issue_date: issueDate,
    expirationDate,
    expiration_date: expirationDate,
    credentialId,
    credential_id: credentialId,
    verifyUrl,
    verify_url: verifyUrl,
    accentColor,
    accent_color: accentColor,
    skills: Array.isArray(raw.skills) ? raw.skills : [],
    curriculum: Array.isArray(raw.curriculum) ? raw.curriculum : [],
    highlights: Array.isArray(raw.highlights) ? raw.highlights : [],
    sort_order: raw.sort_order ?? 0,
  };
}

export const fetchCertificates = cache(async (): Promise<CertificateItem[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/certificates`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(normalizeCertificate);
      }
    }
  } catch (e) {
    console.warn('Backend API unavailable, using fallback certificates', e);
  }

  return certificatesData.map(normalizeCertificate);
});

export const fetchCertificateBySlug = cache(async (slug: string): Promise<CertificateItem | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/certificates/${slug}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.title) {
        return normalizeCertificate(data);
      }
    }
  } catch (e) {
    console.warn(`Backend API unavailable for certificate ${slug}`, e);
  }

  const found = certificatesData.find((c: any) => c.id === slug || c.slug === slug);
  return found ? normalizeCertificate(found) : null;
});

// Aliases for convenient importing across components and pages
export const getProfileInfo = fetchProfile;
export const getPortfolioProjects = fetchPortfolio;
export const getServices = fetchServices;
export const getExperiences = fetchExperiences;
export const getProjectsShowcase = fetchProjectsShowcase;
export const getTestimonials = fetchTestimonials;
export const getBlogs = fetchBlogs;
export const getBrandLogos = fetchBrandLogos;
export const getDesignTools = fetchDesignTools;
export const getCertificates = fetchCertificates;
export const getCertificateBySlug = fetchCertificateBySlug;

export type ServiceItem = Service;
export type ExperienceItem = Experience;
export type ProjectShowcaseItem = ProjectShowcase;
export type TestimonialItem = Testimonial;
export type BlogItem = Blog;
export type BrandLogoItem = BrandLogo;
export type DesignToolItem = DesignTool;



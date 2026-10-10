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
    name: 'John Doe',
    title: 'UI/UX Designer',
    availability_badge: 'Available for next months | 2 slots free',
    headline: 'Crafting Designs That Work Harder, Think Bigger.',
    bio: "From brand identity to web design, I create tailored solutions that engage audiences, elevate your brand, and drive growth. Whether it's a logo, website, or rebrand, let's work together to bring your vision to life.",
    rating_score: 4.5,
    rating_text: 'Trusted by 1000+ designers',
    stats: [
      { label: 'Happy Client', value: '250+' },
      { label: 'Revenue Added', value: '$50m' },
      { label: 'Average Rating', value: '4.9' },
    ],
    social_links: {
      github: 'https://github.com',
      dribbble: 'https://dribbble.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
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
      title: "Lay's wafer",
      category: 'E-Commerce Website',
      slug: 'lays-ecommerce-site',
      description: 'A flavorful, modern e-commerce landing experience designed for Lay\'s crunch wafers with vibrant aesthetics and conversion-driven micro-interactions.',
      image_light: '/images/portfolio/image-01.webp',
      image_dark: '/images/portfolio/image-01-dark.webp',
      project_url: '/portfolio/lays-ecommerce-site',
      tags: ['E-Commerce', 'UI/UX', 'Next.js', 'Tailwind'],
      is_featured: true,
      sort_order: 1,
    },
    {
      id: 2,
      title: 'Just Website',
      category: 'SaaS Product Website',
      slug: 'just-website',
      description: 'A clean and sleek SaaS product landing page focusing on user clarity, product features, and streamlined user onboarding.',
      image_light: '/images/portfolio/image-02.webp',
      image_dark: '/images/portfolio/image-02.webp',
      project_url: '/portfolio/just-website',
      tags: ['SaaS', 'Web Design', 'Figma', 'React'],
      is_featured: true,
      sort_order: 2,
    },
    {
      id: 3,
      title: 'Astro AI',
      category: 'AI Website',
      slug: 'astro-ai',
      description: 'Cutting-edge AI dashboard and website experience built for intuitive workflow automation with dark mode brilliance.',
      image_light: '/images/portfolio/image-03.webp',
      image_dark: '/images/portfolio/image-03.webp',
      project_url: '/portfolio/astro-ai',
      tags: ['Artificial Intelligence', 'Product Design', 'Next.js'],
      is_featured: true,
      sort_order: 3,
    },
    {
      id: 4,
      title: 'John Doe',
      category: 'Portfolio Website',
      slug: 'portfolio-website',
      description: 'Minimalist creative personal portfolio highlighting case studies, client feedback, and interactive craft design.',
      image_light: '/images/portfolio/image-04.webp',
      image_dark: '/images/portfolio/image-04-dark.webp',
      project_url: '/portfolio/portfolio-website',
      tags: ['Portfolio', 'Brand Identity', 'Creative Dev'],
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
      company: 'UX studio',
      role: 'Sr. UX Designer',
      employment_type: 'Full-time',
      period: '2025 - Present',
      description: 'Leading design system architecture, cross-platform product research, and mentoring junior designers.',
      bullets: [
        'Architected comprehensive design systems used across multi-tier enterprise web applications.',
        'Conducted extensive user testing and iterative prototyping resulting in 35% higher task completion rates.',
        'Collaborated directly with engineering leads for high-fidelity component handoffs in Next.js.',
      ],
      skills: ['Figma', 'Design Systems', 'User Research', 'Next.js'],
      sort_order: 1,
    },
    {
      id: 2,
      company: 'UX studio',
      role: 'Jr. UX Designer',
      employment_type: 'Full-time',
      period: '2024 - 2025',
      description: 'Built high-fidelity interactive Figma prototypes for client presentations.',
      bullets: [
        'Built high-fidelity interactive Figma prototypes for client presentations.',
        'Participated in sprint planning and design review sessions.',
      ],
      skills: ['Figma', 'Wireframing', 'Prototyping'],
      sort_order: 2,
    },
    {
      id: 3,
      company: 'UX studio',
      role: 'UI/UX Designer',
      employment_type: 'Full-time',
      period: '2023 - 2024',
      description: 'Transformed complex technical requirements into user-friendly digital interfaces.',
      bullets: [
        'Created visual identity guidelines and responsive screen components.',
        'Delivered 12+ client projects on schedule with stellar reviews.',
      ],
      skills: ['UI Design', 'Interaction Design', 'Adobe XD'],
      sort_order: 3,
    },
    {
      id: 4,
      company: 'Creative Team',
      role: 'UI Designer',
      employment_type: 'Full-time',
      period: '2022 - 2023',
      description: 'Focused on visual assets, graphic branding, and responsive layout styling.',
      bullets: [
        'Crafted marketing website layouts and email campaign graphics.',
        'Optimized digital assets for fast web delivery and responsive scaling.',
      ],
      skills: ['Figma', 'Canva', 'Photoshop'],
      sort_order: 4,
    },
    {
      id: 5,
      company: 'Creative Team',
      role: 'Intern UI Designer',
      employment_type: 'Full-time',
      period: '2021 - 2022',
      description: 'Passionate about crafting clean, user-friendly interface designs.',
      bullets: [
        'Passionate about crafting clean, user-friendly interface designs.',
        'Skilled in wireframing, prototyping, and basic usability testing.',
        'Familiar with design tools like Figma, Adobe XD, and Sketch.',
        'Eager to learn, collaborate, and grow in real-world design projects.',
      ],
      skills: ['Figma', 'Design Systems', 'Canva', 'Adobe XD', 'Sketch'],
      sort_order: 5,
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
      name: 'shadcn/studio',
      duration: '2 Months',
      period: 'March 2025 - May 2025',
      logo: '/images/project/image-10.webp',
      description: 'shadcn/studio is an all-in-one design system and toolkit that seamlessly blends design and development. It offers a comprehensive set of customizable UI components, Figma kits, and real-time collaboration tools, making it easier for teams to build scalable and consistent user interfaces.',
      features: [
        { title: 'Design System', detail: 'A robust set of UI components and design patterns that ensure consistency and scalability across digital products.' },
        { title: 'Figma Kit', detail: 'A meticulously crafted Figma library with auto-layout, design tokens, and synchronized variant sets.' },
        { title: 'Customizable', detail: 'Easily adaptable to meet brand-specific needs with support for theming, styling, and component customization.' },
        { title: 'Real-Time Collaboration', detail: 'Enable teams to work together effectively by integrating design and code, ensuring alignment at every stage of the development process.' },
      ],
      tools: [
        { name: 'Figma', image: '/images/project/image-13.webp' },
        { name: 'Framer', image: '/images/project/image-12.webp' },
        { name: 'Canva', image: '/images/project/image-11.webp' },
      ],
      sort_order: 1,
    },
    {
      id: 2,
      name: 'FlyonUI',
      duration: '3 Months',
      period: 'Jan 2025 - March 2025',
      logo: '/images/project/image-09.webp',
      description: 'FlyonUI is an open-source Tailwind CSS component library designed for high accessibility and developer speed with pre-built components and semantic styling.',
      features: [
        { title: 'Semantic Elements', detail: 'Crafted with HTML5 semantic guidelines and ARIA compliance for universal accessibility.' },
        { title: 'Speed Focused', detail: 'Lightweight footprint with zero runtime overhead and rapid prototyping utilities.' },
      ],
      tools: [
        { name: 'Figma', image: '/images/project/image-13.webp' },
        { name: 'Framer', image: '/images/project/image-12.webp' },
      ],
      sort_order: 2,
    },
    {
      id: 3,
      name: 'Jetship',
      duration: '4 Months',
      period: 'Sep 2024 - Dec 2024',
      logo: '/images/project/image-08.webp',
      description: 'Jetship is a modern boilerplate and launchpad for founders to ship SaaS products in days instead of months with integrated auth, billing, and dashboards.',
      features: [
        { title: 'SaaS Architecture', detail: 'Battle-tested Next.js and API architecture with out-of-the-box payment integration.' },
        { title: 'Dashboard UI', detail: 'Clean analytics charts, user settings, and billing portal.' },
      ],
      tools: [
        { name: 'Figma', image: '/images/project/image-13.webp' },
      ],
      sort_order: 3,
    },
    {
      id: 4,
      name: 'Themeselection',
      duration: '10 Months',
      period: 'May 2024 - Dec 2024',
      logo: '/images/project/image-07.webp',
      description: 'Premium UI kits, admin templates, and design resources trusted by over 300,000+ developers worldwide.',
      features: [
        { title: 'Template Suite', detail: 'Extensive collection of dashboard layouts, ecommerce screens, and CRM pages.' },
        { title: 'Design Consistency', detail: 'Unified visual language across multiple tech stacks and UI frameworks.' },
      ],
      tools: [
        { name: 'Figma', image: '/images/project/image-13.webp' },
        { name: 'Framer', image: '/images/project/image-12.webp' },
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



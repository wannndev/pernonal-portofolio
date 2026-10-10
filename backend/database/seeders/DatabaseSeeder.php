<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\BrandLogo;
use App\Models\Certificate;
use App\Models\DesignTool;
use App\Models\Experience;
use App\Models\PortfolioProject;
use App\Models\ProfileInfo;
use App\Models\ProjectShowcase;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Superadmin User
        User::updateOrCreate(
            ['email' => 'ridwan@gmail.com'],
            [
                'name' => 'Ridwan Prakoso',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Profile Info
        ProfileInfo::updateOrCreate(['id' => 1], [
          'id' => 1,
          'name' => 'Ridwan Prakoso',
          'title' => 'Software Developer',
          'availability_badge' => NULL,
          'headline' => 'Crafting Designs That Work Harder, Think Bigger.',
          'bio' => 'From brand identity to web design, I create tailored solutions that engage audiences, elevate your brand, and drive growth.',
          'rating_score' => 4.5,
          'rating_text' => 'Trusted by 1000+ designers',
          'stats' => 
          [
            0 => 
            [
              'label' => 'Happy Client',
              'value' => '250+',
            ],
            1 => 
            [
              'label' => 'Revenue Added',
              'value' => '$50m',
            ],
            2 => 
            [
              'label' => 'Average Rating',
              'value' => '4.9',
            ],
          ],
          'social_links' => 
          [
            'github' => 'https://github.com',
            'twitter' => 'https://twitter.com',
            'youtube' => 'https://youtube.com',
            'dribbble' => 'https://dribbble.com',
            'linkedin' => 'https://linkedin.com',
            'instagram' => 'https://instagram.com',
          ],
          'skills_row1' => 
          [
            0 => 'Figma',
            1 => 'UI Design',
            2 => 'UX Design',
            3 => 'Canva',
          ],
          'skills_row2' => 
          [
            0 => 'Next.js',
            1 => 'Tailwind CSS',
            2 => 'React',
            3 => 'TypeScript',
            4 => 'Design Systems',
            5 => 'Responsive Web',
            6 => 'User Flows',
            7 => 'Landing Page Design',
          ],
          'about_paragraphs' => 
          [
            0 => 
            [
              'text' => 'Saat ini, saya menempuh pendidikan di Universitas Bina Sarana Informatika sekaligus berkarier aktif sebagai Software Developer, berfokus pada transformasi kebutuhan bisnis menjadi sistem digital yang terstruktur dan terukur.',
              'highlight' => 'Berdedikasi dalam merancang dan mengembangkan solusi perangkat lunak yang andal.',
            ],
            1 => 
            [
              'text' => 'Pendekatan saya menitikberatkan pada efisiensi arsitektur dan pengalaman pengguna. Saya berfokus menghadirkan performa aplikasi yang optimal, mulai dari integrasi logika sisi server hingga implementasi antarmuka yang responsif dan intuitif.',
              'highlight' => NULL,
            ],
            2 => 
            [
              'text' => 'Kualitas kode, skalabilitas, dan keandalan sistem adalah prioritas utama. Saya berkomitmen menerapkan standar rekayasa perangkat lunak yang tepat guna mendukung operasional serta memberikan nilai tambah nyata bagi organisasi maupun pengguna akhir.',
              'highlight' => NULL,
            ],
          ],
          'about_image' => '/uploads/1791597988_whatsapp-image-2026-10-10-at-90533-am.jpeg',
          'about_tools_title' => 'Tools That Power My Design Process',
          'about_tools_description' => 'My design process is powered by tools that encourage clarity, collaboration, and creativity — turning vision into user-centered experiences.',
        ]);

        // 3. Portfolio Projects
        $portfolioProjects = [
          0 => 
          [
            'title' => 'UmrohApps',
            'category' => 'SaaS',
            'slug' => 'umroh-saas',
            'description' => 'A flavorful, modern e-commerce landing experience designed for Lay\'s crunch wafers with vibrant aesthetics and conversion-driven micro-interactions.',
            'image_light' => '/uploads/1791629938_whatsapp-image-2026-10-10-at-55812-pm.webp',
            'image_dark' => '/images/portfolio/image-01-dark.webp',
            'project_url' => 'https://demotenant.cloud/',
            'tags' => 
            [
              0 => 'E-Commerce',
              1 => 'UI/UX',
              2 => 'Next.js',
              3 => 'Tailwind',
            ],
            'is_featured' => true,
            'sort_order' => 1,
          ],
          1 => 
          [
            'title' => 'Billing WA',
            'category' => 'SaaS',
            'slug' => 'Billing-WA',
            'description' => 'A clean and sleek SaaS product landing page focusing on user clarity, product features, and streamlined user onboarding.',
            'image_light' => '/uploads/1791629952_whatsapp-image-2026-10-10-at-55831-pm.webp',
            'image_dark' => '/images/portfolio/image-02.webp',
            'project_url' => 'https://billingwa.jaritechnology.com/',
            'tags' => 
            [
              0 => 'SaaS',
              1 => 'Web Design',
              2 => 'Figma',
              3 => 'React',
            ],
            'is_featured' => true,
            'sort_order' => 2,
          ],
          2 => 
          [
            'title' => 'Personal Portofolio',
            'category' => 'Portofolio Website',
            'slug' => 'web-porto',
            'description' => 'Cutting-edge AI dashboard and website experience built for intuitive workflow automation with dark mode brilliance.',
            'image_light' => '/uploads/1791630647_whatsapp-image-2026-10-10-at-61030-pm.webp',
            'image_dark' => '/images/portfolio/image-03.webp',
            'project_url' => NULL,
            'tags' => 
            [
              0 => 'Artificial Intelligence',
              1 => 'Product Design',
              2 => 'Next.js',
            ],
            'is_featured' => true,
            'sort_order' => 3,
          ],
          3 => 
          [
            'title' => 'HRIS Outsourcing',
            'category' => 'Mobile Apps',
            'slug' => 'hris-website',
            'description' => 'Minimalist creative personal portfolio highlighting case studies, client feedback, and interactive craft design.',
            'image_light' => '/uploads/1791630574_gemini-generated-image-qxboo0qxboo0qxbo.webp',
            'image_dark' => '/images/portfolio/image-04-dark.webp',
            'project_url' => NULL,
            'tags' => 
            [
              0 => 'Portfolio',
              1 => 'Brand Identity',
              2 => 'Creative Dev',
            ],
            'is_featured' => true,
            'sort_order' => 4,
          ],
        ];
        foreach ($portfolioProjects as $proj) {
            PortfolioProject::updateOrCreate(['slug' => $proj['slug']], $proj);
        }

        // 4. Services
        $services = [
          0 => 
          [
            'title' => 'UI/UX Design',
            'description' => 'I craft intuitive UIs and seamless UXs that solve real problems and deliver results with a user-centric approach.',
            'icon' => 'palette',
            'images' => 
            [
              0 => '/images/services/image-04.webp',
              1 => '/images/services/image-05.webp',
              2 => '/images/services/image-06.webp',
            ],
            'sort_order' => 1,
          ],
          1 => 
          [
            'title' => 'Web Design',
            'description' => 'I craft modern, responsive web designs that tell your brand\'s story. Optimized for performance, usability, and seamless navigation.',
            'icon' => 'laptop',
            'images' => 
            [
            ],
            'sort_order' => 2,
          ],
          2 => 
          [
            'title' => 'Mobile Apps',
            'description' => 'I craft intuitive, pixel-perfect mobile app experiences for iOS and Android, focusing on seamless navigation, user retention, and modern aesthetics.',
            'icon' => 'mobile',
            'images' => 
            [
            ],
            'sort_order' => 3,
          ],
          3 => 
          [
            'title' => 'Landing Page Design',
            'description' => 'I create high-converting, visually captivating landing pages designed to engage visitors, showcase your value proposition, and maximize conversion rates.',
            'icon' => 'framer',
            'images' => 
            [
              0 => '/images/services/image-01.webp',
              1 => '/images/services/image-02.webp',
              2 => '/images/services/image-03.webp',
            ],
            'sort_order' => 4,
          ],
        ];
        foreach ($services as $service) {
            Service::updateOrCreate(['title' => $service['title']], $service);
        }

        // 5. Experiences
        $experiences = [
          0 => 
          [
            'company' => 'Kalapa Technology',
            'role' => 'IT Development',
            'employment_type' => 'Intern',
            'period' => 'Feb 2026 - Mei 2026',
            'description' => 'Leading design system architecture, cross-platform product research, and mentoring junior designers.',
            'bullets' => 
            [
              0 => 'Architected comprehensive design systems used across multi-tier enterprise web applications.',
              1 => 'Conducted extensive user testing and iterative prototyping resulting in 35% higher task completion rates.',
              2 => 'Collaborated directly with engineering leads for high-fidelity component handoffs in Next.js.',
            ],
            'skills' => 
            [
              0 => 'Figma',
              1 => 'Design Systems',
              2 => 'User Research',
              3 => 'Next.js',
            ],
            'sort_order' => 1,
          ],
          1 => 
          [
            'company' => 'Jaritechnology Inovation',
            'role' => 'Software Developer',
            'employment_type' => NULL,
            'period' => 'Juni 2026 - Present',
            'description' => 'Transformed complex technical requirements into user-friendly digital interfaces.',
            'bullets' => 
            [
              0 => 'Created visual identity guidelines and responsive screen components.',
              1 => 'Delivered 12+ client projects on schedule with stellar reviews.',
            ],
            'skills' => 
            [
              0 => 'UI Design',
              1 => 'Interaction Design',
              2 => 'Adobe XD',
            ],
            'sort_order' => 3,
          ],
        ];
        foreach ($experiences as $exp) {
            Experience::updateOrCreate([
                'company' => $exp['company'],
                'role' => $exp['role'],
            ], $exp);
        }

        // 6. Project Showcases
        $showcases = [
          0 => 
          [
            'name' => 'UmrohApps',
            'duration' => '3 Months',
            'period' => 'Juni 2026 - September 2026',
            'logo' => '/uploads/1791602342_whatsapp-image-2026-10-10-at-101819-am.png',
            'description' => 'shadcn/studio is an all-in-one design system and toolkit that seamlessly blends design and development. It offers a comprehensive set of customizable UI components, Figma kits, and real-time collaboration tools, making it easier for teams to build scalable and consistent user interfaces.',
            'features' => 
            [
              0 => 
              [
                'title' => 'Design System',
                'detail' => 'A robust set of UI components and design patterns that ensure consistency and scalability across digital products.',
              ],
              1 => 
              [
                'title' => 'Figma Kit',
                'detail' => 'A meticulously crafted Figma library with auto-layout, design tokens, and synchronized variant sets.',
              ],
              2 => 
              [
                'title' => 'Customizable',
                'detail' => 'Easily adaptable to meet brand-specific needs with support for theming, styling, and component customization.',
              ],
              3 => 
              [
                'title' => 'Real-Time Collaboration',
                'detail' => 'Enable teams to work together effectively by integrating design and code, ensuring alignment at every stage of the development process.',
              ],
            ],
            'tools' => 
            [
              0 => 
              [
                'name' => 'Figma',
                'image' => '/images/project/image-13.webp',
              ],
              1 => 
              [
                'name' => 'Framer',
                'image' => '/images/project/image-12.webp',
              ],
              2 => 
              [
                'name' => 'Canva',
                'image' => '/images/project/image-11.webp',
              ],
            ],
            'sort_order' => 1,
          ],
          1 => 
          [
            'name' => 'Billing WA',
            'duration' => '1 Months',
            'period' => 'Juni 2026 - Juli 2026',
            'logo' => '/uploads/1791602372_whatsapp-image-2026-10-10-at-101819-am-1.png',
            'description' => 'FlyonUI is an open-source Tailwind CSS component library designed for high accessibility and developer speed with pre-built components and semantic styling.',
            'features' => 
            [
              0 => 
              [
                'title' => 'Semantic Elements',
                'detail' => 'Crafted with HTML5 semantic guidelines and ARIA compliance for universal accessibility.',
              ],
              1 => 
              [
                'title' => 'Speed Focused',
                'detail' => 'Lightweight footprint with zero runtime overhead and rapid prototyping utilities.',
              ],
            ],
            'tools' => 
            [
              0 => 
              [
                'name' => 'Figma',
                'image' => '/images/project/image-13.webp',
              ],
              1 => 
              [
                'name' => 'Framer',
                'image' => '/images/project/image-12.webp',
              ],
            ],
            'sort_order' => 2,
          ],
          2 => 
          [
            'name' => 'HRIS Outsourcing',
            'duration' => '2 Months',
            'period' => 'Juli 2026 - September 2026',
            'logo' => '/images/project/image-07.webp',
            'description' => 'Premium UI kits, admin templates, and design resources trusted by over 300,000+ developers worldwide.',
            'features' => 
            [
              0 => 
              [
                'title' => 'Template Suite',
                'detail' => 'Extensive collection of dashboard layouts, ecommerce screens, and CRM pages.',
              ],
              1 => 
              [
                'title' => 'Design Consistency',
                'detail' => 'Unified visual language across multiple tech stacks and UI frameworks.',
              ],
            ],
            'tools' => 
            [
              0 => 
              [
                'name' => 'Figma',
                'image' => '/images/project/image-13.webp',
              ],
              1 => 
              [
                'name' => 'Framer',
                'image' => '/images/project/image-12.webp',
              ],
            ],
            'sort_order' => 4,
          ],
          3 => 
          [
            'name' => 'Portofolio Website',
            'duration' => '2 Days',
            'period' => '8 Oct - 10 Oct 2026',
            'logo' => NULL,
            'description' => 'Personal Portofolio',
            'features' => 
            [
              0 => 
              [
                'title' => 'Design System',
                'detail' => NULL,
              ],
              1 => 
              [
                'title' => 'Figma Kit',
                'detail' => NULL,
              ],
            ],
            'tools' => 
            [
            ],
            'sort_order' => 4,
          ],
        ];
        foreach ($showcases as $showcase) {
            ProjectShowcase::updateOrCreate(['name' => $showcase['name']], $showcase);
        }

        // 7. Certificates
        $certificates = [
          0 => 
          [
            'slug' => 'google-ux-design',
            'title' => 'Sertifikat CISCO',
            'issuer' => 'Google',
            'issuer_org' => 'Google Career Certificates',
            'category' => 'UI/UX DESIGN',
            'image' => '/uploads/1791604684_sertiifkat-cisco-page-0001.webp',
            'accent_color' => '#4285F4',
            'issue_date' => 'Sep 2025',
            'expiration_date' => 'No Expiration',
            'credential_id' => 'GOOGLE-UXD-77192-2025',
            'verify_url' => 'https://coursera.org/verify/professional-cert/google-ux-design',
            'description' => 'Validation of the complete design sprint cycle: user research, empathy mapping, low-fidelity wireframing, interactive prototyping, and design system governance in Figma.',
            'overview' => 'The Google UX Design Certificate validates comprehensive expertise in the entire user experience design lifecycle. Created by Google\'s senior design practitioners, it covers foundational research, wireframing, high-fidelity UI design in Figma, and usability testing.',
            'skills' => 
            [
              0 => 'Figma',
              1 => 'User Research',
              2 => 'Wireframing',
              3 => 'Prototyping',
              4 => 'Design Systems',
              5 => 'Usability Testing',
              6 => 'Information Architecture',
            ],
            'curriculum' => 
            [
              0 => 
              [
                'desc' => 'Understanding user-centered design principles, accessibility compliance, and bias elimination in research.',
                'title' => 'Foundations of User Experience (UX] Design',
              ],
              1 => 
              [
                'desc' => 'Conducting user interviews, building persona profiles, user journey maps, and competitive audit analyses.',
                'title' => 'Empathize, Define, and Ideate',
              ],
              2 => 
              [
                'desc' => 'Creating paper and digital wireframes, information architecture hierarchy, and clickable flow prototypes in Figma.',
                'title' => 'Wireframing & Low-Fidelity Prototyping',
              ],
              3 => 
              [
                'desc' => 'Building comprehensive design libraries with design tokens, typography scales, accessibility contrasts, and micro-interactions.',
                'title' => 'Design Systems & High-Fidelity UI',
              ],
            ],
            'highlights' => 
            [
              0 => '7 Core Design Modules completed with honors distinction',
              1 => '3 End-to-end Case Studies created from scratch',
              2 => 'Verified proficiency with Figma enterprise workflows',
            ],
            'sort_order' => 3,
          ],
          1 => 
          [
            'slug' => 'fullstack-developer-expert',
            'title' => 'Analis Program BNSP',
            'issuer' => 'Dicoding Academy',
            'issuer_org' => 'Dicoding Academy Indonesia',
            'category' => 'FULL STACK',
            'image' => '/uploads/1791604649_sertifikat-analis-program-pages-to-jpg-0001.webp',
            'accent_color' => '#10B981',
            'issue_date' => 'May 2025',
            'expiration_date' => 'May 2028',
            'credential_id' => 'DICODING-FS-10492-ID',
            'verify_url' => 'https://dicoding.com/certificates/DICODING-FS-10492-ID',
            'description' => 'Comprehensive engineering certification covering full-stack web architecture, PostgreSQL & MySQL modeling, microservices, containerization with Docker, and CI/CD pipelines.',
            'overview' => 'An exhaustive multi-month engineering curriculum certifying the ability to build, optimize, and maintain production web platforms from UI interface to backend microservices, database transactions, automated deployment pipelines, and Docker containers.',
            'skills' => 
            [
              0 => 'Node.js',
              1 => 'React',
              2 => 'PostgreSQL',
              3 => 'Docker',
              4 => 'REST API',
              5 => 'Clean Code',
              6 => 'CI/CD',
            ],
            'curriculum' => 
            [
              0 => 
              [
                'desc' => 'Relational schema normalization, complex SQL joins, index tuning, and database migrations in PostgreSQL & MySQL.',
                'title' => 'Enterprise Database Engineering',
              ],
              1 => 
              [
                'desc' => 'Structuring modular codebases adhering to SOLID principles, dependency inversion, and clean domain-driven architecture.',
                'title' => 'Microservices & Clean Architecture',
              ],
              2 => 
              [
                'desc' => 'Creating multi-stage Docker builds, container orchestration, environment segregation, and automated GitHub Actions CI/CD.',
                'title' => 'Containerization & DevOps Pipelines',
              ],
              3 => 
              [
                'desc' => 'Implementing CORS policies, JWT token rotators, Redis caching layers, and stress-testing under heavy concurrent loads.',
                'title' => 'Security, Caching & Performance',
              ],
            ],
            'highlights' => 
            [
              0 => 'Top Graduate rating with 5/5 stars evaluation score',
              1 => 'Verified capstone project evaluated by industry code reviewers',
              2 => 'Comprehensive test coverage exceeding 90% code coverage',
            ],
            'sort_order' => 5,
          ],
          2 => 
          [
            'slug' => 'advanced-react-expert',
            'title' => 'Mikrotik MTCNA',
            'issuer' => 'The Advanced Tech Academy',
            'issuer_org' => 'Dicoding & Tech Academy',
            'category' => 'FRONTEND',
            'image' => '/uploads/1791604668_mikrotik-mtcna-page-0001.webp',
            'accent_color' => '#06B6D4',
            'issue_date' => 'Mar 2025',
            'expiration_date' => 'Mar 2028',
            'credential_id' => 'REACT-EXP-9923-ID',
            'verify_url' => 'https://dicoding.com/certificates/DICODING-REACT-9923-ID',
            'description' => 'Demonstrates high-level competence in advanced state machines, custom hooks, atomic design principles, automated testing with Jest, and web vital optimizations.',
            'overview' => 'Certification validating expert-level knowledge of React 19 architecture, Next.js Server Components, client-side caching strategies, custom hook patterns, and advanced Web Vitals performance tuning.',
            'skills' => 
            [
              0 => 'React 19',
              1 => 'Redux Toolkit',
              2 => 'Next.js',
              3 => 'TDD Testing',
              4 => 'Performance Optimization',
              5 => 'TypeScript',
            ],
            'curriculum' => 
            [
              0 => 
              [
                'desc' => 'Building hybrid architectures utilizing React Server Components (RSC], Suspense streaming, and zero-bundle-size rendering.',
                'title' => 'React 19 & Next.js Server Components',
              ],
              1 => 
              [
                'desc' => 'Managing enterprise client state with Redux Toolkit, RTK Query, normalized caching, and optimistic UI updates.',
                'title' => 'Complex Global State Orchestration',
              ],
              2 => 
              [
                'desc' => 'Enforcing code reliability through unit, integration, and mocking strategies using Vitest, Jest, and MSW (Mock Service Worker].',
                'title' => 'Test-Driven Development (TDD]',
              ],
              3 => 
              [
                'desc' => 'Analyzing flame charts, memory leak identification, dynamic code splitting, and sub-second Largest Contentful Paint (LCP].',
                'title' => 'Core Web Vitals & Bundle Optimization',
              ],
            ],
            'highlights' => 
            [
              0 => 'Completed top-tier advanced React certification with distinction',
              1 => 'Full compliance with strict TypeScript strict-mode standards',
              2 => 'Over 100+ hours of advanced problem solving and architecture review',
            ],
            'sort_order' => 6,
          ],
        ];
        foreach ($certificates as $cert) {
            Certificate::updateOrCreate(['slug' => $cert['slug']], $cert);
        }

        // 8. Brand Logos
        $brandLogos = [
          0 => 
          [
            'name' => 'Laravel',
            'logo' => '/uploads/1791600021_png-clipart-laravel-black-logo-tech-companies.png',
            'url' => NULL,
            'sort_order' => 1,
          ],
          1 => 
          [
            'name' => 'Docker',
            'logo' => '/uploads/docker.svg',
            'url' => NULL,
            'sort_order' => 2,
          ],
          2 => 
          [
            'name' => 'PostgreSQL',
            'logo' => '/uploads/postgresql.svg',
            'url' => NULL,
            'sort_order' => 3,
          ],
          3 => 
          [
            'name' => 'Dev.to',
            'logo' => '/images/brand-logo/devto-logo-bw.webp',
            'url' => NULL,
            'sort_order' => 4,
          ],
          4 => 
          [
            'name' => 'Next JS',
            'logo' => '/uploads/nextjs.svg',
            'url' => NULL,
            'sort_order' => 5,
          ],
          5 => 
          [
            'name' => 'Vue JS',
            'logo' => '/uploads/vuejs.svg',
            'url' => NULL,
            'sort_order' => 6,
          ],
          6 => 
          [
            'name' => 'React JS',
            'logo' => '/uploads/react.svg',
            'url' => NULL,
            'sort_order' => 7,
          ],
        ];
        foreach ($brandLogos as $logo) {
            BrandLogo::updateOrCreate(['name' => $logo['name']], $logo);
        }

        // 9. Design Tools
        $designTools = [
          0 => 
          [
            'name' => 'Figma',
            'icon' => '/images/about/image-19.webp',
            'dark_icon' => NULL,
            'href' => 'https://figma.com',
            'show_name' => true,
            'sort_order' => 1,
          ],
          1 => 
          [
            'name' => 'Visual Studio Code',
            'icon' => '/uploads/1791600384_visual-studio-code-logo.svg',
            'dark_icon' => '/images/about/image-20-dark.webp',
            'href' => 'https://code.visualstudio.com/docs/remote/vscode-web',
            'show_name' => true,
            'sort_order' => 2,
          ],
          2 => 
          [
            'name' => 'PostgreSQL',
            'icon' => '/uploads/1791600453_png-transparent-postgresql-plain-wordmark-logo-icon.png',
            'dark_icon' => NULL,
            'href' => 'https://www.postgresql.org/',
            'show_name' => true,
            'sort_order' => 3,
          ],
          3 => 
          [
            'name' => 'Laravel',
            'icon' => '/uploads/1791600917_png-clipart-laravel-black-logo-tech-companies.png',
            'dark_icon' => NULL,
            'href' => NULL,
            'show_name' => true,
            'sort_order' => 4,
          ],
          4 => 
          [
            'name' => 'Next JS',
            'icon' => '/uploads/1791600939_nextjs2106logowikcom.png',
            'dark_icon' => NULL,
            'href' => NULL,
            'show_name' => true,
            'sort_order' => 5,
          ],
          5 => 
          [
            'name' => 'GitHub',
            'icon' => '/images/about/image-24.webp',
            'dark_icon' => '/images/about/image-24-dark.webp',
            'href' => 'https://github.com',
            'show_name' => true,
            'sort_order' => 6,
          ],
          6 => 
          [
            'name' => 'Vue JS',
            'icon' => '/uploads/1791600573_vuejs-logo-2svg.png',
            'dark_icon' => NULL,
            'href' => NULL,
            'show_name' => true,
            'sort_order' => 8,
          ],
          7 => 
          [
            'name' => 'Docker',
            'icon' => '/uploads/1791601056_oip.png',
            'dark_icon' => NULL,
            'href' => NULL,
            'show_name' => true,
            'sort_order' => 9,
          ],
        ];
        foreach ($designTools as $tool) {
            DesignTool::updateOrCreate(['name' => $tool['name']], $tool);
        }

        // 10. Testimonials
        $testimonials = [
          0 => 
          [
            'name' => 'Marley Calzoni',
            'role' => 'CEO & Co Founder',
            'company' => 'Lemonsqueezy',
            'avatar' => 'MC',
            'rating' => 4.5,
            'comment' => 'Outstanding product—well-crafted, user-friendly, and exactly what I expected. The team went above and beyond to help. Their support was very responsive.',
            'sort_order' => 1,
          ],
          1 => 
          [
            'name' => 'Tony Stark',
            'role' => 'CEO & Co Founder',
            'company' => 'Stark Industries',
            'avatar' => 'TS',
            'rating' => 5.0,
            'comment' => 'Exceptional service—intuitive, reliable, and exceeded my expectations. The team was incredibly helpful and ensured a seamless integration process.',
            'sort_order' => 2,
          ],
          2 => 
          [
            'name' => 'Bruce Wayne',
            'role' => 'CEO & Co Founder',
            'company' => 'Wayne Enterprises',
            'avatar' => 'BW',
            'rating' => 4.8,
            'comment' => 'Exceptional quality—innovative, dependable, and surpassed all expectations. The team provided excellent guidance and ensured everything worked perfectly.',
            'sort_order' => 3,
          ],
        ];
        foreach ($testimonials as $testi) {
            Testimonial::updateOrCreate(['name' => $testi['name']], $testi);
        }

        // 11. Blogs
        $blogs = [
          0 => 
          [
            'title' => 'From High-Fidelity Screens to Real Experiences: The Future of Product Design',
            'slug' => 'from-high-fidelity-to-real-experiences',
            'excerpt' => 'How modern design workflows are moving closer to real user interactions, code, and measurable outcomes.',
            'content' => 'In recent years, the gap between static design tools and production code has dramatically narrowed. Modern product designers no longer stop at wireframes—they design interactive prototypes that feel alive...',
            'image' => '/images/blog/image-05.webp',
            'published_date' => 'March 08, 2026',
            'read_time' => '4 min read',
          ],
          1 => 
          [
            'title' => 'Why Designers Who Can Build Will Always Have an Advantage in Their Careers',
            'slug' => 'designers-who-can-build-have-advantage',
            'excerpt' => 'Why designers with basic coding or no-code skills stand out in modern product teams.',
            'content' => 'Understanding the medium you design for transforms how you solve problems. Knowing CSS flexbox, grid, and reactive state prevents unrealistic specifications and speeds up collaboration...',
            'image' => '/images/blog/image-10.webp',
            'published_date' => 'March 06, 2026',
            'read_time' => '5 min read',
          ],
          2 => 
          [
            'title' => 'What Hiring Managers Actually Look for When Reviewing Designer Portfolios Today',
            'slug' => 'designer-portfolios-hiring-managers',
            'excerpt' => 'Reflections, processes, and lessons learned while designing and creating meaningful digital experiences.',
            'content' => 'Portfolios with dozens of generic Dribbble mockups rarely pass technical screening. Hiring managers seek real-world problem statements, trade-offs made, and business outcomes achieved...',
            'image' => '/images/blog/image-06.webp',
            'published_date' => 'March 04, 2026',
            'read_time' => '6 min read',
          ],
          3 => 
          [
            'title' => 'Design Trends That Improve User Experience Instead of Just Looking Good',
            'slug' => 'design-trends-that-improve-ux',
            'excerpt' => 'A look at design trends that genuinely improve usability rather than adding unnecessary visual complexity.',
            'content' => 'Micro-animations, tactile feedback, and purposeful typography elevate aesthetics without compromising accessibility or page performance...',
            'image' => '/images/blog/image-07.webp',
            'published_date' => 'March 02, 2026',
            'read_time' => '4 min read',
          ],
          4 => 
          [
            'title' => 'How Product Thinking Helps Designers Create Work That Truly Makes an Impact',
            'slug' => 'product-thinking-for-meaningful-design',
            'excerpt' => 'How product thinking helps designers align user needs with business goals to create meaningful outcomes.',
            'content' => 'When designers think in metrics, retention loops, and user funnels, design changes from a subjective visual exercise into a strategic growth lever...',
            'image' => '/images/blog/image-08.webp',
            'published_date' => 'February 28, 2026',
            'read_time' => '5 min read',
          ],
        ];
        foreach ($blogs as $blog) {
            Blog::updateOrCreate(['slug' => $blog['slug']], $blog);
        }
    }
}

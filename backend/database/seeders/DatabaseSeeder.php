<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\BrandLogo;
use App\Models\Certificate;
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
        ProfileInfo::create([
            'name' => 'John Doe',
            'title' => 'UI/UX Designer',
            'availability_badge' => 'Available for next months | 2 slots free',
            'headline' => 'Crafting Designs That Work Harder, Think Bigger.',
            'bio' => "From brand identity to web design, I create tailored solutions that engage audiences, elevate your brand, and drive growth. Whether it's a logo, website, or rebrand, let's work together to bring your vision to life.",
            'rating_score' => 4.5,
            'rating_text' => 'Trusted by 1000+ designers',
            'stats' => [
                ['label' => 'Happy Client', 'value' => '250+'],
                ['label' => 'Revenue Added', 'value' => '$50m'],
                ['label' => 'Average Rating', 'value' => '4.9'],
            ],
            'social_links' => [
                'github' => 'https://github.com',
                'dribbble' => 'https://dribbble.com',
                'linkedin' => 'https://linkedin.com',
                'instagram' => 'https://instagram.com',
                'twitter' => 'https://twitter.com',
                'youtube' => 'https://youtube.com',
            ],
        ]);

        $portfolioProjects = [
            [
                'title' => "Lay's wafer",
                'category' => 'E-Commerce Website',
                'slug' => 'lays-ecommerce-site',
                'description' => 'A flavorful, modern e-commerce landing experience designed for Lay\'s crunch wafers with vibrant aesthetics and conversion-driven micro-interactions.',
                'image_light' => '/images/portfolio/image-01.webp',
                'image_dark' => '/images/portfolio/image-01-dark.webp',
                'project_url' => 'https://shadcn-nextjs-craft-landing-page.vercel.app/portfolio/lays-ecommerce-site',
                'tags' => ['E-Commerce', 'UI/UX', 'Next.js', 'Tailwind'],
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Just Website',
                'category' => 'SaaS Product Website',
                'slug' => 'just-website',
                'description' => 'A clean and sleek SaaS product landing page focusing on user clarity, product features, and streamlined user onboarding.',
                'image_light' => '/images/portfolio/image-02.webp',
                'image_dark' => '/images/portfolio/image-02.webp',
                'project_url' => 'https://shadcn-nextjs-craft-landing-page.vercel.app/portfolio/just-website',
                'tags' => ['SaaS', 'Web Design', 'Figma', 'React'],
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Astro AI',
                'category' => 'AI Website',
                'slug' => 'astro-ai',
                'description' => 'Cutting-edge AI dashboard and website experience built for intuitive workflow automation with dark mode brilliance.',
                'image_light' => '/images/portfolio/image-03.webp',
                'image_dark' => '/images/portfolio/image-03.webp',
                'project_url' => 'https://shadcn-nextjs-craft-landing-page.vercel.app/portfolio/astro-ai',
                'tags' => ['Artificial Intelligence', 'Product Design', 'Next.js'],
                'is_featured' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'John Doe',
                'category' => 'Portfolio Website',
                'slug' => 'portfolio-website',
                'description' => 'Minimalist creative personal portfolio highlighting case studies, client feedback, and interactive craft design.',
                'image_light' => '/images/portfolio/image-04.webp',
                'image_dark' => '/images/portfolio/image-04-dark.webp',
                'project_url' => 'https://shadcn-nextjs-craft-landing-page.vercel.app/portfolio/portfolio-website',
                'tags' => ['Portfolio', 'Brand Identity', 'Creative Dev'],
                'is_featured' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($portfolioProjects as $proj) {
            PortfolioProject::create($proj);
        }

        $services = [
            [
                'title' => 'UI/UX Design',
                'description' => 'I craft intuitive UIs and seamless UXs that solve real problems and deliver results with a user-centric approach.',
                'icon' => 'palette',
                'images' => [
                    '/images/services/image-04.webp',
                    '/images/services/image-05.webp',
                    '/images/services/image-06.webp',
                ],
                'sort_order' => 1,
            ],
            [
                'title' => 'Web Design',
                'description' => 'I craft modern, responsive web designs that tell your brand\'s story. Optimized for performance, usability, and seamless navigation.',
                'icon' => 'laptop',
                'images' => [],
                'sort_order' => 2,
            ],
            [
                'title' => 'Logo Design',
                'description' => 'Crafting distinctive, scalable, and impactful logos that embody your brand\'s identity and vision.',
                'icon' => 'pen-tool',
                'images' => [],
                'sort_order' => 3,
            ],
            [
                'title' => 'Framer Design',
                'description' => 'I create high-quality designs using Framer that are interactive and engaging. Bringing ideas to life with smooth animations.',
                'icon' => 'framer',
                'images' => [
                    '/images/services/image-01.webp',
                    '/images/services/image-02.webp',
                    '/images/services/image-03.webp',
                ],
                'sort_order' => 4,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }

        $experiences = [
            [
                'company' => 'UX studio',
                'role' => 'Sr. UX Designer',
                'employment_type' => 'Full-time',
                'period' => '2025 - Present',
                'description' => 'Leading design system architecture, cross-platform product research, and mentoring junior designers.',
                'bullets' => [
                    'Architected comprehensive design systems used across multi-tier enterprise web applications.',
                    'Conducted extensive user testing and iterative prototyping resulting in 35% higher task completion rates.',
                    'Collaborated directly with engineering leads for high-fidelity component handoffs in Next.js.',
                ],
                'skills' => ['Figma', 'Design Systems', 'User Research', 'Next.js'],
                'sort_order' => 1,
            ],
            [
                'company' => 'UX studio',
                'role' => 'Jr. UX Designer',
                'employment_type' => 'Full-time',
                'period' => '2024 - 2025',
                'description' => 'Expert in creating user-centered and intuitive digital experiences.',
                'bullets' => [
                    'Expert in creating user-centered and intuitive digital experiences.',
                    'Skilled in wireframing, prototyping, and interactive design.',
                    'Strong eye for visual design, layout, and consistency.',
                    'Collaborative problem-solver focused on seamless user journeys.',
                ],
                'skills' => ['UI Design', 'Mobile app Design', 'Website UI Design'],
                'sort_order' => 2,
            ],
            [
                'company' => 'UX studio',
                'role' => 'UI/UX Designer',
                'employment_type' => 'Full-time',
                'period' => '2023 - 2024',
                'description' => 'Transformed complex technical requirements into user-friendly digital interfaces.',
                'bullets' => [
                    'Created visual identity guidelines and responsive screen components.',
                    'Delivered 12+ client projects on schedule with stellar reviews.',
                ],
                'skills' => ['UI Design', 'Interaction Design', 'Adobe XD'],
                'sort_order' => 3,
            ],
            [
                'company' => 'Creative Team',
                'role' => 'UI Designer',
                'employment_type' => 'Full-time',
                'period' => '2022 - 2023',
                'description' => 'Focused on visual assets, graphic branding, and responsive layout styling.',
                'bullets' => [
                    'Crafted marketing website layouts and email campaign graphics.',
                    'Optimized digital assets for fast web delivery and responsive scaling.',
                ],
                'skills' => ['Figma', 'Canva', 'Photoshop'],
                'sort_order' => 4,
            ],
            [
                'company' => 'Creative Team',
                'role' => 'Intern UI Designer',
                'employment_type' => 'Full-time',
                'period' => '2021 - 2022',
                'description' => 'Passionate about crafting clean, user-friendly interface designs.',
                'bullets' => [
                    'Passionate about crafting clean, user-friendly interface designs.',
                    'Skilled in wireframing, prototyping, and basic usability testing.',
                    'Familiar with design tools like Figma, Adobe XD, and Sketch.',
                    'Eager to learn, collaborate, and grow in real-world design projects.',
                ],
                'skills' => ['Figma', 'Design Systems', 'Canva', 'Adobe XD', 'Sketch'],
                'sort_order' => 5,
            ],
        ];

        foreach ($experiences as $exp) {
            Experience::create($exp);
        }

        $projectsShowcase = [
            [
                'name' => 'shadcn/studio',
                'duration' => '2 Months',
                'period' => 'March 2025 - May 2025',
                'logo' => '/images/project/image-10.webp',
                'description' => 'shadcn/studio is an all-in-one design system and toolkit that seamlessly blends design and development. It offers a comprehensive set of customizable UI components, Figma kits, and real-time collaboration tools, making it easier for teams to build scalable and consistent user interfaces.',
                'features' => [
                    ['title' => 'Design System', 'detail' => 'A robust set of UI components and design patterns that ensure consistency and scalability across digital products.'],
                    ['title' => 'Figma Kit', 'detail' => 'A meticulously crafted Figma library with auto-layout, design tokens, and synchronized variant sets.'],
                    ['title' => 'Customizable', 'detail' => 'Easily adaptable to meet brand-specific needs with support for theming, styling, and component customization.'],
                    ['title' => 'Real-Time Collaboration', 'detail' => 'Enable teams to work together effectively by integrating design and code, ensuring alignment at every stage of the development process.'],
                ],
                'tools' => [
                    ['name' => 'Figma', 'image' => '/images/project/image-13.webp'],
                    ['name' => 'Framer', 'image' => '/images/project/image-12.webp'],
                    ['name' => 'Canva', 'image' => '/images/project/image-11.webp'],
                ],
                'sort_order' => 1,
            ],
            [
                'name' => 'FlyonUI',
                'duration' => '3 Months',
                'period' => 'Jan 2025 - March 2025',
                'logo' => '/images/project/image-09.webp',
                'description' => 'FlyonUI is an open-source Tailwind CSS component library designed for high accessibility and developer speed with pre-built components and semantic styling.',
                'features' => [
                    ['title' => 'Semantic Elements', 'detail' => 'Crafted with HTML5 semantic guidelines and ARIA compliance for universal accessibility.'],
                    ['title' => 'Speed Focused', 'detail' => 'Lightweight footprint with zero runtime overhead and rapid prototyping utilities.'],
                ],
                'tools' => [
                    ['name' => 'Figma', 'image' => '/images/project/image-13.webp'],
                    ['name' => 'Framer', 'image' => '/images/project/image-12.webp'],
                ],
                'sort_order' => 2,
            ],
            [
                'name' => 'Jetship',
                'duration' => '4 Months',
                'period' => 'Sep 2024 - Dec 2024',
                'logo' => '/images/project/image-08.webp',
                'description' => 'Jetship is a modern boilerplate and launchpad for founders to ship SaaS products in days instead of months with integrated auth, billing, and dashboards.',
                'features' => [
                    ['title' => 'SaaS Architecture', 'detail' => 'Battle-tested Next.js and API architecture with out-of-the-box payment integration.'],
                    ['title' => 'Dashboard UI', 'detail' => 'Clean analytics charts, user settings, and billing portal.'],
                ],
                'tools' => [
                    ['name' => 'Figma', 'image' => '/images/project/image-13.webp'],
                ],
                'sort_order' => 3,
            ],
            [
                'name' => 'Themeselection',
                'duration' => '10 Months',
                'period' => 'May 2024 - Dec 2024',
                'logo' => '/images/project/image-07.webp',
                'description' => 'Premium UI kits, admin templates, and design resources trusted by over 300,000+ developers worldwide.',
                'features' => [
                    ['title' => 'Template Suite', 'detail' => 'Extensive collection of dashboard layouts, ecommerce screens, and CRM pages.'],
                    ['title' => 'Design Consistency', 'detail' => 'Unified visual language across multiple tech stacks and UI frameworks.'],
                ],
                'tools' => [
                    ['name' => 'Figma', 'image' => '/images/project/image-13.webp'],
                    ['name' => 'Framer', 'image' => '/images/project/image-12.webp'],
                ],
                'sort_order' => 4,
            ],
        ];

        foreach ($projectsShowcase as $ps) {
            ProjectShowcase::create($ps);
        }

        $testimonials = [
            [
                'name' => 'Marley Calzoni',
                'role' => 'CEO & Co Founder',
                'company' => 'Lemonsqueezy',
                'avatar' => 'MC',
                'rating' => 4.5,
                'comment' => 'Outstanding product—well-crafted, user-friendly, and exactly what I expected. The team went above and beyond to help. Their support was very responsive.',
                'sort_order' => 1,
            ],
            [
                'name' => 'Tony Stark',
                'role' => 'CEO & Co Founder',
                'company' => 'Stark Industries',
                'avatar' => 'TS',
                'rating' => 5.0,
                'comment' => 'Exceptional service—intuitive, reliable, and exceeded my expectations. The team was incredibly helpful and ensured a seamless integration process.',
                'sort_order' => 2,
            ],
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

        foreach ($testimonials as $t) {
            Testimonial::create($t);
        }

        $blogs = [
            [
                'title' => 'From High-Fidelity Screens to Real Experiences: The Future of Product Design',
                'slug' => 'from-high-fidelity-to-real-experiences',
                'excerpt' => 'How modern design workflows are moving closer to real user interactions, code, and measurable outcomes.',
                'content' => 'In recent years, the gap between static design tools and production code has dramatically narrowed. Modern product designers no longer stop at wireframes—they design interactive prototypes that feel alive...',
                'image' => '/images/blog/image-05.webp',
                'published_date' => 'March 08, 2026',
                'read_time' => '4 min read',
            ],
            [
                'title' => 'Why Designers Who Can Build Will Always Have an Advantage in Their Careers',
                'slug' => 'designers-who-can-build-have-advantage',
                'excerpt' => 'Why designers with basic coding or no-code skills stand out in modern product teams.',
                'content' => 'Understanding the medium you design for transforms how you solve problems. Knowing CSS flexbox, grid, and reactive state prevents unrealistic specifications and speeds up collaboration...',
                'image' => '/images/blog/image-10.webp',
                'published_date' => 'March 06, 2026',
                'read_time' => '5 min read',
            ],
            [
                'title' => 'What Hiring Managers Actually Look for When Reviewing Designer Portfolios Today',
                'slug' => 'designer-portfolios-hiring-managers',
                'excerpt' => 'Reflections, processes, and lessons learned while designing and creating meaningful digital experiences.',
                'content' => 'Portfolios with dozens of generic Dribbble mockups rarely pass technical screening. Hiring managers seek real-world problem statements, trade-offs made, and business outcomes achieved...',
                'image' => '/images/blog/image-06.webp',
                'published_date' => 'March 04, 2026',
                'read_time' => '6 min read',
            ],
            [
                'title' => 'Design Trends That Improve User Experience Instead of Just Looking Good',
                'slug' => 'design-trends-that-improve-ux',
                'excerpt' => 'A look at design trends that genuinely improve usability rather than adding unnecessary visual complexity.',
                'content' => 'Micro-animations, tactile feedback, and purposeful typography elevate aesthetics without compromising accessibility or page performance...',
                'image' => '/images/blog/image-07.webp',
                'published_date' => 'March 02, 2026',
                'read_time' => '4 min read',
            ],
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
            Blog::create($blog);
        }

        $certificatesJson = file_get_contents(base_path('../frontend/src/data/certificates.json'));
        if ($certificatesJson) {
            $certs = json_decode($certificatesJson, true);
            foreach ($certs as $idx => $c) {
                Certificate::updateOrCreate(
                    ['slug' => $c['id']],
                    [
                        'title' => $c['title'],
                        'issuer' => $c['issuer'],
                        'issuer_org' => $c['issuerOrg'] ?? $c['issuer'],
                        'category' => $c['category'],
                        'image' => $c['image'],
                        'accent_color' => $c['accentColor'] ?? null,
                        'issue_date' => $c['issueDate'],
                        'expiration_date' => $c['expirationDate'] ?? 'No Expiration',
                        'credential_id' => $c['credentialId'],
                        'verify_url' => $c['verifyUrl'],
                        'description' => $c['description'],
                        'overview' => $c['overview'] ?? null,
                        'skills' => $c['skills'] ?? [],
                        'curriculum' => $c['curriculum'] ?? [],
                        'highlights' => $c['highlights'] ?? [],
                        'sort_order' => $idx + 1,
                    ]
                );
            }
        }

        // 8. Brand Logos Seeding
        $brandLogos = [
            ['name' => 'Product Hunt', 'logo' => '/images/brand-logo/product-hunt-logo-bw.webp', 'sort_order' => 1],
            ['name' => 'Reddit', 'logo' => '/images/brand-logo/reddit-logo-bw.webp', 'sort_order' => 2],
            ['name' => 'Medium', 'logo' => '/images/brand-logo/medium-logo-bw.webp', 'sort_order' => 3],
            ['name' => 'Dev.to', 'logo' => '/images/brand-logo/devto-logo-bw.webp', 'sort_order' => 4],
            ['name' => 'daily.dev', 'logo' => '/images/brand-logo/dailydev-logo-bw.webp', 'sort_order' => 5],
            ['name' => 'Best of JS', 'logo' => '/images/brand-logo/bestofjs-logo-bw.webp', 'sort_order' => 6],
            ['name' => 'Y Combinator', 'logo' => '/images/brand-logo/ycombinator-logo-bw.webp', 'sort_order' => 7],
            ['name' => 'Launchtory', 'logo' => '/images/brand-logo/launchtory-logo-bw.webp', 'sort_order' => 8],
        ];

        foreach ($brandLogos as $b) {
            BrandLogo::firstOrCreate(['name' => $b['name']], $b);
        }

        // 9. Default Skills for Services Marquee in Profile
        $profile = ProfileInfo::first();
        if ($profile && empty($profile->skills_row1)) {
            $profile->update([
                'skills_row1' => ['Figma', 'UI Design', 'UX Design', 'Canva', 'Blender', 'Photoshop', 'Research', 'Graphics', 'Copywriting'],
                'skills_row2' => ['Next.js', 'Tailwind CSS', 'React', 'TypeScript', 'Framer Motion', 'Design Systems', 'Responsive Web', 'Wireframing', 'User Flows'],
            ]);
        }
    }
}

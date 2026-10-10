<?php

namespace Database\Seeders;

use App\Models\DesignTool;
use App\Models\ProfileInfo;
use Illuminate\Database\Seeder;

class DesignToolSeeder extends Seeder
{
    public function run(): void
    {
        DesignTool::truncate();

        $tools = [
            ['name' => 'Figma', 'href' => 'https://figma.com', 'icon' => '/images/about/image-19.webp', 'dark_icon' => null, 'show_name' => true, 'sort_order' => 1],
            ['name' => 'Framer', 'href' => 'https://framer.com', 'icon' => '/images/about/image-20.webp', 'dark_icon' => '/images/about/image-20-dark.webp', 'show_name' => true, 'sort_order' => 2],
            ['name' => 'Blender', 'href' => 'https://blender.org', 'icon' => '/images/about/image-21.webp', 'dark_icon' => null, 'show_name' => true, 'sort_order' => 3],
            ['name' => 'Webflow', 'href' => 'https://webflow.com', 'icon' => '/images/about/image-22.webp', 'dark_icon' => null, 'show_name' => true, 'sort_order' => 4],
            ['name' => 'Notion', 'href' => 'https://notion.so', 'icon' => '/images/about/image-23.webp', 'dark_icon' => '/images/about/image-23-dark.webp', 'show_name' => true, 'sort_order' => 5],
            ['name' => 'GitHub', 'href' => 'https://github.com', 'icon' => '/images/about/image-24.webp', 'dark_icon' => '/images/about/image-24-dark.webp', 'show_name' => true, 'sort_order' => 6],
            ['name' => 'Adobe XD', 'href' => 'https://adobe.com/products/xd', 'icon' => '/images/about/image-25.webp', 'dark_icon' => null, 'show_name' => true, 'sort_order' => 7],
            ['name' => 'Miro', 'href' => 'https://miro.com', 'icon' => '/images/about/image-26.webp', 'dark_icon' => null, 'show_name' => true, 'sort_order' => 8],
            ['name' => 'Canva', 'href' => 'https://canva.com', 'icon' => '/images/about/image-27.webp', 'dark_icon' => null, 'show_name' => false, 'sort_order' => 9],
        ];

        foreach ($tools as $t) {
            DesignTool::create($t);
        }

        $profile = ProfileInfo::first();
        if ($profile) {
            $profile->update([
                'about_tools_title' => 'Tools That Power My Design Process',
                'about_tools_description' => 'My design process is powered by tools that encourage clarity, collaboration, and creativity — turning vision into user-centered experiences.',
            ]);
        }
    }
}

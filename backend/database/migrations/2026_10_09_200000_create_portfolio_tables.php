<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profile_infos', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('John Doe');
            $table->string('title')->default('UI/UX Designer');
            $table->string('availability_badge')->default('Available for next months | 2 slots free');
            $table->string('headline')->default('Crafting Designs That Work Harder, Think Bigger.');
            $table->text('bio');
            $table->float('rating_score')->default(4.5);
            $table->string('rating_text')->default('Trusted by 1000+ designers');
            $table->json('stats')->nullable();
            $table->json('social_links')->nullable();
            $table->timestamps();
        });

        Schema::create('portfolio_projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('image_light');
            $table->string('image_dark')->nullable();
            $table->string('project_url')->nullable();
            $table->json('tags')->nullable();
            $table->boolean('is_featured')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('icon')->default('palette');
            $table->json('images')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('company');
            $table->string('role');
            $table->string('employment_type')->default('Full-time');
            $table->string('period');
            $table->text('description')->nullable();
            $table->json('bullets')->nullable();
            $table->json('skills')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('projects_showcase', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('duration');
            $table->string('period');
            $table->string('logo');
            $table->text('description');
            $table->json('features')->nullable();
            $table->json('tools')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');
            $table->string('company');
            $table->string('avatar')->nullable();
            $table->float('rating')->default(5.0);
            $table->text('comment');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt');
            $table->longText('content')->nullable();
            $table->string('image');
            $table->string('published_date');
            $table->string('read_time')->default('5 min read');
            $table->timestamps();
        });

        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('budget')->nullable();
            $table->text('message');
            $table->json('services')->nullable();
            $table->string('ip_address')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('blogs');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('projects_showcase');
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('services');
        Schema::dropIfExists('portfolio_projects');
        Schema::dropIfExists('profile_infos');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('design_tools', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('icon');
            $table->string('dark_icon')->nullable();
            $table->string('href')->nullable();
            $table->boolean('show_name')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::table('profile_infos', function (Blueprint $table) {
            $table->string('about_tools_title')->nullable();
            $table->text('about_tools_description')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('design_tools');
        Schema::table('profile_infos', function (Blueprint $table) {
            $table->dropColumn(['about_tools_title', 'about_tools_description']);
        });
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profile_infos', function (Blueprint $table) {
            $table->json('about_paragraphs')->nullable();
            $table->string('about_image')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('profile_infos', function (Blueprint $table) {
            $table->dropColumn(['about_paragraphs', 'about_image']);
        });
    }
};

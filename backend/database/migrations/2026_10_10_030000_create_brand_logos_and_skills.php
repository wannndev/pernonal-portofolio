<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('brand_logos', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo');
            $table->string('url')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::table('profile_infos', function (Blueprint $table) {
            $table->json('skills_row1')->nullable();
            $table->json('skills_row2')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('brand_logos');
        Schema::table('profile_infos', function (Blueprint $table) {
            $table->dropColumn(['skills_row1', 'skills_row2']);
        });
    }
};

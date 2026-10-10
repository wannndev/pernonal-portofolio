<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('issuer');
            $table->string('issuer_org');
            $table->string('category');
            $table->string('image');
            $table->string('accent_color')->nullable();
            $table->string('issue_date');
            $table->string('expiration_date')->default('No Expiration');
            $table->string('credential_id');
            $table->string('verify_url');
            $table->text('description');
            $table->text('overview')->nullable();
            $table->json('skills')->nullable();
            $table->json('curriculum')->nullable();
            $table->json('highlights')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};

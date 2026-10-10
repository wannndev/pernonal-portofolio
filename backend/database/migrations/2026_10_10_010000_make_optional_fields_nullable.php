<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profile_infos', function (Blueprint $table) {
            $table->string('availability_badge')->nullable()->change();
            $table->string('rating_text')->nullable()->change();
            $table->float('rating_score')->nullable()->change();
            $table->string('headline')->nullable()->change();
            $table->string('title')->nullable()->change();
        });

        Schema::table('projects_showcase', function (Blueprint $table) {
            $table->string('duration')->nullable()->change();
            $table->string('period')->nullable()->change();
            $table->string('logo')->nullable()->change();
        });

        Schema::table('services', function (Blueprint $table) {
            $table->string('icon')->nullable()->change();
        });

        Schema::table('experiences', function (Blueprint $table) {
            $table->string('employment_type')->nullable()->change();
        });
    }

    public function down(): void
    {
        //
    }
};

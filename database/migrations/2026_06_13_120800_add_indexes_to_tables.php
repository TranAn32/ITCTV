<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('news', function (Blueprint $table) {
            if (Schema::hasColumn('news', 'is_visible')) {
                $table->index('is_visible');
            }
        });

        Schema::table('projects', function (Blueprint $table) {
            if (Schema::hasColumn('projects', 'is_visible')) {
                $table->index('is_visible');
            }
        });

        Schema::table('partners', function (Blueprint $table) {
            if (Schema::hasColumn('partners', 'is_visible')) {
                $table->index('is_visible');
            }
        });

        Schema::table('services', function (Blueprint $table) {
            if (Schema::hasColumn('services', 'is_visible')) {
                $table->index('is_visible');
            }
            if (Schema::hasColumn('services', 'sort_order')) {
                $table->index('sort_order');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            $table->dropIndex(['is_visible']);
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropIndex(['is_visible']);
        });

        Schema::table('partners', function (Blueprint $table) {
            $table->dropIndex(['is_visible']);
        });

        Schema::table('services', function (Blueprint $table) {
            $table->dropIndex(['is_visible']);
            $table->dropIndex(['sort_order']);
        });
    }
};

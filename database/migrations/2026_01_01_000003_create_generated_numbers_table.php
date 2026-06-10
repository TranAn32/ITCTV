<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('generated_numbers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete();
            $table->foreignId('document_type_id')->constrained('document_types')->cascadeOnDelete();
            $table->unsignedSmallInteger('year');
            $table->unsignedInteger('sequence');
            $table->string('document_number', 50)->unique();
            $table->enum('status', ['unused', 'used', 'cancelled'])->default('unused');
            $table->timestamps();

            // Composite unique to prevent duplicate sequences
            $table->unique(['company_id', 'document_type_id', 'year', 'sequence'], 'gen_num_unique_sequence');

            // Performance indexes
            $table->index('status');
            $table->index('year');
            $table->index(['company_id', 'document_type_id', 'year'], 'gen_num_lookup');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('generated_numbers');
    }
};

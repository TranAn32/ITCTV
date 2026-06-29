<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recruitments', function (Blueprint $table) {
            $table->id();
            $table->string('title');              // Tên vị trí tuyển dụng
            $table->string('department')->nullable();  // Phòng ban
            $table->string('location')->nullable();    // Địa điểm làm việc
            $table->string('employment_type')->default('Toàn thời gian'); // Loại hình
            $table->string('salary_range')->nullable(); // Khoảng lương
            $table->string('experience')->nullable();   // Yêu cầu kinh nghiệm
            $table->date('deadline')->nullable();       // Hạn nộp hồ sơ
            $table->text('description');                // Mô tả công việc
            $table->text('requirements')->nullable();   // Yêu cầu ứng viên
            $table->text('benefits')->nullable();       // Quyền lợi
            $table->boolean('is_visible')->default(true);
            $table->timestamps();

            $table->index('is_visible');
            $table->index('deadline');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recruitments');
    }
};

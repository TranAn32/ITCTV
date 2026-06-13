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
        DB::table('news')->insert([
            [
                'title' => 'ITC ký kết hợp tác chiến lược với Microsoft Việt Nam về giải pháp Cloud',
                'summary' => 'Nâng cao năng lực cung cấp hạ tầng điện toán đám mây an toàn và bảo mật cho khối cơ quan chính phủ.',
                'content' => "Sáng nay, đại diện ITC và Microsoft Việt Nam đã chính thức ký kết thỏa thuận hợp tác chiến lược toàn diện.\n\nHai bên sẽ cùng phối hợp xây dựng và triển khai các giải pháp hạ tầng máy chủ ảo (Cloud) chuẩn doanh nghiệp đáp ứng đầy đủ yêu cầu khắt khe về an ninh mạng của Bộ Thông tin & Truyền thông.\n\nSự kiện đánh dấu một bước tiến lớn của ITC trong việc mang công nghệ toàn cầu vào các dự án chuyển đổi số công.",
                'image_path' => 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=600',
                'is_visible' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Khởi động dự án nâng cấp trung tâm dữ liệu Bộ Y tế',
                'summary' => 'Dự án trị giá hàng tỷ đồng nhằm đảm bảo khả năng vận hành liên tục cho hệ thống quản lý hồ sơ sức khỏe điện tử.',
                'content' => "Với kinh nghiệm quản lý và giám sát các dự án quy mô lớn, ITC tiếp tục được tin tưởng lựa chọn làm đơn vị tư vấn giám sát cho dự án nâng cấp Trung tâm dữ liệu của Bộ Y tế.\n\nDự án bao gồm việc thay thế hệ thống máy chủ lỗi thời, thiết lập cơ chế sao lưu dự phòng (Disaster Recovery) và nâng cấp hệ thống làm mát chính xác.\n\nDự kiến dự án sẽ hoàn thành vào cuối năm nay, góp phần củng cố hệ sinh thái y tế số quốc gia.",
                'image_path' => 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600',
                'is_visible' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Xu hướng ứng dụng AI trong quản lý thủ tục hành chính công',
                'summary' => 'Tự động hóa quy trình xét duyệt và phân loại hồ sơ công dân bằng công nghệ AI, tiết kiệm hàng ngàn giờ làm việc.',
                'content' => "Tại hội thảo 'Công nghệ kiến tạo Chính phủ số', các kỹ sư ITC đã trình bày tham luận về tiềm năng ứng dụng Trí tuệ nhân tạo (AI) trong việc giải quyết thủ tục hành chính.\n\nGiải pháp nhận diện và trích xuất dữ liệu tự động (OCR) kết hợp với AI có thể giúp phân loại hồ sơ nhanh gấp 10 lần so với quy trình thủ công.\n\nNhiều địa phương bày tỏ sự quan tâm và lên kế hoạch thử nghiệm giải pháp do ITC đề xuất trong thời gian tới.",
                'image_path' => 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600',
                'is_visible' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'ITC nhận giải thưởng Top 10 Doanh nghiệp Công nghệ số xuất sắc',
                'summary' => 'Ghi nhận những đóng góp nổi bật của công ty trong việc triển khai các nền tảng công nghệ thiết yếu cho cộng đồng.',
                'content' => "Tối ngày 12/10, tại lễ trao giải Tech Awards 2026, ITC tự hào được xướng tên trong Top 10 Doanh nghiệp Công nghệ số xuất sắc nhất năm.\n\nGiải thưởng là minh chứng cho định hướng đúng đắn và nỗ lực không mệt mỏi của tập thể cán bộ nhân viên ITC.\n\nChúng tôi cam kết sẽ tiếp tục mang đến những giải pháp tư vấn và giám sát chất lượng nhất, đồng hành cùng sự phát triển của đất nước.",
                'image_path' => 'https://images.unsplash.com/photo-1531545514251-b159ce9420bf?q=80&w=600',
                'is_visible' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

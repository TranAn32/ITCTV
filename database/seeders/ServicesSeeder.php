<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'slug' => 'khao-sat-cntt',
                'title' => 'Tư vấn khảo sát dự án Công nghệ thông tin',
                'short_title' => 'Tư vấn khảo sát',
                'summary' => 'Khảo sát và đánh giá thực tế một cách độc lập, chi tiết, tạo cơ sở dữ liệu xác thực cho toàn bộ các bước triển khai kỹ thuật tiếp theo.',
                'icon' => 'Search',
                'tag' => 'Chuẩn bị đầu tư',
                'color_theme' => 'blue',
                'image_path' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
                'items' => "Khảo sát đánh giá hiện trạng và các kế hoạch ứng dụng công nghệ thông tin phục vụ các hoạt động của tổ chức.\nKhảo sát số liệu hiện trạng hồ sơ của Đơn vị phục vụ cho việc lập dự án đầu tư/ đề cương dự toán chi tiết.\nLập Nhiệm vụ khảo sát pháp lý chuẩn chỉnh (nếu có yêu cầu từ phía Chủ đầu tư).\nXây dựng Báo cáo kết quả khảo sát bảo đảm khoa học, chuẩn xác theo quy định hiện hành.",
                'is_visible' => true,
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'lap-du-an-khao-thi',
                'title' => 'Tư vấn lập dự án / báo cáo nghiên cứu khả thi / thiết kế thi công / đề cương dự toán chi tiết',
                'short_title' => 'Lập báo cáo khả thi',
                'summary' => 'Đồng hành xây dựng các hồ sơ quy hoạch, dự thảo giải pháp công nghệ kỹ lưỡng tạo bệ phóng an toàn nâng cao hiệu suất thầu.',
                'icon' => 'Layers',
                'tag' => 'Lập & Hoạch định',
                'color_theme' => 'sky',
                'image_path' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
                'items' => "Đánh giá hiện trạng hạ tầng và chứng minh, luận chứng sự cần thiết phải tiến hành đầu tư.\nXác định rõ ràng mục tiêu, quy mô và phạm vi đầu tư tối ưu nhất cho phía Chủ đầu tư.\nPhân tích kỹ lưỡng các phương án công nghệ và lựa chọn giải pháp kỹ thuật phù hợp nhất.\nPhân tích hiệu quả đầu tư dự án (hiệu quả tài chính, hiệu quả kinh tế - xã hội, hiệu quả nghiệp vụ).\nLập Thiết kế sơ bộ ban đầu trực quan, đồng bộ và đạt chuẩn kiểm duyệt.\nLập Tổng mức đầu tư dự toán tài chính chuẩn xác theo đơn giá thị trường.",
                'is_visible' => true,
                'sort_order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'thiet-ke-tong-du-toan',
                'title' => 'Tư vấn lập Thiết kế thi công và Tổng dự toán',
                'short_title' => 'Thiết kế thi công',
                'summary' => 'Nghiên cứu tài liệu khảo sát, khảo sát bổ sung và chuẩn hóa chi tiết từng bản vẽ thi công kèm dự tính kinh tế chuẩn tắc.',
                'icon' => 'Calculator',
                'tag' => 'Kỹ thuật chuyên sâu',
                'color_theme' => 'emerald',
                'image_path' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
                'items' => "Nghiên cứu kỹ lưỡng các tài liệu pháp lý đã có của dự án trong giai đoạn chuẩn bị đầu tư.\nNghiên cứu Thiết kế sơ bộ của dự án đã được phê duyệt làm cơ sở định hướng thiết kế.\nTiến hành khảo sát đo kiểm bổ sung thực tế tại hiện trường để đảm bảo độ chính xác tuyệt đối.\nLập Thiết kế thi công bám sát chính xác theo Thiết kế sơ bộ đã được cấp có thẩm quyền phê duyệt.\nNghiên cứu các nội dung chi phí liên quan đến Thiết kế thi công, từ đó xác định chuẩn xác Tổng dự toán của Dự án.\nHoàn thiện hồ sơ Thiết kế thi công và tổng dự toán của Dự án chuẩn chỉ đủ năng lực trình duyệt.",
                'is_visible' => true,
                'sort_order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'de-cuong-du-toan-chi-tiet',
                'title' => 'Tư vấn lập Đề cương và dự toán chi tiết',
                'short_title' => 'Lập Đề cương chi tiết',
                'summary' => 'Hiệu chỉnh nội dung chi tiêu ứng dụng CNTT đảm bảo thiết thực, chuẩn mực, tiết kiệm ngân sách và đủ thuyết minh định mức.',
                'icon' => 'ClipboardList',
                'tag' => 'Tối ưu ngân sách',
                'color_theme' => 'blue',
                'image_path' => 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800',
                'items' => "Bảo đảm phù hợp hoàn toàn với yêu cầu triển khai hoạt động ứng dụng công nghệ thông tin đã được phê duyệt.\nBảo đảm tuân thủ các quy chuẩn, tiêu chuẩn kỹ thuật công nghệ thông tin áp dụng đối với nội dung chi nêu trong đề cương.\nBảo đảm thuyết minh của đề cương và dự toán chi tiết rõ ràng, minh bạch, làm rõ được các số liệu biểu mẫu tính toán.",
                'is_visible' => true,
                'sort_order' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'tham-tra-du-an',
                'title' => 'Tư vấn Thẩm tra độc lập',
                'short_title' => 'Phản biện & Thẩm tra',
                'summary' => 'Hội đồng chuyên môn phản biện độc lập độc vị rủi ro dự toán, quy chuẩn chất lượng, kết cấu hệ thống trước cấp có thẩm quyền phê duyệt.',
                'icon' => 'ShieldCheck',
                'tag' => 'Bảo chứng pháp lý',
                'color_theme' => 'indigo',
                'image_path' => 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800',
                'items' => "Thẩm tra Báo cáo nghiên cứu khả thi dự án CNTT (bóc tách tính hợp lý của công nghệ, kiến trúc và giải pháp đề xuất).\nThẩm tra Thiết kế thi công và tổng dự toán (rà soát tính chính xác của khối lượng, định mức kinh tế kỹ thuật áp dụng).",
                'is_visible' => true,
                'sort_order' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'giam-sat-kiem-thu',
                'title' => 'Tư vấn giám sát / kiểm thử các dự án CNTT',
                'short_title' => 'Giám sát & Kiểm thử',
                'summary' => 'Bảo chứng chất lượng thi công, hỗ trợ tháo gỡ điểm nghẽn và kiểm định phần mềm một cách hoàn toàn khách quan, minh bạch.',
                'icon' => 'Eye',
                'tag' => 'Kiểm soát chất lượng',
                'color_theme' => 'rose',
                'image_path' => 'https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=800',
                'items' => "Hỗ trợ chủ đầu tư quản lý dự án CNTT toàn diện trong suốt quá trình triển khai thầu thực địa.\nGiám sát chặt chẽ việc tuân thủ và đáp ứng các yêu cầu chất lượng, tiến độ và kỹ thuật của nhà cung cấp.\nThực hiện kiểm thử các phần mềm độc lập, khách quan: Kiểm thử chức năng, kiểm thử hiệu năng, cấu trúc...",
                'is_visible' => true,
                'sort_order' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'quan-ly-du-an-cntt',
                'title' => 'Tư vấn quản lý dự án CNTT',
                'short_title' => 'Quản lý dự án',
                'summary' => 'Quản trị đồng bộ chất lượng, tiến độ thực địa và kiểm soát nghiêm ngặt các rủi ro vận hành lắp đặt.',
                'icon' => 'Briefcase',
                'tag' => 'Quản trị rủi ro',
                'color_theme' => 'amber',
                'image_path' => 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800',
                'items' => "Quản lý chất lượng công tác khảo sát thực tế chuyên môn.\nQuản lý chất lượng hồ sơ thiết kế thi công công nghệ.\nQuản lý giám sát chất lượng trong quá trình thi công xây dựng ứng dụng.\nQuản lý an toàn lao động, phòng chống cháy nổ tối ưu tại các hạng mục phòng máy chủ/Server trung tâm.",
                'is_visible' => true,
                'sort_order' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($services as $service) {
            DB::table('services')->updateOrInsert(
                ['slug' => $service['slug']],
                $service
            );
        }
    }
}

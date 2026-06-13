<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Seed News
        if (DB::table('news')->count() === 0) {
            DB::table('news')->insert([
                [
                    'title' => 'ITC hỗ trợ Cục Đăng kiểm Việt Nam tối ưu hóa quy trình kiểm định số',
                    'summary' => 'Giám sát chất lượng và kiểm thử độc lập nền tảng tích hợp dịch vụ hành chính công liên kết Cơ sở dữ liệu Quốc gia.',
                    'content' => "Để đẩy mạnh tiến trình chuyển đổi số quốc gia, ITC đã đồng hành cùng Cục Đăng kiểm Việt Nam trong vai trò là nhà tư vấn giám sát độc lập và kiểm thử chất lượng phần mềm hệ thống.\n\nHệ thống dịch vụ hành chính công mới tích hợp xác thực một lần với Cơ sở dữ liệu Quốc gia về dân cư đã vượt qua các bài kiểm thử hiệu năng, độ bảo mật và an toàn dữ liệu nghiêm ngặt.\n\nSự đóng góp của đội ngũ ITC giúp tối ưu hóa hệ thống phục vụ hàng triệu người dân cả nước.",
                    'image_path' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600',
                    'is_visible' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'title' => 'Định mức kinh tế kỹ thuật trong lập dự toán CNTT theo Nghị định 73',
                    'summary' => 'Phân tích quy trình thẩm tra dự toán chi tiết giúp tối ưu hóa ngân sách và tránh rủi ro tài khóa cho chủ đầu tư.',
                    'content' => "Việc lập dự toán chi tiết các gói thầu ứng dụng CNTT sử dụng ngân sách nhà nước luôn yêu cầu tính tuân thủ pháp lý cao.\n\nITC chia sẻ các kinh nghiệm thẩm tra dự toán bám sát định mức kinh tế - kỹ thuật theo Nghị định số 73/2019/NĐ-CP.\n\nĐội ngũ tư vấn của chúng tôi giúp các đơn vị chủ đầu tư xác định chính xác tổng mức đầu tư, giá trị thiết bị và chi phí nhân công lập trình sát thực tế thị trường.",
                    'image_path' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600',
                    'is_visible' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'title' => 'Quy chuẩn an toàn thông tin TIA-942 cho Trung tâm dữ liệu hiện đại',
                    'summary' => 'Quy trình khảo sát, thiết kế và giám sát lắp đặt hạ tầng mạng máy chủ đạt tiêu chuẩn bảo mật dữ liệu cấp cao.',
                    'content' => "Một trung tâm dữ liệu tiêu chuẩn cần đáp ứng đầy đủ tính dự phòng và an toàn từ hạ tầng nguồn điện đến hệ thống cáp truyền dẫn.\n\nITC áp dụng tiêu chuẩn quốc tế ANSI/TIA-942 để đánh giá năng lực hoạt động và thiết kế phòng máy chủ tập trung.\n\nQuy trình khảo sát chi tiết mang lại định hướng đầu tư vững chắc và bảo mật thông tin tối đa cho doanh nghiệp.",
                    'image_path' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600',
                    'is_visible' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'title' => 'ITC tổ chức khóa tập huấn nâng cao năng lực giám sát CNTT cho đối tác',
                    'summary' => 'Chương trình đào tạo chuyên sâu về quy trình kiểm thử hệ thống và đánh giá rủi ro an toàn thông tin theo chuẩn quốc tế.',
                    'content' => "Nhằm nâng cao kiến thức quản lý dự án công nghệ cho các chủ đầu tư, ITC đã tổ chức chuỗi chương trình tập huấn nâng cao.\n\nCác chuyên gia cao cấp của ITC trực tiếp hướng dẫn quy trình viết kịch bản kiểm thử (Test Case), quét lỗ hổng bảo mật (Penetration Testing) và các kỹ năng rà soát tiến độ thi công hạ tầng.\n\nKhóa học kết thúc thành công với sự tham gia của đông đảo đại diện đến từ các sở ban ngành tỉnh thành phía Bắc.",
                    'image_path' => 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600',
                    'is_visible' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }

        // 2. Seed Projects
        if (DB::table('projects')->count() === 0) {
            DB::table('projects')->insert([
                [
                    'title' => 'Tư vấn phần mềm — Xây dựng nền tảng hệ thống TTHC (Thủ tục hành chính)',
                    'client' => 'Trung tâm Công nghệ thông tin – Bộ Giao thông Vận tải',
                    'category' => 'gov',
                    'scope' => 'Tư vấn xây dựng nền tảng hệ thống TTHC hợp nhất, tích hợp Cơ sở dữ liệu Quốc gia về dân cư và xác thực một lần (SSO) qua nền tảng liên thông LGSP.',
                    'value' => '151.000.000 đồng (Một trăm năm mươi mốt triệu đồng chẵn)',
                    'package_value' => null,
                    'details' => "Khảo sát và lập quy hoạch tổng thể phần mềm hệ thống một cửa liên thông.\nTích hợp dịch vụ công trực tuyến mức độ 4.\nĐo kiểm hiệu năng và kết nối an toàn với CSDL Quốc gia.",
                    'image_path' => 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800',
                    'is_visible' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'title' => 'Thuê dịch vụ kiểm thử phần mềm',
                    'client' => 'Trung tâm Công nghệ thông tin – Bộ Khoa học và Công nghệ',
                    'category' => 'gov',
                    'scope' => 'Cung cấp dịch vụ kiểm thử độc lập chất lượng cao, rà soát lỗ hổng và kiểm duyệt quy trình kết nối Cơ sở dữ liệu Quốc gia về dân cư.',
                    'value' => '368.000.000 đồng (Ba trăm sáu mươi tám triệu đồng chẵn)',
                    'package_value' => null,
                    'details' => "Xây dựng các bộ kịch bản kiểm thử hiệu năng cho cổng thông tin.\nQuét lỗ hổng bảo mật ứng dụng web theo tiêu chuẩn OWASP.\nBáo cáo đánh giá chất lượng sản phẩm bàn giao.",
                    'image_path' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800',
                    'is_visible' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'title' => 'Tư vấn lập đề cương và dự toán chi tiết nhiệm vụ “Xây dựng hệ thống truy xuất nguồn gốc sản phẩm hàng hóa trên địa bàn tỉnh Bắc Kạn”',
                    'client' => 'Sở Khoa học và Công nghệ tỉnh Bắc Kạn',
                    'category' => 'province',
                    'scope' => 'Tư vấn lập đề cương kinh tế - kỹ thuật và lập dự toán chi tiết bám sát Nghị định 73/2019/NĐ-CP cho hệ thống truy xuất nguồn gốc cấp tỉnh.',
                    'value' => '76.000.000 đồng (Bảy mươi sáu triệu đồng chẵn)',
                    'package_value' => '4 tỷ đồng',
                    'details' => "Khảo sát thực tế các đơn vị sản xuất và nông nghiệp trong tỉnh.\nXác lập mô hình kiến trúc hạ tầng và các luồng truy xuất nguồn gốc.\nLập hồ sơ dự toán thiết kế bám sát thông số định mức chuyên ngành.",
                    'image_path' => 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800',
                    'is_visible' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'title' => 'Tư vấn lập đề cương và dự toán chi tiết nhiệm vụ “Nâng cấp và xây dựng bổ sung nền tảng chung tích hợp chia sẻ các hệ thống thông tin quy mô cấp tỉnh LGSP”',
                    'client' => 'Sở Thông tin và Truyền thông tỉnh Tuyên Quang',
                    'category' => 'province',
                    'scope' => 'Lập đề cương kỹ thuật chuẩn định mức bám sát thông số LGSP và dự toán chi tiết phục vụ nâng cấp hệ thống liên thông tích hợp dữ liệu cấp tỉnh.',
                    'value' => '66.000.000 đồng (Sáu mươi sáu triệu đồng chẵn)',
                    'package_value' => '4.150.000.000 đồng',
                    'details' => "Đánh giá khả năng tương thích của các cổng phần mềm LGSP cũ.\nLập giải pháp kỹ thuật nâng cấp cơ chế chia sẻ dữ liệu qua trục liên thông.\nTổ chức hội thảo kỹ thuật phản biện phương án thiết kế.",
                    'image_path' => 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?q=80&w=800',
                    'is_visible' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }

        // 3. Copy logos and seed Partners
        $srcDir = base_path('resources/react-app/assets/images-networks');
        $destDir = public_path('upload/Partners');

        if (File::exists($srcDir)) {
            if (!File::exists($destDir)) {
                File::makeDirectory($destDir, 0755, true);
            }
            
            $files = File::files($srcDir);
            foreach ($files as $file) {
                File::copy($file->getRealPath(), $destDir . '/' . $file->getFilename());
            }
        }

        if (DB::table('partners')->count() === 0) {
            $initialPartners = [
                ['name' => 'Bộ Khoa học và Công nghệ', 'group' => 'gov', 'logo' => 'kh-bokhcn.png'],
                ['name' => 'Bộ Giao thông Vận tải (Cục Đăng kiểm)', 'group' => 'gov', 'logo' => 'kh-bogiaothongvantai.png'],
                ['name' => 'Bộ Giao thông Vận tải', 'group' => 'gov', 'logo' => 'kh-bogtvt.png'],
                ['name' => 'Bộ Khoa học và Công nghệ (Văn phòng)', 'group' => 'gov', 'logo' => 'kh-bokhvacn.png'],
                ['name' => 'Sở KH&CN Bắc Kạn', 'group' => 'gov', 'logo' => 'kh-sokhcnbackan.png'],
                ['name' => 'Sở TTTT Tuyên Quang', 'group' => 'gov', 'logo' => 'kh-sotttttuyenquang.png'],
                ['name' => 'Sở VHTT&DL Bắc Giang', 'group' => 'gov', 'logo' => 'kh-sovhbacgiang.png'],
                ['name' => 'Hiệp hội Bảo hiểm Việt Nam', 'group' => 'finance', 'logo' => 'kh-hiephoibhvn.png'],
                ['name' => 'Du lịch Ninh Bình', 'group' => 'media', 'logo' => 'kh-dulichninhbinh.png'],
                ['name' => 'Báo Ninh Bình', 'group' => 'media', 'logo' => 'kh-ninhbinh.png'],
                ['name' => 'Báo Nhân dân', 'group' => 'media', 'logo' => 'kh-baonhandan.png'],
            ];

            foreach ($initialPartners as $partner) {
                $logoPath = '/upload/Partners/' . $partner['logo'];
                if (!File::exists(public_path('upload/Partners/' . $partner['logo']))) {
                    $logoPath = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200';
                }

                DB::table('partners')->insert([
                    'name' => $partner['name'],
                    'group' => $partner['group'],
                    'logo_path' => $logoPath,
                    'is_visible' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('news')->truncate();
        DB::table('projects')->truncate();
        DB::table('partners')->truncate();
    }
};

import { ServiceItem, PartnerItem, ProjectItem, TestimonialItem } from './types';

import logoBaoNhanDan from '../assets/images-networks/kh-baonhandan.png';
import logoBoGiaothongvantai from '../assets/images-networks/kh-bogiaothongvantai.png';
import logoBoGtvt from '../assets/images-networks/kh-bogtvt.png';
import logoBoKhcn from '../assets/images-networks/kh-bokhcn.png';
import logoBoKhvacn from '../assets/images-networks/kh-bokhvacn.png';
import logoDulichninhbinh from '../assets/images-networks/kh-dulichninhbinh.png';
import logoHiephoibhvn from '../assets/images-networks/kh-hiephoibhvn.png';
import logoNinhbinh from '../assets/images-networks/kh-ninhbinh.png';
import logoSokhcnbackan from '../assets/images-networks/kh-sokhcnbackan.png';
import logoSotttttuyenquang from '../assets/images-networks/kh-sotttttuyenquang.png';
import logoSovhbacgiang from '../assets/images-networks/kh-sovhbacgiang.png';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'khao-sat-cntt',
    numberCode: '01 / 05',
    title: 'Tư vấn khảo sát dự án CNTT',
    summary: 'Đánh giá toàn diện hiện trạng hệ thống, lập nhiệm vụ khảo sát thực tế và xây dựng phương án báo cáo khả thi chất lượng cao cho các cơ quan, đơn vị, bộ ngành.',
    benefits: [
      'Đánh giá hiện trạng chi tiết, chính xác 100%',
      'Lập phương án & nhiệm vụ khảo sát đúng quy định Bộ Thông tin & Truyền thông',
      'Đề xuất mô hình kiến trúc hạ tầng tối ưu, sẵn sàng mở rộng',
      'Tối ưu hóa tài nguyên phần cứng hiện có'
    ],
    techApplied: ['Enterprise Architect', 'Mô hình TOGAF', 'Khảo sát hiện trường số hóa', 'Phân tích SWOT hệ thống'],
    steps: [
      { title: 'Bước 1: Tiếp nhận & Nghiên cứu', desc: 'Thu thập thông tin sơ bộ và nghiên cứu nhu cầu phát triển ứng dụng hoặc hạ tầng của đơn vị.' },
      { title: 'Bước 2: Lập đề cương & Nhiệm vụ', desc: 'Xác định chi tiết các hạng mục cần khảo sát, đo đạc và thống kê hiệu năng.' },
      { title: 'Bước 3: Thực địa khảo sát', desc: 'Tiến hành đo kiểm thực tế hạ tầng mạng, máy chủ, hạ tầng an toàn thông tin và quy trình nghiệp vụ.' },
      { title: 'Bước 4: Lập báo cáo kết quả', desc: 'Báo cáo chi tiết hiện trạng, chỉ ra các điểm nghẽn và đề xuất định hướng đầu tư.' }
    ]
  },
  {
    id: 'lap-du-an-thiet-ke',
    numberCode: '02 / 05',
    title: 'Lập dự án & Thiết kế thi công',
    summary: 'Xây dựng Báo cáo nghiên cứu khả thi (FS), Thiết kế chi tiết thi công (TKBVTC), phân tích hiệu quả tài chính - xã hội và xác định Tổng mức đầu tư chuẩn xác.',
    benefits: [
      'Cam kết đúng tiêu chuẩn định mức kinh tế kỹ thuật nhà nước',
      'Thiết kế sơ bộ rõ ràng, trực quan, khả thi về mặt kỹ thuật',
      'Báo cáo phân tích hiệu quả tài chính chính xác đến từng hạng mục',
      'Hạn chế rủi ro phát sinh chi phí khi đấu thầu và triển khai'
    ],
    techApplied: ['BIM Integration', 'AutoCAD Civil 3D', 'Phân tích Excel Tài chính PM', 'Microsoft Project Pro'],
    steps: [
      { title: 'Bước 1: Lập báo cáo nghiên cứu', desc: 'Đánh giá sự cần thiết của việc đầu tư, quy mô đầu tư và phân tích các phương án công nghệ.' },
      { title: 'Bước 2: Thiết kế cơ sở / sơ bộ', desc: 'Phác thảo kiến trúc giải pháp, sơ đồ kết nối vật lý và sơ đồ tuần hoàn dữ liệu.' },
      { title: 'Bước 3: Khái toán & Tổng mức đầu tư', desc: 'Tính toán chi phí dựa trên đơn giá thị trường và định mức quy chế hiện hành.' },
      { title: 'Bước 4: Khảo nghiệm & Hoàn thiện', desc: 'Bảo vệ thiết kế trước các hội đồng phản biện kỹ thuật và cấp thẩm quyền phê duyệt.' }
    ]
  },
  {
    id: 'de-cuong-tham-tra',
    numberCode: '03 / 05',
    title: 'Tư vấn Đề cương & Thẩm tra dự toán',
    summary: 'Xây dựng đề cương chi tiết dự toán đúng quy định pháp luật và thẩm tra báo cáo nghiên cứu khả thi, thiết kế thi công một cách độc lập, khách quan.',
    benefits: [
      'Thẩm định giá thiết bị và chi phí nhân công sát thực tế',
      'Bảo vệ quyền lợi chủ đầu tư trước nguy cơ đội giá hoặc sai định mức',
      'Đảm bảo hồ sơ dự toán đủ điều kiện trình duyệt cấp cao nhất',
      'Phát hiện lỗi kỹ thuật thiết kế ngay trước khi đấu thầu'
    ],
    techApplied: ['Cơ sở dữ liệu giá ITC', 'Phần mềm dự toán G8/F1 chuyên sâu', 'Hệ thống kiểm tra định mức Bộ Tài chính'],
    steps: [
      { title: 'Bước 1: Tiếp nhận hồ sơ thiết kế', desc: 'Kiểm tra tính pháp lý, tính đầy đủ của bộ hồ sơ và bản vẽ thiết kế lắp đặt.' },
      { title: 'Bước 2: Đối chiếu quy chuẩn định mức', desc: 'Rà soát khối lượng công việc so với thiết kế, so sánh đơn giá định mức quy định liên quan.' },
      { title: 'Bước 3: Thẩm tra giải pháp công nghệ', desc: 'Đánh giá tính hợp lý, tiên tiến của thiết bị công nghệ đề xuất trong dự án.' },
      { title: 'Bước 4: Phát hành báo cáo thẩm tra', desc: 'Đóng dấu chứng nhận thẩm tra kèm các đề xuất điều chỉnh chi phí tối ưu nhất.' }
    ]
  },
  {
    id: 'giam-sat-kiem-thu',
    numberCode: '04 / 05',
    title: 'Giám sát & Kiểm thử phần mềm',
    summary: 'Đơn vị tư vấn giám sát tuân thủ kỹ thuật CNTT độc lập, đồng thời tiến hành các bài kiểm thử phần mềm chuyên nghiệp (chức năng, bảo mật, tải trọng, kiến trúc).',
    benefits: [
      'Đảm bảo nhà thầu phát triển thực hiện đúng 100% yêu cầu kỹ thuật',
      'Phát hiện lỗi logic và lỗ hổng bảo mật nghiêm trọng trước khi Golive',
      'Sở hữu báo cáo kiểm thử độc lập có giá trị pháp lý nghiệm thu bàn giao',
      'Tối ưu hiệu năng tải cho hệ thống phục vụ hàng triệu người dân'
    ],
    techApplied: ['Selenium WebDriver', 'JMeter Load Testing', 'SonarQube Standard QA', 'OWASP ZAP Security Check'],
    steps: [
      { title: 'Bước 1: Thiết lập kế hoạch giám sát', desc: 'Giám sát chi tiết quy trình viết mã nguồn, cài đặt môi trường và cấu hình máy chủ của nhà thầu.' },
      { title: 'Bước 2: Thiết kế Kịch bản kiểm thử', desc: 'Xây dựng bộ Test Case chi tiết bao gồm kiểm thử chức năng, phi chức năng, kiểm thử tải và bảo mật.' },
      { title: 'Bước 3: Thực thi Test độc lập', desc: 'Chạy các bài kiểm thử tự động (Automation) lẫn thủ công (Manual) trên hệ thống.' },
      { title: 'Bước 4: Báo cáo lỗi & Đánh giá nghiệm thu', desc: 'Phát hành danh sách lỗi (Bug list) và giám sát việc sửa lỗi cho đến khi hệ thống đạt độ tin cậy.' }
    ]
  },
  {
    id: 'quan-ly-du-an',
    numberCode: '05 / 05',
    title: 'Tư vấn Quản lý dự án',
    summary: 'Quản lý toàn diện tiến độ, chất lượng thi công lắp đặt, kiểm soát an toàn lao động, phòng chống cháy nổ cho các phòng server, trung tâm dữ liệu và văn phòng số.',
    benefits: [
      'Đại diện chủ đầu tư quản lý chất lượng thi công theo đúng cam kết',
      'Đảm bảo tuyệt đối an toàn vận hành, chống cháy nổ hệ thống cáp/điện',
      'Quản lý sát sao tiến độ giải ngân và bàn giao đưa tài sản vào sử dụng',
      'Giải quyết tranh chấp kỹ thuật giữa các bên liên kết'
    ],
    techApplied: ['Hệ thống quản lý chất lượng ISO 9001', 'Tiêu chuẩn TIA-942 Data Center', 'Tiêu chuẩn PCCC Việt Nam TCVN'],
    steps: [
      { title: 'Bước 1: Thiết lập cấu trúc quản lý', desc: 'Phân định vai trò, thành lập ban kiểm soát chất lượng và thiết lập kênh truyền thông dự án.' },
      { title: 'Bước 2: Giám sát thi công hàng ngày', desc: 'Theo dõi tiến độ lắp ráp tủ rack, hệ thống nguồn điện liên tục UPS, hệ thống làm mát chính xác và chữa cháy khí sạch FM200.' },
      { title: 'Bước 3: Kiểm soát an toàn lao động', desc: 'Áp dụng kỷ luật thi công khắt khe, kiểm thử định kỳ thiết bị hạ tầng điện lưới và hệ thống báo cháy.' },
      { title: 'Bước 4: Nghiệm thu hoàn công bàn giao', desc: 'Lập biên bản ghi nhận, tổng hợp hồ sơ thiết kế hoàn công và hướng dẫn chuyển giao công nghệ vận hành.' }
    ]
  }
];

export const PARTNERS_DATA: PartnerItem[] = [
  { name: 'Bộ Khoa học và Công nghệ', group: 'gov', logo: logoBoKhcn },
  { name: 'Bộ Giao thông Vận tải (Cục Đăng kiểm)', group: 'gov', logo: logoBoGiaothongvantai },
  { name: 'Bộ Giao thông Vận tải', group: 'gov', logo: logoBoGtvt },
  { name: 'Bộ Khoa học và Công nghệ (Văn phòng)', group: 'gov', logo: logoBoKhvacn },
  { name: 'Sở KH&CN Bắc Kạn', group: 'gov', logo: logoSokhcnbackan },
  { name: 'Sở TTTT Tuyên Quang', group: 'gov', logo: logoSotttttuyenquang },
  { name: 'Sở VHTT&DL Bắc Giang', group: 'gov', logo: logoSovhbacgiang },
  { name: 'Hiệp hội Bảo hiểm Việt Nam', group: 'finance', logo: logoHiephoibhvn },
  { name: 'Du lịch Ninh Bình', group: 'media', logo: logoDulichninhbinh },
  { name: 'Báo Ninh Bình', group: 'media', logo: logoNinhbinh },
  { name: 'Báo Nhân dân', group: 'media', logo: logoBaoNhanDan }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-gtvt-tthc',
    title: 'Tư vấn phần mềm — Xây dựng nền tảng hệ thống TTHC (Thủ tục hành chính)',
    client: 'Trung tâm Công nghệ thông tin – Bộ Giao thông Vận tải',
    category: 'gov',
    scope: 'Tư vấn xây dựng nền tảng hệ thống TTHC hợp nhất, tích hợp Cơ sở dữ liệu Quốc gia về dân cư và xác thực một lần (SSO) qua nền tảng liên thông LGSP.',
    value: '151.000.000 đồng (Một trăm năm mươi mốt triệu đồng chẵn)',
    techStack: ['Hợp nhất cổng DVC & MCĐT', 'Kho quản lý dữ liệu điện tử', 'Tích hợp Cơ sở dữ liệu Dân cư', 'Dịch vụ xác thực SSO & LGSP']
  },
  {
    id: 'project-khcn-kiemthu',
    title: 'Thuê dịch vụ kiểm thử phần mềm',
    client: 'Trung tâm Công nghệ thông tin – Bộ Khoa học và Công nghệ',
    category: 'gov',
    scope: 'Cung cấp dịch vụ kiểm thử độc lập chất lượng cao, rà soát lỗ hổng và kiểm duyệt quy trình kết nối Cơ sở dữ liệu Quốc gia về dân cư.',
    value: '368.000.000 đồng (Ba trăm sáu mươi tám triệu đồng chẵn)',
    techStack: ['Kiểm thử phần mềm độc lập', 'Kết nối Cơ sở dữ liệu Dân cư', 'Kiểm định chất lượng phần mềm', 'Security & Flow Verification']
  },
  {
    id: 'project-backan-truyxuat',
    title: 'Tư vấn lập đề cương và dự toán chi tiết nhiệm vụ “Xây dựng hệ thống truy xuất nguồn gốc sản phẩm hàng hóa trên địa bàn tỉnh Bắc Kạn”',
    client: 'Sở Khoa học và Công nghệ tỉnh Bắc Kạn',
    category: 'province',
    scope: 'Tư vấn lập đề cương kinh tế - kỹ thuật và lập dự toán chi tiết bám sát Nghị định 73/2019/NĐ-CP cho hệ thống truy xuất nguồn gốc cấp tỉnh.',
    packageValue: '4 tỷ đồng',
    value: '76.000.000 đồng (Bảy mươi sáu triệu đồng chẵn)',
    techStack: ['Lập đề cương kỹ thuật', 'Dự toán chi tiết gói thầu', 'Hệ thống truy xuất nguồn gốc', 'Nghị định 73/2019/NĐ-CP']
  },
  {
    id: 'project-tuyenquang-lgsp',
    title: 'Tư vấn lập đề cương và dự toán chi tiết nhiệm vụ “Nâng cấp và xây dựng bổ sung nền tảng chung tích hợp chia sẻ các hệ thống thông tin quy mô cấp tỉnh LGSP”',
    client: 'Sở Thông tin và Truyền thông tỉnh Tuyên Quang',
    category: 'province',
    scope: 'Lập đề cương kỹ thuật chuẩn định mức bám sát thông số LGSP và dự toán chi tiết phục vụ nâng cấp hệ thống liên thông tích hợp dữ liệu cấp tỉnh.',
    packageValue: '4.150.000.000 đồng',
    value: '66.000.000 đồng (Sáu mươi sáu triệu đồng chẵn)',
    techStack: ['Nâng cấp nền tảng LGSP', 'Tích hợp & Chia sẻ dữ liệu', 'Lập đề cương kỹ thuật', 'Lập dự toán chi tiết']
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-viettel',
    content: 'ITC là đối tác chiến lược sâu sắc trong việc hỗ trợ thẩm tra thiết kế và khảo sát hạ tầng của chúng tôi. Tính chính xác trong việc tính toán định mức kinh tế kỹ thuật của ITC đã bảo vệ lợi ích đầu tư cao nhất.',
    author: 'Nguyễn Tiến Dũng',
    position: 'Trưởng phòng Kế hoạch Đầu tư',
    company: 'Tổng Công ty Viettel Solutions',
    rating: 5
  },
  {
    id: 'test-vcb',
    content: 'Việc giám sát và thẩm định hồ sơ kỹ thuật văn phòng số được các chuyên gia ITC thực hiện một cách chuyên nghiệp, tốc độ phản hồi cực nhanh, giúp dự án rút ngắn 2 tháng tiến độ thi công.',
    author: 'Lê Hoàng Hải',
    position: 'Giám đốc Trung tâm Công nghệ thông tin',
    company: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
    rating: 5
  },
  {
    id: 'test-dangkiem',
    content: 'Từ khâu lập Đề cương nhiệm vụ đến thẩm định báo cáo khảo sát hệ thống phần mềm Phòng Chất lượng xe cơ giới, ITC luôn thể hiện tinh thần "Nhận thức từ tâm", tư vấn cực kỳ sát sao và chuẩn chỉ.',
    author: 'Đặng Minh Triết',
    position: 'Đại diện Ban CNTT - Khối Đăng kiểm Kỹ thuật',
    company: 'Cục Đăng kiểm Việt Nam',
    rating: 5
  }
];

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Search, 
  Layers, 
  Shield,
  Sparkles,
  CheckCircle2,
  Newspaper,
  Mail,
  Send,
  Award,
  Calendar,
  Briefcase,
  Lock,
  Clock,
  Cpu
} from 'lucide-react';
import { ActivePage, NewsItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA, PARTNERS_DATA } from '../data';

const projectImages: Record<string, string> = {
  'project-gtvt-tthc': 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800', 
  'project-khcn-kiemthu': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', 
  'project-backan-truyxuat': 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800', 
  'project-tuyenquang-lgsp': 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?q=80&w=800'  
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'gov':
      return 'Bộ ngành Trung ương';
    case 'province':
      return 'Sở / Tỉnh thành';
    default:
      return 'Dự án CNTT';
  }
};

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Shield':
      return Shield;
    case 'Lock':
      return Lock;
    case 'Layers':
      return Layers;
    case 'Clock':
      return Clock;
    case 'Cpu':
      return Cpu;
    case 'Briefcase':
      return Briefcase;
    case 'Award':
      return Award;
    default:
      return CheckCircle2;
  }
};

interface HomeProjectItem {
  id: string;
  category: string;
  client: string;
  verticalLabel: string;
  horizontalLabel: string;
  verticalTitle: string;
  horizontalTitle: string;
  scope: string;
  value: string;
  packageValue: string | null;
  features: { text: string; icon: string }[];
}

const HOME_PROJECTS: HomeProjectItem[] = [
  {
    id: 'project-gtvt-tthc',
    category: 'gov',
    client: 'Trung tâm Công nghệ thông tin – Bộ Giao thông Vận tải',
    verticalLabel: 'BỘ NGÀNH TW',
    horizontalLabel: 'BỘ NGÀNH TRUNG ƯƠNG',
    verticalTitle: 'Tư vấn phần mềm',
    horizontalTitle: 'Tư vấn phần mềm – Xây dựng nền tảng hệ thống TTHC (Thủ tục hành chính)',
    scope: 'Tư vấn xây dựng nền tảng hệ thống TTHC hợp nhất, tích hợp Cơ sở dữ liệu Quốc gia về dân cư và xác thực một lần (SSO) qua nền tảng liên thông LGSP.',
    value: '151.000.000 đồng',
    packageValue: null,
    features: [
      { text: 'Tích hợp CSDL Quốc gia về dân cư', icon: 'Shield' },
      { text: 'Xác thực một lần (SSO) tập trung', icon: 'Lock' },
      { text: 'Liên thông qua nền tảng LGSP', icon: 'Layers' }
    ]
  },
  {
    id: 'project-khcn-kiemthu',
    category: 'gov',
    client: 'Trung tâm Công nghệ thông tin – Bộ Khoa học và Công nghệ',
    verticalLabel: 'BỘ NGÀNH TW',
    horizontalLabel: 'BỘ NGÀNH TRUNG ƯƠNG',
    verticalTitle: 'Thuê dịch vụ kiểm thử',
    horizontalTitle: 'Thuê dịch vụ kiểm thử phần mềm',
    scope: 'Cung cấp dịch vụ kiểm thử độc lập chất lượng cao, rà soát lỗ hổng bảo mật và kiểm duyệt quy trình kết nối Cơ sở dữ liệu Quốc gia về dân cư.',
    value: '368.000.000 đồng',
    packageValue: null,
    features: [
      { text: 'Kiểm thử hiệu năng & Tải hệ thống', icon: 'Clock' },
      { text: 'Đánh giá an toàn thông tin (PenTest)', icon: 'Shield' },
      { text: 'Kiểm thử tự động & Tích hợp API', icon: 'Cpu' }
    ]
  },
  {
    id: 'project-backan-truyxuat',
    category: 'province',
    client: 'Sở Khoa học và Công nghệ tỉnh Bắc Kạn',
    verticalLabel: 'SỞ / TỈNH THÀNH',
    horizontalLabel: 'SỞ / TỈNH THÀNH',
    verticalTitle: 'Tư vấn lập đề cương',
    horizontalTitle: "Tư vấn lập đề cương và dự toán chi tiết nhiệm vụ 'Xây dựng hệ thống truy xuất nguồn gốc sản phẩm hàng hóa trên địa bàn tỉnh Bắc Kạn'",
    scope: 'Tư vấn lập đề cương kinh tế - kỹ thuật và lập dự toán chi tiết bám sát Nghị định 73/2019/NĐ-CP cho hệ thống truy xuất nguồn gốc cấp tỉnh.',
    value: '76.000.000 đồng',
    packageValue: '4 tỷ đồng',
    features: [
      { text: 'Đạt chuẩn Nghị định 73/2019/NĐ-CP', icon: 'Briefcase' },
      { text: 'Truy xuất nguồn gốc sản phẩm', icon: 'Award' },
      { text: 'Dự toán chi tiết định mức tối ưu', icon: 'Layers' }
    ]
  },
  {
    id: 'project-tuyenquang-lgsp',
    category: 'province',
    client: 'Sở Thông tin và Truyền thông tỉnh Tuyên Quang',
    verticalLabel: 'SỞ / TỈNH THÀNH',
    horizontalLabel: 'SỞ / TỈNH THÀNH',
    verticalTitle: 'Tư vấn lập đề cương',
    horizontalTitle: "Tư vấn lập đề cương và dự toán chi tiết nhiệm vụ 'Nâng cấp và xây dựng bổ sung nền tảng chung tích hợp chia sẻ các hệ thống thông tin quy mô cấp tỉnh LGSP'",
    scope: 'Lập đề cương kỹ thuật chuẩn định mức bám sát thông số LGSP và dự toán chi tiết phục vụ nâng cấp hệ thống liên thông tích hợp dữ liệu cấp tỉnh.',
    value: '66.000.000 đồng',
    packageValue: '4.150.000.000 đồng',
    features: [
      { text: 'Thiết kế kiến trúc LGSP cấp tỉnh', icon: 'Cpu' },
      { text: 'Tích hợp & chia sẻ dữ liệu liên thông', icon: 'Layers' },
      { text: 'Định mức kinh tế - kỹ thuật chuyên ngành', icon: 'Briefcase' }
    ]
  }
];

interface HomeProps {
  setActivePage: (page: ActivePage) => void;
  setSelectedNewsId: (id: number) => void;
}

export default function Home({ setActivePage, setSelectedNewsId }: HomeProps) {
  const [bannerUrl, setBannerUrl] = useState<string>('/uploads/banners/default-banner.png');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [dynamicNews, setDynamicNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Fetch Banner
    fetch('/api/banner')
      .then(res => res.json())
      .then(data => {
        if (data.image_url) {
          setBannerUrl(data.image_url);
        }
      })
      .catch(() => {
        // fallback to default
      });

    // Fetch News
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setDynamicNews(data || []);
      })
      .catch(() => {
        // fallback
      });
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-900 font-sans" id="home-view">
      
      {/* 1. FULL-WIDTH HERO BANNER - Immersive with dynamic image */}
      <section className="relative overflow-hidden bg-[#0B0F19]" id="hero-section">
        
        {/* Full-width banner image with Ken Burns effect */}
        <div className="absolute inset-0 z-0">
          <img
            src={bannerUrl}
            alt="ITC Technology Consulting - Hồ sơ năng lực công nghệ"
            className="h-full w-full object-cover animate-ken-burns"
          />
          {/* Dark gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/90 via-[#0B0F19]/70 to-[#0B0F19]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-[#0B0F19]/40" />
        </div>

        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-[1]" />

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-[-15%] left-[-10%] h-[40rem] w-[40rem] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none z-[1]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[30rem] w-[30rem] rounded-full bg-sky-500/8 blur-[110px] pointer-events-none z-[1]" />

        <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pt-16 pb-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28">
          <div className="max-w-2xl">
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-300 border border-blue-400/25 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>Đồng hành cùng chuyển đổi số - Kiến tạo giá trị - Nâng tầm tương lai</span>
              </div>
              
              <h1 className="font-display text-3xl sm:text-4xl lg:text-[3rem] font-extrabold tracking-tight text-white leading-tight space-y-1">
                <span className="text-sky-400 text-xs sm:text-sm tracking-[0.25em] font-sans block mb-2 font-bold uppercase">
                  ICT., JSC
                </span>
                <span className="block text-slate-100 font-extrabold">
                  Nhận thức từ tâm
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400 font-extrabold">
                  Nâng tầm tư vấn
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300 font-extrabold">
                  Vững bước thành công
                </span>
              </h1>
              
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Tổ chức tư vấn ủy thác CNTT độc lập hàng đầu Việt Nam. Chúng tôi đồng hành rà duyệt kỹ thuật khoa học, thẩm tra dự toán định mức chi tiết, bảo vệ dòng tài khóa và an tâm bảo mật tối đa cho các đại dự án Quốc gia.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => { setActivePage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-550 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all cursor-pointer"
                  id="hero-services-btn"
                >
                  <span>Khám phá dịch vụ</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                
                <button
                  onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="rounded-xl border border-slate-500/40 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-slate-400/50 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white hover:-translate-y-0.5 shadow-sm transition-all cursor-pointer"
                  id="hero-contact-btn"
                >
                  <span>Liên hệ tư vấn</span>
                </button>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom edge gradient fade - Soft transition to content */}
        
      </section>

      {/* 2. CORE SERVICES AREA - 3 Simple flat white columns with Minimalist Line Icons */}
      <section className="py-12 bg-gradient-to-b from-[#F8FAFC] via-white to-slate-50 relative overflow-hidden" id="core-services-section">
        {/* Soft background glow circles to soften the boundary */}
        <div className="absolute top-0 left-1/4 h-80 w-80 rounded-full bg-blue-50/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-sky-50/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          
          <motion.div 
            className="max-w-3xl text-left mb-12 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-sans">ITC Services</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-semibold">
              DỊCH VỤ CỐT LÕI
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="three-services-columns">
            
            {/* Column 1: Khảo sát & Quy hoạch */}
            <motion.div 
              className="rounded-xl border border-slate-200/80 bg-white p-8 hover:border-blue-600/30 transition-all flex flex-col justify-between group cursor-pointer shadow-3xs hover:shadow-md hover:-translate-y-1 duration-300"
              onClick={() => { setActivePage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              id="home-service-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="space-y-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Search className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">
                    Tư vấn Khảo sát &amp; Đề cương CNTT
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-550 leading-relaxed font-semibold">
                    Thẩm duyệt chi tiết hiện trạng số, thiết lập đề cương khảo sát khoa học theo quy chế ban hành của Bộ Thông tin & Truyền thông.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>Khám phá nhiệm vụ</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>

            {/* Column 2: Thiết kế & Khái toán */}
            <motion.div 
              className="rounded-xl border border-slate-200/80 bg-white p-8 hover:border-blue-500/30 transition-all flex flex-col justify-between group cursor-pointer shadow-3xs hover:shadow-md hover:-translate-y-1 duration-300"
              onClick={() => { setActivePage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              id="home-service-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="space-y-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                  <Layers className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-[#0F172A] group-hover:text-sky-600 transition-colors">
                    Thiết kế cơ sở &amp; Thẩm tra Dự toán
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-550 leading-relaxed font-semibold">
                    Xác lập tổng mức đầu tư, kiểm định chặt chẽ bảng báo giá vật tư và định mức nhân công chuẩn xác, phòng ngừa lãng phí tài khóa.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
                <span>Khám phá quy chuẩn</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>

            {/* Column 3: Giám sát & Kiểm thử */}
            <motion.div 
              className="rounded-xl border border-slate-200/80 bg-white p-8 hover:border-brand-navy/30 transition-all flex flex-col justify-between group cursor-pointer shadow-3xs hover:shadow-md hover:-translate-y-1 duration-300"
              onClick={() => { setActivePage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              id="home-service-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="space-y-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-[#0F172A] group-hover:text-indigo-600 transition-colors">
                    Giám sát độc lập &amp; Kiểm thử phần mềm
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-550 leading-relaxed font-semibold">
                    Đo kiểm độc lập, rà soát lỗ hổng bảo mật và giám sát thực thi của nhà thầu phát triển, tạo dựng niềm tin tuyệt đối trước kiểm toán.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                <span>Khám phá kiểm chuẩn</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 2.5 FEATURED PROJECTS SECTION - Expanding Hover Cards */}
      <section className="py-12 bg-white relative overflow-hidden" id="featured-projects-section">
        <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-blue-50/40 blur-3xl pointer-events-none" />
        
        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <motion.div 
            className="max-w-3xl text-left mb-12 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-sans">ITC Projects</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-semibold">
              DỰ ÁN NỔI BẬT
            </h2>
          </motion.div>

          <div 
            className="flex flex-row justify-center items-stretch gap-1 sm:gap-1.5 md:gap-2 w-full h-[480px] md:h-[510px]" 
            id="homepage-featured-projects-grid"
            onMouseLeave={() => setHoveredIndex(0)}
          >
            {HOME_PROJECTS.map((project, index) => {
              const imgUrl = projectImages[project.id] || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800';
              const isExpanded = hoveredIndex === index;
              
              const widthClass = isExpanded
                ? 'w-[55%] sm:w-[58%] md:w-[480px] lg:w-[550px] flex-grow'
                : 'w-[15%] sm:w-[14%] md:w-[100px] lg:w-[110px]';

              return (
                <motion.div
                  key={project.id}
                  className={`relative h-[480px] rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(203,213,225,0.08)] border border-transparent cursor-pointer flex flex-col justify-end bg-slate-950 transition-all duration-700 ease-out ${widthClass}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={(e) => {
                    if (hoveredIndex !== index) {
                      e.stopPropagation();
                      setHoveredIndex(index);
                    } else {
                      setActivePage('projects');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={imgUrl}
                      alt={project.horizontalTitle}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out"
                      style={{
                        transform: isExpanded ? 'scale(1.05)' : 'scale(1.0)',
                      }}
                    />
                    <div 
                      className={`absolute inset-0 transition-all duration-700 ${
                        isExpanded 
                          ? 'bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent opacity-95' 
                          : 'bg-slate-950/75'
                      }`} 
                    />
                  </div>

                  {/* 1. COMPRESSED VERTICAL STATE CONTAINER */}
                  <div 
                    className={`absolute inset-0 z-10 flex flex-col items-center justify-between py-6 px-1 text-center select-none pointer-events-none transition-all duration-500 ${
                      isExpanded ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100'
                    }`}
                  >
                    {/* Top: Category Icon */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
                        {React.createElement(getIconComponent(project.features[0]?.icon || 'Shield'), { className: 'h-4 w-4' })}
                      </div>
                      <span 
                        className="text-[8px] font-extrabold text-sky-400 tracking-widest uppercase whitespace-nowrap block"
                        style={{ writingMode: 'vertical-rl' }}
                      >
                        {project.verticalLabel}
                      </span>
                    </div>

                    {/* Middle/Bottom: Vertical condensed title */}
                    <div className="flex items-center justify-center flex-grow pt-4">
                      <h3 
                        className="text-[11px] sm:text-xs font-bold text-white/90 uppercase tracking-wider whitespace-nowrap rotate-180 font-sans"
                        style={{ writingMode: 'vertical-rl' }}
                      >
                        {project.verticalTitle}
                      </h3>
                    </div>
                  </div>

                  {/* 2. EXPANDED HORIZONTAL STATE CONTAINER */}
                  <div 
                    className={`relative z-10 p-6 md:p-8 flex flex-col justify-end h-full w-full transition-all duration-500 text-left ${
                      isExpanded 
                        ? 'opacity-100 scale-100 translate-y-0 duration-700 delay-100' 
                        : 'opacity-0 pointer-events-none translate-y-4'
                    }`}
                  >
                    {/* Category tag */}
                    <span className="self-start bg-blue-600/90 backdrop-blur-xs text-white font-sans text-[9px] font-bold uppercase tracking-wider rounded-full px-3 py-1 mb-3 shadow-md">
                      {project.horizontalLabel}
                    </span>

                    {/* Client Name */}
                    <span className="text-[10px] md:text-[11px] font-extrabold text-sky-400 font-sans tracking-widest block uppercase mb-1.5">
                      {project.client}
                    </span>

                    {/* Title */}
                    <h3 className="font-display text-base md:text-xl font-extrabold text-white leading-snug mb-3">
                      {project.horizontalTitle}
                    </h3>

                    {/* Scope description */}
                    <p className="text-xs md:text-sm text-slate-350 font-medium leading-relaxed max-w-2xl mb-4">
                      {project.scope}
                    </p>

                    {/* Features checklist with individual icons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-2xl border-t border-white/10 pt-4 mb-4">
                      {project.features.map((feat, fIdx) => {
                        const Icon = getIconComponent(feat.icon);
                        return (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-200">
                            <div className="p-1 rounded bg-blue-500/20 text-sky-300 flex-shrink-0">
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <span className="font-semibold">{feat.text}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Value Metrics and Action Link */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-4 mt-2">
                      <div className="flex gap-5 text-[11px] md:text-xs">
                        {project.packageValue && (
                          <div className="flex flex-col">
                            <span className="text-slate-500 font-semibold uppercase tracking-wider text-[9px]">Quy mô gói:</span>
                            <span className="text-slate-200 font-bold text-sm mt-0.5">{project.packageValue}</span>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-slate-500 font-semibold uppercase tracking-wider text-[9px]">Thực hiện:</span>
                          <span className="text-sky-300 font-bold text-sm mt-0.5">{project.value}</span>
                        </div>
                      </div>

                      {/* Visual Hover arrow */}
                      <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400 group/link cursor-pointer hover:text-sky-300 transition-colors self-end sm:self-center">
                        <span>Xem hồ sơ chi tiết</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PARTNERS MARQUEE SLIDESHOW */}
      <section className="py-12 bg-white border-y border-slate-100 overflow-hidden relative" id="partners-slideshow-section">
        {/* Soft side gradient shields to mask cutoffs */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="text-center mb-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 font-sans block mb-1">ITC Network</span>
          <h3 className="font-display text-xl font-bold text-slate-800">
            MẠNG LƯỚI KHÁCH HÀNG &amp; ĐỐI TÁC
          </h3>
        </div>

        {/* Sliding horizontal track - slowed down to animate-scroll-left-very-slow */}
        <div className="flex overflow-hidden whitespace-nowrap py-8">
          <div className="flex animate-scroll-left-very-slow hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {/* Double the list to make the loop seamless */}
            {[...PARTNERS_DATA, ...PARTNERS_DATA, ...PARTNERS_DATA].map((partner, index) => {
              return (
                <div
                  key={index}
                  className="group inline-flex items-center justify-center bg-white border border-slate-100/80 w-64 h-32 px-6 py-5 rounded-3xl mx-4 shadow-[0_4px_12px_rgba(241,245,249,0.5)] hover:border-blue-500/20 hover:shadow-md transition-all duration-300 cursor-pointer"
                  title={partner.name}
                >
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="font-sans text-sm font-bold text-slate-700 text-center line-clamp-2 whitespace-normal leading-snug">
                      {partner.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. NEWS GRID - Full Width */}
      <section className="py-12 bg-gradient-to-b from-[#F8FAFC] to-slate-50 relative overflow-hidden" id="news-section">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[35rem] w-[35rem] rounded-full bg-blue-500/3 blur-[120px] pointer-events-none" />
        
        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* News Grid (spans full-width: lg:col-span-12) */}
            <div className="lg:col-span-12 flex flex-col justify-between">
              <div className="text-center mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 font-sans block mb-1">ITC News</span>
                <h3 className="font-display text-xl font-bold text-slate-800">
                  TIN TỨC &amp; SỰ KIỆN
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dynamicNews.length > 0 ? (
                  dynamicNews.slice(0, 4).map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => {
                        setSelectedNewsId(item.id);
                        setActivePage('news-detail');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-3xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group cursor-pointer"
                    >
                      <div className="h-44 overflow-hidden relative bg-slate-100">
                        <img 
                          src={item.image_path} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold font-sans">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>
                              {new Date(item.created_at).toLocaleDateString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-semibold font-sans">
                            {item.summary}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-blue-600 mt-auto">
                          <span>Tìm hiểu ngay</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    {/* News Card 1 */}
                    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-3xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                      <div className="h-44 overflow-hidden relative bg-slate-100">
                        <img 
                          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600" 
                          alt="Kiểm định số" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold font-sans">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>10/06/2026</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            ITC hỗ trợ Cục Đăng kiểm Việt Nam tối ưu hóa quy trình kiểm định số
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-semibold font-sans">
                            Giám sát chất lượng và kiểm thử độc lập nền tảng tích hợp dịch vụ hành chính công liên kết Cơ sở dữ liệu Quốc gia.
                          </p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-blue-600 mt-auto">
                          <span>Tìm hiểu ngay</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>

                    {/* News Card 2 */}
                    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-3xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                      <div className="h-44 overflow-hidden relative bg-slate-100">
                        <img 
                          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600" 
                          alt="Định mức CNTT" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold font-sans">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>05/06/2026</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            Định mức kinh tế kỹ thuật trong lập dự toán CNTT theo Nghị định 73
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-semibold font-sans">
                            Phân tích quy trình thẩm tra dự toán chi tiết giúp tối ưu hóa ngân sách và tránh rủi ro tài khóa cho chủ đầu tư.
                          </p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-blue-600 mt-auto">
                          <span>Tìm hiểu ngay</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>

                    {/* News Card 3 */}
                    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-3xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                      <div className="h-44 overflow-hidden relative bg-slate-100">
                        <img 
                          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600" 
                          alt="Phòng Server" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold font-sans">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>28/05/2026</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            Quy chuẩn an toàn thông tin TIA-942 cho Trung tâm dữ liệu hiện đại
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-semibold font-sans">
                            Quy trình khảo sát, thiết kế và giám sát lắp đặt hạ tầng mạng máy chủ đạt tiêu chuẩn bảo mật dữ liệu cấp cao.
                          </p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-blue-600 mt-auto">
                          <span>Tìm hiểu ngay</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>

                    {/* News Card 4 */}
                    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-3xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                      <div className="h-44 overflow-hidden relative bg-slate-100">
                        <img 
                          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600" 
                          alt="Đội ngũ kỹ thuật" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold font-sans">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>20/05/2026</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            ITC tổ chức khóa tập huấn nâng cao năng lực giám sát CNTT cho đối tác
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-semibold font-sans">
                            Chương trình đào tạo chuyên sâu về quy trình kiểm thử hệ thống và đánh giá rủi ro an toàn thông tin theo chuẩn quốc tế.
                          </p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-blue-600 mt-auto">
                          <span>Tìm hiểu ngay</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. TRUST BANNER - Action Philosophy moved to the very bottom */}
      <section className="pt-12 py-24 bg-gradient-to-b from-[#FAFAF9] to-white relative overflow-hidden border-t border-slate-100" id="trust-banner-section">
        {/* Soft background radial mask */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.02),transparent_70%)] pointer-events-none" />

        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 text-center relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-sans font-bold tracking-widest text-slate-500 uppercase">&bull; TRIẾT LÝ HÀNH ĐỘNG CỦA ITC</span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A] leading-snug">
              "Nhận thức từ tâm — Nâng tầm tư vấn — Vững bước thành công"
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold font-sans">
              Ký thác niềm tin từ Bộ Giao thông Vận tải, Cục Đăng kiểm, và các top-tier ngân hàng lớn. ITC sẵn sàng thực thi độc lập nhiệm vụ giám sát khắt khe, minh bạch chất lượng và bảo hộ dòng đầu tư.
            </p>
            <div className="pt-4">
              <button
                onClick={() => { setActivePage('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 group text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <span>Xem hồ sơ đối tác khách hàng</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}


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
  Cpu,
  Target,
  Lightbulb,
  Handshake,
  Calculator,
  ClipboardList,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ActivePage, NewsItem, PartnerItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA, PARTNERS_DATA } from '../data';
import { fetchWithSWR, getCachedData } from '../utils/apiCache';

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
    case 'Search':
      return Search;
    case 'Layers':
      return Layers;
    case 'Shield':
    case 'ShieldCheck':
      return Shield;
    case 'Briefcase':
      return Briefcase;
    case 'Cpu':
      return Cpu;
    case 'Lock':
      return Lock;
    case 'Clock':
      return Clock;
    case 'Award':
      return Award;
    case 'Calculator':
      return Calculator;
    case 'ClipboardList':
      return ClipboardList;
    case 'Eye':
      return Eye;
    default:
      return Layers;
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
  image_path?: string;
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

interface SloganItem {
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
}

const SLOGANS_DATA: SloganItem[] = [
  {
    title: 'TẬN TÂM',
    desc: 'Đặt lợi ích của khách hàng làm trọng tâm trong mọi sản phẩm và dịch vụ',
    icon: Target
  },
  {
    title: 'SÁNG TẠO',
    desc: 'Liên tục đổi mới, ứng dụng công nghệ tiên tiến để tạo ra giá trị khác biệt',
    icon: Lightbulb
  },
  {
    title: 'CHUYÊN NGHIỆP',
    desc: 'Đội ngũ chuyên gia giàu kinh nghiệm, triển khai dự án với chất lượng và hiệu quả cao',
    icon: Shield
  },
  {
    title: 'ĐỒNG HÀNH',
    desc: 'Luôn đồng hành cùng khách hàng trong hành trình chuyển đổi số bền vững',
    icon: Handshake
  }
];

interface HomeProps {
  setActivePage: (page: ActivePage) => void;
  setSelectedNewsId: (id: number) => void;
}

export default function Home({ setActivePage, setSelectedNewsId }: HomeProps) {
  // Helper mapping functions
  const mapProjectsData = (data: any) => {
    if (Array.isArray(data) && data.length > 0) {
      return data.slice(0, 4).map((p: any) => ({
        id: p.id,
        category: p.category,
        client: p.client,
        verticalLabel: getCategoryLabel(p.category).toUpperCase(),
        horizontalLabel: getCategoryLabel(p.category).toUpperCase(),
        verticalTitle: p.title.length > 30 ? p.title.substring(0, 30) + '...' : p.title,
        horizontalTitle: p.title,
        scope: p.scope,
        value: p.value || 'Liên hệ',
        packageValue: p.packageValue || null,
        features: (p.details || []).slice(0, 3).map((d: string) => ({ text: d, icon: 'CheckCircle2' })),
        image_path: p.image_path
      }));
    }
    return HOME_PROJECTS;
  };

  const mapServicesData = (data: any) => {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        summary: item.summary,
        icon: item.icon,
        colorTheme: item.colorTheme || item.color_theme || 'blue',
        image_path: item.image_path || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800'
      }));
    }
    return [];
  };

  const mapPartnersData = (data: any) => {
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return PARTNERS_DATA;
  };

  // State initialization with cached data (for 0ms delay)
  const cachedBanner = getCachedData('/api/banner');
  const [bannerUrl, setBannerUrl] = useState<string>(cachedBanner?.image_url || '/uploads/banners/default-banner.png');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  
  const cachedNews = getCachedData('/api/news');
  const [dynamicNews, setDynamicNews] = useState<NewsItem[]>(cachedNews || []);
  
  const cachedPartners = getCachedData('/api/partners');
  const [partners, setPartners] = useState<PartnerItem[]>(mapPartnersData(cachedPartners));
  
  const cachedProjects = getCachedData('/api/projects');
  const [projects, setProjects] = useState<HomeProjectItem[]>(mapProjectsData(cachedProjects));
  
  const cachedServices = getCachedData('/api/services');
  const [homeServices, setHomeServices] = useState<any[]>(mapServicesData(cachedServices));

  // Slideshow States for Services
  const [currentServiceIndex, setCurrentServiceIndex] = useState<number>(0);
  const [itemsPerView, setItemsPerView] = useState<number>(3);
  const [isServicesHovered, setIsServicesHovered] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextService = () => {
    setCurrentServiceIndex((prev) => {
      const maxIndex = Math.max(0, homeServices.length - itemsPerView);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevService = () => {
    setCurrentServiceIndex((prev) => {
      const maxIndex = Math.max(0, homeServices.length - itemsPerView);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  // Autoplay Effect
  useEffect(() => {
    if (isServicesHovered || homeServices.length === 0) return;
    const interval = setInterval(() => {
      nextService();
    }, 5000);
    return () => clearInterval(interval);
  }, [itemsPerView, homeServices.length, isServicesHovered]);

  useEffect(() => {
    // Revalidate Banner in background
    fetchWithSWR('/api/banner', (data) => {
      if (data?.image_url) {
        setBannerUrl(data.image_url);
      }
    }).catch(() => {});

    // Revalidate News in background
    fetchWithSWR('/api/news', (data) => {
      setDynamicNews(data || []);
    }).catch(() => {});

    // Revalidate Partners in background
    fetchWithSWR('/api/partners', (data) => {
      setPartners(mapPartnersData(data));
    }).catch(() => {});

    // Revalidate Projects in background
    fetchWithSWR('/api/projects', (data) => {
      setProjects(mapProjectsData(data));
    }).catch(() => {});

    // Revalidate Services in background
    fetchWithSWR('/api/services', (data) => {
      setHomeServices(mapServicesData(data));
    }).catch(() => {});
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-900 font-sans" id="home-view">
      
      {/* 1. FULL-WIDTH HERO BANNER - Immersive with dynamic image */}
      <section className="relative overflow-hidden bg-[#0B0F19] min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] xl:min-h-[82vh] flex items-center" id="hero-section">
        
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

        <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-12 md:py-16 lg:py-20 w-full">
          <div className="max-w-3xl">
            
            <motion.div 
              className="space-y-4"
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-5 select-none max-w-xl md:max-w-3xl">
                {SLOGANS_DATA.map((slogan, index) => {
                  const Icon = slogan.icon;
                  // 2D diagonal staircase translations for a 2-column layout
                  const staggerClasses = [
                    'translate-x-0',
                    'md:translate-x-4',
                    'md:translate-x-8',
                    'md:translate-x-12'
                  ];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                      className={`flex items-start gap-3 p-3 rounded-xl bg-slate-900/40 backdrop-blur-md border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:bg-slate-800/50 hover:border-blue-500/30 hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300 ${staggerClasses[index] || ''}`}
                    >
                      {/* Hexagon Icon Wrapper */}
                      <div className="relative flex items-center justify-center w-11 h-11 shrink-0 text-sky-400">
                        <svg className="absolute inset-0 w-full h-full text-blue-500/20 group-hover:text-blue-400/40 transition-colors" viewBox="0 0 100 100" fill="currentColor">
                          <polygon points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5" stroke="currentColor" strokeWidth="2" fill="rgba(59, 130, 246, 0.08)" />
                        </svg>
                        <Icon className="h-4.5 w-4.5 relative z-10 text-sky-400" />
                      </div>
                      
                      {/* Text content */}
                      <div className="space-y-0.5">
                        <h4 className="text-sky-400 font-extrabold text-xs sm:text-sm tracking-wider uppercase">
                          {slogan.title}
                        </h4>
                        <p className="text-slate-200 text-[11px] sm:text-xs leading-relaxed font-sans font-medium">
                          {slogan.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
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

          {homeServices.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-sans font-medium bg-white rounded-xl border border-slate-100 shadow-3xs">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-3"></div>
              <span>Đang tải danh sách dịch vụ từ cơ sở dữ liệu...</span>
            </div>
          ) : (
            <div 
              className="relative px-2 sm:px-4" 
              id="services-slideshow-container"
              onMouseEnter={() => setIsServicesHovered(true)}
              onMouseLeave={() => setIsServicesHovered(false)}
            >
              {/* Navigation buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-4 lg:-left-8 z-20">
                <button
                  onClick={prevService}
                  className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white text-slate-800 border border-slate-200 shadow-md hover:bg-blue-600 hover:text-white hover:border-blue-600 active:scale-95 transition-all duration-300 cursor-pointer"
                  aria-label="Previous service"
                >
                  <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
                </button>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-4 lg:-right-8 z-20">
                <button
                  onClick={nextService}
                  className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white text-slate-800 border border-slate-200 shadow-md hover:bg-blue-600 hover:text-white hover:border-blue-600 active:scale-95 transition-all duration-300 cursor-pointer"
                  aria-label="Next service"
                >
                  <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
                </button>
              </div>

              {/* Slider viewable window */}
              <div className="overflow-hidden py-4 -mx-4 px-4">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ 
                    transform: `translateX(-${currentServiceIndex * (100 / homeServices.length)}%)`,
                    width: `${(homeServices.length / itemsPerView) * 100}%` 
                  }}
                >
                  {homeServices.map((service, index) => {
                    const ServiceIcon = getIconComponent(service.icon);
                    
                    const themeColor = 
                      service.colorTheme === 'blue' ? 'text-blue-600 bg-blue-50 border-blue-100 hover:text-blue-700' :
                      service.colorTheme === 'sky' ? 'text-sky-600 bg-sky-50 border-sky-100 hover:text-sky-700' :
                      service.colorTheme === 'emerald' ? 'text-emerald-600 bg-emerald-50 border-emerald-100 hover:text-emerald-700' :
                      service.colorTheme === 'indigo' ? 'text-indigo-600 bg-indigo-50 border-indigo-100 hover:text-indigo-700' :
                      service.colorTheme === 'rose' ? 'text-rose-600 bg-rose-50 border-rose-100 hover:text-rose-700' :
                      'text-amber-600 bg-amber-50 border-amber-100 hover:text-amber-700';

                    const linkColor = 
                      service.colorTheme === 'blue' ? 'text-blue-600' :
                      service.colorTheme === 'sky' ? 'text-sky-600' :
                      service.colorTheme === 'emerald' ? 'text-emerald-600' :
                      service.colorTheme === 'indigo' ? 'text-indigo-600' :
                      service.colorTheme === 'rose' ? 'text-rose-600' :
                      'text-amber-600';

                    const hoverBorderColor = 
                      service.colorTheme === 'blue' ? 'hover:border-blue-600/30' :
                      service.colorTheme === 'sky' ? 'hover:border-sky-500/30' :
                      service.colorTheme === 'emerald' ? 'hover:border-emerald-500/30' :
                      service.colorTheme === 'indigo' ? 'hover:border-indigo-550/30' :
                      service.colorTheme === 'rose' ? 'hover:border-rose-500/30' :
                      'hover:border-amber-500/30';

                    const itemWidthPercent = 100 / homeServices.length;

                    return (
                      <div 
                        key={service.id} 
                        style={{ width: `${itemWidthPercent}%` }}
                        className="px-4 shrink-0"
                      >
                        <motion.div 
                          className={`rounded-xl border border-slate-200/80 bg-white overflow-hidden ${hoverBorderColor} transition-all flex flex-col justify-between group cursor-pointer shadow-3xs hover:shadow-md hover:-translate-y-1 duration-300 h-full`}
                          onClick={() => { setActivePage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          id={`home-service-${index + 1}`}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: (index % itemsPerView) * 0.1 }}
                        >
                          <div className="flex flex-col h-full justify-between">
                            {/* Service Image above information */}
                            {service.image_path && (
                              <div className="w-full h-48 overflow-hidden relative bg-slate-100 flex-shrink-0">
                                <img 
                                  src={service.image_path} 
                                  alt={service.title} 
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                            )}
                            
                            <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <h3 className="font-display text-xl font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5rem] flex items-center">
                                    {service.title}
                                  </h3>
                                  <p className="text-xs sm:text-sm text-slate-555 leading-relaxed font-semibold line-clamp-3 min-h-[4.5rem]">
                                    {service.summary}
                                  </p>
                                </div>
                              </div>
                              
                              <div className={`pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold ${linkColor}`}>
                                <div className="flex items-center gap-2">
                                  <ServiceIcon className="h-4 w-4 shrink-0" />
                                  <span>Tìm hiểu thêm</span>
                                </div>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pagination Indicators (Dots) */}
              <div className="flex justify-center items-center gap-2 mt-8">
                {Array.from({ length: Math.max(1, homeServices.length - itemsPerView + 1) }).map((_, idx) => {
                  const isActive = currentServiceIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentServiceIndex(idx)}
                      className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                        isActive ? 'bg-blue-600 w-6' : 'bg-slate-350 w-2 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          )}

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
            {projects.map((project, index) => {
              const imgUrl = (project as any).image_path || projectImages[project.id] || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800';
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
                    <p className="text-xs md:text-sm text-white text-slate-350 font-medium leading-relaxed max-w-2xl mb-4">
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

        <div className="text-center mb-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-sans block">ITC Network</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-semibold">
            MẠNG LƯỚI KHÁCH HÀNG &amp; ĐỐI TÁC
          </h2>
        </div>

        {/* Sliding horizontal track - slowed down to animate-scroll-left-very-slow */}
        <div className="flex overflow-hidden whitespace-nowrap py-8">
          <div className="flex animate-scroll-left-very-slow hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {/* Double the list to make the loop seamless */}
            {[...partners, ...partners, ...partners].map((partner, index) => {
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
              <div className="text-center mb-10 space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-sans block">ITC News</span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-semibold">
                  TIN TỨC &amp; SỰ KIỆN
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {dynamicNews.length > 0 ? (
                  dynamicNews.slice(0, 3).map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => {
                        setSelectedNewsId(item.id);
                        setActivePage('news-detail');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white rounded-xl border border-slate-200/80 hover:border-blue-600/30 overflow-hidden shadow-3xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group cursor-pointer"
                    >
                      <div className="w-full h-48 overflow-hidden relative bg-slate-100 flex-shrink-0">
                        <img 
                          src={item.image_path} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold font-sans">
                            <Calendar className="h-4 w-4 text-blue-600 shrink-0" />
                            <span>
                              {new Date(item.created_at).toLocaleDateString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-display text-xl font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                              {item.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-555 line-clamp-3 leading-relaxed font-semibold font-sans">
                              {item.summary}
                            </p>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 mt-auto">
                          <span>Tìm hiểu ngay</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-1 md:col-span-3 flex items-center justify-center py-20 bg-white rounded-xl border border-slate-100 shadow-3xs">
                    <span className="text-sm font-semibold text-slate-500 flex items-center gap-3">
                      <span className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                      Đang tải tin tức...
                    </span>
                  </div>
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
            <span className="text-xs font-sans font-bold text-[#0F172A] tracking-widest text-slate-500 uppercase"> TRIẾT LÝ HÀNH ĐỘNG CỦA ITC</span>
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


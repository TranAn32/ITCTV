import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Layers, 
  Calculator, 
  ClipboardList, 
  ShieldCheck, 
  Eye, 
  Briefcase, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Zap,
  Check,
  Award,
  BookOpen,
  ArrowUpRight,
  Globe,
  Cpu,
  TrendingUp
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { ActivePage } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesProps {
  setActivePage: (page: ActivePage) => void;
}

export default function Services({ setActivePage }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<string>('khao-sat-cntt');
  const [connectorPath, setConnectorPath] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Exact 7 services from user requirements with precise details as fallback
  const fallbackServices = [
    {
      id: 'khao-sat-cntt',
      title: 'Tư vấn khảo sát dự án Công nghệ thông tin',
      shortTitle: 'Tư vấn khảo sát',
      summary: 'Khảo sát và đánh giá thực tế một cách độc lập, chi tiết, tạo cơ sở dữ liệu xác thực cho toàn bộ các bước triển khai kỹ thuật tiếp theo.',
      icon: 'Search',
      tag: 'Chuẩn bị đầu tư',
      colorTheme: 'blue',
      image_path: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
      items: [
        { text: 'Khảo sát đánh giá hiện trạng và các kế hoạch ứng dụng công nghệ thông tin phục vụ các hoạt động của tổ chức.' },
        { text: 'Khảo sát số liệu hiện trạng hồ sơ của Đơn vị phục vụ cho việc lập dự án đầu tư/ đề cương dự toán chi tiết.' },
        { text: 'Lập Nhiệm vụ khảo sát pháp lý chuẩn chỉnh (nếu có yêu cầu từ phía Chủ đầu tư).' },
        { text: 'Xây dựng Báo cáo kết quả khảo sát bảo đảm khoa học, chuẩn xác theo quy định hiện hành.' }
      ]
    },
    {
      id: 'lap-du-an-khao-thi',
      title: 'Tư vấn lập dự án / báo cáo nghiên cứu khả thi / thiết kế thi công / đề cương dự toán chi tiết',
      shortTitle: 'Lập báo cáo khả thi',
      summary: 'Đồng hành xây dựng các hồ sơ quy hoạch, dự thảo giải pháp công nghệ kỹ lưỡng tạo bệ phóng an toàn nâng cao hiệu suất thầu.',
      icon: 'Layers',
      tag: 'Lập & Hoạch định',
      colorTheme: 'sky',
      image_path: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
      items: [
        { text: 'Đánh giá hiện trạng hạ tầng và chứng minh, luận chứng sự cần thiết phải tiến hành đầu tư.' },
        { text: 'Xác định rõ ràng mục tiêu, quy mô và phạm vi đầu tư tối ưu nhất cho phía Chủ đầu tư.' },
        { text: 'Phân tích kỹ lưỡng các phương án công nghệ và lựa chọn giải pháp kỹ thuật phù hợp nhất.' },
        { text: 'Phân tích hiệu quả đầu tư dự án (hiệu quả tài chính, hiệu quả kinh tế - xã hội, hiệu quả nghiệp vụ).' },
        { text: 'Lập Thiết kế sơ bộ ban đầu trực quan, đồng bộ và đạt chuẩn kiểm duyệt.' },
        { text: 'Lập Tổng mức đầu tư dự toán tài chính chuẩn xác theo đơn giá thị trường.' }
      ]
    },
    {
      id: 'thiet-ke-tong-du-toan',
      title: 'Tư vấn lập Thiết kế thi công và Tổng dự toán',
      shortTitle: 'Thiết kế thi công',
      summary: 'Nghiên cứu tài liệu khảo sát, khảo sát bổ sung và chuẩn hóa chi tiết từng bản vẽ thi công kèm dự tính kinh tế chuẩn tắc.',
      icon: 'Calculator',
      tag: 'Kỹ thuật chuyên sâu',
      colorTheme: 'emerald',
      image_path: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
      items: [
        { text: 'Nghiên cứu kỹ lưỡng các tài liệu pháp lý đã có của dự án trong giai đoạn chuẩn bị đầu tư.' },
        { text: 'Nghiên cứu Thiết kế sơ bộ của dự án đã được phê duyệt làm cơ sở định hướng thiết kế.' },
        { text: 'Tiến hành khảo sát đo kiểm bổ sung thực tế tại hiện trường để đảm bảo độ chính xác tuyệt đối.' },
        { text: 'Lập Thiết kế thi công bám sát chính xác theo Thiết kế sơ bộ đã được cấp có thẩm quyền phê duyệt.' },
        { text: 'Nghiên cứu các nội dung chi phí liên quan đến Thiết kế thi công, từ đó xác định chuẩn xác Tổng dự toán của Dự án.' },
        { text: 'Hoàn thiện hồ sơ Thiết kế thi công và tổng dự toán của Dự án chuẩn chỉ đủ năng lực trình duyệt.' }
      ]
    },
    {
      id: 'de-cuong-du-toan-chi-tiet',
      title: 'Tư vấn lập Đề cương và dự toán chi tiết',
      shortTitle: 'Lập Đề cương chi tiết',
      summary: 'Hiệu chỉnh nội dung chi tiêu ứng dụng CNTT đảm bảo thiết thực, chuẩn mực, tiết kiệm ngân sách và đủ thuyết minh định mức.',
      icon: 'ClipboardList',
      tag: 'Tối ưu ngân sách',
      colorTheme: 'blue',
      image_path: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800',
      items: [
        { text: 'Bảo đảm phù hợp hoàn toàn với yêu cầu triển khai hoạt động ứng dụng công nghệ thông tin đã được phê duyệt.' },
        { text: 'Bảo đảm tuân thủ các quy chuẩn, tiêu chuẩn kỹ thuật công nghệ thông tin áp dụng đối với nội dung chi nêu trong đề cương.' },
        { text: 'Bảo đảm thuyết minh của đề cương và dự toán chi tiết rõ ràng, minh bạch, làm rõ được các số liệu biểu mẫu tính toán.' }
      ]
    },
    {
      id: 'tham-tra-du-an',
      title: 'Tư vấn Thẩm tra độc lập',
      shortTitle: 'Phản biện & Thẩm tra',
      summary: 'Hội đồng chuyên môn phản biện độc lập độc vị rủi ro dự toán, quy chuẩn chất lượng, kết cấu hệ thống trước cấp có thẩm quyền phê duyệt.',
      icon: 'ShieldCheck',
      tag: 'Bảo chứng pháp lý',
      colorTheme: 'indigo',
      image_path: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800',
      items: [
        { text: 'Thẩm tra Báo cáo nghiên cứu khả thi dự án CNTT (bóc tách tính hợp lý của công nghệ, kiến trúc và giải pháp đề xuất).' },
        { text: 'Thẩm tra Thiết kế thi công và tổng dự toán (rà soát tính chính xác của khối lượng, định mức kinh tế kỹ thuật áp dụng).' }
      ]
    },
    {
      id: 'giam-sat-kiem-thu',
      title: 'Tư vấn giám sát / kiểm thử các dự án CNTT',
      shortTitle: 'Giám sát & Kiểm thử',
      summary: 'Bảo chứng chất lượng thi công, hỗ trợ tháo gỡ điểm nghẽn và kiểm định phần mềm một cách hoàn toàn khách quan, minh bạch.',
      icon: 'Eye',
      tag: 'Kiểm soát chất lượng',
      colorTheme: 'rose',
      image_path: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=800',
      items: [
        { text: 'Hỗ trợ chủ đầu tư quản lý dự án CNTT toàn diện trong suốt quá trình triển khai thầu thực địa.' },
        { text: 'Giám sát chặt chẽ việc tuân thủ và đáp ứng các yêu cầu chất lượng, tiến độ và kỹ thuật của nhà cung cấp.' },
        { text: 'Thực hiện kiểm thử các phần mềm độc lập, khách quan: Kiểm thử chức năng, kiểm thử hiệu năng, cấu trúc...' }
      ]
    },
    {
      id: 'quan-ly-du-an-cntt',
      title: 'Tư vấn quản lý dự án CNTT',
      shortTitle: 'Quản lý dự án',
      summary: 'Quản trị đồng bộ chất lượng, tiến độ thực địa và kiểm soát nghiêm ngặt các rủi ro vận hành lắp đặt.',
      icon: 'Briefcase',
      tag: 'Quản trị rủi ro',
      colorTheme: 'amber',
      image_path: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800',
      items: [
        { text: 'Quản lý chất lượng công tác khảo sát thực tế chuyên môn.' },
        { text: 'Quản lý chất lượng hồ sơ thiết kế thi công công nghệ.' },
        { text: 'Quản lý giám sát chất lượng trong quá trình thi công xây dựng ứng dụng.' },
        { text: 'Quản lý an toàn lao động, phòng chống cháy nổ tối ưu tại các hạng mục phòng máy chủ/Server trung tâm.' }
      ]
    }
  ];

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
          setActiveTab(data[0].id);
        } else {
          setServices(fallbackServices);
          setActiveTab('khao-sat-cntt');
        }
      })
      .catch(err => {
        console.error('Lỗi khi tải dịch vụ:', err);
        setServices(fallbackServices);
        setActiveTab('khao-sat-cntt');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading || services.length === 0) return;
    let active = true;
    const updateConnector = () => {
      if (!active) return;
      const parentEl = document.getElementById('services-checkerboard-interactive');
      const tabEl = document.getElementById(`side-item-${activeTab}`);
      const frameEl = document.getElementById('services-viewer-frame');
      const cardEl = document.getElementById(`active-pane-${activeTab}`);
      
      if (parentEl && tabEl && frameEl) {
        const parentRect = parentEl.getBoundingClientRect();
        const tabRect = tabEl.getBoundingClientRect();
        const frameRect = frameEl.getBoundingClientRect();
        const cardRect = cardEl ? cardEl.getBoundingClientRect() : frameRect;
        
        // Compute relative positions inside the parent grid layout
        const x1 = tabRect.right - parentRect.left;
        const y1 = tabRect.top - parentRect.top + tabRect.height / 2;
        
        // Target frame boundary horizontally, and active card top boundary vertically
        const x2 = frameRect.left - parentRect.left;
        const y2 = cardRect.top - parentRect.top + 46; 
        
        setConnectorPath({ x1, y1, x2, y2 });
      }
    };

    // Run measurement inside requestAnimationFrame for stable paint alignment
    const frameHandle = requestAnimationFrame(updateConnector);
    
    // Multiple timeouts to handle layout changes during slide transition
    const t1 = setTimeout(updateConnector, 50);
    const t2 = setTimeout(updateConnector, 150);
    const t3 = setTimeout(updateConnector, 300);
    const t4 = setTimeout(updateConnector, 500);
    
    window.addEventListener('resize', updateConnector);
    return () => {
      active = false;
      cancelAnimationFrame(frameHandle);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('resize', updateConnector);
    };
  }, [activeTab, loading, services]);

  if (loading) {
    return (
      <div className="relative pt-10 pb-16 md:pt-12 md:pb-20 bg-[#FDFDFD] min-h-screen font-sans flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent"></div>
          <span className="text-sm font-medium text-slate-500 font-sans">Đang tải danh sách dịch vụ...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pt-10 pb-16 md:pt-12 md:pb-20 bg-[#FDFDFD] min-h-screen font-sans overflow-hidden flex flex-col justify-between" id="services-view">
      
      {/* Background Soft Natural Gradients */}
      <div className="absolute top-0 right-0 h-[30rem] w-[30rem] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-[30rem] w-[30rem] rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 space-y-12">
        
        {/* Top Header - Compact, modern, high-contrast */}
        <div className="max-w-3xl space-y-3.5 text-left" id="services-page-header">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2563eb] font-sans bg-blue-50/80 border border-blue-100/50 rounded px-3.5 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
            <span>Năng lực độc lập &amp; Am hiểu quy chuẩn thầu</span>
          </span>
          <h1 className="font-display text-4xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] uppercase leading-tight">
            DỊCH VỤ CỐT LÕI
          </h1>
          <p className="text-sm text-slate-500 max-w-3xl leading-relaxed font-medium">
            ITC hân hạnh mang tới gói tư vấn thiết lập hồ sơ độc lập, bảo vệ tối đa lợi ích kinh tế &amp; tính tương thích hạ tầng của Chủ đầu tư qua sơ đồ dịch vụ xen kẽ hiện đại.
          </p>
        </div>

        {/* Dynamic top bento banner grid summarizing core features */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl p-6 shadow-md shadow-blue-600/10 text-white" id="services-top-banner">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 lg:divide-x divide-white/20">
            {/* Item 1 */}
            <div className="flex items-center gap-4 px-4 py-2 sm:py-0">
              <Globe className="h-9 w-9 text-blue-200 shrink-0" />
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white leading-tight">Tư vấn chiến lược</div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white leading-tight">Chuyển đổi số</div>
              </div>
            </div>
            {/* Item 2 */}
            <div className="flex items-center gap-4 px-4 py-2 sm:py-0">
              <Cpu className="h-9 w-9 text-blue-200 shrink-0" />
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white leading-tight">Giải pháp CNTT</div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white leading-tight">Toàn diện</div>
              </div>
            </div>
            {/* Item 3 */}
            <div className="flex items-center gap-4 px-4 py-2 sm:py-0">
              <ShieldCheck className="h-9 w-9 text-blue-200 shrink-0" />
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white leading-tight">An toàn - Bảo mật</div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white leading-tight">Thông tin</div>
              </div>
            </div>
            {/* Item 4 */}
            <div className="flex items-center gap-4 px-4 py-2 sm:py-0">
              <TrendingUp className="h-9 w-9 text-blue-200 shrink-0" />
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white leading-tight">Hiệu quả - Bền vững</div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white leading-tight">Đồng hành phát triển</div>
              </div>
            </div>
          </div>
        </div>

        {/* 
          ELEGANT INTERACTIVE SCREEN WORKSPACE (Xen kẽ trên 1 màn hình)
          Left Side: Alternating beautiful menu options.
          Right Side: Dynamically loaded details panel with staggered design.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative" id="services-checkerboard-interactive">
          {/* Static right-angled (orthogonal) connector wire with clear endpoints */}
          {connectorPath && (
            <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-20">
              <defs>
                <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <path
                d={`M ${connectorPath.x1} ${connectorPath.y1} H ${connectorPath.x1 + (connectorPath.x2 - connectorPath.x1) * 0.45} V ${connectorPath.y2} H ${connectorPath.x2}`}
                fill="none"
                stroke="url(#connectorGradient)"
                strokeWidth="2"
              />
            </svg>
          )}
          
          {/* LEFT PANEL: The Alternating Menu Blocks (Grid layout, very lively styled) */}
          <div className="lg:col-span-4 flex flex-col gap-3" id="services-side-accordion">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans mb-1 pl-2">
              Danh mục nhóm dịch vụ
            </div>
            
            {services.map((service, idx) => {
              const ServiceIcon = (LucideIcons as any)[service.icon] || LucideIcons.Layers;
              const isActive = activeTab === service.id;
              
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-300 flex items-start gap-4 cursor-pointer relative group select-none ${
                    isActive 
                      ? 'bg-white border-blue-600 shadow-[0_4px_15px_rgba(37,99,235,0.05)] scale-[1.01]' 
                      : 'bg-white/70 hover:bg-white border-slate-200/60 shadow-3xs'
                  }`}
                  id={`side-item-${service.id}`}
                >
                  {/* Glowing starting dot on the right-center edge of the active tab */}
                  {isActive && (
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white ring-4 ring-blue-500/20 translate-x-1.25 z-25 pointer-events-none" />
                  )}

                  {/* Clean vertical left indicator stripe */}
                  {isActive && (
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-blue-600" />
                  )}

                  {/* Duotone Glowing Icon Container */}
                  <div className={`p-2.5 rounded-lg shrink-0 transition-all duration-300 group-hover:scale-105 ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 border border-blue-100/30' 
                      : 'bg-slate-100/70 text-slate-500'
                  }`}>
                    <ServiceIcon className="h-5 w-5 stroke-[1.8]" />
                  </div>

                  <div className="space-y-1 pr-6 flex-grow">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                        isActive 
                          ? 'bg-blue-500/10 text-blue-800 border border-blue-200/30' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {service.tag}
                      </span>
                      <span className="font-mono text-xs text-slate-400 font-bold tracking-wider">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className={`text-xs sm:text-sm font-bold leading-snug font-sans transition-colors ${
                      isActive ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                    }`}>
                      {service.shortTitle}
                    </h3>
                  </div>

                  {/* Elegant floating arrow link */}
                  <div className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                    isActive ? 'opacity-100 translate-x-0 text-blue-600' : 'opacity-0 -translate-x-2'
                  }`}>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT PANEL: Loaded content styled super premium with alternating/staggered block layouts */}
          <div className="lg:col-span-8 flex flex-col justify-between" id="services-viewer-frame">
            <AnimatePresence mode="wait">
              {services.map((service, idx) => {
                if (service.id !== activeTab) return null;
                
                // Color mapping logic for premium bespoke feel per service
                const bubbleColor = 
                  service.colorTheme === 'blue' ? 'bg-blue-50/70 border-blue-100/60 text-blue-800' :
                  service.colorTheme === 'sky' ? 'bg-sky-50/70 border-sky-100/60 text-sky-850' :
                  service.colorTheme === 'emerald' ? 'bg-emerald-50/70 border-emerald-100/60 text-emerald-850' :
                  service.colorTheme === 'indigo' ? 'bg-indigo-50/70 border-indigo-100/60 text-indigo-850' :
                  service.colorTheme === 'rose' ? 'bg-rose-50/70 border-rose-100/60 text-rose-850' :
                  'bg-amber-50/70 border-amber-100/60 text-amber-850';

                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-lg p-6 sm:p-8 border border-blue-500 shadow-[0_10px_35px_-10px_rgba(37,99,235,0.06)] flex flex-col justify-between h-full min-h-[460px] relative overflow-hidden"
                    id={`active-pane-${service.id}`}
                  >
                    {/* Connection receiving dot on the left edge, 40px from the top */}
                    <div className="hidden lg:block absolute left-0 top-[40px] w-3 h-3 rounded-full bg-blue-600 border-2 border-white ring-4 ring-blue-500/20 -translate-x-1.5 z-20 pointer-events-none" />

                    {/* Background faint card watermark matching active menu item index */}
                    <div className="absolute -bottom-6 -right-6 font-mono text-[9rem] font-bold text-slate-100/70 select-none pointer-events-none">
                      {idx + 1}
                    </div>

                    <div className="space-y-6 relative z-10">
                      
                      {/* Active Service Image banner */}
                      {service.image_path && (
                        <div className="w-full h-48 sm:h-60 rounded-lg overflow-hidden relative mb-6 border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex-shrink-0">
                          <img 
                            src={service.image_path} 
                            alt={service.title} 
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                          />
                        </div>
                      )}
                      
                      {/* Top Header Row */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded border ${bubbleColor}`}>
                            {service.tag}
                          </span>
                          <span className="text-[10px] font-bold uppercase text-slate-400 font-sans tracking-wide">
                            Quy chuẩn quốc gia
                          </span>
                        </div>
                        
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                          {service.title}
                        </h2>
                      </div>

                      {/* Callout box summary */}
                      <div className="p-4 rounded-lg bg-blue-50/40 border-l-4 border-blue-600 font-sans text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                        {service.summary}
                      </div>

                      {/* STAGGERED CHECKLIST items - shown with alternating layouts */}
                      <div className="space-y-2 pt-2">
                        <h4 className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#2563eb]">
                          Nội dung phụng sự chi tiết:
                        </h4>
                        
                        <div className="grid grid-cols-1 gap-1">
                          {service.items.map((item: any, itemIdx: number) => (
                            <div 
                              key={itemIdx}
                              className="flex items-start gap-3 py-2 transition-all duration-300 text-left"
                            >
                              <div className="h-5 w-5 rounded shrink-0 flex items-center justify-center text-blue-600 bg-blue-50">
                                <ChevronRight className="h-3.5 w-3.5 stroke-[2.5]" />
                              </div>
                              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed font-sans">
                                {item.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Bottom action panel with direct connection to contact page */}
                    <div className="pt-4 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                      <div className="flex items-center gap-2">
                        <Award className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                        <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wider">
                          Độc lập • Minh bạch • Chuẩn chỉ
                        </span>
                      </div>
                      
                      <button
                        onClick={() => {
                          setActivePage('contact');
                          setTimeout(() => {
                            const element = document.getElementById('contact-form-section');
                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                          }, 150);
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-3 transition-all cursor-pointer shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 duration-300 transform hover:-translate-y-0.5"
                      >
                        <span>Yêu cầu tư vấn này</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>



      </div>
    </div>
  );
}

import React, { useState } from 'react';
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
  ArrowUpRight
} from 'lucide-react';
import { ActivePage } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesProps {
  setActivePage: (page: ActivePage) => void;
}

export default function Services({ setActivePage }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<string>('khao-sat-cntt');

  // Exact 7 services from user requirements with precise details
  const servicesList = [
    {
      id: 'khao-sat-cntt',
      title: 'Tư vấn khảo sát dự án Công nghệ thông tin',
      shortTitle: 'Tư vấn khảo sát',
      summary: 'Khảo sát và đánh giá thực tế một cách độc lập, chi tiết, tạo cơ sở dữ liệu xác thực cho toàn bộ các bước triển khai kỹ thuật tiếp theo.',
      icon: Search,
      tag: 'Chuẩn bị đầu tư',
      colorTheme: 'blue',
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
      icon: Layers,
      tag: 'Lập & Hoạch định',
      colorTheme: 'sky',
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
      icon: Calculator,
      tag: 'Kỹ thuật chuyên sâu',
      colorTheme: 'emerald',
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
      icon: ClipboardList,
      tag: 'Tối ưu ngân sách',
      colorTheme: 'blue',
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
      icon: ShieldCheck,
      tag: 'Bảo chứng pháp lý',
      colorTheme: 'indigo',
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
      icon: Eye,
      tag: 'Kiểm soát chất lượng',
      colorTheme: 'rose',
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
      icon: Briefcase,
      tag: 'Quản trị rủi ro',
      colorTheme: 'amber',
      items: [
        { text: 'Quản lý chất lượng công tác khảo sát thực tế chuyên môn.' },
        { text: 'Quản lý chất lượng hồ sơ thiết kế thi công công nghệ.' },
        { text: 'Quản lý giám sát chất lượng trong quá trình thi công xây dựng ứng dụng.' },
        { text: 'Quản lý an toàn lao động, phòng chống cháy nổ tối ưu tại các hạng mục phòng máy chủ/Server trung tâm.' }
      ]
    }
  ];

  return (
    <div className="relative pt-10 pb-16 md:pt-12 md:pb-20 bg-[#FAFAF9] min-h-screen font-sans overflow-hidden flex flex-col justify-between" id="services-view">
      
      {/* Background Soft Gradients */}
      <div className="absolute top-0 right-0 h-[30rem] w-[30rem] rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-[30rem] w-[30rem] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 space-y-12">
        
        {/* Top Header - Compact, modern, high-contrast */}
        <div className="max-w-3xl space-y-3 text-left" id="services-page-header">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2563eb] font-sans bg-blue-50 border border-blue-100/50 rounded-full px-3 py-1">
            <Sparkles className="h-3 w-3 text-blue-600 animate-pulse" />
            <span>Năng lực độc lập &amp; Am hiểu quy chuẩn thầu</span>
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Giải pháp &amp; Dịch vụ Cốt lõi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-normal font-medium">
            ITC hân hạnh mang tới gói tư vấn thiết lập hồ sơ độc lập, bảo vệ tối đa lợi ích kinh tế &amp; tính tương thích hạ tầng của Chủ đầu tư qua sơ đồ dịch vụ xen kẽ hiện đại.
          </p>
        </div>

        {/* 
          ELEGANT INTERACTIVE SCREEN WORKSPACE (Xen kẽ trên 1 màn hình)
          Left Side: Alternating beautiful menu options.
          Right Side: Dynamically loaded details panel with staggered design.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="services-checkerboard-interactive">
          
          {/* LEFT PANEL: The Alternating Menu Blocks (Grid layout, very lively styled) */}
          <div className="lg:col-span-5 flex flex-col gap-3.5" id="services-side-accordion">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans mb-1 pl-2">
              Danh mục nhóm dịch vụ
            </div>
            
            {servicesList.map((service, idx) => {
              const ServiceIcon = service.icon;
              const isActive = activeTab === service.id;
              
              // Alternating color highlights based on state and index
              const borderAccentClass = idx % 2 === 0 ? 'border-l-4 border-l-blue-600' : 'border-l-4 border-l-sky-500';
              
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden group select-none ${
                    isActive 
                      ? 'bg-white border-blue-600 shadow-[0_10px_30px_rgba(15,118,110,0.06)] scale-[1.01]' 
                      : 'bg-white/70 hover:bg-white border-slate-100 hover:border-slate-200 shadow-3xs'
                  }`}
                  id={`side-item-${service.id}`}
                >
                  {/* Subtle alternating status layout inside menu */}
                  <div className={`p-2.5 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : idx % 2 === 0 ? 'bg-slate-50 text-slate-500' : 'bg-[#FAF9F6] text-slate-500'
                  }`}>
                    <ServiceIcon className="h-5 w-5 stroke-[1.8]" />
                  </div>

                  <div className="space-y-1 pr-6">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isActive 
                          ? 'bg-blue-100/50 text-blue-800' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {service.tag}
                      </span>
                      <span className="font-sans text-[11px] text-slate-400 font-bold">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className={`text-xs font-bold leading-snug font-sans transition-colors ${
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

                  {/* Alternating left focus indicators */}
                  {isActive && (
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT PANEL: Loaded content styled super premium with alternating/staggered block layouts */}
          <div className="lg:col-span-7 flex flex-col justify-between" id="services-viewer-frame">
            <AnimatePresence mode="wait">
              {servicesList.map((service, idx) => {
                if (service.id !== activeTab) return null;
                const ServiceIcon = service.icon;
                
                // Color mapping logic for premium bespoke feel per service
                const bubbleColor = 
                  service.colorTheme === 'blue' ? 'bg-blue-50/70 border-blue-100/60 text-blue-800' :
                  service.colorTheme === 'sky' ? 'bg-sky-50/70 border-sky-100/60 text-sky-850' :
                  service.colorTheme === 'emerald' ? 'bg-emerald-50/70 border-emerald-100/60 text-emerald-850' :
                  service.colorTheme === 'blue' ? 'bg-blue-50/70 border-blue-100/60 text-blue-850' :
                  service.colorTheme === 'indigo' ? 'bg-indigo-50/70 border-indigo-100/60 text-indigo-850' :
                  service.colorTheme === 'rose' ? 'bg-rose-50/70 border-rose-100/60 text-rose-850' :
                  'bg-amber-50/70 border-amber-100/60 text-amber-850';

                const badgeBg = 
                  service.colorTheme === 'blue' ? 'bg-blue-600' :
                  service.colorTheme === 'sky' ? 'bg-sky-500' :
                  service.colorTheme === 'emerald' ? 'bg-emerald-600' :
                  service.colorTheme === 'blue' ? 'bg-blue-600' :
                  service.colorTheme === 'indigo' ? 'bg-indigo-600' :
                  service.colorTheme === 'rose' ? 'bg-rose-500' :
                  'bg-amber-500';

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_20px_50px_rgba(203,213,225,0.18)] flex flex-col justify-between h-full min-h-[460px] relative overflow-hidden"
                    id={`active-pane-${service.id}`}
                  >
                    {/* Background faint card watermark matching active menu item index */}
                    <div className="absolute -bottom-6 -right-6 font-mono text-[9rem] font-black text-slate-50 select-none pointer-events-none">
                      {idx + 1}
                    </div>

                    <div className="space-y-6 relative z-10">
                      
                      {/* Top Header Row */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${bubbleColor}`}>
                            {service.tag}
                          </span>
                          <span className="text-[10px] font-bold uppercase text-slate-400 font-sans">
                            Quy chuẩn quốc gia
                          </span>
                        </div>
                        
                        <h2 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                          {service.title}
                        </h2>
                      </div>

                      {/* Brief introduction card - styled like an alternating highlighted quotes space */}
                      <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 font-sans text-xs sm:text-sm text-slate-600 leading-relaxed italic font-medium">
                        &quot;{service.summary}&quot;
                      </div>

                      {/* STAGGERED CHECKLIST items - shown with alternating layouts */}
                      <div className="space-y-3 pt-2">
                        <h4 className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#2563eb]">
                          Nội dung phụng sự chi tiết:
                        </h4>
                        
                        <div className="grid grid-cols-1 gap-3">
                          {service.items.map((item, itemIdx) => (
                            <div 
                              key={itemIdx}
                              className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-300 ${
                                itemIdx % 2 === 0 
                                  ? 'bg-white border border-slate-50 shadow-3xs' 
                                  : 'bg-[#FAF9F6]/50 border border-transparent'
                              }`}
                            >
                              <div className={`h-5 w-5 rounded-md shrink-0 flex items-center justify-center text-white ${badgeBg}`}>
                                <Check className="h-3 w-3 stroke-[3]" />
                              </div>
                              <p className="text-xs text-slate-700 font-medium leading-relaxed font-sans">
                                {item.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Bottom action panel with direct connection to contact page */}
                    <div className="pt-6 mt-6 border-t border-slate-100/70 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-blue-600 shrink-0" />
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
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold uppercase tracking-wider px-4.5 py-2.5 transition-colors cursor-pointer shadow-3xs"
                      >
                        <span>Yêu cầu tư vấn này</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>

        {/* Dynamic bottom bento badge grid summarizing quality metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="services-bottom-bento-metrics">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-3xs flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Cam Kết Chất Lượng</h4>
              <p className="text-[10px] text-slate-450">Bám sát 100% Nghị định số 73/2019/NĐ-CP</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-3xs flex items-center gap-3">
            <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Tối Ưu Ngân Sách</h4>
              <p className="text-[10px] text-slate-450">Thẩm tra bóc tách dự toán kỹ lưỡng, tiết kiệm</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-3xs flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <Zap className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Tốc Độ Phản Hồi</h4>
              <p className="text-[10px] text-slate-450">Bàn giao hồ sơ sơ bộ trong vòng 48h làm việc</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

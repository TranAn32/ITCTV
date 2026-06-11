import React, { useState } from 'react';
import { 
  Briefcase, 
  Layers, 
  FolderGit2, 
  Compass, 
  Landmark, 
  Database, 
  Cpu, 
  Sparkles,
  Award,
  ChevronRight,
  Handshake,
  CheckCircle2
} from 'lucide-react';
import { PROJECTS_DATA, PARTNERS_DATA } from '../data';
import { motion } from 'motion/react';

export default function Projects() {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tất cả dự án' },
    { id: 'gov', label: 'Bộ ngành Trung ương' },
    { id: 'province', label: 'Tỉnh thành địa phương' }
  ];

  const filteredProjects = filterCategory === 'all' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === filterCategory);

  // Sector icon selector for partners
  const getSectorIcon = (group: string) => {
    switch (group) {
      case 'gov':
        return Landmark;
      case 'finance':
        return Database;
      default:
        return Cpu;
    }
  };

  const getGroupLabel = (group: string) => {
    switch (group) {
      case 'gov':
        return 'Cơ quan Bộ Ngành';
      case 'finance':
        return 'Tài chính & Giáo dục';
      default:
        return 'Truyền thông & Công nghệ';
    }
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

  // High-performance technology & IT systems image mapping
  const projectImages: Record<string, string> = {
    'project-gtvt-tthc': 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800', 
    'project-khcn-kiemthu': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', 
    'project-backan-truyxuat': 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800', 
    'project-tuyenquang-lgsp': 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?q=80&w=800'  
  };

  const defaultImg = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800';

  return (
    <div className="relative pt-12 pb-20 bg-[#FAFAF9] min-h-screen font-sans overflow-hidden" id="projects-view">
      
      {/* Decorative Natural Glows */}
      <div className="absolute top-24 left-12 h-[35rem] w-[35rem] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-32 right-12 h-[35rem] w-[35rem] rounded-full bg-slate-500/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* ======================================= */}
        {/* SECTION 1: Page Header with Natural Accent Badge */}
        {/* ======================================= */}
        <div className="max-w-3xl mb-24 space-y-5 text-left animate-fade-in" id="projects-page-header">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#2563eb] font-sans bg-blue-50/80 border border-blue-100/50 rounded-full px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
            <span>Kỷ yếu thành tựu ủy thác &amp; Liên minh</span>
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
            Dự án tiêu biểu &amp; Đối tác
          </h1>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-sans font-medium max-w-3xl">
            Cuốn kỷ yếu ghi nhận các dự án thực chứng tiêu biểu được ITC rà duyệt, lập Đề cương Kinh tế Kỹ thuật và rà rêu cấu hình an toàn hệ thống cho các Bộ ban ngành, ngân hàng TMCP hàng đầu Việt Nam.
          </p>
        </div>

        {/* ======================================= */}
        {/* SECTION 2: Filterable Project Portfolios */}
        {/* ======================================= */}
        <div className="space-y-12" id="portfolio-yearbook-section">
          
          {/* Subtle natural categories bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <h2 className="text-xs font-bold font-sans text-slate-400 uppercase tracking-widest">
                Kỷ yếu dịch thạc
              </h2>
              <p className="text-lg font-bold text-slate-800">
                Các dự án thực thi tiêu biểu
              </p>
            </div>

            {/* Filter buttons without harsh frames */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-250 cursor-pointer ${
                    filterCategory === cat.id
                      ? 'bg-[#2563eb] text-white shadow-sm shadow-blue-900/10'
                      : 'bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vertical Stack of Beautiful soft-rounded projects cards */}
          <div className="space-y-12 sm:space-y-16" id="projects-yearbook-stack">
            {filteredProjects.map((project, idx) => {
              const imgUrl = projectImages[project.id] || defaultImg;
              
              return (
                <div 
                  key={project.id}
                  className="bg-white rounded-[2.2rem] overflow-hidden shadow-[0_15px_50px_rgba(203,213,225,0.18)] grid grid-cols-1 md:grid-cols-12 gap-0 relative"
                  id={`project-yearbook-row-${project.id}`}
                >
                  
                  {/* Left side: Pure realistic image with organic rounded edges internally */}
                  <div className="md:col-span-5 h-[260px] md:h-full relative bg-slate-50">
                    <img
                      src={imgUrl}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale-[0.05]"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Sage Green/Navy Category pill overlay */}
                    <span className="absolute top-5 left-5 bg-slate-900/75 backdrop-blur-md text-white font-sans text-[10px] font-bold uppercase tracking-widest rounded-full px-3.5 py-1.5 shadow-sm">
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>

                  {/* Right side: Handcrafted client detail column with plenty of blank space */}
                  <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-8">
                    
                    <div className="space-y-5">
                      {/* Sub-Header info */}
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 font-sans">
                        <div className="h-2 w-2 rounded-full bg-sky-500" />
                        <span>Chủ đầu tư:</span>
                        <span className="text-[#2563eb] font-bold">{project.client}</span>
                      </div>

                      {/* Main Title */}
                      <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                        {project.title}
                      </h3>

                      {/* ITC's Role (Clean and un-framed) */}
                      <div className="pt-2 space-y-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-sans block">
                          Tên hạng mục dịch vụ:
                        </span>
                        <p className="text-sm text-slate-700 leading-relaxed font-sans font-semibold">
                          {project.scope}
                        </p>
                      </div>

                      {/* Budget values */}
                      {(project.value || project.packageValue) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/80 p-4.5 rounded-2xl border border-slate-100 text-xs">
                          {project.packageValue && (
                            <div className="space-y-0.5">
                              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] font-sans block">Giá trị dự toán gói thầu:</span>
                              <span className="text-slate-800 font-bold text-xs sm:text-sm">{project.packageValue}</span>
                            </div>
                          )}
                          {project.value && (
                            <div className="space-y-0.5">
                              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] font-sans block">Giá trị thực hiện:</span>
                              <span className="text-[#2563eb] font-extrabold text-xs sm:text-sm">{project.value}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Detailed work bullets */}
                      {project.details && project.details.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-sans block">
                            Nội dung công việc chi tiết:
                          </span>
                          <ul className="space-y-2">
                            {project.details.map((detail, dIdx) => (
                              <li key={dIdx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600 font-medium font-sans leading-relaxed">
                                <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================= */}
        {/* SECTION 3: Strategic Partners Wall (Grayscale with Soft Hover) */}
        {/* ======================================= */}
        <div className="mt-32 pt-24 border-t border-slate-100 space-y-10" id="strategic-partners-grid-block">
          
          <div className="max-w-2xl text-left space-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb] font-sans bg-blue-50/80 px-3 py-1 rounded-full border border-blue-100/50">
              Mạng lưới tháp tùng
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              ĐỐI TÁC - KHÁCH HÀNG
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Đối tác uỷ thác và tiếp nhận rà soát hồ sơ từ các cơ quan đầu bộ, giáo dục và tổ chức kỹ nghệ liên thông.
            </p>
          </div>

          {/* Spacious partners layout using plain white cards and soft color transitions */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" id="partners-minimal-logos-grid">
            {PARTNERS_DATA.map((partner, index) => {
              const PartnerIcon = getSectorIcon(partner.group);
              
              return (
                <div
                  key={index}
                  className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-[0_5px_15px_rgba(203,213,225,0.08)] transition-all duration-300 filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 hover:shadow-md group cursor-default"
                  id={`partner-card-${index}`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-50">
                    <span className="text-[9px] font-sans font-bold text-slate-350 tracking-wider">
                      ITC-PARTNER
                    </span>
                    <PartnerIcon className="h-4.5 w-4.5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </div>
                  
                  <div className="pt-4 space-y-1">
                    <h3 className="font-sans text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0F172A] transition-colors leading-relaxed">
                      {partner.name}
                    </h3>
                    <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider font-sans">
                      {getGroupLabel(partner.group)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

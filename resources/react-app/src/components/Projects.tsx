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
  Handshake
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
    <div className="relative pt-8 pb-20 bg-[#FDFDFD] min-h-screen font-sans overflow-hidden" id="projects-view">
      
      {/* Decorative Natural Glows */}
      <div className="absolute top-24 left-12 h-[35rem] w-[35rem] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-32 right-12 h-[35rem] w-[35rem] rounded-full bg-slate-500/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* ======================================= */}
        {/* SECTION 1: Page Header with Natural Accent Badge */}
        {/* ======================================= */}
        <div className="max-w-3xl mb-5 space-y-5 text-left animate-fade-in" id="projects-page-header">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#2563eb] font-sans bg-blue-50/80 border border-blue-100/50 rounded px-2 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
            <span>Liên Minh Đối Tác & Dấu Ấn Dự Án</span>
          </span>
          <h1 className="font-display text-4xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            DỰ ÁN TIÊU BIỂU
          </h1>
        </div>

        {/* ======================================= */}
        {/* SECTION 2: Filterable Project Portfolios */}
        {/* ======================================= */}
        <div className="space-y-12" id="portfolio-yearbook-section">
          
          {/* Subtle natural categories bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
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
                  className={`px-4 py-2 text-xs font-bold rounded transition-all duration-250 cursor-pointer ${
                    filterCategory === cat.id
                      ? 'bg-[#2563eb] text-white shadow-sm shadow-blue-900/10'
                      : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/60'
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
                  className="group bg-white rounded-lg overflow-hidden border border-slate-200/60 shadow-[0_4px_25px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)] hover:border-slate-300/80 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-0 relative animate-fade-in"
                  id={`project-yearbook-row-${project.id}`}
                >
                  
                  {/* Left side: Pure realistic image with clean transition */}
                  <div className="md:col-span-5 h-[260px] md:h-full relative overflow-hidden bg-slate-50 border-r border-slate-100">
                    <img
                      src={imgUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] grayscale-[0.05]"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Sage Green/Navy Category pill overlay */}
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-slate-800 font-sans text-[10px] font-bold uppercase tracking-widest rounded border border-slate-200/60 px-3 py-1 shadow-sm">
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>

                  {/* Right side: Handcrafted client detail column with plenty of blank space */}
                  <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                    
                    <div className="space-y-5">
                      {/* Sub-Header info */}
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 font-sans uppercase tracking-wider">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                        <span>Chủ đầu tư:</span>
                        <span className="text-[#2563eb] font-extrabold">{project.client}</span>
                      </div>

                      {/* Main Title */}
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>

                      {/* ITC's Role (Clean and un-framed) */}
                      <div className="pt-1 space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-sans block">
                          Tên hạng mục dịch vụ:
                        </span>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans font-semibold">
                          {project.scope}
                        </p>
                      </div>

                      {/* Budget values - Minimalist Separator style */}
                      {(project.value || project.packageValue) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-b border-slate-200/60 py-4 text-xs font-sans">
                          {project.packageValue && (
                            <div className="space-y-1">
                              <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Giá trị dự toán gói thầu:</span>
                              <span className="text-slate-800 font-bold text-sm">{project.packageValue}</span>
                            </div>
                          )}
                          {project.value && (
                            <div className="space-y-1">
                              <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Giá trị thực hiện:</span>
                              <span className="text-[#2563eb] font-extrabold text-sm">{project.value}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Detailed work bullets */}
                      {project.details && project.details.length > 0 && (
                        <div className="space-y-2.5 pt-1">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-sans block">
                            Nội dung công việc chi tiết:
                          </span>
                          <ul className="space-y-2">
                            {project.details.map((detail, dIdx) => (
                              <li key={dIdx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600 font-medium font-sans leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-350 shrink-0 mt-2 transition-colors group-hover:bg-blue-600" />
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
        <div className="mt-32 pt-20 border-t border-slate-100 space-y-10" id="strategic-partners-grid-block">
          
          <div className="max-w-2xl text-left space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb] font-sans bg-blue-50/80 px-3.5 py-1 rounded border border-blue-100/50">
              Mạng lưới Network
            </span>
            <h2 className="mt-5 font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
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
                  className="flex flex-col items-center justify-center rounded bg-white p-5 h-36 border border-slate-200/60 shadow-[0_2px_10px_rgba(15,23,42,0.02)] transition-all duration-300 group cursor-default hover:border-blue-500/20 hover:shadow-md"
                  id={`partner-card-${index}`}
                  title={partner.name}
                >
                  <div className="w-full h-16 flex items-center justify-center mb-2.5">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <PartnerIcon className="h-8 w-8 text-slate-300 group-hover:text-blue-600 transition-colors" />
                    )}
                  </div>
                  
                  <div className="text-center space-y-0.5 w-full">
                    <h3 className="font-sans text-[11px] font-bold text-slate-650 group-hover:text-slate-900 transition-colors leading-tight truncate px-1">
                      {partner.name}
                    </h3>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider font-sans">
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

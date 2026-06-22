import { 
  Landmark, 
  Mail, 
  PhoneCall, 
  MapPin, 
  ShieldAlert, 
  Award, 
  Globe, 
  Building2, 
  FileText,
  DollarSign,
  UserCheck,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { ActivePage } from '../types';
import ItcLogo from './ItcLogo';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0F172A] via-[#0B1329] to-[#020617] text-slate-300 pt-16 pb-10 border-t border-slate-800/60 font-sans overflow-hidden" id="app-footer">
      
      {/* Visual Top Highlight Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/40 to-transparent pointer-events-none" />

      {/* Premium dark indigo/sky/violet glowing backdrop accents */}
      <div className="absolute top-0 left-1/4 h-[350px] w-[350px] rounded-full bg-sky-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/8 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[150px] pointer-events-none" />

      {/* Modern High-Tech SVG Grid & Connected Nodes Overlay */}
      <div className="absolute inset-0 opacity-[0.18] mix-blend-screen pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#6366F1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Geometric Grid Gridlines */}
          <pattern id="footer-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
          
          {/* Tech Data Pathways */}
          <path d="M-100 120 Q 250 40, 500 220 T 1100 160 T 1700 300 T 2300 140" fill="none" stroke="url(#grid-grad)" strokeWidth="1.5" />
          <path d="M-50 280 Q 400 180, 800 100 T 1450 350 T 2100 220" fill="none" stroke="url(#grid-grad)" strokeWidth="1" strokeDasharray="8,6" />
          
          {/* Glowing Network Nodes */}
          <circle cx="500" cy="220" r="4.5" fill="#38BDF8" className="animate-pulse" />
          <circle cx="1100" cy="160" r="3.5" fill="#6366F1" className="animate-pulse" />
          <circle cx="1700" cy="300" r="5" fill="#34D399" className="animate-pulse" />
          <circle cx="800" cy="100" r="4" fill="#38BDF8" className="animate-pulse" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Top bar: Dynamic Corporate Vision and Logo */}
        <div className="border-b border-slate-800/60 pb-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6" id="footer-vision-bar">
          <div className="space-y-3 max-w-4xl">
            <div className="flex items-center gap-2.5">
              <ItcLogo size={42} showText={false} />
              <h3 className="font-display text-xl font-extrabold text-white tracking-widest font-sans">
                ITC
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-350 font-medium leading-relaxed">
              Đối tác tư vấn, giám sát &amp; thẩm định độc lập tin cậy bậc nhất của các chủ đầu tư khối cơ quan nhà nước.
            </p>
          </div>
        </div>

        {/* 4-Column Professional Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12" id="footer-main-grid">
          
          {/* Column 1 (span-4): Deep Corporate Information */}
          <div className="lg:col-span-4 space-y-4" id="footer-col-company-info">
            <h4 className="text-sm sm:text-base font-bold tracking-wider text-[#38BDF8] uppercase font-sans">
              Thông tin pháp lý doanh nghiệp
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs sm:text-sm font-bold text-white uppercase leading-snug tracking-wide font-sans">
                  Công Ty Cổ Phần Giải Pháp Và Tư Vấn Công Nghệ ITC
                </p>
                <p className="text-[11px] text-slate-400 mt-1 uppercase font-sans leading-relaxed tracking-wider font-semibold">
                  ITC SOLUTIONS AND TECHNOLOGY CONSULTING JOINT STOCK COMPANY
                </p>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 pr-4 font-medium">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4.5 w-4.5 shrink-0 text-sky-400 mt-0.5" />
                  <span className="leading-relaxed">
                    Nhà số 10 ngõ 337, phố Định Công, Phường Định Công, Quận Hoàng Mai, TP Hà Nội
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4.5 w-4.5 shrink-0 text-sky-400" />
                  <span>Mã số thuế: <strong className="font-sans text-white tracking-wider font-bold">0108165977</strong></span>
                </div>
               
              </div>
            </div>
          </div>

          {/* Column 2 (span-2): Fast Navigation */}
          <div className="lg:col-span-2 space-y-4" id="footer-col-links">
            <h4 className="text-sm sm:text-base font-bold tracking-wider text-[#38BDF8] uppercase font-sans">
              Đường dẫn nhanh
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-bold">
              <li>
                <button 
                  onClick={() => handleLinkClick('home')} 
                  className="text-slate-300 hover:text-white flex items-center gap-1 transition-all group cursor-pointer"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Trang chủ</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="text-slate-300 hover:text-white flex items-center gap-1 transition-all group cursor-pointer"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Dịch vụ tư vấn</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('projects')} 
                  className="text-slate-300 hover:text-white flex items-center gap-1 transition-all group cursor-pointer"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Dự án thực tế</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('gallery')} 
                  className="text-slate-300 hover:text-white flex items-center gap-1 transition-all group cursor-pointer"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Hình ảnh công ty</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('news')} 
                  className="text-slate-300 hover:text-white flex items-center gap-1 transition-all group cursor-pointer"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Tin tức doanh nghiệp</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('contact')} 
                  className="text-slate-300 hover:text-white flex items-center gap-1 transition-all group cursor-pointer"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Liên hệ thầu</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 (span-3): Quick Core Competency Services */}
          <div className="lg:col-span-3 space-y-4" id="footer-col-services-nav">
            <h4 className="text-sm sm:text-base font-bold tracking-wider text-[#38BDF8] uppercase font-sans">
              Hạng mục thầu chính
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="text-slate-300 hover:text-white text-left block leading-relaxed cursor-pointer transition-colors"
                >
                  • Tư vấn khảo sát dự án CNTT
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="text-slate-300 hover:text-white text-left block leading-relaxed cursor-pointer transition-colors"
                >
                  • Thiết kế thi công &amp; Tổng dự toán
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="text-slate-300 hover:text-white text-left block leading-relaxed cursor-pointer transition-colors"
                >
                  • Đề cương và dự toán chi tiết
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="text-slate-300 hover:text-white text-left block leading-relaxed cursor-pointer transition-colors"
                >
                  • Thẩm tra phản biện độc lập
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="text-slate-300 hover:text-white text-left block leading-relaxed cursor-pointer transition-colors"
                >
                  • Giám sát &amp; Kiểm thử phần mềm
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 (span-3): Official Hot Contacts & Representative */}
          <div className="lg:col-span-3 space-y-4" id="footer-col-authorized-rep">
            <h4 className="text-sm sm:text-base font-bold tracking-wider text-[#38BDF8] uppercase font-sans">
              Đại diện ủy quyền
            </h4>
            <div className="space-y-4 text-xs sm:text-sm">
              
              {/* Leader Representative Profile */}
              <div className="rounded-xl bg-slate-900/60 border border-slate-800/50 p-3 flex flex-col space-y-1.5 backdrop-blur-sm shadow-inner" id="rep-card-footer">
                <div className="flex items-center gap-1.5 text-sky-400 font-bold tracking-wider uppercase text-[10px] sm:text-xs">
                  <UserCheck className="h-3.5 w-3.5 shrink-0" />
                  <span>Đại diện pháp luật</span>
                </div>
                <div>
                  <p className="text-white font-bold text-xs sm:text-sm leading-snug">
                    Đàm Thị Kim Anh
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-400 italic mt-0.5 font-medium">
                    Tổng Giám đốc doanh nghiệp
                  </p>
                </div>
              </div>

              {/* Direct Touch channels */}
              <div className="space-y-2.5">
                <a 
                  href="tel:0984482789" 
                  className="flex items-center gap-2.5 text-sky-400 hover:text-sky-300 transition-colors font-bold group select-all"
                >
                  <PhoneCall className="h-4.5 w-4.5 shrink-0 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span className="font-sans text-xs sm:text-sm tracking-wide">0984482789</span>
                </a>
                
                <a 
                  href="mailto:tvitc.info@gmail.com" 
                  className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group select-all font-semibold"
                >
                  <Mail className="h-4.5 w-4.5 shrink-0 text-slate-500 group-hover:text-sky-400 transition-colors" />
                  <span className="font-sans text-xs sm:text-sm">tvitc.info@gmail.com</span>
                </a>

                <a 
                  href="http://itctv.vn/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-slate-300 hover:text-sky-400 transition-colors group text-xs sm:text-sm font-semibold"
                >
                  <Globe className="h-4.5 w-4.5 shrink-0 text-slate-500 group-hover:text-sky-400 transition-colors" />
                  <span className="underline">http://itctv.vn/</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Declarations */}
        <div className="mt-12 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-slate-400" id="footer-bottom">
          <p className="text-center sm:text-left font-medium">
            © {currentYear} CÔNG TY CỔ PHẦN GIẢI PHÁP VÀ TƯ VẤN CÔNG NGHỆ ITC. Bảo lưu mọi quyền pháp thầu.
          </p>
          <div className="flex gap-5 font-semibold text-slate-450">
            <span className="hover:text-white cursor-help transition-colors">Điều khoản dịch vụ</span>
            <span className="hover:text-white cursor-help transition-colors">Chính sách bảo mật</span>
            <span className="hover:text-white cursor-help transition-colors">ISO 27001</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

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
    <footer className="relative bg-[#0B1329] text-slate-300 pt-16 pb-8 border-t border-slate-800 font-sans" id="app-footer">
      
      {/* Premium dark indigo/sky backdrop accents */}
      <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Top bar: Dynamic Corporate Vision and ISO Marks */}
        <div className="border-b border-slate-800/80 pb-10 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6" id="footer-vision-bar">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ItcLogo size={42} showText={false} />
              <h3 className="font-display text-lg font-extrabold text-white tracking-wider font-sans">
                ITC
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Đối tác tư vấn, giám sát &amp; thẩm định độc lập tin cậy bậc nhất của các chủ đầu tư khối cơ quan nhà nước.
            </p>
          </div>

          {/* Standard certificates showcase removed as requested */}
        </div>

        {/* 4-Column Professional Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12" id="footer-main-grid">
          
          {/* Column 1 (span-4): Deep Corporate Information */}
          <div className="lg:col-span-4 space-y-4" id="footer-col-company-info">
            <h4 className="text-sm font-semibold tracking-wide text-[#38BDF8] font-sans">
              Thông tin pháp lý doanh nghiệp
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-white uppercase leading-snug font-sans">
                  Công Ty Cổ Phần Giải Pháp Và Tư Vấn Công Nghệ ITC
                </p>
                <p className="text-[10px] text-slate-450 mt-1 uppercase font-sans leading-relaxed tracking-wider">
                  ITC SOLUTIONS AND TECHNOLOGY CONSULTING JOINT STOCK COMPANY
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-slate-350 pr-4">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 text-slate-500 mt-0.5" />
                  <span className="leading-relaxed">
                    Nhà số 10 ngõ 337, phố Định Công, Phường Định Công, Quận Hoàng Mai, TP Hà Nội
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4 shrink-0 text-slate-500" />
                  <span>Mã số thuế: <strong className="font-sans text-slate-200 tracking-wider font-bold">0108165977</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <DollarSign className="h-4 w-4 shrink-0 text-slate-500" />
                  <span className="leading-snug">Vốn điều lệ: <strong className="text-slate-200 font-bold">10 tỷ đồng</strong> (Bằng chữ: Mười tỷ đồng)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 (span-2): Fast Navigation */}
          <div className="lg:col-span-2 space-y-4" id="footer-col-links">
            <h4 className="text-sm font-semibold tracking-wide text-[#38BDF8] font-sans">
              Đường dẫn nhanh
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button 
                  onClick={() => handleLinkClick('home')} 
                  className="hover:text-white text-slate-400 flex items-center gap-1 transition-all group cursor-pointer"
                >
                  <ChevronRight className="h-3 w-3 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Trang chủ</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="hover:text-white text-slate-400 flex items-center gap-1 transition-all group cursor-pointer"
                >
                  <ChevronRight className="h-3 w-3 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Dịch vụ tư vấn</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('projects')} 
                  className="hover:text-white text-slate-400 flex items-center gap-1 transition-all group cursor-pointer"
                >
                  <ChevronRight className="h-3 w-3 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Dự án thực tế</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('contact')} 
                  className="hover:text-white text-slate-400 flex items-center gap-1 transition-all group cursor-pointer"
                >
                  <ChevronRight className="h-3 w-3 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Liên hệ thầu</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 (span-3): Quick Core Competency Services */}
          <div className="lg:col-span-3 space-y-4" id="footer-col-services-nav">
            <h4 className="text-sm font-semibold tracking-wide text-[#38BDF8] font-sans">
              Hạng mục thầu chính
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="hover:text-white text-slate-400 text-left block leading-relaxed cursor-pointer"
                >
                  • Tư vấn khảo sát dự án CNTT
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="hover:text-white text-slate-400 text-left block leading-relaxed cursor-pointer"
                >
                  • Thiết kế thi công &amp; Tổng dự toán
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="hover:text-white text-slate-400 text-left block leading-relaxed cursor-pointer"
                >
                  • Đề cương và dự toán chi tiết
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="hover:text-white text-slate-400 text-left block leading-relaxed cursor-pointer"
                >
                  • Thẩm tra phản biện độc lập
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="hover:text-white text-slate-400 text-left block leading-relaxed cursor-pointer"
                >
                  • Giám sát &amp; Kiểm thử phần mềm
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 (span-3): Official Hot Contacts & Representative */}
          <div className="lg:col-span-3 space-y-4" id="footer-col-authorized-rep">
            <h4 className="text-sm font-semibold tracking-wide text-[#38BDF8] font-sans">
              Đại diện ủy quyền
            </h4>
            <div className="space-y-4 text-xs">
              
              {/* Leader Representative Profile */}
              <div className="rounded-xl bg-slate-900/50 border border-slate-800/60 p-3 flex.col space-y-1.5" id="rep-card-footer">
                <div className="flex items-center gap-1.5 text-sky-400 font-bold tracking-wide uppercase text-[10px]">
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>Đại diện pháp luật</span>
                </div>
                <div>
                  <p className="text-white font-bold text-xs leading-none">
                    Đàm Thị Kim Anh
                  </p>
                  <p className="text-[10px] text-slate-400 italic mt-0.5">
                    Tổng Giám đốc doanh nghiệp
                  </p>
                </div>
              </div>

              {/* Direct Touch channels */}
              <div className="space-y-2.5">
                <a 
                  href="tel:0984482789" 
                  className="flex items-center gap-2.5 text-sky-400 hover:text-sky-350 transition-colors font-bold group select-all"
                >
                  <PhoneCall className="h-4 w-4 shrink-0 text-sky-500 group-hover:scale-110 transition-transform" />
                  <span className="font-sans text-xs font-bold">0984482789</span>
                </a>
                
                <a 
                  href="mailto:tvitc.info@gmail.com" 
                  className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group select-all"
                >
                  <Mail className="h-4 w-4 shrink-0 text-slate-500" />
                  <span className="font-sans text-xs">tvitc.info@gmail.com</span>
                </a>

                <a 
                  href="http://itctv.vn/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-slate-300 hover:text-sky-400 transition-colors group text-xs"
                >
                  <Globe className="h-4 w-4 shrink-0 text-slate-500" />
                  <span className="underline">http://itctv.vn/</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Declarations */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-450" id="footer-bottom">
          <p className="text-center sm:text-left font-medium">
            © {currentYear} CÔNG TY CỔ PHẦN GIẢI PHÁP VÀ TƯ VẤN CÔNG NGHỆ ITC. Bảo lưu mọi quyền pháp thầu.
          </p>
          <div className="flex gap-5 font-semibold text-slate-500">
            <span className="hover:text-slate-350 cursor-help transition-colors">Điều khoản dịch vụ</span>
            <span className="hover:text-slate-350 cursor-help transition-colors">Chính sách bảo mật</span>
            <span className="hover:text-slate-350 cursor-help transition-colors">ISO 27001</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

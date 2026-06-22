import {
  Sparkles
} from 'lucide-react';

export default function Contact() {

  return (
    <div className="relative pt-6 pb-8 md:pt-8 md:pb-10 bg-[#FAFAF9] min-h-screen font-sans overflow-hidden flex items-center" id="contact-view">
      
      {/* Decorative Warm Accent Ambient Orbs */}
      <div className="absolute top-10 right-10 h-[30rem] w-[30rem] rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 h-[30rem] w-[30rem] rounded-full bg-slate-400/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-5 space-y-2 text-left" id="contact-page-header">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#2563eb] font-sans bg-blue-50/80 border border-blue-100/50 rounded-full px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
            <span>Nhận thức từ tâm — Nâng tầm tư vấn — Vững bước thành công</span>
          </span>
          <h1 className="font-display text-4xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] uppercase">
            LIÊN HỆ VỚI CHÚNG TÔI
          </h1>
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch" id="contact-split-grid">
          
          {/* Left Block: Company Info (replaces the old form) */}
          <div className="lg:col-span-7 bg-white rounded-lg overflow-hidden border border-slate-100 shadow-[0_15px_50px_rgba(203,213,225,0.12)] flex flex-col justify-between" id="contact-form-section">
            
            <div>
              {/* Header Box in Soft light-slate/off-white background */}
              <div className="bg-[#FAF9F6]/80 px-5 py-4 border-b border-slate-100">
                <h2 className="font-sans text-base font-extrabold tracking-wide text-[#38BDF8] uppercase leading-none">
                  THÔNG TIN<br />
                  <span className="text-[#0ea5e9] text-lg">CÔNG TY</span>
                </h2>
              </div>

              {/* Company Details Body with larger text and structured layout */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* 1. TÊN CÔNG TY */}
                <div className="space-y-1 pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    TÊN CÔNG TY
                  </span>
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                    CÔNG TY CỔ PHẦN GIẢI PHÁP VÀ TƯ VẤN CÔNG NGHỆ ITC
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide leading-snug mt-1">
                    ITC SOLUTIONS AND TECHNOLOGY CONSULTING JOINT STOCK COMPANY
                  </p>
                </div>

                {/* Grid for details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  
                  {/* Địa chỉ trụ sở - Spans full width */}
                  <div className="sm:col-span-2 space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                      ĐỊA CHỈ TRỤ SỞ
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                      Nhà số 10 ngõ 337, phố Định Công, Phường Định Công, Quận Hoàng Mai, TP Hà Nội
                    </p>
                  </div>

                  {/* Đại diện pháp luật */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                      ĐẠI DIỆN PHÁP LUẬT
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-800">
                      Đàm Thị Kim Anh - Tổng Giám đốc
                    </p>
                  </div>

                  {/* Mã số thuế */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                      MÃ SỐ THUẾ / ĐKKD
                    </span>
                    <p className="text-sm sm:text-base font-extrabold text-slate-900 tracking-wider">
                      0108165977
                    </p>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                      EMAIL
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-850 select-all">
                      tvitc.info@gmail.com
                    </p>
                  </div>

                  {/* Website */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                      WEBSITE
                    </span>
                    <a 
                      href="http://itctv.vn/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm sm:text-base font-bold text-blue-600 hover:text-blue-750 transition-colors underline block truncate"
                    >
                      http://itctv.vn/
                    </a>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Right Block: QR Zalo + Map */}
          <div className="lg:col-span-5 flex flex-col gap-5" id="contact-credentials-sidebar">
            
            {/* QR Zalo Card */}
            <div 
              className="bg-white rounded-lg overflow-hidden border border-slate-100 shadow-[0_15px_50px_rgba(203,213,225,0.12)] hover:shadow-[0_20px_50px_rgba(0,104,255,0.18)] hover:scale-[1.01] transition-all duration-350 flex flex-col items-center"
              id="zalo-qr-card"
            >
              {/* Header Box with Zalo gradient */}
              <div className="w-full bg-gradient-to-r from-[#0068FF] to-[#0099FF] px-5 py-3.5 flex items-center justify-center">
                <span className="text-white text-xs font-extrabold uppercase tracking-wider font-sans">
                  Kênh Tư Vấn Zalo
                </span>
              </div>

              {/* QR Image & Intro Wrapper */}
              <div className="p-6 flex flex-col items-center">
                <div className="relative bg-white rounded-2xl p-2.5 shadow-[0_8px_30px_rgba(0,104,255,0.06)] border border-blue-50">
                  <img 
                    src="/upload/QR/zalo-qr.jpg"
                    alt="QR Zalo"
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-xl"
                  />
                </div>

                {/* Introduction Text */}
                <p className="mt-4 text-xs text-slate-500 text-center leading-relaxed font-medium max-w-[280px]">
                  Quét mã QR bằng ứng dụng Zalo để kết nối trực tiếp với chuyên viên tư vấn của ITC. Chúng tôi sẵn sàng hỗ trợ phản hồi thắc mắc và nhu cầu của bạn nhanh chóng nhất.
                </p>
              </div>
            </div>

            {/* Google Map Card */}
            <div className="bg-white rounded-lg overflow-hidden border border-slate-100 shadow-[0_15px_50px_rgba(203,213,225,0.12)] h-[250px] sm:h-[300px] lg:flex-1" id="corporate-map-card">
              <iframe
                title="Bản đồ vị trí ITC"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1862.6508637779298!2d105.82970862903267!3d20.980538931848525!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac5f3097b025%3A0x78bb03ffe7c94aea!2zMTAgTmcuIDMzNyBQLiDEkOG7i25oIEPDtG5nLCDEkOG7i25oIEPDtG5nIEjhuqEsIMSQ4buLbmggQ8O0bmcsIEjDoCBO4buZaSwgVmlldG5hbQ!5e0!3m2!1sen!2sus!4v1781280401314!5m2!1sen!2sus"
                width="100%"
                height="100%"
                className="border-none w-full h-full min-h-[220px]"
                allowFullScreen
                loading="lazy"
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

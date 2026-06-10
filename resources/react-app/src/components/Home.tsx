import React from 'react';
import { 
  ArrowRight, 
  Search, 
  Layers, 
  Shield 
} from 'lucide-react';
import { ActivePage } from '../types';
import { motion } from 'motion/react';

interface HomeProps {
  setActivePage: (page: ActivePage) => void;
}

export default function Home({ setActivePage }: HomeProps) {
  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-900 font-sans" id="home-view">
      
      {/* 1. HERO BANNER - Futurist Sleek High-Tech Cyber Theme with Tech Grid & Luminous Accents */}
      <section className="relative overflow-hidden pt-28 pb-20 md:py-32 bg-[#0B0F19]" id="hero-section">
        
        {/* Modernist Tech Grid Overlay (Futurist styling with low opacity white lines) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_80%,transparent_100%)] pointer-events-none" />

        {/* Ambient Sleek High-Tech Glowing Orbs */}
        <div className="absolute top-[-15%] left-[-10%] h-[40rem] w-[40rem] rounded-full bg-teal-500/8 blur-[130px] pointer-events-none" />
        <div className="absolute top-[25%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-blue-600/8 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[25%] h-[30rem] w-[30rem] rounded-full bg-indigo-500/5 blur-[110px] pointer-events-none" />

        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Premium Left-aligned Tech Typography */}
            <motion.div 
              className="lg:col-span-7 space-y-6 text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Kiến tạo hạ tầng số xanh - vững bền</span>
              </div>
              
               <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold tracking-tight text-white leading-tight space-y-1">
                <span className="text-cyan-400 text-xs sm:text-sm tracking-[0.25em] font-sans block mb-1 font-bold uppercase">
                  ICT., JSC
                </span>
                <span className="block text-slate-100 font-extrabold">
                  Nhận thức từ tâm
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-extrabold">
                  Nâng tầm tư vấn
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-extrabold">
                  Vững bước thành công
                </span>
              </h1>
              
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Tổ chức tư vấn ủy thác CNTT độc lập hàng đầu Việt Nam. Chúng tôi đồng hành rà duyệt kỹ thuật khoa học, thẩm tra dự toán định mức chi tiết, bảo vệ dòng tài khóa và an tâm bảo mật tối đa cho các đại dự án Quốc gia.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => { setActivePage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all cursor-pointer"
                  id="hero-services-btn"
                >
                  <span>Khám phá dịch vụ</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                
                <button
                  onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="rounded-xl border border-slate-700 bg-slate-800/40 hover:bg-slate-800/80 hover:border-slate-600 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white hover:-translate-y-0.5 shadow-sm transition-all cursor-pointer"
                  id="hero-contact-btn"
                >
                  <span>Liên hệ tư vấn</span>
                </button>
              </div>
            </motion.div>
            
            {/* Right Column: Sleek Sci-fi Cloud / Database network cluster representation */}
            <motion.div 
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.15)] border border-slate-800 aspect-[4/3] sm:aspect-video lg:aspect-[4/5] bg-[#0d1527]">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600"
                  alt="Mạng lưới kết nối hạ tầng số toàn cầu công nghệ cao"
                  className="h-full w-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/60 via-transparent to-transparent pointer-events-none" />
              </div>
              
              {/* Decorative green soft background glow */}
              <div className="absolute -z-10 -bottom-6 -right-6 h-64 w-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. CORE SERVICES AREA - 3 Simple flat white columns with Minimalist Line Icons */}
      <section className="py-24 bg-gradient-to-b from-[#F8FAFC] via-white to-slate-50 relative overflow-hidden" id="core-services-section">
        {/* Soft background glow circles to soften the boundary */}
        <div className="absolute top-0 left-1/4 h-80 w-80 rounded-full bg-blue-50/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-emerald-50/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          
          <motion.div 
            className="max-w-3xl text-left mb-16 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-sans">DỊCH VỤ CỐT LÕI</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Tuyển tập 3 mảng hoạt động chiến lược
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
              Chúng tôi đi thẳng vào vấn đề cốt lõi của đầu tư số. Rõ ràng, minh bạch, tuân thủ chặt chẽ pháp lý và tối ưu dòng tài chính thầu.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="three-services-columns">
            
            {/* Column 1: Khảo sát & Quy hoạch */}
            <motion.div 
              className="rounded-2xl border border-slate-200/80 bg-white p-8 hover:border-blue-600/30 transition-all flex flex-col justify-between group cursor-pointer shadow-3xs hover:shadow-md hover:-translate-y-1 duration-300"
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
              className="rounded-2xl border border-slate-200/80 bg-white p-8 hover:border-emerald-600/30 transition-all flex flex-col justify-between group cursor-pointer shadow-3xs hover:shadow-md hover:-translate-y-1 duration-300"
              onClick={() => { setActivePage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              id="home-service-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="space-y-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Layers className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-[#0F172A] group-hover:text-emerald-600 transition-colors">
                    Thiết kế cơ sở &amp; Thẩm tra Dự toán
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-550 leading-relaxed font-semibold">
                    Xác lập tổng mức đầu tư, kiểm định chặt chẽ bảng báo giá vật tư và định mức nhân công chuẩn xác, phòng ngừa lãng phí tài khóa.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>Khám phá quy chuẩn</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>

            {/* Column 3: Giám sát & Kiểm thử */}
            <motion.div 
              className="rounded-2xl border border-slate-200/80 bg-white p-8 hover:border-blue-600/30 transition-all flex flex-col justify-between group cursor-pointer shadow-3xs hover:shadow-md hover:-translate-y-1 duration-300"
              onClick={() => { setActivePage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              id="home-service-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="space-y-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">
                    Giám sát độc lập &amp; Kiểm thử phần mềm
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-550 leading-relaxed font-semibold">
                    Đo kiểm độc lập, rà soát lỗ hổng bảo mật và giám sát thực thi của nhà thầu phát triển, tạo dựng niềm tin tuyệt đối trước kiểm toán.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>Khám phá kiểm chuẩn</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. TRUST BANNER - Authority Message */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-[#FAF9F5]/30 relative overflow-hidden" id="trust-banner-section">
        {/* Soft background radial mask */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.02),transparent_70%)] pointer-events-none" />

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
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
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

import React, { useState, FormEvent } from 'react';
import { 
  Mail, 
  PhoneCall, 
  MapPin, 
  Landmark, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Send,
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    phone: '',
    email: '',
    serviceField: 'khao-sat-cntt',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng cung cấp họ và tên';
    if (!formData.organization.trim()) newErrors.organization = 'Vui lòng cung cấp tên Đơn vị / Cơ quan chủ quản';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng cung cấp số điện thoại liên hệ';
    } else if (!/^[0-9+ ]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Định dạng số điện thoại không hợp lệ (8 - 15 chữ số)';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng cung cấp email liên hệ';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Định dạng email không hợp lệ';
    }
    if (!formData.message.trim()) newErrors.message = 'Vui lòng cung cấp tóm tắt yêu cầu hỗ trợ';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      organization: '',
      phone: '',
      email: '',
      serviceField: 'khao-sat-cntt',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="relative pt-8 pb-12 md:pt-10 md:pb-16 bg-[#FAFAF9] min-h-screen font-sans overflow-hidden flex items-center" id="contact-view">
      
      {/* Decorative Warm Accent Ambient Orbs */}
      <div className="absolute top-20 right-10 h-[30rem] w-[30rem] rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 h-[30rem] w-[30rem] rounded-full bg-slate-400/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Page Header (Clean, super compact, aligned with single-screen view) */}
        <div className="max-w-3xl mb-8 space-y-2 text-left" id="contact-page-header">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2563eb] font-sans bg-blue-50/80 border border-blue-100/50 rounded-full px-3 py-1">
            <Sparkles className="h-3 w-3 text-blue-600 animate-pulse" />
            <span>Kết nối chuyên đường kỹ nghệ thầu</span>
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Liên hệ quy hoạch &amp; Cố vấn
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans font-medium max-w-xl">
            Mọi yêu cầu lập đề cương, thẩm tra tổng mức dự toán thiết kế xây dựng hoặc rà duyệt an toàn cơ sở dữ liệu sẽ được ITC phản hồi sớm nhất.
          </p>
        </div>

        {/* Dynamic Compact Split Layout fitted for single screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="contact-split-grid">
          
          {/* Left Block: Premium Spacious Form card */}
          <div className="lg:col-span-7 bg-white rounded-[1.8rem] p-8 sm:p-12 shadow-[0_15px_50px_rgba(203,213,225,0.12)] flex flex-col justify-center border border-slate-100" id="contact-form-section">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                
                /* Elegant Submission Success Screen */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10 text-center space-y-6 flex flex-col items-center justify-center min-h-[350px]" 
                  id="submit-success-panel"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-3xs">
                    <CheckCircle2 className="h-7 w-7 stroke-[1.8]" />
                  </div>
                  
                  <div className="space-y-3 max-w-md">
                    <h3 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">
                      Gửi yêu cầu thành công
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-sans">
                      ITC đã nhận được thông tin đăng ký thầu. Bản chuyên sự của chúng tôi sẽ chủ động liên hệ trực tiếp đến số điện thoại <span className="font-sans text-[#2563eb] font-extrabold">{formData.phone}</span> để hỗ trợ Quý đơn vị một cách bảo mật nhất.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="rounded-xl border border-slate-150 hover:bg-slate-50 text-slate-705 font-bold text-xs uppercase tracking-wider px-6 py-3 transition-colors cursor-pointer shadow-3xs"
                    >
                      Bản khảo sát mới
                    </button>
                  </div>
                </motion.div>

              ) : (
                
                /* Spacious Form with 2-Column Responsive Layout */
                <form onSubmit={handleSubmit} className="space-y-6" id="consultation-form">
                  <div className="space-y-2">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      Để lại lời mời hợp tác
                    </h3>
                    <p className="text-xs text-slate-400 font-sans">
                      Xin vui lòng cập nhật các hạng mục nhu cầu dưới đây để ITC chuẩn bị hồ sơ thấu tháo.
                    </p>
                  </div>

                  <div className="space-y-5">
                    
                    {/* Row 1: Full Name & Phone Call Side-by-Side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Full Name Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 tracking-wide font-sans block" htmlFor="input-fullName">
                          Họ &amp; Tên Người đại diện <span className="text-red-500 font-sans font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          id="input-fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full rounded-xl border-none bg-slate-50/70 focus:bg-white px-5 py-3.5 text-sm text-slate-800 placeholder-slate-405 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all font-sans"
                          placeholder="Ví dụ: Nguyễn Văn A"
                        />
                        {errors.fullName && (
                          <p className="text-xs text-rose-650 flex items-center gap-1 font-semibold mt-1">
                            <AlertTriangle className="h-3.5 w-3.5" /> <span>{errors.fullName}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone Contact */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 tracking-wide font-sans block" htmlFor="input-phone">
                          Hotline hỗ trợ thầu <span className="text-red-500 font-sans font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          id="input-phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-xl border-none bg-slate-50/70 focus:bg-white px-5 py-3.5 text-sm text-slate-800 placeholder-slate-405 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all font-sans"
                          placeholder="Số di động / Zalo..."
                        />
                        {errors.phone && (
                          <p className="text-xs text-rose-650 flex items-center gap-1 font-semibold mt-1">
                            <AlertTriangle className="h-3.5 w-3.5" /> <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Organization Name & Email Side-by-Side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Organization Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 tracking-wide font-sans block" htmlFor="input-organization">
                          Tên Đơn vị / Cơ quan chủ thầu <span className="text-red-500 font-sans font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          id="input-organization"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          className="w-full rounded-xl border-none bg-slate-50/70 focus:bg-white px-5 py-3.5 text-sm text-slate-800 placeholder-slate-405 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all font-sans"
                          placeholder="Tên doanh nghiệp / cơ quan..."
                        />
                        {errors.organization && (
                          <p className="text-xs text-rose-650 flex items-center gap-1 font-semibold mt-1">
                            <AlertTriangle className="h-3.5 w-3.5" /> <span>{errors.organization}</span>
                          </p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 tracking-wide font-sans block" htmlFor="input-email">
                          Thư điện tử công vụ <span className="text-red-500 font-sans font-bold">*</span>
                        </label>
                        <input
                          type="email"
                          id="input-email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-xl border-none bg-slate-50/70 focus:bg-white px-5 py-3.5 text-sm text-slate-800 placeholder-slate-405 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all font-sans"
                          placeholder="coquan@ongty.vn"
                        />
                        {errors.email && (
                          <p className="text-xs text-rose-650 flex items-center gap-1 font-semibold mt-1">
                            <AlertTriangle className="h-3.5 w-3.5" /> <span>{errors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Service Field Selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 tracking-wide font-sans block" htmlFor="input-serviceField">
                        Hạng mục Dự án đề nghị tư vấn
                      </label>
                      <div className="relative">
                        <select
                          id="input-serviceField"
                          value={formData.serviceField}
                          onChange={(e) => setFormData({ ...formData, serviceField: e.target.value })}
                          className="w-full rounded-xl border-none bg-slate-50/70 focus:bg-white px-5 py-3.5 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all appearance-none cursor-pointer font-sans"
                        >
                          <option value="khao-sat-cntt">Tư vấn khảo sát đề xuất dự án CNTT</option>
                          <option value="lap-du-an-thiet-ke">Lập dự án &amp; Thiết kế bản vẽ thi công</option>
                          <option value="de-cuong-tham-tra">Thẩm tra dự án đề cương &amp; Tổng mức dự toán</option>
                          <option value="giam-sat-kiem-thu">Giám sát độc lập &amp; Đánh giá kiểm thử phần mềm</option>
                          <option value="quan-ly-du-an">Tư vấn quản trị dự án &amp; Hạ tầng Máy chủ, an toàn máy chủ</option>
                        </select>
                        <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-400 text-xs">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Message Box */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 tracking-wide font-sans block" htmlFor="input-message">
                        Tóm tắt yêu cầu chuyên gia của ITC <span className="text-red-500 font-sans font-bold">*</span>
                      </label>
                      <textarea
                        id="input-message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border-none bg-slate-50/70 focus:bg-white px-5 py-3.5 text-sm text-slate-800 placeholder-slate-405 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all resize-none font-sans"
                        placeholder="Nêu tóm tắt hiện trạng thầu..."
                      />
                      {errors.message && (
                        <p className="text-xs text-rose-650 flex items-center gap-1 font-semibold mt-1">
                          <AlertTriangle className="h-3.5 w-3.5" /> <span>{errors.message}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submission Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-550 py-4.5 text-xs font-bold uppercase tracking-widest text-white shadow-md shadow-blue-950/10 hover:scale-[1.005] active:scale-[0.995] disabled:opacity-60 transition-all cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <div className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Đang lập đường truyền an toàn...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          <span className="font-semibold text-xs tracking-wider">ĐĂNG KÝ HỒ SƠ YÊU CẦU</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Block: Pure corporate registry details matched exactly to the provided screenshot layout */}
          <div className="lg:col-span-5 flex flex-col gap-6" id="contact-credentials-sidebar">
            
            {/* The exactly matched "THÔNG TIN CÔNG TY" Card block */}
            <div className="bg-white rounded-[1.8rem] overflow-hidden border border-slate-100 shadow-[0_15px_50px_rgba(203,213,225,0.12)]" id="corporate-registry-card">
              
              {/* Header Box in Soft light-slate/off-white background as shown in image */}
              <div className="bg-[#FAF9F6]/80 px-6 py-5 border-b border-slate-100">
                <h2 className="font-sans text-2xl font-extrabold tracking-wide text-[#38BDF8] uppercase leading-none">
                  THÔNG TIN<br />
                  <span className="text-[#0ea5e9]">CÔNG TY</span>
                </h2>
              </div>

              {/* Company Details Body with precise fields from image with tighter spacing */}
              <div className="p-6 space-y-4">
                
                {/* 1. TÊN CÔNG TY */}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    TÊN CÔNG TY
                  </span>
                  <p className="text-xs font-bold text-slate-800 leading-normal font-sans">
                    CÔNG TY CỔ PHẦN GIẢI PHÁP VÀ TƯ VẤN CÔNG NGHỆ ITC
                  </p>
                </div>

                {/* 2. TÊN TIẾNG ANH */}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    TÊN TIẾNG ANH
                  </span>
                  <p className="text-[11px] font-bold text-slate-800 leading-snug font-sans uppercase">
                    ITC SOLUTIONS AND TECHNOLOGY CONSULTING JOINT STOCK COMPANY
                  </p>
                </div>

                {/* 3. ĐĂNG KÝ KINH DOANH - MÃ SỐ THUẾ */}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    ĐĂNG KÝ KINH DOANH - MÃ SỐ THUẾ
                  </span>
                  <p className="text-xs font-extrabold font-sans text-slate-900 tracking-wider">
                    0108165977
                  </p>
                </div>

                {/* 4. ĐỊA CHỈ TRỤ SỞ */}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    ĐỊA CHỈ TRỤ SỞ
                  </span>
                  <p className="text-xs font-bold text-slate-800 leading-normal font-sans">
                    Nhà số 10 ngõ 337, phố Định Công, Phường Định Công, Quận Hoàng Mai, TP Hà Nội
                  </p>
                </div>

                {/* 5. VỐN ĐIỀU LỆ */}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    VỐN ĐIỀU LỆ
                  </span>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed font-sans">
                    10.000.000.000 đồng (Bằng chữ: Mười tỷ đồng)
                  </p>
                </div>

                {/* 6. ĐIỆN THOẠI */}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    ĐIỆN THOẠI
                  </span>
                  <p className="text-sm font-extrabold font-sans text-[#2563eb] tracking-wide select-all">
                    0984482789
                  </p>
                </div>

                {/* 7. EMAIL */}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    EMAIL
                  </span>
                  <p className="text-xs font-bold text-slate-800 font-sans select-all">
                    tvitc.info@gmail.com
                  </p>
                </div>

                {/* 8. WEBSITE */}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    WEBSITE
                  </span>
                  <a 
                    href="http://itctv.vn/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-blue-600 hover:text-blue-750 transition-colors underline font-sans"
                  >
                    http://itctv.vn/
                  </a>
                </div>

                {/* 9. ĐẠI DIỆN PHÁP LUẬT */}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    ĐẠI DIỆN PHÁP LUẬT
                  </span>
                  <p className="text-xs font-bold text-slate-800 leading-normal font-sans">
                    Đàm Thị Kim Anh - Tổng Giám đốc
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

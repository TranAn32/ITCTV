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
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok && data.success) {
          setIsSubmitted(true);
        } else {
          setErrors({ submit: data.message || 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.' });
        }
      })
      .catch((error) => {
        console.error('Error submitting contact form:', error);
        setErrors({ submit: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.' });
      })
      .finally(() => {
        setSubmitting(false);
      });
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
    <div className="relative pt-6 pb-8 md:pt-8 md:pb-10 bg-[#FAFAF9] min-h-screen font-sans overflow-hidden flex items-center" id="contact-view">
      
      {/* Decorative Warm Accent Ambient Orbs */}
      <div className="absolute top-20 right-10 h-[30rem] w-[30rem] rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 h-[30rem] w-[30rem] rounded-full bg-slate-400/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Page Header (Clean, super compact, aligned with single-screen view) */}
        <div className="max-w-3xl mb-5 space-y-1 text-left" id="contact-page-header">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2563eb] font-sans bg-blue-50/80 border border-blue-100/50 rounded-full px-3 py-1">
            <Sparkles className="h-3 w-3 text-blue-600 animate-pulse" />
            <span>Nhận thức từ tâm — Nâng tầm tư vấn — Vững bước thành công</span>
          </span>
          <h1 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
            Liên hệ với chúng tôi
          </h1>
          
        </div>

        {/* Dynamic Compact Split Layout fitted for single screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch" id="contact-split-grid">
          
          {/* Left Block: Premium Spacious Form card */}
          <div className="lg:col-span-7 bg-white rounded-lg p-5 sm:p-7 shadow-[0_15px_50px_rgba(203,213,225,0.12)] flex flex-col justify-center border border-slate-100" id="contact-form-section">
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
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shadow-3xs">
                    <CheckCircle2 className="h-7 w-7 stroke-[1.8]" />
                  </div>
                  
                  <div className="space-y-3 max-w-md">
                    <h3 className="font-display text-xl font-extrabold text-slate-900 tracking-tight">
                      Gửi yêu cầu thành công
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      ITC đã nhận được thông tin đăng ký thầu. Bản chuyên sự của chúng tôi sẽ chủ động liên hệ trực tiếp đến số điện thoại <span className="font-sans text-[#2563eb] font-extrabold">{formData.phone}</span> để hỗ trợ Quý đơn vị một cách bảo mật nhất.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-705 font-bold text-xs uppercase tracking-wider px-6 py-3 transition-colors cursor-pointer shadow-3xs"
                    >
                      Bản khảo sát mới
                    </button>
                  </div>
                </motion.div>

              ) : (
                
                /* Spacious Form with 2-Column Responsive Layout */
                <form onSubmit={handleSubmit} className="space-y-4" id="consultation-form">
                  <div className="space-y-1">
                    <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                      Để lại lời mời hợp tác
                    </h3>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Xin vui lòng cập nhật các hạng mục nhu cầu dưới đây để ITC chuẩn bị hồ sơ thấu tháo.
                    </p>
                  </div>

                  <div className="space-y-4">
                    
                    {/* Row 1: Full Name & Phone Call Side-by-Side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name Input */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-700 tracking-wide font-sans block" htmlFor="input-fullName">
                          Họ &amp; Tên Người đại diện <span className="text-red-500 font-sans font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          id="input-fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full rounded-lg border-none bg-slate-50/70 focus:bg-white px-4 py-2.5 text-xs text-slate-800 placeholder-slate-405 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all font-sans"
                          placeholder="Ví dụ: Nguyễn Văn A"
                        />
                        {errors.fullName && (
                          <p className="text-[10px] text-rose-650 flex items-center gap-1 font-semibold mt-1">
                            <AlertTriangle className="h-3 w-3" /> <span>{errors.fullName}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone Contact */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-700 tracking-wide font-sans block" htmlFor="input-phone">
                          Hotline hỗ trợ thầu <span className="text-red-500 font-sans font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          id="input-phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-lg border-none bg-slate-50/70 focus:bg-white px-4 py-2.5 text-xs text-slate-800 placeholder-slate-405 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all font-sans"
                          placeholder="Số di động / Zalo..."
                        />
                        {errors.phone && (
                          <p className="text-[10px] text-rose-650 flex items-center gap-1 font-semibold mt-1">
                            <AlertTriangle className="h-3 w-3" /> <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Organization Name & Email Side-by-Side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Organization Input */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-700 tracking-wide font-sans block" htmlFor="input-organization">
                          Tên Đơn vị / Cơ quan chủ thầu <span className="text-red-500 font-sans font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          id="input-organization"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          className="w-full rounded-lg border-none bg-slate-50/70 focus:bg-white px-4 py-2.5 text-xs text-slate-800 placeholder-slate-405 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all font-sans"
                          placeholder="Tên doanh nghiệp / cơ quan..."
                        />
                        {errors.organization && (
                          <p className="text-[10px] text-rose-650 flex items-center gap-1 font-semibold mt-1">
                            <AlertTriangle className="h-3 w-3" /> <span>{errors.organization}</span>
                          </p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-700 tracking-wide font-sans block" htmlFor="input-email">
                          Thư điện tử công vụ <span className="text-red-500 font-sans font-bold">*</span>
                        </label>
                        <input
                          type="email"
                          id="input-email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-lg border-none bg-slate-50/70 focus:bg-white px-4 py-2.5 text-xs text-slate-800 placeholder-slate-405 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all font-sans"
                          placeholder="coquan@ongty.vn"
                        />
                        {errors.email && (
                          <p className="text-[10px] text-rose-650 flex items-center gap-1 font-semibold mt-1">
                            <AlertTriangle className="h-3 w-3" /> <span>{errors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Service Field Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-700 tracking-wide font-sans block" htmlFor="input-serviceField">
                        Hạng mục Dự án đề nghị tư vấn
                      </label>
                      <div className="relative">
                        <select
                          id="input-serviceField"
                          value={formData.serviceField}
                          onChange={(e) => setFormData({ ...formData, serviceField: e.target.value })}
                          className="w-full rounded-lg border-none bg-slate-50/70 focus:bg-white px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all appearance-none cursor-pointer font-sans"
                        >
                          <option value="khao-sat-cntt">Tư vấn khảo sát đề xuất dự án CNTT</option>
                          <option value="lap-du-an-thiet-ke">Lập dự án &amp; Thiết kế bản vẽ thi công</option>
                          <option value="de-cuong-tham-tra">Thẩm tra dự án đề cương &amp; Tổng mức dự toán</option>
                          <option value="giam-sat-kiem-thu">Giám sát độc lập &amp; Đánh giá kiểm thử phần mềm</option>
                          <option value="quan-ly-du-an">Tư vấn quản trị dự án &amp; Hạ tầng Máy chủ, an toàn máy chủ</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 text-xs">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Message Box */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-700 tracking-wide font-sans block" htmlFor="input-message">
                        Tóm tắt yêu cầu chuyên gia của ITC <span className="text-red-500 font-sans font-bold">*</span>
                      </label>
                      <textarea
                        id="input-message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-lg border-none bg-slate-50/70 focus:bg-white px-4 py-2.5 text-xs text-slate-800 placeholder-slate-405 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all resize-none font-sans"
                        placeholder="Nêu tóm tắt hiện trạng thầu..."
                      />
                      {errors.message && (
                        <p className="text-[10px] text-rose-650 flex items-center gap-1 font-semibold mt-1">
                          <AlertTriangle className="h-3 w-3" /> <span>{errors.message}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-[11px] text-rose-650 flex items-center gap-2 font-semibold">
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      <span>{errors.submit}</span>
                    </div>
                  )}

                  {/* Submission Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 hover:bg-blue-550 py-3 text-[11px] font-bold uppercase tracking-widest text-white shadow-md shadow-blue-950/10 hover:scale-[1.002] active:scale-[0.998] disabled:opacity-60 transition-all cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <div className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Đang lập đường truyền an toàn...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          <span className="font-semibold tracking-wider">ĐĂNG KÝ HỒ SƠ YÊU CẦU</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Block: Pure corporate registry details matched exactly to the provided screenshot layout */}
          <div className="lg:col-span-5 flex flex-col gap-4" id="contact-credentials-sidebar">
            
            {/* The exactly matched "THÔNG TIN CÔNG TY" Card block */}
            <div className="bg-white rounded-lg overflow-hidden border border-slate-100 shadow-[0_15px_50px_rgba(203,213,225,0.12)]" id="corporate-registry-card">
              
              {/* Header Box in Soft light-slate/off-white background as shown in image */}
              <div className="bg-[#FAF9F6]/80 px-5 py-3 border-b border-slate-100">
                <h2 className="font-sans text-lg font-extrabold tracking-wide text-[#38BDF8] uppercase leading-none">
                  THÔNG TIN<br />
                  <span className="text-[#0ea5e9]">CÔNG TY</span>
                </h2>
              </div>

              {/* Company Details Body with precise fields in 2-column grid */}
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                
                {/* 1. TÊN CÔNG TY */}
                <div className="sm:col-span-2 space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    TÊN CÔNG TY
                  </span>
                  <p className="text-[11px] font-bold text-slate-800 leading-normal font-sans">
                    CÔNG TY CỔ PHẦN GIẢI PHÁP VÀ TƯ VẤN CÔNG NGHỆ ITC
                  </p>
                </div>

                {/* 2. TÊN TIẾNG ANH */}
                <div className="sm:col-span-2 space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    TÊN TIẾNG ANH
                  </span>
                  <p className="text-[10px] font-bold text-slate-800 leading-snug font-sans uppercase">
                    ITC SOLUTIONS AND TECHNOLOGY CONSULTING JOINT STOCK COMPANY
                  </p>
                </div>

                {/* 4. ĐỊA CHỈ TRỤ SỞ */}
                <div className="sm:col-span-2 space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    ĐỊA CHỈ TRỤ SỞ
                  </span>
                  <p className="text-[11px] font-bold text-slate-800 leading-normal font-sans">
                    10 Ng. 337 P. Định Công, Hoàng Mai, Hà Nội
                  </p>
                </div>

                {/* 9. ĐẠI DIỆN PHÁP LUẬT */}
                <div className="col-span-1 space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    ĐẠI DIỆN PHÁP LUẬT
                  </span>
                  <p className="text-[11px] font-bold text-slate-800 leading-normal font-sans">
                    Đàm Thị Kim Anh - Tổng Giám đốc
                  </p>
                </div>

                {/* 3. ĐĂNG KÝ KINH DOANH - MÃ SỐ THUẾ */}
                <div className="col-span-1 space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    MÃ SỐ THUẾ / ĐKKD
                  </span>
                  <p className="text-[11px] font-extrabold font-sans text-slate-900 tracking-wider">
                    0108165977
                  </p>
                </div>

                {/* 5. VỐN ĐIỀU LỆ */}
                <div className="col-span-1 space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    VỐN ĐIỀU LỆ
                  </span>
                  <p className="text-[11px] font-bold text-slate-700 leading-relaxed font-sans">
                    10 tỷ đồng
                  </p>
                </div>

                {/* 6. ĐIỆN THOẠI */}
                <div className="col-span-1 space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    ĐIỆN THOẠI
                  </span>
                  <p className="text-xs font-extrabold font-sans text-[#2563eb] tracking-wide select-all">
                    0984482789
                  </p>
                </div>

                {/* 7. EMAIL */}
                <div className="col-span-1 space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    EMAIL
                  </span>
                  <p className="text-[11px] font-bold text-slate-800 font-sans select-all truncate">
                    tvitc.info@gmail.com
                  </p>
                </div>

                {/* 8. WEBSITE */}
                <div className="col-span-1 space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-sans block">
                    WEBSITE
                  </span>
                  <a 
                    href="http://itctv.vn/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-750 transition-colors underline font-sans block truncate"
                  >
                    http://itctv.vn/
                  </a>
                </div>
              </div>

            </div>

            {/* Google Map Card */}
            <div className="bg-white rounded-lg overflow-hidden border border-slate-100 shadow-[0_15px_50px_rgba(203,213,225,0.12)] flex-1 min-h-[220px]" id="corporate-map-card">
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

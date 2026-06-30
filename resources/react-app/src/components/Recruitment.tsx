import { useState, useEffect } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Share2,
  ChevronDown,
  ChevronUp,
  Users,
  Award,
  Target,
  Sparkles,
  CheckCircle2,
  Check,
  X,
  Calendar as CalendarIcon,
  Building2,
  Globe,
  ArrowRight
} from 'lucide-react';
import { RecruitmentItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { fetchWithSWR, getCachedData } from '../utils/apiCache';
import { h2 } from 'motion/react-client';

interface RecruitmentProps {
  setActivePage?: (page: any) => void;
}

export default function Recruitment({ setActivePage }: RecruitmentProps) {
  const cachedRecruitments = getCachedData<RecruitmentItem[]>('/api/recruitments');
  const [recruitments, setRecruitments] = useState<RecruitmentItem[]>(cachedRecruitments || []);
  const [loading, setLoading] = useState(!cachedRecruitments);
  const [selectedJobForModal, setSelectedJobForModal] = useState<RecruitmentItem | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    fetchWithSWR<RecruitmentItem[]>('/api/recruitments', (data) => {
      if (Array.isArray(data)) {
        setRecruitments(data);
      }
    })
      .catch(err => console.error('Lỗi tải tuyển dụng:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleShare = async (item: RecruitmentItem) => {
    const url = `${window.location.origin}/recruitment#job-${item.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };


  const formatSalary = (salaryStr: string | null) => {
    if (!salaryStr) return 'Thỏa thuận';
    const formatted = salaryStr.replace(/\b\d{4,}\b/g, (match) => {
      return Number(match).toLocaleString('vi-VN');
    });
    const cleanStr = formatted.trim();
    const hasCurrencySign = cleanStr.toLowerCase().includes('vnd') || 
                             cleanStr.toLowerCase().includes('vnđ') || 
                             cleanStr.includes('đ') || 
                             cleanStr.toLowerCase().includes('usd');
    if (/[\d.]/.test(cleanStr) && !hasCurrencySign) {
      return cleanStr + ' VND';
    }
    return cleanStr;
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const isExpired = (deadline: string | null) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-900 font-sans" id="recruitment-view">

      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50/40 via-white to-slate-50/50 py-14 md:py-20" id="recruitment-hero">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Cột trái: Tiêu đề chính */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                <Sparkles className="h-3.5 w-3.5" />
                <span>We're hiring</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-slate-900 tracking-tight leading-[1.1]">
                Kiến tạo giá trị,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Nâng tầm tương lai</span>
              </h1>
              
              <p className="text-base text-slate-500 leading-relaxed max-w-md">
                ITC — đơn vị tư vấn chuyển đổi số cho cơ quan nhà nước và doanh nghiệp, thành lập từ 2018.
              </p>

              {/* Lĩnh vực — dạng inline text nhẹ */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["Tư vấn chuyển đổi số", "Đấu thầu", "Quản lý dự án", "Giám sát triển khai", "Kiểm thử"].map((item, idx) => (
                  <span key={idx} className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    {item}
                  </span>
                ))}
              </div>

              <a href="#jobs-section" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                Xem vị trí đang tuyển
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

            {/* Cột phải: 4 highlight cards so le */}
            <motion.div
              className="space-y-3 lg:-ml-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {/* Hàng trên */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Building2 className="h-5 w-5" />, title: "Đối tác cấp cao", desc: "Bộ, ngành, UBND tỉnh và các Chủ đầu tư lớn", color: "bg-blue-50 text-blue-600" },
                  { icon: <Users className="h-5 w-5" />, title: "Chuyên gia dẫn dắt", desc: "Hướng dẫn bởi chuyên gia nhiều năm kinh nghiệm CNTT", color: "bg-indigo-50 text-indigo-600" }
                ].map((card, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100/80">
                    <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>{card.icon}</div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{card.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>
              {/* Hàng dưới — dịch sang phải */}
              <div className="grid grid-cols-2 gap-3 lg:ml-10">
                {[
                  { icon: <MapPin className="h-5 w-5" />, title: "Quy mô toàn quốc", desc: "Dự án chuyển đổi số trên phạm vi cả nước", color: "bg-sky-50 text-sky-600" },
                  { icon: <Sparkles className="h-5 w-5" />, title: "Linh hoạt & Chủ động", desc: "Làm việc theo đặc thù dự án, đề cao tự chủ", color: "bg-emerald-50 text-emerald-600" }
                ].map((card, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100/80">
                    <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>{card.icon}</div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{card.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CHIA SẺ TỪ DOANH NGHIỆP */}
      <section className="py-32 bg-white relative overflow-hidden" id="leadership-message">

        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Cột trái: Khung ảnh 3D lồng nhau, to hơn */}
            <div className="lg:col-span-5 flex justify-center py-4">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 group">
                
                {/* Lớp nền xoay */}
                <div className="absolute inset-0 bg-blue-100/30 rounded-[2.25rem] transform rotate-6 translate-x-4 translate-y-4 transition-all duration-500 group-hover:rotate-10 pointer-events-none" />
                
                {/* Lớp nét đứt */}
                <div className="absolute inset-3 border-2 border-dashed border-blue-300/30 rounded-[2rem] transform -rotate-4 transition-all duration-500 group-hover:-rotate-8 pointer-events-none" />

                {/* Khung chính chứa ảnh */}
                <div className="absolute inset-5 bg-gradient-to-tr from-blue-600 to-sky-500 rounded-3xl shadow-xl flex items-end justify-center overflow-visible transform rotate-2 hover:rotate-0 hover:-translate-y-1 transition-all duration-500">
                  <div className="absolute inset-2 border border-white/15 rounded-2xl pointer-events-none" />
                  
                  {/* Ảnh lãnh đạo - fallback silhouette nếu không có ảnh */}
                  <img 
                    src="/upload/Gallery/gallery-1782098997-6a38ac358d248.jpg" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" fill="none"><rect width="200" height="240" fill="%231e293b"/><circle cx="100" cy="75" r="35" fill="%23334155"/><ellipse cx="100" cy="190" rx="60" ry="50" fill="%23334155"/><text x="100" y="230" text-anchor="middle" fill="%2394a3b8" font-size="11" font-family="sans-serif">ITC Leader</text></svg>');
                    }}
                    className="w-full h-[115%] object-cover rounded-2xl translate-y-[-7%] transition-transform duration-500 group-hover:scale-105" 
                    alt="Ban lãnh đạo ITC" 
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent pointer-events-none rounded-2xl" />
                </div>
              </div>
            </div>

            {/* Right Column: Quote & Details */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-600 block">Chia sẻ từ doanh nghiệp</span>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  Lắng nghe <span className="text-blue-600">Người ITC</span>
                </h2>
              </div>

              {/* World-class quote block layout */}
              <div className="relative pl-6 py-2 border-l-3 border-blue-500 bg-blue-50/15 rounded-r-2xl pr-4">
                <span className="absolute -top-3 left-1 text-5xl text-blue-200/80 font-serif leading-none select-none">“</span>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-semibold italic text-justify">
                  Với phương châm "Đồng hành cùng chuyển đổi số - Kiến tạo giá trị - Nâng tầm tương lai", ITC chính là bệ phóng vững chắc để các tài năng trẻ trực tiếp dấn thân vào các dự án lớn tầm quốc gia, tiếp thu kỹ năng thực chiến và bứt phá giới hạn bản thân.
                </p>
              </div>

              {/* Author signature section */}
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-widest">Ban Điều Hành ITC</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Công ty Cổ phần Giải pháp & Tư vấn Công nghệ ITC</p>
              </div>

            </div>
          </div>
        </div>
      </section>



      {/* SECTION: VỊ TRÍ TUYỂN DỤNG */}
      <section className="py-16 bg-slate-50/50 border-t border-slate-100 relative overflow-hidden" id="jobs-section">
        <div className="absolute top-0 left-1/4 h-80 w-80 rounded-full bg-blue-50/30 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-sans block">ITC Careers</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              VỊ TRÍ TUYỂN DỤNG
            </h2>

          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent"></div>
                <span className="text-sm font-medium text-slate-500">Đang tải vị trí tuyển dụng...</span>
              </div>
            </div>
          ) : recruitments.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/60 shadow-3xs">
              <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-600 mb-2">Hiện chưa có vị trí tuyển dụng</h3>
              <p className="text-sm text-slate-400 font-medium">Vui lòng quay lại sau để cập nhật các cơ hội mới nhất.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="jobs-grid">
              {recruitments.map((job, index) => {
                const expired = isExpired(job.deadline);

                return (
                  <motion.div
                    key={job.id}
                    id={`job-${job.id}`}
                    className={`rounded-2xl border bg-white overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col ${
                      expired ? 'border-slate-200/60 opacity-75' : 'border-slate-200/80 hover:border-blue-500/30'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    {/* Card Header — Color accent */}
                    <div className={`h-1.5 ${expired ? 'bg-slate-350' : 'bg-gradient-to-r from-blue-600 to-sky-500'}`} />

                    <div className="p-6 flex-grow flex flex-col">
                      {/* Type & Deadline badges */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-blue-50/80 text-blue-600 px-3 py-1 rounded-full border border-blue-150/40">
                          <Briefcase className="h-3 w-3" />
                          {job.employment_type}
                        </span>
                        {job.deadline && (
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-3 py-1 rounded-full ${
                            expired
                              ? 'bg-rose-50 text-rose-600 border border-rose-100/50'
                              : 'bg-amber-50 text-amber-700 border border-amber-100/50'
                          }`}>
                            <Calendar className="h-3 w-3" />
                            {expired ? 'Hết hạn' : `Hạn: ${formatDate(job.deadline)}`}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-lg font-extrabold text-[#0F172A] mb-3 leading-snug line-clamp-2 hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>

                      {/* Meta Info */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {job.department && (
                          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] sm:text-xs text-slate-600 font-semibold">
                            <Users className="h-4 w-4 text-blue-500 shrink-0" />
                            <span className="truncate" title={job.department}>{job.department}</span>
                          </div>
                        )}
                        {job.location && (
                          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] sm:text-xs text-slate-600 font-semibold">
                            <MapPin className="h-4 w-4 text-blue-500 shrink-0" />
                            <span className="truncate" title={job.location}>{job.location}</span>
                          </div>
                        )}
                        {job.experience && (
                          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] sm:text-xs text-slate-600 font-semibold">
                            <Clock className="h-4 w-4 text-blue-500 shrink-0" />
                            <span className="truncate" title={job.experience}>{job.experience}</span>
                          </div>
                        )}
                        {job.salary_range && (
                          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] sm:text-xs text-slate-600 font-semibold">
                            <DollarSign className="h-4 w-4 text-emerald-500 shrink-0" />
                            <span className="truncate" title={formatSalary(job.salary_range)}>{formatSalary(job.salary_range)}</span>
                          </div>
                        )}
                      </div>

                      {/* Description - hiển thị đầy đủ, giữ dòng xuống */}
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium whitespace-pre-line mb-5 flex-grow">
                        {job.description}
                      </p>

                      {/* Expand / Collapse (opens popup modal now) */}
                      <div className="space-y-3 mt-auto">
                        <button
                          onClick={() => setSelectedJobForModal(job)}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-350 hover:text-blue-600 transition-all cursor-pointer shadow-3xs"
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden border-t border-slate-100" id="recruitment-cta">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 text-center relative z-10">
          <motion.div
            className="max-w-3xl mx-auto space-y-5"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Cùng ITC</span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A] leading-snug">
              "Nhận thức từ tâm — Nâng tầm tư vấn — Vững bước thành công"
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-xl mx-auto">
              Gửi CV và thông tin ứng tuyển qua email hoặc liên hệ trực tiếp với chúng tôi. ITC luôn chào đón các tài năng mới.
            </p>
          </motion.div>
        </div>
      </section>

      {/* JOB DETAIL POPUP MODAL */}
      <AnimatePresence>
        {selectedJobForModal && (
          <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 9999 }} id="job-modal-overlay">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJobForModal(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Modal Body Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-150 z-10"
              id="job-modal-container"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md border border-blue-100/50">
                      {selectedJobForModal.employment_type}
                    </span>
                    {selectedJobForModal.deadline && (
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
                        isExpired(selectedJobForModal.deadline)
                          ? 'bg-rose-50 text-rose-600 border border-rose-100/50'
                          : 'bg-amber-50 text-amber-700 border border-amber-100/50'
                      }`}>
                        Hạn: {formatDate(selectedJobForModal.deadline)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-extrabold text-slate-900">
                    {selectedJobForModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedJobForModal(null)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-650 hover:bg-slate-50 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-grow overflow-y-auto p-6 space-y-5 bg-slate-50/20">
                {/* Meta info grid */}
                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  {selectedJobForModal.department && (
                    <div className="flex items-center gap-2.5 text-xs text-slate-650 font-semibold">
                      <Users className="h-4.5 w-4.5 text-blue-500 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Phòng ban</div>
                        <div className="text-slate-800">{selectedJobForModal.department}</div>
                      </div>
                    </div>
                  )}
                  {selectedJobForModal.location && (
                    <div className="flex items-center gap-2.5 text-xs text-slate-650 font-semibold">
                      <MapPin className="h-4.5 w-4.5 text-blue-500 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Địa điểm</div>
                        <div className="text-slate-800">{selectedJobForModal.location}</div>
                      </div>
                    </div>
                  )}
                  {selectedJobForModal.experience && (
                    <div className="flex items-center gap-2.5 text-xs text-slate-650 font-semibold">
                      <Clock className="h-4.5 w-4.5 text-blue-500 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Kinh nghiệm</div>
                        <div className="text-slate-800">{selectedJobForModal.experience}</div>
                      </div>
                    </div>
                  )}
                  {selectedJobForModal.salary_range && (
                    <div className="flex items-center gap-2.5 text-xs text-slate-650 font-semibold">
                      <DollarSign className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mức lương</div>
                        <div className="text-emerald-700">{formatSalary(selectedJobForModal.salary_range)}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5 text-blue-500" />
                    Mô tả công việc
                  </h4>
                  <div className="bg-white p-4.5 rounded-2xl border border-slate-100/80 shadow-3xs text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                    {selectedJobForModal.description}
                  </div>
                </div>

                {/* Requirements */}
                {selectedJobForModal.requirements && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                      Yêu cầu ứng viên
                    </h4>
                    <div className="bg-white p-4.5 rounded-2xl border border-slate-100/80 shadow-3xs text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                      {selectedJobForModal.requirements}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {selectedJobForModal.benefits && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-emerald-500" />
                      Quyền lợi được hưởng
                    </h4>
                    <div className="bg-white p-4.5 rounded-2xl border border-slate-100/80 shadow-3xs text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                      {selectedJobForModal.benefits}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-2">
                  Đăng ngày: {formatDate(selectedJobForModal.created_at)}
                </span>
                <div className="flex gap-2.5">
                  <button
                    onClick={() => setSelectedJobForModal(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-350 bg-white text-xs font-bold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    Đóng
                  </button>
                  <button
                    onClick={() => {
                      setSelectedJobForModal(null);
                      if (setActivePage) {
                        setActivePage('contact');
                        setTimeout(() => {
                          const element = document.getElementById('contact-form-section');
                          if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }, 120);
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-550 hover:to-sky-450 text-xs font-bold text-white shadow-md shadow-blue-500/10 hover:shadow-lg transition-all cursor-pointer"
                  >
                    Ứng tuyển ngay
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


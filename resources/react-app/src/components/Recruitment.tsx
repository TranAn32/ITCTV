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
  Calendar as CalendarIcon
} from 'lucide-react';
import { RecruitmentItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { fetchWithSWR, getCachedData } from '../utils/apiCache';
import { h2 } from 'motion/react-client';

export default function Recruitment() {
  const cachedRecruitments = getCachedData<RecruitmentItem[]>('/api/recruitments');
  const [recruitments, setRecruitments] = useState<RecruitmentItem[]>(cachedRecruitments || []);
  const [loading, setLoading] = useState(!cachedRecruitments);
  const [expandedId, setExpandedId] = useState<number | null>(null);
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

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
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

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#0F1729] to-[#0B0F19] py-20 md:py-28" id="recruitment-hero">
        {/* Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        {/* Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-5%] h-[30rem] w-[30rem] rounded-full bg-blue-600/8 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[25rem] w-[25rem] rounded-full bg-sky-500/6 blur-[100px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <motion.div
            className="max-w-3xl space-y-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-300 border border-blue-400/25 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>Gia nhập đội ngũ ITC</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              <span className="block text-slate-100">Cùng ITC kiến tạo</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">tương lai công nghệ</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl font-medium">
              Chúng tôi tin rằng mỗi cá nhân đều mang trong mình một giá trị độc đáo. Hãy để ITC trở thành nơi bạn phát huy tối đa tiềm năng và cùng nhau tạo nên những điều phi thường.
            </p>
          </motion.div>
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
                const isExpanded = expandedId === job.id;

                return (
                  <motion.div
                    key={job.id}
                    id={`job-${job.id}`}
                    className={`rounded-2xl border bg-white overflow-hidden shadow-3xs hover:shadow-lg transition-all duration-300 flex flex-col ${
                      expired ? 'border-slate-200/60 opacity-75' : 'border-slate-200/80 hover:border-blue-500/30'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    {/* Card Header — Color accent */}
                    <div className={`h-1.5 ${expired ? 'bg-slate-300' : 'bg-gradient-to-r from-blue-600 to-sky-500'}`} />

                    <div className="p-6 flex-grow flex flex-col">
                      {/* Type & Deadline badges */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-100/50">
                          <Briefcase className="h-3 w-3" />
                          {job.employment_type}
                        </span>
                        {job.deadline && (
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-md ${
                            expired
                              ? 'bg-red-50 text-red-600 border border-red-100/50'
                              : 'bg-amber-50 text-amber-700 border border-amber-100/50'
                          }`}>
                            <Calendar className="h-3 w-3" />
                            {expired ? 'Hết hạn' : `Hạn: ${formatDate(job.deadline)}`}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-lg font-bold text-[#0F172A] mb-2 leading-snug line-clamp-2">
                        {job.title}
                      </h3>

                      {/* Meta Info */}
                      <div className="space-y-2 mb-4">
                        {job.department && (
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                            <Users className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span>{job.department}</span>
                          </div>
                        )}
                        {job.location && (
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span>{job.location}</span>
                          </div>
                        )}
                        {job.experience && (
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                            <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span>{job.experience}</span>
                          </div>
                        )}
                        {job.salary_range && (
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                            <DollarSign className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span>{job.salary_range}</span>
                          </div>
                        )}
                      </div>

                      {/* Short description */}
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium line-clamp-3 mb-4 flex-grow">
                        {job.description}
                      </p>

                      {/* Expand / Collapse */}
                      <div className="space-y-3 mt-auto">
                        <button
                          onClick={() => toggleExpand(job.id)}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="h-3.5 w-3.5" />
                              Thu gọn
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-3.5 w-3.5" />
                              Xem chi tiết
                            </>
                          )}
                        </button>

                        {/* Share button */}
                        <button
                          onClick={() => handleShare(job)}
                          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            copiedId === job.id
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                              : 'bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100'
                          }`}
                        >
                          {copiedId === job.id ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              Đã sao chép link!
                            </>
                          ) : (
                            <>
                              <Share2 className="h-3.5 w-3.5" />
                              Chia sẻ vị trí này
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Detail Panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 space-y-5 border-t border-slate-100 pt-5">
                            {/* Full Description */}
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 flex items-center gap-1.5">
                                <Target className="h-3.5 w-3.5" />
                                Mô tả công việc
                              </h4>
                              <p className="text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-line">{job.description}</p>
                            </div>

                            {/* Requirements */}
                            {job.requirements && (
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 flex items-center gap-1.5">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Yêu cầu ứng viên
                                </h4>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-line">{job.requirements}</p>
                              </div>
                            )}

                            {/* Benefits */}
                            {job.benefits && (
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 flex items-center gap-1.5">
                                  <Award className="h-3.5 w-3.5" />
                                  Quyền lợi
                                </h4>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-line">{job.benefits}</p>
                              </div>
                            )}

                            {/* Posted date */}
                            <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 font-semibold">
                              Đăng ngày: {formatDate(job.created_at)}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
    </div>
  );
}

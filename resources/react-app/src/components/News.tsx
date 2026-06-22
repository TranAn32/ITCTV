import { useState, useEffect } from 'react';
import { 
  Calendar, 
  ArrowRight, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Newspaper, 
  Clock 
} from 'lucide-react';
import { ActivePage, NewsItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface NewsProps {
  setActivePage: (page: ActivePage) => void;
  setSelectedNewsId: (id: number) => void;
}

export default function News({ setActivePage, setSelectedNewsId }: NewsProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setNews(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Lỗi khi tải tin tức:', err);
        setLoading(false);
      });
  }, []);

  // Filter news based on search query
  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Take first 5 items for the slideshow slider
  const sliderItems = news.slice(0, 5);

  // Auto-play slideshow slider
  useEffect(() => {
    if (sliderItems.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % sliderItems.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderItems.length]);

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % sliderItems.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + sliderItems.length) % sliderItems.length);
  };

  const handleGoToDetail = (id: number) => {
    setSelectedNewsId(id);
    setActivePage('news-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm font-semibold text-slate-500">Đang tải tin tức...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" id="news-view">
      
      {/* 1. HERO SLIDESHOW SECTION */}
      {sliderItems.length > 0 && (
        <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-slate-950" id="news-hero-slider">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => handleGoToDetail(sliderItems[currentSlide].id)}
            >
              <img
                src={sliderItems[currentSlide].image_path}
                alt={sliderItems[currentSlide].title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Slider Content */}
          <div className="absolute bottom-0 left-0 right-0 z-10 mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pb-12 md:pb-16 text-left">
            <motion.div
              key={currentSlide}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl space-y-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-300 border border-blue-400/30 backdrop-blur-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>Tin nổi bật</span>
              </div>
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight hover:text-blue-300 transition-colors cursor-pointer"
                onClick={() => handleGoToDetail(sliderItems[currentSlide].id)}
              >
                {sliderItems[currentSlide].title}
              </h2>
              <p className="text-sm md:text-base text-slate-300 line-clamp-2 leading-relaxed">
                {sliderItems[currentSlide].summary}
              </p>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-sky-400" />
                  {formatDate(sliderItems[currentSlide].created_at)}
                </span>
                <button
                  onClick={() => handleGoToDetail(sliderItems[currentSlide].id)}
                  className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                >
                  <span>Xem chi tiết bài viết</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {sliderItems.length > 1 && (
            <>
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 border border-white/10 transition-colors cursor-pointer"
                title="Trước"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 border border-white/10 transition-colors cursor-pointer"
                title="Sau"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Indicators */}
          {sliderItems.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
              {sliderItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'bg-blue-500 w-6' : 'bg-white/40 w-1.5 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* 2. NEWS FEED GRID SECTION */}
      <section className="py-16 mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Header and Search Tool */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-slate-200 pb-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-sans block">ITC Press</span>
            <h1 className="font-display text-4xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight uppercase">
              TIN TỨC HOẠT ĐỘNG
            </h1>
            <p className="text-sm text-slate-500">Cập nhật những hoạt động, bài viết tư vấn mới nhất từ các chuyên gia ITC</p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none transition-all focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Dynamic Grid list */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredNews.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-[0_4px_20px_rgba(241,245,249,0.5)] hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group"
              >
                {/* Image Container */}
                <div 
                  className="h-48 overflow-hidden relative bg-slate-100 cursor-pointer"
                  onClick={() => handleGoToDetail(item.id)}
                >
                  <img 
                    src={item.image_path} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Date Tag Overlay */}
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold rounded-lg px-2.5 py-1 flex items-center gap-1 font-sans">
                    <Clock className="h-3 w-3 text-sky-400" />
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </div>

                {/* Details Container */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 
                      className="text-base font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer leading-snug"
                      onClick={() => handleGoToDetail(item.id)}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-3 leading-relaxed font-medium">
                      {item.summary}
                    </p>
                  </div>
                  
                  {/* Readmore trigger */}
                  <div 
                    onClick={() => handleGoToDetail(item.id)}
                    className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 cursor-pointer hover:text-blue-700 mt-auto"
                  >
                    <span>Xem chi tiết</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
            <Newspaper className="h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-base font-bold text-slate-700">Không tìm thấy bài viết nào</h3>
            <p className="text-xs text-slate-400 mt-1">Vui lòng thử tìm kiếm bằng một từ khóa khác.</p>
          </div>
        )}

      </section>

    </div>
  );
}

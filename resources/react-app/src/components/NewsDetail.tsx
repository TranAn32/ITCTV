import { useState, useEffect } from 'react';
import { 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  User, 
  Share2, 
  Newspaper 
} from 'lucide-react';
import { ActivePage, NewsItem } from '../types';
import { motion } from 'motion/react';
import { fetchWithSWR, getCachedData } from '../utils/apiCache';

interface NewsDetailProps {
  newsId: number;
  setActivePage: (page: ActivePage) => void;
  setSelectedNewsId: (id: number) => void;
}

export default function NewsDetail({ newsId, setActivePage, setSelectedNewsId }: NewsDetailProps) {
  // Attempt to find from cached endpoints for instant render
  const cachedDetail = getCachedData<NewsItem>(`/api/news/${newsId}`);
  const cachedAllNews = getCachedData<NewsItem[]>('/api/news');
  const initialArticle = cachedDetail || (cachedAllNews ? cachedAllNews.find(item => item.id === newsId) : null);
  
  const initialRelated = cachedAllNews
    ? cachedAllNews.filter(item => item.id !== newsId).slice(0, 4)
    : [];

  const [article, setArticle] = useState<NewsItem | null>(initialArticle);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>(initialRelated);
  const [loading, setLoading] = useState(!initialArticle);

  useEffect(() => {
    // Sync state with cache synchronously when newsId changes
    const freshDetail = getCachedData<NewsItem>(`/api/news/${newsId}`);
    const freshAllNews = getCachedData<NewsItem[]>('/api/news');
    const foundArticle = freshDetail || (freshAllNews ? freshAllNews.find(item => item.id === newsId) : null);
    
    setArticle(foundArticle);
    setRelatedNews(freshAllNews ? freshAllNews.filter(item => item.id !== newsId).slice(0, 4) : []);
    setLoading(!foundArticle);

    // Revalidate article details in background
    const detailPromise = fetchWithSWR<NewsItem>(`/api/news/${newsId}`, (data) => {
      setArticle(data);
    }).catch(err => {
      console.error('Lỗi tải chi tiết bài viết:', err);
    });

    // Revalidate related news in background
    const relatedPromise = fetchWithSWR<NewsItem[]>('/api/news', (allNews) => {
      const filtered = (allNews || []).filter((item: NewsItem) => item.id !== newsId);
      setRelatedNews(filtered.slice(0, 4));
    }).catch(err => {
      console.error('Lỗi tải tin liên quan:', err);
    });

    Promise.all([detailPromise, relatedPromise]).finally(() => {
      setLoading(false);
    });
  }, [newsId]);

  const handleBack = () => {
    setActivePage('news');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToRelated = (id: number) => {
    setSelectedNewsId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
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
          <p className="text-sm font-semibold text-slate-500">Đang tải nội dung bài viết...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-slate-50 py-20 px-4">
        <Newspaper className="h-12 w-12 text-slate-350 mb-4" />
        <h3 className="text-lg font-bold text-slate-700">Bài viết không tồn tại</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-sm text-center">Nội dung có thể đã bị gỡ bỏ hoặc đường dẫn không hợp lý.</p>
        <button 
          onClick={handleBack}
          className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-blue-700 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại trang Tin tức</span>
        </button>
      </div>
    );
  }

  // Split content by newline to render structured paragraphs
  const paragraphs = article.content.split(/\r?\n/).filter(p => p.trim() !== '');

  return (
    <div className="min-h-screen bg-slate-50 py-12" id="news-detail-view">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 md:px-8">
        
        {/* Back navigation button */}
        <button 
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 mb-8 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Quay lại trang Tin tức</span>
        </button>

        {/* 1. ARTICLE HEADER */}
        <article className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-3xs p-6 sm:p-10 md:p-12 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400 font-sans border-b border-slate-100 pb-4">
              <span className="flex items-center gap-1.5 text-blue-600">
                <Clock className="h-4 w-4" />
                {formatDate(article.created_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                <span>Ban biên tập ITC</span>
              </span>
              <span className="ml-auto flex items-center gap-1.5 hover:text-blue-600 cursor-pointer transition-colors" title="Chia sẻ bài viết">
                <Share2 className="h-4 w-4" />
                <span>Chia sẻ</span>
              </span>
            </div>
            
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug">
              {article.title}
            </h1>

            {/* Summary Block */}
            <div className="p-4 sm:p-6 bg-slate-50 rounded-xl border-l-4 border-blue-600 italic text-slate-650 text-sm sm:text-base font-semibold leading-relaxed">
              {article.summary}
            </div>
          </div>

          {/* 2. COVER IMAGE */}
          <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] overflow-hidden rounded-xl bg-slate-100 border border-slate-200/50 shadow-inner">
            <img
              src={article.image_path}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 3. BODY CONTENT */}
          <div className="pt-4 prose max-w-none text-slate-700">
            {paragraphs.map((p, idx) => (
              <p 
                key={idx} 
                className="text-sm sm:text-base leading-relaxed mb-6 font-medium text-slate-750 font-sans"
              >
                {p}
              </p>
            ))}
          </div>
        </article>

        {/* 4. RELATED NEWS */}
        {relatedNews.length > 0 && (
          <section className="mt-16 space-y-8" id="related-news-section">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-slate-800">
                TIN TỨC LIÊN QUAN
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedNews.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleGoToRelated(item.id)}
                  className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-3xs hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group cursor-pointer"
                >
                  <div className="h-36 overflow-hidden relative bg-slate-100">
                    <img 
                      src={item.image_path} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] font-bold text-blue-600 pt-2 border-t border-slate-50 mt-auto">
                      <span>Xem bài viết</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

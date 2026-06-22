import { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Loader2,
  Camera,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryImage {
  id: number;
  image_path: string;
  caption: string | null;
  created_at: string;
}

// Default high quality fallback images if database is empty or has few images
const FALLBACK_IMAGES: GalleryImage[] = [
  {
    id: -1,
    image_path: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    caption: 'Hệ thống trung tâm dữ liệu hiện đại, vận hành an toàn và tin cậy.',
    created_at: new Date().toISOString()
  },
  {
    id: -2,
    image_path: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Hội thảo tư vấn giải pháp chuyển đổi số và phát triển phần mềm cho đối tác.',
    created_at: new Date().toISOString()
  },
  {
    id: -3,
    image_path: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    caption: 'Giám sát kỹ thuật hạ tầng mạng viễn thông và thiết bị CNTT thực địa.',
    created_at: new Date().toISOString()
  },
  {
    id: -4,
    image_path: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    caption: 'Đo kiểm chất lượng và đánh giá bảo mật phần mềm chuyên nghiệp.',
    created_at: new Date().toISOString()
  }
];

export default function Gallery() {
  const [dbImages, setDbImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isSlideHovered, setIsSlideHovered] = useState(false);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDbImages(data);
        }
      })
      .catch(err => {
        console.error('Lỗi khi tải hình ảnh từ database:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Merge database images with fallback images to ensure a full layout
  const images = dbImages.length > 0 ? [...dbImages, ...FALLBACK_IMAGES] : FALLBACK_IMAGES;

  // Autoplay slideshow
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex !== null && images.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  }, [lightboxIndex, images.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex !== null && images.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  }, [lightboxIndex, images.length]);

  // Handle keyboard events in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, goNext, goPrev]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#FAFAF9]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-sm font-semibold text-slate-500">Đang tải hình ảnh...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pt-6 pb-12 bg-[#FAFAF9] min-h-screen font-sans" id="gallery-view">
      
      <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Page Header - Clean & Simple */}
        <div className="max-w-3xl mb-6 space-y-2 text-left" id="gallery-page-header">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#2563eb] font-sans bg-blue-50/80 border border-blue-100/50 rounded-full px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
            <span>Thư viện hình ảnh hoạt động công ty</span>
          </span>
          <h1 className="font-display text-4xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] uppercase">
            HÌNH ẢNH HOẠT ĐỘNG
          </h1>
        </div>

        {/* 1. SLIDESHOW (CAROUSEL) - Impressive yet Simple */}
        {images.length > 0 && (
          <div 
            className="relative w-full h-[280px] sm:h-[380px] md:h-[440px] rounded-none overflow-hidden shadow-md bg-slate-950 mb-8 group"
            id="gallery-slideshow"
            onMouseEnter={() => setIsSlideHovered(true)}
            onMouseLeave={() => setIsSlideHovered(false)}
          >
            {/* Active Image */}
            <div className="absolute inset-0">
              <img 
                src={images[slideIndex].image_path}
                alt={images[slideIndex].caption || 'Hình ảnh hoạt động'}
                className="w-full h-full object-cover transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>

            {/* Navigation buttons */}
            <button
              onClick={() => setSlideIndex(prev => (prev - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/35 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
              aria-label="Slide trước"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setSlideIndex(prev => (prev + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/35 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
              aria-label="Slide sau"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 right-4 z-10 flex gap-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    slideIndex === idx ? 'w-5 bg-white' : 'w-2 bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Floating Info Icon (visual cue to hover) */}
            <div className="absolute top-4 right-4 bg-black/45 backdrop-blur-xs text-white p-2 rounded-full pointer-events-none group-hover:scale-90 transition-transform">
              <Info className="h-4 w-4" />
            </div>

            {/* Hover Caption Overlay (Hover to display text - light-themed soft background) */}
            <div 
              className={`absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm text-slate-800 flex items-center transition-all duration-350 transform ${
                isSlideHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
            >
              <p className="text-xs sm:text-sm font-bold leading-relaxed mx-auto text-center max-w-3xl text-slate-700">
                {images[slideIndex].caption || 'Hình ảnh tiêu biểu của ITC Technology Consulting.'}
              </p>
            </div>
          </div>
        )}

        {/* 2. GALLERY GRID - Large alternating layout with permanently visible soft captions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[240px] sm:auto-rows-[280px]" id="gallery-simple-grid">
          {images.map((image, idx) => {
            // Helper for alternating layout
            const cardSpans = [
              'col-span-1 row-span-1',          // normal
              'col-span-1 sm:col-span-2 row-span-1', // wide
              'col-span-1 row-span-2',          // tall
              'col-span-1 row-span-1',          // normal
              'col-span-1 sm:col-span-2 row-span-1', // wide
              'col-span-1 row-span-2',          // tall
            ];
            const cardSpanClass = cardSpans[idx % cardSpans.length];

            return (
              <div
                key={image.id}
                onClick={() => openLightbox(idx)}
                className={`group relative bg-white rounded-none overflow-hidden shadow-2xs hover:shadow-md cursor-pointer transition-all duration-300 ${cardSpanClass}`}
                id={`gallery-card-${image.id}`}
              >
                {/* Image */}
                <img
                  src={image.image_path}
                  alt={image.caption || 'Hình ảnh hoạt động'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover overlay with zoom cursor */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                    <ZoomIn className="h-4 w-4 text-white" />
                  </div>
                </div>

                {/* Caption - Always visible with soft, light-themed background */}
                {image.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-white/90 backdrop-blur-sm text-slate-800 text-left">
                    <p className="text-[11px] font-bold line-clamp-2 leading-relaxed text-slate-700">
                      {image.caption}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* 3. LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && images[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={closeLightbox}
            id="gallery-lightbox"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-60 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 cursor-pointer"
              aria-label="Đóng"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev button */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-60 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/85 hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Next button */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-60 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/85 hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="Ảnh sau"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            {/* Main Image & Caption */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightboxIndex].image_path}
                alt={images[lightboxIndex].caption || 'Hình ảnh hoạt động'}
                className="max-w-full max-h-[72vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Caption */}
              {images[lightboxIndex].caption && (
                <div className="max-w-2xl text-center px-4">
                  <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed bg-black/60 px-4 py-2.5 rounded-lg border border-white/5 inline-block">
                    {images[lightboxIndex].caption}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Info index */}
            <div className="absolute top-5 left-5 text-white/60 text-xs font-semibold font-sans tracking-wider">
              <span className="flex items-center gap-1.5 bg-black/35 rounded-lg px-3 py-1.5 border border-white/5">
                <Camera className="h-3.5 w-3.5" />
                <span>{lightboxIndex + 1} / {images.length}</span>
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

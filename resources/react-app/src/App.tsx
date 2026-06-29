import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Services from './components/Services';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import News from './components/News';
import Recruitment from './components/Recruitment';
import NewsDetail from './components/NewsDetail';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useHistoryNavigation } from './hooks/useHistoryNavigation';
import { prefetchAllData } from './utils/apiCache';

export default function App() {
  const { activePage, setActivePage, selectedNewsId, setSelectedNewsId } = useHistoryNavigation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Prefetch all critical API data on startup
  useEffect(() => {
    prefetchAllData().catch(err => console.warn('Prefetch error:', err));
  }, []);

  // Monitor scroll height to conditionally reveal back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render the selected view component
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} setSelectedNewsId={setSelectedNewsId} />;
      case 'services':
        return <Services setActivePage={setActivePage} />;
      case 'projects':
        return <Projects />;
      case 'gallery':
        return <Gallery />;
      case 'news':
        return <News setActivePage={setActivePage} setSelectedNewsId={setSelectedNewsId} />;
      case 'news-detail':
        return selectedNewsId !== null ? (
          <NewsDetail 
            newsId={selectedNewsId} 
            setActivePage={setActivePage} 
            setSelectedNewsId={setSelectedNewsId} 
          />
        ) : (
          <News setActivePage={setActivePage} setSelectedNewsId={setSelectedNewsId} />
        );
      case 'contact':
        return <Contact />;
      case 'recruitment':
        return <Recruitment />;
      default:
        return <Home setActivePage={setActivePage} setSelectedNewsId={setSelectedNewsId} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 antialiased" id="root-app-layout">
      
      {/* 1. STICKY BRAND NAVIGATION HEADER */}
      <Header activePage={activePage} setActivePage={setActivePage} />

      {/* 2. SLIDING ROUTE COMPONENT ANIMATED WRAPPER */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activePage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex-grow"
          id="app-main-content"
        >
          {renderPage()}
        </motion.main>
      </AnimatePresence>

      {/* 3. RICH CORPORATE LEGAL FOOTER */}
      <Footer setActivePage={setActivePage} />

      {/* 4. UTILITIES: BACK TO TOP FLOATING ACTION */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-brand-blue to-sky-500 shadow-lg shadow-brand-blue/30 text-white hover:scale-105 active:scale-95 transition-transform duration-200 border border-sky-300/20 cursor-pointer"
            title="Cuộn lên đầu trang"
            aria-label="Back to top"
            id="btn-back-to-top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

import { useState, useEffect } from 'react';
import { Menu, X, Compass, PhoneCall } from 'lucide-react';
import { ActivePage } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import ItcLogo from './ItcLogo';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

export default function Header({ activePage, setActivePage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'services', label: 'Dịch vụ' },
    { id: 'projects', label: 'Dự án & Đối tác' },
    { id: 'contact', label: 'Liên hệ' }
  ] as const;

  const isDarkHeader = activePage === 'home' && !isScrolled;

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-transparent pt-4 px-4 sm:px-6 lg:px-8' 
          : isDarkHeader
            ? 'bg-[#0B0F19]'
            : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div 
        className={`mx-auto flex h-20 max-w-[1600px] items-center justify-between transition-all duration-300 ${
          isScrolled 
            ? 'rounded-3xl md:rounded-full bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-100/50 px-6 sm:px-10' 
            : 'px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24'
        }`}
      >
        
        {/* Logo Section */}
        <div 
          className="flex cursor-pointer items-center gap-1.5" 
          onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          id="hdr-logo"
        >
          <ItcLogo 
            size={52} 
            showText={true} 
            textColor={isDarkHeader ? "text-slate-100" : "text-slate-900"} 
            subTextColor={isDarkHeader ? "text-slate-400" : "text-slate-500"} 
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" id="hdr-nav">
          {menuItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  setActivePage(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative px-4 py-2.5 text-sm font-semibold transition-colors duration-200 outline-none rounded-full cursor-pointer ${
                  isActive 
                    ? isDarkHeader 
                      ? 'text-sky-400 font-extrabold' 
                      : 'text-brand-blue' 
                    : isDarkHeader
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className={`absolute inset-0 rounded-full ${
                      isDarkHeader 
                        ? 'bg-sky-500/10 border border-sky-400/20' 
                        : 'bg-brand-blue/10 border border-brand-blue/20'
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center" id="hdr-cta">
          <button
            onClick={() => {
              setActivePage('contact');
              setTimeout(() => {
                const element = document.getElementById('contact-form-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_4px_25px_rgba(56,189,248,0.4)] active:scale-[0.98] cursor-pointer"
            id="btn-consult-header"
          >
            <Compass className="h-4 w-4 animate-spin-slow text-sky-200 group-hover:rotate-45 transition-transform" />
            <span>Liên hệ tư vấn</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors shadow-xs ${
              isDarkHeader
                ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white'
                : 'border-slate-200 bg-white text-slate-650 hover:text-slate-900'
            }`}
            aria-label="Toggle menu"
            id="btn-mobile-menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`px-5 py-5 md:hidden shadow-xl mt-3 ${
              isScrolled ? 'rounded-3xl' : 'rounded-b-3xl'
            } ${
              isDarkHeader
                ? 'bg-[#0D1325]/95 backdrop-blur-md border border-slate-800 text-white'
                : 'bg-white text-slate-900'
            }`}
            id="mobile-nav-panel"
          >
            <div className="space-y-1.5">
              {menuItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => {
                      setActivePage(item.id);
                      setIsOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition-colors duration-200 ${
                      isActive 
                        ? isDarkHeader
                          ? 'bg-slate-800/65 text-sky-400 border border-slate-700/60'
                          : 'bg-slate-100 text-brand-blue border border-slate-200' 
                        : isDarkHeader
                          ? 'text-slate-300 hover:bg-slate-800/35 hover:text-white'
                          : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className={isDarkHeader ? 'h-2 w-2 rounded-full bg-sky-400' : 'h-2 w-2 rounded-full bg-brand-sky'} />}
                  </button>
                );
              })}
              <div className="pt-4">
                <button
                  onClick={() => {
                    setActivePage('contact');
                    setIsOpen(false);
                    setTimeout(() => {
                      const element = document.getElementById('contact-form-section');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-sky-500 py-3.5 text-center text-base font-bold text-white shadow-lg"
                  id="btn-mobile-cta"
                >
                  <PhoneCall className="h-5 w-5" />
                  <span>Liên hệ tư vấn</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

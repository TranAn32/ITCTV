import { useState, useEffect, useCallback, useRef } from 'react';
import { ActivePage } from '../types';

// Map page names to URL paths
const PAGE_TO_PATH: Record<ActivePage, string> = {
  'home': '/',
  'services': '/services',
  'projects': '/projects',
  'gallery': '/gallery',
  'news': '/news',
  'news-detail': '/news',  // news-detail will use /news/:id
  'contact': '/contact',
};

// Map URL paths back to page names
const PATH_TO_PAGE: Record<string, ActivePage> = {
  '/': 'home',
  '/services': 'services',
  '/projects': 'projects',
  '/gallery': 'gallery',
  '/news': 'news',
  '/contact': 'contact',
};

interface HistoryState {
  page: ActivePage;
  newsId?: number | null;
}

/**
 * Custom hook that syncs activePage state with browser history (URL).
 * This enables the browser back/forward buttons to navigate between pages
 * instead of leaving the site.
 */
export function useHistoryNavigation() {
  // Parse the initial page from the current URL on mount
  const getInitialState = (): HistoryState => {
    const path = window.location.pathname;
    
    // Check for /news/:id pattern
    const newsMatch = path.match(/^\/news\/(\d+)$/);
    if (newsMatch) {
      return { page: 'news-detail', newsId: parseInt(newsMatch[1], 10) };
    }

    const page = PATH_TO_PAGE[path] || 'home';
    return { page, newsId: null };
  };

  const initialState = getInitialState();
  const [activePage, setActivePageState] = useState<ActivePage>(initialState.page);
  const [selectedNewsId, setSelectedNewsIdState] = useState<number | null>(initialState.newsId ?? null);
  
  // Ref to prevent pushState during popstate handling
  const isPopStateRef = useRef(false);

  // Build the URL path from page + optional newsId
  const buildPath = useCallback((page: ActivePage, newsId?: number | null): string => {
    if (page === 'news-detail' && newsId != null) {
      return `/news/${newsId}`;
    }
    return PAGE_TO_PATH[page] || '/';
  }, []);

  // Replace the initial history entry on first load so it has state
  useEffect(() => {
    const state: HistoryState = { page: activePage, newsId: selectedNewsId };
    const path = buildPath(activePage, selectedNewsId);
    window.history.replaceState(state, '', path);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  // Wrapper for setActivePage that also pushes to history
  const setActivePage = useCallback((page: ActivePage) => {
    setActivePageState(prevPage => {
      if (!isPopStateRef.current) {
        // Push new state to browser history
        const state: HistoryState = { page, newsId: page === 'news-detail' ? null : null };
        const path = buildPath(page, null);
        
        // Only push if the page actually changed
        if (prevPage !== page) {
          window.history.pushState(state, '', path);
        }
      }
      return page;
    });
  }, [buildPath]);

  // Wrapper for setSelectedNewsId that also pushes to history
  const setSelectedNewsId = useCallback((id: number) => {
    setSelectedNewsIdState(id);
    
    if (!isPopStateRef.current) {
      const state: HistoryState = { page: 'news-detail', newsId: id };
      const path = buildPath('news-detail', id);
      window.history.pushState(state, '', path);
    }
  }, [buildPath]);

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      isPopStateRef.current = true;
      
      if (event.state && typeof event.state.page === 'string') {
        const historyState = event.state as HistoryState;
        setActivePageState(historyState.page);
        setSelectedNewsIdState(historyState.newsId ?? null);
      } else {
        // Fallback: parse from URL
        const path = window.location.pathname;
        const newsMatch = path.match(/^\/news\/(\d+)$/);
        
        if (newsMatch) {
          setActivePageState('news-detail');
          setSelectedNewsIdState(parseInt(newsMatch[1], 10));
        } else {
          const page = PATH_TO_PAGE[path] || 'home';
          setActivePageState(page);
          setSelectedNewsIdState(null);
        }
      }
      
      // Scroll to top when navigating back/forward
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Reset flag after state updates
      setTimeout(() => {
        isPopStateRef.current = false;
      }, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return {
    activePage,
    setActivePage,
    selectedNewsId,
    setSelectedNewsId,
  };
}

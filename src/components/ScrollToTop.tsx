import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll instantly to the very top on route change
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the top of the page on every route change. Without this, SPA
 * navigation keeps the previous scroll position, so clicking a footer link
 * (e.g. Privacy Policy or Support) lands you at the bottom of the new page.
 *
 * Anchor links (paths with a #hash) are left alone so they can scroll to their
 * target element instead.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

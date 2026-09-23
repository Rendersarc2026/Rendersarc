'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis, useLenis } from 'lenis/react';

/**
 * Lenis owns the scroll position, so Next's own scroll-to-top on navigation gets
 * overridden and a new page opens wherever the last one was left. Jump to the
 * top on every route change, skipping links that target an anchor.
 */
function ScrollToTopOnNavigate() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (window.location.hash) return;
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true, syncTouch: false }}>
      <ScrollToTopOnNavigate />
      {children}
    </ReactLenis>
  );
}

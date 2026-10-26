'use client';

import { ReactNode, createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from '@studio-freight/lenis';

const PageScrollContext = createContext<(top: number, immediate?: boolean) => void>(
  (top, immediate = false) => window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' }),
);

export function usePageScroll() {
  return useContext(PageScrollContext);
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const scrollTo = useCallback((top: number, immediate = false) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(top, { immediate, duration: 0.8 });
    } else {
      window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' });
    }
  }, []);

  useEffect(() => {
    // The imported storefront intro owns wheel/touch input on the homepage.
    // Keep native scrolling there rather than running two scroll controllers.
    if (pathname === '/') return;

    const lenis = new Lenis({
      lerp: 0.12,
      duration: 1.1,
      smoothWheel: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1.6,
      touchMultiplier: 1.6,
      infinite: false,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    let frameId = 0;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [pathname]);

  // Reset scroll to top on route change
  useEffect(() => {
    if (!window.location.hash) lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <PageScrollContext.Provider value={scrollTo}>{children}</PageScrollContext.Provider>;
}

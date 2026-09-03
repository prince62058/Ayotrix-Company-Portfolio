import React, { useEffect } from "react";
import { useLocation } from "wouter";
import Lenis from "lenis";

export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const lenisInstance = (window as any).__lenis;
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    }
  }, [location]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    (window as any).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      delete (window as any).__lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

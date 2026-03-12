"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useCountUp(end: number, duration = 2000) {
  // SSR: render the final value so crawlers see real numbers
  const [count, setCount] = useState(end);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const isMounted = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    setCount(0);

    // Wait one frame so the browser paints 0, then animate up
    requestAnimationFrame(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * end));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, [end, duration]);

  useEffect(() => {
    isMounted.current = true;
    // Reset to 0 on client — will animate up when visible
    setCount(0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isMounted.current && !hasAnimated.current) {
          observer.disconnect();
          animate();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return { count, ref };
}

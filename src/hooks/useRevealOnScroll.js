// src/hooks/useRevealOnScroll.js
import { useEffect } from 'react';

export default function useRevealOnScroll() {
  useEffect(() => {
    // Respect reduced motion
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      // make all reveals visible immediately
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('reveal-visible'));
      return;
    }

    const elements = Array.from(document.querySelectorAll('.reveal'));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add('reveal-visible');
            // optional: unobserve to avoid re-triggering
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

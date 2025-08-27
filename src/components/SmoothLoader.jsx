// src/components/SmoothLoader.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SmoothLoader() {
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // prevent scrolling while loader visible
    const prev = document.body.style.overflow;
    if (show) document.body.style.overflow = 'hidden';
    const onLoad = () => setReady(true);
    window.addEventListener('load', onLoad);

    // fallback in case load event takes too long
    const fallback = setTimeout(() => setReady(true), 1500);

    return () => {
      clearTimeout(fallback);
      window.removeEventListener('load', onLoad);
      document.body.style.overflow = prev;
    };
  }, [show]);

  // once ready, animate out
  useEffect(() => {
    if (ready) {
      const t = setTimeout(() => {
        setShow(false);
        // restore body scroll shortly after fade
        setTimeout(() => (document.body.style.overflow = ''), 400);
      }, 250); // small pause so initial paint isn't abrupt
      return () => clearTimeout(t);
    }
  }, [ready]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeOut' } }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 20, -10, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.5 }}
              className="rounded-full p-3 bg-emerald-50"
            >
              {/* simple airplane SVG or emoji */}
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12l20-9-7 9 7 9-20-9z" />
              </svg>
            </motion.div>

            <div className="text-sm text-slate-600">Loading...</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

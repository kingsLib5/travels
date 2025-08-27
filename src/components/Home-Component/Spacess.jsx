// src/components/Space.jsx
import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Space() {
  const reduceMotion = useReducedMotion()
  const phrase = 'FLY IN COMFORT'
  const letters = phrase.split('')

  // small helper to visually hide content for screen readers
  const VisuallyHidden = ({ children }) => (
    <span className="sr-only">{children}</span>
  )

  return (
    <section className="bg-transparent h-[60vh] grid">
      <div className="text-white flex justify-center items-center">
        {/* Screen reader text (single accessible phrase) */}
        <VisuallyHidden>{phrase}</VisuallyHidden>

        {/* Animated text */}
        <h1
          aria-hidden={reduceMotion ? 'false' : 'true'}
          className="text-[45px] font-semibold font-serif tracking-wide select-none"
        >
          {!reduceMotion ? (
            <span className="inline-flex items-center gap-1">
              {letters.map((char, idx) => {
                // keep spaces readable and preserve layout
                const isSpace = char === ' '
                const delay = idx * 0.06

                if (isSpace) {
                  return (
                    <span key={idx} style={{ width: 10 }} aria-hidden>
                      &nbsp;
                    </span>
                  )
                }

                return (
                  <motion.span
                    key={idx}
                    aria-hidden
                    className="inline-block"
                    initial={{ y: 0, rotate: 0, scale: 1 }}
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, -6, 6, 0],
                      scale: [1, 1.04, 1],
                    }}
                    transition={{
                      duration: 1.05,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatDelay: 0.6,
                      delay,
                    }}
                    whileHover={{ y: -10, scale: 1.12, rotate: 0 }}
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </motion.span>
                )
              })}
            </span>
          ) : (
            // Reduced-motion fallback: static, accessible text
            <span className="inline-block">{phrase}</span>
          )}
        </h1>
      </div>
    </section>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// Import your images — adjust paths if needed
import see from '../../assets/see.jpg'
import see2 from '../../assets/see2.jpg'
import see1 from '../../assets/see1.jpg'

const places = [
  { id: 1, title: 'Rooftop Pool', subtitle: 'City view · Heated', img: see },
  { id: 2, title: 'Infinity Pool', subtitle: 'Oceanfront · Bar', img: see2 },
  { id: 3, title: 'Private Villa Pool', subtitle: 'Secluded · Private dining', img: see1 },
  { id: 4, title: 'Lagoon Pool', subtitle: 'Family friendly · Shallow end', img: see },
  { id: 5, title: 'Sunset Pool', subtitle: 'Romantic · Sunset views', img: see2 },
]

export default function Places() {
  const trackRef = useRef(null)
  const containerRef = useRef(null)
  const [cardWidth, setCardWidth] = useState(320)
  const [visible, setVisible] = useState(3)
  const [current, setCurrent] = useState(0)
  const gap = 20 // px (matches Tailwind gap-5 approx)
  const autoplayRef = useRef(null)

  // compute sizes based on viewport
  useEffect(() => {
    function update() {
      const w = window.innerWidth
      let v = 1
      if (w >= 1024) v = 3
      else if (w >= 768) v = 2
      else v = 1
      setVisible(v)

      const container = containerRef.current
      if (!container) return
      const containerWidth = Math.min(container.clientWidth, 1120)
      const cw = Math.floor((containerWidth - gap * (v - 1)) / v)
      setCardWidth(cw)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // scroll helpers
  const scrollTo = (index) => {
    const el = trackRef.current
    if (!el) return
    const amount = index * (cardWidth + gap)
    el.scrollTo({ left: amount, behavior: 'smooth' })
  }

  const next = () => {
    const maxIndex = Math.max(0, Math.ceil(places.length - visible))
    const nextIndex = Math.min(current + 1, maxIndex)
    setCurrent(nextIndex)
    scrollTo(nextIndex)
  }

  const prev = () => {
    const prevIndex = Math.max(0, current - 1)
    setCurrent(prevIndex)
    scrollTo(prevIndex)
  }

  // sync current index with manual scroll (drag / wheel)
  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const left = el.scrollLeft
        const idx = Math.round(left / (cardWidth + gap))
        setCurrent(idx)
        ticking = false
      })
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [cardWidth, gap])

  // keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, cardWidth, visible])

  // autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      const maxIndex = Math.max(0, Math.ceil(places.length - visible))
      setCurrent((c) => {
        const nextIdx = c >= maxIndex ? 0 : c + 1
        scrollTo(nextIdx)
        return nextIdx
      })
    }, 4000)
    return () => clearInterval(autoplayRef.current)
  }, [cardWidth, visible])

  return (
    <section className="py-12 bg-gray-50" aria-label="Popular places">
      <div className="max-w-7xl mx-auto px-4" ref={containerRef}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">Popular Places</h2>
            <p className="text-sm text-slate-500">Hand-picked stays our customers love</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous"
              className="p-2 rounded-full bg-white shadow hover:scale-105 transition-transform"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="p-2 rounded-full bg-emerald-600 text-white shadow hover:bg-emerald-700 transition-colors"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar overflow-x-auto snap-x snap-mandatory flex gap-5 py-2 px-1"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {places.map((p) => (
            <article
              key={p.id}
              className="snap-start flex-shrink-0 rounded-2xl overflow-hidden bg-white shadow-md relative"
              style={{ width: `${cardWidth}px` }}
              aria-label={p.title}
            >
              <div className="relative h-56">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute left-4 bottom-4 text-white">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm opacity-80">{p.subtitle}</p>
                </div>
                {/* <div className="absolute right-4 top-4 bg-white/90 rounded-full px-3 py-1 text-sm font-medium text-slate-800">New</div> */}
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">From</p>
                  <div className="text-lg font-semibold text-slate-900">$129</div>
                </div>

                {/* <button className="rounded-full bg-emerald-600 text-white px-4 py-2 text-sm font-medium shadow hover:bg-emerald-700 focus:outline-none">Reserve</button> */}
              </div>
            </article>
          ))}
        </div>

        {/* dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: Math.max(1, Math.ceil(places.length - (visible - 1))) }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); scrollTo(i) }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 transition-all duration-200 ${current === i ? 'w-9 bg-emerald-700 rounded-full' : 'w-2.5 bg-slate-300 rounded-full'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

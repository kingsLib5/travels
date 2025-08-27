import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaStar, FaHeart } from 'react-icons/fa'
import { IoIosWater } from 'react-icons/io'

// Import your images — adjust paths if needed
import see from '../../assets/see.jpg'
import see2 from '../../assets/see2.jpg'
import see1 from '../../assets/see1.jpg'

const places = [
  { id: 1, title: 'Rooftop Pool', subtitle: 'City view · Heated', img: see, price: 129, rating: 4.8, reviews: 142, isNew: true },
  { id: 2, title: 'Infinity Pool', subtitle: 'Oceanfront · Bar', img: see2, price: 199, rating: 4.9, reviews: 213, isFavorite: true },
  { id: 3, title: 'Private Villa Pool', subtitle: 'Secluded · Private dining', img: see1, price: 325, rating: 4.7, reviews: 87 },
  { id: 4, title: 'Lagoon Pool', subtitle: 'Family friendly · Shallow end', img: see, price: 159, rating: 4.6, reviews: 104, isNew: true },
  { id: 5, title: 'Sunset Pool', subtitle: 'Romantic · Sunset views', img: see2, price: 179, rating: 4.8, reviews: 156 },
]

export default function Places() {
  const trackRef = useRef(null)
  const containerRef = useRef(null)
  const [cardWidth, setCardWidth] = useState(320)
  const [visible, setVisible] = useState(3)
  const [current, setCurrent] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const gap = 20 // px (matches Tailwind gap-5 approx)
  const autoplayRef = useRef(null)

  // compute sizes based on viewport
  useEffect(() => {
    function update() {
      const w = window.innerWidth
      let v = 1
      if (w >= 1280) v = 4
      else if (w >= 1024) v = 3
      else if (w >= 768) v = 2
      else v = 1
      setVisible(v)

      const container = containerRef.current
      if (!container) return
      const containerWidth = Math.min(container.clientWidth, 1280)
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

  // autoplay with pause on hover
  useEffect(() => {
    if (isHovering) return
    
    autoplayRef.current = setInterval(() => {
      const maxIndex = Math.max(0, Math.ceil(places.length - visible))
      setCurrent((c) => {
        const nextIdx = c >= maxIndex ? 0 : c + 1
        scrollTo(nextIdx)
        return nextIdx
      })
    }, 4000)
    
    return () => clearInterval(autoplayRef.current)
  }, [cardWidth, visible, isHovering])

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white" aria-label="Popular places">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Popular Pool Destinations</h2>
            <p className="text-lg text-slate-600">Hand-picked luxury stays our guests love</p>
          </div>

          <div className="flex items-center gap-3 self-end">
            <button
              onClick={prev}
              aria-label="Previous"
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-slate-700 hover:text-emerald-600"
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="p-3 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-300"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar overflow-x-auto snap-x snap-mandatory flex gap-5 py-4 px-1"
          style={{ scrollSnapType: 'x mandatory' }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {places.map((p) => (
            <article
              key={p.id}
              className="snap-start flex-shrink-0 rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 relative group"
              style={{ width: `${cardWidth}px` }}
              aria-label={p.title}
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {p.isNew && (
                    <span className="bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">New</span>
                  )}
                  <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 hover:text-rose-500 transition-colors">
                    <FaHeart className={p.isFavorite ? "text-rose-500" : ""} />
                  </button>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{p.title}</h3>
                  <p className="text-sm opacity-90 flex items-center gap-1 mb-2">
                    <IoIosWater className="text-blue-200" />
                    {p.subtitle}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                      <FaStar className="text-amber-400 text-xs" />
                      <span className="text-sm font-medium">{p.rating}</span>
                      <span className="text-xs opacity-80">({p.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Starting from</p>
                  <div className="text-xl font-bold text-slate-900">${p.price}
                    <span className="text-sm font-normal text-slate-600"> / night</span>
                  </div>
                </div>

                <button className="rounded-full bg-emerald-600 text-white px-5 py-2.5 text-sm font-medium shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                  Reserve
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: Math.max(1, Math.ceil(places.length - (visible - 1))) }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); scrollTo(i) }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-3 transition-all duration-300 rounded-full ${current === i ? 'w-8 bg-emerald-600' : 'w-3 bg-slate-300 hover:bg-slate-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
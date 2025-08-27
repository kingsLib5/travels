import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlane, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaStar, FaHeart, FaInfoCircle } from 'react-icons/fa'

// Import your images (adjust paths if your file structure is different)
import see1 from '../../assets/see1.jpg'
import see2 from '../../assets/see2.jpg'
import see3 from '../../assets/see.jpg'

export default function Packages() {
  const packages = [
    {
      id: 1,
      city: 'Las Vegas',
      title: 'Virgin Hotels Las Vegas — Curio Collection',
      nights: 14,
      flight: 2300,
      hotel: 3000,
      img: see1,
      rating: 4.8,
      reviews: 142,
      discount: 15,
      isFeatured: true,
    },
    {
      id: 2,
      city: 'Los Angeles',
      title: 'Downtown Luxe Hotel',
      nights: 7,
      flight: 800,
      hotel: 900,
      img: see2,
      rating: 4.5,
      reviews: 89,
      discount: 10,
    },
    {
      id: 3,
      city: 'New York',
      title: 'Midtown Boutique Stay',
      nights: 5,
      flight: 450,
      hotel: 600,
      img: see1,
      rating: 4.7,
      reviews: 112,
      discount: 5,
    },
    {
      id: 4,
      city: 'Miami',
      title: 'Oceanfront Resort',
      nights: 10,
      flight: 700,
      hotel: 1200,
      img: see3,
      rating: 4.9,
      reviews: 204,
      discount: 20,
      isFeatured: true,
    },
    {
      id: 5,
      city: 'Chicago',
      title: 'Lakeside Luxury Suites',
      nights: 8,
      flight: 600,
      hotel: 1100,
      img: see2,
      rating: 4.6,
      reviews: 97,
      discount: 12,
    },
    {
      id: 6,
      city: 'San Francisco',
      title: 'Bay View Hotel',
      nights: 6,
      flight: 550,
      hotel: 950,
      img: see1,
      rating: 4.4,
      reviews: 78,
      discount: 8,
    },
    {
      id: 7,
      city: 'Orlando',
      title: 'Theme Park Resort',
      nights: 7,
      flight: 400,
      hotel: 850,
      img: see3,
      rating: 4.3,
      reviews: 121,
      discount: 15,
    },
  ]

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const card = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
  }

  // Carousel refs / state
  const trackRef = useRef(null)
  const [cardWidth, setCardWidth] = useState(320)
  const [visibleCards, setVisibleCards] = useState(1)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    function updateSizes() {
      const width = window.innerWidth
      // set how many cards should be visible depending on screen size
      if (width >= 1280) setVisibleCards(4)
      else if (width >= 1024) setVisibleCards(3)
      else if (width >= 768) setVisibleCards(2)
      else setVisibleCards(1)
      // card width will be a fraction of the container max width (max-w-7xl is roughly 1120px)
      const containerMax = Math.min(width - 48, 1280)
      setCardWidth(Math.floor(containerMax / Math.max(1, Math.min(4, visibleCards))))
    }

    updateSizes()
    window.addEventListener('resize', updateSizes)
    return () => window.removeEventListener('resize', updateSizes)
  }, [visibleCards])

  const scrollBy = (dir = 'next') => {
    const el = trackRef.current
    if (!el) return
    // amount to scroll: one card width + gap (gap-8 in tailwind ~ 32px)
    const gap = 32
    const amount = cardWidth + gap
    if (dir === 'next') {
      el.scrollBy({ left: amount, behavior: 'smooth' })
      setCurrentIndex(prev => Math.min(prev + 1, packages.length - visibleCards))
    } else {
      el.scrollBy({ left: -amount, behavior: 'smooth' })
      setCurrentIndex(prev => Math.max(prev - 1, 0))
    }
  }

  // Keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') scrollBy('next')
      if (e.key === 'ArrowLeft') scrollBy('prev')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cardWidth, visibleCards])

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-16">
      {/* HERO / header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl rounded-2xl overflow-hidden shadow-2xl relative"
      >
        <div 
          className="h-80 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${see2})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-900/40 flex items-end">
            <div className="p-8 sm:p-12 text-white">
              <div className="inline-flex items-center gap-2 bg-emerald-500/90 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                <FaStar className="text-amber-300" />
                <span>Exclusive Deals</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">TOP TRAVEL PACKAGES</h2>
              <p className="text-slate-200 max-w-xl text-lg">Hand-picked flight + hotel packages — great prices, flexible dates.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Carousel header with controls */}
      <div className="mx-auto mt-12 max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Featured Packages</h3>
          <p className="text-slate-600 mt-1">Swipe or use arrows to browse exclusive deals</p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.ceil(packages.length / visibleCards) }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = trackRef.current
                  if (el) {
                    const gap = 32
                    const amount = i * (cardWidth + gap)
                    el.scrollTo({ left: amount, behavior: 'smooth' })
                    setCurrentIndex(i)
                  }
                }}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === i ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-300'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous"
              onClick={() => scrollBy('prev')}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all"
            >
              <FaChevronLeft className="text-slate-700" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next"
              onClick={() => scrollBy('next')}
              className="p-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <FaChevronRight />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Carousel track */}
      <div
        ref={trackRef}
        className="mx-auto mt-8 max-w-7xl overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-8 py-4 px-2"
        style={{ scrollSnapType: 'x mandatory' }}
        onScroll={(e) => {
          const scrollLeft = e.currentTarget.scrollLeft
          const gap = 32
          const newIndex = Math.round(scrollLeft / (cardWidth + gap))
          setCurrentIndex(newIndex)
        }}
      >
        {packages.map((p) => {
          const total = p.flight + p.hotel
          const discountedTotal = total * (1 - p.discount / 100)
          
          return (
            <motion.article
              key={p.id}
              className="snap-start flex-shrink-0 rounded-2xl bg-white shadow-lg overflow-hidden flex flex-col group"
              style={{ width: `${Math.min(cardWidth, 380)}px` }}
              variants={card}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={p.img}
                  alt={`${p.city} preview`}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                
                <div className="absolute left-3 top-3 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-medium">
                  <FaMapMarkerAlt className="text-emerald-500" /> <span className="font-semibold">{p.city}</span>
                </div>
                
                <div className="absolute right-3 top-3 flex items-center gap-2">
                  <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 hover:text-rose-500 transition-colors">
                    <FaHeart />
                  </button>
                  
                  {p.isFeatured && (
                    <div className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="absolute right-3 bottom-3 inline-flex items-center gap-2 bg-black/60 text-white rounded-full px-3 py-1.5 text-xs backdrop-blur-sm">
                  <FaPlane className="text-blue-300" /> <span>{p.nights} nights</span>
                </div>
                
                {p.discount > 0 && (
                  <div className="absolute left-3 bottom-3 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Save {p.discount}%
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-amber-400 text-sm" />
                      <span className="text-sm font-semibold text-slate-800">{p.rating}</span>
                    </div>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 text-sm">{p.reviews} reviews</span>
                  </div>
                  
                  <h4 className="text-lg font-bold text-slate-900 leading-tight line-clamp-2">{p.title}</h4>

                  <div className="mt-4 text-sm text-slate-600 space-y-2">
                    <div className="flex justify-between">
                      <span>Flight package:</span>
                      <span className="font-semibold text-slate-800">${p.flight.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hotel package:</span>
                      <span className="font-semibold text-slate-800">${p.hotel.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Total (incl. taxes)</div>
                    <div className="flex items-center gap-2">
                      <div className="text-xl font-bold text-slate-900">${Math.round(discountedTotal).toLocaleString()}</div>
                      {p.discount > 0 && (
                        <div className="text-sm text-slate-400 line-through">${total.toLocaleString()}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Book ${p.city}`}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                      Book Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`View details ${p.city}`}
                      className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      <FaInfoCircle />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>

      {/* small footer CTA */}
      {/* <div className="mx-auto mt-12 max-w-7xl text-center">
        <p className="text-slate-600">
          Want different dates or a custom itinerary?{' '}
          <button className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-colors">
            Contact us
          </button>
        </p>
      </div> */}
    </section>
  )
}
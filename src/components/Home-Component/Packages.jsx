import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlane, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

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
    },
    {
      id: 2,
      city: 'Los Angeles',
      title: 'Downtown Luxe Hotel',
      nights: 7,
      flight: 800,
      hotel: 900,
      img: see2,
    },
    {
      id: 3,
      city: 'New York',
      title: 'Midtown Boutique Stay',
      nights: 5,
      flight: 450,
      hotel: 600,
      img: see1,
    },
    {
      id: 4,
      city: 'Miami',
      title: 'Oceanfront Resort',
      nights: 10,
      flight: 700,
      hotel: 1200,
      img: see3,
    },
    {
      id: 5,
      city: 'Miami',
      title: 'Oceanfront Resort',
      nights: 10,
      flight: 700,
      hotel: 1200,
      img: see3,
    },
    {
      id: 6,
      city: 'Miami',
      title: 'Oceanfront Resort',
      nights: 10,
      flight: 700,
      hotel: 1200,
      img: see3,
    },
    {
      id: 7,
      city: 'Miami',
      title: 'Oceanfront Resort',
      nights: 10,
      flight: 700,
      hotel: 1200,
      img: see3,
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

  useEffect(() => {
    function updateSizes() {
      const width = window.innerWidth
      // set how many cards should be visible depending on screen size
      if (width >= 1024) setVisibleCards(4)
      else if (width >= 768) setVisibleCards(2)
      else setVisibleCards(1)
      // card width will be a fraction of the container max width (max-w-7xl is roughly 1120px)
      const containerMax = Math.min(width - 48, 1120)
      setCardWidth(Math.floor(containerMax / Math.max(1, Math.min(4, visibleCards))))
    }

    updateSizes()
    window.addEventListener('resize', updateSizes)
    return () => window.removeEventListener('resize', updateSizes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCards])

  const scrollBy = (dir = 'next') => {
    const el = trackRef.current
    if (!el) return
    // amount to scroll: one card width + gap (gap-8 in tailwind ~ 32px)
    const gap = 32
    const amount = cardWidth + gap
    if (dir === 'next') {
      el.scrollBy({ left: amount, behavior: 'smooth' })
    } else {
      el.scrollBy({ left: -amount, behavior: 'smooth' })
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
  }, [cardWidth])

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-12">
      {/* HERO / header */}
      <div
        className="mx-auto max-w-7xl rounded-2xl overflow-hidden shadow-lg"
        style={{ backgroundImage: `url(${see2})` }}
      >
        <div className="bg-gradient-to-b from-[#036d6db4] to-transparent p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl text-gray-100 font-serif font-semibold">TOP DEALS</h2>
          <p className="mt-2 text-gray-200 max-w-xl">Hand-picked flight + hotel packages — great prices, flexible dates.</p>
        </div>
      </div>

      {/* Carousel header with controls */}
      <div className="mx-auto mt-10 max-w-7xl flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Featured Packages</h3>
          <p className="text-sm text-gray-500">Swipe or use arrows to browse deals</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Previous"
            onClick={() => scrollBy('prev')}
            className="p-2 rounded-full bg-white shadow hover:scale-105 active:scale-95"
          >
            <FaChevronLeft />
          </button>
          <button
            aria-label="Next"
            onClick={() => scrollBy('next')}
            className="p-2 rounded-full bg-teal-800 text-white shadow hover:scale-105 active:scale-95"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Carousel track */}
      <div
        ref={trackRef}
        className="mx-auto mt-6 max-w-7xl overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-8 py-2 px-2"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {packages.map((p) => {
          const total = p.flight + p.hotel
          return (
            <motion.article
              key={p.id}
              className="snap-start flex-shrink-0 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col"
              style={{ width: `${Math.min(cardWidth, 360)}px` }}
              variants={card}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(16,24,40,0.12)' }}
            >
              <div className="relative h-40 w-full">
                <img
                  src={p.img}
                  alt={`${p.city} preview`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute left-3 top-3 inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                  <FaMapMarkerAlt /> <span>{p.city}</span>
                </div>
                <div className="absolute right-3 top-3 inline-flex items-center gap-2 bg-black/50 text-white rounded-full px-3 py-1 text-xs">
                  <FaPlane /> <span>{p.nights} nights</span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm text-gray-500">{p.city}</h3>
                  <h4 className="mt-1 text-lg font-serif font-semibold text-gray-900 leading-tight">{p.title}</h4>

                  <div className="mt-3 text-sm text-gray-600 space-y-1">
                    <p>Flight package: <span className="font-medium text-gray-800">${p.flight.toLocaleString()}</span></p>
                    <p>Hotel package: <span className="font-medium text-gray-800">${p.hotel.toLocaleString()} ({p.nights} days)</span></p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Total (incl. taxes)</div>
                    <div className="text-xl font-semibold">${total.toLocaleString()}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      aria-label={`Book ${p.city}`}
                      className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
                    >
                      Book Now
                    </button>
                    <button
                      aria-label={`View details ${p.city}`}
                      className="px-3 py-2 rounded-md bg-teal-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>

      {/* small footer CTA */}
      {/* <div className="mx-auto mt-12 max-w-7xl text-center">
        <p className="text-gray-600">Want different dates or a custom itinerary? <button className="text-indigo-600 font-medium underline">Contact us</button></p>
      </div> */}
    </section>
  )
}

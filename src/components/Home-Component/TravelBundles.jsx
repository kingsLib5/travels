import React from 'react'
import { motion } from 'framer-motion'
import { FaTags, FaGift } from 'react-icons/fa'

// Update these imports to point to where your images actually live
import travels1 from '../../assets/travels.jpeg'
import travels2 from '../../assets/travels4.jpeg'
import travels3 from '../../assets/travels3.jpeg'

const cards = [
  {
    id: 1,
    title: 'Bundle & Save',
    subtitle: 'Save up to $974 with package deals',
    cta: 'Explore bundles',
    img: travels1,
    accent: 'From flights + hotels',
  },
  {
    id: 2,
    title: 'Price Drop Protection',
    subtitle: 'Get our best deals — we watch prices for you',
    cta: 'See how it works',
    img: travels2,
    accent: 'Flexible cancellations',
  },
  {
    id: 3,
    title: 'Member Perks',
    subtitle: 'Members save 10%+ on 100k+ hotels worldwide',
    cta: 'Join & save',
    img: travels3,
    accent: 'Exclusive prices',
  },
]

const containerV = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12, when: 'beforeChildren' } },
}

const cardV = {
  hidden: { opacity: 0, y: 12, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 24 } },
}

export default function TravelBundles() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-slate-800">Travel bundles & member deals</h2>
            <p className="text-sm text-slate-500 mt-1">Hand-picked bundles and protections that give you peace of mind.</p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-full bg-white border border-slate-100 shadow-sm hover:scale-[1.02] transition-transform">
              <FaTags className="w-4 h-4 text-slate-600" />
              Filters
            </button>
            <button className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-full bg-emerald-600 text-white shadow hover:bg-emerald-700 transition-colors">
              <FaGift className="w-4 h-4" />
              Offers
            </button>
          </div>
        </header>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.12 }}
        >
          {cards.map((c) => (
            <motion.article
              key={c.id}
              variants={cardV}
              whileHover={{ y: -8, boxShadow: '0 18px 40px rgba(2,6,23,0.12)' }}
              className="relative rounded-2xl overflow-hidden bg-white shadow-md flex flex-col"
              role="region"
              aria-label={c.title}
            >
              <div className="relative h-44 md:h-48 w-full">
                <img src={c.img} alt={c.title} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute left-4 bottom-4 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white">
                  {c.accent}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-semibold text-slate-800">{c.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{c.subtitle}</p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button className="text-sm text-emerald-600 font-medium hover:underline focus:outline-none">Learn more</button>
                    <span className="hidden sm:inline-block h-6 w-px bg-slate-100" />
                    <span className="text-xs text-slate-400">Limited time</span>
                  </div>

                  <motion.button whileTap={{ scale: 0.97 }} className="rounded-full bg-emerald-600 text-white px-4 py-2 text-sm font-medium shadow hover:bg-emerald-700 focus:outline-none">
                    {c.cta}
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

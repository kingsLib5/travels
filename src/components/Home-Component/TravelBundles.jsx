import React from 'react'
import { motion } from 'framer-motion'
import { FaTags, FaGift, FaArrowRight, FaCrown, FaShieldAlt, FaPiggyBank } from 'react-icons/fa'

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
    icon: <FaPiggyBank className="text-emerald-400 text-xl" />,
    gradient: 'from-blue-500/20 to-emerald-500/20'
  },
  {
    id: 2,
    title: 'Price Drop Protection',
    subtitle: 'Get our best deals — we watch prices for you',
    cta: 'See how it works',
    img: travels2,
    accent: 'Flexible cancellations',
    icon: <FaShieldAlt className="text-amber-400 text-xl" />,
    gradient: 'from-amber-500/20 to-rose-500/20'
  },
  {
    id: 3,
    title: 'Member Perks',
    subtitle: 'Members save 10%+ on 100k+ hotels worldwide',
    cta: 'Join & save',
    img: travels3,
    accent: 'Exclusive prices',
    icon: <FaCrown className="text-purple-400 text-xl" />,
    gradient: 'from-purple-500/20 to-pink-500/20'
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
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-[140px] px-4 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">Exclusive Travel Bundles & Member Deals</h2>
            <p className="text-lg text-slate-600">Hand-picked bundles and protections that give you peace of mind and extra savings.</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <FaTags className="w-4 h-4 text-slate-600" />
              Filters
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow hover:shadow-md transition-all duration-300"
            >
              <FaGift className="w-4 h-4" />
              Special Offers
            </motion.button>
          </div>
        </header>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.12 }}
        >
          {cards.map((c) => (
            <motion.article
              key={c.id}
              variants={cardV}
              whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(2,6,23,0.12)' }}
              className="relative rounded-2xl overflow-hidden bg-white shadow-lg flex flex-col group"
              role="region"
              aria-label={c.title}
            >
              <div className="relative h-52 md:h-56 w-full overflow-hidden">
                <img 
                  src={c.img} 
                  alt={c.title} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${c.gradient} opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-md text-white">
                    {c.icon}
                  </div>
                </div>
                
                <div className="absolute left-4 bottom-4 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-white font-medium">
                  {c.accent}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{c.title}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">{c.subtitle}</p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Limited time</span>
                  </div>

                  <motion.button 
                    whileTap={{ scale: 0.97 }} 
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-5 py-2.5 text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 group/btn"
                  >
                    {c.cta}
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Additional CTA at bottom */}
        
      </div>
    </section>
  )
}
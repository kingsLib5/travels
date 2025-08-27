import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GiCommercialAirplane } from 'react-icons/gi'
import { FaTwitter, FaInstagram, FaFacebookF, FaEnvelope } from 'react-icons/fa'

const companyLinks = ['About', 'Properties', 'Partnerships', 'Careers']
const exploreLinks = [
  'United States travel guide',
  'Domestic flights',
  'Hotels in United States',
  'Car rentals in United States',
]
const helpLinks = ['Support', "Your rights as a traveler", 'FAQ']

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const onceOnly = true // set false if you want animations every time

  const containerVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { when: 'beforeChildren', staggerChildren: 0.06 } },
  }

  const columnVariants = {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, when: 'beforeChildren', staggerChildren: 0.05 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 110, damping: 16 } },
  }

  function handleSubscribe(e) {
    e.preventDefault()
    setError('')
    // simple email validation
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i
    if (!re.test(email)) return setError('Please enter a valid email address.')
    setSubscribed(true)
    setEmail('')
    // simulate a small success state, in a real app you'd call your API here
    setTimeout(() => setSubscribed(false), 3500)
  }

  return (
    <footer className="bg-gray-200 text-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <AnimatePresence>
          <motion.div
            className="rounded-2xl overflow-hidden shadow-sm bg-white/80 backdrop-blur-md"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: onceOnly, amount: 0.12 }}
            variants={containerVariants}
            aria-label="site footer"
          >
            {/* Top brand section */}
            <div className="flex items-center justify-between gap-4 px-6 py-6 sm:px-10 sm:py-8 border-b">
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 }}
              >
                <motion.div
                  animate={{ rotate: [0, 8, -6, 6, 0], scale: [1, 1.05, 0.98, 1.02, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 6 }}
                  className="rounded-md p-2 bg-emerald-50"
                >
                  <GiCommercialAirplane className="text-2xl text-emerald-600" />
                </motion.div>

                <div>
                  <h3 className="text-2xl font-serif font-semibold text-emerald-700">SkyLink</h3>
                  <p className="text-sm text-slate-500">Smart trips made simple</p>
                </div>
              </motion.div>

              <div className="hidden md:flex items-center gap-3">
                <a href="#" aria-label="twitter" className="p-2 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-200">
                  <FaTwitter />
                </a>
                <a href="#" aria-label="instagram" className="p-2 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-200">
                  <FaInstagram />
                </a>
                <a href="#" aria-label="facebook" className="p-2 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-200">
                  <FaFacebookF />
                </a>
                <a href="#" aria-label="contact" className="p-2 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-200">
                  <FaEnvelope />
                </a>
              </div>

              <div className="md:hidden">
                <p className="text-sm text-slate-500">Follow us for deals</p>
              </div>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1  gap-6 p-6 sm:grid-cols-3 sm:p-8">
              <motion.div className="flex flex-col gap-4" variants={columnVariants} initial="hidden" whileInView="visible" viewport={{ once: onceOnly }}>
                <motion.h4 className="text-sm font-semibold text-slate-700" variants={itemVariants}>COMPANY</motion.h4>
                <motion.ul className="flex flex-col gap-3 text-sm text-slate-600" variants={columnVariants}>
                  {companyLinks.map((l) => (
                    <motion.li key={l} variants={itemVariants} whileHover={{ x: 6 }} className="cursor-pointer rounded-md px-1 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200">
                      <a href="#" className="block">{l}</a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              <motion.div className="flex flex-col  gap-4" variants={columnVariants} initial="hidden" whileInView="visible" viewport={{ once: onceOnly }}>
                <motion.h4 className="text-sm font-semibold text-slate-700" variants={itemVariants}>EXPLORE</motion.h4>
                <motion.ul className="flex flex-col gap-3 text-sm text-slate-600" variants={columnVariants}>
                  {exploreLinks.map((l) => (
                    <motion.li key={l} variants={itemVariants} whileHover={{ x: 6 }} className="cursor-pointer rounded-md px-1 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200">
                      <a href="#" className="block">{l}</a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              <motion.div className="flex flex-col gap-4" variants={columnVariants} initial="hidden" whileInView="visible" viewport={{ once: onceOnly }}>
                <motion.h4 className="text-sm font-semibold text-slate-700" variants={itemVariants}>HELP</motion.h4>
                <motion.ul className="flex flex-col gap-3 text-sm text-slate-600" variants={columnVariants}>
                  {helpLinks.map((l) => (
                    <motion.li key={l} variants={itemVariants} whileHover={{ x: 6 }} className="cursor-pointer rounded-md px-1 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200">
                      <a href="#" className="block">{l}</a>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Newsletter */}
                <motion.form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-3" variants={itemVariants}>
                  <label className="text-sm font-medium text-slate-700">Subscribe for deals</label>
                  <div className="flex gap-2">
                    <input
                      aria-label="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                    <button className="rounded-md bg-emerald-600 px-4 py-2 text-white text-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300">Subscribe</button>
                  </div>

                  {error && <p className="text-xs text-red-600">{error}</p>}
                  <AnimatePresence>
                    {subscribed && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-emerald-700">Thanks — you’re subscribed!</motion.p>
                    )}
                  </AnimatePresence>
                </motion.form>
              </motion.div>
            </div>

            {/* Bottom copyright + small links */}
            <div className="border-t px-6 py-4 sm:px-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-xs text-slate-500 text-center sm:text-left">© 2025 SkyLink, Inc. All rights reserved.</p>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <a href="#" className="hover:underline">Terms</a>
                  <span className="hidden sm:inline">•</span>
                  <a href="#" className="hover:underline">Privacy</a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </footer>
  )
}

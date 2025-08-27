// src/components/Further.jsx
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaApple, FaGooglePlay, FaChevronRight } from 'react-icons/fa'

// Adjust these paths if your component file is in a different folder.
// If you prefer using public/, move files to public/assets and use '/assets/see.jpg' etc.
import heroImg from '../../assets/see.jpg'
import qrImg from '../../assets/qr.png'

export default function Further() {
  const [showQR, setShowQR] = useState(false)
  const closeRef = useRef(null)

  return (
    <section className="bg-transparent py-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Left image */}
          <div className="lg:col-span-4">
            {/* Using <img> is more robust than CSS background-image for bundlers */}
            <img
              src={heroImg}
              alt="In-flight experience"
              className="w-full h-72 lg:h-full object-cover rounded-t-xl lg:rounded-tr-none lg:rounded-l-xl"
              loading="lazy"
            />
            {/* If you place the image in public/, use:
                <img src="/assets/see.jpg" ... />
            */}
          </div>

          {/* Middle content */}
          <div className="lg:col-span-6 px-6 py-8 flex flex-col justify-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800">
              Go further with SkyLink Flights
            </h2>

            {/* <p className="text-sm text-slate-600 max-w-prose leading-relaxed">
              Save on select hotels and earn <span className="font-semibold text-emerald-600">OneKeyCash</span> on bookings in the app.
              Our app deals help you travel more and manage everything on the go quick booking, mobile check-in, and exclusive member perks.
            </p> */}

           
            
          </div>

          {/* Right QR column */}
          <div className="lg:col-span-2 px-6 py-6 flex flex-col items-center justify-center border-l border-slate-100">
            <button
              onClick={() => setShowQR(true)}
              className="w-36 h-36 bg-white rounded-xl shadow-md overflow-hidden flex items-center justify-center transform hover:scale-105 transition-transform"
              aria-label="Open QR modal to download app"
            >
              <img src={qrImg} alt="Scan to download the SkyLink app" className="w-28 h-28 object-contain" />
            </button>

            <p className="text-xs text-slate-500 mt-3 text-center">Scan for discount</p>
            <a href="#" className="mt-3 text-xs text-emerald-600 hover:underline">Terms apply</a>
          </div>
        </motion.div>

        {/* QR Modal */}
        <AnimatePresence>
          {showQR && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden={!showQR}
            >
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowQR(false)}
                aria-hidden="true"
              />

              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Download SkyLink app"
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-6"
              >
                <button
                  ref={closeRef}
                  onClick={() => setShowQR(false)}
                  className="absolute right-4 top-4 z-20 rounded-full p-2 bg-white/80 hover:bg-white text-slate-600 focus:outline-none"
                  aria-label="Close"
                >
                  ✕
                </button>

                <h3 className="text-lg font-semibold text-slate-800 mb-2">Get the SkyLink app</h3>
                <p className="text-sm text-slate-600 mb-4">Scan this code using your phone's camera to open the app store page.</p>

                <div className="flex items-center justify-center">
                  <div className="w-48 h-48 bg-white rounded-lg shadow-inner overflow-hidden flex items-center justify-center">
                    <img src={qrImg} alt="QR code" className="w-40 h-40 object-contain" />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <a href="#" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-md text-sm font-medium">Open App Store</a>
                  <a href="#" className="inline-flex items-center gap-2 border border-slate-200 px-3 py-2 rounded-md text-sm">Open Google Play</a>
                </div>

                <p className="text-xs text-slate-400 mt-4">*Terms and conditions apply. App features vary by platform.</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

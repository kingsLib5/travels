import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Sectone() {
  const [currentText, setCurrentText] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const texts = [
    "Experience comfort like never before.",
    "Fly better — premium service, flexible fares.",
    "Travel in style and arrive refreshed."
  ];

  const intervalRef = useRef(null);
  const prevIndexRef = useRef(currentText);

  useEffect(() => {
    if (isPaused || isOpen) return;
    intervalRef.current = setInterval(() => {
      setCurrentText((p) => (p + 1) % texts.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, isOpen, texts.length]);

  useEffect(() => {
    prevIndexRef.current = currentText;
  }, [currentText]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cardV = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const textV = {
    initialUp: { y: -16, opacity: 0 },
    initialDown: { y: 16, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    exitUp: { y: -12, opacity: 0 },
    exitDown: { y: 12, opacity: 0 }
  };

  const modalBackdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.18 } }
  };

  const modalCard = {
    hidden: { opacity: 0, scale: 0.97, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } }
  };

  const goTo = (i) => {
    setCurrentText(i % texts.length);
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 grid h-[35vh] min-h-[400px] py-8">
      <motion.div
        variants={cardV}
        initial="hidden"
        animate="show"
        className="bg-white grid grid-cols-12 mx-6 md:mx-14 my-6 rounded-3xl shadow-xl overflow-hidden border border-gray-200"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 280 }}
          className="col-span-12 md:col-span-4 relative overflow-hidden min-h-[220px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/6 to-orange-700/6 z-10 pointer-events-none" />
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
          >
            <source src="/src/assets/newi.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        <motion.div
          className="col-span-12 md:col-span-5 flex flex-col justify-center gap-3 px-6 md:px-10 py-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <h3 className="text-sm text-slate-500 uppercase tracking-wider font-medium">Premium Air Travel</h3>

          <div className="relative h-16 md:h-20 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentText}
                initial={
                  prevIndexRef.current < currentText ? "initialDown" : "initialUp"
                }
                animate="enter"
                exit={prevIndexRef.current < currentText ? "exitUp" : "exitDown"}
                variants={{
                  initialUp: textV.initialUp,
                  initialDown: textV.initialDown,
                  enter: textV.enter,
                  exitUp: textV.exitUp,
                  exitDown: textV.exitDown
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute left-0 top-0"
              >
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight max-w-xl">
                  {texts[currentText]}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-slate-500 mt-2 max-w-lg">
            Discover a new standard of luxury and comfort in the skies — high legroom, quiet cabins, and thoughtful amenities for every traveler.
          </p>

          <div className="flex items-center gap-2 mt-4">
            {texts.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Show text ${i + 1}`}
                className={`transition-all duration-300 focus:outline-none ${
                  i === currentText
                    ? "bg-[#0f766e] w-8 h-2 rounded-full"
                    : "bg-slate-300 w-2.5 h-2.5 rounded-full"
                }`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.48 }}
          className="col-span-12 md:col-span-3 flex flex-col items-start justify-center gap-6 px-6 py-6"
        >
         <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-[86%] md:w-full bg-[#0f766e] text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-sky-200"
            >
              Learn more
            </motion.button>

          
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={modalBackdrop}
            >
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-md"
                onClick={() => setIsOpen(false)}
                aria-hidden
              />

              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="More about premium travel"
                variants={modalCard}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="relative z-10 w-full max-w-4xl bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close modal"
                  className="absolute right-6 top-6 z-20 rounded-full p-2 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 focus:outline-none transition-all duration-200 shadow-md backdrop-blur-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10" />
                    <img 
                      src="/src/assets/trav.jpg" 
                      alt="Premium cabin experience" 
                      className="w-full h-full object-cover min-h-[280px]"
                    />
                    <div className="absolute bottom-6 left-6 z-20 text-white">
                      <h3 className="text-2xl font-bold">Premium Experience</h3>
                      <p className="text-slate-100 mt-1">Elevate your journey</p>
                    </div>
                  </div>

                  <div className="md:w-3/5 p-8">
                    <div className="mb-6">
                      <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-xs font-semibold rounded-full">
                        Exclusive Offer
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Journey in Unmatched Comfort</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      Enjoy larger seats, complimentary gourmet meals, priority boarding, and a dedicated crew focused entirely on your comfort throughout the flight.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-start">
                        <div className="bg-teal-100 p-2 rounded-lg mr-3 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-slate-700">Extra legroom & reclining seats</span>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-teal-100 p-2 rounded-lg mr-3 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-slate-700">Complimentary Wi-Fi</span>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-teal-100 p-2 rounded-lg mr-3 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-slate-700">Priority check-in</span>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-teal-100 p-2 rounded-lg mr-3 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-slate-700">Gourmet meals</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        onClick={() => alert("Replace with booking flow")}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        Book Now
                      </motion.button>
                      
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-medium transition-colors"
                      >
                        Explore More Options
                      </button>
                    </div>
                    
                    <p className="text-xs text-slate-400 mt-6">
                      *Terms and conditions apply. Premium features vary by route and aircraft.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Sectone;
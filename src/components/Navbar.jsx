import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GiCommercialAirplane } from 'react-icons/gi'
import { BsChatSquareTextFill, BsPersonCircle, BsSearch } from 'react-icons/bs'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaPlane, FaHotel, FaCar, FaGift, FaSearch, FaUserPlus } from 'react-icons/fa'

const options = [
  { value: 'Flight', icon: <FaPlane className="text-base" />, color: 'text-blue-500' },
  { value: 'Hotels', icon: <FaHotel className="text-base" />, color: 'text-emerald-500' },
  { value: 'Cars', icon: <FaCar className="text-base" />, color: 'text-amber-500' },
  { value: 'Packages', icon: <FaGift className="text-base" />, color: 'text-purple-500' },
]

const navItems = [
  { id: 'support', label: 'Support' },
  { id: 'chat', label: 'Chat', icon: <BsChatSquareTextFill /> },
  { id: 'signin', label: 'Sign in', icon: <BsPersonCircle /> },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Shop Travels')
  const [hoveredNavItem, setHoveredNavItem] = useState(null)
  const [query, setQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  const dropdownRef = useRef(null)
  const menuRef = useRef(null)

  // Detect scroll for header style change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function onDoc(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function handleOptionSelect(option) {
    setSelectedOption(option)
    setIsDropdownOpen(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false)
      setIsMenuOpen(false)
    }
  }

  // subtle motion variants
  const logoMotion = {
    animate: { 
      rotate: [0, 8, -6, 6, 0], 
      scale: [1, 1.06, 0.98, 1.02, 1],
      transition: { duration: 2, repeat: Infinity, repeatDelay: 6 }
    },
  }

  return (
    <motion.header
      onKeyDown={handleKeyDown}
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.06 }}
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 shadow-lg border-b border-slate-200/80' 
          : 'bg-white/80 border-b border-slate-100'
      }`}
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
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
          

          {/* Middle: Search / Dropdown (desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-center px-6">
            <div className="relative w-full max-w-2xl">
              <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
                <div ref={dropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsDropdownOpen((s) => !s)}
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium shadow-md border border-slate-200 hover:shadow-lg transition-all"
                  >
                    <span className="text-slate-700 font-medium">{selectedOption}</span>
                    <motion.svg 
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      className="h-4 w-4 text-slate-500" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.3a.75.75 0 01.02-1.09z" clipRule="evenodd" />
                    </motion.svg>
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.ul
                        role="listbox"
                        initial={{ opacity: 0, y: -6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.95 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="absolute left-0 mt-2 w-52 overflow-hidden rounded-xl bg-white shadow-xl border border-slate-100/80 backdrop-blur-md"
                      >
                        {options.map((opt) => (
                          <motion.li
                            key={opt.value}
                            onClick={() => handleOptionSelect(opt.value)}
                            whileHover={{ backgroundColor: '#f0fdfa' }}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 cursor-pointer transition-colors"
                            role="option"
                          >
                            <span className={`${opt.color}`}>{opt.icon}</span>
                            <span className="font-medium">{opt.value}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center border border-slate-200 rounded-full bg-white shadow-sm pl-44 pr-2 py-1 hover:shadow-md transition-shadow">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search flights, hotels, packages..."
                  className="flex-1 bg-transparent outline-none px-4 py-2.5 text-sm text-slate-700 placeholder-slate-500"
                  aria-label="Search"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-2 rounded-full p-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md hover:shadow-lg transition-all"
                >
                  <FaSearch />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right: Desktop nav & actions */}
          <div className="hidden md:flex items-center gap-6">
            <nav aria-label="Primary" className="flex items-center gap-6">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onMouseEnter={() => setHoveredNavItem(item.id)}
                  onMouseLeave={() => setHoveredNavItem(null)}
                  whileHover={{ y: -2 }}
                  className="relative flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-emerald-600 focus:outline-none transition-colors"
                >
                  {item.icon && <span className="text-emerald-500">{item.icon}</span>}
                  <span>{item.label}</span>
                  <motion.span
                    className="absolute left-0 bottom-[-6px] h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredNavItem === item.id ? '100%' : 0 }}
                    transition={{ duration: 0.22 }}
                  />
                </motion.button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-2.5 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <FaUserPlus className="text-xs" />
                Sign up
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen((s) => !s)} 
              aria-label="Open menu" 
              className="p-2.5 rounded-xl bg-white shadow-md hover:shadow-lg transition-all"
            >
              {isMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md"
          >
            <div className="px-4 py-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  <div className="rounded-xl p-2 bg-gradient-to-br from-emerald-500 to-teal-400 shadow-md">
                    <GiCommercialAirplane className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">SkyLink</h3>
                    <p className="text-xs text-slate-500">Smart trips made simple</p>
                  </div>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg bg-slate-100"
                >
                  <FiX className="text-lg" />
                </motion.button>
              </div>

              <div className="mb-5">
                <div className="mb-2 text-sm font-medium text-slate-700">Search</div>
                <div className="flex items-center gap-2">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search flights, hotels..."
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 p-3 text-white shadow-md"
                  >
                    <BsSearch />
                  </motion.button>
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-3 text-sm font-medium text-slate-700">Quick actions</div>
                <div className="grid grid-cols-2 gap-3">
                  {options.map((o) => (
                    <motion.button 
                      key={o.value} 
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleOptionSelect(o.value)} 
                      className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:bg-emerald-50 transition-colors shadow-sm"
                    >
                      <span className={o.color}>{o.icon}</span>
                      <span className="font-medium">{o.value}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {navItems.map((n) => (
                  <motion.button 
                    key={n.id} 
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 flex items-center gap-3 transition-colors"
                  >
                    {n.icon && <span className="text-emerald-500">{n.icon}</span>}
                    <span className="text-slate-700 font-medium">{n.label}</span>
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-3">
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-xl border border-emerald-500 px-4 py-3 text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  List property
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-3 text-white font-medium shadow-md"
                >
                  Sign up
                </motion.button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
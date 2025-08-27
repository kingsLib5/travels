import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GiCommercialAirplane } from 'react-icons/gi'
import { BsChatSquareTextFill, BsPersonCircle } from 'react-icons/bs'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaPlane, FaHotel, FaCar, FaGift, FaSearch } from 'react-icons/fa'

const options = [
  { value: 'Flight', icon: <FaPlane className="text-base" /> },
  { value: 'Hotels', icon: <FaHotel className="text-base" /> },
  { value: 'Cars', icon: <FaCar className="text-base" /> },
  { value: 'Packages', icon: <FaGift className="text-base" /> },
]

const navItems = [
  // { id: 'property', label: 'List your property' },
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

  const dropdownRef = useRef(null)
  const menuRef = useRef(null)

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
    animate: { rotate: [0, 8, -6, 6, 0], scale: [1, 1.06, 0.98, 1.02, 1] },
    transition: { duration: 2, repeat: Infinity, repeatDelay: 6 },
  }

  return (
    <motion.header
      onKeyDown={handleKeyDown}
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.06 }}
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm bg-white/70 border-b border-slate-100"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <motion.div {...logoMotion} className="rounded-lg p-2 bg-emerald-50">
              <GiCommercialAirplane className="text-2xl text-emerald-600" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-serif font-semibold text-emerald-700">SkyLink</h1>
              <p className="text-xs text-slate-500">Smart trips made simple</p>
            </div>
          </div>

          {/* Middle: Search / Dropdown (desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-center px-6">
            <div className="relative w-full max-w-2xl">
              <div className="absolute left-2 top-1/2 -translate-y-1/2">
                <div ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen((s) => !s)}
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm font-medium shadow-sm border border-slate-100"
                  >
                    <span className="text-slate-600">{selectedOption}</span>
                    <svg className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.3a.75.75 0 01.02-1.09z" clipRule="evenodd" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.ul
                        role="listbox"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="absolute left-0 mt-2 w-52 overflow-hidden rounded-xl bg-white shadow-lg border border-slate-100"
                      >
                        {options.map((opt) => (
                          <motion.li
                            key={opt.value}
                            onClick={() => handleOptionSelect(opt.value)}
                            whileHover={{ backgroundColor: '#ecfdf5' }}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 cursor-pointer"
                            role="option"
                          >
                            <span className="text-emerald-500">{opt.icon}</span>
                            <span>{opt.value}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center border border-slate-100 rounded-full bg-white/90 shadow-sm pl-44 pr-2 py-1">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search flights, hotels, packages..."
                  className="flex-1 bg-transparent outline-none px-4 py-2 text-sm text-slate-700"
                  aria-label="Search"
                />
                <button className="ml-2 rounded-full px-3 py-2 bg-emerald-600 text-white shadow hover:bg-emerald-700">
                  <FaSearch />
                </button>
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
                  className="relative flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-600 focus:outline-none"
                >
                  {item.icon && <span className="text-emerald-500">{item.icon}</span>}
                  <span>{item.label}</span>
                  <motion.span
                    className="absolute left-0 bottom-[-6px] h-0.5 bg-emerald-400"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredNavItem === item.id ? '100%' : 0 }}
                    transition={{ duration: 0.22 }}
                  />
                </motion.button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {/* <button className="hidden lg:inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium border border-emerald-100 hover:bg-emerald-100">
                List property
              </button> */}
              <button className="rounded-full bg-emerald-600 px-3 py-2 text-white text-sm font-medium shadow hover:bg-emerald-700">Sign up</button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen((s) => !s)} aria-label="Open menu" className="p-2 rounded-md bg-white/80 shadow">
              {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
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
            transition={{ duration: 0.28 }}
            className="md:hidden border-t border-slate-100 bg-white/95"
          >
            <div className="px-4 py-4">
              <div className="mb-4">
                <div className="flex gap-3">
                  <div className="rounded-md p-2 bg-emerald-50">
                    <GiCommercialAirplane className="text-2xl text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-700">SkyLink</h3>
                    <p className="text-xs text-slate-500">Smart trips made simple</p>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="mb-2 text-sm font-medium">Search</div>
                <div className="flex items-center gap-2">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search flights, hotels..."
                    className="flex-1 rounded-lg border border-slate-100 px-3 py-2 text-sm outline-none"
                  />
                  <button className="rounded-md bg-emerald-600 px-3 py-2 text-white">
                    <FaSearch />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-2 text-sm font-medium">Quick actions</div>
                <div className="grid grid-cols-2 gap-2">
                  {options.map((o) => (
                    <button key={o.value} onClick={() => handleOptionSelect(o.value)} className="flex items-center gap-2 rounded-lg border border-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50">
                      <span className="text-emerald-500">{o.icon}</span>
                      <span>{o.value}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {navItems.map((n) => (
                  <button key={n.id} className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-3">
                    {n.icon && <span className="text-emerald-500">{n.icon}</span>}
                    <span className="text-slate-700">{n.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4 flex gap-3">
                <button className="flex-1 rounded-md border border-emerald-100 px-3 py-2 text-sm">List property</button>
                <button className="flex-1 rounded-md bg-emerald-600 px-3 py-2 text-white">Sign up</button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

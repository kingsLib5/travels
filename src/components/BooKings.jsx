import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plane,
  Building,
  Car,
  Package as PackageIcon,
  MapPin,
  Calendar,
  Users,
  Search as SearchIcon,
  ArrowRight,
  ChevronDown,
  RotateCcw
} from 'lucide-react'

export default function Bookings() {
  const tabs = [
    { id: 'flights', label: 'Flights', Icon: Plane, color: 'from-blue-500 to-blue-600' },
    { id: 'hotels', label: 'Hotels', Icon: Building, color: 'from-emerald-500 to-emerald-600' },
    { id: 'cars', label: 'Car Rentals', Icon: Car, color: 'from-amber-500 to-amber-600' },
    { id: 'packages', label: 'Packages', Icon: PackageIcon, color: 'from-purple-500 to-purple-600' },
  ]

  const today = new Date().toISOString().split('T')[0]

  // Form state
  const [activeTab, setActiveTab] = useState('flights')
  const [form, setForm] = useState({
    from: '',
    to: '',
    depart: today,
    ret: '',
    destination: '',
    checkin: today,
    checkout: '',
    pickup: '',
    pickupDate: today,
    returnDate: '',
    travelers: 1,
    passengers: '1 Adult',
    travelClass: 'Economy',
    roundTrip: true,
  })

  const [searching, setSearching] = useState(false)
  const tabsRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // hide return date for one-way flights
    if (!form.roundTrip) setForm((s) => ({ ...s, ret: '' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.roundTrip])

  // keyboard navigation for tabs
  function onTabsKeyDown(e) {
    const idx = tabs.findIndex((t) => t.id === activeTab)
    if (e.key === 'ArrowRight') setActiveTab(tabs[(idx + 1) % tabs.length].id)
    if (e.key === 'ArrowLeft') setActiveTab(tabs[(idx - 1 + tabs.length) % tabs.length].id)
  }

  function update(field, value) {
    setForm((s) => ({ ...s, [field]: value }))
  }

  function isSearchDisabled() {
    if (activeTab === 'flights') return !form.from || !form.to || !form.depart
    if (activeTab === 'hotels') return !form.destination || !form.checkin
    if (activeTab === 'cars') return !form.pickup || !form.pickupDate
    if (activeTab === 'packages') return !form.destination || !form.travelers
    return false
  }

  function handleSearch() {
    setSearching(true)
    // Example: in a real app you'd call your API here
    setTimeout(() => {
      setSearching(false)
      // for demo show values in console
      console.log('Search payload', { tab: activeTab, form })
      alert(`Searching ${activeTab} – check console for payload`)
    }, 900)
  }

  // small presentational input with icon
  const Input = ({ icon: Icon, ...props }) => (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />}
      <input
        {...props}
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white shadow-sm transition-all"
      />
    </div>
  )

  return (
    <section className="min-h-[60vh] mt-12 py-16 bg-[url(./assets/trav.jpg)] bg-no-repeat bg-cover bg-center ">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
        >
          <header className="px-8 py-6 md:flex md:items-center md:justify-between border-b border-slate-100">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Plan Your Journey</h2>
              <p className="text-slate-600 mt-1">Find the best deals for your next adventure</p>
            </div>
            <div className="mt-4 md:mt-0">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2.5 text-sm font-medium text-emerald-700 shadow-sm border border-emerald-100"
              >
                <Calendar className="w-4 h-4" />
                <span>Flexible Dates</span>
              </motion.div>
            </div>
          </header>

          {/* Tabs */}
          <nav
            ref={tabsRef}
            onKeyDown={onTabsKeyDown}
            aria-label="Booking types"
            className="flex gap-2 px-6 py-4 border-b border-slate-100 overflow-auto bg-slate-50"
          >
            {tabs.map((t) => (
              <motion.button
                key={t.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(t.id)}
                aria-selected={activeTab === t.id}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 focus:outline-none ${
                  activeTab === t.id
                    ? ` bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md`
                    : 'text-slate-700 hover:bg-white hover:shadow-sm'
                }`}
              >
                <t.Icon className="w-4 h-4" />
                <span>{t.label}</span>
                {activeTab === t.id && (
                  <motion.div 
                    className="absolute inset-0 rounded-xl border-2 border-emerald-400/30"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.28 }}
              >
                {/* Flights */}
                {activeTab === 'flights' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">From</label>
                      <Input
                        icon={MapPin}
                        placeholder="Departure city"
                        value={form.from}
                        onChange={(e) => update('from', e.target.value)}
                        aria-label="Departure city"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">To</label>
                      <Input
                        icon={MapPin}
                        placeholder="Destination city"
                        value={form.to}
                        onChange={(e) => update('to', e.target.value)}
                        aria-label="Destination city"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700">Departure</label>
                        <label className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer">
                          <div className="relative inline-flex items-center">
                            <input
                              type="checkbox"
                              checked={form.roundTrip}
                              onChange={(e) => update('roundTrip', e.target.checked)}
                              className="sr-only"
                            />
                            <div className={`w-10 h-5 rounded-full transition-colors ${form.roundTrip ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                            <div className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.roundTrip ? 'transform translate-x-5' : ''}`} />
                          </div>
                          Round trip
                        </label>
                      </div>

                      <Input
                        icon={Calendar}
                        type="date"
                        value={form.depart}
                        onChange={(e) => update('depart', e.target.value)}
                        min={today}
                        aria-label="Departure date"
                      />

                      {form.roundTrip && (
                        <div className="mt-3">
                          <label className="text-sm font-medium text-slate-700 mb-2 block">Return</label>
                          <Input
                            icon={Calendar}
                            type="date"
                            value={form.ret}
                            onChange={(e) => update('ret', e.target.value)}
                            min={form.depart || today}
                            aria-label="Return date"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Hotels */}
                {activeTab === 'hotels' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Destination</label>
                      <Input
                        icon={MapPin}
                        placeholder="Where are you going?"
                        value={form.destination}
                        onChange={(e) => update('destination', e.target.value)}
                        aria-label="Hotel destination"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Check-in</label>
                      <Input
                        icon={Calendar}
                        type="date"
                        value={form.checkin}
                        onChange={(e) => update('checkin', e.target.value)}
                        min={today}
                        aria-label="Check-in date"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Check-out</label>
                      <Input
                        icon={Calendar}
                        type="date"
                        value={form.checkout}
                        onChange={(e) => update('checkout', e.target.value)}
                        min={form.checkin || today}
                        aria-label="Check-out date"
                      />
                    </div>
                  </div>
                )}

                {/* Cars */}
                {activeTab === 'cars' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Pick-up</label>
                      <Input
                        icon={MapPin}
                        placeholder="Pick-up location"
                        value={form.pickup}
                        onChange={(e) => update('pickup', e.target.value)}
                        aria-label="Pick-up location"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Pick-up Date</label>
                      <Input
                        icon={Calendar}
                        type="date"
                        value={form.pickupDate}
                        onChange={(e) => update('pickupDate', e.target.value)}
                        min={today}
                        aria-label="Pick-up date"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Return Date</label>
                      <Input
                        icon={Calendar}
                        type="date"
                        value={form.returnDate}
                        onChange={(e) => update('returnDate', e.target.value)}
                        min={form.pickupDate || today}
                        aria-label="Return date"
                      />
                    </div>
                  </div>
                )}

                {/* Packages */}
                {activeTab === 'packages' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Destination</label>
                      <Input
                        icon={MapPin}
                        placeholder="Where do you want to go?"
                        value={form.destination}
                        onChange={(e) => update('destination', e.target.value)}
                        aria-label="Package destination"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Travel Date</label>
                      <Input
                        icon={Calendar}
                        type="date"
                        value={form.depart}
                        onChange={(e) => update('depart', e.target.value)}
                        min={today}
                        aria-label="Travel date"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Travelers</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white shadow-sm appearance-none"
                          value={form.travelers}
                          onChange={(e) => update('travelers', Number(e.target.value))}
                          aria-label="Number of travelers"
                        >
                          <option value={1}>1 Traveler</option>
                          <option value={2}>2 Travelers</option>
                          <option value={3}>3 Travelers</option>
                          <option value={4}>4+ Travelers</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional options */}
                <motion.div 
                  initial={false}
                  animate={{ height: isExpanded ? 'auto' : '0' }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t mt-6">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Passengers</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white shadow-sm appearance-none"
                          value={form.passengers}
                          onChange={(e) => update('passengers', e.target.value)}
                        >
                          <option>1 Adult</option>
                          <option>2 Adults</option>
                          <option>2 Adults, 1 Child</option>
                          <option>2 Adults, 2 Children</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Class</label>
                      <div className="relative">
                        <select
                          className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white shadow-sm appearance-none"
                          value={form.travelClass}
                          onChange={(e) => update('travelClass', e.target.value)}
                        >
                          <option>Economy</option>
                          <option>Premium Economy</option>
                          <option>Business</option>
                          <option>First Class</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="flex justify-between items-center pt-6">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-sm text-emerald-600 font-medium flex items-center gap-1 hover:text-emerald-700 transition-colors"
                  >
                    {isExpanded ? 'Fewer options' : 'More options'}
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </button>

                  {/* Search */}
                  <motion.button
                    onClick={handleSearch}
                    disabled={isSearchDisabled() || searching}
                    whileHover={isSearchDisabled() || searching ? {} : { scale: 1.05 }}
                    whileTap={isSearchDisabled() || searching ? {} : { scale: 0.95 }}
                    className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all ${
                      isSearchDisabled() || searching
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:shadow-xl'
                    }`}
                    aria-disabled={isSearchDisabled() || searching}
                  >
                    {searching ? (
                      <>
                        <RotateCcw className="w-4 h-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <SearchIcon className="w-4 h-4" />
                        Search {tabs.find((t) => t.id === activeTab).label}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
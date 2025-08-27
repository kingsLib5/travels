// filepath: c:/Users/User/Desktop/travels/src/pages/Home.jsx
import React from 'react'
import Sectone from '../components/Home-Component/Sectone'
import TravelBundles from '../components/Home-Component/TravelBundles'
import Packages from '../components/Home-Component/Packages'
import Places from '../components/Home-Component/Places'
import Space from '../components/Home-Component/Spacess'
import Further from '../components/Home-Component/Further'

function Home() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className=" top-0 fixed left-0 w-full h-full object-cover -z-10"
        src="/src/assets/add.mp4" 
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay (optional, adds better text contrast) */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      

      {/* Page Content */}
      <div className="relative z-10 grid">
        <Sectone />
        <TravelBundles />
        <Packages />
        <Space />
        <Places />
        <Further/>
      </div>
    </div>
  )
}

export default Home

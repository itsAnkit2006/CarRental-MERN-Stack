import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import Sidebar from './Sidebar'

const NavbarOwner = () => {

  const { user } = useAppContext()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* NAVBAR */}
      <div className="
        flex items-center justify-between
        px-4 md:px-10 py-4
        bg-[#0B0B0B] text-white
        border-b border-yellow-500/15
        sticky top-0 z-50
      ">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
          >
            <img src={assets.menu_icon} className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img src={assets.logo} alt="logo" className="h-7" />
          </Link>
        </div>

        {/* RIGHT */}
        <p className="text-sm md:text-base text-gray-200">
          Welcome, <span className="text-primary font-semibold">
            {user?.name || "Owner"}
          </span>
        </p>
      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="fixed inset-0 z-[999] flex">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="
            relative w-64 h-full
            bg-[#0B0B0B]
            border-r border-yellow-500/15
            animate-slideIn
          ">
            <Sidebar mobile/>
          </div>
        </div>
      )}
    </>
  )
}

export default NavbarOwner

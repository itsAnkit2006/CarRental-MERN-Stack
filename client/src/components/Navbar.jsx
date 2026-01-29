import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import {Link, useLocation, useNavigate} from 'react-router-dom'

const Navbar = ({setShowLogin}) => {

    const  location = useLocation()
    const [open, setOpen] = useState(false)
    const navigate  = useNavigate()

  return (
    <div
  className={`flex items-center justify-between px-6 md:px-10 xl:px-32 py-4
  border-b border-yellow-500/20
  sticky top-0 z-50
  transition-all duration-300
  ${location.pathname === "/" ? "bg-[#0B0B0B]" : "bg-[#111111]"}`}
>
  <Link to="/" className="flex items-center gap-2">
    <img src={assets.logo} alt="logo" className="h-8 select-none" />
  </Link>

  <div
    className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:right-0
    max-sm:border-t max-sm:border-yellow-500/20
    flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-10
    max-sm:p-6
    transition-all duration-300 z-50
    ${location.pathname === "/" ? "bg-[#0B0B0B]/95 backdrop-blur-md" : "bg-[#111111]/95 backdrop-blur-md"}
    ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
  >
    {menuLinks.map((link, index) => (
      <Link
        key={index}
        to={link.path}
        className="
          text-gray-300 font-medium tracking-wide
          hover:text-yellow-400 transition-all duration-200
          relative
          after:content-['']
          after:absolute after:left-0 after:-bottom-1
          after:w-0 after:h-[2px] after:bg-yellow-400
          hover:after:w-full after:transition-all after:duration-300
        "
      >
        {link.name}
      </Link>
    ))}

    {/* Search */}
    <div className="hidden lg:flex items-center text-sm gap-2 border border-yellow-500/25 bg-white/5 px-4 py-2 rounded-full w-[260px]">
      <input
        type="text"
        className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-500"
        placeholder="Search Cars"
      />
      <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-80" />
    </div>

    {/* Buttons */}
    <div className="flex max-sm:flex-col items-start sm:items-center gap-4">
      <button
        onClick={() => navigate("/owner")}
        className="
          text-gray-300 font-medium tracking-wide
          hover:text-yellow-400 transition-all duration-200
        "
      >
        Dashboard
      </button>

      <button
        onClick={() => setShowLogin(true)}
        className="
          cursor-pointer px-8 py-2 rounded-lg font-semibold
          bg-primary hover:bg-primary-dull transition-all
          text-black shadow-lg shadow-yellow-500/10
        "
      >
        Login
      </button>
    </div>
  </div>

  <button
    className="sm:hidden cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-all"
    aria-label="Menu"
    onClick={() => setOpen(!open)}
  >
    <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
  </button>
</div>


  )
}

export default Navbar

import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = () => {

    const {user} = useAppContext()

  return (
    <div
  className="
    flex items-center justify-between
    px-6 md:px-10 py-4
    bg-[#0B0B0B] text-white
    border-b border-yellow-500/15
    sticky top-0 z-50
  "
>
  <Link to="/" className="flex items-center gap-2">
    <img src={assets.logo} alt="logo" className="h-7 select-none" />
  </Link>

  <div className="flex items-center gap-3">
    
    {/* Welcome text */}
    <p className="text-sm md:text-base text-gray-200">
      Welcome,{" "}
      <span className="text-primary font-semibold">
        {user?.name || "Owner"}
      </span>
    </p>
  </div>
</div>

  )
}

export default NavbarOwner

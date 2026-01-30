import React, { useState } from 'react'
import { assets, dummyUserData, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'

const Sidebar = () => {

    const user = dummyUserData
    const location = useLocation()
    const [image, setImage] = useState('')

    const updateImage = async ()=>{
        user.image = URL.createObjectURL(image)
        setImage('')
    }

  return (
    <div
  className="
    relative min-h-screen md:flex flex-col items-center
    pt-10 w-full md:w-64
    bg-[#0B0B0B] text-white
    border-r border-yellow-500/15
    text-sm
  "
>
  {/* Profile Image */}
  <div className="group relative">
    <label htmlFor="image" className="block relative">
      <img
        src={
          image
            ? URL.createObjectURL(image)
            : user?.image ||
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt=""
        className="h-12 w-12 md:h-16 md:w-16 rounded-full mx-auto object-cover
        border border-yellow-500/15 shadow-md"
      />

      <input
        type="file"
        id="image"
        accept="image/*"
        hidden
        onChange={(e) => setImage(e.target.files[0])}
      />

      {/* Hover overlay */}
      <div
        className="
          absolute inset-0 hidden group-hover:flex items-center justify-center
          bg-black/60 backdrop-blur-sm rounded-full cursor-pointer
          border border-yellow-500/20
        "
      >
        <img src={assets.edit_icon} alt="" className="w-4 h-4 opacity-90" />
      </div>
    </label>
  </div>

  {/* Save button */}
  {image && (
    <button
      onClick={updateImage}
      className="
        mt-4 flex items-center gap-2
        px-4 py-2 rounded-xl
        bg-primary/15 text-primary font-semibold
        border border-yellow-500/20
        hover:bg-primary/25 transition-all cursor-pointer
      "
    >
      Save
      <img src={assets.check_icon} width={14} alt="" />
    </button>
  )}

  <p className="mt-4 text-base font-semibold text-gray-200 max-md:hidden">
    {user?.name}
  </p>

  {/* Links */}
  <div className="w-full mt-8">
    {ownerMenuLinks.map((link, index) => {
      const active = link.path === location.pathname;

      return (
        <NavLink
          key={index}
          to={link.path}
          className={`
            relative flex items-center gap-3 w-full
            py-3 px-5
            transition-all duration-200
            ${active ? "bg-white/5 text-primary" : "text-gray-300 hover:bg-white/5"}
          `}
        >
          <img
            src={active ? link.coloredIcon : link.icon}
            alt="icon"
            className="w-5 h-5 opacity-90"
          />

          <span className="max-md:hidden font-medium">{link.name}</span>

          {/* Active indicator */}
          <div
            className={`${active ? "bg-primary" : "bg-transparent"} w-[4px] h-8 rounded-full absolute right-0`}
          ></div>
        </NavLink>
      );
    })}
  </div>
</div>

  )
}

export default Sidebar

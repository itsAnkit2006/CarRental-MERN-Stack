import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Sidebar = ({ mobile = false }) => {

  const { user, axios, fetchUser } = useAppContext()
  const location = useLocation()
  const [image, setImage] = useState('')

  const updateImage = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image)

      const { data } = await axios.post('/api/owner/update-image', formData)

      if (data.success) {
        fetchUser()
        toast.success(data.message)
        setImage('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className={`
      relative min-h-screen flex flex-col items-center
      ${mobile ? "w-64" : "hidden md:flex md:w-64"}
      pt-10
      bg-[#0B0B0B] text-white
      border-r border-yellow-500/15
      text-sm
    `}
    >

      {/* Profile */}
      <div className="group relative flex flex-col items-center w-full">
        <label htmlFor="image" className="block relative">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop"
            }
            alt="profile"
            className="
              h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16
              rounded-full mx-auto object-cover
              border border-yellow-500/15 shadow-md
            "
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
              absolute inset-0 hidden group-hover:flex
              items-center justify-center
              bg-black/60 backdrop-blur-sm
              rounded-full cursor-pointer
              border border-yellow-500/20
            "
          >
            <img src={assets.edit_icon} alt="" className="w-4 h-4 opacity-90" />
          </div>
        </label>

        {/* Save */}
        {image && (
          <button
            onClick={updateImage}
            className="
              mt-3 flex items-center gap-2
              px-4 py-2 rounded-xl
              bg-primary/15 text-primary font-semibold
              border border-yellow-500/20
              hover:bg-primary/25
              transition-all cursor-pointer
              text-xs sm:text-sm
            "
          >
            Save
            <img src={assets.check_icon} width={14} alt="" />
          </button>
        )}

        {/* Name */}
        <p className={`
          mt-4 text-base font-semibold text-gray-200
          ${mobile ? "block" : "hidden md:block"}
          `}>
          {user?.name}
        </p>
      </div>

      {/* Links */}
      <div className="w-full mt-6 md:mt-8">
        {ownerMenuLinks.map((link, index) => {
          const active = link.path === location.pathname;

          return (
            <NavLink
              key={index}
              to={link.path}
              className={`
                relative flex items-center gap-3 w-full
                py-3 px-4 md:px-5
                transition-all duration-200
                text-sm sm:text-base
                ${active
                  ? "bg-white/5 text-primary"
                  : "text-gray-300 hover:bg-white/5"}
              `}
            >
              <img
                src={active ? link.coloredIcon : link.icon}
                alt="icon"
                className="w-5 h-5 opacity-90 flex-shrink-0"
              />

              <span className={`
                font-medium
                ${mobile ? "block" : "hidden md:block"}
                `}>
                {link.name}
              </span>

              {/* Active indicator */}
              <div
                className={`
                  ${active ? "bg-primary" : "bg-transparent"}
                  w-[4px] h-7 rounded-full
                  absolute right-0
                `}
              />
            </NavLink>
          );
        })}
      </div>
    </div>
  )
}

export default Sidebar

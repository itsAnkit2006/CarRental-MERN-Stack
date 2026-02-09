import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate()

  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`)
        scrollTo(0, 0)
      }}
      className="
        group rounded-2xl overflow-hidden cursor-pointer
        border border-yellow-500/15
        bg-white/5 backdrop-blur-xl
        shadow-[0px_10px_24px_rgba(0,0,0,0.5)]
        hover:-translate-y-2 hover:shadow-[0px_18px_45px_rgba(0,0,0,0.75)]
        transition-all duration-500
        active:scale-[0.98]
      "
    >
      {/* Image */}
      <div className="relative h-44 sm:h-52 md:h-56 overflow-hidden">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Availability Tag */}
        <span
          className={`
            absolute top-3 left-3 sm:top-4 sm:left-4
            px-2.5 py-1 sm:px-3 sm:py-1
            rounded-full text-[10px] sm:text-xs font-bold
            ${car.availableFrom
              ? "bg-yellow-500 text-black"
              : "bg-green-900 text-white"}
          `}
        >
          {car.availableFrom
            ? `Available after ${new Date(car.availableFrom).toLocaleDateString()}`
            : "Available Now"}
        </span>

        {/* Price */}
        <div
          className="
            absolute bottom-3 right-3 sm:bottom-4 sm:right-4
            bg-black/70 backdrop-blur-md
            border border-yellow-500/20
            text-white px-3 py-1.5 sm:px-4 sm:py-2
            rounded-xl text-sm sm:text-base
          "
        >
          <span className="font-bold text-primary">
            {currency}{car.pricePerDay}
          </span>
          <span className="text-xs sm:text-sm text-gray-300"> / day</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-white truncate">
              {car.brand} {car.model}
            </h3>

            <p className="text-gray-400 text-xs sm:text-sm truncate">
              {car.category} • {car.year}
            </p>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-y-3 text-gray-300">
          <div className="flex items-center text-xs sm:text-sm">
            <img src={assets.users_icon} alt="" className="h-4 w-4 mr-2 opacity-80" />
            <span>{car.seating_capacity} Seats</span>
          </div>

          <div className="flex items-center text-xs sm:text-sm">
            <img src={assets.fuel_icon} alt="" className="h-4 w-4 mr-2 opacity-80" />
            <span className="truncate">{car.fuel_type}</span>
          </div>

          <div className="flex items-center text-xs sm:text-sm">
            <img src={assets.car_icon} alt="" className="h-4 w-4 mr-2 opacity-80" />
            <span className="truncate">{car.transmission}</span>
          </div>

          <div className="flex items-center text-xs sm:text-sm min-w-0">
            <img src={assets.location_icon} alt="" className="h-4 w-4 mr-2 opacity-80" />
            <span className="truncate">{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarCard

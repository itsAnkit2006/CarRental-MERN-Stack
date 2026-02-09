import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const CarCard = ({car}) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()

  return (
    <div onClick={()=> {navigate(`/car-details/${car._id}`); scrollTo(0,0)}}
  className="
    group rounded-2xl overflow-hidden cursor-pointer
    border border-yellow-500/15
    bg-white/5 backdrop-blur-xl
    shadow-[0px_12px_30px_rgba(0,0,0,0.55)]
    hover:-translate-y-2 hover:shadow-[0px_18px_45px_rgba(0,0,0,0.75)]
    transition-all duration-500
  "
>
  {/* Image */}
  <div className="relative h-52 overflow-hidden">
    <img
      src={car.image}
      alt="Car"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />

    {/* Available Tag */}
    <span
      className={`
        absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold
        ${car.availableFrom
          ? "bg-yellow-500 text-black"
          : "bg-green-900 text-white"}
      `}
      >
      {
        car.availableFrom
          ? `Available after ${new Date(car.availableFrom).toLocaleDateString()}`
          : "Available Now"
      }
    </span>


    {/* Price */}
    <div
      className="
        absolute bottom-4 right-4
        bg-black/70 backdrop-blur-md
        border border-yellow-500/20
        text-white px-4 py-2 rounded-xl
      "
    >
      <span className="font-bold text-primary">
        {currency}{car.pricePerDay}
      </span>
      <span className="text-sm text-gray-300"> / day</span>
    </div>
  </div>

  {/* Content */}
  <div className="p-5">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="text-lg font-semibold text-white">
          {car.brand} {car.model}
        </h3>
        <p className="text-gray-400 text-sm">
          {car.category} • {car.year}
        </p>
      </div>
    </div>

    {/* Specs */}
    <div className="mt-5 grid grid-cols-2 gap-y-3 text-gray-300">
      <div className="flex items-center text-sm">
        <img src={assets.users_icon} alt="" className="h-4 w-4 mr-2 opacity-80" />
        <span>{car.seating_capacity} Seats</span>
      </div>

      <div className="flex items-center text-sm">
        <img src={assets.fuel_icon} alt="" className="h-4 w-4 mr-2 opacity-80" />
        <span>{car.fuel_type}</span>
      </div>

      <div className="flex items-center text-sm">
        <img src={assets.car_icon} alt="" className="h-4 w-4 mr-2 opacity-80" />
        <span>{car.transmission}</span>
      </div>

      <div className="flex items-center text-sm">
        <img src={assets.location_icon} alt="" className="h-4 w-4 mr-2 opacity-80" />
        <span>{car.location}</span>
      </div>
    </div>
  </div>
</div>

  )
}

export default CarCard

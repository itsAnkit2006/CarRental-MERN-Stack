import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'
import Loader from '../components/Loader'

const CarDetails = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const currency = import.meta.env.VITE_CURRENCY

  const handleSubmit = async ()=> {
    e.preventDefault();
  }

  useEffect(()=> {
    setCar(dummyCarData.find(car => car._id === id))
  },[id])

  return car ? (
    <div className="min-h-screen bg-[#0B0B0B] text-white px-6 md:px-16 lg:px-24 xl:px-32 pt-28 pb-24">
  
  {/* Back button */}
  <button
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 mb-8 text-gray-300 hover:text-yellow-400 transition-all cursor-pointer"
  >
    <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-80" />
    Back to all cars
  </button>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
    
    {/* LEFT: Image + Details */}
    <div className="lg:col-span-2">
      <img
        src={car.image}
        alt=""
        className="w-full h-auto md:max-h-[420px] object-cover rounded-2xl mb-8
        border border-yellow-500/15
        shadow-[0px_16px_45px_rgba(0,0,0,0.65)]"
      />

      <div className="space-y-8">
        {/* Title */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {car.brand} {car.model}
          </h1>
          <p className="text-gray-400 text-lg mt-2">
            {car.category} • {car.year}
          </p>
        </div>

        <hr className="border-yellow-500/15" />

        {/* Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
            { icon: assets.fuel_icon, text: car.fuel_type },
            { icon: assets.car_icon, text: car.transmission },
            { icon: assets.location_icon, text: car.location },
          ].map(({ icon, text }) => (
            <div
              key={text}
              className="
                flex flex-col items-center gap-2
                bg-white/5 backdrop-blur-xl
                border border-yellow-500/15
                p-4 rounded-2xl
                text-gray-300
              "
            >
              <img src={icon} alt="" className="h-5 opacity-90" />
              <span className="text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div>
          <h1 className="text-xl font-semibold mb-3 text-white">Description</h1>
          <p className="text-gray-400 leading-relaxed">{car.description}</p>
        </div>

        {/* Features */}
        <div>
          <h1 className="text-xl font-semibold mb-3 text-white">Features</h1>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map(
              (item) => (
                <li key={item} className="flex items-center text-gray-300">
                  <img src={assets.check_icon} className="h-4 mr-2 opacity-90" alt="" />
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>

    {/* RIGHT: Booking Form */}
    <form
      onSubmit={handleSubmit}
      className="
        h-max sticky top-24 rounded-3xl p-7 space-y-6
        bg-white/5 backdrop-blur-xl
        border border-yellow-500/15
        shadow-[0px_16px_45px_rgba(0,0,0,0.65)]
      "
    >
      <p className="flex items-end justify-between text-2xl font-extrabold text-white">
        <span className="text-primary">
          {currency}{car.pricePerDay}
        </span>
        <span className="text-sm text-gray-400 font-medium">per day</span>
      </p>

      <hr className="border-yellow-500/15" />

      <div className="flex flex-col gap-2">
        <label htmlFor="pickup-date" className="text-gray-300 font-semibold text-sm">
          Pickup Date
        </label>
        <input
          type="date"
          className="
            bg-white/5 border border-yellow-500/15
            px-3 py-2 rounded-xl outline-none text-gray-200
            focus:border-yellow-400 transition-all
          "
          required
          id="pickup-date"
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="return-date" className="text-gray-300 font-semibold text-sm">
          Return Date
        </label>
        <input
          type="date"
          className="
            bg-white/5 border border-yellow-500/15
            px-3 py-2 rounded-xl outline-none text-gray-200
            focus:border-yellow-400 transition-all
          "
          required
          id="return-date"
        />
      </div>

      <button
        className="
          w-full py-3 rounded-xl font-bold
          bg-primary hover:bg-primary-dull
          text-black transition-all cursor-pointer
          shadow-lg shadow-yellow-500/20
        "
      >
        Book Now
      </button>

      <p className="text-center text-xs text-gray-500">
        No credit card required to reserve
      </p>
    </form>
  </div>
</div>

  ) : <Loader />
}

export default CarDetails

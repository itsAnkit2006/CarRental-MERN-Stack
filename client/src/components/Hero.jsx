import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Hero = () => {

    const [pickupLocation, setPickupLocation] = useState('')

    const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } = useAppContext()

    const handleSearch = (e)=>{
      e.preventDefault()
      navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-14 text-center
bg-gradient-to-b from-[#0B0B0B] via-[#111111] to-[#0B0B0B] text-white px-6"
>
  <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
    Luxury Cars on{" "}
    <span className="text-primary drop-shadow-[0_0_10px_rgba(255,214,0,0.35)]">
      Rent
    </span>
  </h1>

  <p className="max-w-2xl text-gray-400 text-sm md:text-base -mt-6">
    Book premium cars in seconds. Choose location, pick dates, and drive in style.
  </p>

  <form
    onSubmit={handleSearch}
    className="
    flex flex-col md:flex-row items-start md:items-center justify-between
    gap-6 md:gap-10
    p-6 md:px-10 rounded-2xl md:rounded-full
    w-full max-w-80 md:max-w-5xl
    border border-yellow-500/20
    bg-white/5 backdrop-blur-xl
    shadow-[0px_12px_30px_rgba(0,0,0,0.40)]
    "
  >
    <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-14 w-full">

      {/* Pickup Location */}
      <div className="flex flex-col items-start gap-2 w-full md:w-auto">
        <select
          required
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          className="
            bg-transparent text-gray-200 outline-none
            font-medium cursor-pointer
          "
        >
          <option value="" className="text-black">Pickup Location</option>
          {cityList.map((city) => (
            <option key={city} value={city} className="text-black">
              {city}
            </option>
          ))}
        </select>
        <p className="px-1 text-sm text-gray-400">
          {pickupLocation ? pickupLocation : "Please select location"}
        </p>
      </div>

      {/* Pickup Date */}
      <div className="flex flex-col items-start gap-2 w-full md:w-auto">
        <label htmlFor="pickup-date" className="text-sm text-gray-300 font-medium">
          Pick-up Date
        </label>
        <input
          value={pickupDate}
          onChange={e=> setPickupDate(e.target.value)}
          type="date"
          id="pickup-date"
          min={new Date().toISOString().split("T")[0]}
          className="
            text-sm text-gray-300
            bg-white/5 border border-yellow-500/15
            rounded-lg px-3 py-2 outline-none
            focus:border-yellow-400 transition-all
          "
          required
        />
      </div>

      {/* Return Date */}
      <div className="flex flex-col items-start gap-2 w-full md:w-auto">
        <label htmlFor="return-date" className="text-sm text-gray-300 font-medium">
          Return Date
        </label>
        <input
          value={returnDate}
          onChange={e=> setReturnDate(e.target.value)}
          type="date"
          id="return-date"
          className="
            text-sm text-gray-300
            bg-white/5 border border-yellow-500/15
            rounded-lg px-3 py-2 outline-none
            focus:border-yellow-400 transition-all
          "
          required
        />
      </div>
    </div>

    {/* Search Button */}
    <button
      className="
      flex items-center justify-center gap-2 px-10 py-3
      max-sm:mt-2
      bg-primary hover:bg-primary-dull
      text-black font-semibold
      rounded-full cursor-pointer
      shadow-lg shadow-yellow-500/20
      transition-all duration-200
      "
    >
      <img src={assets.search_icon} alt="search" className="w-4 h-4" />
      Search
    </button>
  </form>

  <img
    src={assets.main_car}
    alt="car"
    className="max-h-80 md:max-h-[360px] drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)] select-none"
  />
</div>

  )
}

export default Hero

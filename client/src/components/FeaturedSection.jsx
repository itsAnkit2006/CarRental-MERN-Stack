import React from 'react'
import Title from './Title'
import { assets, dummyCarData } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'

const FeaturedSection = () => {

    const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32
bg-[#0B0B0B] text-white relative overflow-hidden">

  {/* Background glow */}
  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-yellow-500/10 blur-[150px] rounded-full"></div>

  <div className="relative z-10 w-full flex flex-col items-center">
    <Title
      title="Featured Vehicles"
      subTitle="Explore our selection of premium vehicles available for your next adventure."
    />
  </div>

  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full">
    {dummyCarData.slice(0, 6).map((car) => (
      <div key={car._id} className="h-full">
        <CarCard car={car} />
      </div>
    ))}
  </div>

  <button
    onClick={() => {
      navigate("/cars");
      scrollTo(0, 0);
    }}
    className="
      relative z-10 mt-12
      flex items-center justify-center gap-2
      px-8 py-3 rounded-full font-semibold
      border border-yellow-500/30 text-yellow-400
      hover:bg-yellow-400 hover:text-black
      transition-all duration-200 cursor-pointer
      shadow-md hover:shadow-yellow-500/20
    "
  >
    Explore all cars
    <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" />
  </button>
</div>

  )
}

export default FeaturedSection

import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <div className="w-full bg-[#0B0B0B] py-20">
  <div
    className="
      relative flex flex-col md:flex-row md:items-center items-center justify-between
      px-8 md:px-14 pt-10 pb-8
      bg-gradient-to-r from-[#0B0B0B] via-[#111111] to-[#0B0B0B]
      border border-yellow-500/15
      max-w-6xl mx-auto
      rounded-3xl overflow-hidden
      shadow-[0px_14px_45px_rgba(0,0,0,0.65)]
    "
  >
    {/* Glow */}
    <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-yellow-500/15 blur-[120px] rounded-full"></div>

    <div className="relative z-10 text-white max-w-xl">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        Do You Own a{" "}
        <span className="text-primary drop-shadow-[0_0_10px_rgba(255,214,0,0.35)]">
          Luxury Car?
        </span>
      </h2>

      <p className="mt-3 text-gray-300">
        Monetize your vehicle effortlessly by listing it on{" "}
        <span className="text-primary font-semibold">CarRental</span>.
      </p>

      <p className="mt-3 text-gray-400 leading-relaxed">
        We take care of insurance, driver verification, and secure payments — so you
        can earn passive income stress-free.
      </p>

      <button
        className="
          mt-6 px-7 py-3 rounded-xl text-sm font-bold
          bg-primary hover:bg-primary-dull text-black
          transition-all cursor-pointer
          shadow-lg shadow-yellow-500/20
        "
      >
        List your car
      </button>
    </div>

    <img
      src={assets.banner_car_image}
      alt="car"
      className="relative z-10 max-h-48 md:max-h-52 mt-10 md:mt-0 drop-shadow-[0px_25px_40px_rgba(0,0,0,0.65)] select-none"
    />
  </div>
</div>


  )
}

export default Banner

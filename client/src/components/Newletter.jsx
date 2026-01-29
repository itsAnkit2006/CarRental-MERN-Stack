import React from 'react'

const Newletter = () => {
  return (
    <div className="relative w-full bg-[#0B0B0B] py-28 px-6 md:px-16 overflow-hidden">
  
  {/* Glow */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-yellow-500/10 blur-[160px] rounded-full"></div>

  <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 max-w-3xl mx-auto">
    <h1 className="md:text-5xl text-3xl font-extrabold tracking-tight text-white">
      Never Miss a{" "}
      <span className="text-primary drop-shadow-[0_0_12px_rgba(255,214,0,0.35)]">
        Deal!
      </span>
    </h1>

    <p className="md:text-lg text-gray-400 pb-6 leading-relaxed">
      Subscribe to get the latest offers, new arrivals, and exclusive discounts.
    </p>

    <form className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
      <input
        className="
          h-full w-full px-4
          bg-white/5 text-gray-200 placeholder-gray-500
          border border-yellow-500/15 rounded-l-xl
          outline-none
          focus:border-yellow-400 transition-all
        "
        type="email"
        placeholder="Enter your email"
        required
      />

      <button
        type="submit"
        className="
          md:px-12 px-8 h-full
          bg-primary hover:bg-primary-dull
          text-black font-bold
          rounded-r-xl
          transition-all cursor-pointer
          shadow-lg shadow-yellow-500/20
        "
      >
        Subscribe
      </button>
    </form>

    {/* tiny trust line */}
    <p className="text-xs text-gray-500 mt-2">
      No spam — only premium deals & updates.
    </p>
  </div>
</div>

  )
}

export default Newletter

import React from 'react'

const Loader = () => {
  return (
    <div
      className="
        flex justify-center items-center
        min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]
        w-full
        bg-[#0B0B0B]
      "
      role="status"
      aria-label="Loading"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div
          className="
            animate-spin
            rounded-full
            h-10 w-10
            sm:h-12 sm:w-12
            md:h-14 md:w-14
            border-[3px] sm:border-4
            border-yellow-500/20
            border-t-primary
          "
        />

        {/* Glow */}
        <div
          className="
            absolute inset-0
            rounded-full
            blur-md
            bg-yellow-500/20
            scale-110
          "
        />
      </div>
    </div>
  )
}

export default Loader

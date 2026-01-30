import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[80vh] bg-[#0B0B0B]">
  <div className="relative">
    {/* Outer ring */}
    <div className="animate-spin rounded-full h-14 w-14 border-4 border-yellow-500/20 border-t-primary"></div>

    {/* Glow */}
    <div className="absolute inset-0 rounded-full blur-md bg-yellow-500/20"></div>
  </div>
</div>
  )
}

export default Loader

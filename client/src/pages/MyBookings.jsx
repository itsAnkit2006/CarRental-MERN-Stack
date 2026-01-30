import React, { useEffect, useState } from 'react'
import { assets, dummyMyBookingsData } from '../assets/assets'
import Title from '../components/Title'

const MyBookings = () => {

  const [bookings, setBookings] = useState([])
  const currency = import.meta.env.VITE_CURRENCY

  const fetchMyBookings = async ()=> {
    setBookings(dummyMyBookingsData)
  }

  useEffect(()=>{
    fetchMyBookings()
  },[])

  return (
    <div className="w-full bg-[#0B0B0B]">
    <div className="min-h-screen bg-[#0B0B0B] text-white px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 pt-28 pb-24 max-w-7xl mx-auto">

  <Title
    title="My Bookings"
    subTitle="View and manage all your car bookings."
    align="left"
    variant="dark"
  />

  <div className="mt-10 space-y-6">
    {bookings.map((booking, index) => (
      <div
        key={booking._id}
        className="
          grid grid-cols-1 md:grid-cols-4 gap-6 p-7
          rounded-3xl
          bg-white/5 backdrop-blur-xl
          border border-yellow-500/15
          shadow-[0px_14px_40px_rgba(0,0,0,0.60)]
        "
      >
        {/* Car Image + Info */}
        <div className="md:col-span-1">
          <div className="rounded-2xl overflow-hidden mb-4 border border-yellow-500/10">
            <img
              src={booking.car.image}
              alt=""
              className="w-full h-auto aspect-video object-cover"
            />
          </div>

          <p className="text-lg font-bold text-white">
            {booking.car.brand} {booking.car.model}
          </p>

          <p className="text-gray-400 text-sm mt-1">
            {booking.car.year} • {booking.car.category} • {booking.car.location}
          </p>
        </div>

        {/* Booking Info */}
        <div className="md:col-span-2">
          <div className="flex flex-wrap items-center gap-3">
            <p className="px-4 py-2 bg-white/5 border border-yellow-500/10 rounded-xl text-gray-200 text-sm">
              Booking #{index + 1}
            </p>

            <p
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wide rounded-full border
              ${
                booking.status === "confirmed"
                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              }`}
            >
              {booking.status}
            </p>
          </div>

          <div className="flex items-start gap-3 mt-6">
            <img src={assets.calendar_icon_colored} className="w-4 h-4 mt-1 opacity-90" alt="" />
            <div>
              <p className="text-gray-400 text-sm">Rental Period</p>
              <p className="text-gray-200 font-semibold">
                {booking.pickupDate.split("T")[0]}{" "}
                <span className="text-gray-500 font-normal">to</span>{" "}
                {booking.returnDate.split("T")[0]}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 mt-4">
            <img src={assets.location_icon_colored} className="w-4 h-4 mt-1 opacity-90" alt="" />
            <div>
              <p className="text-gray-400 text-sm">Pick-up Location</p>
              <p className="text-gray-200 font-semibold">{booking.car.location}</p>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="md:col-span-1 flex flex-col justify-between">
          <div className="text-right">
            <p className="text-gray-400 text-sm">Total Price</p>

            <h1 className="text-3xl font-extrabold text-primary mt-1">
              {currency}{booking.price}
            </h1>

            <p className="text-xs text-gray-500 mt-2">
              Booked on {booking.createdAt.split("T")[0]}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
</div>

  )
}

export default MyBookings

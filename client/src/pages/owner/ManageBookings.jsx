import React, { useEffect, useState } from 'react'
import { dummyMyBookingsData } from '../../assets/assets'
import Title from '../../components/owner/Title'

const ManageBookings = () => {

    const  currency = import.meta.env.VITE_CURRENCY

    const [bookings, setBookings] = useState([])

    const fetchOwnerBookings = async()=>{
        setBookings(dummyMyBookingsData)
    }

    useEffect(()=>{
        fetchOwnerBookings()
    },[])

  return (
    <div className="w-full flex-1 px-4 pt-10 md:px-10 bg-[#111111] text-white min-h-screen">
  <Title
    title="Manage Bookings"
    subTitle="Track all customer bookings, approve or cancel requests, and manage booking status."
  />

  <div
    className="
      w-full mt-8 rounded-3xl overflow-hidden
      bg-white/5 backdrop-blur-xl
      border border-yellow-500/15
      shadow-[0px_14px_40px_rgba(0,0,0,0.65)]
    "
  >
    {/* Table wrapper for scroll */}
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[780px] border-collapse text-left text-sm">
        <thead className="text-gray-300 bg-black/30">
          <tr>
            <th className="p-4 font-semibold">Car</th>
            <th className="p-4 font-semibold max-md:hidden">Date Range</th>
            <th className="p-4 font-semibold">Total</th>
            <th className="p-4 font-semibold max-md:hidden">Payment</th>
            <th className="p-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
  {bookings.map((booking, index) => (
    <tr
      key={index}
      className="
        border-t border-yellow-500/10
        hover:bg-white/5 transition-all
      "
    >
      {/* Car */}
      <td className="p-4 flex items-center gap-4">
        <img
          src={booking.car.image}
          className="h-12 w-12 aspect-square rounded-xl object-cover border border-yellow-500/10"
          alt=""
        />
        <p className="font-semibold text-gray-200 max-md:hidden">
          {booking.car.brand} {booking.car.model}
        </p>
      </td>

      {/* Date */}
      <td className="p-4 max-md:hidden text-gray-300">
        {booking.pickupDate.split("T")[0]}{" "}
        <span className="text-gray-500">to</span>{" "}
        {booking.returnDate.split("T")[0]}
      </td>

      {/* Price */}
      <td className="p-4 text-gray-200 font-semibold">
        {currency}{booking.price}
      </td>

      {/* Payment */}
      <td className="p-4 max-md:hidden">
        <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide
          bg-white/5 border border-yellow-500/10 text-gray-300">
          Offline
        </span>
      </td>

      {/* Actions / Status */}
      <td className="p-4">
        {booking.status === "pending" ? (
          <select
            value={booking.status}
            className="
              px-4 py-2 rounded-xl text-sm font-semibold
              bg-[#0B0B0B] text-gray-200
              border border-yellow-500/15 outline-none
              focus:border-yellow-400 transition-all
              cursor-pointer
            "
          >
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="confirmed">Confirmed</option>
          </select>
        ) : (
          <span
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border
              ${
                booking.status === "confirmed"
                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              }`}
          >
            {booking.status}
          </span>
        )}
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  </div>
</div>
  )
}

export default ManageBookings

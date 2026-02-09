import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageBookings = () => {

  const { currency, axios } = useAppContext()
  const [bookings, setBookings] = useState([])

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/owner')
      data.success
        ? setBookings(data.bookings)
        : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status', { bookingId, status })

      if (data.success) {
        toast.success(data.message)
        fetchOwnerBookings()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOwnerBookings()
  }, [])

  return (
    <div className="
      flex-1 min-h-screen
      bg-[#111111] text-white
      px-4 sm:px-6 md:px-10
      py-8 sm:py-10
    ">

      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking status."
      />

      <div className="
        w-full mt-8 rounded-3xl overflow-hidden
        bg-white/5 backdrop-blur-xl
        border border-yellow-500/15
        shadow-[0px_14px_40px_rgba(0,0,0,0.65)]
      ">

        {/* EMPTY STATE */}
        {bookings.length === 0 && (
          <div className="p-10 text-center text-gray-400">
            No bookings yet
          </div>
        )}

        {/* SCROLL WRAPPER */}
        {bookings.length > 0 && (
          <div className="w-full overflow-x-auto">

            <table className="w-full min-w-[760px] border-collapse text-left text-sm">

              <thead className="bg-black/30 text-gray-300">
                <tr>
                  <th className="p-4 font-semibold">Car</th>
                  <th className="p-4 font-semibold max-md:hidden">Date Range</th>
                  <th className="p-4 font-semibold">Total</th>
                  <th className="p-4 font-semibold max-md:hidden">Payment</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="
                      border-t border-yellow-500/10
                      hover:bg-white/5
                      transition-all
                    "
                  >

                    {/* CAR */}
                    <td className="p-4">
                      <div className="flex items-center gap-4">

                        <img
                          src={booking.car.image}
                          className="
                            h-12 w-12
                            rounded-xl object-cover
                            border border-yellow-500/10
                          "
                          alt=""
                        />

                        {/* STACK INFO MOBILE */}
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-200">
                            {booking.car.brand} {booking.car.model}
                          </span>

                          <span className="md:hidden text-xs text-gray-500 mt-1">
                            {booking.pickupDate.split("T")[0]} → {booking.returnDate.split("T")[0]}
                          </span>
                        </div>

                      </div>
                    </td>

                    {/* DATE RANGE */}
                    <td className="p-4 max-md:hidden text-gray-300">
                      {booking.pickupDate.split("T")[0]}
                      <span className="mx-1 text-gray-500">→</span>
                      {booking.returnDate.split("T")[0]}
                    </td>

                    {/* TOTAL */}
                    <td className="p-4 font-semibold text-primary">
                      {currency}{booking.price}
                    </td>

                    {/* PAYMENT */}
                    <td className="p-4 max-md:hidden">
                      <span className="
                        px-3 py-1.5 rounded-full text-xs font-bold uppercase
                        bg-white/5 border border-yellow-500/10 text-gray-300
                      ">
                        Offline
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">
                      {booking.status === "pending" ? (
                        <select
                          onChange={e => changeBookingStatus(booking._id, e.target.value)}
                          value={booking.status}
                          className="
                            px-3 py-2 rounded-xl text-sm font-semibold
                            bg-[#0B0B0B] text-gray-200
                            border border-yellow-500/15 outline-none
                            focus:border-yellow-400
                            cursor-pointer
                          "
                        >
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="confirmed">Confirmed</option>
                        </select>
                      ) : (
                        <span
                          className={`
                            px-3 py-1.5 rounded-full text-xs font-bold uppercase border
                            ${booking.status === "confirmed"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : "bg-red-500/10 text-red-400 border-red-500/20"}
                          `}
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
        )}

      </div>
    </div>
  )
}

export default ManageBookings

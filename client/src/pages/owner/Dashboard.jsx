import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

  const { axios, isOwner, currency } = useAppContext()

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored },
    { title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored },
  ]

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/owner/dashboard')
      data.success ? setData(data.dashboardData) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isOwner) fetchDashboardData()
  }, [isOwner])

  return (
    <div className="
      flex-1 min-h-screen
      bg-[#111111] text-white
      px-4 sm:px-6 md:px-10
      py-6 sm:py-10
      w-full
    ">

      <Title
        title="Owner Dashboard"
        subTitle="Monitor overall performance including total cars, bookings, revenue, and recent activities."
      />

      {/* ================== STAT CARDS ================== */}
      <div className="
        grid grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-4 sm:gap-6
        mt-6 sm:mt-8
      ">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="
              flex items-center justify-between
              p-4 sm:p-5 rounded-2xl
              bg-white/5 backdrop-blur-xl
              border border-yellow-500/15
              shadow-[0px_10px_25px_rgba(0,0,0,0.5)]
              hover:-translate-y-1
              transition-all
            "
          >
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                {card.title}
              </p>

              <p className="text-2xl sm:text-3xl font-extrabold mt-1">
                {card.value}
              </p>
            </div>

            <div className="
              flex items-center justify-center
              w-10 h-10 sm:w-11 sm:h-11
              rounded-full
              bg-primary/15 border border-yellow-500/15
            ">
              <img src={card.icon} className="h-4 sm:h-5" />
            </div>
          </div>
        ))}
      </div>


      {/* ================== LOWER SECTION ================== */}
      <div className="
        flex flex-col xl:flex-row
        gap-6
        mt-8
      ">

        {/* ===== RECENT BOOKINGS ===== */}
        <div className="
          flex-1
          p-5 sm:p-6 rounded-3xl
          bg-white/5 backdrop-blur-xl
          border border-yellow-500/15
        ">
          <h1 className="text-lg sm:text-xl font-bold">Recent Bookings</h1>
          <p className="text-gray-400 text-sm mt-1">
            Latest customer bookings
          </p>

          <div className="mt-5 space-y-3">

            {data.recentBookings.length === 0 && (
              <p className="text-gray-500 text-sm">
                No recent bookings yet
              </p>
            )}

            {data.recentBookings.map((booking, index) => (
              <div
                key={index}
                className="
                  flex flex-wrap sm:flex-nowrap
                  items-center justify-between
                  gap-3
                  px-4 py-3 rounded-2xl
                  bg-black/30
                  border border-yellow-500/10
                "
              >
                {/* LEFT */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="
                    hidden sm:flex
                    w-10 h-10 rounded-full
                    items-center justify-center
                    bg-primary/15 border border-yellow-500/15
                  ">
                    <img src={assets.listIconColored} className="h-4" />
                  </div>

                  <div className="truncate">
                    <p className="font-semibold text-gray-200 truncate">
                      {booking.car.brand} {booking.car.model}
                    </p>

                    <p className="text-xs text-gray-500">
                      {booking.createdAt?.split("T")[0]}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end">
                  <p className="font-semibold text-sm">
                    {currency}{booking.price}
                  </p>

                  <span className={`
                    px-3 py-1 rounded-full text-xs font-bold border uppercase
                    ${booking.status === "confirmed"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : booking.status === "pending"
                      ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20"}
                  `}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ===== REVENUE ===== */}
        <div className="
          w-full xl:w-[320px]
          p-5 sm:p-6 rounded-3xl
          bg-white/5 backdrop-blur-xl
          border border-yellow-500/15
        ">
          <h1 className="text-lg sm:text-xl font-bold">
            Monthly Revenue
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Revenue for current month
          </p>

          <p className="
            text-3xl sm:text-4xl
            mt-6 font-extrabold text-primary
          ">
            {currency}{data.monthlyRevenue}
          </p>
        </div>

      </div>
    </div>
  )
}

export default Dashboard

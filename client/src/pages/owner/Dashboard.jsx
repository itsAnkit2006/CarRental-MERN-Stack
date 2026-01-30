import React, { useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import Title from '../../components/owner/Title'

const Dashboard = () => {

    const  currency = import.meta.env.VITE_CURRENCY

    const [data, setData] = useState({
        totalCars: 0,
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        recentBookings: [],
        monthlyRevenue: 0,
    })

    const dashboardCards = [
        {title: "Total Cars", value: data.totalCars, icon: assets.carIconColored},
        {title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored},
        {title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored},
        {title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored},
    ]

    useEffect(()=>{
        setData(dummyDashboardData)
    },[])

  return (
    <div className="flex-1 px-4 pt-10 md:px-10 bg-[#111111] text-white min-h-screen">

  <Title
    title="Owner Dashboard"
    subTitle="Monitor overall performance including total cars, bookings, revenue, and recent activities."
  />

  {/* Stats Cards */}
  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10 max-w-5xl">
    {dashboardCards.map((card, index) => (
      <div
        key={index}
        className="
          flex items-center justify-between gap-4 p-5 rounded-2xl
          bg-white/5 backdrop-blur-xl
          border border-yellow-500/15
          shadow-[0px_12px_30px_rgba(0,0,0,0.55)]
          hover:-translate-y-1 transition-all duration-300
        "
      >
        <div>
          <h1 className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
            {card.title}
          </h1>
          <p className="text-2xl font-extrabold text-white mt-1">{card.value}</p>
        </div>

        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/15 border border-yellow-500/15">
          <img src={card.icon} className="h-5 w-5 opacity-90" alt="" />
        </div>
      </div>
    ))}
  </div>

  <div className="flex flex-wrap items-start gap-6 mb-14 w-full">

    {/* Recent Bookings */}
    <div
      className="
        p-6 rounded-3xl w-full lg:max-w-xl
        bg-white/5 backdrop-blur-xl
        border border-yellow-500/15
        shadow-[0px_14px_40px_rgba(0,0,0,0.65)]
      "
    >
      <h1 className="text-xl font-bold text-white">Recent Bookings</h1>
      <p className="text-gray-400 mt-1">Latest customer bookings</p>

      <div className="mt-6 space-y-4">
        {data.recentBookings.map((booking, index) => (
          <div
            key={index}
            className="
              flex items-center justify-between gap-4
              px-4 py-3 rounded-2xl
              bg-black/30 border border-yellow-500/10
              hover:border-yellow-400/20 transition-all
            "
          >
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-primary/15 border border-yellow-500/15">
                <img src={assets.listIconColored} className="h-5 w-5 opacity-90" alt="" />
              </div>

              <div>
                <p className="text-gray-200 font-semibold">
                  {booking.car.brand} {booking.car.model}
                </p>
                <p className="text-sm text-gray-500">
                  {booking.createdAt?.split("T")[0]}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <p className="text-sm text-gray-300 font-semibold">
                {currency}{booking.price}
              </p>

              <p
                className={`
                  px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border
                  ${
                    booking.status === "confirmed"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : booking.status === "pending"
                      ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20"
                  }
                `}
              >
                {booking.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Monthly Revenue */}
    <div
      className="
        p-6 rounded-3xl w-full md:max-w-sm
        bg-white/5 backdrop-blur-xl
        border border-yellow-500/15
        shadow-[0px_14px_40px_rgba(0,0,0,0.65)]
      "
    >
      <h1 className="text-xl font-bold text-white">Monthly Revenue</h1>
      <p className="text-gray-400 mt-1">Revenue for current month</p>

      <p className="text-4xl mt-8 font-extrabold text-primary">
        {currency}{data.monthlyRevenue}
      </p>

    </div>
  </div>
</div>

  )
}

export default Dashboard

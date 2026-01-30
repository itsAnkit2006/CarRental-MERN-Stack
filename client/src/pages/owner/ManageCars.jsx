import React, { useEffect, useState } from 'react'
import { assets, dummyCarData } from '../../assets/assets'
import Title from '../../components/owner/Title'

const ManageCars = () => {

    const  currency = import.meta.env.VITE_CURRENCY

    const [cars, setCars] = useState([])

    const fetchOwnerCars = async ()=>{
        setCars(dummyCarData)
    }

    useEffect(()=>{
        fetchOwnerCars()
    },[])

  return (
    <div className="w-full flex-1 px-4 pt-10 md:px-10 bg-[#111111] text-white min-h-screen">
  <Title
    title="Manage Cars"
    subTitle="View all listed cars, update their details, or remove them from the booking platform."
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
            <th className="p-4 font-semibold max-md:hidden">Category</th>
            <th className="p-4 font-semibold">Price</th>
            <th className="p-4 font-semibold max-md:hidden">Status</th>
            <th className="p-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {cars.map((car, index) => (
            <tr
              key={index}
              className="
                border-t border-yellow-500/10
                hover:bg-white/5 transition-all
              "
            >
              {/* Car Info */}
              <td className="p-4 flex items-center gap-4">
                <img
                  src={car.image}
                  alt=""
                  className="h-12 w-12 aspect-square rounded-xl object-cover border border-yellow-500/10"
                />

                <div className="max-md:hidden">
                  <p className="font-semibold text-white">
                    {car.brand} {car.model}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {car.seating_capacity} Seats • {car.transmission}
                  </p>
                </div>
              </td>

              {/* Category */}
              <td className="p-4 max-md:hidden text-gray-300">
                {car.category}
              </td>

              {/* Price */}
              <td className="p-4 text-gray-200 font-semibold">
                {currency}{car.pricePerDay}
                <span className="text-gray-400 font-normal">/day</span>
              </td>

              {/* Status */}
              <td className="p-4 max-md:hidden">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border
                    ${
                      car.isAvailable
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }
                  `}
                >
                  {car.isAvailable ? "Available" : "Unavailable"}
                </span>
              </td>

              {/* Actions */}
              <td className="p-4">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="
                      p-2 rounded-xl bg-white/5 border border-yellow-500/10
                      hover:border-yellow-400/30 hover:bg-white/10 transition-all cursor-pointer
                    "
                    title={car.isAvailable ? "Mark Unavailable" : "Mark Available"}
                  >
                    <img
                      src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon}
                      alt=""
                      className="w-5 h-5 opacity-90"
                    />
                  </button>

                  <button
                    type="button"
                    className="
                      p-2 rounded-xl bg-red-500/10 border border-red-500/20
                      hover:bg-red-500/15 transition-all cursor-pointer
                    "
                    title="Delete Car"
                  >
                    <img src={assets.delete_icon} alt="" className="w-5 h-5 opacity-90" />
                  </button>
                </div>
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

export default ManageCars

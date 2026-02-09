import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageCars = () => {

  const { isOwner, axios, currency } = useAppContext()
  const [cars, setCars] = useState([])

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get('/api/owner/cars')
      data.success
        ? setCars(data.cars)
        : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteCar = async (carId) => {
    const confirm = window.confirm('Are you sure you want to delete this car?')
    if (!confirm) return

    try {
      const { data } = await axios.post('/api/owner/delete-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isOwner) fetchOwnerCars()
  }, [isOwner])

  return (
    <div className="
      flex-1 min-h-screen
      bg-[#111111] text-white
      px-4 sm:px-6 md:px-10
      py-8 sm:py-10
    ">

      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform."
      />

      <div className="
        w-full mt-8 rounded-3xl overflow-hidden
        bg-white/5 backdrop-blur-xl
        border border-yellow-500/15
        shadow-[0px_14px_40px_rgba(0,0,0,0.65)]
      ">

        {/* EMPTY STATE */}
        {cars.length === 0 && (
          <div className="p-10 text-center text-gray-400">
            No cars listed yet
          </div>
        )}

        {cars.length > 0 && (
          <div className="w-full overflow-x-auto">

            <table className="w-full min-w-[760px] border-collapse text-left text-sm">

              <thead className="bg-black/30 text-gray-300">
                <tr>
                  <th className="p-4 font-semibold">Car</th>
                  <th className="p-4 font-semibold max-md:hidden">Category</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold max-md:hidden">Status</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {cars.map((car) => (
                  <tr
                    key={car._id}
                    className="
                      border-t border-yellow-500/10
                      hover:bg-white/5
                      transition-all
                    "
                  >

                    {/* CAR INFO */}
                    <td className="p-4">
                      <div className="flex items-center gap-4">

                        <img
                          src={car.image}
                          alt=""
                          className="
                            h-12 w-12
                            rounded-xl object-cover
                            border border-yellow-500/10
                          "
                        />

                        {/* STACK MOBILE */}
                        <div className="flex flex-col">
                          <span className="font-semibold text-white">
                            {car.brand} {car.model}
                          </span>

                          <span className="md:hidden text-xs text-gray-500 mt-1">
                            {car.seating_capacity} Seats • {car.transmission}
                          </span>
                        </div>

                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td className="p-4 max-md:hidden text-gray-300">
                      {car.category}
                    </td>

                    {/* PRICE */}
                    <td className="p-4 font-semibold text-primary">
                      {currency}{car.pricePerDay}
                      <span className="text-gray-400 font-normal"> /day</span>
                    </td>

                    {/* STATUS */}
                    <td className="p-4 max-md:hidden">
                      <span
                        className={`
                          px-3 py-1.5 rounded-full text-xs font-bold uppercase border
                          ${car.isAvailable
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"}
                        `}
                      >
                        {car.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">

                        {/* Toggle */}
                        <button
                          onClick={() => toggleAvailability(car._id)}
                          className="
                            p-2 rounded-xl
                            bg-white/5 border border-yellow-500/10
                            hover:border-yellow-400/30
                            hover:bg-white/10
                            transition-all
                          "
                          title={car.isAvailable ? "Mark Unavailable" : "Mark Available"}
                        >
                          <img
                            src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon}
                            className="w-5 h-5 opacity-90"
                            alt=""
                          />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => deleteCar(car._id)}
                          className="
                            p-2 rounded-xl
                            bg-red-500/10 border border-red-500/20
                            hover:bg-red-500/20
                            transition-all
                          "
                          title="Delete Car"
                        >
                          <img
                            src={assets.delete_icon}
                            className="w-5 h-5 opacity-90"
                            alt=""
                          />
                        </button>

                      </div>
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

export default ManageCars

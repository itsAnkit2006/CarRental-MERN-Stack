import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import CarCard from '../components/CarCard'
import { assets } from '../assets/assets'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const Cars = () => {

  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const { cars, axios } = useAppContext()

  const [input, setInput] = useState('')
  const [filteredCars, setFilteredCars] = useState([])

  const isSearchData = pickupLocation && pickupDate && returnDate

  const applyFilter = async () => {
    if (input === '') {
      setFilteredCars(cars)
      return
    }

    const filtered = cars.slice().filter((car) => {
      return car.brand.toLowerCase().includes(input.toLowerCase())
        || car.model.toLowerCase().includes(input.toLowerCase())
        || car.category.toLowerCase().includes(input.toLowerCase())
        || car.transmission.toLowerCase().includes(input.toLowerCase())
    })

    setFilteredCars(filtered)
  }

  const searchCarAvailability = async () => {
    const { data } = await axios.post('/api/bookings/check-availability', {
      location: pickupLocation,
      pickupDate,
      returnDate
    })

    if (data.success) {
      setFilteredCars(data.availableCars)
      if (data.availableCars.length === 0) {
        toast('No cars available')
      }
    }
  }

  useEffect(() => {
    isSearchData && searchCarAvailability()
  }, [])

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter()
  }, [input, cars])

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">

      {/* Header */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="
          flex flex-col items-center text-center relative overflow-hidden
          py-16 sm:py-20
          px-4 sm:px-6
        "
      >

        {/* Glow */}
        <div className="
          absolute top-0 left-1/2 -translate-x-1/2
          w-[450px] h-[450px]
          sm:w-[700px] sm:h-[700px]
          lg:w-[900px] lg:h-[900px]
          bg-yellow-500/10 blur-[160px]
          rounded-full
        " />

        <div className="relative z-10">
          <Title
            title="Available Cars"
            subTitle="Browse our selection of premium vehicles available for your next adventure."
            variant="dark"
          />
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="
            relative z-10 mt-8
            w-full max-w-md sm:max-w-xl
            h-12 sm:h-14
            flex items-center px-4 sm:px-5
            rounded-full
            bg-white/5 backdrop-blur-xl
            border border-yellow-500/15
            shadow-[0px_12px_30px_rgba(0,0,0,0.55)]
          "
        >
          <img src={assets.search_icon} className="w-4 sm:w-5 mr-3 opacity-80" alt="" />

          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model, or features"
            className="
              w-full h-full bg-transparent outline-none
              text-sm sm:text-base
              text-gray-200 placeholder-gray-500
            "
          />

          <img src={assets.filter_icon} className="w-4 sm:w-5 ml-3 opacity-80" alt="" />
        </motion.div>
      </motion.div>

      {/* Cars Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="
          px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32
          pb-16 sm:pb-24
        "
      >
        <p className="text-gray-400 text-sm sm:text-base max-w-7xl mx-auto">
          Showing{" "}
          <span className="text-primary font-semibold">
            {filteredCars.length}
          </span>{" "}
          Cars
        </p>

        <div className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-6 sm:gap-7 lg:gap-8
          mt-6
          max-w-7xl mx-auto
        ">
          {filteredCars.map((car, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}

export default Cars

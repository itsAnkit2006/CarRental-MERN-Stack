import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import CarCard from '../components/CarCard'
import { assets  } from '../assets/assets'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'

const Cars = () => {

  // getting search params from url
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const {cars, axios } = useAppContext()

  const [input, setInput] = useState('')

  const isSearchData = pickupLocation && pickupDate && returnDate
  const [filteredCars, setFilteredCars] = useState([])

  const applyFilter = async ()=>{
    if(input === ''){
      setFilteredCars(cars)
      return null
    }

    const filtered = cars.slice().filter((car)=>{
      return car.brand.toLowerCase().includes(input.toLowerCase())
      || car.model.toLowerCase().includes(input.toLowerCase())
      || car.category.toLowerCase().includes(input.toLowerCase())
      || car.transmission.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)
  }

  const searchCarAvailability = async()=>{
    const {data} = await axios.post('/api/bookings/check-availability', {location: pickupLocation, pickupDate, returnDate})
    if(data.success){
      setFilteredCars(data.availableCars)
      if(data.availableCars.length === 0){
        toast('No cars available')
      }
      return null
    }
  }

  useEffect(()=>{
    isSearchData && searchCarAvailability()
  },[])

  useEffect(()=>{
    cars.length > 0 && !isSearchData && applyFilter()
  },[input,cars])

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">

  {/* Header */}
  <motion.div
  initial={{y: 30, opacity: 0}}
  animate={{y: 0, opacity: 1}}
  transition={{duration: 0.6, ease: 'easeOut'}}
  className="flex flex-col items-center py-20 px-6 text-center relative overflow-hidden">
    
    {/* Glow */}
    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-yellow-500/10 blur-[160px] rounded-full"></div>

    <div className="relative z-10">
      <Title
        title="Available Cars"
        subTitle="Browse our selection of premium vehicles available for your next adventure."
        variant="dark"
      />
    </div>

    {/* Search Bar */}
    <motion.div
      initial={{y: 20, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 0.5, delay: 0.3}}

      className="
        relative z-10 mt-8 max-w-xl w-full h-12
        flex items-center px-5 rounded-full
        bg-white/5 backdrop-blur-xl
        border border-yellow-500/15
        shadow-[0px_12px_30px_rgba(0,0,0,0.55)]
      "
    >
      <img src={assets.search_icon} className="w-5 h-5 mr-3 opacity-80" alt="" />

      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search by make, model, or features"
        className="
          w-full h-full bg-transparent outline-none
          text-gray-200 placeholder-gray-500
        "
      />

      <img src={assets.filter_icon} className="w-5 h-5 ml-3 opacity-80" alt="" />
    </motion.div>
  </motion.div>

  {/* Cars Grid */}
  <motion.div
  initial={{ opacity: 0}}
  animate={{opacity: 1}}
  transition={{duration: 0.5, delay: 0.6}}
  className="px-6 md:px-16 lg:px-24 xl:px-32 pb-24">
    <p className="text-gray-400 xl:px-20 max-w-7xl mx-auto">
      Showing <span className="text-primary font-semibold">{filteredCars.length}</span> Cars
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 xl:px-20 max-w-7xl mx-auto">
      {filteredCars.map((car, index) => (
        <motion.div
        initial={{y: 20, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.4, delay: 0.1 * index}}
        key={index}>
          <CarCard car={car} />
        </motion.div>
      ))}
    </div>
  </motion.div>

</div>

  )
}

export default Cars

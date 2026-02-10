import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import CarCard from '../components/CarCard'
import { assets } from '../assets/assets'
import { useSearchParams, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const Cars = () => {

// URL SEARCH (from navbar)
const location = useLocation()
const query = new URLSearchParams(location.search)
const search = query.get("search")

const [searchParams] = useSearchParams()
const pickupLocation = searchParams.get('pickupLocation')
const pickupDate = searchParams.get('pickupDate')
const returnDate = searchParams.get('returnDate')

const { cars, axios } = useAppContext()

const [input, setInput] = useState('')
const [filteredCars, setFilteredCars] = useState([])

// FILTER PANEL STATE
const [showFilters, setShowFilters] = useState(false)
const [categoryFilter, setCategoryFilter] = useState("")
const [transFilter, setTransFilter] = useState("")

const isSearchData = pickupLocation && pickupDate && returnDate

// -------- FILTER LOGIC ----------
const applyFilter = () => {


const keyword = search || input

if (!keyword && !categoryFilter && !transFilter) {
  setFilteredCars(cars)
  return
}

const filtered = cars.filter((car) => {

  const keywordMatch =
    !keyword ||
    car.brand.toLowerCase().includes(keyword.toLowerCase()) ||
    car.model.toLowerCase().includes(keyword.toLowerCase()) ||
    car.category.toLowerCase().includes(keyword.toLowerCase()) ||
    car.transmission.toLowerCase().includes(keyword.toLowerCase())

  const categoryMatch =
    !categoryFilter || car.category === categoryFilter

  const transMatch =
    !transFilter || car.transmission === transFilter

  return keywordMatch && categoryMatch && transMatch
})

setFilteredCars(filtered)


}

// -------- AVAILABILITY SEARCH ----------
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

// Apply availability search
useEffect(() => {
isSearchData && searchCarAvailability()
}, [])

// Sync navbar search → input field
useEffect(() => {
if (search) {
setInput(search)
}
}, [search])

// Apply filtering
useEffect(() => {
if (!isSearchData && cars.length > 0) {
applyFilter()
}
}, [input, cars, search, categoryFilter, transFilter])

return ( <div className="min-h-screen bg-[#0B0B0B] text-white">


  {/* Header */}
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="flex flex-col items-center text-center py-16 px-4"
  >

    <Title
      title="Available Cars"
      subTitle="Browse our selection of premium vehicles available for your next adventure."
      variant="dark"
    />

    {/* SEARCH BAR */}
    <div className="
        relative mt-8 w-full max-w-xl
        flex items-center px-5 h-14
        rounded-full bg-white/5
        border border-yellow-500/15
    ">
      <img src={assets.search_icon} className="w-5 mr-3 opacity-80" alt="" />

      <input
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        type="text"
        placeholder="Search by make, model, or features"
        className="w-full bg-transparent outline-none text-gray-200"
      />

      <img
        src={assets.filter_icon}
        onClick={()=>setShowFilters(!showFilters)}
        className="w-5 ml-3 opacity-80 cursor-pointer"
        alt=""
      />
    </div>

    {/* FILTER PANEL */}
    {showFilters && (
      <div className="
          mt-4 p-4 rounded-xl
          border border-yellow-500/15
          bg-white/5
          flex flex-col sm:flex-row gap-4
      ">

        <select
          value={categoryFilter}
          onChange={(e)=>setCategoryFilter(e.target.value)}
          className="bg-black/40 p-2 rounded text-gray-200"
        >
          <option value="">All Categories</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
        </select>

        <select
          value={transFilter}
          onChange={(e)=>setTransFilter(e.target.value)}
          className="bg-black/40 p-2 rounded text-gray-200"
        >
          <option value="">All Transmission</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>

      </div>
    )}

  </motion.div>

  {/* CAR GRID */}
  <div className="px-6 pb-24">

    <p className="text-gray-400 mb-4">
      Showing <span className="text-primary font-semibold">{filteredCars.length}</span> Cars
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCars.map((car, index)=>(
        <motion.div
          key={index}
          initial={{ y:20, opacity:0 }}
          animate={{ y:0, opacity:1 }}
          transition={{ delay:index*0.08 }}
        >
          <CarCard car={car}/>
        </motion.div>
      ))}
    </div>

  </div>

</div>


)
}

export default Cars

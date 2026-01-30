import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'

const AddCar = () => {

    const currency = import.meta.env.VITE_CURRENCY

    const [image, setImage] = useState(null)
    const [car, setCar] = useState({
        brand: '',
        model: '',
        year: 0,
        pricePerDay: 0,
        category: '',
        transmission: '',
        fuel_type: 0,
        seating_capacity: 0,
        location: '',
        description: '',
    })

    const onSubmitHandler = async (e)=>{
        e.preventDefault()
    }

  return (
    <div className="flex-1 px-4 py-10 md:px-10 bg-[#111111] text-white min-h-screen">
  <Title
    title="Add New Car"
    subTitle="Fill in details to list a new car for booking, including pricing, availability and car specifications."
  />

  <form
    className="flex flex-col gap-6 text-sm mt-8 max-w-2xl"
    onSubmit={onSubmitHandler}
  >
    {/* Car Image */}
    <div className="flex items-center gap-4 w-full">
      <label htmlFor="car-image" className="cursor-pointer">
        <img
          src={image ? URL.createObjectURL(image) : assets.upload_icon}
          className="
            h-16 w-16 object-cover rounded-2xl
            bg-white/5 border border-yellow-500/15
            shadow-md
          "
          alt=""
        />
        <input
          type="file"
          id="car-image"
          accept="image/*"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>

      <div>
        <p className="text-gray-200 font-semibold">Upload car image</p>
        <p className="text-xs text-gray-500 mt-1">
          JPG/PNG recommended • Clear front-side view works best
        </p>
      </div>
    </div>

    {/* Brand + Model */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col w-full gap-2">
        <label className="text-gray-300 font-semibold">Brand</label>
        <input
          type="text"
          placeholder="e.g. BMW, Mercedes, Audi..."
          required
          className="
            px-4 py-3 rounded-xl outline-none
            bg-white/5 border border-yellow-500/15
            text-gray-200 placeholder-gray-500
            focus:border-yellow-400 transition-all
          "
          value={car.brand}
          onChange={(e) => setCar({ ...car, brand: e.target.value })}
        />
      </div>

      <div className="flex flex-col w-full gap-2">
        <label className="text-gray-300 font-semibold">Model</label>
        <input
          type="text"
          placeholder="e.g. X5, E-Class, M4..."
          required
          className="
            px-4 py-3 rounded-xl outline-none
            bg-white/5 border border-yellow-500/15
            text-gray-200 placeholder-gray-500
            focus:border-yellow-400 transition-all
          "
          value={car.model}
          onChange={(e) => setCar({ ...car, model: e.target.value })}
        />
      </div>
    </div>

    {/* Year, Price, Category */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div className="flex flex-col w-full gap-2">
        <label className="text-gray-300 font-semibold">Year</label>
        <input
          type="number"
          placeholder="2026"
          required
          className="
            px-4 py-3 rounded-xl outline-none
            bg-white/5 border border-yellow-500/15
            text-gray-200 placeholder-gray-500
            focus:border-yellow-400 transition-all
          "
          value={car.year}
          onChange={(e) => setCar({ ...car, year: e.target.value })}
        />
      </div>

      <div className="flex flex-col w-full gap-2">
        <label className="text-gray-300 font-semibold">
          Daily Price ({currency})
        </label>
        <input
          type="number"
          placeholder="100"
          required
          className="
            px-4 py-3 rounded-xl outline-none
            bg-white/5 border border-yellow-500/15
            text-gray-200 placeholder-gray-500
            focus:border-yellow-400 transition-all
          "
          value={car.pricePerDay}
          onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
        />
      </div>

      <div className="flex flex-col w-full gap-2">
        <label className="text-gray-300 font-semibold">Category</label>
        <select
          onChange={(e) => setCar({ ...car, category: e.target.value })}
          value={car.category}
          className="
            px-4 py-3 rounded-xl outline-none
            bg-[#0B0B0B] border border-yellow-500/15
            text-gray-200
            focus:border-yellow-400 transition-all
          "
        >
          <option value="">Select a category</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Van">Van</option>
        </select>
      </div>
    </div>

    {/* Transmission, Fuel Type, Seating */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div className="flex flex-col w-full gap-2">
        <label className="text-gray-300 font-semibold">Transmission</label>
        <select
          onChange={(e) => setCar({ ...car, transmission: e.target.value })}
          value={car.transmission}
          className="
            px-4 py-3 rounded-xl outline-none
            bg-[#0B0B0B] border border-yellow-500/15
            text-gray-200
            focus:border-yellow-400 transition-all
          "
        >
          <option value="">Select a transmission</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
          <option value="Semi-Automatic">Semi-Automatic</option>
        </select>
      </div>

      <div className="flex flex-col w-full gap-2">
        <label className="text-gray-300 font-semibold">Fuel Type</label>
        <select
          onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
          value={car.fuel_type}
          className="
            px-4 py-3 rounded-xl outline-none
            bg-[#0B0B0B] border border-yellow-500/15
            text-gray-200
            focus:border-yellow-400 transition-all
          "
        >
          <option value="">Select a fuel type</option>
          <option value="Gas">Gas</option>
          <option value="Diesel">Diesel</option>
          <option value="Petrol">Petrol</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      <div className="flex flex-col w-full gap-2">
        <label className="text-gray-300 font-semibold">Seating Capacity</label>
        <input
          type="number"
          placeholder="4"
          required
          className="
            px-4 py-3 rounded-xl outline-none
            bg-white/5 border border-yellow-500/15
            text-gray-200 placeholder-gray-500
            focus:border-yellow-400 transition-all
          "
          value={car.seating_capacity}
          onChange={(e) => setCar({ ...car, seating_capacity: e.target.value })}
        />
      </div>
    </div>

    {/* Location */}
    <div className="flex flex-col w-full gap-2">
      <label className="text-gray-300 font-semibold">Location</label>
      <select
        onChange={(e) => setCar({ ...car, location: e.target.value })}
        value={car.location}
        className="
          px-4 py-3 rounded-xl outline-none
          bg-[#0B0B0B] border border-yellow-500/15
          text-gray-200
          focus:border-yellow-400 transition-all
        "
      >
        <option value="">Select a location</option>
        <option value="New York">New York</option>
        <option value="Los Angeles">Los Angeles</option>
        <option value="Houston">Houston</option>
        <option value="Chicago">Chicago</option>
      </select>
    </div>

    {/* Description */}
    <div className="flex flex-col w-full gap-2">
      <label className="text-gray-300 font-semibold">Description</label>
      <textarea
        rows={5}
        placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine."
        required
        className="
          px-4 py-3 rounded-2xl outline-none resize-none
          bg-white/5 border border-yellow-500/15
          text-gray-200 placeholder-gray-500
          focus:border-yellow-400 transition-all
        "
        value={car.description}
        onChange={(e) => setCar({ ...car, description: e.target.value })}
      ></textarea>
    </div>

    {/* Button */}
    <button
      className="
        flex items-center gap-2 px-6 py-3 mt-3
        bg-primary hover:bg-primary-dull
        text-black font-bold
        rounded-xl w-max cursor-pointer
        shadow-lg shadow-yellow-500/20
        transition-all
      "
    >
      <img src={assets.tick_icon} alt="" className="w-4 h-4" />
      List Your Car
    </button>
  </form>
</div>

  )
}

export default AddCar

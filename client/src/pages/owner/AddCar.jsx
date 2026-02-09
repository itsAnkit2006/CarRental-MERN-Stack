import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddCar = () => {

  const { axios, currency } = useAppContext()

  const [image, setImage] = useState(null)

  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (isLoading) return

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))

      const { data } = await axios.post('/api/owner/add-car', formData)

      if (data.success) {
        toast.success(data.message)
        setImage(null)
        setCar({
          brand: '',
          model: '',
          year: 0,
          pricePerDay: 0,
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: 0,
          location: '',
          description: '',
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="
      flex-1 min-h-screen
      bg-[#111111] text-white
      px-4 sm:px-6 md:px-10 lg:px-14
      py-8 sm:py-10
    ">

      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including pricing, availability and car specifications."
      />

      <form
        onSubmit={onSubmitHandler}
        className="
          flex flex-col gap-6
          text-sm mt-6 sm:mt-8
          max-w-3xl
        "
      >

        {/* IMAGE */}
        <div className="flex items-center gap-4">
          <label htmlFor="car-image" className="cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              className="
                h-16 w-16 sm:h-20 sm:w-20
                object-cover rounded-2xl
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
            <p className="font-semibold text-gray-200">
              Upload car image
            </p>
            <p className="text-xs text-gray-500 mt-1">
              JPG/PNG recommended • Clear front-side view works best
            </p>
          </div>
        </div>

        {/* BRAND MODEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {["brand","model"].map(field => (
            <div key={field} className="flex flex-col gap-2">
              <label className="text-gray-300 font-semibold capitalize">
                {field}
              </label>
              <input
                required
                type="text"
                className="px-4 py-3 rounded-xl bg-white/5 border border-yellow-500/15 text-gray-200 focus:border-yellow-400"
                value={car[field]}
                onChange={(e)=>setCar({...car,[field]:e.target.value})}
              />
            </div>
          ))}
        </div>

        {/* YEAR PRICE CATEGORY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <InputField
            label="Year"
            value={car.year}
            set={(v)=>setCar({...car,year:v})}
          />
          <InputField
            label={`Daily Price (${currency})`}
            value={car.pricePerDay}
            set={(v)=>setCar({...car,pricePerDay:v})}
          />
          <SelectField
            label="Category"
            value={car.category}
            set={(v)=>setCar({...car,category:v})}
            options={["Sedan","SUV","Van"]}
          />
        </div>

        {/* TRANSMISSION FUEL SEATING */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          <SelectField
            label="Transmission"
            value={car.transmission}
            set={(v)=>setCar({...car,transmission:v})}
            options={["Automatic","Manual","Semi-Automatic"]}
          />

          <SelectField
            label="Fuel Type"
            value={car.fuel_type}
            set={(v)=>setCar({...car,fuel_type:v})}
            options={["Gas","Diesel","Petrol","Electric","Hybrid"]}
          />

          <InputField
            label="Seating Capacity"
            value={car.seating_capacity}
            set={(v)=>setCar({...car,seating_capacity:v})}
          />
        </div>


        {/* LOCATION */}
        <SelectField
          label="Location"
          value={car.location}
          set={(v)=>setCar({...car,location:v})}
          options={["New York","Los Angeles","Houston","Chicago"]}
        />


        {/* DESCRIPTION */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Description</label>
          <textarea
            rows={5}
            required
            className="px-4 py-3 rounded-2xl bg-white/5 border border-yellow-500/15 text-gray-200 resize-none focus:border-yellow-400"
            value={car.description}
            onChange={(e)=>setCar({...car,description:e.target.value})}
          />
        </div>

        {/* BUTTON */}
        <button
          className="
            flex items-center gap-2
            px-6 py-3 mt-2
            bg-primary hover:bg-primary-dull
            text-black font-bold
            rounded-xl w-full sm:w-max
            shadow-lg shadow-yellow-500/20
          "
        >
          <img src={assets.tick_icon} alt="" className="w-4 h-4" />
          {isLoading ? 'Listing...' : 'List Your Car'}
        </button>

      </form>
    </div>
  )
}

/* ---------- Small Helpers (UI only) ---------- */

const InputField = ({ label, value, set }) => (
  <div className="flex flex-col gap-2">
    <label className="text-gray-300 font-semibold">{label}</label>

    <input
      type="number"
      className="px-4 py-3 rounded-xl bg-white/5 border border-yellow-500/15 text-gray-200 focus:border-yellow-400"
      value={value ?? ""}
      onChange={(e) => set && set(e.target.value)}
    />
  </div>
)

const SelectField = ({ label, value, set, options = [] }) => (
  <div className="flex flex-col gap-2">
    <label className="text-gray-300 font-semibold">{label}</label>

    <select
      value={value ?? ""}
      onChange={(e) => set && set(e.target.value)}
      className="px-4 py-3 rounded-xl bg-[#0B0B0B] border border-yellow-500/15 text-gray-200 focus:border-yellow-400"
    >
      <option value="">Select</option>
      {options.map(o => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
)


export default AddCar

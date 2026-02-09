import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const CarDetails = () => {

  const { id } = useParams()
  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate } = useAppContext()

  const navigate = useNavigate()
  const [car, setCar] = useState(null)

  // Reviews state
  const [reviews, setReviews] = useState([])
  const [reviewLoading, setReviewLoading] = useState(false)

  const currency = import.meta.env.VITE_CURRENCY

  const fetchReviews = async () => {
    try {
      setReviewLoading(true)
      const { data } = await axios.get(`/api/feedbacks/car/${id}`)
      if (data.success) {
        setReviews(data.feedbacks || [])
      } else {
        toast.error(data.message)
      }
    } catch (e) {
      toast.error(e.message)
    } finally {
      setReviewLoading(false)
    }
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    // Step 1 — Check verification
    const { data: v } = await axios.get("/api/verification/me");

    if (!v.verification) {
      toast.error("Please submit verification first");
      navigate("/verification");
      return;
    }

    if (v.verification.status === "pending") {
      toast("Your verification is under review");
      return;
    }

    if (v.verification.status === "rejected") {
      toast.error("Verification rejected. Please resubmit");
      navigate("/verification");
      return;
    }


    // Step 2 — Proceed booking
    const { data } = await axios.post("/api/bookings/create", {
      car: id,
      pickupDate,
      returnDate
    });

    if (data.success) {
      toast.success(data.message);
      navigate("/my-bookings");
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error.message);
  }
};


  useEffect(() => {
    setCar(cars.find(car => car._id === id))
  }, [cars, id])

  useEffect(() => {
    fetchReviews()
  }, [id])

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / reviews.length).toFixed(1)
      : "0.0"

  return car ? (
  <div className="
    min-h-screen bg-[#0B0B0B] text-white
    px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32
    pt-24 sm:pt-28
    pb-16 sm:pb-24
  ">

    {/* Back button */}
    <button
      onClick={() => navigate(-1)}
      className="
        flex items-center gap-2 mb-6 sm:mb-8
        text-sm sm:text-base
        text-gray-300 hover:text-yellow-400
        transition-all cursor-pointer
      "
    >
      <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-80 w-4 h-4" />
      Back to all cars
    </button>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

      {/* LEFT */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-2"
      >

        {/* Image */}
        <motion.img
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={car.image}
          alt=""
          className="
            w-full
            max-h-[260px] sm:max-h-[340px] md:max-h-[420px]
            object-cover rounded-2xl mb-6 sm:mb-8
            border border-yellow-500/15
            shadow-[0px_16px_45px_rgba(0,0,0,0.65)]
          "
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 sm:space-y-8"
        >

          {/* Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              {car.brand} {car.model}
            </h1>

            <p className="text-gray-400 text-base sm:text-lg mt-1 sm:mt-2">
              {car.category} • {car.year}
            </p>
          </div>

          <hr className="border-yellow-500/15" />

          {/* Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
              { icon: assets.fuel_icon, text: car.fuel_type },
              { icon: assets.car_icon, text: car.transmission },
              { icon: assets.location_icon, text: car.location },
            ].map(({ icon, text }) => (
              <motion.div
                key={text}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="
                  flex flex-col items-center gap-2
                  bg-white/5 backdrop-blur-xl
                  border border-yellow-500/15
                  p-3 sm:p-4 rounded-2xl
                  text-gray-300
                "
              >
                <img src={icon} alt="" className="h-4 sm:h-5 opacity-90" />
                <span className="text-xs sm:text-sm font-medium text-center">
                  {text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h1 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
              Description
            </h1>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              {car.description}
            </p>
          </div>

          {/* Features */}
          <div>
            <h1 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
              Features
            </h1>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map(
                (item) => (
                  <li key={item} className="flex items-center text-gray-300 text-sm sm:text-base">
                    <img src={assets.check_icon} className="h-4 mr-2 opacity-90" alt="" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Reviews Header */}
          <div className="pt-2 sm:pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h1 className="text-lg sm:text-xl font-semibold">Reviews</h1>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-yellow-300 font-extrabold text-lg">{avgRating}</span>
                <span className="text-gray-400 text-sm">/5</span>
                <span className="text-gray-500 text-sm">
                  ({reviews.length} reviews)
                </span>

                <button
                  onClick={fetchReviews}
                  className="
                    px-3 py-1.5 rounded-xl
                    bg-white/5 border border-white/10
                    text-gray-200 hover:bg-white/10
                    transition text-xs sm:text-sm
                  "
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>

        </motion.div>
      </motion.div>

      {/* RIGHT — Booking */}
      <motion.form
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        onSubmit={handleSubmit}
        className="
          h-max lg:sticky lg:top-24
          rounded-3xl
          p-5 sm:p-6 lg:p-7
          space-y-5 sm:space-y-6
          bg-white/5 backdrop-blur-xl
          border border-yellow-500/15
          shadow-[0px_16px_45px_rgba(0,0,0,0.65)]
        "
      >
        <p className="flex items-end justify-between text-xl sm:text-2xl font-extrabold">
          <span className="text-primary">
            {currency}{car.pricePerDay}
          </span>
          <span className="text-xs sm:text-sm text-gray-400 font-medium">
            per day
          </span>
        </p>

        <hr className="border-yellow-500/15" />

        {/* Dates */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold text-sm">
            Pickup Date
          </label>
          <input
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            className="
              bg-white/5 border border-yellow-500/15
              px-3 py-2 rounded-xl outline-none text-gray-200
              focus:border-yellow-400
            "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold text-sm">
            Return Date
          </label>
          <input
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            type="date"
            required
            className="
              bg-white/5 border border-yellow-500/15
              px-3 py-2 rounded-xl outline-none text-gray-200
              focus:border-yellow-400
            "
          />
        </div>

        <button
          className="
            w-full py-3 rounded-xl font-bold
            bg-primary hover:bg-primary-dull
            text-black transition-all cursor-pointer
            shadow-lg shadow-yellow-500/20
          "
        >
          Book Now
        </button>

        <p className="text-center text-xs text-gray-500">
          No credit card required to reserve
        </p>
      </motion.form>
    </div>
  </div>
) : <Loader />

}

export default CarDetails

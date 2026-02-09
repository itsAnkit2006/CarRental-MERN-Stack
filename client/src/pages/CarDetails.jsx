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
    <div className="min-h-screen bg-[#0B0B0B] text-white px-6 md:px-16 lg:px-24 xl:px-32 pt-28 pb-24">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 text-gray-300 hover:text-yellow-400 transition-all cursor-pointer"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-80" />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

        {/* LEFT: Image + Details */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <motion.img
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={car.image}
            alt=""
            className="w-full h-auto md:max-h-[420px] object-cover rounded-2xl mb-8
            border border-yellow-500/15
            shadow-[0px_16px_45px_rgba(0,0,0,0.65)]"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-400 text-lg mt-2">
                {car.category} • {car.year}
              </p>
            </div>

            <hr className="border-yellow-500/15" />

            {/* Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  key={text}
                  className="
                  flex flex-col items-center gap-2
                  bg-white/5 backdrop-blur-xl
                  border border-yellow-500/15
                  p-4 rounded-2xl
                  text-gray-300
                "
                >
                  <img src={icon} alt="" className="h-5 opacity-90" />
                  <span className="text-sm font-medium">{text}</span>
                </motion.div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h1 className="text-xl font-semibold mb-3 text-white">Description</h1>
              <p className="text-gray-400 leading-relaxed">{car.description}</p>
            </div>

            {/* Features */}
            <div>
              <h1 className="text-xl font-semibold mb-3 text-white">Features</h1>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map(
                  (item) => (
                    <li key={item} className="flex items-center text-gray-300">
                      <img src={assets.check_icon} className="h-4 mr-2 opacity-90" alt="" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* ⭐ Reviews Section */}
            <div className="pt-4">
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-xl font-semibold text-white">Reviews</h1>

                <div className="flex items-center gap-2">
                  <span className="text-yellow-300 font-extrabold text-lg">{avgRating}</span>
                  <span className="text-gray-400 text-sm">/5</span>
                  <span className="text-gray-500 text-sm">({reviews.length} reviews)</span>

                  <button
                    onClick={fetchReviews}
                    className="ml-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition text-sm"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              <div className="mt-6">
                {reviewLoading ? (
                  <p className="text-gray-400">Loading reviews...</p>
                ) : reviews.length === 0 ? (
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                    <p className="text-gray-300 font-semibold">No reviews yet.</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Book this car and be the first to leave a review ✅
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.slice(0, 8).map((r) => (
                      <div
                        key={r._id}
                        className="rounded-2xl bg-white/5 border border-yellow-500/10 p-6"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-gray-200 font-bold">
                            {r.user?.name || "User"}
                          </p>
                          <p className="text-yellow-300 font-extrabold">{r.rating}/5</p>
                        </div>
                        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                          {r.comments}
                        </p>
                        <p className="text-xs text-gray-500 mt-3">
                          {String(r.createdAt).split("T")[0]}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </motion.div>
        </motion.div>

        {/* RIGHT: Booking Form */}
        <motion.form
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="
          h-max sticky top-24 rounded-3xl p-7 space-y-6
          bg-white/5 backdrop-blur-xl
          border border-yellow-500/15
          shadow-[0px_16px_45px_rgba(0,0,0,0.65)]
        "
        >
          <p className="flex items-end justify-between text-2xl font-extrabold text-white">
            <span className="text-primary">
              {currency}{car.pricePerDay}
            </span>
            <span className="text-sm text-gray-400 font-medium">per day</span>
          </p>

          <hr className="border-yellow-500/15" />

          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date" className="text-gray-300 font-semibold text-sm">
              Pickup Date
            </label>
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              className="
              bg-white/5 border border-yellow-500/15
              px-3 py-2 rounded-xl outline-none text-gray-200
              focus:border-yellow-400 transition-all
            "
              required
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="return-date" className="text-gray-300 font-semibold text-sm">
              Return Date
            </label>
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              className="
              bg-white/5 border border-yellow-500/15
              px-3 py-2 rounded-xl outline-none text-gray-200
              focus:border-yellow-400 transition-all
            "
              required
              id="return-date"
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

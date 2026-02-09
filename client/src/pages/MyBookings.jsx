import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import FeedbackModal from '../components/FeedbackModal'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const MyBookings = () => {

const { axios, user, currency } = useAppContext()

const [bookings, setBookings] = useState([])
const [openFeedback, setOpenFeedback] = useState(false)
const [selectedBooking, setSelectedBooking] = useState(null)

const [openPayment, setOpenPayment] = useState(false)
const [selectedPaymentBooking, setSelectedPaymentBooking] = useState(null)
const [paymentInfo, setPaymentInfo] = useState(null)
const [paymentMethod, setPaymentMethod] = useState("UPI")
const [payLoading, setPayLoading] = useState(false)

const fetchMyBookings = async () => {
try {
const { data } = await axios.get('/api/bookings/user')
if (data.success) setBookings(data.bookings)
else toast.error(data.message)
} catch (error) {
toast.error(error.message)
}
}

const fetchPayment = async (bookingId) => {
try {
const { data } = await axios.get(`/api/payments/booking/${bookingId}`)
if (data.success) {
setPaymentInfo(data.payment)
return data.payment
} else toast.error(data.message)
} catch (e) {
toast.error(e.message)
}
}

const openPaymentModal = async (booking) => {
setSelectedPaymentBooking(booking)
setOpenPayment(true)
setPaymentInfo(null)
const p = await fetchPayment(booking._id)
setPaymentMethod(p?.paymentMethod || "UPI")
}

const handlePayNow = async () => {
try {
setPayLoading(true)
const { data } = await axios.post("/api/payments/pay", {
bookingId: selectedPaymentBooking._id,
paymentMethod
})

  if (data.success) {
    toast.success("Payment Successful ✅")
    await fetchPayment(selectedPaymentBooking._id)
    await fetchMyBookings()
  } else toast.error(data.message)

} catch (e) {
  toast.error(e.message)
} finally {
  setPayLoading(false)
}


}

useEffect(() => {
user && fetchMyBookings()
}, [user])

return ( <div className="w-full bg-[#0B0B0B]">


  <div className="min-h-screen text-white px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 pt-28 pb-24 max-w-7xl mx-auto">

    <Title
      title="My Bookings"
      subTitle="View and manage all your car bookings."
      align="left"
      variant="dark"
    />

    {/* Empty state */}
    {bookings.length === 0 && (
      <div className="mt-20 text-center text-gray-400">
        No bookings yet 🚗
      </div>
    )}

    <div className="mt-10 space-y-8">

      {bookings.map((booking, index) => (

        <motion.div
          key={booking._id}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="
          group grid md:grid-cols-12 gap-6 p-6
          rounded-3xl
          bg-gradient-to-br from-white/5 to-white/[0.02]
          border border-yellow-500/15
          hover:shadow-[0px_20px_55px_rgba(0,0,0,0.7)]
          transition-all
          "
        >

          {/* IMAGE */}
          <div className="md:col-span-3 relative overflow-hidden rounded-2xl h-40">
            <img
              src={booking.car.image}
              className="w-full h-full object-cover group-hover:scale-105 transition"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />

            <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur">
              {booking.status}
            </span>
          </div>

          {/* DETAILS */}
          <div className="md:col-span-6 space-y-3">

            <h3 className="text-xl font-bold">
              {booking.car.brand} {booking.car.model}
            </h3>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                {booking.car.year}
              </span>
              <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                {booking.car.category}
              </span>
              <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                {booking.car.location}
              </span>
            </div>

            <div className="flex gap-4 text-sm text-gray-300 mt-3">
              <div className="flex items-center gap-2">
                <img src={assets.calendar_icon_colored} className="w-4"/>
                {booking.pickupDate.split("T")[0]} → {booking.returnDate.split("T")[0]}
              </div>
            </div>

            {/* Payment line */}
            <div className="flex items-center gap-4 mt-4 text-sm">

              <button
                onClick={() => openPaymentModal(booking)}
                className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-semibold cursor-pointer"
              >
                Payment
              </button>

              <button
                onClick={() => { setSelectedBooking(booking); setOpenFeedback(true); }}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 cursor-pointer"
              >
                Feedback
              </button>

            </div>
          </div>

          {/* PRICE PANEL */}
          <div className="md:col-span-3 flex flex-col justify-between items-end">

            <div className="text-right">
              <p className="text-gray-400 text-sm">Total</p>
              <p className="text-3xl font-extrabold text-primary">
                {currency}{booking.price}
              </p>
            </div>

            <button
              onClick={async () => {
                const p = await fetchPayment(booking._id)
                if (p) toast.success(`Payment: ${p.status}`)
              }}
              className="mt-4 text-sm underline text-yellow-300 cursor-pointer"
            >
              View Payment Status
            </button>

          </div>

        </motion.div>

      ))}
    </div>
  </div>

  <FeedbackModal
    open={openFeedback}
    onClose={() => setOpenFeedback(false)}
    bookingId={selectedBooking?._id}
    carId={selectedBooking?.car?._id}
    carName={`${selectedBooking?.car?.brand || ""} ${selectedBooking?.car?.model || ""}`}
  />

  {/* Payment Modal */}
{openPayment && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">

    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/80 backdrop-blur-md"
      onClick={() => {
        if (!payLoading) {
          setOpenPayment(false)
          setSelectedPaymentBooking(null)
          setPaymentInfo(null)
        }
      }}
    />

    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="
        relative w-full max-w-xl
        rounded-3xl
        bg-gradient-to-br from-[#121212] to-[#0a0a0a]
        border border-yellow-500/20
        shadow-[0px_25px_90px_rgba(0,0,0,0.8)]
        p-8
      "
    >

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-primary">
          Complete Payment
        </h2>

        <button
          onClick={() => setOpenPayment(false)}
          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white"
        >
          ✕
        </button>
      </div>

      {/* Status */}
      <div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-6">
        <p className="text-gray-400 text-sm">Current Status</p>

        <p className={`text-lg font-bold mt-1
          ${paymentInfo?.status === "SUCCESS"
            ? "text-green-400"
            : "text-yellow-300"}
        `}>
          {paymentInfo?.status || "Loading..."}
        </p>
      </div>

      {/* SUCCESS VIEW */}
      {paymentInfo?.status === "SUCCESS" ? (
        <div className="bg-green-500/10 border border-green-500/20 p-5 rounded-xl">
          <p className="text-green-300 font-semibold">
            Payment Completed Successfully ✔
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Method: {paymentInfo.paymentMethod}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Txn: {paymentInfo.transactionId}
          </p>
        </div>
      ) : (

        <>
          {/* Method Selection */}
          <p className="text-sm text-gray-300 mb-3 font-semibold">
            Choose Payment Method
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6 text-white">
            {["UPI","CARD","OFFLINE"].map(m=>(
              <button
                key={m}
                onClick={()=>setPaymentMethod(m)}
                className={`
                  py-3 rounded-xl font-bold border transition-all
                  ${paymentMethod===m
                    ? "bg-yellow-400 text-black border-yellow-400 scale-105"
                    : "bg-white/5 border-white/10 hover:border-yellow-500/40"
                  }
                `}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayNow}
            disabled={payLoading}
            className="
              w-full py-4 rounded-xl
              bg-primary text-black font-extrabold text-lg
              hover:scale-[1.02]
              transition-all
              shadow-lg shadow-yellow-500/20
            "
          >
            {payLoading ? "Processing..." : `Pay ${currency}${selectedPaymentBooking?.price}`}
          </button>

        </>
      )}
    </motion.div>
  </div>
)}




</div>

)
}

export default MyBookings

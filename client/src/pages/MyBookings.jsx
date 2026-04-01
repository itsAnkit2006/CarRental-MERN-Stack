import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import FeedbackModal from "../components/FeedbackModal";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const MyBookings = () => {
  const { axios, user, currency } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelLoadingId, setCancelLoadingId] = useState(null);

  const [openPayment, setOpenPayment] = useState(false);
  const [selectedPaymentBooking, setSelectedPaymentBooking] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [payLoading, setPayLoading] = useState(false);

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) setBookings(data.bookings);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchPayment = async (bookingId) => {
    try {
      const { data } = await axios.get(`/api/payments/booking/${bookingId}`);
      if (data.success) {
        setPaymentInfo(data.payment);
        return data.payment;
      } else toast.error(data.message);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const openPaymentModal = async (booking) => {
    setSelectedPaymentBooking(booking);
    setOpenPayment(true);
    setPaymentInfo(null);
    const p = await fetchPayment(booking._id);
    setPaymentMethod(p?.paymentMethod || "UPI");
  };

  const handlePayNow = async () => {
    try {
      setPayLoading(true);
      const { data } = await axios.post("/api/payments/pay", {
        bookingId: selectedPaymentBooking._id,
        paymentMethod,
      });

      if (data.success) {
        toast.success("Payment Successful ✅");
        await fetchPayment(selectedPaymentBooking._id);
        await fetchMyBookings();
      } else toast.error(data.message);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setPayLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      setCancelLoadingId(bookingId);

      const { data } = await axios.put(`/api/bookings/cancel/${bookingId}`);

      if (data.success) {
        toast.success("Booking cancelled ❌");
        await fetchMyBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Cancel failed");
    } finally {
      setCancelLoadingId(null);
    }
  };

  useEffect(() => {
    user && fetchMyBookings();
  }, [user]);

  return (
    <div className="w-full bg-[#0B0B0B]">
      <div
        className="
    min-h-screen text-white
    px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32
    pt-24 sm:pt-28
    pb-16 sm:pb-24
    max-w-7xl mx-auto
  "
      >
        <Title
          title="My Bookings"
          subTitle="View and manage all your car bookings."
          align="left"
          variant="dark"
        />

        {bookings.length === 0 && (
          <div className="mt-16 text-center text-gray-400">
            No bookings yet 🚗
          </div>
        )}

        <div className="mt-8 space-y-6">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="
            group grid grid-cols-1 md:grid-cols-12 gap-5
            p-4 sm:p-6
            rounded-3xl
            bg-gradient-to-br from-white/5 to-white/[0.02]
            border border-yellow-500/15
            hover:shadow-[0px_20px_55px_rgba(0,0,0,0.7)]
            transition-all
          "
            >
              {/* IMAGE */}
              <div className="md:col-span-3 relative overflow-hidden rounded-2xl h-40 sm:h-44">
                <img
                  src={booking.car.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                <span
                  className={`
              absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold backdrop-blur
              ${booking.status === "pending" && "bg-yellow-500/20 text-yellow-300"}
              ${booking.status === "approved" && "bg-green-500/20 text-green-300"}
              ${booking.status === "cancelled" && "bg-red-500/20 text-red-300"}
              `}
                >
                  {booking.status}
                </span>
              </div>

              {/* DETAILS */}
              <div className="md:col-span-6 space-y-3">
                <h3 className="text-lg sm:text-xl font-bold">
                  {booking.car.brand} {booking.car.model}
                </h3>

                <div className="flex flex-wrap gap-2 text-xs">
                  {[
                    booking.car.year,
                    booking.car.category,
                    booking.car.location,
                  ].map((v, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 rounded-full border border-white/10"
                    >
                      {v}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-300 mt-2">
                  <img src={assets.calendar_icon_colored} className="w-4" />
                  {booking.pickupDate.split("T")[0]} →{" "}
                  {booking.returnDate.split("T")[0]}
                </div>

                <div className="flex flex-wrap gap-3 mt-3">
                  {/* CONTACT BUTTON */}
                  {/* {booking.car?.owner?.phone && ( */}
                  <a
                    href={
                      booking.car?.owner?.phone
                        ? `https://wa.me/${booking.car.owner.phone.replace(/\D/g, "")}?text=Hi ${booking.car.owner.name}, I booked your ${booking.car.brand} ${booking.car.model}`
                        : "#"
                    }
                    onClick={(e) => {
                      if (!booking.car?.owner?.phone) {
                        e.preventDefault();
                        toast.error("Owner contact not available");
                      }
                    }}
                    className="
                    px-4 py-2 rounded-xl
                    bg-green-500 hover:bg-green-600
                    text-white font-semibold
                    transition
                  "
                  >
                    Contact
                  </a>
                  {/* )} */}

                  {/* PAYMENT (always if not cancelled) */}
                  {booking.status !== "cancelled" && (
                    <button
                      onClick={() => openPaymentModal(booking)}
                      className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-semibold"
                    >
                      Payment
                    </button>
                  )}

                  {/* FEEDBACK (only after trip ends) */}
                  {booking.status !== "cancelled" &&
                    new Date(booking.returnDate) < new Date() && (
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setOpenFeedback(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                      >
                        Feedback
                      </button>
                    )}

                  {/* CANCEL BUTTON (ONLY PENDING) */}
                  {booking.status === "pending" && (
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      disabled={cancelLoadingId === booking._id}
                      className="
        px-4 py-2 rounded-xl
        bg-red-500/90 hover:bg-red-500
        text-white font-semibold
        disabled:opacity-50
        transition
      "
                    >
                      {cancelLoadingId === booking._id
                        ? "Cancelling..."
                        : "Cancel"}
                    </button>
                  )}
                </div>
              </div>

              {/* PRICE */}
              <div className="md:col-span-3 flex flex-row md:flex-col justify-between items-center md:items-end">
                <div className="text-left md:text-right">
                  <p className="text-gray-400 text-sm">Total</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-primary">
                    {currency}
                    {booking.price}
                  </p>
                </div>

                <button
                  onClick={async () => {
                    const p = await fetchPayment(booking._id);
                    if (p) toast.success(`Payment: ${p.status}`);
                  }}
                  className="text-xs sm:text-sm underline text-yellow-300"
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

      {/* PAYMENT MODAL */}
      {openPayment && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-3 sm:px-4 py-6">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => !payLoading && setOpenPayment(false)}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="
    relative w-full max-w-5xl h-[520px]
    grid grid-cols-1 md:grid-cols-2
    rounded-2xl overflow-hidden
    shadow-[0_30px_100px_rgba(0,0,0,0.9)]
  "
          >
            {/* LEFT PANEL */}
            <div className="bg-[#1f3f2b] text-white p-6 flex flex-col justify-between">
              <div>
                {/* HEADER */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center font-bold">
                    S
                  </div>
                  <div>
                    <p className="font-semibold">RazorPay</p>
                    <p className="text-xs text-green-300">Trusted Business</p>
                  </div>
                </div>

                {/* PRICE */}
                <div className="bg-white/10 p-4 rounded-xl mb-4">
                  <p className="text-sm text-gray-200">Price Summary</p>
                  <p className="text-2xl font-bold">
                    {currency}
                    {selectedPaymentBooking?.price}
                  </p>
                </div>

                {/* USER */}
                <div className="bg-white/10 p-3 rounded-xl mb-3 text-sm">
                  Using as +91 9XXXX XXXXX
                </div>

                {/* OFFERS */}
                <div className="bg-white/10 p-3 rounded-xl text-sm">
                  Offers available on UPI
                </div>
              </div>

              <p className="text-xs text-green-200">Secured by Razorpay ⚡</p>
            </div>

            {/* RIGHT PANEL */}
            <div className="bg-white text-black p-6 flex flex-col">
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Payment Options</h2>
                <span className="text-gray-400 cursor-pointer">✕</span>
              </div>

              {/* TABS */}
              <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
                {["UPI", "CARD", "NETBANK", "WALLET"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setPaymentMethod(tab)}
                    className={`
            py-2 rounded-lg border

            ${
              paymentMethod === tab
                ? "bg-green-100 border-green-400"
                : "bg-gray-100 border-gray-200"
            }
          `}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* OFFERS */}
              <div className="bg-green-100 text-green-700 text-sm px-3 py-2 rounded mb-4">
                Upto ₹200 cashback on payment
              </div>

              {/* MAIN CONTENT */}
              <div className="flex-1 overflow-y-auto">
                {/* UPI SECTION */}
                {paymentMethod === "UPI" && (
                  <div>
                    <p className="text-sm mb-2 font-medium">UPI QR</p>

                    <div className="border rounded-xl p-4 flex flex-col items-center">
                      <div className="w-40 h-40 bg-gray-300 flex items-center justify-center text-xs">
                        QR CODE
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        Scan with any UPI app
                      </p>
                    </div>
                  </div>
                )}

                {/* CARD SECTION */}
                {paymentMethod === "CARD" && (
                  <div className="space-y-3">
                    <input
                      placeholder="Card Number"
                      className="w-full border p-2 rounded"
                    />
                    <input
                      placeholder="Expiry"
                      className="w-full border p-2 rounded"
                    />
                    <input
                      placeholder="CVV"
                      className="w-full border p-2 rounded"
                    />
                  </div>
                )}

                {/* NETBANKING */}
                {paymentMethod === "NETBANK" && (
                  <div className="text-sm text-gray-600">
                    Select your bank to continue
                  </div>
                )}
              </div>

              {/* PAY BUTTON */}
              {paymentInfo?.status === "SUCCESS" ? (
                <div className="bg-green-100 text-green-600 p-3 rounded text-center mt-4">
                  Payment Successful ✔
                </div>
              ) : (
                <button
                  onClick={handlePayNow}
                  disabled={payLoading}
                  className="
          mt-4 w-full py-3 rounded-lg
          bg-green-600 text-white font-semibold
          hover:bg-green-700 transition
        "
                >
                  {payLoading
                    ? "Processing..."
                    : `Pay ${currency}${selectedPaymentBooking?.price}`}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;

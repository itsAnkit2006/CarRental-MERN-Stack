import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import TransactionLog from "../models/TransactionLog.js";

// API: Get payments of logged-in user
export const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate("booking")
      .sort({ createdAt: -1 });

    res.json({ success: true, payments });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API: Pay a booking (simulate UPI/Card payment)
export const payBooking = async (req, res) => {
  try {
    const { bookingId, paymentMethod } = req.body;

    if (!bookingId || !paymentMethod) {
      return res.json({ success: false, message: "bookingId and paymentMethod required" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.json({ success: false, message: "Booking not found" });

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const payment = await Payment.findOne({ booking: bookingId });
    if (!payment) return res.json({ success: false, message: "Payment record not found" });

    payment.paymentMethod = paymentMethod;
    payment.status = "SUCCESS";
    payment.paidAt = new Date();
    payment.transactionId = `TXN_${Date.now()}`;
    await payment.save();

    await TransactionLog.create({
      user: req.user._id,
      action: "PAYMENT_SUCCESS",
      booking: booking._id,
      payment: payment._id,
      amount: payment.amount,
      message: `Payment done via ${paymentMethod}`,
    });

    res.json({ success: true, message: "Payment Successful", payment });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API: Get payment by bookingId (for user)
export const getPaymentByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const payment = await Payment.findOne({ booking: bookingId }).populate("booking");

    if (!payment) {
      return res.json({ success: false, message: "Payment not found for this booking" });
    }

    // security: only booking owner can view
    if (payment.user.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    res.json({ success: true, payment });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const paymentSchema = new mongoose.Schema(
  {
    booking: { type: ObjectId, ref: "Booking", required: true },
    user: { type: ObjectId, ref: "User", required: true },
    owner: { type: ObjectId, ref: "User", required: true },

    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },

    paymentMethod: {
      type: String,
      enum: ["UPI", "CARD", "OFFLINE"],
      default: "OFFLINE",
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
      default: "PENDING",
    },

    transactionId: { type: String, default: "" },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;

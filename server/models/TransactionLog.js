import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const transactionLogSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User" }, // actor
    action: { type: String, required: true }, // BOOKING_CREATED, CAR_ADDED, etc.
    booking: { type: ObjectId, ref: "Booking" },
    car: { type: ObjectId, ref: "Car" },
    payment: { type: ObjectId, ref: "Payment" },

    amount: { type: Number, default: 0 },
    message: { type: String, default: "" },

    transaction_date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const TransactionLog = mongoose.model("TransactionLog", transactionLogSchema);
export default TransactionLog;

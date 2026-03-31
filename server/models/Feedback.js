import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const feedbackSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    car: { type: ObjectId, ref: "Car", required: true },
    booking: { type: ObjectId, ref: "Booking" },

    rating: { type: Number, required: true, min: 1, max: 5 },
    comments: { type: String, default: "" },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;

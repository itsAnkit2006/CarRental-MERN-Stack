import Feedback from "../models/Feedback.js";
import Booking from "../models/Booking.js";

// API: Add feedback (after booking)
export const addFeedback = async (req, res) => {
  try {
    const { car, booking, rating, comments } = req.body;

    if (!car || !rating) {
      return res.json({ success: false, message: "car and rating required" });
    }

    // If booking provided, verify ownership
    if (booking) {
      const bookingData = await Booking.findById(booking);
      if (!bookingData) return res.json({ success: false, message: "Booking not found" });

      if (bookingData.user.toString() !== req.user._id.toString()) {
        return res.json({ success: false, message: "Unauthorized" });
      }
    }

    const feedback = await Feedback.create({
      user: req.user._id,
      car,
      booking,
      rating,
      comments,
    });

    res.json({ success: true, message: "Feedback Submitted", feedback });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API: Get feedbacks for a car
export const getCarFeedbacks = async (req, res) => {
  try {
    const { carId } = req.params;
    const feedbacks = await Feedback.find({ car: carId })
      .populate("user", "name image")
      .sort({ createdAt: -1 });

    res.json({ success: true, feedbacks });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

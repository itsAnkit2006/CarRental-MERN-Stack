import React, { useState } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const FeedbackModal = ({ open, onClose, bookingId, carName, carId }) => {
  const { axios } = useAppContext();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submitFeedback = async () => {
    if (!bookingId) return toast.error("Booking not found");
    if (!comment.trim()) return toast.error("Please write a comment");

    try {
      setLoading(true);
      const { data } = await axios.post("/api/feedbacks/add", {
        booking: bookingId,
        car: carId,
        rating,
        comments: comment,
      });

      if (data.success) {
        toast.success(data.message || "Feedback submitted");
        setComment("");
        setRating(5);
        onClose?.(true);
      } else {
        toast.error(data.message || "Failed to submit feedback");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => !loading && onClose?.(false)}
      />

      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-lg rounded-3xl bg-[#0F0F0F] border border-yellow-500/15 shadow-[0px_20px_80px_rgba(0,0,0,0.65)] p-6 md:p-7"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white">Give Feedback</h2>
            <p className="text-sm text-gray-400 mt-1">
              For: <span className="text-gray-200 font-semibold">{carName || "Car"}</span>
            </p>
          </div>

          <button
            onClick={() => !loading && onClose?.(false)}
            className="text-white w-10 h-10 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/20 hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {/* rating */}
          <div>
            <p className="text-sm text-gray-300 mb-2">Rating</p>
            <div className="flex items-center gap-2">
              {[1,2,3,4,5].map((n) => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  className={`w-10 h-10 rounded-2xl border transition font-bold ${
                    rating >= n
                      ? "bg-yellow-400 text-black border-yellow-400"
                      : "bg-white/5 text-gray-200 border-white/10 hover:border-yellow-500/20"
                  }`}
                  type="button"
                >
                  ★
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-400">({rating}/5)</span>
            </div>
          </div>

          {/* comment */}
          <div>
            <p className="text-sm text-gray-300 mb-2">Comment</p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200 placeholder:text-gray-500 outline-none focus:border-yellow-500/30"
              placeholder="Write your experience..."
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => !loading && onClose?.(false)}
              className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={submitFeedback}
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-yellow-400 text-black font-bold hover:opacity-90 transition disabled:opacity-50"
              type="button"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackModal;

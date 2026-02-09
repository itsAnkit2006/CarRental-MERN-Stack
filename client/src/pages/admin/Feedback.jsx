import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Feedback = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  const fetchItems = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/admin/feedback", {
        headers: { Authorization: token },
      });

      if (data.success) {
        setItems(data.items || []);
      } else {
        toast.error(data.message);
      }

    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div
      className="
        min-h-screen
        bg-[#111111] text-white
        px-4 sm:px-6 md:px-10
        py-8 sm:py-10
        relative overflow-hidden
      "
    >

      {/* Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-yellow-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Feedback
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          User reviews & ratings.
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="mt-10 text-gray-400">
          Loading feedback...
        </div>
      ) : (
        <div className="relative z-10 mt-10 space-y-5">

          {/* EMPTY */}
          {items.length === 0 && (
            <div className="
              rounded-3xl p-8 text-center
              bg-white/5 border border-yellow-500/15
            ">
              <p className="text-gray-400">
                No feedback found
              </p>
            </div>
          )}

          {/* ITEMS */}
          {items.map((f) => (
            <div
              key={f._id}
              className="
                rounded-3xl p-6
                bg-white/5 backdrop-blur-xl
                border border-yellow-500/15
                shadow-[0px_14px_40px_rgba(0,0,0,0.60)]
                hover:-translate-y-1
                transition-all duration-300
              "
            >

              <div className="flex flex-col md:flex-row md:justify-between gap-4">

                {/* LEFT */}
                <div>

                  <p className="text-gray-200 font-semibold">
                    {f.user?.name || "User"} • {f.car?.name || "Car"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {f.user?.email}
                  </p>

                  {/* Rating */}
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-yellow-300 font-extrabold text-lg">
                      {f.rating}/5
                    </span>

                    <span className="text-xs text-gray-500">
                      Rating
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-300 mt-4 text-sm leading-relaxed">
                    {f.comment}
                  </p>

                </div>

                {/* RIGHT */}
                <div className="md:text-right text-xs text-gray-500">
                  Created: {String(f.createdAt).split("T")[0]}
                </div>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Feedback;

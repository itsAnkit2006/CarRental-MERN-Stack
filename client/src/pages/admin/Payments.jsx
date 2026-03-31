import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Payments = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  const fetchItems = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/admin/payments", {
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
          Payments
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          All payments made through bookings.
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="mt-10 text-gray-400">
          Loading payments...
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
                No payments found
              </p>
            </div>
          )}

          {/* LIST */}
          {items.map((p) => (
            <div
              key={p._id}
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
                    {p.user?.name || "User"} • {p.booking?._id?.slice(-6) || "Booking"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {p.user?.email}
                  </p>

                  <p className="text-sm text-gray-400 mt-3">
                    Amount:
                    <span className="ml-2 text-primary font-extrabold text-lg">
                      {p.amount}
                    </span>
                  </p>

                  {/* STATUS BADGE */}
                  <span
                    className={`
                      inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase border
                      ${p.status === "SUCCESS"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"}
                    `}
                  >
                    {p.status}
                  </span>

                </div>

                {/* RIGHT */}
                <div className="md:text-right text-xs text-gray-500">
                  <p>Method: {p.paymentMethod || "N/A"}</p>
                  <p className="mt-1">
                    Created: {String(p.createdAt).split("T")[0]}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Payments;

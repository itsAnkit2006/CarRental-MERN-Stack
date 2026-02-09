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
      if (data.success) setItems(data.items || []);
      else toast.error(data.message);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Payments</h2>
      <p className="text-gray-400 text-sm mt-1">All payments made through bookings.</p>

      {loading ? (
        <p className="mt-6 text-gray-400">Loading...</p>
      ) : (
        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-500">No payments found.</p>
          ) : (
            items.map((p) => (
              <div key={p._id} className="rounded-3xl bg-white/5 border border-yellow-500/15 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-gray-200 font-semibold">
                      {p.user?.name || "User"} • {p.booking?._id?.slice(-6) || "Booking"}
                    </p>
                    <p className="text-sm text-gray-500">{p.user?.email}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Amount: <span className="text-yellow-300 font-extrabold">{p.amount}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Status: {p.status}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">Method: {p.paymentMethod || "N/A"}</p>
                    <p className="text-xs text-gray-500 mt-1">Created: {String(p.createdAt).split("T")[0]}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Payments;

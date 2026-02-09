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
      <h2 className="text-xl font-bold">Feedback</h2>
      <p className="text-gray-400 text-sm mt-1">User reviews & ratings.</p>

      {loading ? (
        <p className="mt-6 text-gray-400">Loading...</p>
      ) : (
        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-500">No feedback found.</p>
          ) : (
            items.map((f) => (
              <div key={f._id} className="rounded-3xl bg-white/5 border border-yellow-500/15 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-gray-200 font-semibold">
                      {f.user?.name || "User"} • {f.car?.name || "Car"}
                    </p>
                    <p className="text-sm text-gray-500">{f.user?.email}</p>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-yellow-300 font-extrabold">{f.rating}/5</span>
                      <span className="text-gray-500 text-xs">Rating</span>
                    </div>

                    <p className="text-gray-300 mt-3 text-sm leading-relaxed">{f.comment}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">Created: {String(f.createdAt).split("T")[0]}</p>
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

export default Feedback;

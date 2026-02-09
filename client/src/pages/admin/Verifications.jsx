import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Verifications = () => {
  const [preview, setPreview] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/verifications", {
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

  const updateStatus = async (userId, status) => {
  try {
    const { data } = await axios.post(
      "/api/admin/verify-user",
      { userId, status },
      { headers: { Authorization: token } }
    );

    if (data.success) {
      toast.success(data.message || "Updated");
      fetchItems();
    } else {
      toast.error(data.message);
    }
  } catch (e) {
    toast.error(e.message);
  }
};

  return (
    <div>
      <h2 className="text-xl font-bold">User Verifications</h2>
      <p className="text-gray-400 text-sm mt-1">Approve or reject user verification requests.</p>

      {loading ? (
        <p className="mt-6 text-gray-400">Loading...</p>
      ) : (
        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-500">No verification requests.</p>
          ) : (
            items.map((v) => (
              <div key={v._id} className="rounded-3xl bg-white/5 border border-yellow-500/15 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-gray-200 font-semibold">{v.user?.name || "User"}</p>
                    <p className="text-sm text-gray-500">{v.user?.email}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      <span className="text-gray-300">ID:</span> {v.id_type} - {v.id_number}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Status: <span className="text-yellow-300 font-bold">{v.status}</span></p>
                  </div>

                  <div className="flex gap-2 items-center">

                  {/* ⭐ View Document */}
                  {v.documentImage && (
                    <button
                      onClick={() => setPreview(v.documentImage)}
                      className="px-4 py-2 rounded-2xl
                      bg-yellow-400/10 text-yellow-300
                      border border-yellow-400/20
                      hover:bg-yellow-400/20
                      transition text-sm font-bold"
                    >
                      View Doc
                    </button>
                  )}

                  <button
                    onClick={() => updateStatus(v.user?._id, "verified")}
                    className="px-4 py-2 rounded-2xl bg-green-500/15 text-green-300 border border-green-500/25 hover:bg-green-500/20 transition text-sm font-bold"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(v.user?._id, "rejected")}
                    className="px-4 py-2 rounded-2xl bg-red-500/15 text-red-300 border border-red-500/25 hover:bg-red-500/20 transition text-sm font-bold"
                  >
                    Reject
                  </button>

                </div>

                </div>
              </div>
            ))
          )}
        </div>
      )}

    {/* ⭐ Image Preview Modal */}
{preview && (
  <div
    className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center"
    onClick={() => setPreview(null)}
  >
    <img
      src={preview}
      alt="Verification"
      className="max-h-[85vh] max-w-[90vw] rounded-2xl border border-yellow-500 shadow-xl"
    />
  </div>
)}
  

    </div>
  );
};

export default Verifications;

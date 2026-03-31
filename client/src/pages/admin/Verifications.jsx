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

  const statusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-bold uppercase border";

    if (status === "verified")
      return <span className={`${base} bg-green-500/10 text-green-400 border-green-500/20`}>Verified</span>;

    if (status === "rejected")
      return <span className={`${base} bg-red-500/10 text-red-400 border-red-500/20`}>Rejected</span>;

    return <span className={`${base} bg-yellow-500/10 text-yellow-300 border-yellow-500/20`}>Pending</span>;
  };

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
          User Verifications
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          Approve or reject user verification requests.
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="mt-10 text-gray-400">
          Loading verification requests...
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
                No verification requests
              </p>
            </div>
          )}

          {/* LIST */}
          {items.map((v) => (
            <div
              key={v._id}
              className="
                rounded-3xl p-6
                bg-white/5 backdrop-blur-xl
                border border-yellow-500/15
                shadow-[0px_14px_40px_rgba(0,0,0,0.60)]
                hover:-translate-y-1
                transition-all duration-300
              "
            >

              <div className="flex flex-col md:flex-row md:justify-between gap-5">

                {/* LEFT */}
                <div>
                  <p className="text-gray-200 font-semibold text-lg">
                    {v.user?.name || "User"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {v.user?.email}
                  </p>

                  <p className="text-sm text-gray-400 mt-3">
                    <span className="text-gray-300 font-semibold">ID:</span>{" "}
                    {v.id_type} — {v.id_number}
                  </p>

                  <div className="mt-3">
                    {statusBadge(v.status)}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-2 items-center">

                  {/* View Doc */}
                  {v.documentImage && (
                    <button
                      onClick={() => setPreview(v.documentImage)}
                      className="
                        px-4 py-2 rounded-xl
                        bg-yellow-400/10 text-yellow-300
                        border border-yellow-400/20
                        hover:bg-yellow-400/20
                        transition text-sm font-bold
                      "
                    >
                      View Document
                    </button>
                  )}

                  <button
                    onClick={() => updateStatus(v.user?._id, "verified")}
                    className="
                      px-4 py-2 rounded-xl
                      bg-green-500/15 text-green-300
                      border border-green-500/25
                      hover:bg-green-500/25
                      transition text-sm font-bold
                    "
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(v.user?._id, "rejected")}
                    className="
                      px-4 py-2 rounded-xl
                      bg-red-500/15 text-red-300
                      border border-red-500/25
                      hover:bg-red-500/25
                      transition text-sm font-bold
                    "
                  >
                    Reject
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* IMAGE PREVIEW MODAL */}
      {preview && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur"
          onClick={() => setPreview(null)}
        >
          <img
            src={preview}
            alt="Verification"
            className="
              max-h-[85vh] max-w-[90vw]
              rounded-2xl
              border border-yellow-500/30
              shadow-2xl
            "
          />
        </div>
      )}

    </div>
  );
};

export default Verifications;

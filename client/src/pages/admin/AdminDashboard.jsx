import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AdminDashboard = () => {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  const fetchStats = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/admin/stats", {
        headers: { Authorization: token },
      });

      if (data.success) {
        setStats(data.stats);
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
    fetchStats();
  }, []);

  const cards = [
    { label: "Users", value: stats?.users || 0 },
    { label: "Cars", value: stats?.cars || 0 },
    { label: "Bookings", value: stats?.bookings || 0 },
    { label: "Pending Verifications", value: stats?.pendingVerifications || 0 },
  ];

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
          Admin Dashboard
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          Overview of platform activity.
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="mt-10 text-gray-400">
          Loading statistics...
        </div>
      ) : (
        <div
          className="
            relative z-10 mt-10
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
            gap-6
          "
        >
          {cards.map((card) => (
            <div
              key={card.label}
              className="
                rounded-3xl p-6
                bg-white/5 backdrop-blur-xl
                border border-yellow-500/15
                shadow-[0px_14px_40px_rgba(0,0,0,0.60)]
                hover:-translate-y-1
                transition-all duration-300
              "
            >
              <p className="text-sm text-gray-400 font-semibold uppercase tracking-wide">
                {card.label}
              </p>

              <h1 className="text-3xl font-extrabold mt-3 text-primary">
                {card.value}
              </h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

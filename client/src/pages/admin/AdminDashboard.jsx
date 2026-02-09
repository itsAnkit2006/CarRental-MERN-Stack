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
      if (data.success) setStats(data.stats);
      else toast.error(data.message);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <p className="text-gray-400 text-sm mt-1">Overview of platform activity.</p>

      {loading ? (
        <p className="mt-6 text-gray-400">Loading...</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Users", value: stats?.users || 0 },
            { label: "Cars", value: stats?.cars || 0 },
            { label: "Bookings", value: stats?.bookings || 0 },
            { label: "Pending Verifications", value: stats?.pendingVerifications || 0 },
          ].map((card, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white/5 border border-yellow-500/15 p-6 shadow-[0px_14px_40px_rgba(0,0,0,0.60)]"
            >
              <p className="text-sm text-gray-400">{card.label}</p>
              <h1 className="text-3xl font-extrabold mt-2 text-yellow-300">{card.value}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

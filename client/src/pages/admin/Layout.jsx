import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin-login");
  }, []);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-2xl transition text-sm font-semibold ${
      isActive ? "bg-yellow-400 text-black" : "text-gray-200 hover:bg-white/10"
    }`;

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 pt-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
          <button
            onClick={logout}
            className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm"
          >
            Logout
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
          <NavLink to="/admin/verifications" className={linkClass}>Verifications</NavLink>
          <NavLink to="/admin/payments" className={linkClass}>Payments</NavLink>
          <NavLink to="/admin/feedback" className={linkClass}>Feedback</NavLink>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

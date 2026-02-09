import React, { useState } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AdminRegister = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!secret.trim()) return toast.error("Secret key required");

    try {
      setLoading(true);

      const { data } = await axios.post("/api/admin/register", {
        name,
        email,
        password,
        secret,
      });

      if (data.success) {
        toast.success(data.message || "Admin created ✅");
        navigate("/admin-login");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-3xl bg-white/5 border border-yellow-500/15 p-7 shadow-[0px_14px_40px_rgba(0,0,0,0.60)]"
      >
        <h1 className="text-2xl font-extrabold">Admin Register</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Create admin account (protected by secret key).
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            className="w-full rounded-2xl bg-[#0B0B0B] border border-white/10 px-4 py-3 text-gray-200 outline-none focus:border-yellow-500/30"
            placeholder="Admin Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full rounded-2xl bg-[#0B0B0B] border border-white/10 px-4 py-3 text-gray-200 outline-none focus:border-yellow-500/30"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full rounded-2xl bg-[#0B0B0B] border border-white/10 px-4 py-3 text-gray-200 outline-none focus:border-yellow-500/30"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="w-full rounded-2xl bg-[#0B0B0B] border border-yellow-500/30 px-4 py-3 text-gray-200 outline-none focus:border-yellow-500/60"
            placeholder="Secret Key"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-yellow-400 text-black font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Admin"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin-login")}
            className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition"
          >
            Go to Admin Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminRegister;

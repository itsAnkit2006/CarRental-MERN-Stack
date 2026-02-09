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
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-[#0B0B0B] text-white
        px-4 sm:px-6
        relative overflow-hidden
      "
    >

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-yellow-500/10 blur-[160px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="
          relative z-10
          w-full max-w-md
          rounded-3xl
          bg-white/5 backdrop-blur-xl
          border border-yellow-500/15
          p-6 sm:p-8
          shadow-[0px_14px_40px_rgba(0,0,0,0.60)]
        "
      >

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Admin Register
        </h1>

        <p className="text-gray-400 mt-2 text-sm leading-relaxed">
          Create an administrator account secured with a secret key.
        </p>

        {/* Form */}
        <form onSubmit={submit} className="mt-7 space-y-4">

          <input
            required
            autoFocus
            className="
              w-full rounded-2xl
              bg-[#0B0B0B]
              border border-white/10
              px-4 py-3
              text-gray-200
              outline-none
              focus:border-yellow-500/40
              transition-all
            "
            placeholder="Admin Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            required
            className="
              w-full rounded-2xl
              bg-[#0B0B0B]
              border border-white/10
              px-4 py-3
              text-gray-200
              outline-none
              focus:border-yellow-500/40
              transition-all
            "
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            className="
              w-full rounded-2xl
              bg-[#0B0B0B]
              border border-white/10
              px-4 py-3
              text-gray-200
              outline-none
              focus:border-yellow-500/40
              transition-all
            "
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            required
            className="
              w-full rounded-2xl
              bg-[#0B0B0B]
              border border-yellow-500/30
              px-4 py-3
              text-gray-200
              outline-none
              focus:border-yellow-500/60
              transition-all
            "
            placeholder="Secret Key"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />

          {/* Submit */}
          <button
            disabled={loading}
            className="
              w-full py-3 mt-2
              rounded-2xl
              bg-primary hover:bg-primary-dull
              text-black font-bold
              transition-all
              shadow-lg shadow-yellow-500/20
              disabled:opacity-50
            "
          >
            {loading ? "Creating..." : "Create Admin"}
          </button>

          {/* Go to login */}
          <button
            type="button"
            onClick={() => navigate("/admin-login")}
            className="
              w-full py-3
              rounded-2xl
              bg-white/5 border border-white/10
              text-gray-200
              hover:bg-white/10
              transition-all
            "
          >
            Go to Admin Login
          </button>

        </form>
      </motion.div>
    </div>
  );
};

export default AdminRegister;

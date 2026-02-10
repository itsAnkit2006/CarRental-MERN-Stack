import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {

  const [search, setSearch] = useState("");

  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext();

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const navVariants = {
    hidden: { y: -18, opacity: 0, filter: "blur(6px)" },
    show: { y: 0, opacity: 1, filter: "blur(0px)" },
  };

  const menuContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: 0.08 },
    },
  };

  const menuItem = {
    hidden: { y: 8, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const handleSearch = (e) => {
  e.preventDefault();

  if (!search.trim()) return;

  navigate(`/cars?search=${encodeURIComponent(search)}`);
  };

  return (
    <motion.div
      variants={navVariants}
      initial="hidden"
      animate="show"
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className={`
        flex items-center justify-between
        px-4 sm:px-6 md:px-10 xl:px-32
        py-3 sm:py-4
        border-b border-yellow-500/20
        sticky top-0 z-50
        ${location.pathname === "/" ? "bg-[#0B0B0B]" : "bg-[#111111]"}
      `}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <motion.img
          whileHover={{ scale: 1.06, rotate: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
          src={assets.logo}
          alt="logo"
          className="h-7 sm:h-8 select-none"
        />
      </Link>

      {/* Desktop Menu */}
      <motion.div
        variants={menuContainer}
        initial="hidden"
        animate="show"
        className="hidden sm:flex items-center gap-6 lg:gap-10"
      >
        {menuLinks.map((link, index) => (
          <motion.div key={index} variants={menuItem}>
            <Link
              to={link.path}
              className="
                text-gray-300 font-medium tracking-wide
                hover:text-yellow-400 transition-all duration-200
                relative
                after:content-['']
                after:absolute after:left-0 after:-bottom-1
                after:w-0 after:h-[2px] after:bg-yellow-400
                hover:after:w-full after:transition-all after:duration-300
              "
            >
              {link.name}
            </Link>
          </motion.div>
        ))}

        {/* Search */}
        <motion.form
          onSubmit={handleSearch}
          variants={menuItem}
          className="
            hidden lg:flex items-center text-sm gap-2
            border border-yellow-500/25 bg-white/5
            px-3 py-2 rounded-full
            w-[220px] xl:w-[260px]
          "
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-500"
            placeholder="Search Cars"
          />
          <button type="submit">
            <img
              src={assets.search_icon}
              alt="search"
              className="w-4 h-4 opacity-80 cursor-pointer"
            />
          </button>
        </motion.form>

        {/* Buttons */}
        <motion.div variants={menuItem} className="flex items-center gap-3 lg:gap-4">
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => (isOwner ? navigate("/owner") : changeRole())}
            className="
              text-gray-300 font-medium tracking-wide
              hover:text-yellow-400 transition-all duration-200
            "
          >
            {isOwner ? "Dashboard" : "List cars"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => (user ? logout() : setShowLogin(true))}
            className="
              cursor-pointer px-6 lg:px-8 py-2
              rounded-xl font-bold
              bg-primary hover:bg-primary-dull
              transition-all
              text-black shadow-lg shadow-yellow-500/10
            "
          >
            {user ? "Logout" : "Login"}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Mobile Button */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        className="sm:hidden cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-all"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className={`
              sm:hidden fixed top-[60px] right-0
              w-full h-[calc(100vh-60px)]
              overflow-y-auto
              z-50 px-6 py-8
              border-t border-yellow-500/20
              ${location.pathname === "/" ? "bg-[#0B0B0B]/95" : "bg-[#111111]/95"}
              backdrop-blur-md
            `}
          >
            <motion.div
              variants={menuContainer}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-6"
            >
              {menuLinks.map((link, index) => (
                <motion.div key={index} variants={menuItem}>
                  <Link
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className="text-lg text-gray-200 font-semibold hover:text-yellow-400 transition-all"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={menuItem} className="flex flex-col gap-4 mt-4">
                <button
                  onClick={() => (isOwner ? navigate("/owner") : changeRole())}
                  className="text-gray-200 font-semibold hover:text-yellow-400 transition-all text-left"
                >
                  {isOwner ? "Dashboard" : "List cars"}
                </button>

                <button
                  onClick={() => (user ? logout() : setShowLogin(true))}
                  className="
                    px-8 py-3 rounded-xl font-bold
                    bg-primary hover:bg-primary-dull
                    transition-all text-black
                    shadow-lg shadow-yellow-500/10
                  "
                >
                  {user ? "Logout" : "Login"}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;

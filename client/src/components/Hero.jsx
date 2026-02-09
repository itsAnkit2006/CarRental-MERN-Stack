import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");

  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(
      `/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`
    );
  };

  // Motion variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="
        min-h-screen
        flex flex-col items-center justify-center
        gap-10 sm:gap-12 lg:gap-14
        text-center
        px-4 sm:px-6
        relative overflow-hidden
        bg-gradient-to-b from-[#0B0B0B] via-[#111111] to-[#0B0B0B]
        text-white
      "
    >
      {/* Background glow */}
      <motion.div className="absolute inset-0 pointer-events-none">
        <div className="
          absolute top-[-150px] left-1/2 -translate-x-1/2
          w-[500px] h-[500px]
          sm:w-[700px] sm:h-[700px]
          lg:w-[900px] lg:h-[900px]
          bg-yellow-500/10 blur-[160px] rounded-full
        "/>

        <div className="
          absolute bottom-[-200px] right-[-120px]
          w-[350px] h-[350px]
          sm:w-[500px] sm:h-[500px]
          lg:w-[600px] lg:h-[600px]
          bg-yellow-500/10 blur-[160px] rounded-full
        "/>
      </motion.div>

      {/* Title */}
      <motion.h1
        variants={fadeUp}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl
          font-extrabold tracking-tight
          leading-tight
          relative z-10
        "
      >
        Luxury Cars on{" "}
        <span className="text-primary drop-shadow-[0_0_12px_rgba(255,214,0,0.40)]">
          Rent
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={fadeUp}
        transition={{ duration: 0.45 }}
        className="
          max-w-xl sm:max-w-2xl
          text-gray-400
          text-sm sm:text-base
          -mt-4 sm:-mt-6
          relative z-10
        "
      >
        Book premium cars in seconds. Choose location, pick dates, and drive in style.
      </motion.p>

      {/* Search Form */}
      <motion.form
        variants={fadeUp}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        onSubmit={handleSearch}
        className="
          relative z-10
          flex flex-col lg:flex-row
          items-stretch lg:items-center
          gap-5 lg:gap-8
          p-5 sm:p-6 lg:px-8
          rounded-2xl lg:rounded-full
          w-full max-w-md sm:max-w-xl lg:max-w-5xl
          border border-yellow-500/20
          bg-white/5 backdrop-blur-xl
          shadow-[0px_12px_30px_rgba(0,0,0,0.40)]
        "
      >
        {/* Inputs Container */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 w-full">

          {/* Location */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-gray-300 font-medium">
              Pickup Location
            </label>

            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="
                w-full
                bg-[#0B0B0B] text-gray-200 outline-none
                font-semibold cursor-pointer
                border border-yellow-500/15 rounded-lg
                px-3 py-2.5
                focus:border-yellow-400 transition-all
              "
            >
              <option value="">Select a city</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <p className="px-1 text-xs text-gray-500">
              {pickupLocation ? pickupLocation : "Please select location"}
            </p>
          </div>

          {/* Pickup Date */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-gray-300 font-medium">
              Pick-up Date
            </label>
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="
                w-full
                text-sm text-gray-200
                bg-white/5 border border-yellow-500/15
                rounded-lg px-3 py-2.5 outline-none
                focus:border-yellow-400 transition-all
              "
              required
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-gray-300 font-medium">
              Return Date
            </label>
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              className="
                w-full
                text-sm text-gray-200
                bg-white/5 border border-yellow-500/15
                rounded-lg px-3 py-2.5 outline-none
                focus:border-yellow-400 transition-all
              "
              required
            />
          </div>
        </div>

        {/* Search Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 30px rgba(255,214,0,0.18)",
          }}
          whileTap={{ scale: 0.96 }}
          className="
            flex items-center justify-center gap-2
            w-full lg:w-auto
            px-8 py-3
            bg-primary hover:bg-primary-dull
            text-black font-bold
            rounded-full cursor-pointer
            shadow-lg shadow-yellow-500/20
            transition-all duration-200
          "
        >
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
          Search
        </motion.button>
      </motion.form>

      {/* Car Image */}
      <motion.img
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        animate={{ y: [0, -10, 0] }}
        className="
          max-h-60 sm:max-h-72 md:max-h-80 lg:max-h-[360px]
          drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]
          select-none relative z-10
        "
        src={assets.main_car}
        alt="car"
      />
    </motion.section>
  );
};

export default Hero;

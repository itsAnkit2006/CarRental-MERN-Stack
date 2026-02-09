import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Banner = () => {
  const container = {
    hidden: { opacity: 0, y: 35, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 140,
        damping: 18,
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full bg-[#0B0B0B] py-20">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="
          relative flex flex-col md:flex-row md:items-center items-center justify-between
          px-8 md:px-14 pt-10 pb-8
          bg-gradient-to-r from-[#0B0B0B] via-[#111111] to-[#0B0B0B]
          border border-yellow-500/15
          max-w-6xl mx-auto
          rounded-3xl overflow-hidden
          shadow-[0px_14px_45px_rgba(0,0,0,0.65)]
        "
      >
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-yellow-500/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-yellow-500/10 blur-[140px] rounded-full" />

        {/* Text */}
        <div className="relative z-10 text-white max-w-xl">
          <motion.h2
            variants={item}
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            Do You Own a{" "}
            <span className="text-primary drop-shadow-[0_0_12px_rgba(255,214,0,0.38)]">
              Luxury Car?
            </span>
          </motion.h2>

          <motion.p variants={item} className="mt-3 text-gray-300">
            Monetize your vehicle effortlessly by listing it on{" "}
            <span className="text-primary font-semibold">CarRental</span>.
          </motion.p>

          <motion.p variants={item} className="mt-3 text-gray-400 leading-relaxed">
            We take care of insurance, driver verification, and secure payments — so you
            can earn passive income stress-free.
          </motion.p>

          <motion.button
            variants={item}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 28px rgba(255, 214, 0, 0.18)",
            }}
            whileTap={{ scale: 0.96 }}
            className="
              mt-6 px-7 py-3 rounded-xl text-sm font-bold
              bg-primary hover:bg-primary-dull text-black
              transition-all cursor-pointer
              shadow-lg shadow-yellow-500/20
            "
          >
            List your car
          </motion.button>
        </div>

        {/* Car Image */}
        <motion.img
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.12 }}
          animate={{ y: [0, -8, 0] }}
          // infinite subtle floating effect
          // NOTE: animate + whileInView works fine together in motion
          // (floating continues after view)
          className="
            relative z-10 max-h-48 md:max-h-52 mt-10 md:mt-0
            drop-shadow-[0px_25px_40px_rgba(0,0,0,0.65)] select-none
          "
          src={assets.banner_car_image}
          alt="car"
        />
      </motion.div>
    </div>
  );
};

export default Banner;

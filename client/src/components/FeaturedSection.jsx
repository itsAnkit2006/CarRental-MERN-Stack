import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();

  // Variants
  const section = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  const grid = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 22, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.section
      variants={section}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="
        flex flex-col items-center
        py-16 sm:py-20 lg:py-24
        px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32
        bg-[#0B0B0B] text-white relative overflow-hidden
      "
    >
      {/* Background glow */}
      <div
        className="
          absolute top-0 left-1/2 -translate-x-1/2
          w-[420px] h-[420px]
          sm:w-[600px] sm:h-[600px]
          lg:w-[800px] lg:h-[800px]
          bg-yellow-500/10 blur-[120px]
          rounded-full pointer-events-none
        "
      />

      {/* Title */}
      <motion.div
        variants={fadeUp}
        className="relative z-10 w-full flex flex-col items-center text-center"
      >
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for your next adventure."
        />
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={grid}
        className="
          relative z-10
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-6 sm:gap-7 lg:gap-8
          mt-10 sm:mt-12
          w-full
        "
      >
        {cars.slice(0, 6).map((carItem) => (
          <motion.div
            key={carItem._id}
            variants={card}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            whileHover={{ y: -6 }}
            className="h-full"
          >
            <CarCard car={carItem} />
          </motion.div>
        ))}
      </motion.div>

      {/* CTA button */}
      <motion.button
        variants={fadeUp}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className="
          relative z-10 mt-12 sm:mt-14
          flex items-center justify-center gap-2
          px-6 sm:px-8 py-2.5 sm:py-3
          text-sm sm:text-base
          rounded-full font-semibold
          border border-yellow-500/30 text-yellow-400
          hover:bg-yellow-400 hover:text-black
          transition-all duration-200 cursor-pointer
          shadow-md hover:shadow-yellow-500/20
        "
      >
        Explore all cars
        <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" />
      </motion.button>
    </motion.section>
  );
};

export default FeaturedSection;

import React from "react";
import { motion } from "motion/react";

const Newsletter = () => {
  const container = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
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

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="
        relative w-full bg-[#0B0B0B]
        py-16 sm:py-20 lg:py-28
        px-4 sm:px-6 md:px-16
        overflow-hidden
      "
    >
      {/* Glow */}
      <div
        className="
          absolute top-0 left-1/2 -translate-x-1/2
          w-[420px] h-[420px]
          sm:w-[650px] sm:h-[650px]
          lg:w-[900px] lg:h-[900px]
          bg-yellow-500/10 blur-[150px]
          rounded-full pointer-events-none
        "
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 max-w-3xl mx-auto">
        <motion.h1
          variants={item}
          className="
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            font-extrabold tracking-tight text-white
          "
        >
          Never Miss a{" "}
          <span className="text-primary drop-shadow-[0_0_12px_rgba(255,214,0,0.35)]">
            Deal!
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="
            text-sm sm:text-base md:text-lg
            text-gray-400 pb-4 sm:pb-6
            leading-relaxed max-w-xl
          "
        >
          Subscribe to get the latest offers, new arrivals, and exclusive discounts.
        </motion.p>

        {/* Form */}
        <motion.form
          variants={item}
          onSubmit={(e) => e.preventDefault()}
          className="
            flex flex-col sm:flex-row
            items-stretch sm:items-center
            gap-3 sm:gap-0
            max-w-xl w-full
          "
        >
          <input
            className="
              h-12 sm:h-14 w-full px-4
              bg-white/5 text-gray-200 placeholder-gray-500
              border border-yellow-500/15
              rounded-xl sm:rounded-l-xl sm:rounded-r-none
              outline-none
              focus:border-yellow-400 transition-all
            "
            type="email"
            placeholder="Enter your email"
            required
          />

          <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: "0px 0px 28px rgba(255,214,0,0.18)",
            }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="
              h-12 sm:h-14
              px-6 sm:px-10 md:px-12
              bg-primary hover:bg-primary-dull
              text-black font-bold
              rounded-xl sm:rounded-l-none sm:rounded-r-xl
              transition-all cursor-pointer
              shadow-lg shadow-yellow-500/20
            "
          >
            Subscribe
          </motion.button>
        </motion.form>

        <motion.p variants={item} className="text-xs text-gray-500 mt-1">
          No spam — only premium deals & updates.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default Newsletter;

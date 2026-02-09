import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonial:
        "I've rented cars from various companies, but the experience with CarRental was exceptional.",
    },
    {
      name: "John Smith",
      location: "New York, USA",
      image: assets.testimonial_image_2,
      testimonial:
        "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!",
    },
    {
      name: "Ava Johnson",
      location: "Sydney, Australia",
      image: assets.testimonial_image_1,
      testimonial:
        "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service.",
    },
  ];

  const container = {
    hidden: { opacity: 0, y: 35, filter: "blur(10px)" },
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

  const card = {
    hidden: { opacity: 0, y: 22, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="
        py-16 sm:py-20 lg:py-28
        px-4 sm:px-6 md:px-12 lg:px-20 xl:px-40
        bg-[#0B0B0B] text-white
        relative overflow-hidden
      "
    >
      {/* Glow */}
      <div
        className="
          absolute top-10 left-1/2 -translate-x-1/2
          w-[420px] h-[420px]
          sm:w-[650px] sm:h-[650px]
          lg:w-[850px] lg:h-[850px]
          bg-yellow-500/10 blur-[150px]
          rounded-full pointer-events-none
        "
      />

      <div className="relative z-10">
        <motion.div variants={item}>
          <Title
            title="What Our Customers Say"
            subTitle="Discover why travelers choose CarRental for premium cars, smooth booking, and reliable support."
            variant="dark"
          />
        </motion.div>

        {/* Grid */}
        <motion.div
          className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            gap-6 sm:gap-7 lg:gap-8
            mt-10 sm:mt-12
          "
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={card}
              whileHover={{
                y: -8,
                boxShadow: "0px 18px 40px rgba(0,0,0,0.75)",
              }}
              transition={{ type: "spring", stiffness: 180, damping: 16 }}
              className="
                bg-white/5 border border-yellow-500/15 backdrop-blur-xl
                p-5 sm:p-6 lg:p-7
                rounded-2xl
                shadow-[0px_12px_28px_rgba(0,0,0,0.55)]
                transition-all duration-300
              "
            >
              {/* Header */}
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  className="
                    w-10 h-10 sm:w-12 sm:h-12
                    rounded-full
                    border border-yellow-500/20
                    object-cover
                  "
                  src={testimonial.image}
                  alt={testimonial.name}
                />

                <div className="min-w-0">
                  <p className="text-base sm:text-lg font-semibold text-white truncate">
                    {testimonial.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 truncate">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <motion.div
                initial={{ opacity: 0.7, scale: 0.98 }}
                whileHover={{ opacity: 1, scale: 1.02 }}
                className="flex items-center gap-1 mt-4 sm:mt-5"
              >
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <img
                      key={i}
                      src={assets.star_icon}
                      alt="star-icon"
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-90"
                    />
                  ))}
              </motion.div>

              {/* Review */}
              <p className="text-gray-300 mt-4 sm:mt-5 font-light leading-relaxed text-sm sm:text-base">
                "{testimonial.testimonial}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Testimonial;

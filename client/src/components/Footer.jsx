import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Footer = () => {
  const container = {
    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 16,
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0 },
  };

  const icon = {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <motion.footer
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="bg-[#0B0B0B] text-gray-400"
    >
      <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 pt-16 sm:pt-20 lg:pt-24 pb-10 text-sm">
        {/* TOP GRID */}
        <motion.div
          variants={item}
          className="
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
            gap-12 pb-10
            border-b border-yellow-500/15
          "
        >
          {/* Brand */}
          <div className="lg:col-span-1 max-w-sm">
            <motion.img
              variants={item}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 240, damping: 16 }}
              src={assets.logo}
              alt="logo"
              className="h-8 md:h-9 select-none"
            />

            <motion.p
              variants={item}
              className="mt-4 leading-relaxed text-gray-400 text-sm sm:text-base"
            >
              Premium car rental service with a wide selection of luxury and
              everyday vehicles for all your driving needs.
            </motion.p>

            <motion.div
              variants={item}
              className="flex items-center gap-3 sm:gap-4 mt-6"
            >
              {[
                assets.facebook_logo,
                assets.instagram_logo,
                assets.twitter_logo,
                assets.gmail_logo,
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  variants={icon}
                  whileHover={{ y: -2, scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    p-2.5 sm:p-2
                    rounded-lg
                    bg-white/5 border border-yellow-500/10
                    hover:border-yellow-400/40 hover:bg-white/10
                    transition-all
                  "
                >
                  <img src={social} alt="social" className="w-5 h-5 opacity-90" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div variants={item}>
            <h2 className="text-base font-semibold text-white uppercase tracking-wide">
              Quick Links
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm sm:text-base">
              <li><a href="#" className="hover:text-yellow-400 transition-all">Home</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-all">Browse Cars</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-all">List Your Car</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-all">About Us</a></li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={item}>
            <h2 className="text-base font-semibold text-white uppercase tracking-wide">
              Resources
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm sm:text-base">
              <li><a href="#" className="hover:text-yellow-400 transition-all">Help Center</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-all">Terms of Service</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-all">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-all">Insurance</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={item}>
            <h2 className="text-base font-semibold text-white uppercase tracking-wide">
              Contact
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm sm:text-base text-gray-400">
              <li>1234 Luxury Drive</li>
              <li>San Francisco, CA 94107</li>
              <li>+1 234 567 890</li>
              <li className="break-all">info@example.com</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* BOTTOM BAR */}
        <motion.div
          variants={item}
          className="
            flex flex-col md:flex-row
            gap-4 md:gap-3
            items-center md:items-center
            justify-between
            pt-6
            text-gray-500 text-xs sm:text-sm
          "
        >
          <p className="text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-yellow-400 font-semibold">CarRental</span>.
            All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <li><a href="#" className="hover:text-yellow-400 transition-all">Privacy</a></li>
            <span className="text-yellow-500/30 hidden sm:inline">|</span>
            <li><a href="#" className="hover:text-yellow-400 transition-all">Terms</a></li>
            <span className="text-yellow-500/30 hidden sm:inline">|</span>
            <li><a href="#" className="hover:text-yellow-400 transition-all">Cookies</a></li>
          </ul>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

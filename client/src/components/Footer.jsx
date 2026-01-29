import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="bg-[#0B0B0B] text-gray-400">
  <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-24 pb-10 text-sm">

    {/* TOP GRID */}
    <div className="flex flex-wrap justify-between items-start gap-10 pb-10 border-b border-yellow-500/15">

      {/* Brand */}
      <div className="max-w-sm">
        <img src={assets.logo} alt="logo" className="h-8 md:h-9" />
        <p className="mt-4 leading-relaxed text-gray-400">
          Premium car rental service with a wide selection of luxury and everyday vehicles
          for all your driving needs.
        </p>

        <div className="flex items-center gap-4 mt-6">
          <a href="#" className="p-2 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-400/40 hover:bg-white/10 transition-all">
            <img src={assets.facebook_logo} alt="facebook" className="w-5 h-5 opacity-90" />
          </a>

          <a href="#" className="p-2 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-400/40 hover:bg-white/10 transition-all">
            <img src={assets.instagram_logo} alt="instagram" className="w-5 h-5 opacity-90" />
          </a>

          <a href="#" className="p-2 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-400/40 hover:bg-white/10 transition-all">
            <img src={assets.twitter_logo} alt="twitter" className="w-5 h-5 opacity-90" />
          </a>

          <a href="#" className="p-2 rounded-lg bg-white/5 border border-yellow-500/10 hover:border-yellow-400/40 hover:bg-white/10 transition-all">
            <img src={assets.gmail_logo} alt="gmail" className="w-5 h-5 opacity-90" />
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-base font-semibold text-white uppercase tracking-wide">
          Quick Links
        </h2>
        <ul className="mt-4 flex flex-col gap-2">
          <li><a href="#" className="hover:text-yellow-400 transition-all">Home</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition-all">Browse Cars</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition-all">List Your Car</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition-all">About Us</a></li>
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h2 className="text-base font-semibold text-white uppercase tracking-wide">
          Resources
        </h2>
        <ul className="mt-4 flex flex-col gap-2">
          <li><a href="#" className="hover:text-yellow-400 transition-all">Help Center</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition-all">Terms of Service</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition-all">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition-all">Insurance</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h2 className="text-base font-semibold text-white uppercase tracking-wide">
          Contact
        </h2>
        <ul className="mt-4 flex flex-col gap-2 text-gray-400">
          <li>1234 Luxury Drive</li>
          <li>San Francisco, CA 94107</li>
          <li>+1 234 567 890</li>
          <li>info@example.com</li>
        </ul>
      </div>
    </div>

    {/* BOTTOM BAR */}
    <div className="flex flex-col md:flex-row gap-3 items-center justify-between pt-6 text-gray-500">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="text-yellow-400 font-semibold">CarRental</span>. All rights reserved.
      </p>

      <ul className="flex items-center gap-4">
        <li><a href="#" className="hover:text-yellow-400 transition-all">Privacy</a></li>
        <span className="text-yellow-500/30">|</span>
        <li><a href="#" className="hover:text-yellow-400 transition-all">Terms</a></li>
        <span className="text-yellow-500/30">|</span>
        <li><a href="#" className="hover:text-yellow-400 transition-all">Cookies</a></li>
      </ul>
    </div>

  </div>
</div>

  )
}

export default Footer

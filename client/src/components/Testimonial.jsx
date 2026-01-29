import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';

const Testimonial = () => {

    const testimonials = [
        { name: "Emma Rodriguez",
          location: "Barcelona, Spain",
          image: assets.testimonial_image_1,
          testimonial: "I've rented cars from various companies, but the experience with CarRental was exceptional." 
        },
        { name: "John Smith",
          location: "New York, USA",
          image: assets.testimonial_image_2,
          testimonial: "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!" 
        },
        { name: "Ava Johnson",
          location: "Sydney, Australia",
          image: assets.testimonial_image_3,
          testimonial: "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service." 
        }
    ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44 bg-[#0B0B0B] text-white relative overflow-hidden">

  {/* Glow */}
  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[850px] bg-yellow-500/10 blur-[160px] rounded-full"></div>

  <div className="relative z-10">
    <Title
      title="What Our Customers Say"
      subTitle="Discover why travelers choose CarRental for premium cars, smooth booking, and reliable support."
      variant="dark"
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="
            bg-white/5 border border-yellow-500/15 backdrop-blur-xl
            p-7 rounded-2xl
            shadow-[0px_12px_28px_rgba(0,0,0,0.55)]
            hover:-translate-y-2 hover:shadow-[0px_18px_40px_rgba(0,0,0,0.75)]
            transition-all duration-500
          "
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <img
              className="w-12 h-12 rounded-full border border-yellow-500/20 object-cover"
              src={testimonial.image}
              alt={testimonial.name}
            />
            <div>
              <p className="text-lg font-semibold text-white">{testimonial.name}</p>
              <p className="text-sm text-gray-400">{testimonial.location}</p>
            </div>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 mt-5">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <img
                  key={i}
                  src={assets.star_icon}
                  alt="star-icon"
                  className="w-4 h-4 opacity-90"
                />
              ))}
          </div>

          {/* Review */}
          <p className="text-gray-300 mt-5 font-light leading-relaxed">
            "{testimonial.testimonial}"
          </p>
        </div>
      ))}
    </div>
  </div>
</div>

  )
}

export default Testimonial

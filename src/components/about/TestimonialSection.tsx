"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: "Zeerostock transformed how we handle excess inventory. We've reduced holding costs by 45% and attracted serious buyers for components we thought were worthless.",
      author: "Sarah Mitchell",
      company: "Global Tech Inc.",
      badge: "Verified Supplier",
    },
    {
      text: "The platform's transparency and vetted buyer network gave us confidence to list our surplus materials. Within weeks, we cleared $200K in dead stock and recovered valuable warehouse space.",
      author: "James Rodriguez",
      company: "Industrial Solutions Ltd.",
      badge: "Premium Member",
    },
    {
      text: "Finding quality surplus inventory used to take weeks of phone calls. Now we source everything through Zeerostock - competitive pricing, reliable sellers, and seamless transactions every time.",
      author: "Emily Chen",
      company: "Manufacturing Plus Co.",
      badge: "Top Buyer",
    },
    {
      text: "The RFQ system changed our procurement process. We can now compare offers from multiple suppliers instantly and negotiate better deals on surplus components.",
      author: "Michael Thompson",
      company: "Tech Innovations Inc.",
      badge: "Verified Buyer",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="w-full bg-[#EEFBF6] py-[43px]">
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full flex flex-col items-center">
          {/* Title */}
          <h2 className="font-bold text-[40px] leading-tight lg:leading-[50px] text-center text-[#0d1b2a] mb-[8px]">
            <span className="text-[#2ec096]">Trusted</span> By Industry Leaders
          </h2>

          {/* Subtitle */}
          <p className="font-semibold text-[11px] leading-relaxed lg:leading-[24px] text-center text-[#686868] max-w-3xl mb-[43px]">
            See how businesses like yours are maximizing value from surplus
            inventory
          </p>

          {/* Testimonial Card Container */}
          <div className="relative w-full max-w-2xl mx-auto px-[32px] sm:px-[43px]">
            {/* Left Arrow */}
            <button
              onClick={prevTestimonial}
              className="absolute left-[-27px] sm:left-[-33px] top-1/2 -translate-y-1/2 z-10 hover:opacity-80 transition-opacity bg-white rounded-full p-2 shadow-md"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-[16px] h-[16px] text-[#2ec096]" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative bg-[#eeffef] rounded-[20px] p-[21px] sm:p-[27px] lg:p-[32px] min-h-[240px] flex flex-col justify-center shadow-sm"
              >
                {/* Content */}
                <div className="text-center flex flex-col items-center gap-[16px]">
                  {/* Quote */}
                  <p className="font-medium text-lg sm:text-xl lg:text-[15px] leading-relaxed lg:leading-[22px] text-[#686868]">
                    &quot;{testimonials[currentIndex].text}&quot;
                  </p>

                  {/* Stars */}
                  <div className="flex justify-center gap-6 sm:gap-7 lg:gap-[21px]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-[16px] h-[16px] fill-[#2ec096] text-[#2ec096]"
                      />
                    ))}
                  </div>

                  {/* Divider Line */}
                  <div className="w-full h-[1px] bg-gray-300 my-2" />

                  {/* Author Info */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-bold text-xl sm:text-2xl lg:text-[19px] leading-tight lg:leading-[28px] text-black">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="font-semibold text-lg sm:text-xl lg:text-[14px] leading-tight lg:leading-[17px] text-black">
                      {testimonials[currentIndex].company}
                    </p>
                    <p className="font-medium text-sm sm:text-base lg:text-[10px] leading-relaxed lg:leading-[15px] text-[#3f3737]">
                      {testimonials[currentIndex].badge}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Arrow */}
            <button
              onClick={nextTestimonial}
              className="absolute right-[-27px] sm:right-[-33px] top-1/2 -translate-y-1/2 z-10 hover:opacity-80 transition-opacity bg-white rounded-full p-2 shadow-md"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-[16px] h-[16px] text-[#2ec096]" />
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-[11px] mt-[21px]">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-[7px] h-[7px] rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-[#2ec096]"
                      : "bg-[#d9d9d9] hover:bg-[#2ec096]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

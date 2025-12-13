"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      company: "TechFlow Industries",
      industry: "Electronics",
      savings: "$2.3M Recovered",
      impact: "45% reduction in holding costs",
      image:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&h=515&fit=crop&q=80",
    },
    {
      company: "BuildRight Materials",
      industry: "Construction",
      savings: "$1.8M Recovered",
      impact: "60% faster inventory turnover",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&h=515&fit=crop&q=80",
    },
    {
      company: "GlobalTech Solutions",
      industry: "Technology",
      savings: "$3.1M Recovered",
      impact: "35% cost reduction achieved",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=515&fit=crop&q=80",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="relative w-full bg-[#f0fdf7] py-20">
      <div className="max-w-[1440px] mx-auto px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[48px] leading-tight font-bold text-[#0A2540] mb-4 font-['Poppins']">
            Real Results from{" "}
            <span className="text-[#2aae7a]">Real Businesses</span>
          </h2>
          <p className="text-[18px] text-[#6B7280] font-['Poppins']">
            See how companies like yours are maximizing value from surplus
            inventory
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center gap-6">
          {/* Left Preview Card */}
          <div className="w-[140px] h-[400px] rounded-[32px] overflow-hidden brightness-[0.4]">
            <img
              src={
                testimonials[
                  (currentIndex - 1 + testimonials.length) % testimonials.length
                ].image
              }
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevTestimonial}
            className="absolute left-[50px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-20 hover:bg-gray-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-[#0A2540]" strokeWidth={3} />
          </button>

          {/* Main Card */}
          <div className="relative w-[700px] h-[450px] rounded-[32px] overflow-hidden shadow-2xl">
            <img
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].company}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
              {/* Content */}
              <div className="mb-8">
                <p className="text-[36px] leading-tight font-bold text-[#2aae7a] mb-3 font-['Poppins']">
                  {testimonials[currentIndex].savings}
                </p>
                <h3 className="text-[36px] leading-tight font-bold text-white mb-2 font-['Poppins']">
                  {testimonials[currentIndex].company}
                </h3>
                <p className="text-[24px] leading-normal font-semibold text-white mb-3 font-['Poppins']">
                  {testimonials[currentIndex].industry}
                </p>
                <p className="text-[20px] font-normal text-white/90 font-['Poppins']">
                  {testimonials[currentIndex].impact}
                </p>
              </div>

              {/* CTA Button */}
              <button className="w-full max-w-[400px] py-4 bg-[#2aae7a] rounded-xl text-[20px] font-semibold text-white hover:bg-[#2aae7a]/90 transition-colors font-['Poppins']">
                Read Case Study
              </button>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextTestimonial}
            className="absolute right-[50px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-20 hover:bg-gray-50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-[#0A2540]" strokeWidth={3} />
          </button>

          {/* Right Preview Card */}
          <div className="w-[140px] h-[400px] rounded-[32px] overflow-hidden brightness-[0.4]">
            <img
              src={testimonials[(currentIndex + 1) % testimonials.length].image}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

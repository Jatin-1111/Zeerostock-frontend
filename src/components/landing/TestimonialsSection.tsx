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
    <section className="relative w-full bg-[#eefbf6] py-15">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-[38px] leading-tight font-medium text-[#0d1b2a] mb-2 font-['Poppins']">
            Real Results from{" "}
            <span className="text-[#2aae7a]">Real Businesses</span>
          </h2>
          <p className="text-lg font-semibold text-[#868181] font-['Poppins']">
            See how companies like yours are maximizing value from surplus
            inventory
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center gap-4">
          {/* Left Preview Card */}
          <div className="w-[114px] h-[330px] rounded-[30px] overflow-hidden brightness-[0.4]">
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

          {/* Main Card */}
          <div className="relative w-[674px] h-[386px] rounded-[30px] overflow-hidden shadow-2xl">
            <img
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].company}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Left Arrow */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-[68px] h-[68px] bg-transparent rounded-full flex items-center justify-center z-30 hover:bg-white/10 transition-colors rotate-180"
              aria-label="Previous testimonial"
            >
              <ChevronRight
                className="w-[68px] h-[68px] text-white"
                strokeWidth={2}
              />
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-[68px] h-[68px] bg-transparent rounded-full flex items-center justify-center z-30 hover:bg-white/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight
                className="w-[68px] h-[68px] text-white"
                strokeWidth={2}
              />
            </button>

            <div className="relative h-full flex flex-col items-center justify-center text-center">
              {/* Content */}
              <div className="mb-6">
                <p className="text-[30px] leading-tight font-extrabold text-[#58ea50] mb-4 font-['Poppins']">
                  {testimonials[currentIndex].savings}
                </p>
                <h3 className="text-[30px] leading-tight font-extrabold text-white mb-4 font-['Poppins']">
                  {testimonials[currentIndex].company}
                </h3>
                <p className="text-[26px] leading-normal font-bold text-white mb-4 font-['Poppins']">
                  {testimonials[currentIndex].industry}
                </p>
                <p className="text-[21px] font-semibold text-white font-['Poppins']">
                  {testimonials[currentIndex].impact}
                </p>
              </div>

              {/* CTA Button */}
              <button className="w-[396px] h-[53px] bg-[#2aae7a] rounded-[15px] text-[21px] font-bold text-white hover:bg-[#2aae7a]/90 transition-colors font-['Poppins']">
                Read Case Study
              </button>
            </div>
          </div>

          {/* Right Preview Card */}
          <div className="w-[114px] h-[330px] rounded-[30px] overflow-hidden brightness-[0.4]">
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

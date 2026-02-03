"use client";

import { Star, Quote } from "lucide-react"; // Import Quote icon for the card
import { useState, useRef } from "react";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      rating: 5,
      quote:
        '"Sold $5M in surplus machinery through Zeerostock. The platform connected us with buyers we never would have found."',
      metric: "$5M inventory cleared",
      name: "Operations Manager, ManufacturePlus Corp",
    },
    {
      rating: 5,
      quote:
        '"Reduced storage costs by 70% by quickly moving excess steel inventory. The buyer quality is exceptional."',
      metric: "70% storage reduction",
      name: "Warehouse Director, Steelflow Industries",
    },
    {
      rating: 5,
      quote:
        '"Our go-to platform for electronics surplus. Consistent sales, great margins, and professional buyers."',
      metric: "$2.8M annual sales",
      name: "CEO, TechSurplus Solutions",
    },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  return (
    <div className="w-full bg-[#eeffef] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-[50px]">
      {/* Content Container */}
      <div className="max-w-[1080px] mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-[40px] md:mb-[84px]">
          <h2 className="text-[22px] md:text-[26px] leading-[35px] font-medium text-[#0d1b2a] mb-[7px]">
            Real <span className="text-[#2ec096]">Results</span> from Real{" "}
            <span className="text-[#2ec096]">Suppliers</span>
          </h2>
          <p className="text-[12px] font-semibold text-[#9c9c9c]">
            See how suppliers are converting surplus inventory into significant
            revenue
          </p>
        </div>

        {/* Carousel / Grid Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-4 md:gap-[53px] pb-8 md:pb-0 scroll-smooth no-scrollbar"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-full md:min-w-0 snap-center flex flex-col bg-white rounded-2xl shadow-sm p-6 border border-[#e5fbf0] md:border-none md:bg-transparent md:shadow-none md:p-0"
              >
                {/* Quote Icon (Mobile Card style) */}
                <div className="md:hidden flex justify-center mb-4">
                  <Quote className="w-6 h-6 text-[#2ec096] fill-[#2ec096]" />
                </div>

                {/* Quote - Fixed Height on desktop */}
                <p className="text-sm md:text-xs leading-relaxed md:leading-normal font-medium text-[#4b5563] md:text-[#727272] text-center mb-4 md:mb-[32px] md:h-[29px]">
                  {testimonial.quote}
                </p>

                {/* Metric (Mobile Card style priority) */}
                <p className="md:hidden text-[13px] leading-normal font-bold text-black text-center mb-3">
                  {testimonial.metric}
                </p>

                {/* Stars */}
                <div className="flex gap-[5px] justify-center mb-4 md:mb-[10px]">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-[14px] h-[14px] md:w-[12px] md:h-[12px] fill-[#FBBF24] text-[#FBBF24] md:fill-[#2aae7a] md:text-[#2aae7a]"
                    />
                  ))}
                </div>

                {/* Divider Line (Desktop only) */}
                <div className="hidden md:block h-[1px] bg-[#d1d1d1] mb-[7px]" />

                {/* Metric (Desktop style) */}
                <p className="hidden md:block text-[10px] leading-normal font-semibold text-[#2aae7a] text-center mb-[15px]">
                  {testimonial.metric}
                </p>

                {/* Divider Line (Mobile Card style) */}
                <div className="md:hidden h-[1px] bg-gray-100 mb-4 w-full" />

                {/* Author */}
                <p className="text-[11px] md:text-[9px] leading-normal font-medium text-[#2ec096] md:text-[#0d1b2a] text-center">
                  {testimonial.name}
                </p>
                <p className="md:hidden text-[10px] text-[#6b7280] text-center mt-0.5">
                  {/* Ops manager logic if needed, split from name */}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination Dots (Mobile) */}
          <div className="flex justify-center gap-2 mt-2 md:hidden">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-[#2ec096] w-4" : "bg-[#d1d5db]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

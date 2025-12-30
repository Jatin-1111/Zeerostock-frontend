"use client";

import { Star } from "lucide-react";

export default function TestimonialsSection() {
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

  return (
    <div className="w-full bg-[#eeffef] px-[60px] py-[75px]">
      {/* Content Container */}
      <div className="max-w-[1320px] mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-[126px]">
          <h2 className="text-[39px] leading-[52px] font-medium text-[#0d1b2a] mb-[11px]">
            Real <span className="text-[#2ec096]">Results</span> from Real{" "}
            <span className="text-[#2ec096]">Suppliers</span>
          </h2>
          <p className="text-[18px] font-semibold text-[#9c9c9c]">
            See how suppliers are converting surplus inventory into significant
            revenue
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[80px]">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col">
              {/* Quote - Fixed Height */}
              <p className="text-[11px] leading-normal font-medium text-[#727272] text-center mb-[48px] h-[44px]">
                {testimonial.quote}
              </p>

              {/* Stars */}
              <div className="flex gap-[7px] justify-center mb-[15px]">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-[18px] h-[18px] fill-[#2aae7a] text-[#2aae7a]"
                  />
                ))}
              </div>

              {/* Metric */}
              <p className="text-[15px] leading-normal font-semibold text-[#2aae7a] text-center mb-[22px]">
                {testimonial.metric}
              </p>

              {/* Divider Line */}
              <div className="h-[1px] bg-[#d1d1d1] mb-[10px]" />

              {/* Author */}
              <p className="text-[14px] leading-normal font-medium text-[#0d1b2a] text-center">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

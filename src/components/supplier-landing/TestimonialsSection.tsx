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
    <div className="w-full bg-[#eeffef] px-[40px] py-[50px]">
      {/* Content Container */}
      <div className="max-w-4xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-[84px]">
          <h2 className="text-2xl leading-snug font-medium text-[#0d1b2a] mb-[7px]">
            Real <span className="text-[#2ec096]">Results</span> from Real{" "}
            <span className="text-[#2ec096]">Suppliers</span>
          </h2>
          <p className="text-sm font-semibold text-[#9c9c9c]">
            See how suppliers are converting surplus inventory into significant
            revenue
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col">
              {/* Quote - Fixed Height */}
              <p className="text-xs leading-normal font-medium text-subtle text-center mb-8 h-8">
                {testimonial.quote}
              </p>

              {/* Stars */}
              <div className="flex gap-1 justify-center mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-secondary text-secondary"
                  />
                ))}
              </div>

              {/* Metric */}
              <p className="text-xs leading-normal font-semibold text-[#2aae7a] text-center mb-[15px]">
                {testimonial.metric}
              </p>

              {/* Divider Line */}
              <div className="h-px bg-border mb-2" />

              {/* Author */}
              <p className="text-xs leading-normal font-medium text-[#0d1b2a] text-center">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

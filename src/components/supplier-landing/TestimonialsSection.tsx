"use client";

import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      rating: 5,
      quote:
        '"Sold $5M in surplus machinery through Zeerostock. The platform connected us with buyers we never would have found."',
      metric: "$5M inventory cleared",
      name: "Operations Manager",
      company: "ManufacturePlus Corp",
    },
    {
      rating: 5,
      quote:
        '"Reduced storage costs by 70% by quickly moving excess steel inventory. The buyer quality is exceptional."',
      metric: "70% storage reduction",
      name: "Warehouse Director",
      company: "SteelFlow Industries",
    },
    {
      rating: 5,
      quote:
        '"Our go-to platform for electronics surplus. Consistent sales, great margins, and professional buyers."',
      metric: "$2.8M annual sales",
      name: "CEO",
      company: "TechSurplus Solutions",
    },
  ];

  return (
    <div className="bg-white p-14">
      <p className="text-sm text-gray-600 text-center mb-2">Success Stories</p>
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        Real Results from Real Suppliers
      </h2>
      <p className="text-gray-600 text-center mb-8">
        See how suppliers are converting surplus inventory into significant
        revenue
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6">
            {/* Rating */}
            <div className="flex gap-1 mb-4 justify-left">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gray-900 text-gray-900" />
              ))}
            </div>

            {/* Quote */}
            <p className="max-w-xs text-gray-600 text-sm mb-6 text-left leading-relaxed">
              {testimonial.quote}
            </p>

            {/* Metric */}
            <p className="font-bold text-gray-900 text-left mb-4">
              {testimonial.metric}
            </p>

            {/* Author */}
            <div className="text-left">
              <p className="text-sm text-gray-600">{testimonial.name}</p>
              <p className="text-sm text-gray-600">{testimonial.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

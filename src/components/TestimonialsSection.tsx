"use client";

import { useState } from "react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      company: "TechFlow Industries",
      industry: "Electronics",
      savings: "$2.3M",
      recovery: "Recovered",
      caseStudy: "Read Case Study",
      quote:
        "Zeerostock helped us recover millions in our surplus inventory within just 48 days of registration.",
    },
    {
      company: "BuildRight Construction",
      industry: "Materials",
      savings: "$870K",
      recovery: "savings",
      caseStudy: "View Details",
      quote:
        "15% labour on sales in less than 30 days with zero hassle or intermediaries.",
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
    <section className="w-full bg-white py-20 px-6 border-t border-gray-200">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real Results from Real Businesses
          </h2>
          <p className="text-gray-600">
            See how companies like yours are monetizing value from surplus
            inventory
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative bg-white border-2 border-gray-800 rounded-lg p-12">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
              <button
                onClick={prevTestimonial}
                className="relative w-0 h-0 border-t-38 border-t-transparent border-r-46 border-r-white border-b-38 border-b-transparent hover:opacity-80 transition-opacity"
                aria-label="Previous testimonial"
              >
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-0 h-0 border-t-40 border-t-transparent border-r-48 border-r-gray-800 border-b-40 border-b-transparent"></div>
              </button>
            </div>

            <div className="text-center py-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {testimonials[currentIndex].company}
              </h3>
              <p className="text-gray-600 mb-6">
                {testimonials[currentIndex].industry}
              </p>
              <p className="text-4xl font-bold text-green-600 mb-6">
                {testimonials[currentIndex].savings}{" "}
                {testimonials[currentIndex].recovery}
              </p>
              <p className="text-gray-500 text-sm mb-6">
                45% reduction in bearing costs
              </p>
              <button className="px-8 py-3 border-2 border-gray-800 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition-colors">
                {testimonials[currentIndex].caseStudy}
              </button>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
              <button
                onClick={nextTestimonial}
                className="relative w-0 h-0 border-t-38 border-t-transparent border-l-46 border-l-white border-b-38 border-b-transparent hover:opacity-80 transition-opacity"
                aria-label="Next testimonial"
              >
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-0 h-0 border-t-40 border-t-transparent border-l-48 border-l-gray-800 border-b-40 border-b-transparent"></div>
              </button>
            </div>

            <div className="flex justify-center gap-3 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all ${
                    index === currentIndex
                      ? "w-12 h-1 bg-gray-400 rounded-full"
                      : "w-3 h-3 bg-gray-300 rounded-full"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

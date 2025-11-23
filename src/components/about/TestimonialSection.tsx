"use client";

import { useState } from "react";

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: "Zeerostock transformed how we handle excess inventory. We've reduced holding costs by 45% and attracted serious buyers for components we thought were worthless.",
      author: "— Supply Chain Manager, Tech/Pkg Industries",
      badge: "Verified Supplier",
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
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Trusted by Industry Leaders
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          See how businesses like yours are maximizing value from surplus
          inventory
        </p>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative border-2 border-gray-900 rounded-lg p-12 bg-white">
            {/* Left Arrow */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
              <button
                onClick={prevTestimonial}
                className="relative w-0 h-0 border-t-38 border-t-transparent border-r-46 border-r-white border-b-38 border-b-transparent hover:opacity-80 transition-opacity"
                aria-label="Previous testimonial"
              >
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-0 h-0 border-t-40 border-t-transparent border-r-48 border-r-gray-900 border-b-40 border-b-transparent"></div>
              </button>
            </div>

            {/* Content */}
            <div className="text-center py-8">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg text-gray-700 text-center mb-6 min-h-20">
                &quot;{testimonials[currentIndex].text}&quot;
              </p>
              <p className="text-sm text-gray-900 font-medium">
                {testimonials[currentIndex].author}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {testimonials[currentIndex].badge}
              </p>
            </div>

            {/* Right Arrow */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
              <button
                onClick={nextTestimonial}
                className="relative w-0 h-0 border-t-38 border-t-transparent border-l-46 border-l-white border-b-38 border-b-transparent hover:opacity-80 transition-opacity"
                aria-label="Next testimonial"
              >
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-0 h-0 border-t-40 border-t-transparent border-l-48 border-l-gray-900 border-b-40 border-b-transparent"></div>
              </button>
            </div>

            {/* Dots */}
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

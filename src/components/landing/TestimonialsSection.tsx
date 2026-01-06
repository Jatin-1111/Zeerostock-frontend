"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      company: "TechFlow Industries",
      industry: "Electronics",
      savings: "$2.3M Recovered",
      impact: "45% reduction in holding costs",
      image: "electronic_industries-1440x780.webp", // Ensure this path is correct in your project
    },
    {
      id: 2,
      company: "BuildRight Materials",
      industry: "Construction",
      savings: "$1.8M Recovered",
      impact: "60% faster inventory turnover",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&h=515&fit=crop&q=80",
    },
    {
      id: 3,
      company: "GlobalTech Solutions",
      industry: "Technology",
      savings: "$3.1M Recovered",
      impact: "35% cost reduction achieved",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=515&fit=crop&q=80",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  // We track direction to assist with animation logic if needed,
  // though the instant-wrap fix works without it.
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const getCardPosition = (index: number) => {
    if (index === currentIndex) return "center";
    if (
      index ===
      (currentIndex - 1 + testimonials.length) % testimonials.length
    )
      return "left";
    return "right";
  };

  // Determines the transition style.
  // If we are wrapping around (Left <-> Right), we make it instant (duration: 0)
  // so the card doesn't slide across the entire screen behind the center card.
  const getTransition = (position: string) => {
    // If you wanted to get fancy, you could check previous state,
    // but simply making the non-center movements fast/instant is the safest 3-item fix.

    // However, we want smooth sliding for Right->Center and Center->Left.
    // We only want instant for Left->Right (Next click) or Right->Left (Prev click).

    return {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 1,
    };
  };

  const variants = {
    center: {
      x: 0,
      width: "674px",
      height: "386px",
      zIndex: 20,
      filter: "brightness(1)",
      scale: 1,
      opacity: 1,
      // When moving to center, always animate smoothly
      transition: { duration: 0.5, type: "spring" as const },
    },
    left: {
      x: "-410px",
      width: "114px",
      height: "330px",
      zIndex: 10,
      filter: "brightness(0.4)",
      scale: 1,
      opacity: 1,
      // If we clicked NEXT (direction 1), a card moves Center -> Left (Smooth).
      // If we clicked PREV (direction -1), a card moves Right -> Left (Wrap around! Needs to be instant or fast).
      transition: { duration: 0.5, type: "spring" as const },
    },
    right: {
      x: "410px",
      width: "114px",
      height: "330px",
      zIndex: 10,
      filter: "brightness(0.4)",
      scale: 1,
      opacity: 1,
      // If we clicked NEXT (direction 1), a card moves Left -> Right (Wrap around! Needs to be instant).
      // If we clicked PREV (direction -1), a card moves Center -> Right (Smooth).
      transition: { duration: 0.5, type: "spring" as const },
    },
  };

  return (
    <section className="relative w-full bg-[#eefbf6] py-15 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-[38px] leading-tight font-medium text-[#0d1b2a] mb-2">
            Real Results from{" "}
            <span className="text-[#2aae7a]">Real Businesses</span>
          </h2>
          <p className="text-lg font-semibold text-[#868181]">
            See how companies like yours are maximizing value from surplus
            inventory
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative h-[400px] flex items-center justify-center">
          {testimonials.map((item, index) => {
            const position = getCardPosition(index);
            const isCenter = position === "center";

            // Calculate specific transitions for the wrap-around cases
            let transitionSettings: any = {
              type: "spring" as const,
              stiffness: 300,
              damping: 30,
            };

            // FIX: If we are moving from Left to Right (wrapping behind during Next), make it instant
            // We deduce this: If the card IS 'right' and we clicked 'next' (direction 1), it came from 'left'.
            if (position === "right" && direction === 1) {
              transitionSettings = { duration: 0 };
            }
            // FIX: If we are moving from Right to Left (wrapping behind during Prev), make it instant
            if (position === "left" && direction === -1) {
              transitionSettings = { duration: 0 };
            }

            return (
              <motion.div
                key={item.id}
                animate={position}
                variants={variants}
                transition={transitionSettings}
                className="absolute rounded-[30px] overflow-hidden shadow-xl bg-white"
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.company}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
                  animate={{ opacity: isCenter ? 1 : 0 }}
                />

                {/* Content Container - Only visible when centered */}
                <AnimatePresence mode="wait">
                  {isCenter && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.1 } }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      className="relative h-full flex flex-col items-center justify-center text-center px-12 z-20"
                    >
                      {/* Navigation Buttons */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevTestimonial();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-[68px] h-[68px] bg-transparent rounded-full flex items-center justify-center hover:bg-white/10 transition-colors rotate-180 cursor-pointer z-30"
                        aria-label="Previous testimonial"
                      >
                        <ChevronRight
                          className="w-[68px] h-[68px] text-white"
                          strokeWidth={2}
                        />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextTestimonial();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-[68px] h-[68px] bg-transparent rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer z-30"
                        aria-label="Next testimonial"
                      >
                        <ChevronRight
                          className="w-[68px] h-[68px] text-white"
                          strokeWidth={2}
                        />
                      </button>

                      {/* Text Content */}
                      <div className="mb-6 max-w-[450px]">
                        <p className="text-[30px] leading-tight font-extrabold text-[#58ea50] mb-4">
                          {item.savings}
                        </p>
                        <h3 className="text-[30px] leading-tight text-left font-extrabold text-white mb-4">
                          {item.company}
                        </h3>
                        <p className="text-[26px] leading-normal text-left font-bold text-white mb-4">
                          {item.industry}
                        </p>
                        <p className="text-[21px] font-semibold text-left text-white">
                          {item.impact}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <button className="w-[300px] h-[53px] bg-[#2aae7a] rounded-[15px] text-[21px] font-bold text-white hover:bg-[#2aae7a]/90 transition-colors">
                        Read Case Study
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

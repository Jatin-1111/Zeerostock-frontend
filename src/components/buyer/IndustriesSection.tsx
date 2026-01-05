"use client";

import { Factory, Building2, Stethoscope, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// Industry cards data
const industries = [
  {
    icon: Factory,
    title: "Manufacturing",
    savings: "30-50% Cost Saving",
    subtitle: "Raw materials & Components",
    description:
      "Source surplus steel, electronics, machinery parts and raw materials from verified industrial suppliers.",
  },
  {
    icon: Building2,
    title: "Construction",
    savings: "25-40% cost reduction",
    subtitle: "Building materials & equipment",
    description:
      "Find surplus cement, steel beams, heavy equipment, and construction materials for projects.",
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    savings: "35-60% savings",
    subtitle: "Medical equipment & supplies",
    description:
      "Access surplus medical devices, laboratory equipment, and healthcare supplies from certified suppliers.",
  },
  {
    icon: Monitor,
    title: "Technology",
    savings: "40-70% cost savings",
    subtitle: "IT hardware & components",
    description:
      "Source surplus servers, networking equipment, and electronic components for IT infrastructure.",
  },
];

export default function IndustriesSection() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate cards to create seamless infinite loop (3x for smoother transition)
  const duplicatedIndustries = [...industries, ...industries, ...industries];

  // Calculate animation duration based on content width
  // Card width + gap: ~276px per card (scaled to 75%), 4 cards = ~1104px for one full loop
  const cardWidth = 276; // 261px + 15px gap
  const totalWidth = cardWidth * industries.length;
  const duration = totalWidth / 50; // 50px per second speed

  return (
    <section className="bg-[#EEFBF6] py-8 md:py-12 w-full mx-auto overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight">
            Perfect for Every Industry
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            No matter what your industry, find the surplus inventory you need at
            unbeatable prices
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-4 py-4"
            animate={{
              x: isPaused ? undefined : [-totalWidth, 0],
            }}
            transition={{
              x: {
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            }}
            style={{
              willChange: "transform",
            }}
          >
            {duplicatedIndustries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={`${industry.title}-${index}`}
                  className="bg-[#EEFFEF] rounded-[30px] shadow-[0px_0px_8px_0px_rgba(24,181,34,0.5)] shrink-0 w-[261px] h-[215px] relative overflow-hidden"
                >
                  {/* Icon - Top Left */}
                  <div className="absolute left-[23px] top-[21px] w-[30px] h-[30px]">
                    <Icon
                      className="w-full h-full text-[#2AAE7A]"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Savings Badge - Top Right Area */}
                  <div className="absolute left-[calc(50%+39px)] top-[19px] -translate-x-1/2">
                    <div className="bg-[#2AAE7A] px-[9px] py-0.5 rounded-full">
                      <p className="text-white text-[11px] font-medium whitespace-nowrap leading-normal">
                        {industry.savings}
                      </p>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="absolute left-[23px] top-[75px] text-[#022778] text-[19px] font-semibold leading-normal drop-shadow-[0px_3px_3px_rgba(0,0,0,0.25)]">
                    {industry.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="absolute left-[23px] top-[116px] text-[#2AAE7A] text-[14px] font-medium leading-normal">
                    {industry.subtitle}
                  </p>

                  {/* Description */}
                  <p className="absolute left-[23px] top-[143px] w-[216px] text-[#727272] text-[11px] font-medium leading-normal">
                    {industry.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

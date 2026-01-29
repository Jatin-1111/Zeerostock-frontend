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
    <section className="bg-[#EEFBF6] py-[21px] md:py-[32px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1080px] mx-auto overflow-hidden">
      <div className="w-full max-w-[1080px] mx-auto">
        <div className="text-center mb-[16px] md:mb-[32px]">
          <h2 className="text-[13px] md:text-[20px] font-bold text-gray-900 mb-[5px] md:mb-[8px] leading-tight">
            Perfect for Every Industry
          </h2>
          <p className="text-[9px] md:text-[11px] text-gray-600">
            No matter what your industry, find the surplus inventory you need at
            unbeatable prices
          </p>
        </div>

        {/* Mobile View: 2x2 Grid */}
        <div className="md:hidden grid grid-cols-2 gap-[11px] justify-items-center">
          {industries.map((industry, index) => (
            <IndustryCard
              key={`${industry.title}-${index}-mobile`}
              industry={industry}
            />
          ))}
        </div>

        {/* Desktop View: Carousel Container */}
        <div
          className="hidden md:block relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-[11px] py-[11px]"
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
            {duplicatedIndustries.map((industry, index) => (
              <IndustryCard
                key={`${industry.title}-${index}-desktop`}
                industry={industry}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IndustryCard({ industry }: { industry: any }) {
  const Icon = industry.icon;
  return (
    <div className="bg-[#EEFFEF] rounded-[20px] shadow-[0px_0px_5px_0px_rgba(24,181,34,0.5)] shrink-0 w-[174px] h-[143px] relative overflow-hidden">
      {/* Icon - Top Left */}
      <div className="absolute left-[15px] top-[14px] w-[20px] h-[20px]">
        <Icon className="w-full h-full text-[#2AAE7A]" strokeWidth={1.5} />
      </div>

      {/* Savings Badge - Top Right Area */}
      <div className="absolute left-[calc(50%+26px)] top-[13px] -translate-x-1/2">
        <div className="bg-[#2AAE7A] px-[6px] py-[1px] rounded-full">
          <p className="text-white text-[7px] font-medium whitespace-nowrap leading-normal">
            {industry.savings}
          </p>
        </div>
      </div>

      {/* Title */}
      <h3 className="absolute left-[15px] top-[50px] text-[#022778] text-[13px] font-semibold leading-normal drop-shadow-[0px_3px_3px_rgba(0,0,0,0.25)]">
        {industry.title}
      </h3>

      {/* Subtitle */}
      <p className="absolute left-[15px] top-[77px] text-[#2AAE7A] text-[9px] font-medium leading-normal">
        {industry.subtitle}
      </p>

      {/* Description */}
      <p className="absolute left-[15px] top-[95px] w-[144px] text-[#727272] text-[7px] font-medium leading-normal">
        {industry.description}
      </p>
    </div>
  );
}

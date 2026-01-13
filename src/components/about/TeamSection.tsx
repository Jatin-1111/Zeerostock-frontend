"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function TeamSection() {
  const [isHovered, setIsHovered] = useState(false);

  const imgFrame427322271 =
    "https://www.figma.com/api/mcp/asset/2507b949-3987-4204-b11c-b01a85d58f06";
  const imgFrame427322272 =
    "https://www.figma.com/api/mcp/asset/fb7b7f6a-dd99-49b9-b17b-8e0960a77f9b";
  const imgFrame427322274 =
    "https://www.figma.com/api/mcp/asset/2076ffb0-421a-4e61-8411-3f9f6186b9a3";
  const imgFrame427322273 =
    "https://www.figma.com/api/mcp/asset/419586ba-ed7e-42df-92e7-67feccf18cdb";

  const team = [
    {
      name: "Jane Doe",
      role: "CEO & Co-Founder",
      bio: "Visionary leader driving our mission to revolutionize global trade.",
      image: imgFrame427322274,
    },
    {
      name: "John Smith",
      role: "CTO & Co-Founder",
      bio: "The architect of our technology, building a smarter future for commerce.",
      image: imgFrame427322272,
    },
    {
      name: "Emily White",
      role: "Head of Operations",
      bio: "Ensuring seamless execution and operational excellence across the globe.",
      image: imgFrame427322273,
    },
    {
      name: "Michael Brown",
      role: "VP of Sustainability",
      bio: "Championing our commitment to a positive environmental impact.",
      image: imgFrame427322271,
    },
  ];

  return (
    <section className="w-full bg-[#EEFBF6] py-6 sm:py-8 md:py-12 lg:py-20">
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="relative w-full flex flex-col items-center">
            {/* Subtitle */}
            <p className="font-medium text-xs sm:text-sm md:text-sm text-center text-[#868181] mb-2 sm:mb-[11px]">
              Our Team
            </p>

            {/* Title */}
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-3xl text-center text-[#0d1b2a] mb-2 sm:mb-[11px]">
              Meet the People Behind{" "}
              <span className="text-[#2ec096]">Zeerostock</span>
            </h2>

            {/* Description */}
            <p className="font-semibold text-xs sm:text-sm md:text-sm text-center text-[#868181] max-w-full sm:max-w-xl md:max-w-3xl mb-6 sm:mb-8 md:mb-10 lg:mb-[53px] px-4 sm:px-0">
              Our experienced leadership team brings together decades of
              expertise in technology, supply chain and B2B marketplaces.
            </p>

            {/* Mobile: Horizontal Infinite Scroll */}
            <div className="lg:hidden w-full overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{
                  x: isHovered ? 0 : [0, -100 * team.length],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
                onClick={() => setIsHovered(!isHovered)}
                onTouchStart={() => setIsHovered(!isHovered)}
              >
                {/* Render team members twice for infinite scroll effect */}
                {[...team, ...team].map((member, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-64 flex flex-col items-center py-5"
                  >
                    {/* Profile Image */}
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-3 shadow-[0px_2px_10px_4px_rgba(0,0,0,0.25)]">
                      <img
                        alt={member.name}
                        className="w-full h-full object-cover"
                        src={member.image}
                      />
                    </div>

                    {/* Name */}
                    <h3 className="font-semibold text-base text-black text-center mb-1">
                      {member.name}
                    </h3>

                    {/* Role */}
                    <p className="font-semibold text-xs text-[#3752ff] text-center mb-2">
                      {member.role}
                    </p>

                    {/* Bio */}
                    <p className="font-medium text-xs text-black text-center max-w-44 leading-relaxed px-2">
                      {member.bio}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden lg:block w-full max-w-7xl mx-auto">
              <div className="grid grid-cols-4 gap-[32px]">
                {team.map((member, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {/* Profile Image */}
                    <div className="w-[167px] h-[167px] rounded-full overflow-hidden mb-[16px] shadow-[0px_2px_10px_4px_rgba(0,0,0,0.25)]">
                      <img
                        alt={member.name}
                        className="w-full h-full object-cover"
                        src={member.image}
                      />
                    </div>

                    {/* Name */}
                    <h3 className="font-semibold text-xl text-black text-center mb-[5px]">
                      {member.name}
                    </h3>

                    {/* Role */}
                    <p className="font-semibold text-sm text-[#3752ff] text-center mb-[8px]">
                      {member.role}
                    </p>

                    {/* Bio */}
                    <p className="font-medium text-xs text-black text-center max-w-[167px] leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

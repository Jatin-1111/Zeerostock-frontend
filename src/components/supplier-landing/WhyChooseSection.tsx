"use client";

import { DollarSign, Globe, Zap, Shield } from "lucide-react";

export default function WhyChooseSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Maximize Revenue Recovery",
      description:
        "Convert surplus inventory into cash flow with our global network of verified buyers.",
    },
    {
      icon: Globe,
      title: "Global Market Access",
      description:
        "Reach buyers worldwide and expand your market beyond geographical limitations.",
    },
    {
      icon: Zap,
      title: "Fast Sales Cycles",
      description:
        "AI-powered matching connects you with interested buyers in minutes, not months.",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description:
        "Get paid safely with escrow protection and verified buyer credentials.",
    },
  ];

  return (
    <div className="w-full bg-[#EEFBF6] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-[50px]">
      {/* Content Container */}
      <div className="max-w-[1080px] mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-[45px]">
          <h2 className="text-[26px] leading-[35px] font-medium text-[#0d1b2a] mb-[7px]">
            Why Leading Suppliers Choose{" "}
            <span className="text-[#2ec096]">Zeerostock</span>
          </h2>
          <p className="text-[12px] font-semibold text-[#9c9c9c]">
            Transform your surplus inventory challenges into revenue
            opportunities with our proven platform.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[11px]">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-[#2aae7a] rounded-[20px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] p-[15px] pt-[15px] pb-[15px] text-center overflow-hidden h-[143px] flex flex-col"
            >
              {/* Icon Container */}
              <div className="flex justify-center mb-[10px]">
                <div className="w-[35px] h-[35px] bg-[#eeffef] rounded-[30px] flex items-center justify-center p-[7px]">
                  <benefit.icon
                    className="w-[20px] h-[20px] text-[#2aae7a]"
                    strokeWidth={2}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[11px] leading-[13px] font-semibold text-[#022778] mb-[10px]">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-[8px] leading-normal font-semibold text-white">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

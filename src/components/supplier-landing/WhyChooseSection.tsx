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
    <div className="w-full bg-[#EEFBF6] px-[60px] py-[75px]">
      {/* Content Container */}
      <div className="max-w-[1320px] mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-[67px]">
          <h2 className="text-[39px] leading-[52px] font-medium text-[#0d1b2a] mb-[11px]">
            Why Leading Suppliers Choose{" "}
            <span className="text-[#2ec096]">Zeerostock</span>
          </h2>
          <p className="text-[18px] font-semibold text-[#9c9c9c]">
            Transform your surplus inventory challenges into revenue
            opportunities with our proven platform.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[17px]">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-[#2aae7a] rounded-[30px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.5)] p-[23px] pt-[23px] pb-[23px] text-center overflow-hidden h-[215px] flex flex-col"
            >
              {/* Icon Container */}
              <div className="flex justify-center mb-[15px]">
                <div className="w-[53px] h-[53px] bg-[#eeffef] rounded-[45px] flex items-center justify-center p-[11px]">
                  <benefit.icon
                    className="w-[30px] h-[30px] text-[#2aae7a]"
                    strokeWidth={2}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[17px] leading-[20px] font-semibold text-[#022778] mb-[15px]">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-[12px] leading-normal font-semibold text-white">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

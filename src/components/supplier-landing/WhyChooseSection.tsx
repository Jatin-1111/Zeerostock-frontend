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
    <div className="w-full bg-[#EEFBF6] px-[40px] py-[50px]">
      {/* Content Container */}
      <div className="max-w-5xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-[45px]">
          <h2 className="text-2xl leading-snug font-medium text-[#0d1b2a] mb-[7px]">
            Why Leading Suppliers Choose{" "}
            <span className="text-[#2ec096]">Zeerostock</span>
          </h2>
          <p className="text-sm font-semibold text-[#9c9c9c]">
            Transform your surplus inventory challenges into revenue
            opportunities with our proven platform.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-secondary rounded-2xl shadow-lg p-4 text-center overflow-hidden h-36 flex flex-col"
            >
              {/* Icon Container */}
              <div className="flex justify-center mb-[10px]">
                <div className="w-9 h-9 bg-success-bg rounded-full flex items-center justify-center p-2">
                  <benefit.icon
                    className="w-5 h-5 text-secondary"
                    strokeWidth={2}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xs leading-tight font-semibold text-[#022778] mb-[10px]">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-xs leading-normal font-semibold text-white">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

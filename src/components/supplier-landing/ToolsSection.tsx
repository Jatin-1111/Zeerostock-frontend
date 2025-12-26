"use client";

import {
  FileText,
  Zap,
  TrendingUp,
  ShieldCheck,
  Megaphone,
  Truck,
} from "lucide-react";

export default function ToolsSection() {
  const tools = [
    {
      icon: FileText,
      title: "Smart Inventory Listing",
      description:
        "Find specific products using detailed filters including specifications, location, condition, and price range.",
    },
    {
      icon: Zap,
      title: "Bulk Upload Tools",
      description:
        "Access current market prices, demand trends, and supplier availability to make informed decisions.",
    },
    {
      icon: TrendingUp,
      title: "Market Analytics",
      description:
        "All suppliers undergo rigorous verification including business licenses, financial stability, and quality standards.",
    },
    {
      icon: ShieldCheck,
      title: "Buyer Verification",
      description:
        "Specialized tools for large-volume purchases including volume discounts and consolidated shipping.",
    },
    {
      icon: Megaphone,
      title: "Automated Marketing",
      description:
        "Detailed product descriptions, photos, and third-party inspection reports ensure quality standards.",
    },
    {
      icon: Truck,
      title: "Integrated Logistics",
      description:
        "Integrated shipping solutions with tracking, insurance, and customs handling for international purchases.",
    },
  ];

  return (
    <div className="w-full bg-[#eeffef] px-[60px] py-[75px]">
      <div className="max-w-[1320px] mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-[67px]">
          <h2 className="text-[39px] leading-[52px] font-medium text-[#0d1b2a] mb-[11px]">
            Powerful Tools for{" "}
            <span className="text-[#2ec096]">Successful Selling</span>
          </h2>
          <p className="text-[18px] font-semibold text-[#9c9c9c]">
            Everything you need to list, promote, and sell your surplus
            inventory efficiently.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[60px] gap-y-[60px]">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-[#2aae7a] rounded-[30px] overflow-hidden min-h-[215px] flex flex-col items-center text-center px-[19px] pt-[23px] pb-[23px]"
            >
              {/* Icon Container */}
              <div className="bg-[#eeffef] rounded-[45px] p-[11px] flex items-center justify-center mb-[23px]">
                <tool.icon
                  className="w-[30px] h-[30px] text-[#2aae7a]"
                  strokeWidth={2}
                />
              </div>

              {/* Title */}
              <h3 className="text-[17px] leading-[20px] font-semibold text-[#022778] mb-[15px]">
                {tool.title}
              </h3>

              {/* Description */}
              <p className="text-[12px] leading-[16px] font-semibold text-white">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

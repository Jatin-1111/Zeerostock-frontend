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
    <div className="w-full bg-[#eeffef] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-[50px]">
      <div className="max-w-[1080px] mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-[45px]">
          <h2 className="text-[26px] leading-[35px] font-medium text-[#0d1b2a] mb-[7px]">
            Powerful Tools for{" "}
            <span className="text-[#2ec096]">Successful Selling</span>
          </h2>
          <p className="text-[12px] font-semibold text-[#9c9c9c]">
            Everything you need to list, promote, and sell your surplus
            inventory efficiently.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[40px] gap-y-[40px]">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-[#2aae7a] rounded-[20px] overflow-hidden min-h-[143px] flex flex-col items-center text-center px-[13px] pt-[15px] pb-[15px]"
            >
              {/* Icon Container */}
              <div className="bg-[#eeffef] rounded-[30px] p-[7px] flex items-center justify-center mb-[15px]">
                <tool.icon
                  className="w-[20px] h-[20px] text-[#2aae7a]"
                  strokeWidth={2}
                />
              </div>

              {/* Title */}
              <h3 className="text-[11px] leading-[13px] font-semibold text-[#022778] mb-[10px]">
                {tool.title}
              </h3>

              {/* Description */}
              <p className="text-[8px] leading-[11px] font-semibold text-white">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

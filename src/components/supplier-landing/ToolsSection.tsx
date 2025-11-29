"use client";

import {
  FileText,
  Zap,
  TrendingUp,
  ShieldCheck,
  Megaphone,
  Globe,
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
        "Specialized tools for large-volume purchases including price discounts and consolidated shipping.",
    },
    {
      icon: Megaphone,
      title: "Automated Marketing",
      description:
        "Detailed product descriptions, photos, and third-party inspection reports ensure quality standards.",
    },
    {
      icon: Globe,
      title: "Integrated Logistics",
      description:
        "Integrated shipping solutions with tracking, insurance, and customs handling for international purchases.",
    },
  ];

  return (
    <div className="bg-white p-14">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        Powerful Tools for Successful Selling
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Everything you need to list, promote, and sell your surplus inventory
        efficiently.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
          <div key={index} className="bg-white">
            <div className="flex items-start gap-3 mb-3">
              <tool.icon className="w-5 h-5 text-gray-900 flex-shrink-0 mt-1" />
              <h3 className="font-bold text-gray-900">{tool.title}</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

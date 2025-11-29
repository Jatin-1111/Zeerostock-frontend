"use client";

import { Globe } from "lucide-react";

export default function RegionalDistribution() {
  const regions = [
    { name: "North America", amount: "$12B (50%)", width: "50%" },
    { name: "North America", amount: "$12B (50%)", width: "50%" },
    { name: "North America", amount: "$12B (50%)", width: "50%" },
    { name: "North America", amount: "$12B (50%)", width: "50%" },
    { name: "North America", amount: "$12B (50%)", width: "50%" },
  ];

  return (
    <div className="bg-white border-2 border-gray-900 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="w-5 h-5 text-gray-900" />
        <h3 className="text-lg font-bold text-gray-900">
          Regional Volume Distribution
        </h3>
      </div>

      <div className="space-y-4">
        {regions.map((region, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-900">{region.name}</span>
              <span className="text-sm font-bold text-gray-900">
                {region.amount}
              </span>
            </div>
            <div className="w-full bg-gray-200 h-6 flex">
              <div
                className="bg-blue-600 h-full"
                style={{ width: region.width }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

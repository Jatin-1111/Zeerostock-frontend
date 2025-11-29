"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

export default function InsightsStats() {
  const stats = [
    {
      label: "Total Market Volume",
      value: "$2.4B",
      change: "+12%",
      isPositive: true,
    },
    {
      label: "Active Listings",
      value: "45,623",
      change: "+8%",
      isPositive: true,
    },
    {
      label: "Completed Deals",
      value: "12,834",
      change: "+15%",
      isPositive: true,
    },
    {
      label: "Average Deal Size",
      value: "$127K",
      change: "-3%",
      isPositive: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white border border-gray-300 p-4">
          <p className="text-xs text-gray-600 mb-3">{stat.label}</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <div
              className={`flex items-center gap-0.5 ${
                stat.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-bold">{stat.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

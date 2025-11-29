"use client";

import { TrendingUp } from "lucide-react";

export default function TrendingCategories() {
  const categories = [
    {
      name: "Electronics",
      deals: "3420 deals",
      amount: "$812M",
      growth: "+24%",
    },
    {
      name: "Electronics",
      deals: "3420 deals",
      amount: "$812M",
      growth: "+24%",
    },
    {
      name: "Electronics",
      deals: "3420 deals",
      amount: "$812M",
      growth: "+24%",
    },
    {
      name: "Electronics",
      deals: "3420 deals",
      amount: "$812M",
      growth: "+24%",
    },
    {
      name: "Electronics",
      deals: "3420 deals",
      amount: "$812M",
      growth: "+24%",
    },
  ];

  return (
    <div className="bg-white border-2 border-gray-900 p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-gray-900" />
        <h3 className="text-lg font-bold text-gray-900">Trending Categories</h3>
      </div>

      <div className="space-y-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-300"
          >
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 mb-1">
                {category.name}
              </p>
              <p className="text-xs text-gray-600">{category.deals}</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm font-bold text-gray-900">
                {category.amount}
              </span>
              <span className="text-sm font-bold text-green-600">
                {category.growth}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

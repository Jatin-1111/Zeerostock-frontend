"use client";

import { DollarSign } from "lucide-react";

export default function PricingBenchmarks() {
  const benchmarks = [
    {
      category: "Electronics",
      discount: "32%",
      priceRange: "$15k - $250k",
      volatility: "Low",
      volatilityColor: "text-blue-600",
    },
    {
      category: "Machinery",
      discount: "28%",
      priceRange: "$50k - $2M",
      volatility: "Medium",
      volatilityColor: "text-orange-600",
    },
    {
      category: "Automotive",
      discount: "25%",
      priceRange: "$10k - $500k",
      volatility: "Low",
      volatilityColor: "text-blue-600",
    },
    {
      category: "Textiles",
      discount: "35%",
      priceRange: "$5k - $100k",
      volatility: "High",
      volatilityColor: "text-red-600",
    },
    {
      category: "Materials",
      discount: "22%",
      priceRange: "$20k - $800k",
      volatility: "Medium",
      volatilityColor: "text-orange-600",
    },
  ];

  return (
    <div className="bg-white border-2 border-gray-900 p-8">
      <div className="flex items-center gap-2 mb-8">
        <DollarSign className="w-5 h-5 text-gray-900" />
        <h3 className="text-lg font-bold text-gray-900">
          Pricing Benchmarks by Category
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left py-4 px-6 text-sm font-bold text-gray-900">
                Category
              </th>
              <th className="text-left py-4 px-6 text-sm font-bold text-gray-900">
                Avg. Discount
              </th>
              <th className="text-left py-4 px-6 text-sm font-bold text-gray-900">
                Price Range
              </th>
              <th className="text-left py-4 px-6 text-sm font-bold text-gray-900">
                Volatility
              </th>
            </tr>
          </thead>
          <tbody>
            {benchmarks.map((benchmark, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 last:border-b-0"
              >
                <td className="py-4 px-6 text-sm text-gray-900">
                  {benchmark.category}
                </td>
                <td className="py-4 px-6 text-sm font-bold text-green-600">
                  {benchmark.discount}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {benchmark.priceRange}
                </td>
                <td
                  className={`py-4 px-6 text-sm font-bold ${benchmark.volatilityColor}`}
                >
                  {benchmark.volatility}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

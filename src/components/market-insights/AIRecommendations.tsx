"use client";

import { Eye } from "lucide-react";

export default function AIRecommendations() {
  const recommendations = [
    {
      title: "Electronics Demand Surge",
      subtitle:
        "25% increase in electronics component inquiries. Consider expanding inventory in semiconductor and PCB categories.",
      category: "Expand Category",
      impact: "Medium Impact",
      impactColor: "text-blue-600",
    },
    {
      title: "Automotive Price Optimization",
      subtitle:
        "Current automotive listings are 8% below market average. Consider repricing for better margins.",
      category: "Adjust Pricing",
      impact: "High Impact",
      impactColor: "text-red-600",
    },
    {
      title: "Machinery Timing Opportunity",
      subtitle:
        "Q4 typically sees 23% higher machinery demand. Prepare inventory for seasonal surge.",
      category: "Plan Inventory",
      impact: "High Impact",
      impactColor: "text-red-600",
    },
  ];

  const predictions = [
    {
      label: "Next 30 Days",
      value: "Electronics demand expected to increase by 15%",
    },
    {
      label: "Q4 Forecast",
      value: "Machinery category showing strong seasonal growth signals",
    },
  ];

  const opportunities = [
    { label: "Inventory Turnover", value: "Optimize", color: "text-green-600" },
    { label: "Pricing Strategy", value: "Review", color: "text-orange-600" },
    { label: "Market Timing", value: "Excellent", color: "text-green-600" },
  ];

  return (
    <div className="space-y-6">
      {/* AI Recommendations Section */}
      <div className="bg-white border-2 border-gray-900 p-8">
        <div className="flex items-center gap-2 mb-8">
          <Eye className="w-5 h-5 text-gray-900" />
          <h3 className="text-lg font-bold text-gray-900">
            AI-Powered Recommendations
          </h3>
        </div>

        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-base font-bold text-blue-600">
                  {rec.title}
                </h4>
                <span
                  className={`text-sm font-bold ${rec.impactColor} whitespace-nowrap ml-4`}
                >
                  {rec.impact}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{rec.subtitle}</p>
              <p className="text-xs text-gray-600">{rec.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Market Predictions and Optimization Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Predictions */}
        <div className="bg-white border-2 border-gray-900 p-6">
          <h4 className="text-base font-bold text-gray-900 mb-6">
            Market Predictions
          </h4>
          <div className="space-y-4">
            {predictions.map((pred, index) => (
              <div key={index}>
                <p className="text-sm font-bold text-gray-900 mb-1">
                  {pred.label}
                </p>
                <p className="text-sm text-gray-600">{pred.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Optimization Opportunities */}
        <div className="bg-white border-2 border-gray-900 p-6">
          <h4 className="text-base font-bold text-gray-900 mb-6">
            Optimization Opportunities
          </h4>
          <div className="space-y-4">
            {opportunities.map((opp, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="text-sm text-gray-900">{opp.label}</p>
                <span className={`text-sm font-bold ${opp.color}`}>
                  {opp.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

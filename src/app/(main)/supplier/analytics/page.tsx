"use client";

import { DollarSign, TrendingUp, Clock } from "lucide-react";

export default function SupplierAnalytics() {
  const salesData = [
    { category: "Electronics", value: 45000 },
    { category: "Electronics", value: 45000 },
    { category: "Electronics", value: 45000 },
  ];

  const maxValue = Math.max(...salesData.map((d) => d.value));

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-sm text-gray-600">
            Track your performance metrics and insights
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-white border-2 border-gray-900 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">₹70,000</p>
              </div>
            </div>
            <p className="text-xs text-green-600 font-medium">
              +15% from last month
            </p>
          </div>

          {/* Quote Win Rate */}
          <div className="bg-white border-2 border-gray-900 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Quote Win Rate</p>
                <p className="text-3xl font-bold text-gray-900">34%</p>
              </div>
            </div>
            <p className="text-xs text-green-600 font-medium">
              +5% from last month
            </p>
          </div>

          {/* Avg Response Time */}
          <div className="bg-white border-2 border-gray-900 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Avg. Response Time</p>
                <p className="text-3xl font-bold text-gray-900">1.8 hrs</p>
              </div>
            </div>
            <p className="text-xs text-green-600 font-medium">
              -0.3 hrs from last month
            </p>
          </div>
        </div>

        {/* Sales by Category Chart */}
        <div className="bg-white border-2 border-gray-900 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Sales by Category
          </h2>

          <div className="space-y-6">
            {salesData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {item.category}
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    +₹{item.value.toLocaleString()}
                  </span>
                </div>
                <div className="relative w-full h-8 bg-gray-100 border-2 border-gray-900">
                  <div
                    className="absolute left-0 top-0 h-full bg-blue-600 border-r-2 border-gray-900"
                    style={{
                      width: `${(item.value / maxValue) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

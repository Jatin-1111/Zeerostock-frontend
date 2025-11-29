"use client";

import { DollarSign, Clock, TrendingUp, Receipt } from "lucide-react";

export default function PaymentMethodsStats() {
  const stats = [
    {
      icon: DollarSign,
      label: "Total Spent",
      value: "$45,500",
      subtitle: "This month",
      bgColor: "bg-white",
      iconColor: "text-blue-600",
    },
    {
      icon: Clock,
      label: "Pending",
      value: "$22,000",
      subtitle: "Processing",
      bgColor: "bg-white",
      iconColor: "text-yellow-600",
    },
    {
      icon: TrendingUp,
      label: "This Month",
      value: "$67,200",
      subtitle: "+12% from last month",
      bgColor: "bg-white",
      iconColor: "text-green-600",
    },
    {
      icon: Receipt,
      label: "Transactions",
      value: "5",
      subtitle: "Last 30 days",
      bgColor: "bg-white",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} border-2 border-gray-900 p-4`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-xs text-gray-600">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
          <p className="text-xs text-gray-600">{stat.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
